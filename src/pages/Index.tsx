import { useLanguage } from "@/hooks/useLanguage";
import LanguageModal from "@/components/LanguageModal";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourcesSection from "@/components/ResourcesSection";
import NewsSection from "@/components/NewsSection";
import CommunitySection from "@/components/CommunitySection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { language, switchLanguage, showModal, closeModal, t } = useLanguage();

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
          t={t}
          onNewsletterClick={scrollToNews}
          onCommunityClick={scrollToResources}
        />

        {/* Resources Section */}
        <ResourcesSection t={t} />

        {/* News Section */}
        <NewsSection t={t} />

        {/* Community Section */}
        <CommunitySection t={t} />

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
