import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, ArrowLeft, Search, X, Menu, DollarSign, Users, Code, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Types for our data
interface Tool {
  Tool: string;
  "Starting Cost": string | null;
  Language: string | null;
  "Skill Level": string | null;
  "Use Cases": string | null;
  Category: string | null;
  "Affiliate Link": string | null;
}

const AITools = () => {
  const { language, switchLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [selectedCostType, setSelectedCostType] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch tools from Supabase
  const { data: tools = [], isLoading: toolsLoading, error: toolsError } = useQuery<Tool[]>({
    queryKey: ['tools'],
    queryFn: async (): Promise<Tool[]> => {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('Tool');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Get unique categories, skill levels, and cost types
  const categories = ["all", ...Array.from(new Set(tools.map(tool => tool.Category).filter(Boolean)))];
  const skillLevels = ["all", ...Array.from(new Set(tools.map(tool => tool["Skill Level"]).filter(Boolean)))];
  const costTypes = ["all", "Free", "Paid", "Freemium"];

  // Filter tools
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.Tool?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool["Use Cases"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.Category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.Category === selectedCategory;
    const matchesSkillLevel = selectedSkillLevel === "all" || tool["Skill Level"] === selectedSkillLevel;
    
    let matchesCostType = true;
    if (selectedCostType !== "all") {
      const cost = tool["Starting Cost"]?.toLowerCase() || "";
      if (selectedCostType === "Free") {
        matchesCostType = cost.includes("free") || cost === "0" || cost === "$0";
      } else if (selectedCostType === "Paid") {
        matchesCostType = !cost.includes("free") && cost !== "0" && cost !== "$0" && cost !== "";
      } else if (selectedCostType === "Freemium") {
        matchesCostType = cost.includes("freemium");
      }
    }
    
    return matchesSearch && matchesCategory && matchesSkillLevel && matchesCostType;
  });

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSkillLevel("all");
    setSelectedCostType("all");
  };

  const getCostTypeIcon = (cost: string | null) => {
    if (!cost) return <DollarSign className="w-4 h-4" />;
    const costLower = cost.toLowerCase();
    if (costLower.includes("free") || cost === "0" || cost === "$0") {
      return <div className="w-4 h-4 bg-green-500 rounded-full" />;
    }
    return <DollarSign className="w-4 h-4" />;
  };

  const getCostBadgeVariant = (cost: string | null) => {
    if (!cost) return "outline";
    const costLower = cost.toLowerCase();
    if (costLower.includes("free") || cost === "0" || cost === "$0") {
      return "secondary";
    }
    return "outline";
  };

  const FilterSidebar = ({ className = "" }: { className?: string }) => (
    <Card className={`w-80 h-fit ${className}`}>
      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search tools..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-10" 
            />
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "all" || selectedSkillLevel !== "all" || selectedCostType !== "all" || searchTerm) && (
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
              {selectedSkillLevel !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {selectedSkillLevel}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSkillLevel("all")} />
                </Badge>
              )}
              {selectedCostType !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {selectedCostType}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCostType("all")} />
                </Badge>
              )}
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
                  {category === "all" ? tools.length : tools.filter(t => t.Category === category).length}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Skill Levels */}
        <div>
          <h3 className="text-sm font-medium mb-3">Skill Level</h3>
          <div className="space-y-2">
            {skillLevels.map(level => (
              <Button
                key={level}
                variant={selectedSkillLevel === level ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedSkillLevel(level)}
                className="w-full justify-start text-sm"
              >
                {level === "all" ? "All Levels" : level}
                <span className="ml-auto text-xs text-muted-foreground">
                  {level === "all" ? tools.length : tools.filter(t => t["Skill Level"] === level).length}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Cost Types */}
        <div>
          <h3 className="text-sm font-medium mb-3">Pricing</h3>
          <div className="space-y-2">
            {costTypes.map(costType => (
              <Button
                key={costType}
                variant={selectedCostType === costType ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCostType(costType)}
                className="w-full justify-start text-sm"
              >
                {costType === "all" ? "All Pricing" : costType}
                <span className="ml-auto text-xs text-muted-foreground">
                  {costType === "all" ? tools.length : 
                   costType === "Free" ? tools.filter(t => {
                     const cost = t["Starting Cost"]?.toLowerCase() || "";
                     return cost.includes("free") || cost === "0" || cost === "$0";
                   }).length :
                   costType === "Paid" ? tools.filter(t => {
                     const cost = t["Starting Cost"]?.toLowerCase() || "";
                     return !cost.includes("free") && cost !== "0" && cost !== "$0" && cost !== "";
                   }).length :
                   tools.filter(t => t["Starting Cost"]?.toLowerCase().includes("freemium")).length}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <Card className="absolute left-4 top-4 bottom-4 w-80 shadow-lg overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <FilterSidebar />
          </Card>
        </div>
      )}

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
                  AI Tools Directory
                </h1>
              </div>
            </div>

            {/* Centered Container with Filter and Content */}
            <div className="flex justify-center">
              <div className="flex gap-6 w-full max-w-6xl">
                {/* Filter Section */}
                <FilterSidebar className="hidden lg:block flex-shrink-0" />
                
                {/* Tools Content */}
                <div className="flex-1 min-w-0">
                  {/* Results Count */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
                      {selectedCategory !== "all" && ` in ${selectedCategory}`}
                    </p>
                  </div>

                  {/* Tools List */}
                  <div className="space-y-4">
                    {toolsLoading ? (
                      <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                          <Card key={i} className="p-6">
                            <Skeleton className="h-4 w-1/4 mb-2" />
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-20 w-full" />
                          </Card>
                        ))}
                      </div>
                    ) : toolsError ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Failed to load tools. Please try again.</p>
                      </div>
                    ) : filteredTools.length > 0 ? (
                      <div className="grid gap-4">
                        {filteredTools.map((tool, index) => (
                          <Card key={index} className="p-6 bg-gradient-card hover:shadow-elegant transition-all duration-300 border border-border/50">
                            <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {tool.Category && (
                                      <Badge variant="secondary" className="text-xs">
                                        {tool.Category}
                                      </Badge>
                                    )}
                                    {tool["Starting Cost"] && (
                                      <Badge variant={getCostBadgeVariant(tool["Starting Cost"])} className="text-xs flex items-center gap-1">
                                        {getCostTypeIcon(tool["Starting Cost"])}
                                        {tool["Starting Cost"]}
                                      </Badge>
                                    )}
                                    {tool["Skill Level"] && (
                                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {tool["Skill Level"]}
                                      </Badge>
                                    )}
                                  </div>
                                  <h3 className="text-lg font-medium font-poppins">
                                    {tool.Tool}
                                  </h3>
                                  {tool["Use Cases"] && (
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                      {tool["Use Cases"]}
                                    </p>
                                  )}
                                  {tool.Language && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Code className="w-3 h-3" />
                                      <span>Language: {tool.Language}</span>
                                    </div>
                                  )}
                                </div>
                                {tool["Affiliate Link"] && (
                                  <Button 
                                    asChild 
                                    size="sm"
                                    className="flex items-center gap-2 ml-4"
                                  >
                                    <a 
                                      href={tool["Affiliate Link"]} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      Visit Tool
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="p-8 text-center bg-gradient-card">
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                            <Search className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">No tools found</h3>
                            <p className="text-muted-foreground">
                              Try adjusting your search terms or filter settings
                            </p>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default AITools;