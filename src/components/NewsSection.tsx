import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, TrendingUp, Zap, Brain, Sparkles } from "lucide-react";

interface NewsSectionProps {
  t: any;
}

const NewsSection = ({ t }: NewsSectionProps) => {
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
    <section className="py-20 bg-gradient-to-b from-rose-100 to-pink-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
              {t.news.headline}
            </h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.news.description}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {newsItems.map((item, index) => (
            <Card 
              key={index}
              className={`p-6 bg-white/70 border border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group cursor-pointer ${
                index < 2 ? 'lg:col-span-1' : 'lg:col-span-1'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.trending ? 'bg-gradient-primary' : 'bg-rose-200'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <div className={item.trending ? 'text-white' : 'text-slate-600'}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.trending 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-rose-100 text-rose-700'
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
                  <h3 className="text-lg font-poppins font-semibold text-slate-800 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-rose-200">
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
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
        <div className="text-center">
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
    </section>
  );
};

export default NewsSection;