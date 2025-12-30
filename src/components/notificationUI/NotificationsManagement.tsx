import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Send,
  Mail,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react";
import ModernDataTable, { ColumnDef, FilterConfig } from "@/components/LicensesUI/ModernDataTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification } from "@/types/notification.types";
import notificationService from "@/services/notificationService";

export default function NotificationsManagement() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [viewMode, setViewMode] = useState<"list" | "detail" | "add" | "edit">("list");
  const [formData, setFormData] = useState<Partial<Notification>>({
    type: "info",
    target: "all",
    status: "unread",
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await notificationService.getAllNotifications(currentPage, itemsPerPage);
      setNotifications(res.notifications);
      setTotalCount(res.total_count);
      setTotalPages(res.total_pages);
    };
    fetchNotifications();
  }, []);

  const handleCreate = () => {
    setFormData({ type: "info", target: "all", status: "unread" });
    setViewMode("add");
  };

  const handleSave = async (send: boolean) => {
    // const data = { ...formData, active: send };
    // let not: Notification;
    // if (viewMode === "add") {
    //   not = await notificationService.createNotification(data);
    // } else {
    //   not = await notificationService.updateNotification(selectedNotification!.id, data);
    // }
    // setNotifications((prev) =>
    //   viewMode === "add"
    //     ? [...prev, not]
    //     : prev.map((p) => (p.id === not.id ? not : p))
    // );
    // if (send) {
    //   await notificationService.sendNow(not.id);
    // }
    // setViewMode("list");
  };

  const columns: ColumnDef<Notification>[] = [
    {
      key: 'stt',
      header: 'STT',
      width: '60px',
      render: (_, index) => <span className="text-sm">{index + 1}</span>
    },
    {
      key: "code",
      header: "Mã",
      width: "150px",
      sortable: true,
      render: (item) => (
        <div className="text-left">
          <div
            className="font-medium truncate max-w-[200px]"
            title={item.code}
          >
            {item.code}
          </div>
        </div>
      ),
    },
    {
      key: "title",
      header: "Tiêu đề",
      width: "280px",
      sortable: true,
      render: (item) => (
        <div className="text-left">
          <div
            className="font-medium truncate max-w-[200px]"
            title={item.title}
          >
            {item.title}
          </div>
        </div>
      ),
    },
    {
      key: "content",
      header: "Nội dung",
      width: "280px",
      render: (item) => (
        <div
          className="text-xs text-muted-foreground truncate max-w-[280px]"
          title={item.content}
        >
          {item.content}
        </div>
      ),
    },
    {
      key: "type",
      header: "Loại",
      width: "140px",
      render: (item) => (
        <div
          className="text-xs text-muted-foreground truncate max-w-[280px]"
          title={item.type}
        >
          {item.type}
        </div>
      ),
    },
    // {
    //   key: "type",
    //   header: "Loại",
    //   width: "150px",
    //   sortable: true,
    //   render: (item) => {
    //     const config = typeConfig[item.type];
    //     const Icon = config.icon;
    //     return (
    //       <Badge
    //         className={`${config.color} text-white flex items-center gap-1 w-fit`}
    //       >
    //         <Icon className="h-3 w-3" />
    //         {config.label}
    //       </Badge>
    //     );
    //   },
    // },
    {
      key: "target",
      header: "Đối tượng",
      width: "150px",
      render: (item) => (
        <span className="text-xs">{audienceConfig[item.target]}</span>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      width: "150px",
      sortable: true,
      render: (item) => (
        <Badge
          className={`${statusConfig[item.status].color} text-white text-xs`}
        >
          {statusConfig[item.status].label}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Ngày tạo",
      width: "150px",
      sortable: true,
      render: (item) => (
        <span className="text-xs">
          {new Date(item.created_at).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Thao tác",
      width: "150px",
      render: (item) => (
        <div className="flex gap-1 justify-center">
          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setSelectedNotification(item);
                    setViewMode("detail");
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xem chi tiết</p>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>

          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setSelectedNotification(item);
                    setFormData(item);
                    setViewMode("edit");
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chỉnh sửa</p>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>

          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={async () => {
                    await notificationService.deleteNotification(item.id);
                    setNotifications(notifications.filter((n) => n.id !== item.id));
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xóa</p>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const typeConfig = {
    info: { label: "Thông tin", color: "bg-blue-500", icon: Info },
    warning: { label: "Cảnh báo", color: "bg-yellow-500", icon: AlertTriangle },
    important: { label: "Quan trọng", color: "bg-orange-500", icon: AlertTriangle },
    system: { label: "Hệ thống", color: "bg-purple-500", icon: CheckCircle },
  };

  const statusConfig = {
    unread: { label: "Chưa đọc", color: "bg-gray-500" },
    read: { label: "Đã đọc", color: "bg-green-500" },
    success: { label: "Thành công", color: "bg-blue-500" },
  };

  const audienceConfig = {
    all: "Tất cả",
    personal: "Cá nhân",
    group: "Nhóm",
  };

  const filters: FilterConfig[] = [
    {
      key: "type",
      label: "Loại thông báo",
      options: [
        { value: "all", label: "Tất cả" },
        { value: "info", label: "Thông tin" },
        { value: "warning", label: "Cảnh báo" },
        { value: "important", label: "Quan trọng" },
        { value: "system", label: "Hệ thống" },
      ],
    },
    {
      key: "status",
      label: "Trạng thái",
      options: [
        { value: "all", label: "Tất cả" },
        { value: "unread", label: "Chưa đọc" },
        { value: "read", label: "Đã đọc" },
        { value: "success", label: "Thành công" },
      ],
    },
    {
      key: "target",
      label: "Đối tượng",
      options: [
        { value: "all", label: "Tất cả" },
        { value: "all", label: "Tất cả" },
        { value: "personal", label: "Cá nhân" },
        { value: "group", label: "Nhóm" },
      ],
    },
  ];

  if (viewMode === "detail" && selectedNotification) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2">Chi tiết thông báo</h2>
            <p className="text-muted-foreground">
              Xem thông tin chi tiết thông báo
            </p>
          </div>
          <Button variant="outline" onClick={() => setViewMode("list")}>
            Quay lại
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = typeConfig[selectedNotification.type].icon;
                return <Icon className="h-5 w-5" />;
              })()}
              {selectedNotification.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Mã thông báo</Label>
                <p className="font-mono">{selectedNotification.id}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Loại</Label>
                <div className="mt-1">
                  <Badge
                    className={`${typeConfig[selectedNotification.type].color} text-white`}
                  >
                    {typeConfig[selectedNotification.type].label}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Đối tượng nhận</Label>
                <p>{audienceConfig[selectedNotification.target]}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Trạng thái</Label>
                <div className="mt-1">
                  <Badge
                    className={`${statusConfig[selectedNotification.status].color} text-white`}
                  >
                    {statusConfig[selectedNotification.status].label}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Ngày tạo</Label>
                <p>
                  {new Date(selectedNotification.created_at).toLocaleString(
                    "vi-VN"
                  )}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Ngày cập nhật</Label>
                <p>
                  {new Date(selectedNotification.updated_at).toLocaleString(
                    "vi-VN"
                  )}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Người tạo</Label>
                <p>{selectedNotification.creator_id}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Hoạt động</Label>
                <div className="mt-1">
                  <Badge
                    className={selectedNotification.active ? "bg-green-500" : "bg-gray-500"}
                  >
                    {selectedNotification.active ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                </div>
              </div>
              {selectedNotification.target === "personal" && (
                <div>
                  <Label className="text-muted-foreground">Người nhận</Label>
                  <p>{selectedNotification.target_user}</p>
                </div>
              )}
            </div>
            <div>
              <Label className="text-muted-foreground">Nội dung</Label>
              <p className="mt-2 p-4 bg-muted rounded-lg">
                {selectedNotification.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (viewMode === "add" || viewMode === "edit") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl mb-2">
              {viewMode === "add" ? "Tạo thông báo mới" : "Chỉnh sửa thông báo"}
            </h2>
            <p className="text-muted-foreground">
              {viewMode === "add"
                ? "Nhập thông tin thông báo"
                : "Cập nhật thông tin thông báo"}
            </p>
          </div>
          <Button variant="outline" onClick={() => setViewMode("list")}>
            Hủy
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Tiêu đề *</Label>
                <Input
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Nhập tiêu đề thông báo"
                />
              </div>
              <div className="col-span-2">
                <Label>Nội dung *</Label>
                <Textarea
                  value={formData.content || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Nhập nội dung thông báo"
                  rows={5}
                />
              </div>
              <div>
                <Label>Loại thông báo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Thông tin</SelectItem>
                    <SelectItem value="warning">Cảnh báo</SelectItem>
                    <SelectItem value="important">Quan trọng</SelectItem>
                    <SelectItem value="system">Hệ thống</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Đối tượng nhận</Label>
                <Select
                  value={formData.target}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, target: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="personal">Cá nhân</SelectItem>
                    <SelectItem value="group">Nhóm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.target === "personal" && (
                <div className="col-span-2">
                  <Label>CCCD người nhận</Label>
                  <Input
                    value={formData.target_user || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, target_user: e.target.value })
                    }
                    placeholder="Nhập CCCD"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setViewMode("list")}>
                Hủy
              </Button>
              <Button onClick={() => handleSave(false)}>
                <Mail className="h-4 w-4 mr-2" />
                Lưu nháp
              </Button>
              <Button
                onClick={() => handleSave(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Gửi ngay
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ModernDataTable
        data={notifications}
        columns={columns}
        title="Danh sách thông báo"
        searchPlaceholder="Tìm kiếm theo tiêu đề, nội dung..."
        searchKeys={["title", "content", "id"]}
        filters={filters}
        getItemKey={(item) => item.id}
        actions={
          <Button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tạo mới
          </Button>
        }
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalCount}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {/* Action Legend */}
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
  );
}