import { ethers } from 'ethers';
import type { VehicleRegistration } from '@/types';
import { VehicleRegistrationABI } from './abis/VehicleRegistrationABI';
import contractAddresses from './abis/contractAddress_eth_sepolia.json';

const VEHICLE_REGISTRATION_CONTRACT_ADDRESS = contractAddresses.VehicleRegistration;

const resolveVehicleRegistrationAbi = (): ethers.InterfaceAbi => {
  const abiSource = VehicleRegistrationABI as unknown;
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

const normalizeColorPlate = (colorPlate: string | undefined): number => {
  const value = (colorPlate || '').trim().toLowerCase();

  if (value.includes('xanh')) return 2; // BLUE
  if (value.includes('đỏ') || value.includes('do')) return 3; // RED
  if (value.includes('vàng') || value.includes('vang') || value.includes('yellow')) return 1; // YELLOW
  return 0; // WHITE
};

const resolveVehicleOwnerAddress = (vehicle: VehicleRegistration): string => {
  const ownerAddress = vehicle.user_address;
  if (!ownerAddress || !ethers.isAddress(ownerAddress)) {
    throw new Error('Khong tim thay dia chi vi chu xe hop le tu backend (user_address).');
  }
  return ownerAddress;
};

export const issueVehicleRegistrationOnChain = async (vehicle: VehicleRegistration): Promise<string> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Khong tim thay vi Web3. Vui long cai MetaMask hoac vi tuong thich.');
  }

  if (!ethers.isAddress(VEHICLE_REGISTRATION_CONTRACT_ADDRESS)) {
    throw new Error('Dia chi VehicleRegistration contract khong hop le.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    VEHICLE_REGISTRATION_CONTRACT_ADDRESS,
    resolveVehicleRegistrationAbi(),
    signer
  );

  const addressUser = resolveVehicleOwnerAddress(vehicle);
  const tx = await contract.registerVehicleRegistration({
    addressUser,
    identityNo: vehicle.owner_id || vehicle.id,
    vehicleModel: [vehicle.brand, vehicle.type_vehicle].filter(Boolean).join(' ').trim() || vehicle.vehicle_no,
    chassisNo: vehicle.chassis_no || vehicle.engine_no || vehicle.vehicle_no,
    vehiclePlateNo: vehicle.vehicle_no,
    colorPlate: normalizeColorPlate(vehicle.color_plate),
  });
  const receipt = await tx.wait();
  if (!receipt || receipt.status !== 1) {
    throw new Error('Giao dich blockchain that bai.');
  }

  return tx.hash as string;
};

export default {
  issueVehicleRegistrationOnChain,
};
