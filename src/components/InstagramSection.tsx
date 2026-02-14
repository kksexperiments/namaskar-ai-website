import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { InstagramEmbed } from "react-social-media-embed";
import { Content } from "@/types/language";
interface InstagramSectionProps {
  t: Content;
}
const InstagramSection = ({
  t
}: InstagramSectionProps) => {
  const handleInstagramClick = () => {
    window.open('https://instagram.com/namaskar.ai', '_blank');
  };
  const isAssamese = t.instagram.headline.includes("পোষ্ট");

  // Instagram post URLs
  const instagramPosts = ["https://www.instagram.com/reel/DN8GK1KDZBI/", "https://www.instagram.com/reel/DNuSp0jWDWL/", "https://www.instagram.com/reel/DNmnzV2NfdI/"];
  return <section className="py-20 bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <Instagram className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
              {t.instagram.headline}
            </h2>
          </div>
          <p className="text-muted-foreground">{t.instagram.description}</p>
        </div>

        {/* Instagram Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {instagramPosts.map((postUrl, index) => <div key={index} className="flex justify-center">
              <div className="w-full max-w-sm mx-auto">
                <div className="relative w-full" style={{ maxWidth: '326px' }}>
                  <InstagramEmbed url={postUrl} width="100%" placeholderDisabled={false} />
                </div>
              </div>
            </div>)}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button onClick={handleInstagramClick} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 min-h-[44px] w-full sm:w-auto">
            <Instagram className="mr-2 w-5 h-5" />
            <span className="text-sm sm:text-base">{t.instagram.button}</span>
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4 px-4">
            {isAssamese
              ? "২৫,০০০+ অনুসৰণকাৰীৰ সৈতে দৈনিক AI insight আৰু practical tutorial লাভ কৰক"
              : "Join 25,000+ followers getting daily AI insights and practical tutorials"}
          </p>
        </div>
      </div>
    </section>;
};
export default InstagramSection;
