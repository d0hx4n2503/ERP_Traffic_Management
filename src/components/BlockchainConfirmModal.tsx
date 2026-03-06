import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Database, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface BlockchainConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (txHash?: string) => Promise<void>;
  title?: string;
  type?: 'license' | 'vehicle';
  requireTxHashInput?: boolean;
  confirmLabel?: string;
  processingLabel?: string;
  data: {
    id: string;
    name?: string;
    number?: string;
  };
}

export default function BlockchainConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  type = 'license',
  requireTxHashInput = true,
  confirmLabel = 'Xác nhận lưu trữ',
  processingLabel = 'Đang xử lý...',
  data,
}: BlockchainConfirmModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleConfirm = async () => {
    if (requireTxHashInput && !txHash) {
      toast.error('Vui lòng nhập Transaction Hash');
      return;
    }

    setIsProcessing(true);
    try {
      await onConfirm(requireTxHashInput ? txHash : undefined);

      toast.success('Lưu trữ vào Blockchain thành công!', {
        description: `${type === 'license' ? 'GPLX' : 'Phương tiện'} đã được lưu trữ an toàn trên Blockchain`,
      });

      onClose();
      setTxHash('');
    } catch (error: any) {
      toast.error('Lỗi khi lưu trữ vào Blockchain');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen: any) => {
        if (!nextOpen) {
          onClose();
          setTxHash('');
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">{title || 'Lưu trữ vào Blockchain'}</DialogTitle>
              <DialogDescription>
                {requireTxHashInput
                  ? 'Xác nhận lưu trữ dữ liệu lên Blockchain'
                  : 'Xác nhận ký giao dịch để lưu dữ liệu lên Blockchain'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Loại:</span>{' '}
                {type === 'license' ? 'Giấy phép lái xe' : 'Phương tiện'}
              </p>
              <p className="text-sm">
                <span className="font-medium">Số:</span> {data.number || data.id}
              </p>
              {data.name && (
                <p className="text-sm">
                  <span className="font-medium">Tên:</span> {data.name}
                </p>
              )}
            </div>
          </div>

          {requireTxHashInput && (
            <div className="space-y-2">
              <Label htmlFor="txHash">Transaction Hash *</Label>
              <Input
                id="txHash"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="Nhập transaction hash sau khi lưu blockchain"
                required
              />
            </div>
          )}

          <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            <div className="space-y-1 text-sm text-amber-900">
              <p className="font-medium">Lưu ý quan trọng:</p>
              <ul className="list-inside list-disc space-y-1 text-xs">
                <li>Dữ liệu sau khi lưu lên Blockchain sẽ không thể xóa</li>
                <li>Thông tin được mã hóa và lưu trữ vĩnh viễn</li>
                <li>Hành động này cần phí gas</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="mb-2 flex items-start gap-2">
              <Shield className="h-5 w-5 flex-shrink-0 text-green-600" />
              <p className="text-sm font-medium text-green-900">Lợi ích:</p>
            </div>
            <ul className="ml-7 space-y-1 text-xs text-green-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                Bảo mật tuyệt đối, không thể giả mạo
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                Minh bạch, có thể tra cứu mọi lúc
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                Lưu trữ vĩnh viễn, không bị mất dữ liệu
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Hủy
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            {isProcessing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {processingLabel}
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                {confirmLabel}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

