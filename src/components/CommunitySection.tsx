import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Users, Send, ExternalLink, Wrench, BookOpen, Lightbulb } from "lucide-react";
import { Content, Language } from "@/types/language";

interface CommunitySectionProps {
  currentLanguage: Language;
  t: Content;
}

const CommunitySection = ({ currentLanguage, t }: CommunitySectionProps) => {
  const whatsappUrl = import.meta.env.VITE_WHATSAPP_GROUP_URL || "https://www.instagram.com/namaskar.ai";
  const telegramUrl = import.meta.env.VITE_TELEGRAM_CHANNEL_URL || "https://www.instagram.com/namaskar.ai";

  const labels =
    currentLanguage === "as"
      ? { tools: "টুলছ", tutorials: "টিউটৰিয়েল", insights: "ইনছাইটছ" }
      : { tools: "Tools", tutorials: "Tutorials", insights: "Insights" };

  return (
    <section id="community" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold gradient-text text-center">
              {t.community.headline}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.community.description}</p>
          <div className="flex items-center justify-center gap-8 text-foreground">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{labels.tools}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{labels.tutorials}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{labels.insights}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-4 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-poppins font-semibold">{t.community.whatsapp.title}</h3>
              <p className="text-sm text-muted-foreground">{t.community.whatsapp.description}</p>
              <Button
                asChild
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-all duration-300 min-h-[44px]"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {t.community.whatsapp.button}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-poppins font-semibold">{t.community.telegram.title}</h3>
              <p className="text-sm text-muted-foreground">{t.community.telegram.description}</p>
              <Button
                asChild
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-all duration-300 min-h-[44px]"
              >
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                  {t.community.telegram.button}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
