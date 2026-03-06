import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ethers } from 'ethers';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Loader2,
    RefreshCcw,
    Database,
    FileText,
    Car,
    Building2,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getAllCoreContracts } from '@/contracts/trafficControllerService';
import { DriverLicenseABI } from '@/contracts/abis/DriverLicenseABI';
import { VehicleRegistrationABI } from '@/contracts/abis/VehicleRegistrationABI';
import { GovAgencyABI } from '@/contracts/abis/GovAgencyABI';

type TabKey = 'driver-license' | 'vehicle-registration' | 'gov-agency';

interface DriverLicenseOnChain {
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
    point: bigint;
}

interface VehicleRegistrationOnChain {
    addressUser: string;
    identityNo: string;
    vehicleModel: string;
    chassisNo: string;
    vehiclePlateNo: string;
    colorPlate: bigint;
    status: number;
}

interface GovAgencyOnChain {
    addressGovAgency: string;
    agencyId: string;
    name: string;
    location: string;
    role: string;
    status: number;
}

type CoreContracts = {
    driverLicense: string;
    vehicleRegistration: string;
    govAgency: string;
};

const resolveAbi = (abiSource: unknown): ethers.InterfaceAbi => {
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

const getReadContract = (address: string, abi: unknown) => {
    if (!window.ethereum) {
        throw new Error('Không tìm thấy ví Web3 (MetaMask).');
    }
    if (!ethers.isAddress(address)) {
        throw new Error(`Địa chỉ contract không hợp lệ: ${address}`);
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(address, resolveAbi(abi), provider);
};

export default function BlockchainDataManagement() {
    const [activeTab, setActiveTab] = useState<TabKey>('driver-license');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [contractAddresses, setContractAddresses] = useState<CoreContracts>({
        driverLicense: '',
        vehicleRegistration: '',
        govAgency: '',
    });

    const [driverLicenses, setDriverLicenses] = useState<DriverLicenseOnChain[]>([]);
    const [vehicleRegistrations, setVehicleRegistrations] = useState<VehicleRegistrationOnChain[]>([]);
    const [govAgencies, setGovAgencies] = useState<GovAgencyOnChain[]>([]);

    useEffect(() => {
        void loadContractAddresses();
    }, []);

    useEffect(() => {
        if (contractAddresses.driverLicense) {
            void loadData();
        }
    }, [activeTab, contractAddresses.driverLicense]);

    const loadContractAddresses = async () => {
        try {
            setLoading(true);
            setError(null);
            const contracts = await getAllCoreContracts();
            setContractAddresses({
                driverLicense: contracts.driverLicense,
                vehicleRegistration: contracts.vehicleRegistration,
                govAgency: contracts.govAgency,
            });
        } catch (e: any) {
            console.error(e);
            setError('Không thể tải địa chỉ core contracts. Vui lòng kiểm tra kết nối ví và mạng blockchain.');
            toast.error('Không thể tải địa chỉ core contracts');
        } finally {
            setLoading(false);
        }
    };

    const loadData = async () => {
        try {
            setRefreshing(true);
            setError(null);

            if (activeTab === 'driver-license') {
                const c = getReadContract(contractAddresses.driverLicense, DriverLicenseABI);
                const rows = await c.getAllLicenses();
                const mapped: DriverLicenseOnChain[] = (rows || []).map((r: any) => ({
                    tokenId: BigInt(r.tokenId ?? 0),
                    licenseNo: String(r.licenseNo ?? ''),
                    holderAddress: String(r.holderAddress ?? ''),
                    holderId: String(r.holderId ?? ''),
                    name: String(r.name ?? ''),
                    licenseType: String(r.licenseType ?? ''),
                    issueDate: BigInt(r.issueDate ?? 0),
                    expiryDate: BigInt(r.expiryDate ?? 0),
                    status: Number(r.status ?? 0),
                    authorityId: String(r.authorityId ?? ''),
                    point: BigInt(r.point ?? 0),
                }));
                setDriverLicenses(mapped);
                toast.success(`Đã tải ${mapped.length} bản ghi GPLX từ getAllLicenses()`);
            }

            if (activeTab === 'vehicle-registration') {
                const c = getReadContract(contractAddresses.vehicleRegistration, VehicleRegistrationABI);
                const rows = await c.getAllVehicleRegistrations();
                const mapped: VehicleRegistrationOnChain[] = (rows || []).map((r: any) => ({
                    addressUser: String(r.addressUser ?? ''),
                    identityNo: String(r.identityNo ?? ''),
                    vehicleModel: String(r.vehicleModel ?? ''),
                    chassisNo: String(r.chassisNo ?? ''),
                    vehiclePlateNo: String(r.vehiclePlateNo ?? ''),
                    colorPlate: BigInt(r.colorPlate ?? 0),
                    status: Number(r.status ?? 0),
                }));
                setVehicleRegistrations(mapped);
                toast.success(`Đã tải ${mapped.length} bản ghi xe từ getAllVehicleRegistrations()`);
            }

            if (activeTab === 'gov-agency') {
                const c = getReadContract(contractAddresses.govAgency, GovAgencyABI);
                const rows = await c.getAllAgencies();
                const mapped: GovAgencyOnChain[] = (rows || []).map((r: any) => ({
                    addressGovAgency: String(r.addressGovAgency ?? ''),
                    agencyId: String(r.agencyId ?? ''),
                    name: String(r.name ?? ''),
                    location: String(r.location ?? ''),
                    role: String(r.role ?? ''),
                    status: Number(r.status ?? 0),
                }));
                setGovAgencies(mapped.filter((a) => a.agencyId));
                toast.success(`Đã tải ${mapped.length} bản ghi cơ quan từ getAllAgencies()`);
            }
        } catch (e: any) {
            console.error(e);
            const errorMessage = e?.message || 'Lỗi không xác định';
            setError(`Lỗi tải dữ liệu blockchain: ${errorMessage}`);
            toast.error(`Lỗi tải dữ liệu blockchain: ${errorMessage}`);
        } finally {
            setRefreshing(false);
        }
    };

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 0:
            case 3:
                return (
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Hoạt động
                    </Badge>
                );
            case 1:
            case 4:
                return (
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Tạm dừng
                    </Badge>
                );
            case 2:
            case 5:
                return (
                    <Badge className="bg-red-100 text-red-700 border-red-300">
                        <XCircle className="w-3 h-3 mr-1" />
                        Thu hồi
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Không xác định
                    </Badge>
                );
        }
    };

    const formatDate = (timestamp: bigint | number) => {
        if (!timestamp || timestamp === 0n || timestamp === 0) return 'N/A';
        return new Date(Number(timestamp) * 1000).toLocaleDateString('vi-VN');
    };

    const formatAddress = (address: string) => {
        if (!address) return 'N/A';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
                    <p className="text-gray-600">Đang kết nối với các hợp đồng blockchain...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/30">
                        <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Dữ liệu Blockchain</h1>
                        <p className="text-sm text-gray-600 mt-1">Dữ liệu trong hợp đồng blockchain</p>
                    </div>
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => void loadData()}
                                disabled={refreshing}
                                variant="outline"
                                size="icon"
                                className="border-cyan-200 hover:bg-cyan-50 hover:border-cyan-400"
                            >
                                <RefreshCcw className={`w-4 h-4 text-cyan-600 ${refreshing ? 'animate-spin' : ''}`} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Tải lại dữ liệu</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {error && (
                <Alert className="border-yellow-200 bg-yellow-50">
                    <Info className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">{error}</AlertDescription>
                </Alert>
            )}

            <Card className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AddressInfo label="Địa chỉ hợp đồng GPLX" value={contractAddresses.driverLicense} />
                    <AddressInfo label="Địa chỉ hợp đồng Đăng ký Phương tiện" value={contractAddresses.vehicleRegistration} />
                    <AddressInfo label="Địa chỉ hợp đồng Cơ quan" value={contractAddresses.govAgency} />
                </div>
            </Card>

            <Tabs value={activeTab} onValueChange={(v: string) => setActiveTab(v as TabKey)} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white border border-cyan-200">
                    <TabsTrigger value="driver-license" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        GPLX ({driverLicenses.length})
                    </TabsTrigger>
                    <TabsTrigger value="vehicle-registration" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
                        <Car className="w-4 h-4 mr-2" />
                        Phương tiện ({vehicleRegistrations.length})
                    </TabsTrigger>
                    <TabsTrigger value="gov-agency" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
                        <Building2 className="w-4 h-4 mr-2" />
                        Cơ quan ({govAgencies.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="driver-license" className="mt-6">
                    <Card className="border-cyan-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Chủ sở hữu</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">CCCD</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Tên</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Hạng</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Ngày cấp</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Hết hạn</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Điểm</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {driverLicenses.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                                Không có dữ liệu từ getAllLicenses()
                                            </td>
                                        </tr>
                                    ) : (
                                        driverLicenses.map((row, idx) => (
                                            <motion.tr key={`${row.licenseNo}-${idx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="hover:bg-cyan-50/50 transition-colors">
                                                <td className="px-4 py-3 text-sm">
                                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{formatAddress(row.holderAddress)}</code>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{row.holderId}</td>
                                                <td className="px-4 py-3 text-sm font-medium">{row.name}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <Badge variant="outline" className="border-cyan-300 text-cyan-700">
                                                        {row.licenseType}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{formatDate(row.issueDate)}</td>
                                                <td className="px-4 py-3 text-sm">{formatDate(row.expiryDate)}</td>
                                                <td className="px-4 py-3 text-sm">{Number(row.point)}</td>
                                                <td className="px-4 py-3 text-sm">{getStatusBadge(row.status)}</td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="vehicle-registration" className="mt-6">
                    <Card className="border-cyan-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Chủ xe</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">ID Chủ sở hữu/ CCCD</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Biển số</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Loại xe</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Số khung</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Màu biển</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {vehicleRegistrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                                Không có dữ liệu từ getAllVehicleRegistrations()
                                            </td>
                                        </tr>
                                    ) : (
                                        vehicleRegistrations.map((row, idx) => (
                                            <motion.tr key={`${row.vehiclePlateNo}-${idx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="hover:bg-cyan-50/50 transition-colors">
                                                <td className="px-4 py-3 text-sm">
                                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{row.addressUser}</code>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{row.identityNo}</td>
                                                <td className="px-4 py-3 text-sm font-medium">{row.vehiclePlateNo}</td>
                                                <td className="px-4 py-3 text-sm">{row.vehicleModel}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{row.chassisNo}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <Badge variant="outline">{['Trắng', 'Vàng', 'Xanh', 'Đỏ'][Number(row.colorPlate)] || 'N/A'}</Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{getStatusBadge(row.status)}</td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="gov-agency" className="mt-6">
                    <Card className="border-cyan-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Địa chỉ</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Mã cơ quan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Tên cơ quan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Địa điểm</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Vai trò</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {govAgencies.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                                Không có dữ liệu từ getAllAgencies()
                                            </td>
                                        </tr>
                                    ) : (
                                        govAgencies.map((row, idx) => (
                                            <motion.tr key={`${row.agencyId}-${idx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="hover:bg-cyan-50/50 transition-colors">
                                                <td className="px-4 py-3 text-sm">
                                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{formatAddress(row.addressGovAgency)}</code>
                                                </td>
                                                <td className="px-4 py-3 text-sm">{row.agencyId}</td>
                                                <td className="px-4 py-3 text-sm font-medium">{row.name}</td>
                                                <td className="px-4 py-3 text-sm">{row.location}</td>
                                                <td className="px-4 py-3 text-sm">{row.role}</td>
                                                <td className="px-4 py-3 text-sm">{getStatusBadge(row.status)}</td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function AddressInfo({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-gray-600 mb-1">{label}</p>
            <code className="text-xs bg-white px-2 py-1 rounded border border-cyan-200">
                {value ? `${value.slice(0, 6)}...${value.slice(-4)}` : 'N/A'}
            </code>
        </div>
    );
}
