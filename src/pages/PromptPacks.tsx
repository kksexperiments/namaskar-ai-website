import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Copy, Zap, ArrowLeft, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const PromptPacks = () => {
  const { language, switchLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />

      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-poppins font-bold gradient-text">
              AI Prompt Packs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready-to-use prompt collections for different use cases. Copy, customize, and enhance your AI interactions.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search prompts, titles, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Prompts List */}
          <div className="space-y-4">
            {filteredPrompts.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredPrompts.map((prompt, index) => (
                  <AccordionItem
                    key={index}
                    value={`prompt-${index}`}
                    className="border rounded-lg bg-gradient-card"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-start justify-between w-full text-left">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                              {prompt.category}
                            </Badge>
                            {prompt.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
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
                            {prompt.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            onClick={() => copyToClipboard(prompt.prompt, prompt.title)}
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copy Prompt
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card className="p-8 text-center bg-gradient-card">
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

      <Footer
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />
    </div>
  );
};

export default PromptPacks;