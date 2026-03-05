import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { FileText, Ban, RefreshCw, AlertTriangle, BarChart3, Eye, Edit, Trash2, Plus, CheckCircle, Clock, XCircle, Database, Shield } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LicenseDetailPage from './LicenseDetailPage';
import LicenseAddEdit from './LicenseAddEdit';
import ModernDataTable, { ColumnDef } from './ModernDataTable';
import StatCard from '../StatCard';
import licenseService from '@/services/licenseService';
import { useLicenseStats } from '@/hooks/useLicenseStats';
import type { DriverLicense, LicenseStatus } from '@/types';
import { statusConfig } from '@/constants/status.constant';
import { FilterConfig } from '@/constants/notification.constant';
import { Province, PROVINCE_LABEL } from '@/constants/city.constant';
import { toast } from 'sonner';
import { useDataLists } from '@/context/DataListContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function LicenseManagement() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<DriverLicense | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'add' | 'edit'>('list');
  const {
    licenseList,
    setLicensePage,
    setLicenseItemsPerPage,
    ensureLicenseList,
    refreshLicenseList,
  } = useDataLists();
  const {
    items: licenses,
    totalCount,
    totalPages,
    currentPage,
    itemsPerPage,
    loading,
    error,
  } = licenseList;

  const {
    statusStats,
    typeStats,
    typeDetailStats,
    cityStats,
    loading: statsLoading,
    error: statsError
  } = useLicenseStats();
  useEffect(() => {
    if (viewMode === 'list') {
      void ensureLicenseList();
    }
  }, [viewMode, currentPage, itemsPerPage]);

  const handleViewDetail = (license: DriverLicense) => {
    setSelectedLicense(license);
    setViewMode('detail');
  };

  const handleEditLicense = (license: DriverLicense) => {
    setSelectedLicense(license);
    setViewMode('edit');
  };

  const handleDeleteLicense = async (id: string) => {
    try {
      await licenseService.deleteLicense(id);
      await refreshLicenseList();
      toast.success('Đã xóa GPLX thành công!');
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
      toast.error('Xóa GPLX thất bại');
    }
  };

  const handleAddLicense = async (data: Partial<DriverLicense>) => {
    try {
      await licenseService.createLicense(data);
      await refreshLicenseList();
      setViewMode('list');
    } catch (err) {
      console.error('Lỗi khi thêm:', err);
    }
  };

  const handleUpdateLicense = async (id: string, data: Partial<DriverLicense>) => {
    try {
      await licenseService.updateLicense(id, data);
      await refreshLicenseList();
      setViewMode('detail');
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
    }
  };

  const analyticsData = {
    byStatus: statusStats?.distribution.map(item => ({
      name: statusConfig[item.status]?.label || item.status,
      value: item.count
    })) || [],
    byType: typeStats?.distribution.map(item => ({
      type: item.license_type,
      count: item.count
    })) || [],
    byCity: cityStats?.distribution.map(item => ({
      city: item.owner_city.length > 10 ? item.owner_city.substring(0, 10) + '...' : item.owner_city,
      count: item.total
    })) || [],
    pointDistribution: licenses.reduce((acc, l) => {
      if (l.point === 12) acc['12'] = (acc['12'] || 0) + 1;
      else if (l.point >= 9) acc['9-11'] = (acc['9-11'] || 0) + 1;
      else if (l.point >= 5) acc['5-8'] = (acc['5-8'] || 0) + 1;
      else acc['0-4'] = (acc['0-4'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  const pointDistChartData = Object.entries(analyticsData.pointDistribution).map(([range, count]) => ({ range, count }));

  if (viewMode === 'detail' && selectedLicense) {
    return (
      <LicenseDetailPage
        license={selectedLicense}
        onBack={() => {
          setViewMode('list');
          setSelectedLicense(null);
        }}
        onEdit={() => setViewMode('edit')}
      />
    );
  }

  if (viewMode === 'edit' && selectedLicense) {
    return (
      <LicenseAddEdit
        license={selectedLicense}
        onBack={() => setViewMode('detail')}
        onSave={(data) => handleUpdateLicense(selectedLicense.id, data)}
      />
    );
  }

  if (viewMode === 'add') {
    return (
      <LicenseAddEdit
        onBack={() => setViewMode('list')}
        onSave={handleAddLicense}
      />
    );
  }

  if (loading || statsLoading) {
    return <div className="flex justify-center items-center h-64">Đang tải dữ liệu...</div>;
  }

  if (error || statsError) {
    return <div className="text-red-600 text-center">Lỗi: {error || statsError}</div>;
  }

  const columns: ColumnDef<DriverLicense>[] = [
    {
      key: 'stt',
      header: 'STT',
      width: '60px',
      render: (_, index) => <span className="text-sm">{index + 1}</span>
    },
    {
      key: 'license_no',
      header: 'Số GPLX',
      sortable: true,
      width: '150px',
      render: (license) => (
        <div className="flex items-center gap-2 justify-center">
          <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span className="text-sm truncate" title={license.license_no}>{license.license_no}</span>
        </div>
      )
    },
    {
      key: 'full_name',
      header: 'Người sở hữu',
      sortable: true,
      width: '160px',
      render: (license) => <span className="text-sm truncate" title={license.full_name}>{license.full_name}</span>
    },
    {
      key: 'identity_no',
      header: 'CCCD',
      sortable: true,
      width: '130px',
      render: (license) => <span className="text-sm font-mono">{license.identity_no}</span>
    },
    {
      key: 'wallet_address',
      header: 'Wallet Address',
      sortable: true,
      width: '180px',
      render: (license) => (
        license.wallet_address ? (
          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-cyan-600 flex-shrink-0" />
                  <code className="text-xs bg-gradient-to-r from-cyan-50 to-blue-50 px-2 py-1 rounded border border-cyan-200 text-cyan-700 font-mono truncate max-w-[140px]">
                    {license.wallet_address.slice(0, 6)}...{license.wallet_address.slice(-4)}
                  </code>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Địa chỉ Wallet đầy đủ:</p>
                  <code className="text-xs bg-slate-800 text-cyan-300 px-2 py-1 rounded block">
                    {license.wallet_address}
                  </code>
                </div>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>
        ) : (
          <span className="text-xs text-muted-foreground italic">Chưa liên kết</span>
        )
      )
    },
    {
      key: 'license_type',
      header: 'Hạng',
      sortable: true,
      width: '80px',
      render: (license) => (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {license.license_type}
        </Badge>
      )
    },
    {
      key: 'owner_city',
      header: 'Thành phố',
      sortable: true,
      width: '170px',
      render: (license) => <span className="text-sm truncate" title={license.owner_city}>
        {PROVINCE_LABEL[license.owner_city as Province] ?? 'Không xác định'}
      </span>
    },
    {
      key: 'issuing_authority',
      header: 'Nơi cấp',
      width: '150px',
      render: (license) => <span className="text-sm text-muted-foreground truncate" title={license.issuing_authority}>
        {license.issuing_authority}
      </span>
    },
    {
      key: 'issue_date',
      header: 'Ngày cấp',
      sortable: true,
      width: '110px',
      render: (license) => (
        <span className="text-sm">{new Date(license.issue_date).toLocaleDateString('vi-VN')}</span>
      )
    },
    {
      key: 'expiry_date',
      header: 'Hết hạn',
      sortable: true,
      width: '110px',
      render: (license) => (
        <span className="text-sm">{license.expiry_date ? new Date(license.expiry_date).toLocaleDateString('vi-VN') : 'Vô thời hạn'}</span>
      )
    },
    {
      key: 'point',
      header: 'Điểm',
      sortable: true,
      width: '90px',
      render: (license) => (
        <Badge
          variant={license.point <= 5 ? 'destructive' : 'secondary'}
          className={license.point <= 5 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}
        >
          {license.point}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Trạng thái',
      sortable: true,
      width: '120px',
      render: (license) => {
        const config = statusConfig[license.status as LicenseStatus];
        return (
          <Badge className={`${config.color} text-white border-0`}>
            {config.label}
          </Badge>
        );
      }
    },
    {
      key: 'on_blockchain',
      header: 'Blockchain',
      sortable: true,
      width: '100px',
      render: (license) => (
        <div className="flex justify-center">
          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger asChild>
                {license.on_blockchain ? (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400">
                    <Shield className="h-4 w-4 text-cyan-600" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border border-gray-300">
                    <Database className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{license.on_blockchain ? 'Đã lưu trữ vào Blockchain' : 'Chưa lưu vào Blockchain'}</p>
                {license.on_blockchain && license.blockchain_txhash && (
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{license.blockchain_txhash.slice(0, 10)}...</p>
                )}
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Thao tác',
      width: '120px',
      render: (license) => (
        <div className="flex justify-center gap-1">
          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => handleViewDetail(license)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Xem chi tiết</p></TooltipContent>
            </TooltipUI>

            <TooltipUI>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => handleEditLicense(license)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Chỉnh sửa</p></TooltipContent>
            </TooltipUI>

            <TooltipUI>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleDeleteLicense(license.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Xóa</p></TooltipContent>
            </TooltipUI>
          </TooltipProvider>
        </div>
      )
    }
  ];

  const licenseTypes = Array.from(new Set(licenses.map(l => l.license_type)));
  const cities = Array.from(new Set(licenses.map(l => l.owner_city)));

  const filters: FilterConfig[] = [
    {
      key: 'status',
      label: 'Trạng thái',
      options: [
        { value: 'all', label: 'Tất cả' },
        { value: 'pending', label: 'Chờ duyệt' },
        { value: 'active', label: 'Hoạt động' },
        { value: 'expired', label: 'Hết hạn' },
        { value: 'pause', label: 'Tạm dừng' },
        { value: 'revoke', label: 'Thu hồi' }
      ]
    },
    {
      key: 'license_type',
      label: 'Hạng GPLX',
      options: [
        { value: 'all', label: 'Tất cả' },
        ...licenseTypes.map(type => ({ value: type, label: type }))
      ]
    },
    {
      key: 'owner_city',
      label: 'Thành phố',
      options: [
        { value: 'all', label: 'Tất cả' },
        ...cities.map(city => ({ value: city, label: city }))
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div />
          <div className="flex gap-2">
            <Button onClick={() => setViewMode('add')}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm GPLX
            </Button>
            <Button variant="outline" onClick={() => setShowAnalytics(!showAnalytics)}>
              <BarChart3 className="mr-2 h-4 w-4" />
              {showAnalytics ? 'Ẩn' : 'Hiện'} phân tích
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Hoạt động"
          value={statusStats?.distribution.find(s => s.status === 'active')?.count || 0}
          subtitle={`${Math.round(((statusStats?.distribution.find(s => s.status === 'active')?.count || 0) / (statusStats?.total || 1)) * 100)}% tổng số`}
          icon={CheckCircle}
          color="green"
          trend={{ value: 3, isPositive: true }}
          delay={0.1}
        />
        <StatCard
          title="Hết hạn"
          value={statusStats?.distribution.find(s => s.status === 'expired')?.count || 0}
          subtitle="Cần gia hạn"
          icon={Clock}
          color="amber"
          delay={0.15}
        />
        <StatCard
          title="Tạm dừng"
          value={statusStats?.distribution.find(s => s.status === 'pause')?.count || 0}
          subtitle="Đang bị tạm dừng"
          icon={AlertTriangle}
          color="orange"
          delay={0.2}
        />
        <StatCard
          title="Thu hồi"
          value={statusStats?.distribution.find(s => s.status === 'revoke')?.count || 0}
          subtitle="Đã bị thu hồi"
          icon={XCircle}
          color="red"
          delay={0.25}
        />
      </div>

      {showAnalytics && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid gap-4 md:grid-cols-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo hạng GPLX</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.byType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Số lượng">
                    {analyticsData.byType.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bố theo thành phố</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.byCity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="Số lượng" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phân bố điểm</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={pointDistChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f59e0b" name="Số lượng GPLX" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trạng thái GPLX</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={analyticsData.byStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.byStatus.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div>
        <ModernDataTable
          data={licenses}
          columns={columns}
          title="Danh sách GPLX"
          searchPlaceholder="Tìm kiếm theo số GPLX, tên, CCCD..."
          searchKeys={['license_no', 'full_name', 'identity_no']}
          filters={filters}
          getItemKey={(license) => license.id}
          onExport={() => console.log('Exporting licenses...')}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalCount}
          totalPages={totalPages}
          onPageChange={setLicensePage}
          onItemsPerPageChange={setLicenseItemsPerPage}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
        >
          <p className="text-sm mb-3">Chú thích thao tác:</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-600">
              <Eye className="h-4 w-4" />
              <span>Xem chi tiết</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Edit className="h-4 w-4" />
              <span>Chỉnh sửa</span>
            </div>
            <div className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-4 w-4" />
              <span>Xóa</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}



