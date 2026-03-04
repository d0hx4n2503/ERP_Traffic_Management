import { ethers } from 'ethers';
import { GovAgencyABI as GovAgencyABI } from './abis/GovAgencyABI';
import contractAddresses from './abis/contractAddress_eth_sepolia.json';
import type { GovAgency } from '@/types/agency.types';

const GOV_AGENCY_CONTRACT_ADDRESS = contractAddresses.GovAgency;

const resolveGovAgencyAbi = (): ethers.InterfaceAbi => {
  const abiSource = GovAgencyABI as unknown;
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

const getSignerContract = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Khong tim thay vi Web3. Vui long cai MetaMask hoac vi tuong thich.');
  }

  if (!ethers.isAddress(GOV_AGENCY_CONTRACT_ADDRESS)) {
    throw new Error('Dia chi GovAgency contract khong hop le.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    GOV_AGENCY_CONTRACT_ADDRESS,
    resolveGovAgencyAbi(),
    signer
  );
};

const mapTypeToRole = (type?: string): string => {
  switch ((type || '').trim()) {
    case 'police_department':
      return 'POLICE_DEPARTMENT';
    case 'inspection_center':
      return 'INSPECTION_CENTER';
    case 'exam_center':
      return 'EXAM_CENTER';
    case 'registration_office':
      return 'REGISTRATION_OFFICE';
    default:
      return 'GOVERNMENT_AGENCY';
  }
};

const mapStatusToEnum = (status?: string, active?: boolean): number => {
  if (active === false || status === 'inactive' || status === 'paused') {
    return 4; // Enum.Status.PAUSED
  }
  if (status === 'revoked') {
    return 5; // Enum.Status.REVOKED
  }
  return 3; // Enum.Status.ACTIVE
};

const resolveAgencyAddress = async (agency?: Partial<GovAgency>): Promise<string> => {
  if (agency?.user_address && ethers.isAddress(agency.user_address)) {
    return agency.user_address;
  }

  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Khong tim thay vi Web3. Vui long cai MetaMask hoac vi tuong thich.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  if (!signerAddress || !ethers.isAddress(signerAddress)) {
    throw new Error('Khong xac dinh duoc dia chi vi de dong bo GovAgency on-chain.');
  }
  return signerAddress;
};

const waitTx = async (tx: ethers.ContractTransactionResponse): Promise<string> => {
  const receipt = await tx.wait();
  if (!receipt || receipt.status !== 1) {
    throw new Error('Giao dich blockchain that bai.');
  }
  return tx.hash;
};

export const issueGovAgencyOnChain = async (
  agency: GovAgency,
  overrideAddress?: string
): Promise<string> => {
  if (!agency.id) {
    throw new Error('Thieu agency id de issue on-chain.');
  }

  const contract = await getSignerContract();
  const addressGovAgency = overrideAddress && ethers.isAddress(overrideAddress)
    ? overrideAddress
    : await resolveAgencyAddress(agency);

  const tx = await contract.issueAgency({
    addressGovAgency,
    agencyId: agency.id,
    name: agency.name || '',
    location: [agency.address, agency.city].filter(Boolean).join(', '),
  });
  return waitTx(tx);
};

export const updateGovAgencyOnChain = async (agency: GovAgency): Promise<string> => {
  if (!agency.id) {
    throw new Error('Thieu agency id de update on-chain.');
  }

  const contract = await getSignerContract();
  const addressGovAgency = await resolveAgencyAddress(agency);

  const tx = await contract.updateAgency(agency.id, {
    addressGovAgency,
    name: agency.name || '',
    location: [agency.address, agency.city].filter(Boolean).join(', '),
    role: mapTypeToRole(agency.type),
    status: mapStatusToEnum(agency.status, agency.active),
  });
  return waitTx(tx);
};

export const revokeGovAgencyOnChain = async (agencyId: string): Promise<string> => {
  if (!agencyId) {
    throw new Error('Thieu agency id de revoke on-chain.');
  }

  const contract = await getSignerContract();
  const tx = await contract.revokeAgency(agencyId);
  return waitTx(tx);
};

export default {
  issueGovAgencyOnChain,
  updateGovAgencyOnChain,
  revokeGovAgencyOnChain,
};
