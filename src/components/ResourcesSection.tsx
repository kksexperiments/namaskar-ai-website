import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Zap, ArrowRight, Gift, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourcesSectionProps {
  t: any;
}

const ResourcesSection = ({ t }: ResourcesSectionProps) => {
  const resources = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Prompt Packs",
      description: "Ready-to-use prompts for content creation, coding, and analysis",
      path: "/prompt-packs"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI Tools",
      description: "Complete guide to the best AI tools for different use cases",
      path: "/ai-tools"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Learning Roadmaps",
      description: "Step-by-step learning path from basics to advanced AI concepts",
      path: "/learning-roadmaps"
    }
  ];

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-muted/50 to-background border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          {/* Top Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 animate-scale-in shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
            {t.resources.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.resources.description}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Link 
              key={index}
              to={resource.path}
              className="block transition-transform duration-300 hover:scale-[1.02]"
            >
              <Card 
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up group cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {resource.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-poppins font-semibold group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-primary font-medium">View Details</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-primary hover:text-primary-foreground hover:bg-primary p-0 w-8 h-8 rounded-full group-hover:translate-x-1 transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;