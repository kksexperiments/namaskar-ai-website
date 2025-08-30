import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Copy, Zap, ArrowLeft, Search, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
  const prompts = [
  // Content Creation Prompts
  {
    title: "Blog Post Outline Generator",
    prompt: "Create a comprehensive blog post outline for the topic '[TOPIC]'. Include: 1) An attention-grabbing headline, 2) Introduction hook, 3) 5-7 main sections with subpoints, 4) Conclusion with call-to-action. Target audience: [AUDIENCE]. Tone: [TONE].",
    category: "Content",
    tags: ["blog", "writing", "outline"]
  }, {
    title: "Social Media Caption Creator",
    prompt: "Write an engaging social media caption for [PLATFORM] about [TOPIC]. Include: relevant hashtags, call-to-action, and emoji. Keep it under [CHARACTER_LIMIT] characters. Tone should be [TONE].",
    category: "Content",
    tags: ["social media", "captions", "marketing"]
  }, {
    title: "Email Subject Line Generator",
    prompt: "Generate 10 compelling email subject lines for [EMAIL_TYPE] about [TOPIC]. Focus on [GOAL] and target audience [AUDIENCE]. Include: urgency, personalization, and curiosity-driving elements.",
    category: "Content",
    tags: ["email", "marketing", "subject lines"]
  }, {
    title: "Product Description Writer",
    prompt: "Write a compelling product description for [PRODUCT_NAME]. Include: key features, benefits, target audience, and unique selling points. Use persuasive language that converts browsers into buyers. Word count: [WORDS].",
    category: "Content",
    tags: ["product", "ecommerce", "description"]
  },
  // Development Prompts
  {
    title: "Code Review Assistant",
    prompt: "Review this code for [LANGUAGE]: [CODE]. Analyze for: 1) Code quality and readability, 2) Performance optimizations, 3) Security vulnerabilities, 4) Best practices adherence, 5) Potential bugs. Provide specific suggestions for improvement.",
    category: "Development",
    tags: ["code review", "debugging", "optimization"]
  }, {
    title: "API Documentation Generator",
    prompt: "Create comprehensive API documentation for [ENDPOINT_NAME]. Include: endpoint URL, HTTP methods, request/response examples, parameters, error codes, and usage examples in [LANGUAGE].",
    category: "Development",
    tags: ["api", "documentation", "backend"]
  }, {
    title: "Bug Report Analyzer",
    prompt: "Analyze this bug report: [BUG_DESCRIPTION]. Provide: 1) Root cause analysis, 2) Step-by-step debugging approach, 3) Potential fixes, 4) Prevention strategies. Focus on [TECHNOLOGY_STACK].",
    category: "Development",
    tags: ["debugging", "bugs", "troubleshooting"]
  }, {
    title: "Database Query Optimizer",
    prompt: "Optimize this [DATABASE_TYPE] query: [QUERY]. Analyze performance bottlenecks, suggest indexing strategies, and provide an improved version. Explain the optimizations made.",
    category: "Development",
    tags: ["database", "sql", "optimization"]
  },
  // Data Analysis Prompts
  {
    title: "Data Visualization Recommender",
    prompt: "I have a dataset with [DESCRIBE_DATA]. Recommend the best visualization types for [ANALYSIS_GOAL]. Provide: chart types, key insights to highlight, and design considerations for [AUDIENCE].",
    category: "Analytics",
    tags: ["visualization", "charts", "insights"]
  }, {
    title: "Statistical Analysis Guide",
    prompt: "Perform statistical analysis on [DATA_DESCRIPTION]. Research question: [QUESTION]. Suggest appropriate tests, interpret results, and provide actionable insights. Consider [CONSTRAINTS].",
    category: "Analytics",
    tags: ["statistics", "analysis", "insights"]
  }, {
    title: "KPI Dashboard Creator",
    prompt: "Design a KPI dashboard for [BUSINESS_TYPE]. Include: key metrics to track, visualization types, update frequency, and target audience considerations. Focus on [BUSINESS_GOALS].",
    category: "Analytics",
    tags: ["kpi", "dashboard", "metrics"]
  },
  // Creative Writing Prompts
  {
    title: "Story Plot Generator",
    prompt: "Create a compelling story plot in the [GENRE] genre. Include: protagonist with clear motivation, central conflict, plot twists, and satisfying resolution. Setting: [SETTING]. Theme: [THEME].",
    category: "Creative",
    tags: ["story", "plot", "fiction"]
  }, {
    title: "Character Development Assistant",
    prompt: "Develop a complex character for [STORY_TYPE]. Include: background, personality traits, motivations, flaws, relationships, and character arc. Make them relatable to [TARGET_AUDIENCE].",
    category: "Creative",
    tags: ["character", "development", "writing"]
  }, {
    title: "Creative Ad Copy Generator",
    prompt: "Write creative advertising copy for [PRODUCT/SERVICE]. Target audience: [AUDIENCE]. Include: headline, body copy, and call-to-action. Tone: [TONE]. Focus on [UNIQUE_BENEFIT].",
    category: "Creative",
    tags: ["advertising", "copywriting", "marketing"]
  }];
  const categories = ["all", "Content", "Development", "Analytics", "Creative"];

  // Get all unique tags from prompts
  const allTags = Array.from(new Set(prompts.flatMap(prompt => prompt.tags)));
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) || prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) || prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => prompt.tags.includes(tag));
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
  }) => <Card className={`w-80 h-fit ${className}`}>
      
    </Card>;
  return <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      {/* Desktop Sidebar */}
      <FilterSidebar className="hidden lg:block" />
      
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
                        {prompts.filter(p => p.tags.includes(tag)).length}
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
                    {filteredPrompts.length > 0 ? <Accordion type="single" collapsible className="space-y-4">
                        {filteredPrompts.map((prompt, index) => <AccordionItem key={index} value={`prompt-${index}`} className="border rounded-lg bg-gradient-card">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                              <div className="flex items-start justify-between w-full text-left">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="secondary" className="text-xs">
                                      {prompt.category}
                                    </Badge>
                                    {prompt.tags.slice(0, 2).map(tag => <Badge key={tag} variant="outline" className="text-xs">
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