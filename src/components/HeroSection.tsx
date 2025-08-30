import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  t: any;
  onNewsletterClick: () => void;
  onCommunityClick: () => void;
}

const HeroSection = ({ t, onNewsletterClick, onCommunityClick }: HeroSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = e.currentTarget as HTMLElement;
      const rect = section.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const section = document.querySelector('.hero-section');
    section?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      section?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      className="hero-section relative pt-0 pb-20 lg:pb-24 hero-pattern cultural-pattern overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
          hsl(var(--primary) / 0.15), 
          hsl(var(--background) / 0.95) 40%, 
          hsl(var(--background)) 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Headline */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold leading-tight max-w-4xl mx-auto">
                <span className="gradient-text">{t.hero.headline}</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We help you cut through the AI noise to find tools that solve real problems - with practical guidance
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
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
      </div>
    </section>
  );
};

export default HeroSection;