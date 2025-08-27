import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface InstagramSectionProps {
  t: any;
}

const InstagramSection = ({ t }: InstagramSectionProps) => {
  const handleInstagramClick = () => {
    window.open('https://instagram.com/namaskar.ai', '_blank');
  };

  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

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

        {/* Instagram Embeds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Waymo Reel */}
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/reel/DNLbbJAtmuH/?utm_source=ig_embed&utm_campaign=loading" 
                data-instgrm-version="14" 
                style={{ 
                  background: 'transparent', 
                  border: 0, 
                  borderRadius: 0, 
                  boxShadow: 'none', 
                  margin: 0, 
                  maxWidth: '320px', 
                  minWidth: '270px', 
                  padding: 0, 
                  width: '100%' 
                }}
              ></blockquote>
            </div>
          </div>
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