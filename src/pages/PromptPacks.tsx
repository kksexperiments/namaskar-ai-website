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
  const { language, switchLanguage, t } = useLanguage();
  const { toast } = useToast();
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
    },
    {
      title: "Social Media Caption Creator",
      prompt: "Write an engaging social media caption for [PLATFORM] about [TOPIC]. Include: relevant hashtags, call-to-action, and emoji. Keep it under [CHARACTER_LIMIT] characters. Tone should be [TONE].",
      category: "Content",
      tags: ["social media", "captions", "marketing"]
    },
    {
      title: "Email Subject Line Generator",
      prompt: "Generate 10 compelling email subject lines for [EMAIL_TYPE] about [TOPIC]. Focus on [GOAL] and target audience [AUDIENCE]. Include: urgency, personalization, and curiosity-driving elements.",
      category: "Content",
      tags: ["email", "marketing", "subject lines"]
    },
    {
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
    },
    {
      title: "API Documentation Generator",
      prompt: "Create comprehensive API documentation for [ENDPOINT_NAME]. Include: endpoint URL, HTTP methods, request/response examples, parameters, error codes, and usage examples in [LANGUAGE].",
      category: "Development",
      tags: ["api", "documentation", "backend"]
    },
    {
      title: "Bug Report Analyzer",
      prompt: "Analyze this bug report: [BUG_DESCRIPTION]. Provide: 1) Root cause analysis, 2) Step-by-step debugging approach, 3) Potential fixes, 4) Prevention strategies. Focus on [TECHNOLOGY_STACK].",
      category: "Development",
      tags: ["debugging", "bugs", "troubleshooting"]
    },
    {
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
    },
    {
      title: "Statistical Analysis Guide",
      prompt: "Perform statistical analysis on [DATA_DESCRIPTION]. Research question: [QUESTION]. Suggest appropriate tests, interpret results, and provide actionable insights. Consider [CONSTRAINTS].",
      category: "Analytics",
      tags: ["statistics", "analysis", "insights"]
    },
    {
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
    },
    {
      title: "Character Development Assistant",
      prompt: "Develop a complex character for [STORY_TYPE]. Include: background, personality traits, motivations, flaws, relationships, and character arc. Make them relatable to [TARGET_AUDIENCE].",
      category: "Creative",
      tags: ["character", "development", "writing"]
    },
    {
      title: "Creative Ad Copy Generator",
      prompt: "Write creative advertising copy for [PRODUCT/SERVICE]. Target audience: [AUDIENCE]. Include: headline, body copy, and call-to-action. Tone: [TONE]. Focus on [UNIQUE_BENEFIT].",
      category: "Creative",
      tags: ["advertising", "copywriting", "marketing"]
    }
  ];

  const categories = ["all", "Content", "Development", "Analytics", "Creative"];
  
  // Get all unique tags from prompts
  const allTags = Array.from(new Set(prompts.flatMap(prompt => prompt.tags)));

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => prompt.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
        description: `"${title}" prompt has been copied.`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const FilterSidebar = ({ className = "" }: { className?: string }) => (
    <div className={`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="p-4 space-y-6">
        {/* Search */}
        <div>
          <Input
            placeholder="Search any keyword, topic or tag"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "all" || selectedTags.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">Active Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs h-6 px-2"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  {selectedCategory}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCategory("all")}
                  />
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs flex items-center gap-1">
                  {tag}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => toggleTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Filter by Category */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Filter by category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-foreground">
                  {category === "all" ? "All Categories" : category}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  ({category === "all" 
                    ? prompts.length 
                    : prompts.filter(p => p.category === category).length
                  })
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Tags */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Filter by tag</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allTags.map((tag) => (
              <label key={tag} className="flex items-center space-x-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-foreground capitalize">{tag}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  ({prompts.filter(p => p.tags.includes(tag)).length})
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <FilterSidebar className="hidden lg:block w-72 border-r" />
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-80 bg-background border-r shadow-lg">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        <main className="flex-1 min-h-screen">
          <div className="p-6">
            {/* Header with mobile filter trigger */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Link 
                  to="/" 
                  className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">LLM Prompts</h1>
              <p className="text-muted-foreground mb-4">
                A library of ready-to-use prompts for ChatGPT and other language models. They'll help you write better, solve problems faster, and get more done.
              </p>
              <p className="text-sm text-muted-foreground">
                Not sure where to start? Try filtering by tag for 'Staff Pick' or 'Popular' to find our favorites.
              </p>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Prompts Grid */}
            <div className="space-y-4">
              {filteredPrompts.length > 0 ? (
                filteredPrompts.map((prompt, index) => (
                  <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        <Badge 
                          variant="secondary" 
                          className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                        >
                          {prompt.category}
                        </Badge>
                        {prompt.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground">
                        {prompt.title}
                      </h3>

                      {/* Description/Preview */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {prompt.prompt.length > 200 
                          ? `${prompt.prompt.substring(0, 200)}...` 
                          : prompt.prompt
                        }
                      </p>

                      {/* Action Button */}
                      <div className="flex justify-end">
                        <Button
                          onClick={() => copyToClipboard(prompt.prompt, prompt.title)}
                          size="sm"
                          className="bg-black text-white hover:bg-gray-800 rounded-md"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
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
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />
    </div>
  );
};

export default PromptPacks;