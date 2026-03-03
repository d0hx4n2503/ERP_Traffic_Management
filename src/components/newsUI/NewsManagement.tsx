import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  FileText,
  Users,
  Newspaper,
} from "lucide-react";
import ModernDataTable, { ColumnDef } from "@/components/LicensesUI/ModernDataTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import NewsDetailPage from "./NewsDetailPage";
import NewsAddEdit from "./NewsAddEdit";
import { newsService } from "@/services/newsService";
import { News, PaginatedNewsResponse } from "@/types/news.types";

const categoryConfig: Record<string, { label: string; color: string }> = {
  law: { label: "Luật giao thông", color: "bg-orange-500" },
  announcement: { label: "Thông báo", color: "bg-blue-500" },
  guide: { label: "Hướng dẫn", color: "bg-green-500" },
  news: { label: "Tin tức", color: "bg-purple-500" },
  info: { label: "Thông tin", color: "bg-cyan-500" },
  warning: { label: "Cảnh báo", color: "bg-red-500" },
  important: { label: "Quan trọng", color: "bg-red-600" },
  system: { label: "Hệ thống", color: "bg-gray-600" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  published: { label: "Đã đăng", color: "bg-green-500" },
  draft: { label: "Nháp", color: "bg-gray-500" },
  archived: { label: "Lưu trữ", color: "bg-yellow-500" },
};

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: any;
  color: string;
}

function StatCard({ title, value, subtitle, icon: Icon, color }: StatCardProps) {
  return (
    <Card className="overflow-hidden relative group hover:shadow-lg transition-all duration-300">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300`} />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardDescription className="text-sm">{title}</CardDescription>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
            <Icon className={`h-4 w-4 text-${color.split("-")[1]}-600`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export default function NewsManagement() {
  const [viewMode, setViewMode] = useState<"list" | "detail" | "add" | "edit">("list");
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const fetchNews = async () => {
    try {
      const res = await newsService.getAllNews(currentPage, itemsPerPage);
      setNewsList(res.news);
      setTotalCount(res.total_count);
      setTotalPages(res.total_pages);
    } catch (error) {
      toast.error("Không thể tải danh sách tin tức");
    }
  };

  useEffect(() => {

    fetchNews();
  }, []);

  const handleViewDetail = (news: News) => {
    setSelectedNews(news);
    setViewMode("detail");
  };

  const handleEditNews = (news: News) => {
    setSelectedNews(news);
    setViewMode("edit");
  };

  const handleAddNews = () => {
    setSelectedNews(null);
    setViewMode("add");
  };

  const handleBack = () => {
    setSelectedNews(null);
    setViewMode("list");
    fetchNews();
  };

  const handleDelete = async (news: News) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
    try {
      await newsService.deleteNews(news.id);
      toast.success("Đã xóa tin tức thành công!");
      fetchNews();
    } catch (err) {
      toast.error("Xóa thất bại");
    }
  };

  if (viewMode === "detail" && selectedNews) {
    return <NewsDetailPage news={selectedNews} onBack={handleBack} onEdit={() => handleEditNews(selectedNews)} />;
  }

  if (viewMode === "add" || viewMode === "edit") {
    return <NewsAddEdit news={selectedNews} onBack={handleBack} mode={viewMode} onSuccess={() => fetchNews()} />;
  }

  const columns: ColumnDef<News>[] = [
    {
      key: "code",
      header: "Mã",
      width: "8%",
      render: (news) => <span className="font-mono text-xs">{news.code || news.id}</span>,
    },
    {
      key: "title",
      header: "Tiêu đề",
      width: "30%",
      render: (news) => (
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <div className="line-clamp-2 font-medium">{news.title}</div>
          </div>
          <div className="text-xs text-muted-foreground line-clamp-1">{news.content.slice(0, 100)}...</div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Danh mục",
      width: "10%",
      render: (news) => (
        <Badge className={`${categoryConfig[news.category]?.color || "bg-gray-500"} text-white`}>
          {categoryConfig[news.category]?.label || news.category}
        </Badge>
      ),
    },
    {
      key: "author",
      header: "Tác giả",
      width: "13%",
      render: (news) => <span>{news.author}</span>,
    },
    {
      key: "created_at",
      header: "Ngày tạo",
      width: "12%",
      render: (news) => new Date(news.created_at).toLocaleDateString("vi-VN"),
    },
    {
      key: "view",
      header: "Lượt xem",
      width: "9%",
      render: (news) => (
        <div className="flex items-center gap-1">
          <Eye className="h-3 w-3 text-muted-foreground" />
          <span>{news.view.toLocaleString("vi-VN")}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      width: "8%",
      render: (news) => (
        <Badge className={`${statusConfig[news.status]?.color || "bg-gray-500"} text-white`}>
          {statusConfig[news.status]?.label || news.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Thao tác",
      width: "100px",
      render: (news) => (
        <div className="flex justify-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => handleViewDetail(news)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Xem chi tiết</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => handleEditNews(news)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Chỉnh sửa</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600" onClick={() => handleDelete(news)}>
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

  const stats = {
    total: totalCount,
    published: newsList.filter((n) => n.status === "published").length,
    draft: newsList.filter((n) => n.status === "draft").length,
    totalViews: newsList.reduce((sum, n) => sum + n.view, 0),
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Tổng bài viết" value={stats.total} subtitle="Tất cả tin tức" icon={Newspaper} color="from-blue-500 to-cyan-500" />
        <StatCard title="Đã đăng" value={stats.published} subtitle="Đang hiển thị" icon={FileText} color="from-green-500 to-emerald-500" />
        <StatCard title="Nháp" value={stats.draft} subtitle="Chờ xuất bản" icon={Edit} color="from-yellow-500 to-orange-500" />
        <StatCard title="Lượt xem" value={stats.totalViews.toLocaleString("vi-VN")} subtitle="Tổng lượt xem" icon={Users} color="from-purple-500 to-pink-500" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <ModernDataTable
          data={newsList}
          columns={columns}
          title="Danh sách tin tức"
          searchPlaceholder="Tìm kiếm theo tiêu đề, nội dung, tác giả..."
          getItemKey={(news) => news.id}
          actions={
            <Button onClick={handleAddNews}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm tin tức
            </Button>
          }
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalCount}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </motion.div>
    </div>
  );
}
