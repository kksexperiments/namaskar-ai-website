import { Button } from "@/components/ui/button";
import { Instagram, Mail, Globe } from "lucide-react";
import { Language } from "@/types/language";

interface FooterProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  t: any;
}

const Footer = ({ currentLanguage, onLanguageChange, t }: FooterProps) => {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/namaskar.ai", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@namaskar.ai", label: "Email" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-poppins font-bold">
                Namaskar
                <span className="text-primary ml-1">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Empowering AI education in your language. Learn, grow, and innovate with cutting-edge AI technologies.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-sm">Connect With Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="sm"
                  asChild
                  className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Language & Contact */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-sm">Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-2">
                  <Button
                    variant={currentLanguage === 'en' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onLanguageChange('en')}
                    className="h-8 px-3 text-xs"
                  >
                    English
                  </Button>
                  <Button
                    variant={currentLanguage === 'as' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onLanguageChange('as')}
                    className="h-8 px-3 text-xs"
                  >
                    অসমীয়া
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {t.footer.contact}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#newsletter" className="hover:text-primary transition-colors">Newsletter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;