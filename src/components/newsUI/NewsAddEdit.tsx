import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react';
import { News } from '@/types/news.types';
import { useBreadcrumb } from '@/components/BreadcrumbContext';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { newsService } from '@/services/newsService';

interface NewsAddEditProps {
  news: News | null;
  onBack: () => void;
  mode: 'add' | 'edit';
  onSuccess?: () => void;
}

const categoryOptions = [
  { value: 'info', label: 'Thông tin' },
  { value: 'warning', label: 'Cảnh báo' },
  { value: 'important', label: 'Quan trọng' },
  { value: 'system', label: 'Hệ thống' },
  { value: 'news', label: 'Tin tức' },
  { value: 'announcement', label: 'Thông báo' },
  { value: 'guide', label: 'Hướng dẫn' },
  { value: 'law', label: 'Luật giao thông' },
];

const statusOptions = [
  { value: 'published', label: 'Đã đăng' },
  { value: 'draft', label: 'Nháp' },
  { value: 'archived', label: 'Lưu trữ' },
];

export default function NewsAddEdit({ news, onBack, mode, onSuccess }: NewsAddEditProps) {
  const { setBreadcrumbs } = useBreadcrumb();
  const [formData, setFormData] = useState<Partial<News>>({
    title: '',
    content: '',
    image: '',
    category: 'news',
    author: '',
    status: 'draft',
    tag: [],
    type: 'article',
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (mode === 'edit' && news) {
      setFormData({
        title: news.title || '',
        content: news.content || '',
        image: news.image || '',
        category: news.category || 'news',
        author: news.author || '',
        status: news.status || 'draft',
        tag: news.tag || [],
        type: news.type || 'article',
      });
    } else {
      // Reset form khi thêm mới
      setFormData({
        title: '',
        content: '',
        image: '',
        category: 'news',
        author: '',
        status: 'draft',
        tag: [],
        type: 'article',
      });
    }
  }, [mode, news]);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Tin tức', onClick: onBack },
      { label: mode === 'add' ? 'Thêm tin tức mới' : `Chỉnh sửa - ${news?.title.substring(0, 30)}...` }
    ]);

    return () => {
      setBreadcrumbs([]);
    };
  }, [mode, news, onBack, setBreadcrumbs]);

  const handleChange = (field: keyof News, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !(formData.tag || []).includes(newTag.trim())) {
      handleChange('tag', [...(formData.tag || []), newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleChange('tag', (formData.tag || []).filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!formData.title?.trim() || !formData.content?.trim()) {
      toast.error('Vui lòng nhập tiêu đề và nội dung!');
      return;
    }

    try {
      if (mode === 'add') {
        await newsService.createNews(formData as Partial<News>);
        toast.success('Đã thêm tin tức thành công!');
      } else {
        await newsService.updateNews(news!.id, formData as Partial<News>);
        toast.success('Đã cập nhật tin tức thành công!');
      }
      onSuccess?.();
      onBack();
    } catch (err) {
      toast.error(mode === 'add' ? 'Thêm tin tức thất bại' : 'Cập nhật thất bại');
    }
  };

  const handleCancel = () => {
    toast.info('Đã hủy thay đổi');
    onBack();
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-blue-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl mb-2">
              {mode === 'add' ? 'Thêm tin tức mới' : 'Chỉnh sửa tin tức'}
            </h2>
            <p className="text-muted-foreground">
              {mode === 'add' ? 'Tạo bài viết mới' : `Cập nhật bài viết: ${news?.title}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Hủy
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              {mode === 'add' ? 'Tạo bài viết' : 'Lưu thay đổi'}
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nội dung bài viết</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Tiêu đề <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Nhập tiêu đề bài viết..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  Nội dung <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  value={formData.content || ''}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Nhập nội dung bài viết (hỗ trợ HTML)..."
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Hỗ trợ HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;img&gt;, v.v.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Tác giả</Label>
                <Input
                  id="author"
                  value={formData.author || ''}
                  onChange={(e) => handleChange('author', e.target.value)}
                  placeholder="Tên tác giả..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thẻ tag</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Nhập tag và nhấn Enter..."
                />
                <Button onClick={handleAddTag} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {(formData.tag || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(formData.tag || []).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục <span className="text-red-500">*</span></Label>
                <Select value={formData.category} onValueChange={(value: any) => handleChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái <span className="text-red-500">*</span></Label>
                <Select value={formData.status} onValueChange={(value: any) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ảnh đại diện</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.image && (
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Ảnh đại diện"
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => handleChange('image', '')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="image">URL ảnh</Label>
                <Input
                  id="image"
                  value={formData.image || ''}
                  onChange={(e) => handleChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="space-y-2 text-sm">
                <p className="font-medium text-blue-900">Lưu ý:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Tiêu đề nên rõ ràng, hấp dẫn</li>
                  <li>Nội dung cần đầy đủ, chính xác</li>
                  <li>Chọn danh mục phù hợp</li>
                  <li>Ảnh đại diện nên có tỷ lệ 16:9</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}