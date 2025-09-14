import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, ArrowRight, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NewsSectionProps {
  t: any;
}

const NewsSection = ({ t }: NewsSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        article_categories (name)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      setArticles(data || []);
    }
    setLoadingArticles(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t.newsSection.newsletter.error,
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t.newsSection.newsletter.success,
        description: "You've been subscribed to our newsletter!",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: t.newsSection.newsletter.error,
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback news data if no articles from database
  const fallbackNewsItems = [
    {
      icon: "🚀",
      title: "Welcome to Our CMS",
      description: "Start creating articles from the admin panel to see them here.",
      date: new Date().toISOString().split('T')[0],
      category: "Getting Started",
      readTime: "1 min read",
      trending: false
    }
  ];

  const newsItems = articles.length > 0 ? articles.map(article => ({
    icon: "📝",
    title: article.title,
    description: article.excerpt || article.content.substring(0, 100) + "...",
    date: article.published_at?.split('T')[0] || article.created_at.split('T')[0],
    category: article.article_categories?.name || "Uncategorized",
    readTime: Math.ceil(article.content.length / 200) + " min read",
    trending: false,
    slug: article.slug
  })) : fallbackNewsItems;

  return (
    <section id="news" className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.news?.headline || "Latest News & Updates"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.news?.description || "Stay updated with the latest AI developments and insights"}
          </p>
        </div>

        {loadingArticles ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
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
            {/* First two articles always visible */}
            {newsItems.slice(0, 2).map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">{item.icon}</div>
                    {item.trending && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
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
                    <Link to={`/article/${item.slug}`}>
                      <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/5">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/5">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {/* Additional articles hidden on small screens */}
            {newsItems.slice(2).map((item, index) => (
              <Card key={index + 2} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur hidden lg:block">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">{item.icon}</div>
                    {item.trending && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
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
                    <Link to={`/article/${item.slug}`}>
                      <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/5">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/5">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to="/news">
            <Button variant="outline" className="border-primary/20 hover:bg-primary hover:text-primary-foreground">
              View All News
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Newsletter Subscription */}
        <Card className="mt-12 border-primary/20 bg-gradient-to-r from-card to-card/50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Stay Updated
            </CardTitle>
            <CardDescription>
              Subscribe to our newsletter for the latest AI news and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsSection;