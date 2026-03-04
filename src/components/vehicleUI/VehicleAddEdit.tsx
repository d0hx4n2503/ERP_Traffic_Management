import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, Save, X } from 'lucide-react';
import { VehicleRegistration } from '@/types';
import { useBreadcrumb } from '@/components/BreadcrumbContext';
import { toast } from 'sonner';
import { VEHICLE_TYPE_LABEL, VehicleType } from '@/constants/vehicle.constant';
import { VEHICLE_BRAND_LABEL, VehicleBrand } from '@/constants/brand.constant';
import { Status, STATUS_LABEL } from '@/constants/status.constant';
import { toDateInputValue } from '@/lib/helpers/covertTime';
import { useDebounce } from '@/hooks';
import licenseService from '@/services/licenseService';

interface VehicleAddEditProps {
  vehicle?: VehicleRegistration;
  onBack: () => void;
  onSave: (data: Partial<VehicleRegistration>) => Promise<void>;
}

type OwnerOption = {
  id: string;
  full_name: string;
  identity_no: string;
};

export default function VehicleAddEdit({ vehicle, onBack, onSave }: VehicleAddEditProps) {
  const { setBreadcrumbs, resetBreadcrumbs } = useBreadcrumb();
  const isEdit = !!vehicle;

  const [formData, setFormData] = useState<Partial<VehicleRegistration>>({
    vehicle_no: vehicle?.vehicle_no || '',
    owner_id: vehicle?.owner_id || undefined,
    owner_name: vehicle?.owner_name || '',
    type_vehicle: vehicle?.type_vehicle ?? VehicleType.CAR,
    brand: vehicle?.brand ?? VehicleBrand.TOYOTA,
    color_vehicle: vehicle?.color_vehicle || '',
    issuer: vehicle?.issuer || 'Hà Nội',
    issue_date: toDateInputValue(vehicle?.issue_date) || new Date().toISOString().split('T')[0],
    expiry_date: toDateInputValue(vehicle?.expiry_date) || '',
    registration_code: vehicle?.registration_code || '',
    registration_date: toDateInputValue(vehicle?.registration_date) || '',
    seats: vehicle?.seats || undefined,
    chassis_no: vehicle?.chassis_no || '',
    engine_no: vehicle?.engine_no || '',
    color_plate: vehicle?.color_plate || '',
    registration_place: vehicle?.registration_place || '',
    status: vehicle?.status ?? Status.VALID,
  });

  const [ownerKeyword, setOwnerKeyword] = useState(vehicle?.owner_name || '');
  const debouncedOwnerKeyword = useDebounce(ownerKeyword, 250);
  const [allOwners, setAllOwners] = useState<OwnerOption[]>([]);
  const [ownerOptions, setOwnerOptions] = useState<OwnerOption[]>([]);
  const [showOwnerOptions, setShowOwnerOptions] = useState(false);
  const [isFetchingOwners, setIsFetchingOwners] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Trang chính', onClick: onBack, isHome: true },
      { label: 'Phương tiện', onClick: onBack },
      ...(isEdit
        ? [
            { label: vehicle!.vehicle_no, onClick: () => {} },
            { label: 'Chỉnh sửa' },
          ]
        : [{ label: 'Thêm phương tiện mới' }]),
    ]);

    return () => resetBreadcrumbs();
  }, [isEdit, vehicle, onBack, setBreadcrumbs, resetBreadcrumbs]);

  const handleChange = (field: keyof Partial<VehicleRegistration>, value: string | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (isEdit) return;

    let active = true;
    setIsFetchingOwners(true);

    licenseService
      .getAllLicenses(1, 200)
      .then((response) => {
        if (!active) return;
        const options = (response.driver_licenses || []).map((license) => ({
          id: license.id,
          full_name: license.full_name,
          identity_no: license.identity_no,
        }));
        setAllOwners(options);
      })
      .catch(() => {
        if (!active) return;
        toast.error('Không thể tải danh sách chủ sở hữu');
      })
      .finally(() => {
        if (active) setIsFetchingOwners(false);
      });

    return () => {
      active = false;
    };
  }, [isEdit]);

  useEffect(() => {
    if (isEdit) return;

    const keyword = debouncedOwnerKeyword.trim().toLowerCase();
    if (!keyword) {
      setOwnerOptions([]);
      setShowOwnerOptions(false);
      return;
    }

    const filtered = allOwners
      .filter(
        (owner) =>
          owner.full_name.toLowerCase().includes(keyword) ||
          owner.identity_no.toLowerCase().includes(keyword) ||
          owner.id.toLowerCase().includes(keyword)
      )
      .slice(0, 10);

    setOwnerOptions(filtered);
    setShowOwnerOptions(filtered.length > 0);
  }, [debouncedOwnerKeyword, allOwners, isEdit]);

  const handleSelectOwner = (owner: OwnerOption) => {
    setFormData((prev) => ({
      ...prev,
      owner_id: owner.id,
      owner_name: owner.full_name,
    }));
    setOwnerKeyword(owner.full_name);
    setShowOwnerOptions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEdit && !formData.owner_id) {
      toast.error('Vui lòng chọn chủ sở hữu từ danh sách gợi ý');
      return;
    }

    try {
      await onSave(formData);
    } catch {
      toast.error(isEdit ? 'Cập nhật thất bại' : 'Thêm mới thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl">{isEdit ? 'Chỉnh sửa phương tiện' : 'Thêm phương tiện mới'}</h2>
            <p className="text-muted-foreground mt-1">
              {isEdit ? `Cập nhật thông tin phương tiện ${vehicle?.vehicle_no}` : 'Đăng ký phương tiện mới'}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin phương tiện</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_no">Biển số xe *</Label>
                      <Input
                        id="vehicle_no"
                        value={formData.vehicle_no || ''}
                        onChange={(e) => handleChange('vehicle_no', e.target.value)}
                        placeholder="VD: 59A1-12345"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type_vehicle">Loại xe *</Label>
                      <Select value={formData.type_vehicle} onValueChange={(value) => handleChange('type_vehicle', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(VehicleType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {VEHICLE_TYPE_LABEL[type]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="color_plate">Màu biển số *</Label>
                      <Input
                        id="color_plate"
                        value={formData.color_plate || ''}
                        onChange={(e) => handleChange('color_plate', e.target.value)}
                        placeholder="VD: Trắng"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chassis_no">Số khung *</Label>
                      <Input
                        id="chassis_no"
                        value={formData.chassis_no || ''}
                        onChange={(e) => handleChange('chassis_no', e.target.value)}
                        placeholder="VD: RLH123456789"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="engine_no">Số máy *</Label>
                      <Input
                        id="engine_no"
                        value={formData.engine_no || ''}
                        onChange={(e) => handleChange('engine_no', e.target.value)}
                        placeholder="VD: EN987654321"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="owner_name">Chủ sở hữu *</Label>
                      <div className="relative">
                        <Input
                          id="owner_name"
                          value={formData.owner_name || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleChange('owner_name', value);
                            if (!isEdit) {
                              setOwnerKeyword(value);
                              handleChange('owner_id', undefined);
                            }
                          }}
                          onFocus={() => {
                            if (!isEdit && ownerOptions.length > 0) {
                              setShowOwnerOptions(true);
                            }
                          }}
                          onBlur={() => {
                            if (!isEdit) {
                              window.setTimeout(() => setShowOwnerOptions(false), 120);
                            }
                          }}
                          autoComplete="off"
                          placeholder="Nhập tên chủ sở hữu"
                          required
                        />
                        {!isEdit && isFetchingOwners && (
                          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                        )}
                        {!isEdit && showOwnerOptions && (
                          <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-background shadow-sm">
                            {ownerOptions.map((option) => (
                              <button
                                key={option.id}
                                type="button"
                                className="w-full px-3 py-2 text-left hover:bg-muted"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => handleSelectOwner(option)}
                              >
                                <div className="text-sm font-medium">{option.full_name}</div>
                                <div className="text-xs text-muted-foreground">
                                  owner_id: {option.id} | CCCD: {option.identity_no}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {!isEdit && formData.owner_id && (
                        <p className="text-xs text-muted-foreground">Đã chọn owner_id: {formData.owner_id}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Hãng xe *</Label>
                      <Select value={formData.brand} onValueChange={(value) => handleChange('brand', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(VehicleBrand).map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {VEHICLE_BRAND_LABEL[brand]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registration_place">Nơi đăng kiểm</Label>
                    <Input
                      id="registration_place"
                      value={formData.registration_place || ''}
                      onChange={(e) => handleChange('registration_place', e.target.value)}
                      placeholder="VD: Trung tâm đăng kiểm 50-01S"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="color_vehicle">Màu xe</Label>
                      <Select value={formData.color_vehicle} onValueChange={(value) => handleChange('color_vehicle', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['Trắng', 'Đen', 'Bạc', 'Xám', 'Đỏ', 'Xanh'].map((color) => (
                            <SelectItem key={color} value={color}>
                              {color}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seats">Số chỗ ngồi</Label>
                      <Input
                        id="seats"
                        type="number"
                        value={formData.seats || ''}
                        onChange={(e) => handleChange('seats', parseInt(e.target.value, 10) || undefined)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issuer">Nơi cấp (Thành phố)</Label>
                      <Input
                        id="issuer"
                        value={formData.issuer || ''}
                        onChange={(e) => handleChange('issuer', e.target.value)}
                        placeholder="Hà Nội"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="issue_date">Ngày đăng ký *</Label>
                      <Input
                        id="issue_date"
                        type="date"
                        value={formData.issue_date}
                        onChange={(e) => handleChange('issue_date', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registration_code">Mã đăng kiểm</Label>
                      <Input
                        id="registration_code"
                        value={formData.registration_code || ''}
                        onChange={(e) => handleChange('registration_code', e.target.value)}
                        placeholder="VD: DK12345HN"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="registration_date">Ngày đăng kiểm</Label>
                      <Input
                        id="registration_date"
                        type="date"
                        value={formData.registration_date || ''}
                        onChange={(e) => handleChange('registration_date', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry_date">Hạn đăng kiểm</Label>
                      <Input
                        id="expiry_date"
                        type="date"
                        value={formData.expiry_date || ''}
                        onChange={(e) => handleChange('expiry_date', e.target.value || undefined)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Status).map((status) => (
                          <SelectItem key={status} value={status}>
                            {STATUS_LABEL[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hành động</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {isEdit ? 'Cập nhật' : 'Thêm mới'}
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
                  <p>• Tất cả các trường đánh dấu (*) là bắt buộc</p>
                  <p>• Biển số xe phải theo định dạng chuẩn</p>
                  <p>• Chủ sở hữu nên chọn từ danh sách để lưu đúng owner_id</p>
                  <p>• Hạn đăng kiểm phải sau ngày đăng kiểm</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
