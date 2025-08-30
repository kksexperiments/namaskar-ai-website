import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Users, Send, ExternalLink, Wrench, BookOpen, Lightbulb } from "lucide-react";
interface CommunitySectionProps {
  t: any;
}
const CommunitySection = ({
  t
}: CommunitySectionProps) => {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp group link
    window.open('https://chat.whatsapp.com/your-group-link', '_blank');
  };
  const handleTelegramClick = () => {
    // Replace with actual Telegram channel link
    window.open('https://t.me/your-channel', '_blank');
  };
  return <section id="community" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
              Join Our Community
            </h2>
          </div>
          <div className="flex items-center justify-center gap-8 text-foreground">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Tutorials</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Insights</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* WhatsApp Community */}
          <Card className="p-4 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-poppins font-semibold">
                WhatsApp
              </h3>
              <Button onClick={handleWhatsAppClick} className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-all duration-300">
                Join WhatsApp
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Telegram Channel */}
          <Card className="p-4 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-poppins font-semibold">
                Telegram
              </h3>
              <Button onClick={handleTelegramClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-all duration-300">
                Join Telegram
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};
export default CommunitySection;