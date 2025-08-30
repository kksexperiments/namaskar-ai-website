import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Zap, ArrowLeft, Search, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Types for our data
interface Prompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

interface Category {
  id: string;
  name: string;
  created_at?: string;
}
const PromptPacks = () => {
  const {
    language,
    switchLanguage,
    t
  } = useLanguage();
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Fetch prompts from Supabase
  const { data: prompts = [], isLoading: promptsLoading, error: promptsError } = useQuery<Prompt[]>({
    queryKey: ['prompts'],
    queryFn: async (): Promise<Prompt[]> => {
      const { data, error } = await (supabase as any)
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Parse tags from JSON and ensure proper typing
      return (data || []).map((prompt: any) => ({
        id: prompt.id,
        title: prompt.title || '',
        prompt: prompt.prompt || '',
        category: prompt.category || '',
        tags: Array.isArray(prompt.tags) ? prompt.tags : [],
        created_at: prompt.created_at,
        updated_at: prompt.updated_at
      }));
    }
  });

  // Fetch categories from Supabase
  const { data: categoriesData = [], isLoading: categoriesLoading } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await (supabase as any)
        .from('categories')
        .select('name')
        .order('name');
      
      if (error) throw error;
      return (data || []).map((cat: any) => cat.name);
    }
  });

  const categories = ["all", ...categoriesData];

  // Get all unique tags from prompts
  const allTags = Array.from(new Set(prompts.flatMap(prompt => prompt.tags || [])));
  
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         prompt.prompt?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         prompt.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => prompt.tags?.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTags([]);
  };
  const copyToClipboard = async (text: string, title: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: `"${title}" prompt has been copied.`
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive"
      });
    }
  };
  const FilterSidebar = ({
    className = ""
  }: {
    className?: string;
  }) => (
    <Card className={`w-80 h-fit ${className}`}>
      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search prompts..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "all" || selectedTags.length > 0 || searchTerm) && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Active Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs h-auto p-1">
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="w-full justify-start text-sm"
              >
                {category === "all" ? "All Categories" : category}
                <span className="ml-auto text-xs text-muted-foreground">
                  {category === "all" ? prompts.length : prompts.filter(p => p.category === category).length}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-medium mb-3">Tags</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "ghost"}
                size="sm"
                onClick={() => toggleTag(tag)}
                className="w-full justify-start text-sm"
              >
                {tag}
                <span className="ml-auto text-xs text-muted-foreground">
                   {prompts.filter(p => p.tags?.includes(tag)).length}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
  return <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <Card className="absolute left-4 top-4 bottom-4 w-80 shadow-lg overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search prompts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== "all" || selectedTags.length > 0 || searchTerm) && <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Active Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs h-auto p-1">
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== "all" && <Badge variant="secondary" className="flex items-center gap-1">
                        {selectedCategory}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                      </Badge>}
                    {selectedTags.map(tag => <Badge key={tag} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTag(tag)} />
                      </Badge>)}
                  </div>
                </div>}

              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => <Button key={category} variant={selectedCategory === category ? "default" : "ghost"} size="sm" onClick={() => setSelectedCategory(category)} className="w-full justify-start text-sm">
                      {category === "all" ? "All Categories" : category}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {category === "all" ? prompts.length : prompts.filter(p => p.category === category).length}
                      </span>
                    </Button>)}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-medium mb-3">Tags</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allTags.map(tag => <Button key={tag} variant={selectedTags.includes(tag) ? "default" : "ghost"} size="sm" onClick={() => toggleTag(tag)} className="w-full justify-start text-sm">
                      {tag}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {prompts.filter(p => p.tags?.includes(tag)).length}
                      </span>
                    </Button>)}
                </div>
              </div>
            </div>
          </Card>
        </div>}

      <main className="w-full">
        <div className="pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="flex items-center justify-between mb-3">
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Centered Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-3xl font-poppins font-bold gradient-text">
                  AI Prompt Packs
                </h1>
              </div>
            </div>

            {/* Centered Container with Filter and Content */}
            <div className="flex justify-center">
              <div className="flex gap-6 w-full max-w-6xl">
                {/* Filter Section */}
                <FilterSidebar className="hidden lg:block flex-shrink-0" />
                
                {/* Prompts Content */}
                <div className="flex-1 min-w-0">
                  {/* Results Count */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
                      {selectedCategory !== "all" && ` in ${selectedCategory}`}
                    </p>
                  </div>

                  {/* Prompts List */}
                  <div className="space-y-4">
                    {promptsLoading ? (
                      <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                          <Card key={i} className="p-6">
                            <Skeleton className="h-4 w-1/4 mb-2" />
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-20 w-full" />
                          </Card>
                        ))}
                      </div>
                    ) : promptsError ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Failed to load prompts. Please try again.</p>
                      </div>
                    ) : filteredPrompts.length > 0 ? <Accordion type="single" collapsible className="space-y-4">
                        {filteredPrompts.map((prompt) => <AccordionItem key={prompt.id} value={`prompt-${prompt.id}`} className="border rounded-lg bg-gradient-card">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                              <div className="flex items-start justify-between w-full text-left">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="secondary" className="text-xs">
                                      {prompt.category}
                                    </Badge>
                                     {prompt.tags?.slice(0, 2).map(tag => <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>)}
                                  </div>
                                  <h3 className="text-lg font-medium font-poppins group-hover:text-primary transition-colors">
                                    {prompt.title}
                                  </h3>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                              <div className="space-y-4">
                                <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                                  <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap">
                                    {prompt.prompt}
                                  </p>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex gap-2 flex-wrap">
                                    {prompt.tags.map(tag => <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>)}
                                  </div>
                                  <Button onClick={() => copyToClipboard(prompt.prompt, prompt.title)} size="sm" className="flex items-center gap-2">
                                    <Copy className="w-4 h-4" />
                                    Copy Prompt
                                  </Button>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>)}
                      </Accordion> : <Card className="p-8 text-center bg-gradient-card">
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                            <Search className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">No prompts found</h3>
                            <p className="text-muted-foreground">
                              Try adjusting your search terms or filter settings
                            </p>
                          </div>
                        </div>
                      </Card>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>;
};
export default PromptPacks;