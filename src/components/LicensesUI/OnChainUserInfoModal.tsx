import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, RefreshCw, Database } from 'lucide-react';
import type { DriverLicenseUserOnChainInfo } from '@/contracts/driverLicenseService';

interface OnChainUserInfoModalProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => Promise<void>;
  loading: boolean;
  info: DriverLicenseUserOnChainInfo | null;
}

const statusLabel = (status?: number) => {
  if (status === undefined) return 'N/A';
  if (status === 0) return 'HỢP LỆ';
  if (status === 1) return 'HẾT HẠN';
  if (status === 2) return 'TẠM DỪNG';
  if (status === 3) return 'BỊ HỦY';
  return `${status}`;
};

export default function OnChainUserInfoModal({
  open,
  onClose,
  onRefresh,
  loading,
  info,
}: OnChainUserInfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen: any) => !nextOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-cyan-600" />
            Thông tin GPLX trên chain
          </DialogTitle>
          <DialogDescription>
            Thông tin người dùng và GPLX trực tiếp từ hợp đồng GPLX.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Đang kiểm tra...' : 'Kiểm tra lại'}
            </Button>
          </div>

          {!info ? (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              Chưa có dữ liệu on-chain. Nhấn "Kiểm tra lại" để tải thông tin.
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Địa chỉ ví:</p>
                  <p className="break-all font-mono text-sm">{info.holderAddress}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Có GPLX hợp lệ</p>
                  <Badge variant={info.hasValidLicense ? 'default' : 'secondary'}>
                    {info.hasValidLicense ? 'Có' : 'Không'}
                  </Badge>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Số GPLX hợp lệ (balanceOf)</p>
                  <p className="text-sm font-medium">{info.validLicenseBalance}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="mb-1 text-xs text-muted-foreground">Tổng GPLX của người dùng</p>
                  <p className="text-sm font-medium">{info.holderLicenseCount}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-cyan-600" />
                  <p className="font-medium">Chi tiết theo mã số GPLX</p>
                </div>

                {!info.licenseFound ? (
                  <p className="text-sm text-muted-foreground">Không tìm thấy mã số GPLX này trên chain.</p>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2 text-sm">
                    <p><span className="text-muted-foreground">Mã số GPLX:</span> {info.licenseNo || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Căn cước công dân:</span> {info.holderId || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Họ và tên:</span> {info.name || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Hạng GPLX:</span> {info.licenseType || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Điểm GPLX:</span> {info.point ?? 'N/A'}</p>
                    <p><span className="text-muted-foreground">Trạng thái giấy phép lái xe:</span> {statusLabel(info.status)}</p>
                    <p><span className="text-muted-foreground">Ngày phát hành (unix):</span> {info.issueDate ?? 'N/A'}</p>
                    <p><span className="text-muted-foreground">Ngày hết hạn (unix):</span> {info.expiryDate ?? 'N/A'}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
