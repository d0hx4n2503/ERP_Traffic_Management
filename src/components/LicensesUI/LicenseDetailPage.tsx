import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
  ArrowLeft,
  Edit,
  FileText,
  Calendar,
  MapPin,
  User,
  CreditCard,
  AlertTriangle,
  Ban,
  RefreshCw,
  Download,
  Printer,
  Blocks,
  Shield, WalletCards
} from 'lucide-react';
import { useBreadcrumb } from '../BreadcrumbContext';
import { toast } from 'sonner';
import BlockchainConfirmModal from '@/components/BlockchainConfirmModal';
import licenseService from '@/services/licenseService';
import type { DriverLicense } from '@/types';
import { statusConfig } from '@/constants/status.constant';
import { Province, PROVINCE_LABEL } from '@/constants/city.constant';
import {
  getDriverLicenseUserInfoOnChain,
  issueDriverLicenseOnChain,
  type DriverLicenseUserOnChainInfo,
} from '@/contracts/driverLicenseService';
import OnChainUserInfoModal from './OnChainUserInfoModal';

interface LicenseDetailPageProps {
  license: DriverLicense;
  onBack: () => void;
  onEdit: () => void;
}

export default function LicenseDetailPage({ license, onBack, onEdit }: LicenseDetailPageProps) {
  const { setBreadcrumbs, resetBreadcrumbs } = useBreadcrumb();
  const [showBlockchainModal, setShowBlockchainModal] = useState(false);
  const [showOnChainModal, setShowOnChainModal] = useState(false);
  const [currentLicense, setCurrentLicense] = useState<DriverLicense>(license);
  const [isCheckingOnChain, setIsCheckingOnChain] = useState(false);
  const [onChainUserInfo, setOnChainUserInfo] = useState<DriverLicenseUserOnChainInfo | null>(null);

  useEffect(() => {
    setCurrentLicense(license);
  }, [license]);

  useEffect(() => {
    // Set breadcrumbs
    setBreadcrumbs([
      { label: 'Trang chính', onClick: onBack, isHome: true },
      { label: 'Quản lý GPLX', onClick: onBack },
      { label: currentLicense.license_no }
    ]);

    return () => {
      resetBreadcrumbs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLicense.license_no]);

  const InfoRow = ({ icon: Icon, label, value, highlight }: any) => (
    <div className="flex items-start gap-4 py-3">
      <div className="flex items-center gap-2 min-w-[180px] text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className={`flex-1 ${highlight ? 'font-medium' : ''}`}>
        {value}
      </div>
    </div>
  );

  const handleConfirmBlockchain = async () => {
    const txHash = await issueDriverLicenseOnChain(currentLicense);
    const updatedLicense = await licenseService.confirmBlockchainStorage(currentLicense.id, txHash);
    setCurrentLicense(updatedLicense);
    toast.success('Đã ký giao dịch và cập nhật dữ liệu blockchain');
  };

  const handleCheckUserOnChain = async () => {
    const holderAddress = currentLicense.wallet_address || currentLicense.owner_address;
    if (!holderAddress) {
      toast.error('Không tìm thấy địa chỉ ví của người dùng để kiểm tra');
      return;
    }

    setIsCheckingOnChain(true);
    try {
      const info = await getDriverLicenseUserInfoOnChain(currentLicense.license_no, holderAddress);
      setOnChainUserInfo(info);
      toast.success('Đã kiểm tra thông tin on-chain thành công');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Không thể kiểm tra thông tin on-chain';
      toast.error(message);
    } finally {
      setIsCheckingOnChain(false);
    }
  };

  const handleOpenOnChainModal = async () => {
    setShowOnChainModal(true);
    await handleCheckUserOnChain();
  };

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
            <h2 className="text-3xl">Chi tiết GPLX</h2>
            <p className="text-muted-foreground mt-1">
              Thông tin chi tiết giấy phép lái xe {currentLicense.license_no}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {currentLicense.on_blockchain ? (
            <Button
              variant="outline"
              className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-cyan-400 hover:border-cyan-500 text-cyan-700"
              size="sm"
              disabled
            >
              <Shield className="mr-2 h-4 w-4" />
              Đã lưu trữ vào Blockchain
            </Button>
          ) : (
            <Button
              variant="outline"
              className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-300 hover:border-purple-400 text-purple-700"
              size="sm"
              onClick={() => setShowBlockchainModal(true)}
            >
              <Blocks className="mr-2 h-4 w-4" />
              LƯU VÀO BLOCKCHAIN
            </Button>
          )}
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
        {/* Main Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Thông tin GPLX
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <InfoRow
                icon={FileText}
                label="Số GPLX"
                value={currentLicense.license_no}
                highlight
              />
              <Separator />
              <InfoRow
                icon={WalletCards}
                label="Số GPLX"
                value={currentLicense.wallet_address ? (
                  <span className="font-mono text-sm">
                    {currentLicense.wallet_address}
                  </span>
                ) : 'Chưa liên kết ví'}
                highlight
              />
              <Separator />
              <InfoRow
                icon={User}
                label="Người sở hữu"
                value={currentLicense.full_name}
              />
              <Separator />
              <InfoRow
                icon={CreditCard}
                label="CCCD/CMND"
                value={currentLicense.identity_no}
              />
              <Separator />
              <InfoRow
                icon={FileText}
                label="Hạng GPLX"
                value={<Badge variant="outline" className="text-base">{currentLicense.license_type}</Badge>}
              />
              <Separator />
              <InfoRow
                icon={MapPin}
                label="Nơi cấp"
                value={currentLicense.issuing_authority}
              />
              <Separator />
              <InfoRow
                icon={MapPin}
                label="Thành phố"
                value={
                  PROVINCE_LABEL[
                  currentLicense.owner_city as Province
                  ] ?? 'Không xác định'
                }
              />
              <Separator />
              <InfoRow
                icon={Calendar}
                label="Ngày cấp"
                value={new Date(currentLicense.issue_date).toLocaleDateString('vi-VN')}
              />
              <Separator />
              <InfoRow
                icon={Calendar}
                label="Ngày hết hạn"
                value={currentLicense.expiry_date ? new Date(currentLicense.expiry_date).toLocaleDateString('vi-VN') : 'Vô thời hạn'}
              />
              <Separator />
              <InfoRow
                icon={AlertTriangle}
                label="Điểm còn lại"
                value={
                  <Badge variant={currentLicense.point <= 5 ? 'destructive' : 'secondary'}>
                    {currentLicense.point} điểm
                  </Badge>
                }
              />
              <Separator />
              <InfoRow
                icon={FileText}
                label="Trạng thái"
                value={
                  <Badge className={statusConfig[currentLicense.status].color}>
                    {statusConfig[currentLicense.status].label}
                  </Badge>
                }
              />
            </CardContent>
          </Card>

          {/* Related Violations - Placeholder, assume fetch if API available */}
          {/* {relatedViolations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Lá»‹ch sá»­ vi pháº¡m ({relatedViolations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NgÃ y vi pháº¡m</TableHead>
                      <TableHead>Loáº¡i vi pháº¡m</TableHead>
                      <TableHead>Äá»‹a Ä‘iá»ƒm</TableHead>
                      <TableHead>Pháº¡t tiá»n</TableHead>
                      <TableHead>Äiá»ƒm</TableHead>
                      <TableHead>Tráº¡ng thÃ¡i</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {relatedViolations.map((v) => (
                      <TableRow key={v.id}>
                        <TableCell>{new Date(v.date).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>{v.violationType}</TableCell>
                        <TableCell>{v.location}</TableCell>
                        <TableCell>{v.fine.toLocaleString('vi-VN')} Ä‘</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{v.points}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={v.status === 'paid' ? 'default' : v.status === 'overdue' ? 'destructive' : 'secondary'}>
                            {v.status === 'paid' ? 'ÄÃ£ ná»™p' : v.status === 'overdue' ? 'QuÃ¡ háº¡n' : 'ChÆ°a ná»™p'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )} */}
        </motion.div>

        {/* Actions Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Thao tác</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa thông tin
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleOpenOnChainModal}
                disabled={isCheckingOnChain}
              >
                <Shield className="mr-2 h-4 w-4" />
                {isCheckingOnChain ? 'Đang kiểm tra on-chain...' : 'Kiểm tra thông tin on-chain'}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Đổi GPLX
              </Button>
              {currentLicense.status === 'active' && (
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Tạm dừng GPLX
                </Button>
              )}
              {currentLicense.status === 'active' && (
                <Button className="w-full justify-start text-red-600" variant="outline">
                  <Ban className="mr-2 h-4 w-4" />
                  Thu hồi GPLX
                </Button>
              )}
              <Separator className="my-4" />
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Tải bản sao
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                In GPLX
              </Button>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Trạng thái hiện tại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${statusConfig[currentLicense.status].color}`}></div>
                  <div>
                    <p className="font-medium">{statusConfig[currentLicense.status].label}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentLicense.status === 'active'
                        ? `Còn hiệu lực đến ${currentLicense.expiry_date ? new Date(currentLicense.expiry_date).toLocaleDateString('vi-VN') : 'Vô thời hạn'}`
                        : currentLicense.status === 'expired'
                          ? `Đã hết hạn từ ${currentLicense.expiry_date ? new Date(currentLicense.expiry_date).toLocaleDateString('vi-VN') : 'Vô thời hạn'}`
                          : currentLicense.status === 'pause'
                            ? 'GPLX đang bị tạm dừng'
                            : 'GPLX đã bị thu hồi'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Thời gian còn lại</p>
                <p className="text-xl">
                  {currentLicense.expiry_date
                    ? licenseService.getDaysUntilExpiry(currentLicense) > 0
                      ? `${licenseService.getDaysUntilExpiry(currentLicense)} ngày`
                      : 'Đã hết hạn'
                    : 'Vô thời hạn'
                  }
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Điểm còn lại</p>
                <p className="text-xl text-red-600">{currentLicense.point} điểm</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Thời gian sở hữu</p>
                <p className="text-xl">
                  {Math.floor((new Date().getTime() - new Date(currentLicense.issue_date).getTime()) / (1000 * 60 * 60 * 24 * 365))} năm
                </p>
              </div>
            </CardContent>
          </Card>

        </motion.div>
      </div>

      {/* Blockchain Confirm Modal */}
      <BlockchainConfirmModal
        open={showBlockchainModal}
        onClose={() => setShowBlockchainModal(false)}
        onConfirm={handleConfirmBlockchain}
        type="license"
        requireTxHashInput={false}
        confirmLabel="Ký và lưu lên Blockchain"
        processingLabel="Đang ký giao dịch..."
        data={{
          id: currentLicense.id,
          name: currentLicense.full_name,
          number: currentLicense.license_no
        }}
      />

      <OnChainUserInfoModal
        open={showOnChainModal}
        onClose={() => setShowOnChainModal(false)}
        onRefresh={handleCheckUserOnChain}
        loading={isCheckingOnChain}
        info={onChainUserInfo}
      />
    </div>
  );
}




