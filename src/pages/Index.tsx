import { useLanguage } from "@/hooks/useLanguage";
import LanguageModal from "@/components/LanguageModal";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourcesSection from "@/components/ResourcesSection";
import NewsSection from "@/components/NewsSection";
import CommunitySection from "@/components/CommunitySection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { toLocalePath } from "@/lib/locale";

const Index = () => {
  const { language, switchLanguage, showModal, closeModal, t } = useLanguage();
  const isAssamese = language === "as";

  const scrollToNews = () => {
    document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCommunity = () => {
    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResources = () => {
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={isAssamese ? "নমস্কাৰ AI | অসমীয়াত AI শিকক" : "Namaskar AI | Learn AI in Assamese"}
        description={
          isAssamese
            ? "অসমীয়া ভাষাত practical AI শিকক। Prompt packs, AI tools, learning roadmaps, আৰু community সহ সহজে আৰম্ভ কৰক।"
            : "Learn AI in Assamese with practical prompt packs, AI tools, learning roadmaps, and community support."
        }
        path={toLocalePath("/", language)}
        language={language}
        keywords={[
          "AI in Assamese",
          "Assamese AI learning",
          "learn AI Assam",
          "prompt packs Assamese",
          "Namaskar AI",
        ]}
      />

      {/* Language Selection Modal */}
      <LanguageModal
        isOpen={showModal}
        onClose={closeModal}
        onSelectLanguage={switchLanguage}
        currentLanguage={language}
      />

      {/* Header */}
      <Header
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          currentLanguage={language}
          t={t}
          onNewsletterClick={scrollToResources}
          onCommunityClick={scrollToCommunity}
        />

        {/* Resources Section */}
        <ResourcesSection currentLanguage={language} t={t} />

        {/* News Section */}
        <NewsSection t={t} currentLanguage={language} />

        {/* Community Section */}
        <CommunitySection currentLanguage={language} t={t} />

        {/* Instagram Section - Latest Posts */}
        <InstagramSection t={t} />
      </main>

      {/* Footer */}
      <Footer
        currentLanguage={language}
        onLanguageChange={switchLanguage}
        t={t}
      />
    </div>
  );
};

export default Index;
