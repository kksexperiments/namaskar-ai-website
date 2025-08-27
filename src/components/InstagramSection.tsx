import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Play, ExternalLink, Eye } from "lucide-react";

interface InstagramSectionProps {
  t: any;
}

const InstagramSection = ({ t }: InstagramSectionProps) => {
  const handleInstagramClick = () => {
    window.open('https://instagram.com/namaskar.ai', '_blank');
  };

  // Mock Instagram reel data
  const reels = [
    { id: 1, title: "AI Prompt Engineering Basics", views: "12K", thumbnail: "🤖" },
    { id: 2, title: "ChatGPT Tips & Tricks", views: "8.5K", thumbnail: "💡" },
    { id: 3, title: "AI Tools for Productivity", views: "15K", thumbnail: "⚡" },
    { id: 4, title: "Future of AI in 2024", views: "9.2K", thumbnail: "🚀" },
    { id: 5, title: "AI Ethics Discussion", views: "6.8K", thumbnail: "🧠" },
    { id: 6, title: "Build Your First AI Project", views: "11K", thumbnail: "🔨" },
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
            {t.instagram.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.instagram.description}
          </p>
        </div>

        {/* Instagram Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {reels.map((reel, index) => (
            <Card 
              key={reel.id}
              className="aspect-[9/16] bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={handleInstagramClick}
            >
              <div className="relative h-full p-4 flex flex-col justify-between">
                {/* Thumbnail/Emoji */}
                <div className="text-4xl text-center mt-4">
                  {reel.thumbnail}
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium line-clamp-2 text-center">
                    {reel.title}
                  </h4>
                  <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    <span>{reel.views}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleInstagramClick}
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white font-medium px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <Instagram className="mr-2 w-5 h-5" />
            {t.instagram.button}
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Join 10K+ followers getting daily AI insights
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;