import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author: string;
  published_at: string;
  slug: string;
  article_categories?: { name: string } | null;
}

const Article = () => {
  const { slug } = useParams();
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async (articleSlug: string) => {
      const { data, error } = await supabase
        .from("articles")
        .select(
          `
          id,
          title,
          content,
          excerpt,
          featured_image,
          author,
          published_at,
          slug,
          article_categories (name)
        `,
        )
        .eq("slug", articleSlug)
        .eq("status", "published")
        .single();

      if (error) {
        console.error("Error fetching article:", error);
      } else {
        setArticle(data as Article);
      }

      setLoading(false);
    };

    if (slug) {
      void fetchArticle(slug);
    } else {
      setLoading(false);
    }
  }, [slug]);

  const pageTitle = useMemo(() => {
    if (!article) {
      return isAssamese ? "Article পোৱা নগ'ল | নমস্কাৰ AI" : "Article Not Found | Namaskar AI";
    }

    return `${article.title} | Namaskar AI`;
  }, [article, isAssamese]);

  const pageDescription = useMemo(() => {
    if (!article) {
      return isAssamese
        ? "এই খবৰ/লেখাটো পোৱা নগ'ল। অন্য AI guides চাওক।"
        : "This article could not be found. Explore other AI learning guides.";
    }

    return article.excerpt || article.content.slice(0, 160);
  }, [article, isAssamese]);

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: pageDescription,
        author: {
          "@type": "Person",
          name: article.author,
        },
        datePublished: article.published_at,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": toAbsoluteSiteUrl(toLocalePath(`/article/${article.slug}`, language)),
        },
      }
    : undefined;

  if (loading) {
    return (
      <div className="platform-page flex items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="platform-page">
      <Seo
        title={pageTitle}
        description={pageDescription}
        path={article ? toLocalePath(`/article/${article.slug}`, language) : toLocalePath("/news", language)}
        language={language}
        type="article"
        structuredData={articleSchema}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell">
          <Link
            to={toLocalePath("/news", language)}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "খবৰলৈ উভতি যাওক" : "Back to News"}
          </Link>

          {!article ? (
            <Card className="p-10 text-center">
              <h1 className="text-2xl font-semibold">{isAssamese ? "Article পোৱা নগ'ল" : "Article not found"}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {isAssamese
                  ? "আপুনি বিচৰা লেখাটো উপলব্ধ নহয়।"
                  : "The article you requested is unavailable."}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Button asChild>
                  <Link to={toLocalePath("/news", language)}>{isAssamese ? "খবৰ চাওক" : "Browse News"}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={toLocalePath("/prompt-packs", language)}>
                    {isAssamese ? "Prompt Packs" : "Prompt Packs"}
                  </Link>
                </Button>
              </div>
            </Card>
          ) : (
            <article className="mx-auto max-w-4xl">
              <Card className="platform-hero-card mb-5">
                <div className="relative z-10">
                  {article.article_categories?.name && (
                    <Badge variant="secondary" className="mb-3">
                      {article.article_categories.name}
                    </Badge>
                  )}
                  <h1 className="text-3xl font-poppins font-bold leading-tight sm:text-4xl">{article.title}</h1>
                  {article.excerpt && (
                    <p className="mt-3 text-base text-muted-foreground">{article.excerpt}</p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {article.author}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>

              {article.featured_image && (
                <div className="mb-5 overflow-hidden rounded-2xl border border-primary/15">
                  <img src={article.featured_image} alt={article.title} className="h-full max-h-[420px] w-full object-cover" />
                </div>
              )}

              <Card className="border-primary/15 bg-card/95">
                <CardContent className="p-5 sm:p-8">
                  <div className="prose prose-lg max-w-none whitespace-pre-wrap break-words text-foreground">
                    {article.content}
                  </div>
                </CardContent>
              </Card>
            </article>
          )}
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default Article;
