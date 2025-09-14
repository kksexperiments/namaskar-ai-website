import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: string;
  published_at: string;
  article_categories?: { name: string };
}

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        article_categories (name)
      `)
      .eq('slug', articleSlug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching article:', error);
    } else {
      setArticle(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto">
          {article.featured_image && (
            <div className="mb-8">
              <img
                src={article.featured_image}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {article.article_categories && (
                <Badge variant="secondary">{article.article_categories.name}</Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            {article.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>
            )}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.published_at).toLocaleDateString()}</span>
              </div>
            </div>
          </header>

          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
              />
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
};

export default Article;