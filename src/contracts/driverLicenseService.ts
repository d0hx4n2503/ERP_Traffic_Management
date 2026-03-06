import { ethers } from 'ethers';
import type { DriverLicense } from '@/types';
import { DriverLicenseABI } from './abis/DriverLicenseABI';
import contractAddresses from './abis/contractAddress_eth_sepolia.json';

const PERMANENT_LICENSE_YEARS = 100;
const DRIVER_LICENSE_CONTRACT_ADDRESS = contractAddresses.DriverLicense;

const resolveDriverLicenseAbi = (): ethers.InterfaceAbi => {
  // Support both formats:
  // 1) Pure ABI array
  // 2) Hardhat artifact wrapper [{ abi: [...] }]
  const abiSource = DriverLicenseABI as unknown;
  if (
    Array.isArray(abiSource) &&
    abiSource.length > 0 &&
    typeof abiSource[0] === 'object' &&
    abiSource[0] !== null &&
    'abi' in (abiSource[0] as Record<string, unknown>)
  ) {
    return (abiSource[0] as { abi: ethers.InterfaceAbi }).abi;
  }
  return abiSource as ethers.InterfaceAbi;
};

const getReadContract = () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Khong tim thay vi Web3. Vui long cai MetaMask hoac vi tuong thich.');
  }
  if (!ethers.isAddress(DRIVER_LICENSE_CONTRACT_ADDRESS)) {
    throw new Error('Dia chi DriverLicense contract khong hop le.');
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  return new ethers.Contract(
    DRIVER_LICENSE_CONTRACT_ADDRESS,
    resolveDriverLicenseAbi(),
    provider
  );
};

const toUnixTimestamp = (date: string | undefined, fallback: number): number => {
  if (!date) return fallback;
  const ms = Date.parse(date);
  if (Number.isNaN(ms)) return fallback;
  return Math.floor(ms / 1000);
};

const normalizePoint = (point: number): number => {
  if (Number.isNaN(point)) return 0;
  if (point < 0) return 0;
  if (point > 12) return 12;
  return Math.floor(point);
};

const resolveHolderAddress = (license: DriverLicense): string => {
  const address = license.wallet_address || license.owner_address;
  if (!address || !ethers.isAddress(address)) {
    throw new Error('Wallet address khong hop le. Vui long lien ket vi truoc khi luu blockchain.');
  }
  return address;
};

export interface DriverLicenseUserOnChainInfo {
  holderAddress: string;
  hasValidLicense: boolean;
  validLicenseBalance: number;
  holderLicenseCount: number;
  licenseFound: boolean;
  licenseNo?: string;
  holderId?: string;
  name?: string;
  licenseType?: string;
  point?: number;
  status?: number;
  issueDate?: number;
  expiryDate?: number;
}

export interface DriverLicenseOnChainRecord {
  tokenId: bigint;
  licenseNo: string;
  holderAddress: string;
  holderId: string;
  name: string;
  licenseType: string;
  issueDate: bigint;
  expiryDate: bigint;
  status: number;
  authorityId: string;
  point: number;
}

export const getDriverLicenseUserInfoOnChain = async (
  licenseNo: string,
  holderAddress: string
): Promise<DriverLicenseUserOnChainInfo> => {
  if (!holderAddress || !ethers.isAddress(holderAddress)) {
    throw new Error('Wallet address khong hop le de kiem tra on-chain.');
  }

  const contract = getReadContract();
  const [hasValidRaw, balanceRaw, holderLicenses] = await Promise.all([
    contract.hasValid(holderAddress),
    contract.balanceOf(holderAddress),
    contract.getLicensesByHolder(holderAddress),
  ]);

  const baseInfo: DriverLicenseUserOnChainInfo = {
    holderAddress,
    hasValidLicense: Boolean(hasValidRaw),
    validLicenseBalance: Number(balanceRaw),
    holderLicenseCount: Array.isArray(holderLicenses) ? holderLicenses.length : 0,
    licenseFound: false,
  };

  try {
    const onChainLicense = await contract.getLicense(licenseNo);
    return {
      ...baseInfo,
      licenseFound: true,
      licenseNo: onChainLicense.licenseNo,
      holderId: onChainLicense.holderId,
      name: onChainLicense.name,
      licenseType: onChainLicense.licenseType,
      point: Number(onChainLicense.point),
      status: Number(onChainLicense.status),
      issueDate: Number(onChainLicense.issueDate),
      expiryDate: Number(onChainLicense.expiryDate),
    };
  } catch {
    return baseInfo;
  }
};

const isNotFoundRevert = (error: unknown): boolean => {
  const payload = JSON.stringify(error ?? '');
  return payload.includes('0xc5723b51') || payload.toLowerCase().includes('notfound');
};

export const getDriverLicenseOnChain = async (
  licenseNo: string,
  holderAddress?: string
): Promise<DriverLicenseOnChainRecord> => {
  if (!licenseNo?.trim()) {
    throw new Error('So GPLX khong hop le de truy van blockchain.');
  }

  try {
    const contract = getReadContract();
    const onChainLicense = await contract.getLicense(licenseNo);
    return {
      tokenId: BigInt(onChainLicense.tokenId),
      licenseNo: onChainLicense.licenseNo,
      holderAddress: onChainLicense.holderAddress,
      holderId: onChainLicense.holderId,
      name: onChainLicense.name,
      licenseType: onChainLicense.licenseType,
      issueDate: BigInt(onChainLicense.issueDate),
      expiryDate: BigInt(onChainLicense.expiryDate),
      status: Number(onChainLicense.status),
      authorityId: onChainLicense.authorityId,
      point: Number(onChainLicense.point),
    };
  } catch (error) {
    if (isNotFoundRevert(error)) {
      if (holderAddress && ethers.isAddress(holderAddress)) {
        try {
          const contract = getReadContract();
          const holderLicenses = await contract.getLicensesByHolder(holderAddress);
          const matched = (holderLicenses || []).find(
            (item: any) => String(item.licenseNo || '').toLowerCase() === licenseNo.toLowerCase()
          );
          if (matched) {
            return {
              tokenId: BigInt(matched.tokenId),
              licenseNo: matched.licenseNo,
              holderAddress: matched.holderAddress,
              holderId: matched.holderId,
              name: matched.name,
              licenseType: matched.licenseType,
              issueDate: BigInt(matched.issueDate),
              expiryDate: BigInt(matched.expiryDate),
              status: Number(matched.status),
              authorityId: matched.authorityId,
              point: Number(matched.point),
            };
          }
        } catch {
          // Fallback below.
        }
      }
      throw new Error('Chua co du lieu GPLX tren blockchain cho ban ghi nay.');
    }
    throw error;
  }
};

export const updateDriverLicenseOnChain = async (license: DriverLicense): Promise<string> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Khong tim thay vi Web3. Vui long cai MetaMask hoac vi tuong thich.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();

  if (!ethers.isAddress(DRIVER_LICENSE_CONTRACT_ADDRESS)) {
    throw new Error('Dia chi DriverLicense contract khong hop le.');
  }

  const contract = new ethers.Contract(
    DRIVER_LICENSE_CONTRACT_ADDRESS,
    resolveDriverLicenseAbi(),
    signer
  );

  const now = Math.floor(Date.now() / 1000);
  const issueDate = toUnixTimestamp(license.issue_date, now);
  const defaultExpiry = issueDate + PERMANENT_LICENSE_YEARS * 365 * 24 * 60 * 60;
  let expiryDate = toUnixTimestamp(license.expiry_date, defaultExpiry);
  if (expiryDate <= issueDate) {
    expiryDate = issueDate + 24 * 60 * 60;
  }

  const tx = await contract.updateLicense(license.license_no, {
    holderId: license.identity_no,
    holderAddress: resolveHolderAddress(license),
    name: license.full_name,
    licenseType: license.license_type,
    expiryDate,
    status: 0,
    point: normalizePoint(license.point),
  });

  const receipt = await tx.wait();
  if (!receipt || receipt.status !== 1) {
    throw new Error('Giao dich blockchain that bai.');
  }

  return tx.hash as string;
};

export const issueDriverLicenseOnChain = async (license: DriverLicense): Promise<string> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Khong tim thay vi Web3. Vui long cai MetaMask hoac vi tuong thich.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();

  if (!ethers.isAddress(DRIVER_LICENSE_CONTRACT_ADDRESS)) {
    throw new Error('Dia chi DriverLicense contract khong hop le.');
  }

  const contract = new ethers.Contract(
    DRIVER_LICENSE_CONTRACT_ADDRESS,
    resolveDriverLicenseAbi(),
    signer
  );
  const now = Math.floor(Date.now() / 1000);
  const issueDate = toUnixTimestamp(license.issue_date, now);

  const defaultExpiry = issueDate + PERMANENT_LICENSE_YEARS * 365 * 24 * 60 * 60;
  let expiryDate = toUnixTimestamp(license.expiry_date, defaultExpiry);
  if (expiryDate <= issueDate) {
    expiryDate = issueDate + 24 * 60 * 60;
  }

  const tx = await contract.issueLicense({
    licenseNo: license.license_no,
    holderAddress: resolveHolderAddress(license),
    holderId: license.identity_no,
    name: license.full_name,
    licenseType: license.license_type,
    issueDate,
    expiryDate,
    authorityId: license.authority_id || license.issuing_authority || 'UNKNOWN',
    point: normalizePoint(license.point),
  });

  const receipt = await tx.wait();
  if (!receipt || receipt.status !== 1) {
    throw new Error('Giao dich blockchain that bai.');
  }

  return tx.hash as string;
};

export default {
  issueDriverLicenseOnChain,
  getDriverLicenseUserInfoOnChain,
  getDriverLicenseOnChain,
  updateDriverLicenseOnChain,
};

