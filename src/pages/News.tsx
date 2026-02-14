import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Newspaper, Search, User, Wrench } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  category_id: string | null;
  author: string;
  published_at: string | null;
  slug: string;
  article_categories?: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

interface LocalGuide {
  title: { en: string; as: string };
  description: { en: string; as: string };
  path: string;
  tag: { en: string; as: string };
}

const FALLBACK_GUIDES: LocalGuide[] = [
  {
    title: {
      en: "10-minute daily AI habit for beginners",
      as: "নতুনসকলৰ বাবে ১০ মিনিটৰ দৈনিক AI অভ্যাস",
    },
    description: {
      en: "Start with one prompt, one output, one review. Build confidence in Assamese-first workflows.",
      as: "এটা prompt, এটা output, আৰু এটা review-ৰে আৰম্ভ কৰক। অসমীয়া-first workflow-ত আত্মবিশ্বাস গঢ়ি তোলক।",
    },
    path: "/prompt-packs?category=study_and_skills",
    tag: { en: "Beginner", as: "Beginner" },
  },
  {
    title: {
      en: "How small businesses in Assam can use AI today",
      as: "অসমৰ small business-এ আজিৰে AI কেনেকৈ ব্যৱহাৰ কৰিব",
    },
    description: {
      en: "Use AI for customer replies, offer messaging, and product promotion with low data usage.",
      as: "কম data খৰচত customer reply, offer messaging আৰু product promotion-ৰ বাবে AI ব্যৱহাৰ কৰক।",
    },
    path: "/prompt-packs?category=business_and_income",
    tag: { en: "Business", as: "Business" },
  },
  {
    title: {
      en: "Parents’ guide: safe AI rules at home",
      as: "অভিভাৱক গাইড: ঘৰত সুৰক্ষিত AI নিয়ম",
    },
    description: {
      en: "Create practical family AI rules to protect children and improve learning outcomes.",
      as: "শিশুৰ সুৰক্ষা আৰু ভাল শিক্ষাৰ ফলৰ বাবে practical family AI rules সাজি লওক।",
    },
    path: "/prompt-packs?category=parents_and_family",
    tag: { en: "Family", as: "পৰিয়াল" },
  },
];

const News = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        title,
        content,
        excerpt,
        featured_image,
        category_id,
        author,
        published_at,
        slug,
        article_categories (name)
      `,
      )
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching articles:", error);
      setLoadError(
        isAssamese
          ? "এই মুহূৰ্তত খবৰ লোড কৰিব পৰা নগ'ল।"
          : "We couldn't load news right now.",
      );
      return;
    }

    setArticles((data || []) as Article[]);
  }, [isAssamese]);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase.from("article_categories").select("id, name").order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    setCategories((data || []) as Category[]);
  }, []);

  const loadNewsPageData = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    await Promise.all([fetchArticles(), fetchCategories()]);
    setLoading(false);
  }, [fetchArticles, fetchCategories]);

  useEffect(() => {
    void loadNewsPageData();
  }, [loadNewsPageData]);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesSearch =
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || article.category_id === selectedCategory;
        return Boolean(matchesSearch && matchesCategory);
      }),
    [articles, searchTerm, selectedCategory],
  );

  const text = {
    title: isAssamese ? "AI খবৰ আৰু গাইড" : "AI News and Guides",
    subtitle: isAssamese
      ? "খবৰ, practical explainers আৰু Assamese audience-ৰ বাবে usable insights"
      : "Latest updates, practical explainers, and usable insights for Assamese learners.",
    back: isAssamese ? "পিছলৈ" : "Back",
    search: isAssamese ? "খবৰ সন্ধান কৰক..." : "Search articles...",
    allCategories: isAssamese ? "সকলো শ্ৰেণী" : "All Categories",
    noArticlesTitle: isAssamese ? "কোনো article পোৱা নগ'ল" : "No articles found",
    noArticlesBody: isAssamese ? "অনুগ্ৰহ কৰি search/filter সলনি কৰক।" : "Try adjusting search or filters.",
    readMore: isAssamese ? "অধিক পঢ়ক" : "Read More",
    retry: isAssamese ? "পুনৰ চেষ্টা কৰক" : "Retry",
    fallbackTitle: isAssamese ? "লোকেল learning guides" : "Local learning guides",
    fallbackBody: isAssamese
      ? "যেতিয়া live news নাথাকে, তেতিয়া practical guide-ৰ পৰা শিকিবলৈ আৰম্ভ কৰক।"
      : "When live news is unavailable, start learning from practical guide cards.",
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "AI খবৰ | নমস্কাৰ AI" : "AI News | Namaskar AI"}
        description={
          isAssamese
            ? "AI-ৰ শেহতীয়া খবৰ, Assamese explainers, আৰু practical learning guides একেলগে পাব।"
            : "Read AI news, Assamese-friendly explainers, and practical learning guides in one place."
        }
        path={toLocalePath("/news", language)}
        language={language}
        keywords={[
          "AI news Assam",
          "Assamese AI updates",
          "AI explainers Assamese",
          "Namaskar AI news",
        ]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell">
          <Link
            to={toLocalePath("/", language)}
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {text.back}
          </Link>

          <Card className="platform-hero-card mb-6">
            <div className="relative z-10">
              <div className="platform-chip mb-2">
                <Newspaper className="mr-1.5 h-3.5 w-3.5" />
                {text.title}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">{text.title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">{text.subtitle}</p>
            </div>
          </Card>

          {loadError && (
            <Card className="mb-5 border-destructive/30">
              <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">{loadError}</p>
                <Button variant="outline" onClick={() => void loadNewsPageData()}>
                  {text.retry}
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="mb-5 border-primary/15 bg-card/95 p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={text.search}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="border-primary/20 pl-10"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">{text.allCategories}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={`news-skeleton-${index}`} className="p-5">
                  <Skeleton className="mb-3 h-5 w-4/5" />
                  <Skeleton className="mb-2 h-4 w-2/3" />
                  <Skeleton className="h-20 w-full" />
                </Card>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden border-primary/15 bg-[linear-gradient(150deg,hsl(var(--card)),hsl(var(--accent)/0.09),hsl(var(--primary)/0.06))] transition hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <div className="aspect-video overflow-hidden">
                    {article.featured_image ? (
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted/60">
                        <Newspaper className="h-10 w-10 text-primary/70" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      {article.article_categories?.name && <Badge variant="secondary">{article.article_categories.name}</Badge>}
                    </div>

                    <h2 className="line-clamp-2 text-lg font-semibold">{article.title}</h2>
                    {article.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {article.author}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(article.published_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <Button asChild variant="outline" className="mt-4 w-full">
                      <Link to={toLocalePath(`/article/${article.slug}`, language)}>
                        {text.readMore}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <Card className="p-8 text-center">
                <h3 className="text-lg font-semibold">{text.noArticlesTitle}</h3>
                <p className="text-sm text-muted-foreground">{text.noArticlesBody}</p>
              </Card>

              <Card className="border-primary/20 bg-card/95 p-5">
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <Wrench className="h-4 w-4" />
                  <h3 className="text-base font-semibold">{text.fallbackTitle}</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{text.fallbackBody}</p>

                <div className="grid gap-3 md:grid-cols-3">
                  {FALLBACK_GUIDES.map((guide) => (
                    <Card key={guide.path} className="border-primary/15 p-4">
                      <Badge variant="outline" className="mb-2">
                        {guide.tag[language]}
                      </Badge>
                      <h4 className="text-sm font-semibold leading-snug">{guide.title[language]}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{guide.description[language]}</p>
                      <Button asChild variant="ghost" className="mt-3 px-0 text-primary hover:text-primary">
                        <Link to={toLocalePath(guide.path, language)}>
                          {text.readMore}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default News;
