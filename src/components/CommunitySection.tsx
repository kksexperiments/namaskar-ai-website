import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Users, Send, ExternalLink } from "lucide-react";

interface CommunitySectionProps {
  t: any;
}

const CommunitySection = ({ t }: CommunitySectionProps) => {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp group link
    window.open('https://chat.whatsapp.com/your-group-link', '_blank');
  };

  const handleTelegramClick = () => {
    // Replace with actual Telegram channel link
    window.open('https://t.me/your-channel', '_blank');
  };

  return (
    <section id="community" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
            {t.community.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.community.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* WhatsApp Community */}
          <Card className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group">
            <div className="text-center space-y-6">
              {/* WhatsApp Icon */}
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-poppins font-semibold">
                  {t.community.whatsapp.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.community.whatsapp.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>250+ Members</span>
                </div>
                <div className="text-green-600 font-medium">
                  🟢 Active Daily
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                {t.community.whatsapp.button}
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Telegram Channel */}
          <Card className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group">
            <div className="text-center space-y-6">
              {/* Telegram Icon */}
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Send className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-poppins font-semibold">
                  {t.community.telegram.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.community.telegram.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>500+ Subscribers</span>
                </div>
                <div className="text-blue-600 font-medium">
                  📅 Daily Updates
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={handleTelegramClick}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                {t.community.telegram.button}
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Additional Community Benefits */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-muted-foreground bg-muted/50 px-6 py-3 rounded-full">
            <span>✨ Free Access</span>
            <span>•</span>
            <span>🎯 Expert Tips</span>
            <span>•</span>
            <span>🤝 Peer Support</span>
            <span>•</span>
            <span>📚 Exclusive Resources</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;