import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSectionProps {
  t: any;
}

const NewsletterSection = ({ t }: NewsletterSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: t.newsletter.error,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success!",
      description: t.newsletter.success,
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 bg-gradient-card border-0 shadow-elegant animate-fade-in">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold gradient-text">
                {t.newsletter.headline}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t.newsletter.description}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 px-4 text-base rounded-xl border-2 focus:border-primary transition-colors"
                  required
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-success hover:bg-success/90 text-success-foreground px-8 h-12 rounded-xl font-medium transition-all duration-300 hover:shadow-button transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    t.newsletter.button
                  )}
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Free resources included</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;