import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Edit,
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
  Printer,
  Shield,
  Wallet,
  Blocks,
  Wallet2
} from 'lucide-react';
import { GovAgency } from '@/types/agency.types';
import { useBreadcrumb } from '@/components/BreadcrumbContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { toast } from 'sonner';
import GovAgencyBlockchainModal from './GovAgencyBlockchainModal';
import { agencyService } from '@/services/agencyService';

const authorityTypeLabels: Record<string, string> = {
  police_department: 'Phòng CSGT',
  inspection_center: 'Trung tâm đăng kiểm',
  exam_center: 'Trung tâm sát hạch',
  registration_office: 'Phòng đăng ký xe'
};

const typeColors: Record<string, string> = {
  police_department: 'bg-blue-100 text-blue-700',
  inspection_center: 'bg-green-100 text-green-700',
  exam_center: 'bg-purple-100 text-purple-700',
  registration_office: 'bg-orange-100 text-orange-700',
};

interface AuthorityDetailPageProps {
  authority: GovAgency;
  onBack: () => void;
  onEdit: () => void;
  onAgencyUpdated: (agency: GovAgency) => void;
}

export default function AuthorityDetailPage({
  authority,
  onBack,
  onEdit,
  onAgencyUpdated
}: AuthorityDetailPageProps) {
  const { setBreadcrumbs, resetBreadcrumbs } = useBreadcrumb();
  const [isBlockchainModalOpen, setBlockchainModalOpen] = useState(false);
  const [blockchainMode, setBlockchainMode] = useState<'store' | 'revoke'>('store');

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Trang chính', onClick: onBack, isHome: true },
      { label: 'Cơ quan giao thông', onClick: onBack },
      { label: authority.name }
    ]);

    return () => {
      resetBreadcrumbs();
    };
  }, [authority.name, onBack]);

  const isActive = authority.active && authority.status === 'active';
  const hasWalletAddress = Boolean(authority.user_address);

  const handleStoreOnBlockchain = async (walletAddress?: string) => {
    if (!walletAddress) return;
    const updatedAgency = await agencyService.syncAgencyToBlockchain(authority.id, walletAddress);
    onAgencyUpdated(updatedAgency);
    toast.success('Da luu GovAgency len blockchain va cap nhat database');
  };

  const handleRevokeOnBlockchain = async () => {
    const updatedAgency = await agencyService.revokeAgencyBlockchain(authority.id);
    onAgencyUpdated(updatedAgency);
    toast.success('Da thu hoi GovAgency tren blockchain');
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    highlight = false
  }: {
    icon: any;
    label: string;
    value: React.ReactNode;
    highlight?: boolean;
  }) => (
    <div className="flex items-start gap-4 py-3">
      <div className="flex items-center gap-2 min-w-[180px] text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className={`flex-1 ${highlight ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
        {value}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold">Chi tiết cơ quan giao thông</h2>
            <p className="text-muted-foreground mt-1">
              Thông tin chi tiết về {authority.name}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setBlockchainMode('store');
              setBlockchainModalOpen(true);
            }}
          >
            <Blocks className="mr-2 h-4 w-4" />
            {hasWalletAddress ? 'Cập nhật Blockchain' : 'Lưu Blockchain'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
            disabled={!hasWalletAddress}
            onClick={() => {
              setBlockchainMode('revoke');
              setBlockchainModalOpen(true);
            }}
          >
            <Blocks className="mr-2 h-4 w-4" />
            Hủy địa chị blockchain
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            In
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Tải xuống
          </Button>
          <Button size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Thông tin cơ quan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <InfoRow
                icon={Building2}
                label="Tên cơ quan"
                value={authority.name}
                highlight
              />
              <Separator />
              <InfoRow
                icon={Building2}
                label="Mã cơ quan"
                value={
                  <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                    {authority.id}
                  </code>
                }
              />
              <Separator />
              <InfoRow
                icon={Wallet2}
                label="Địa chỉ ví"
                value={
                  <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                    {authority.user_address || 'Chưa có địa chỉ ví'}
                  </code>
                }
              />
              <Separator />
              <InfoRow
                icon={Building2}
                label="Loại hình"
                value={
                  <Badge variant="outline" className={typeColors[authority.type] || "bg-gray-100"}>
                    {authorityTypeLabels[authority.type] || authority.type}
                  </Badge>
                }
              />
              <Separator />
              <InfoRow
                icon={MapPin}
                label="Địa chỉ"
                value={authority.address || "Chưa cập nhật"}
              />
              <Separator />
              <InfoRow
                icon={MapPin}
                label="Thành phố/Tỉnh"
                value={authority.city || "Chưa cập nhật"}
              />
              <Separator />
              <InfoRow
                icon={Phone}
                label="Số điện thoại"
                value={authority.phone || "Chưa cập nhật"}
              />
              <Separator />
              <InfoRow
                icon={Mail}
                label="Email"
                value={authority.email || "Chưa cập nhật"}
              />
              <Separator />
              <InfoRow
                icon={Calendar}
                label="Ngày tạo"
                value={new Date(authority.created_at).toLocaleDateString('vi-VN')}
              />
              <Separator />
              <InfoRow
                icon={Calendar}
                label="Cập nhật lần cuối"
                value={new Date(authority.updated_at).toLocaleDateString('vi-VN')}
              />
              <Separator />
              <InfoRow
                icon={isActive ? CheckCircle : XCircle}
                label="Trạng thái"
                value={
                  <Badge className={isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                    {isActive ? "Hoạt động" : "Tạm ngừng"}
                  </Badge>
                }
                highlight
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa thông tin
              </Button>
              {authority.status === 'INACTIVE' && (
                <Button className="w-full justify-start" variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  Kích hoạt lại
                </Button>
              )}
              {authority.status === 'active' && (
                <Button className="w-full justify-start text-red-600" variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  Tạm ngưng hoạt động
                </Button>
              )}
              <Separator className="my-3" />
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Xuất báo cáo
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                In thông tin
              </Button>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái hiện tại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`h-4 w-4 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                <div>
                  <p className="font-semibold text-lg">
                    {isActive ? "Đang hoạt động" : "Tạm ngừng"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isActive
                      ? "Cơ quan đang hoạt động bình thường"
                      : "Cơ quan hiện không hoạt động"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Address (nếu có user_address từ blockchain) */}
          {/* {authority.user_address && (
            <Card>
              <CardHeader>
                <CardTitle>Địa chỉ ví</CardTitle>
              </CardHeader>
              <CardContent>
                <WalletAddressManager
                  walletAddresses={authority.user_address}
                  authorityName={authority.name}
                  onChange={(addresses) => {
                    console.log('Updated wallet addresses:', addresses);
                    // TODO: Call API to update if needed
                  }}
                />
              </CardContent>
            </Card>
          )} */}
          {!hasWalletAddress && (
            <Card className="border-amber-200/70 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-amber-800">
                  <Wallet className="h-4 w-4" />
                  Chưa có địa chỉ ví blockchain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Cơ quan này chưa có địa chỉ ví blockchain được liên kết. Vui lòng nhập địa chỉ ví để lưu thông tin lên blockchain và kích hoạt các tính năng liên quan đến blockchain.
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setBlockchainMode('store');
                    setBlockchainModalOpen(true);
                  }}
                >
                  <Blocks className="mr-2 h-4 w-4" />
                  Nhập địa chỉ và lưu lên blockchain
                </Button>
              </CardContent>
            </Card>
          )}
          {hasWalletAddress && (
            <Card className="border-cyan-200/50 shadow-lg shadow-cyan-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wallet className="h-5 w-5 text-cyan-600" />
                  Địa chỉ ví Blockchain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Địa chỉ ví Ethereum:</p>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                          <Shield className="h-3 w-3 mr-1" />
                          Đã kết nối
                        </Badge>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(authority.user_address!);
                                toast.success('Đã sao chép địa chỉ ví!');
                              }}
                              className="font-mono text-base font-medium text-cyan-700 hover:text-cyan-900 transition-colors break-all text-left"
                            >
                              {authority.user_address}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click để sao chép toàn bộ địa chỉ</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <p className="text-xs text-muted-foreground mt-3">
                        Địa chỉ này được sử dụng để xác thực và ký giao dịch trên blockchain.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Địa chỉ rút gọn:{' '}
                    <span className="font-mono font-medium">
                      {authority.user_address.slice(0, 8)}...{authority.user_address.slice(-6)}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
      <GovAgencyBlockchainModal
        open={isBlockchainModalOpen}
        mode={blockchainMode}
        defaultAddress={authority.user_address}
        agencyName={authority.name}
        onClose={() => setBlockchainModalOpen(false)}
        onConfirm={async (address) => {
          if (blockchainMode === 'store') {
            await handleStoreOnBlockchain(address);
            return;
          }
          await handleRevokeOnBlockchain();
        }}
      />
    </div>
  );
}
