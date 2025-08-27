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
    <section className="relative min-h-[90vh] flex items-center justify-center hero-pattern cultural-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold leading-tight">
                <span className="gradient-text">{t.hero.headline}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Join hundreds of learners mastering AI tools and techniques with practical guidance in English and Assamese
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onNewsletterClick}
                className="bg-gradient-primary hover:shadow-button transition-all duration-300 transform hover:-translate-y-1 text-lg px-8 py-6 rounded-xl"
              >
                {t.hero.primaryCta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={onCommunityClick}
                className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6 rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                {t.hero.secondaryCta}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-success rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-accent rounded-full border-2 border-background"></div>
                </div>
                <span>100+ learners</span>
              </div>
              <div className="text-primary font-medium">
                📱 5,000+ Followers
              </div>
            </div>
          </div>

          {/* Brand Logo */}
          <div className="relative animate-slide-up">
            <div className="relative max-w-md mx-auto lg:max-w-lg">
              {/* Background Elements */}
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent-red rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-success rounded-full blur-2xl opacity-30"></div>
              
              {/* Main Logo */}
              <div className="relative bg-gradient-card rounded-3xl p-8 shadow-elegant">
                <img
                  src={namaskarLogo}
                  alt="Namaskar AI - Learn AI in Your Language"
                  className="w-full h-auto object-contain"
                  loading="eager"
                />
              </div>
              
              {/* Small Creator Section */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-3 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                  <img
                    src={heroPhoto}
                    alt="Creator"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-muted-foreground">AI Educator & Creator</span>
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