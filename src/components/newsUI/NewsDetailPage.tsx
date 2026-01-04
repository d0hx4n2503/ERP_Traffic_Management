import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Eye,
  Tag,
  Share2,
  Download,
  Printer,
  Clock
} from 'lucide-react';
import { News } from '@/types/news.types';
import { useBreadcrumb } from '@/components/BreadcrumbContext';
import { toast } from 'sonner';
import { newsService } from '@/services/newsService';

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

interface NewsDetailPageProps {
  news: News;
  onBack: () => void;
  onEdit: () => void;
}

export default function NewsDetailPage({ news: initialNews, onBack, onEdit }: NewsDetailPageProps) {
  const { setBreadcrumbs, resetBreadcrumbs } = useBreadcrumb();
  const [news, setNews] = useState<News>(initialNews);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const freshNews = await newsService.getNewsById(initialNews.id);
        setNews(freshNews);
      } catch (err) {
        toast.error("Không thể tải chi tiết mới nhất");
      }
    };
    fetchLatest();
  }, [initialNews.id]);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Trang chính', onClick: onBack, isHome: true },
      { label: 'Tin tức', onClick: onBack },
      { label: news.title.substring(0, 50) + (news.title.length > 50 ? '...' : '') }
    ]);

    return () => resetBreadcrumbs();
  }, [news.title, onBack, setBreadcrumbs, resetBreadcrumbs]);

  const readingTime = Math.ceil(news.content.split(' ').length / 200);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl">Chi tiết tin tức</h2>
            <p className="text-muted-foreground mt-1">Thông tin chi tiết bài viết</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success('Đã chia sẻ!')}>
            <Share2 className="mr-2 h-4 w-4" />
            Chia sẻ
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            In
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Tải xuống
          </Button>
          <Button size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          {news.image && (
            <Card className="overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-[400px] object-cover"
              />
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`${categoryConfig[news.category]?.color || "bg-gray-500"} text-white`}>
                    {categoryConfig[news.category]?.label || news.category}
                  </Badge>
                  <Badge className={`${statusConfig[news.status]?.color || "bg-gray-500"} text-white`}>
                    {statusConfig[news.status]?.label || news.status}
                  </Badge>
                </div>
                <CardTitle className="text-3xl leading-tight">{news.title}</CardTitle>
                <Separator />
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{news.author || "Không rõ"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(news.created_at).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{news.view.toLocaleString('vi-VN')} lượt xem</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
            </CardContent>
          </Card>

          {/* Tags */}
          {news.tag && news.tag.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="h-5 w-5" />
                  Thẻ tag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {news.tag.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thao tác</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa bài viết
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Chia sẻ
              </Button>
              <Separator className="my-4" />
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Tải bản sao
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                In bài viết
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">ID bài viết</p>
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{news.id}</code>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mã bài viết</p>
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{news.code}</code>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tác giả</p>
                <p className="font-medium">{news.author || "Không rõ"}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Danh mục</p>
                <Badge className={`${categoryConfig[news.category]?.color || "bg-gray-500"} text-white`}>
                  {categoryConfig[news.category]?.label || news.category}
                </Badge>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Trạng thái</p>
                <Badge className={`${statusConfig[news.status]?.color || "bg-gray-500"} text-white`}>
                  {statusConfig[news.status]?.label || news.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Lượt xem</p>
                <p className="text-2xl">{news.view.toLocaleString('vi-VN')}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Ngày tạo</p>
                <p className="text-lg">{new Date(news.created_at).toLocaleDateString('vi-VN')}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Thời gian đọc ước tính
                </p>
                <p className="text-lg">{readingTime} phút</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}