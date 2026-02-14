import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "পৃষ্ঠা পোৱা নগ'ল | নমস্কাৰ AI" : "Page Not Found | Namaskar AI"}
        description={
          isAssamese
            ? "আপুনি বিচৰা পৃষ্ঠা উপলব্ধ নহয়।"
            : "The page you are looking for is not available."
        }
        path="/404"
        language={language}
        robots="noindex, nofollow"
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell max-w-3xl">
          <Card className="platform-hero-card text-center">
            <div className="relative z-10">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Compass className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold">404</h1>
              <p className="mt-2 text-lg font-semibold">
                {isAssamese ? "পৃষ্ঠা পোৱা নগ'ল" : "Page not found"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {isAssamese
                  ? "অনুগ্ৰহ কৰি homepage বা prompt packs-লৈ উভতি যাওক।"
                  : "Please go back to the homepage or open prompt packs."}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {isAssamese ? "ঘৰলৈ" : "Home"}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/prompt-packs">Prompt Packs</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default NotFound;
