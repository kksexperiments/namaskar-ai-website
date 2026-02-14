import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "গোপনীয়তা নীতি | নমস্কাৰ AI" : "Privacy Policy | Namaskar AI"}
        description={
          isAssamese
            ? "নমস্কাৰ AI-এ আপোনাৰ তথ্য কেনেকৈ সংগ্ৰহ আৰু সুৰক্ষিতভাৱে ব্যৱহাৰ কৰে তাৰ সহজ ব্যাখ্যা।"
            : "How Namaskar AI collects and protects your data with a clear privacy policy."
        }
        path="/privacy"
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
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Data Protection" : "Data Protection"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text">
                {isAssamese ? "গোপনীয়তা নীতি" : "Privacy Policy"}
              </h1>
            </div>
          </Card>

          <div className="space-y-4 rounded-2xl border border-primary/15 bg-card/95 p-5 text-muted-foreground leading-relaxed">
            <p>
              {isAssamese
                ? "আমি কেৱল প্ৰয়োজনীয় তথ্য সংগ্ৰহ কৰোঁ যাতে এই ৱেবছাইট আৰু নিউজলেটাৰ সঠিকভাৱে চলাব পাৰি।"
                : "We collect only the information needed to run this website and newsletter effectively."}
            </p>
            <p>
              {isAssamese
                ? "আপুনি নিউজলেটাৰত নাম অন্তৰ্ভুক্ত কৰিলে আপোনাৰ ইমেইল ঠিকনা সুৰক্ষিতভাৱে সংৰক্ষণ কৰা হয় আৰু কেৱল আপডেট পাঠোৱাৰ বাবে ব্যৱহাৰ কৰা হয়।"
                : "If you subscribe to the newsletter, your email address is stored securely and used only for updates."}
            </p>
            <p>
              {isAssamese
                ? "আপুনি যিকোনো সময়ে সদস্যতা বাতিল বা তথ্য মচি পেলোৱাৰ অনুৰোধ কৰিব পাৰে: hello@namaskar.ai"
                : "You can unsubscribe anytime or request deletion of your data by contacting hello@namaskar.ai."}
            </p>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default PrivacyPolicy;
