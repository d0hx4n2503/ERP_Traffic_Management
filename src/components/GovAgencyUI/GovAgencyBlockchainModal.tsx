import { useEffect, useState } from 'react';
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
import { AlertTriangle, Blocks } from 'lucide-react';
import { toast } from 'sonner';
import { ethers } from 'ethers';

interface GovAgencyBlockchainModalProps {
  open: boolean;
  mode: 'store' | 'revoke';
  defaultAddress?: string;
  agencyName: string;
  onClose: () => void;
  onConfirm: (address?: string) => Promise<void>;
}

export default function GovAgencyBlockchainModal({
  open,
  mode,
  defaultAddress,
  agencyName,
  onClose,
  onConfirm,
}: GovAgencyBlockchainModalProps) {
  const [walletAddress, setWalletAddress] = useState(defaultAddress || '');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (open) {
      setWalletAddress(defaultAddress || '');
    }
  }, [open, defaultAddress]);

  const handleConfirm = async () => {
    if (mode === 'store') {
      if (!walletAddress) {
        toast.error('Vui lòng nhập địa chỉ ví');
        return;
      }
      if (!ethers.isAddress(walletAddress)) {
        toast.error('Địa chỉ ví không hợp lệ. Vui lòng nhập địa chỉ đúng định dạng.');
        return;
      }
    }

    setIsProcessing(true);
    try {
      await onConfirm(mode === 'store' ? walletAddress : undefined);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next: any) => !next && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Blocks className="h-5 w-5" />
            {mode === 'store' ? 'Lưu địa chỉ cơ quan lên Blockchain' : 'Thu hồi địa chỉ trên Blockchain'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'store'
              ? `Nhập địa chỉ ví cho ${agencyName}, ký giao dịch và cập nhật vào cơ sở dữ liệu.`
              : `ác nhận thu hồi ${agencyName} trên blockchain và cập nhật trạng thái trong cơ sở dữ liệu.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {mode === 'store' ? (
            <div className="space-y-2">
              <Label htmlFor="agency-wallet-address">Địa chỉ ví cơ quan</Label>
              <Input
                id="agency-wallet-address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value.trim())}
                placeholder="0x..."
              />
            </div>
          ) : (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
                <p>ành động này sẽ thu hồi địa chỉ cơ quan trên hợp đồng và không thể hoàn tác.</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Hủy
          </Button>
          <Button onClick={handleConfirm} disabled={isProcessing}>
            {isProcessing ? 'Đang xử lý...' : mode === 'store' ? 'Lý và lưu' : 'Xác nhận thu hồi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

