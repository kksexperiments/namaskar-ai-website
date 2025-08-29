import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, FileText, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

const AITools = () => {
  const { language, switchLanguage, t } = useLanguage();

  const toolCategories = [
    {
      category: "Content Creation",
      tools: [
        { name: "ChatGPT", description: "Conversational AI for writing and brainstorming", rating: 4.8, free: true },
        { name: "Jasper", description: "AI copywriting and content generation", rating: 4.6, free: false },
        { name: "Copy.ai", description: "Marketing copy and content creation", rating: 4.5, free: true }
      ]
    },
    {
      category: "Code & Development", 
      tools: [
        { name: "GitHub Copilot", description: "AI pair programmer for code completion", rating: 4.7, free: false },
        { name: "Tabnine", description: "AI code completion and suggestions", rating: 4.4, free: true },
        { name: "Replit Ghostwriter", description: "AI coding assistant in browser", rating: 4.3, free: true }
      ]
    },
    {
      category: "Design & Visual",
      tools: [
        { name: "Midjourney", description: "AI image generation from text prompts", rating: 4.9, free: false },
        { name: "DALL-E 2", description: "OpenAI's image generation model", rating: 4.6, free: true },
        { name: "Figma AI", description: "Design assistance and automation", rating: 4.2, free: true }
      ]
    }
  ];

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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-poppins font-bold gradient-text">
              AI Tools Directory
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Curated collection of the best AI tools for different use cases. Find the perfect tool for your needs.
            </p>
          </div>

          {/* Tools by Category */}
          <div className="space-y-12">
            {toolCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h2 className="text-2xl font-poppins font-semibold gradient-text">
                  {category.category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <Card 
                      key={toolIndex}
                      className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer"
                    >
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-lg font-poppins font-semibold group-hover:text-primary transition-colors">
                              {tool.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-muted-foreground">{tool.rating}</span>
                              </div>
                              <div className={`text-xs px-2 py-1 rounded-full ${tool.free ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                {tool.free ? 'Free' : 'Paid'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tool.description}
                        </p>

                        {/* CTA */}
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Tool
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
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

export default AITools;