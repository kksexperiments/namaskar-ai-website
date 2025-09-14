import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category_id: string;
  author: string;
  status: string;
  published_at: string;
  created_at: string;
  article_categories?: { name: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const Admin = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: '',
    author: '',
    status: 'draft' as 'draft' | 'published'
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        article_categories (name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error fetching articles', variant: 'destructive' });
    } else {
      setArticles(data || []);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('article_categories')
      .select('*')
      .order('name');

    if (error) {
      toast({ title: 'Error fetching categories', variant: 'destructive' });
    } else {
      setCategories(data || []);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(fileName, file);

      if (error) {
        toast({ title: 'Error uploading image', variant: 'destructive' });
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      toast({ title: 'Error uploading image', variant: 'destructive' });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, featured_image: previewUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = formData.featured_image;
    
    // Upload image if a new file is selected
    if (selectedFile) {
      const uploadedUrl = await uploadImage(selectedFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        return; // Don't proceed if image upload failed
      }
    }
    
    const slug = generateSlug(formData.title);
    const articleData = {
      ...formData,
      featured_image: imageUrl,
      slug,
      published_at: formData.status === 'published' ? new Date().toISOString() : null
    };

    if (editingArticle) {
      const { error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', editingArticle.id);

      if (error) {
        toast({ title: 'Error updating article', variant: 'destructive' });
      } else {
        toast({ title: 'Article updated successfully' });
        setEditingArticle(null);
        fetchArticles();
      }
    } else {
      const { error } = await supabase
        .from('articles')
        .insert([articleData]);

      if (error) {
        toast({ title: 'Error creating article', variant: 'destructive' });
      } else {
        toast({ title: 'Article created successfully' });
        setIsCreating(false);
        fetchArticles();
      }
    }

    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featured_image: '',
      category_id: '',
      author: '',
      status: 'draft'
    });
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || '',
      featured_image: article.featured_image || '',
      category_id: article.category_id || '',
      author: article.author,
      status: article.status as 'draft' | 'published'
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: 'Error deleting article', variant: 'destructive' });
      } else {
        toast({ title: 'Article deleted successfully' });
        fetchArticles();
      }
    }
  };

  const cancelEdit = () => {
    setEditingArticle(null);
    setIsCreating(false);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featured_image: '',
      category_id: '',
      author: '',
      status: 'draft'
    });
    setSelectedFile(null);
    setSelectedFile(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Management</h1>
        <p className="text-muted-foreground">Manage your articles and content</p>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Articles</h2>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </div>

            {isCreating && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingArticle ? 'Edit Article' : 'Create New Article'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={10}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category_id}
                          onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value: 'draft' | 'published') => setFormData({ ...formData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="featured_image">Featured Image</Label>
                      <div className="space-y-4">
                        <Input
                          id="featured_image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="cursor-pointer"
                        />
                        {formData.featured_image && (
                          <div className="mt-2">
                            <img
                              src={formData.featured_image}
                              alt="Preview"
                              className="w-full max-w-md h-48 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                        {uploadingImage && (
                          <div className="text-sm text-muted-foreground">
                            Uploading image...
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" disabled={uploadingImage}>
                        {uploadingImage ? 'Uploading...' : editingArticle ? 'Update' : 'Create'} Article
                      </Button>
                      <Button type="button" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{article.title}</h3>
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{article.excerpt}</p>
                        <div className="text-sm text-muted-foreground">
                          By {article.author} • {article.article_categories?.name} • 
                          {new Date(article.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage article categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex justify-between items-center p-4 border rounded">
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;