import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import namaskarLogo from "@/assets/namaskar-logo.png";
import heroPhoto from "@/assets/hero-photo.jpg";

interface HeroSectionProps {
  t: any;
  onNewsletterClick: () => void;
  onCommunityClick: () => void;
}

const HeroSection = ({ t, onNewsletterClick, onCommunityClick }: HeroSectionProps) => {
  return (
    <section className="relative py-16 lg:py-20 hero-pattern cultural-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Content - Takes more space */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold leading-tight">
                <span className="gradient-text">{t.hero.headline}</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Join hundreds of learners mastering AI tools and techniques with practical guidance in English and Assamese
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onNewsletterClick}
                className="bg-gradient-primary hover:shadow-button transition-all duration-300 transform hover:-translate-y-1 px-6 py-3 rounded-xl"
              >
                {t.hero.primaryCta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={onCommunityClick}
                className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-6 py-3 rounded-xl"
              >
                <Play className="mr-2 w-4 h-4" />
                {t.hero.secondaryCta}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 bg-gradient-primary rounded-full border-2 border-background"></div>
                  <div className="w-7 h-7 bg-success rounded-full border-2 border-background"></div>
                  <div className="w-7 h-7 bg-accent rounded-full border-2 border-background"></div>
                </div>
                <span>100+ learners</span>
              </div>
              <div className="text-primary font-medium">
                📱 5,000+ Followers
              </div>
            </div>
          </div>

          {/* Brand Logo - More compact */}
          <div className="lg:col-span-5 relative animate-slide-up">
            <div className="relative max-w-sm mx-auto">
              {/* Simplified background effects */}
              <div className="absolute -inset-2 bg-gradient-primary rounded-2xl blur-xl opacity-15 animate-pulse"></div>
              
              {/* Main Logo - More compact */}
              <div className="relative bg-gradient-card rounded-2xl p-6 shadow-elegant">
                <img
                  src={namaskarLogo}
                  alt="Namaskar AI - Learn AI in Your Language"
                  className="w-full h-auto object-contain"
                  loading="eager"
                />
              </div>
              
              {/* Creator Badge - Positioned absolute for space efficiency */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center space-x-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-border/50">
                  <img
                    src={heroPhoto}
                    alt="Creator"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-muted-foreground font-medium">AI Educator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;