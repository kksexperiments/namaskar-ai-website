import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, TrendingUp, Zap, Brain, Sparkles, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsSectionProps {
  t: any;
}

const NewsSection = ({ t }: NewsSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: t.newsletter?.error || "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: t.newsletter?.success || "Successfully subscribed to newsletter!",
    });
    
    setEmail("");
    setIsLoading(false);
  };
  const newsItems = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "GPT-4 Turbo Gets Major Performance Boost",
      description: "OpenAI releases significant improvements to response speed and accuracy, making it 40% faster than previous versions.",
      date: "2 hours ago",
      category: "AI Models",
      readTime: "3 min read",
      trending: true
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Google Unveils Gemini Ultra 1.5",
      description: "New multimodal capabilities allow processing of 1 million tokens, revolutionizing long-form content analysis.",
      date: "6 hours ago", 
      category: "Innovation",
      readTime: "5 min read",
      trending: true
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "AI-Generated Content Reaches New Milestone",
      description: "Studies show 35% increase in AI content creation across industries, with video generation leading the surge.",
      date: "12 hours ago",
      category: "Industry News",
      readTime: "4 min read",
      trending: false
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Anthropic Claude 3 Opus Performance Analysis",
      description: "Independent benchmarks reveal Claude 3 Opus outperforming competitors in reasoning and safety metrics.",
      date: "1 day ago",
      category: "Analysis",
      readTime: "6 min read",
      trending: false
    }
  ];

  return (
    <section id="news" className="py-20 bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
              {t.news.headline}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.news.description}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {newsItems.slice(0, 2).map((item, index) => (
            <Card 
              key={index}
              className={`p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group cursor-pointer ${
                index < 2 ? 'lg:col-span-1' : 'lg:col-span-1'
              } block`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.trending ? 'bg-gradient-primary' : 'bg-muted'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <div className={item.trending ? 'text-white' : 'text-muted-foreground'}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.trending 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {item.trending && (
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-poppins font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-primary hover:text-primary-foreground hover:bg-primary p-0 w-8 h-8 rounded-full group-hover:translate-x-1 transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Hidden news items on mobile, shown on desktop */}
          {newsItems.slice(2).map((item, index) => (
            <Card 
              key={index + 2}
              className={`p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group cursor-pointer ${
                index + 2 < 4 ? 'lg:col-span-1' : 'lg:col-span-1'
              } hidden lg:block`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.trending ? 'bg-gradient-primary' : 'bg-muted'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <div className={item.trending ? 'text-white' : 'text-muted-foreground'}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.trending 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {item.trending && (
                    <div className="flex items-center space-x-1 text-xs text-primary">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-poppins font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-primary hover:text-primary-foreground hover:bg-primary p-0 w-8 h-8 rounded-full group-hover:translate-x-1 transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-6 py-3 rounded-xl group"
          >
            View All News
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Newsletter Subscription Band - Full Width at Bottom */}
      <div className="bg-gradient-to-r from-amber-900 to-yellow-800 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 text-white">
              <Mail className="w-5 h-5 text-amber-200" />
              <span className="text-lg font-medium">Stay updated with AI news:</span>
            </div>
            <div className="flex gap-3 flex-1 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-10 bg-white/10 border-amber-700 text-white placeholder:text-amber-200"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10"
              >
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;