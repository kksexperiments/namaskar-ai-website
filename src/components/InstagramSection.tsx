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

  // Real Instagram reel data
  const reels = [
    { id: 1, title: "Waymo's Revolutionary AI Technology", views: "12K", thumbnail: "🚗", url: "https://www.instagram.com/namaskar.ai/reel/DNLbbJAtmuH/" },
    { id: 2, title: "ELI10 Prompt Technique Explained", views: "8.5K", thumbnail: "🧒", url: "https://www.instagram.com/namaskar.ai/reel/DMwZ-LHMXuT/" },
    { id: 3, title: "ChatGPT Study & Learn Feature", views: "15K", thumbnail: "📚", url: "https://www.instagram.com/namaskar.ai/reel/DM_7VJCMzqJ/" },
    { id: 4, title: "New ChatGPT Features Update", views: "9.2K", thumbnail: "✨", url: "https://www.instagram.com/namaskar.ai/reel/DNuSp0jWDWL/" },
    { id: 5, title: "Essential AI Tools You Need", views: "6.8K", thumbnail: "🛠️", url: "https://www.instagram.com/namaskar.ai/reel/DNmnzV2NfdI/" },
    { id: 6, title: "ChatGPT-5: What to Expect", views: "11K", thumbnail: "🚀", url: "https://www.instagram.com/namaskar.ai/reel/DNkAPTcM9JE/" },
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
              onClick={() => window.open(reel.url, '_blank')}
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
              Join 5K+ followers getting daily AI insights and practical tutorials
            </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;