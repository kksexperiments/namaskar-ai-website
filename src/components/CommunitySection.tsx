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
          <div className="flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
              Join Our Community
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get free weekly AI tools, tutorials, and insights delivered directly to you. No premium content, just valuable resources to help you stay ahead.
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
                  WhatsApp Community
                </h3>
                <p className="text-muted-foreground">
                  Interactive discussions and quick AI tips shared directly in your chat
                </p>
              </div>

              {/* Features */}
              <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
                <div className="text-green-600 font-medium">
                  💬 Interactive
                </div>
                <div className="text-green-600 font-medium">
                  🎯 Weekly Updates
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Join WhatsApp
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
                  Telegram Channel
                </h3>
                <p className="text-muted-foreground">
                  Weekly curated AI tools, tutorials, and insights delivered to your feed
                </p>
              </div>

              {/* Features */}
              <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
                <div className="text-blue-600 font-medium">
                  📚 Tutorials
                </div>
                <div className="text-blue-600 font-medium">
                  🛠️ Tool Reviews
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={handleTelegramClick}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Join Telegram
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;