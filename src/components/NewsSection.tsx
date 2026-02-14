import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, ArrowRight, Mail, Rocket, FileText, LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Content, Language } from "@/types/language";
import { toLocalePath } from "@/lib/locale";

interface NewsSectionProps {
  t: Content;
  currentLanguage: Language;
}

interface ArticlePreview {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  published_at: string | null;
  created_at: string;
  slug: string;
  featured_image: string | null;
  article_categories?: { name: string } | null;
}

interface RenderNewsItem {
  icon: LucideIcon;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  trending: boolean;
  slug?: string;
  featured_image?: string | null;
}

const NewsSection = ({ t, currentLanguage }: NewsSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select(`
        id,
        title,
        excerpt,
        content,
        published_at,
        created_at,
        slug,
        featured_image,
        article_categories (name)
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      setArticles((data || []) as ArticlePreview[]);
    }
    setLoadingArticles(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: t.newsletter.error,
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: t.newsletter.success,
        description: "You've been subscribed to our newsletter!",
      });

      setEmail("");
    } catch {
      toast({
        title: t.newsletter.error,
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fallbackNewsItems: RenderNewsItem[] = [
    {
      icon: Rocket,
      title: "Welcome to Our CMS",
      description: "Start creating articles from the admin panel to see them here.",
      date: new Date().toISOString().split("T")[0],
      category: "Getting Started",
      readTime: "1 min read",
      trending: false,
    },
  ];

  const newsItems: RenderNewsItem[] =
    articles.length > 0
      ? articles.map((article) => ({
          icon: FileText,
          title: article.title,
          description: article.excerpt || `${article.content.substring(0, 100)}...`,
          date: article.published_at?.split("T")[0] || article.created_at.split("T")[0],
          category: article.article_categories?.name || "Uncategorized",
          readTime: `${Math.max(1, Math.ceil(article.content.length / 200))} min read`,
          trending: false,
          slug: article.slug,
          featured_image: article.featured_image,
        }))
      : fallbackNewsItems;

  return (
    <section id="news" className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.news.headline}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.news.description}</p>
        </div>

        {loadingArticles ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-6 bg-muted rounded mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur overflow-hidden"
              >
                {item.featured_image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={item.featured_image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    {item.trending && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">{item.title}</h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.readTime}
                      </div>
                    </div>
                    <span>{item.date}</span>
                  </div>

                  {item.slug ? (
                    <Link to={toLocalePath(`/article/${item.slug}`, currentLanguage)}>
                      <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/5">
                        {t.news.readMore}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to={toLocalePath("/news", currentLanguage)}>
                      <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/5">
                        {t.news.readMore}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to={toLocalePath("/news", currentLanguage)}>
            <Button variant="outline" className="border-primary/20 hover:bg-primary hover:text-primary-foreground">
              View All News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <Card className="mt-12 border-primary/20 bg-gradient-to-r from-card to-card/50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              {t.newsletter.headline}
            </CardTitle>
            <CardDescription>{t.newsletter.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t.newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "..." : t.newsletter.button}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsSection;
