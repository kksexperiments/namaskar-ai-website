import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "সেৱাৰ শর্তসমূহ | নমস্কাৰ AI" : "Terms of Service | Namaskar AI"}
        description={
          isAssamese
            ? "নমস্কাৰ AI প্লেটফৰ্ম ব্যৱহাৰৰ নিয়ম, দায়বদ্ধতা আৰু আচৰণ নীতি।"
            : "Terms, responsibilities, and usage rules for the Namaskar AI platform."
        }
        path="/terms"
        language={language}
      />
      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
      <main className="pb-14 pt-8">
        <div className="platform-shell max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>{isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to Home"}</span>
          </Link>

          <Card className="platform-hero-card mb-5">
            <div className="relative z-10">
              <div className="platform-chip mb-2">
                <Scale className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Platform Rules" : "Platform Rules"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text">
                {isAssamese ? "সেৱাৰ শর্তসমূহ" : "Terms of Service"}
              </h1>
            </div>
          </Card>

          <div className="space-y-4 rounded-2xl border border-primary/15 bg-card/95 p-5 text-muted-foreground leading-relaxed">
            <p>
              {isAssamese
                ? "এই ৱেবছাইটে শিক্ষামূলক উদ্দেশ্যে AI সম্পদ প্ৰদান কৰে। বিষয়বস্তুসমূহ তথ্যৰ বাবে, আইনী/আৰ্থিক পৰামৰ্শ নহয়।"
                : "This website provides AI learning resources for educational purposes. Content is informational and not legal or financial advice."}
            </p>
            <p>
              {isAssamese
                ? "আপুনি এই প্লেটফৰ্ম ব্যৱহাৰ কৰাৰ সময়ত আইনসঙ্গত আৰু নৈতিক ব্যৱহাৰ বজাই ৰাখিবলৈ সন্মত।"
                : "By using this platform, you agree to use it lawfully and ethically."}
            </p>
            <p>
              {isAssamese
                ? "প্ৰশ্ন থাকিলে যোগাযোগ কৰক: hello@namaskar.ai"
                : "For questions, contact hello@namaskar.ai."}
            </p>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default TermsOfService;
