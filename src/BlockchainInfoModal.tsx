import { useEffect, useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Loader2, Copy, CheckCircle2, XCircle, Clock, Shield, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import type { DriverLicense, VehicleRegistration } from '@/types';
import {
    getDriverLicenseOnChain,
    getDriverLicenseUserInfoOnChain,
    updateDriverLicenseOnChain,
    type DriverLicenseOnChainRecord,
} from '@/contracts/driverLicenseService';
import {
    getVehicleRegistrationOnChain,
    updateVehicleRegistrationOnChain,
    type VehicleRegistrationOnChainRecord,
} from '@/contracts/vehicleRegistrationService';
import contractAddresses from '@/contracts/abis/contractAddress_eth_sepolia.json';

type Mode = 'license' | 'vehicle';

interface BlockchainInfoModalProps {
    open: boolean;
    onClose: () => void;
    mode: Mode;
    license?: DriverLicense;
    vehicle?: VehicleRegistration;
}

type BlockchainData = {
    mode: Mode;
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
};

const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

const formatID = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

const normalizeColorPlate = (colorPlate?: string): number => {
    const value = (colorPlate || '').trim().toLowerCase();
    if (value.includes('xanh')) return 2;
    if (value.includes('đỏ') || value.includes('do')) return 3;
    if (value.includes('vàng') || value.includes('vang') || value.includes('yellow')) return 1;
    return 0;
};

const colorPlateLabel = (colorPlate: number): string => {
    switch (colorPlate) {
        case 1:
            return 'Vàng';
        case 2:
            return 'Xanh';
        case 3:
            return 'Đỏ';
        default:
            return 'Trắng';
    }
};

const normalizeIdentity = (value?: string): string => (value || '').replace(/\s+/g, '').toLowerCase();
const normalizeCode = (value?: string): string =>
    (value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

export default function BlockchainInfoModal({ open, onClose, mode, license, vehicle }: BlockchainInfoModalProps) {
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [data, setData] = useState<BlockchainData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        void loadBlockchainData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, mode, license?.id, vehicle?.id]);

    const loadBlockchainData = async () => {
        try {
            setLoading(true);
            setError(null);

            if (mode === 'license') {
                if (!license) throw new Error('Không có dữ liệu GPLX để truy vấn blockchain');
                const holderAddress = license.wallet_address || license.owner_address;
                const licenseNo = (license.license_no || '').trim();

                let onChain: DriverLicenseOnChainRecord | null = null;
                try {
                    onChain = await getDriverLicenseOnChain(licenseNo, holderAddress);
                } catch (err) {
                    // Fallback theo cơ chế cũ của OnChainUserInfoModal để giảm false "không có data".
                    if (holderAddress) {
                        try {
                            const fallback = await getDriverLicenseUserInfoOnChain(licenseNo, holderAddress);
                            if (fallback.licenseFound) {
                                onChain = {
                                    tokenId: 0n,
                                    licenseNo: fallback.licenseNo || licenseNo,
                                    holderAddress: fallback.holderAddress || holderAddress,
                                    holderId: fallback.holderId || '',
                                    name: fallback.name || '',
                                    licenseType: fallback.licenseType || '',
                                    issueDate: BigInt(fallback.issueDate || 0),
                                    expiryDate: BigInt(fallback.expiryDate || 0),
                                    status: Number(fallback.status ?? 0),
                                    authorityId: license.authority_id || license.issuing_authority || '',
                                    point: Number(fallback.point ?? 0),
                                };
                            }
                        } catch {
                            // Keep original error below.
                        }
                    }
                    if (!onChain) throw err;
                }

                setData({
                    mode: 'license',
                    tokenId: onChain.tokenId,
                    licenseNo: onChain.licenseNo,
                    holderAddress: onChain.holderAddress,
                    holderId: onChain.holderId,
                    name: onChain.name,
                    licenseType: onChain.licenseType,
                    issueDate: onChain.issueDate,
                    expiryDate: onChain.expiryDate,
                    status: onChain.status,
                    authorityId: onChain.authorityId,
                    point: BigInt(onChain.point),
                });
            } else {
                if (!vehicle) throw new Error('Không có dữ liệu phương tiện để truy vấn blockchain');
                if (!vehicle.user_address) throw new Error('Phương tiện chưa có user_address để truy vấn blockchain');

                const onChain: VehicleRegistrationOnChainRecord = await getVehicleRegistrationOnChain(
                    (vehicle.vehicle_no || '').trim(),
                    vehicle.user_address
                );

                setData({
                    mode: 'vehicle',
                    tokenId: 0n,
                    licenseNo: onChain.vehiclePlateNo,
                    holderAddress: onChain.addressUser,
                    holderId: onChain.identityNo,
                    name: onChain.vehicleModel,
                    licenseType: colorPlateLabel(onChain.colorPlate),
                    issueDate: 0n,
                    expiryDate: 0n,
                    status: onChain.status,
                    authorityId: onChain.chassisNo,
                    point: BigInt(onChain.colorPlate),
                });

                console.log("status: ", data?.status)
            }

            toast.success('Đã tải dữ liệu từ blockchain');
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Lỗi khi tải dữ liệu từ blockchain';
            setError(message);
            if (message.toLowerCase().includes('chưa có dữ liệu')) {
                toast.info(message);
            } else {
                toast.error('Không thể tải dữ liệu từ blockchain');
            }
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Đã sao chép vào clipboard');
    };

    const formatDate = (timestamp: bigint) => {
        if (!timestamp || timestamp === 0n) return 'N/A';
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 0:
                return (
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Hoạt động
                    </Badge>
                );
            case 1:
                return (
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Tạm dừng
                    </Badge>
                );
            case 2:
                return (
                    <Badge className="bg-red-100 text-red-700 border-red-300">
                        <XCircle className="w-3 h-3 mr-1" />
                        Thu hồi
                    </Badge>
                );
            case 3:
                return (
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Hoạt động
                    </Badge>
                );
            default:
                return <Badge variant="outline">Không xác định</Badge>;
        }
    };

    const checkDataMatch = (): boolean => {
        if (!data) return true;

        if (mode === 'license' && license) {
            const blockchainIssueDate = formatDate(data.issueDate);
            const blockchainExpiryDate = formatDate(data.expiryDate);
            const uiIssueDate = new Date(license.issue_date).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            const uiExpiryDate = license.expiry_date
                ? new Date(license.expiry_date).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })
                : 'N/A';

            return (
                normalizeCode(data.licenseNo) === normalizeCode(license.license_no) &&
                data.name === license.full_name &&
                data.licenseType === license.license_type &&
                data.holderAddress.toLowerCase() === (license.wallet_address || license.owner_address || '').toLowerCase() &&
                normalizeIdentity(data.holderId) === normalizeIdentity(license.identity_no) &&
                blockchainIssueDate === uiIssueDate &&
                blockchainExpiryDate === uiExpiryDate
            );
        }

        if (mode === 'vehicle' && vehicle) {
            return (
                normalizeCode(data.licenseNo) === normalizeCode(vehicle.vehicle_no) &&
                data.holderAddress.toLowerCase() === (vehicle.user_address || '').toLowerCase() &&
                normalizeIdentity(data.holderId) === normalizeIdentity(vehicle.owner_id || vehicle.id) &&
                Number(data.point) === normalizeColorPlate(vehicle.color_plate)
            );
        }

        return true;
    };

    const handleUpdateBlockchain = async () => {
        try {
            setUpdating(true);
            toast.loading('Đang cập nhật blockchain...', { id: 'update-blockchain' });

            if (mode === 'license') {
                if (!license) throw new Error('Không có dữ liệu GPLX để cập nhật');
                await updateDriverLicenseOnChain(license);
            } else {
                if (!vehicle) throw new Error('Không có dữ liệu phương tiện để cập nhật');
                await updateVehicleRegistrationOnChain(vehicle);
            }

            await loadBlockchainData();
            toast.success('Đã cập nhật dữ liệu lên blockchain', { id: 'update-blockchain' });
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Không thể cập nhật blockchain';
            toast.error(message, { id: 'update-blockchain' });
        } finally {
            setUpdating(false);
        }
    };

    const dataMatches = checkDataMatch();

    const DataRow = ({
        label,
        value,
        copyable = false,
        mismatch = false,
    }: {
        label: string;
        value: string | ReactNode;
        copyable?: boolean;
        mismatch?: boolean;
    }) => (
        <div className={`flex items-start gap-3 py-2.5 px-3 rounded-md ${mismatch ? 'bg-red-50 border-l-4 border-red-500' : ''}`}>
            <p className="text-sm text-gray-600 min-w-[140px] pt-1">{label}</p>
            <div className="flex items-start gap-2 flex-1 justify-end">
                <div className="text-sm text-gray-900 text-right break-all">
                    {copyable && typeof value === 'string' ? (
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all">{value}</code>
                    ) : (
                        value
                    )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                    {copyable && typeof value === 'string' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 hover:bg-gray-200"
                            onClick={() => copyToClipboard(value)}
                        >
                            <Copy className="w-3.5 h-3.5" />
                        </Button>
                    )}
                    {mismatch && <AlertCircle className="w-4 h-4 text-red-500" />}
                </div>
            </div>
        </div>
    );

    const explorerContract = mode === 'license' ? contractAddresses.DriverLicense : contractAddresses.VehicleRegistration;

    return (
        <Dialog open={open} onOpenChange={(nextOpen: any) => !nextOpen && onClose()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">Thông tin trên Blockchain</DialogTitle>
                            <DialogDescription className="text-sm">
                                Dữ liệu {mode === 'license' ? 'GPLX' : 'phương tiện'} được lưu trữ an toàn trên blockchain
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mb-4" />
                            <p className="text-gray-600 text-sm">Đang truy vấn blockchain...</p>
                        </div>
                    )}

                    {error && !loading && (
                        <Card className="p-4 bg-red-50 border-red-200">
                            <div className="flex items-center gap-3 text-red-700">
                                <XCircle className="w-5 h-5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-sm">Không thể tải dữ liệu</p>
                                    <p className="text-xs text-red-600 mt-1">{error}</p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {data && !loading && (
                        <div className="space-y-3">
                            <Card className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-purple-900">Đã xác thực trên Blockchain</p>
                                            <p className="text-xs text-purple-700 mt-0.5">Dữ liệu được lưu trữ bất biến và minh bạch</p>
                                        </div>
                                    </div>
                                    {!dataMatches && (
                                        <Badge variant="destructive" className="gap-1 flex-shrink-0">
                                            <AlertCircle className="w-3 h-3" />
                                            Dữ liệu không khớp
                                        </Badge>
                                    )}
                                    {dataMatches && (
                                        <Badge className="bg-green-100 text-green-700 border-green-300 gap-1 flex-shrink-0">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Dữ liệu khớp
                                        </Badge>
                                    )}
                                </div>
                            </Card>

                            <Card className="p-3">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 pb-2 border-b text-sm">
                                    <Shield className="w-4 h-4 text-cyan-600" />
                                    Thông tin Blockchain
                                </h3>

                                <div className="space-y-1">
                                    <DataRow label="Token ID" value={data.tokenId.toString()} copyable />

                                    <DataRow
                                        label={mode === 'license' ? 'Số GPLX' : 'Biển số xe'}
                                        value={data.licenseNo}
                                        copyable
                                        mismatch={
                                            mode === 'license'
                                                ? !!license && normalizeCode(data.licenseNo) !== normalizeCode(license.license_no)
                                                : !!vehicle && normalizeCode(data.licenseNo) !== normalizeCode(vehicle.vehicle_no)
                                        }
                                    />

                                    <DataRow
                                        label="Địa chỉ Blockchain"
                                        value={formatAddress(data.holderAddress)}
                                        copyable
                                        mismatch={
                                            mode === 'license'
                                                ? !!license &&
                                                data.holderAddress.toLowerCase() !==
                                                (license.wallet_address || license.owner_address || '').toLowerCase()
                                                : !!vehicle && data.holderAddress.toLowerCase() !== (vehicle.user_address || '').toLowerCase()
                                        }
                                    />

                                    <DataRow
                                        label="CCCD/CMND"
                                        value={data.holderId}
                                        mismatch={
                                            mode === 'license'
                                                ? !!license && normalizeIdentity(data.holderId) !== normalizeIdentity(license.identity_no)
                                                : !!vehicle &&
                                                normalizeIdentity(data.holderId) !== normalizeIdentity(vehicle.owner_id || vehicle.id)
                                        }
                                    />

                                    <DataRow
                                        label={mode === 'license' ? 'Họ và tên' : 'Mẫu xe'}
                                        value={data.name}
                                        mismatch={mode === 'license' ? !!license && data.name !== license.full_name : false}
                                    />

                                    <DataRow
                                        label={mode === 'license' ? 'Hạng GPLX' : 'Màu biển'}
                                        value={
                                            <Badge variant="outline" className="border-cyan-300 text-cyan-700 text-xs">
                                                {data.licenseType}
                                            </Badge>
                                        }
                                        mismatch={
                                            mode === 'license'
                                                ? !!license && data.licenseType !== license.license_type
                                                : !!vehicle && Number(data.point) !== normalizeColorPlate(vehicle.color_plate)
                                        }
                                    />
                                    {mode === 'license' && (
                                        <>
                                            <DataRow
                                                label="Ngày cấp"
                                                value={formatDate(data.issueDate)}
                                                mismatch={
                                                    mode === 'license' && !!license
                                                        ? formatDate(data.issueDate) !==
                                                        new Date(license.issue_date).toLocaleDateString('vi-VN', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })
                                                        : false
                                                }
                                            />

                                            <DataRow
                                                label="Ngày hết hạn"
                                                value={formatDate(data.expiryDate)}
                                                mismatch={
                                                    mode === 'license' && !!license
                                                        ? formatDate(data.expiryDate) !==
                                                        (license.expiry_date
                                                            ? new Date(license.expiry_date).toLocaleDateString('vi-VN', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                            })
                                                            : 'N/A')
                                                        : false
                                                }
                                            />
                                        </>
                                    )}

                                    <DataRow label="Trạng thái" value={getStatusBadge(data.status)} />

                                    <DataRow label={mode === 'license' ? 'Mã cơ quan cấp' : 'Số khung'} value={formatID(data.authorityId)} />

                                    {mode === 'license' && (
                                        <>
                                            <DataRow
                                                label={mode === 'license' ? 'Điểm vi phạm' : 'Mã màu biển'}
                                                value={
                                                    <Badge variant={Number(data.point) > 0 ? 'destructive' : 'outline'} className="text-xs">
                                                        {data.point.toString()} {mode === 'license' ? 'điểm' : ''}
                                                    </Badge>
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )}
                </div>

                {data && !loading && (
                    <div className="flex items-center justify-between pt-3 border-t flex-shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`https://sepolia.etherscan.io/address/${explorerContract}`, '_blank')}
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Xem trên Etherscan
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={handleUpdateBlockchain}
                                disabled={dataMatches || updating}
                                className="hover:from-purple-700 hover:to-blue-700"
                            >
                                {updating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Đang cập nhật...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Cập nhật Blockchain
                                    </>
                                )}
                            </Button>

                            <Button variant="outline" size="sm" onClick={onClose}>
                                Đóng
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
