import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, X } from 'lucide-react';
import { GovAgency } from '@/types/agency.types';
import { useBreadcrumb } from '@/components/BreadcrumbContext';
import { toast } from 'sonner';

interface AuthorityAddEditProps {
  authority?: GovAgency; // Thay đổi từ TrafficAuthority → GovAgency
  onBack: () => void;
  onSave: (data: Partial<GovAgency>) => void; // Dữ liệu trả về phù hợp với API
}

export default function AuthorityAddEdit({
  authority,
  onBack,
  onSave
}: AuthorityAddEditProps) {
  const { setBreadcrumbs, resetBreadcrumbs } = useBreadcrumb();
  const isEdit = !!authority;

  const [formData, setFormData] = useState<Partial<GovAgency>>({
    name: authority?.name || '',
    type: authority?.type || 'police_department',
    address: authority?.address || '',
    city: authority?.city || 'Hà Nội',
    phone: authority?.phone || '',
    email: authority?.email || '',
    status: authority?.status || 'active',
    active: authority?.active ?? true,
  });

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Trang chính', onClick: onBack, isHome: true },
      { label: 'Cơ quan giao thông', onClick: onBack },
      ...(isEdit
        ? [
          { label: authority!.name, onClick: () => { } },
          { label: 'Chỉnh sửa' }
        ]
        : [{ label: 'Thêm cơ quan mới' }]
      )
    ]);

    return () => resetBreadcrumbs();
  }, [isEdit, authority, onBack, setBreadcrumbs, resetBreadcrumbs]);

  const handleChange = (field: keyof GovAgency, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate bắt buộc
    if (!formData.name || !formData.type || !formData.city || !formData.address) {
      toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }

    if (!formData.phone || !formData.email) {
      toast.error('Vui lòng nhập số điện thoại và email');
      return;
    }

    onSave(formData);
  };

  const authorityTypes = [
    { value: 'police_department', label: 'Phòng CSGT' },
    { value: 'inspection_center', label: 'Trung tâm đăng kiểm' },
    { value: 'exam_center', label: 'Trung tâm sát hạch' },
    { value: 'registration_office', label: 'Phòng đăng ký xe' }
  ];

  const cities = [
    'Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
    'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
    'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
    'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
    'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
    'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
    'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên',
    'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
    'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
    'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
    'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
  ];

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
            <h2 className="text-3xl font-bold">
              {isEdit ? 'Chỉnh sửa cơ quan giao thông' : 'Thêm cơ quan mới'}
            </h2>
            <p className="text-muted-foreground mt-1">
              {isEdit
                ? `Cập nhật thông tin cho ${authority?.name}`
                : 'Đăng ký một cơ quan giao thông mới vào hệ thống'}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Form */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ quan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên cơ quan *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="VD: Phòng CSGT Hà Nội"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Loại cơ quan *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) => handleChange('type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại cơ quan" />
                        </SelectTrigger>
                        <SelectContent>
                          {authorityTypes.map(t => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">Thành phố/Tỉnh *</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value: any) => handleChange('city', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Trạng thái</Label>
                      <Select
                        value={formData.active && formData.status === 'active' ? 'active' : 'inactive'}
                        onValueChange={(value: any) => {
                          handleChange('status', value);
                          handleChange('active', value === 'active');
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Hoạt động</SelectItem>
                          <SelectItem value="inactive">Tạm ngừng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="Số nhà, đường, phường/xã..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="024 3850 1234"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email liên hệ *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="csgt.hanoi@congan.gov.vn"
                        required
                      />
                    </div>
                  </div>

                  {isEdit && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Mã cơ quan (ID): <code className="font-mono bg-muted px-2 py-1 rounded">{authority?.id}</code>
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Ngày tạo: {authority?.created_at ? new Date(authority.created_at).toLocaleDateString('vi-VN') : '-'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Actions Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hành động</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {isEdit ? 'Cập nhật cơ quan' : 'Thêm cơ quan mới'}
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={onBack}>
                    <X className="mr-2 h-4 w-4" />
                    Hủy bỏ
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lưu ý</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Các trường có dấu (*) là bắt buộc</p>
                  <p>• Email và số điện thoại phải hợp lệ</p>
                  <p>• Thông tin sẽ được lưu vào hệ thống ngay lập tức</p>
                  {isEdit && <p>• Mã cơ quan không thể thay đổi</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}