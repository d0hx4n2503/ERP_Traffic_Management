import { ethers } from 'ethers';
import { TrafficControllerABI } from './abis/TrafficControllerABI';

// Contract address
export const TRAFFIC_CONTROLLER_ADDRESS = '0xd7e05D8de832bc229BA6787E882bF83C2171774b';

// DEFAULT_ADMIN_ROLE constant
export const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';

/**
 * Interface cho core contracts
 */
export interface CoreContracts {
  govAgency: string;
  vehicleRegistration: string;
  offenceAndRenewal: string;
  driverLicense: string;
  isPaused: boolean;
}

/**
 * Get provider and signer
 */
const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  throw new Error('No Ethereum provider found');
};

const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

/**
 * Get contract instance (read-only)
 */
const getContract = () => {
  const provider = getProvider();
  return new ethers.Contract(
    TRAFFIC_CONTROLLER_ADDRESS,
    TrafficControllerABI,
    provider
  );
};

/**
 * Get contract instance with signer (for write operations)
 */
const getContractWithSigner = async () => {
  const signer = await getSigner();
  return new ethers.Contract(
    TRAFFIC_CONTROLLER_ADDRESS,
    TrafficControllerABI,
    signer
  );
};

/**
 * READ FUNCTIONS (View/Pure)
 */

/**
 * Lấy tất cả địa chỉ của core contracts
 */
export const getAllCoreContracts = async (): Promise<CoreContracts> => {
  try {
    const contract = getContract();
    const result = await contract.getAllCoreContracts();

    return {
      govAgency: result[0],
      vehicleRegistration: result[1],
      offenceAndRenewal: result[2],
      driverLicense: result[3],
      isPaused: result[4],
    };
  } catch (error) {
    console.error('Error getting all core contracts:', error);
    throw error;
  }
};

/**
 * Lấy địa chỉ GovAgency contract
 */
export const getGovAgency = async (): Promise<string> => {
  try {
    const contract = getContract();
    return await contract.govAgency();
  } catch (error) {
    console.error('Error getting GovAgency address:', error);
    throw error;
  }
};

/**
 * Lấy địa chỉ DriverLicense contract
 */
export const getDriverLicense = async (): Promise<string> => {
  try {
    const contract = getContract();
    return await contract.driverLicense();
  } catch (error) {
    console.error('Error getting DriverLicense address:', error);
    throw error;
  }
};

/**
 * Lấy địa chỉ VehicleRegistration contract
 */
export const getVehicleRegistration = async (): Promise<string> => {
  try {
    const contract = getContract();
    return await contract.vehicleRegistration();
  } catch (error) {
    console.error('Error getting VehicleRegistration address:', error);
    throw error;
  }
};

/**
 * Lấy địa chỉ OffenceAndRenewal contract
 */
export const getOffenceAndRenewal = async (): Promise<string> => {
  try {
    const contract = getContract();
    return await contract.offenceAndRenewal();
  } catch (error) {
    console.error('Error getting OffenceAndRenewal address:', error);
    throw error;
  }
};

/**
 * Kiểm tra trạng thái pause của hệ thống
 */
export const isPaused = async (): Promise<boolean> => {
  try {
    const contract = getContract();
    return await contract.isPaused();
  } catch (error) {
    console.error('Error checking pause status:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem địa chỉ có phải là GovAgency contract không
 */
export const isGovAgency = async (address: string): Promise<boolean> => {
  try {
    const contract = getContract();
    return await contract.isGovAgency(address);
  } catch (error) {
    console.error('Error checking GovAgency:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem địa chỉ có phải là DriverLicense contract không
 */
export const isDriverLicense = async (address: string): Promise<boolean> => {
  try {
    const contract = getContract();
    return await contract.isDriverLicense(address);
  } catch (error) {
    console.error('Error checking DriverLicense:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem địa chỉ có phải là VehicleRegistration contract không
 */
export const isVehicleRegistration = async (address: string): Promise<boolean> => {
  try {
    const contract = getContract();
    return await contract.isVehicleRegistration(address);
  } catch (error) {
    console.error('Error checking VehicleRegistration:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem địa chỉ có phải là OffenceAndRenewal contract không
 */
export const isOffenceAndRenewal = async (address: string): Promise<boolean> => {
  try {
    const contract = getContract();
    return await contract.isOffenceAndRenewal(address);
  } catch (error) {
    console.error('Error checking OffenceAndRenewal:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem account có role không
 */
export const hasRole = async (role: string, account: string): Promise<boolean> => {
  try {
    const contract = getContract();
    return await contract.hasRole(role, account);
  } catch (error) {
    console.error('Error checking role:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem account có phải là admin không
 */
export const isAdmin = async (account: string): Promise<boolean> => {
  return hasRole(DEFAULT_ADMIN_ROLE, account);
};

/**
 * WRITE FUNCTIONS (Transactions)
 */

/**
 * Set địa chỉ GovAgency contract
 */
export const setGovAgency = async (address: string): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.setGovAgency(address);
    return tx;
  } catch (error) {
    console.error('Error setting GovAgency address:', error);
    throw error;
  }
};

/**
 * Set địa chỉ DriverLicense contract
 */
export const setDriverLicense = async (address: string): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.setDriverLicense(address);
    return tx;
  } catch (error) {
    console.error('Error setting DriverLicense address:', error);
    throw error;
  }
};

/**
 * Set địa chỉ VehicleRegistration contract
 */
export const setVehicleRegistration = async (address: string): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.setVehicleRegistration(address);
    return tx;
  } catch (error) {
    console.error('Error setting VehicleRegistration address:', error);
    throw error;
  }
};

/**
 * Set địa chỉ OffenceAndRenewal contract
 */
export const setOffenceAndRenewal = async (address: string): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.setOffenceAndRenewal(address);
    return tx;
  } catch (error) {
    console.error('Error setting OffenceAndRenewal address:', error);
    throw error;
  }
};

/**
 * Pause hệ thống
 */
export const pauseSystem = async (): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.pause();
    return tx;
  } catch (error) {
    console.error('Error pausing system:', error);
    throw error;
  }
};

/**
 * Unpause hệ thống
 */
export const unpauseSystem = async (): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.unpause();
    return tx;
  } catch (error) {
    console.error('Error unpausing system:', error);
    throw error;
  }
};

/**
 * Grant role cho account
 */
export const grantRole = async (role: string, account: string): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.grantRole(role, account);
    return tx;
  } catch (error) {
    console.error('Error granting role:', error);
    throw error;
  }
};

/**
 * Revoke role từ account
 */
export const revokeRole = async (role: string, account: string): Promise<ethers.ContractTransactionResponse> => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.revokeRole(role, account);
    return tx;
  } catch (error) {
    console.error('Error revoking role:', error);
    throw error;
  }
};

/**
 * HELPER FUNCTIONS
 */

/**
 * Wait for transaction to be mined
 */
export const waitForTransaction = async (tx: ethers.ContractTransactionResponse) => {
  try {
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error waiting for transaction:', error);
    throw error;
  }
};

/**
 * Format address (short version)
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Validate Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
};

/**
 * Get current connected account
 */
export const getCurrentAccount = async (): Promise<string> => {
  try {
    const signer = await getSigner();
    return await signer.getAddress();
  } catch (error) {
    console.error('Error getting current account:', error);
    throw error;
  }
};

/**
 * Request account access
 */
export const requestAccounts = async (): Promise<string[]> => {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    throw new Error('No Ethereum provider found');
  } catch (error) {
    console.error('Error requesting accounts:', error);
    throw error;
  }
};

export default {
  // Contract info
  TRAFFIC_CONTROLLER_ADDRESS,
  DEFAULT_ADMIN_ROLE,

  // Read functions
  getAllCoreContracts,
  getGovAgency,
  getDriverLicense,
  getVehicleRegistration,
  getOffenceAndRenewal,
  isPaused,
  isGovAgency,
  isDriverLicense,
  isVehicleRegistration,
  isOffenceAndRenewal,
  hasRole,
  isAdmin,

  // Write functions
  setGovAgency,
  setDriverLicense,
  setVehicleRegistration,
  setOffenceAndRenewal,
  pauseSystem,
  unpauseSystem,
  grantRole,
  revokeRole,

  // Helper functions
  waitForTransaction,
  formatAddress,
  isValidAddress,
  getCurrentAccount,
  requestAccounts,
};
