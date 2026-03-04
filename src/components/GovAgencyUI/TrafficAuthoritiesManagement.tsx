import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  TrendingUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthorityDetailPage from "@/components/GovAgencyUI/AuthorityDetailPage";
import AuthorityAddEdit from "@/components/GovAgencyUI/AuthorityAddEdit";
import { ColumnDef, FilterConfig } from "@/components/ModernDataTable";
import ModernDataTable from "@/components/LicensesUI/ModernDataTable"
import StatCard from "@/components/StatCard";
import { toast } from "sonner";
import { agencyService } from "@/services/agencyService";
import type { GovAgency, PaginatedAgenciesResponse } from "@/types/agency.types";

const authorityTypeLabels: Record<string, string> = {
  police_department: "Phòng CSGT",
  inspection_center: "Trung tâm đăng kiểm",
  exam_center: "Trung tâm sát hạch",
  registration_office: "Phòng đăng ký xe",
};

const typeColors: Record<string, string> = {
  police_department: "bg-blue-50 text-blue-700 border-blue-200",
  inspection_center: "bg-green-50 text-green-700 border-green-200",
  exam_center: "bg-purple-50 text-purple-700 border-purple-200",
  registration_office: "bg-orange-50 text-orange-700 border-orange-200",
};

export default function TrafficAuthoritiesManagement() {
  const [agencies, setAgencies] = useState<GovAgency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedAuthority, setSelectedAuthority] = useState<GovAgency | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "detail" | "add" | "edit">("list");

  // Phân trang & lọc
  const [filters, setFilters] = useState<Record<string, string>>({
    type: "all",
    city: "all",
    status: "all",
  });

  // Fetch dữ liệu
  const fetchAgencies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Gọi API phân trang
      const response: PaginatedAgenciesResponse = await agencyService.getAllAgencies(currentPage, itemsPerPage);
      let filtered = response.gov_agency;

      // Lọc client-side (vì backend chưa hỗ trợ filter)
      if (filters.type !== "all") {
        filtered = filtered.filter((a: any) => a.type === filters.type);
      }
      if (filters.city !== "all") {
        filtered = filtered.filter((a: any) => a.city === filters.city);
      }
      if (filters.status !== "all") {
        filtered = filtered.filter((a: any) => a.status === filters.status);
      }

      setAgencies(filtered);
      setTotalCount(response.total_count);
      setTotalPages(response.total_pages);

    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách cơ quan");
      toast.error("Lỗi tải dữ liệu cơ quan");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filters]);

  useEffect(() => {
    if (viewMode === "list") {
      fetchAgencies();
    }
  }, [viewMode, currentPage, filters, fetchAgencies]);

  // Danh sách thành phố và loại hình từ dữ liệu thực
  const cities = useMemo(() => {
    const unique = Array.from(new Set(agencies.map((a) => a.city))).sort();
    return unique;
  }, [agencies]);

  const types = useMemo(() => {
    const unique = Array.from(new Set(agencies.map((a) => a.type)));
    return unique;
  }, [agencies]);

  // Stats tính từ dữ liệu thực
  const stats = useMemo(() => {
    const total = agencies.length;
    const active = agencies.filter((a) => a.status === "active" && a.active).length;
    const inactive = total - active;
    const totalEmployees = agencies.reduce((sum, a) => sum + (a as any).employees || 0, 0); // nếu có trường employees

    return { total, active, inactive, totalEmployees };
  }, [agencies]);

  const handleAdd = () => {
    setSelectedAuthority(null);
    setViewMode("add");
  };

  const handleEdit = (authority: GovAgency) => {
    setSelectedAuthority(authority);
    setViewMode("edit");
  };

  const handleView = (authority: GovAgency) => {
    setSelectedAuthority(authority);
    setViewMode("detail");
  };

  const handleDelete = async (authority: GovAgency) => {
    try {
      await agencyService.deleteAgencies(authority.id);
      toast.success("Xóa cơ quan thành công!");
      fetchAgencies();
    } catch (err) {
      toast.error("Xóa cơ quan thất bại");
    }
  };

  const handleSaveAuthority = async (data: Partial<GovAgency>) => {
    try {
      if (viewMode === "add") {
        await agencyService.createAgencies(data);
        toast.success("Them co quan thanh cong!");
      } else if (selectedAuthority) {
        await agencyService.updateAgencies(selectedAuthority.id, data);
        toast.success("Cap nhat co quan thanh cong!");
      }
      setViewMode("list");
      setSelectedAuthority(null);
      fetchAgencies();
    } catch (err) {
      toast.error("Luu thay doi that bai");
    }
  };

  // Các cột bảng
  const columns: ColumnDef<GovAgency>[] = [
    {
      key: "stt",
      header: "STT",
      width: "60px",
      render: (_, index) => <span className="text-sm">{(currentPage - 1) * itemsPerPage + index + 1}</span>,
    },
    {
      key: "id",
      header: "Mã cơ quan",
      sortable: true,
      width: "130px",
      render: (auth) => (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 font-mono">
          {auth.id.slice(0, 8)}...
        </Badge>
      ),
    },
    {
      key: "name",
      header: "Tên cơ quan",
      sortable: true,
      width: "220px",
      render: (auth) => (
        <div className="flex items-center gap-2 text-left w-full">
          <Building2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span className="text-sm truncate" title={auth.name}>
            {auth.name}
          </span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Loại hình",
      sortable: true,
      width: "170px",
      render: (auth) => (
        <Badge variant="outline" className={typeColors[auth.type] || "bg-gray-50 text-gray-700"}>
          {authorityTypeLabels[auth.type] || auth.type}
        </Badge>
      ),
    },
    {
      key: "city",
      header: "Thành phố",
      sortable: true,
      width: "120px",
      render: (auth) => (
        <span className="text-sm truncate" title={auth.city}>
          {auth.city}
        </span>
      ),
    },
    {
      key: "address",
      header: "Địa chỉ",
      width: "200px",
      render: (auth) => (
        <div className="flex items-start gap-2 text-left w-full">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <span className="text-sm text-muted-foreground truncate" title={auth.address}>
            {auth.address}
          </span>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Điện thoại",
      width: "130px",
      render: (auth) => (
        <div className="flex items-center gap-2">
          <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          <span className="text-sm font-mono">{auth.phone || "-"}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      width: "220px",
      render: (auth) => (
        <div className="flex items-center gap-2">
          <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          <span className="text-sm text-muted-foreground truncate" title={auth.email}>
            {auth.email || "-"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      sortable: true,
      width: "130px",
      render: (auth) => (
        <Badge className={auth.active && auth.status === "active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
          {auth.active && auth.status === "active" ? "Hoạt động" : "Tạm ngừng"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Thao tác",
      width: "150px",
      render: (auth) => (
        <div className="flex justify-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => handleView(auth)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Xem chi tiết</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => handleEdit(auth)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Chỉnh sửa</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleDelete(auth)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Xóa</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const filterConfigs: FilterConfig[] = [
    {
      key: "type",
      label: "Loại hình",
      options: [
        { value: "all", label: "Tất cả" },
        ...types.map((type) => ({
          value: type,
          label: authorityTypeLabels[type] || type,
        })),
      ],
    },
    {
      key: "city",
      label: "Thành phố",
      options: [
        { value: "all", label: "Tất cả" },
        ...cities.map((city) => ({ value: city, label: city })),
      ],
    },
    {
      key: "status",
      label: "Trạng thái",
      options: [
        { value: "all", label: "Tất cả" },
        { value: "active", label: "Hoạt động" },
        { value: "INACTIVE", label: "Tạm ngừng" },
      ],
    },
  ];

  // Các chế độ xem chi tiết/thêm/sửa
  if (viewMode === "detail" && selectedAuthority) {
    return (
      <AuthorityDetailPage
        authority={selectedAuthority}
        onAgencyUpdated={(updated) => {
          setSelectedAuthority(updated);
          setAgencies((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        }}
        onBack={() => {
          setViewMode("list");
          setSelectedAuthority(null);
        }}
        onEdit={() => setViewMode("edit")}
      />
    );
  }

  if (viewMode === "edit" && selectedAuthority) {
    return (
      <AuthorityAddEdit
        authority={selectedAuthority}
        onBack={() => setViewMode("detail")}
        onSave={handleSaveAuthority}
      />
    );
  }

  if (viewMode === "add") {
    return (
      <AuthorityAddEdit
        onBack={() => setViewMode("list")}
        onSave={handleSaveAuthority}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Tổng cơ quan"
          value={stats.total}
          subtitle="Đơn vị quản lý"
          icon={Building2}
          color="blue"
          delay={0.1}
        />
        <StatCard
          title="Đang hoạt động"
          value={stats.active}
          subtitle={`${stats.total ? Math.round((stats.active / stats.total) * 100) : 0}% tổng số`}
          icon={CheckCircle}
          color="green"
          progress={stats.total ? Math.round((stats.active / stats.total) * 100) : 0}
          delay={0.15}
        />
        <StatCard
          title="Tạm ngừng"
          value={stats.inactive}
          subtitle="Cơ quan tạm ngừng"
          icon={XCircle}
          color="slate"
          delay={0.2}
        />
        <StatCard
          title="Tổng nhân viên"
          value={stats.totalEmployees}
          subtitle={stats.total ? `TB ${Math.round(stats.totalEmployees / stats.total)} NV/đơn vị` : "-"}
          icon={Users}
          color="purple"
          trend={{ value: 12, isPositive: true }}
          delay={0.25}
        />
      </div>

      {/* Error & Loading */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Data Table */}
      <div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg">Đang tải danh sách cơ quan...</span>
          </div>
        ) : (
          <ModernDataTable
            data={agencies}
            columns={columns}
            title="Danh sách cơ quan giao thông"
            searchPlaceholder="Tìm kiếm theo tên, mã, địa chỉ..."
            searchKeys={["name", "id", "address", "city"]}
            filters={filterConfigs}
            getItemKey={(auth) => auth.id}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalCount}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            actions={
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm cơ quan
              </Button>
            }
          />
        )}

        {/* Action Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200"
        >
          <p className="text-sm mb-3 font-medium">Chú thích thao tác:</p>
          <div className="flex flex-wrap gap-6 text-sm">
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
              <span>Xóa cơ quan</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

