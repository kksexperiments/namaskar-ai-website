import { Button } from "@/components/ui/button";
import { Instagram, Mail, Globe } from "lucide-react";
import { Content, Language } from "@/types/language";
import { Link } from "react-router-dom";
import namaskarLogo from "@/assets/namaskar-logo.png";
import NewsletterSignup from "./NewsletterSignup";
import { toLocalePath } from "@/lib/locale";

interface FooterProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  t: Content;
}

const Footer = ({ currentLanguage, onLanguageChange, t }: FooterProps) => {
  const isAssamese = currentLanguage === "as";
  const privacyPath = toLocalePath("/privacy", currentLanguage);
  const termsPath = toLocalePath("/terms", currentLanguage);
  const guidesLabel = isAssamese ? "Guides" : "Guides";
  const guideLinks = [
    {
      label: isAssamese ? "অসমীয়াত AI" : "AI in Assamese",
      to: toLocalePath("/ai-in-assamese", currentLanguage),
    },
    {
      label: isAssamese ? "অসমীয়াত ChatGPT" : "ChatGPT in Assamese",
      to: toLocalePath("/chatgpt-in-assamese", currentLanguage),
    },
    {
      label: isAssamese ? "AI Course" : "AI Course",
      to: toLocalePath("/ai-course-in-assamese", currentLanguage),
    },
    {
      label: "FAQ",
      to: toLocalePath("/faq", currentLanguage),
    },
    {
      label: isAssamese ? "৩০ দিনৰ AI Plan" : "30-Day AI Plan",
      to: toLocalePath("/learn-ai-in-assamese-30-days", currentLanguage),
    },
    {
      label: isAssamese ? "Editorial Policy" : "Editorial Policy",
      to: toLocalePath("/editorial-policy", currentLanguage),
    },
    {
      label: isAssamese ? "Press & Collaboration" : "Press & Collaboration",
      to: toLocalePath("/press-collaboration", currentLanguage),
    },
    {
      label: isAssamese ? "আমাৰ বিষয়ে" : "About",
      to: toLocalePath("/about", currentLanguage),
    },
    {
      label: isAssamese ? "যোগাযোগ" : "Contact",
      to: toLocalePath("/contact", currentLanguage),
    },
  ];
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/namaskar.ai", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@namaskar.ai", label: "Email" },
  ];
  const description = isAssamese
    ? "আপোনাৰ ভাষাত AI শিক্ষা আগবঢ়াই দিওঁ। আধুনিক AI প্ৰযুক্তিৰ সৈতে শিকক, আগবাঢ়ক আৰু নতুনত্ব সৃষ্টি কৰক।"
    : "Empowering AI education in your language. Learn, grow, and innovate with cutting-edge AI technologies.";
  const connectLabel = isAssamese ? "আমাৰ সৈতে সংযোগ কৰক" : "Connect With Us";
  const settingsLabel = isAssamese ? "ছেটিংছ" : "Settings";
  const stayUpdatedLabel = isAssamese ? "আপডেট হৈ থাকক" : "Stay Updated";
  const weeklyLabel = isAssamese
    ? "সাপ্তাহিক AI টিপছ আৰু আপডেট আপোনাৰ ইনবক্সত পাওক।"
    : "Get the latest AI tips and updates delivered to your inbox weekly.";
  const privacyLabel = isAssamese ? "গোপনীয়তা নীতি" : "Privacy Policy";
  const termsLabel = isAssamese ? "সেৱাৰ শৰ্তসমূহ" : "Terms of Service";
  const newsletterLabel = isAssamese ? "নিউজলেটাৰ" : "Newsletter";

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={namaskarLogo}
                alt="Namaskar AI"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-poppins font-bold">
                Namaskar
                <span className="text-primary ml-1">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{description}</p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-sm">{connectLabel}</h4>
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
            <h4 className="font-poppins font-semibold text-sm">{settingsLabel}</h4>
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
              <div>
                <p className="mb-2 text-xs font-semibold text-foreground/80">{guidesLabel}</p>
                <div className="space-y-1.5 text-sm">
                  {guideLinks.map((guideLink) => (
                    <Link
                      key={guideLink.to}
                      to={guideLink.to}
                      className="block text-muted-foreground transition-colors hover:text-primary"
                    >
                      {guideLink.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div id="newsletter" className="space-y-4">
            <h4 className="font-poppins font-semibold text-sm">{stayUpdatedLabel}</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">{weeklyLabel}</p>
            <NewsletterSignup />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to={privacyPath} className="hover:text-primary transition-colors">
              {privacyLabel}
            </Link>
            <span>•</span>
            <Link to={termsPath} className="hover:text-primary transition-colors">
              {termsLabel}
            </Link>
            <span>•</span>
            <a href="#newsletter" className="hover:text-primary transition-colors">
              {newsletterLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
