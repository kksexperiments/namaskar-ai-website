import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PromptPacks = () => {
  const { language, switchLanguage, t } = useLanguage();

  const promptPacks = [
    {
      title: "Content Creation Prompts",
      description: "50+ prompts for blog posts, social media, and marketing content",
      category: "Content",
      prompts: 52
    },
    {
      title: "Coding Assistant Prompts", 
      description: "Advanced prompts for code review, debugging, and optimization",
      category: "Development",
      prompts: 38
    },
    {
      title: "Data Analysis Prompts",
      description: "Prompts for data interpretation, visualization, and insights",
      category: "Analytics",
      prompts: 25
    },
    {
      title: "Creative Writing Prompts",
      description: "Storytelling, copywriting, and creative content prompts",
      category: "Creative",
      prompts: 41
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
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-poppins font-bold gradient-text">
              AI Prompt Packs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready-to-use prompt collections for different use cases. Copy, customize, and enhance your AI interactions.
            </p>
          </div>

          {/* Prompt Packs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promptPacks.map((pack, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full w-fit">
                        {pack.category}
                      </div>
                      <h3 className="text-lg font-poppins font-semibold group-hover:text-primary transition-colors">
                        {pack.title}
                      </h3>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {pack.prompts} prompts
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pack.description}
                  </p>

                  {/* CTA */}
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Pack
                  </Button>
                </div>
              </Card>
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

export default PromptPacks;