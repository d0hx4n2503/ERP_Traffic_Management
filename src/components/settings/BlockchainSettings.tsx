import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Blocks,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Copy,
  ExternalLink,
  AlertCircle,
  Shield,
  Database,
  Save,
  Loader2,
  Pause,
  Play,
  Power,
  PauseCircle,
  PlayCircle
} from 'lucide-react';
import { toast } from 'sonner';
import trafficControllerService from '@/contracts/trafficControllerService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BlockchainSettingsProps {
  isSuperAdmin: boolean;
}

export default function BlockchainSettings() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [contracts, setContracts] = useState({
    trafficController: trafficControllerService.TRAFFIC_CONTROLLER_ADDRESS,
    govAgency: '',
    driverLicense: '',
    vehicleRegistration: '',
    offenceAndRenewal: ''
  });

  const [contractStatus, setContractStatus] = useState({
    trafficController: { connected: false, verified: false },
    govAgency: { connected: false, verified: false },
    driverLicense: { connected: false, verified: false },
    vehicleRegistration: { connected: false, verified: false },
    offenceAndRenewal: { connected: false, verified: false }
  });

  const [systemPaused, setSystemPaused] = useState(false);

  const [editMode, setEditMode] = useState({
    trafficController: false,
    govAgency: false,
    driverLicense: false,
    vehicleRegistration: false,
    offenceAndRenewal: false
  });

  // Load contract addresses from blockchain on mount
  useEffect(() => {
    loadContractAddresses();
  }, []);

  const loadContractAddresses = async () => {
    try {
      setLoading(true);
      const coreContracts = await trafficControllerService.getAllCoreContracts();

      setContracts({
        trafficController: trafficControllerService.TRAFFIC_CONTROLLER_ADDRESS,
        govAgency: coreContracts.govAgency,
        driverLicense: coreContracts.driverLicense,
        vehicleRegistration: coreContracts.vehicleRegistration,
        offenceAndRenewal: coreContracts.offenceAndRenewal
      });

      setSystemPaused(coreContracts.isPaused);

      // Check if contracts are connected (not zero address)
      const isConnected = (addr: string) => addr !== '0x0000000000000000000000000000000000000000';

      setContractStatus({
        trafficController: { connected: true, verified: true },
        govAgency: { connected: isConnected(coreContracts.govAgency), verified: isConnected(coreContracts.govAgency) },
        driverLicense: { connected: isConnected(coreContracts.driverLicense), verified: isConnected(coreContracts.driverLicense) },
        vehicleRegistration: { connected: isConnected(coreContracts.vehicleRegistration), verified: isConnected(coreContracts.vehicleRegistration) },
        offenceAndRenewal: { connected: isConnected(coreContracts.offenceAndRenewal), verified: isConnected(coreContracts.offenceAndRenewal) }
      });

      toast.success('Đã tải thông tin contracts từ blockchain!');
    } catch (error) {
      console.error('Error loading contracts:', error);
      toast.error('Không thể tải thông tin contracts. Hãy đảm bảo MetaMask đã kết nối.');
    } finally {
      setLoading(false);
    }
  };

  const handleContractChange = (key: string, value: string) => {
    setContracts(prev => ({ ...prev, [key]: value }));
  };

  const handleContractStatusChange = (key: string, status: { connected: boolean, verified: boolean }) => {
    setContractStatus(prev => ({ ...prev, [key]: status }));
  };

  const handleEditModeChange = (key: string, value: boolean) => {
    setEditMode(prev => ({ ...prev, [key]: value }));
  };

  const copyAddress = (address: string) => {
    // Fallback method for clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = address;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      textArea.remove();
      toast.success('Đã copy địa chỉ contract!');
    } catch (err) {
      textArea.remove();
      toast.error('Không thể copy địa chỉ contract!');
    }
  };

  const testConnection = async (contractKey: ContractKey) => {
    try {
      toast.loading('Đang kiểm tra kết nối...', { id: 'test-connection' });
      const address = contracts[contractKey];

      // Validate address
      if (!trafficControllerService.isValidAddress(address)) {
        toast.error('Địa chỉ contract không hợp lệ!', { id: 'test-connection' });
        return;
      }

      // Check if address is deployed contract
      let isValid = false;
      switch (contractKey) {
        case 'govAgency':
          isValid = await trafficControllerService.isGovAgency(address);
          break;
        case 'driverLicense':
          isValid = await trafficControllerService.isDriverLicense(address);
          break;
        case 'vehicleRegistration':
          isValid = await trafficControllerService.isVehicleRegistration(address);
          break;
        case 'offenceAndRenewal':
          isValid = await trafficControllerService.isOffenceAndRenewal(address);
          break;
        default:
          isValid = true;
      }

      if (isValid) {
        toast.success('Kết nối thành công! Contract hợp lệ.', { id: 'test-connection' });
        setContractStatus(prev => ({
          ...prev,
          [contractKey]: { connected: true, verified: true }
        }));
      } else {
        toast.error('Contract chưa được đăng ký trong hệ thống!', { id: 'test-connection' });
      }
    } catch (error) {
      console.error('Error testing connection:', error);
      toast.error('Không thể kiểm tra kết nối!', { id: 'test-connection' });
    }
  };

  const saveContractAddress = async (contractKey: ContractKey) => {
    if (contractKey === 'trafficController') {
      toast.error('Không thể thay đổi địa chỉ TrafficController!');
      return;
    }

    try {
      toast.loading('Đang cập nhật địa chỉ contract...', { id: 'save-contract' });

      const address = contracts[contractKey];

      // Validate address
      if (!trafficControllerService.isValidAddress(address)) {
        toast.error('Địa chỉ contract không hợp lệ!', { id: 'save-contract' });
        return;
      }

      let tx;
      switch (contractKey) {
        case 'govAgency':
          tx = await trafficControllerService.setGovAgency(address);
          break;
        case 'driverLicense':
          tx = await trafficControllerService.setDriverLicense(address);
          break;
        case 'vehicleRegistration':
          tx = await trafficControllerService.setVehicleRegistration(address);
          break;
        case 'offenceAndRenewal':
          tx = await trafficControllerService.setOffenceAndRenewal(address);
          break;
        default:
          throw new Error('Invalid contract key');
      }

      toast.loading('Đang chờ xác nhận transaction...', { id: 'save-contract' });
      await trafficControllerService.waitForTransaction(tx);

      toast.success('Đã cập nhật địa chỉ contract thành công!', { id: 'save-contract' });
      setEditMode(prev => ({ ...prev, [contractKey]: false }));

      // Reload contracts to verify
      await loadContractAddresses();
    } catch (error: any) {
      console.error('Error saving contract:', error);
      toast.error(error?.message || 'Không thể cập nhật contract!', { id: 'save-contract' });
    }
  };

  const toggleSystemPause = async () => {
    try {
      const action = systemPaused ? 'Mở lại' : 'Tạm dừng';
      toast.loading(`Đang ${action.toLowerCase()} hệ thống...`, { id: 'toggle-pause' });

      const tx = systemPaused
        ? await trafficControllerService.unpauseSystem()
        : await trafficControllerService.pauseSystem();

      toast.loading('Đang chờ xác nhận transaction...', { id: 'toggle-pause' });
      await trafficControllerService.waitForTransaction(tx);

      setSystemPaused(!systemPaused);
      toast.success(`Đã ${action.toLowerCase()} hệ thống thành công!`, { id: 'toggle-pause' });
    } catch (error: any) {
      console.error('Error toggling pause:', error);
      toast.error(error?.message || 'Không thể thay đổi trạng thái hệ thống!', { id: 'toggle-pause' });
    }
  };

  const handlePauseSystem = async () => {
    try {
      toast.loading('Đang tạm dừng hệ thống...', { id: 'pause-system' });
      toast.info('Vui lòng xác nhận transaction trong MetaMask', { id: 'pause-metamask' });

      const tx = await trafficControllerService.pauseSystem();

      toast.dismiss('pause-metamask');
      toast.loading('Đang chờ xác nhận transaction trên blockchain...', { id: 'pause-system' });
      await trafficControllerService.waitForTransaction(tx);

      setSystemPaused(true);
      toast.success('Đã tạm dừng hệ thống thành công!', { id: 'pause-system' });
    } catch (error: any) {
      toast.dismiss('pause-metamask');

      // Check for user rejection first (don't log these as errors)
      const isUserRejection =
        error?.code === 'ACTION_REJECTED' ||
        error?.code === 4001 ||
        error?.info?.error?.code === 4001 ||
        error?.message?.includes('user rejected') ||
        error?.message?.includes('User denied');

      if (isUserRejection) {
        toast.error('Bạn đã từ chối transaction trong MetaMask!', { id: 'pause-system' });
      } else {
        // Only log actual errors to console
        console.error('Error pausing system:', error);
        toast.error(error?.reason || error?.message || 'Không thể tạm dừng hệ thống!', { id: 'pause-system' });
      }
    }
  };

  const handleUnpauseSystem = async () => {
    try {
      toast.loading('Đang mở lại hệ thống...', { id: 'unpause-system' });
      toast.info('Vui lòng xác nhận transaction trong MetaMask', { id: 'unpause-metamask' });

      const tx = await trafficControllerService.unpauseSystem();

      toast.dismiss('unpause-metamask');
      toast.loading('Đang chờ xác nhận transaction trên blockchain...', { id: 'unpause-system' });
      await trafficControllerService.waitForTransaction(tx);

      setSystemPaused(false);
      toast.success('Đã mở lại hệ thống thành công!', { id: 'unpause-system' });
    } catch (error: any) {
      toast.dismiss('unpause-metamask');

      // Check for user rejection first (don't log these as errors)
      const isUserRejection =
        error?.code === 'ACTION_REJECTED' ||
        error?.code === 4001 ||
        error?.info?.error?.code === 4001 ||
        error?.message?.includes('user rejected') ||
        error?.message?.includes('User denied');

      if (isUserRejection) {
        toast.error('Bạn đã từ chối transaction trong MetaMask!', { id: 'unpause-system' });
      } else {
        // Only log actual errors to console
        console.error('Error unpausing system:', error);
        toast.error(error?.reason || error?.message || 'Không thể mở lại hệ thống!', { id: 'unpause-system' });
      }
    }
  };

  const saveAll = async () => {
    toast.info('Chức năng "Lưu tất cả" sẽ được triển khai sau!');
  };

  type ContractKey = keyof typeof contracts;

  const ContractCard = ({
    name,
    contractKey,
    icon: Icon,
    description,
    gradient,
    borderColor
  }: {
    name: string;
    contractKey: ContractKey;
    icon: any;
    description: string;
    gradient: string;
    borderColor: string;
  }) => (
    <Card className={`${gradient} ${borderColor}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {name}
          </div>
          {/* Pause/Unpause icon buttons for Traffic Controller */}
          {contractKey === 'trafficController' && (
            <TooltipProvider>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 border-green-300 hover:bg-green-100 hover:border-green-400"
                      onClick={handleUnpauseSystem}
                      disabled={!systemPaused}
                    >
                      <PlayCircle className="h-4 w-4 text-green-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unpause - Mở lại hệ thống (cần sign tx)</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 border-red-300 hover:bg-red-100 hover:border-red-400"
                      onClick={handlePauseSystem}
                      disabled={systemPaused}
                    >
                      <PauseCircle className="h-4 w-4 text-red-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pause - Tạm dừng hệ thống (cần sign tx)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Địa chỉ Contract</Label>
          <div className="flex gap-2">
            <Input
              value={contracts[contractKey]}
              onChange={(e) => handleContractChange(contractKey, e.target.value)}
              disabled={!editMode[contractKey]}
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyAddress(contracts[contractKey])}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(`https://etherscan.io/address/${contracts[contractKey]}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={`flex items-center justify-between p-3 rounded-lg bg-white/60 border ${borderColor}`}>
            <div className="flex items-center gap-2">
              {contractStatus[contractKey].connected ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <Label className="text-sm">Kết nối</Label>
            </div>
            <Switch
              checked={contractStatus[contractKey].connected}
              onCheckedChange={(value: any) => handleContractStatusChange(contractKey, {
                connected: value,
                verified: contractStatus[contractKey].verified
              })}
            />
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg bg-white/60 border ${borderColor}`}>
            <div className="flex items-center gap-2">
              {contractStatus[contractKey].verified ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              <Label className="text-sm">Đã xác thực</Label>
            </div>
            <Switch
              checked={contractStatus[contractKey].verified}
              onCheckedChange={(value: any) => handleContractStatusChange(contractKey, {
                connected: contractStatus[contractKey].connected,
                verified: value
              })}
            />
          </div>
        </div>

      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* System Status Card - Always visible */}
      <Card className={`${systemPaused
        ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300'
        : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
        }`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${systemPaused ? 'bg-red-100' : 'bg-green-100'}`}>
                {systemPaused ? (
                  <PauseCircle className="h-6 w-6 text-red-600" />
                ) : (
                  <PlayCircle className="h-6 w-6 text-green-600" />
                )}
              </div>
              <div>
                <Label className="text-lg font-bold">
                  {systemPaused ? '🔴 Hệ thống đang TẠM DỪNG' : '🟢 Hệ thống đang HOẠT ĐỘNG'}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {systemPaused
                    ? 'Tất cả các giao dịch blockchain đã bị tạm dừng.'
                    : 'Hệ thống đang hoạt động bình thường. Tất cả các giao dịch blockchain được xử lý.'
                  }
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={loadContractAddresses}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Làm mới
            </Button>
          </div>
        </CardContent>
      </Card>

      <ContractCard
        name="Hệ thống hợp đồng chính"
        contractKey="trafficController"
        icon={Blocks}
        description="Hợp đồng chính quản lý tất cả các hợp đồng khác trong hệ thống"
        gradient="bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50"
        borderColor="border-cyan-200"
      />

      <ContractCard
        name="Đăng ký GPLX"
        contractKey="driverLicense"
        icon={Shield}
        description="Hợp đồng quản lý thông tin giấy phép lái xe (GPLX)"
        gradient="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"
        borderColor="border-emerald-200"
      />

      <ContractCard
        name="Đăng ký phương tiện"
        contractKey="vehicleRegistration"
        icon={Database}
        description="Hợp đồng quản lý thông tin phương tiện và giấy tờ xe"
        gradient="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50"
        borderColor="border-violet-200"
      />

      <ContractCard
        name="Quản lý vi phạm"
        contractKey="offenceAndRenewal"
        icon={AlertCircle}
        description="Hợp đồng quản lý thông tin vi phạm giao thông"
        gradient="bg-gradient-to-br from-rose-50 via-pink-50 to-red-50"
        borderColor="border-rose-200"
      />

      <ContractCard
        name="Đơn vị quản trị"
        contractKey="govAgency"
        icon={CheckCircle2}
        description="Hợp đồng quản lý các chức năng quản trị và giám sát hệ thống"
        gradient="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
        borderColor="border-amber-200"
      />

      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-blue-600" />
              <div>
                <Label>Lưu tất cả cấu hình</Label>
                <p className="text-sm text-muted-foreground">
                  Lưu địa chỉ và cài đặt của tất cả các smart contracts
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              onClick={saveAll}
            >
              <Save className="mr-2 h-4 w-4" />
              Lưu tất cả
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}