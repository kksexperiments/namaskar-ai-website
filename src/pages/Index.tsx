import { useLanguage } from "@/hooks/useLanguage";
import LanguageModal from "@/components/LanguageModal";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ResourcesSection from "@/components/ResourcesSection";
import PillarGuidesSection from "@/components/PillarGuidesSection";
import NewsSection from "@/components/NewsSection";
import CommunitySection from "@/components/CommunitySection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";

const Index = () => {
  const { language, switchLanguage, showModal, closeModal, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/", language);

  const scrollToCommunity = () => {
    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResources = () => {
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntity: isAssamese
      ? [
          {
            "@type": "Question",
            name: "অসমীয়াত AI শিকিবলৈ coding লাগিবনে?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "নালাগে। prompt-based practical workflow-এ আৰম্ভ কৰিব পাৰি আৰু পিচত technical skill যোগ দিব পাৰে।",
            },
          },
          {
            "@type": "Question",
            name: "দৈনিক কিমান সময় দিয়াটো যথেষ্ট?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "দৈনিক ১০-২০ মিনিট consistency থাকিলে ভাল ফল পোৱা যায়।",
            },
          },
          {
            "@type": "Question",
            name: "ChatGPT অসমীয়াত ভাল কাম কৰে নেকি?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "হয়। role + context + task + output format স্পষ্ট দিলে Assamese output বহুত উন্নত হয়।",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            name: "Do I need coding to learn AI in Assamese?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. You can begin with prompt-based practical workflows and add technical skills later.",
            },
          },
          {
            "@type": "Question",
            name: "How much daily time is enough to start?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A consistent 10 to 20 minutes per day is enough for meaningful progress.",
            },
          },
          {
            "@type": "Question",
            name: "Does ChatGPT work well with Assamese prompts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Assamese prompts perform better when role, context, task, and output format are clearly defined.",
            },
          },
        ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isAssamese ? "অসমীয়াত AI শিকাৰ ১০ মিনিটৰ আৰম্ভণি" : "10-minute start to learn AI in Assamese",
    description: isAssamese
      ? "নতুন শিক্ষাৰ্থীৰ বাবে সৰল prompt-based আৰম্ভণি পদ্ধতি।"
      : "A simple prompt-based workflow for beginners.",
    totalTime: "PT10M",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    step: isAssamese
      ? [
          {
            "@type": "HowToStep",
            name: "লক্ষ্য বাছনি কৰক",
            text: "career, study, business বা family use-case এটাৰ পৰা আৰম্ভ কৰক।",
          },
          {
            "@type": "HowToStep",
            name: "prompt run কৰক",
            text: "Prompt Packs-ৰ পৰা এটা prompt কপি কৰি AI tool-ত run কৰক।",
          },
          {
            "@type": "HowToStep",
            name: "refine কৰি পুনৰ run কৰক",
            text: "নিজৰ context যোগ দি output উন্নত কৰিবলৈ prompt refine কৰক।",
          },
        ]
      : [
          {
            "@type": "HowToStep",
            name: "Choose one goal",
            text: "Start with one use-case: career, study, business, or family.",
          },
          {
            "@type": "HowToStep",
            name: "Run one prompt",
            text: "Copy a prompt from Prompt Packs and run it in your AI tool.",
          },
          {
            "@type": "HowToStep",
            name: "Refine and rerun",
            text: "Add your own context and iterate once to improve output quality.",
          },
        ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAssamese ? "ঘৰ" : "Home",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
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
        path={canonicalPath}
        language={language}
        keywords={[
          "AI in Assamese",
          "Assamese AI learning",
          "learn AI Assam",
          "prompt packs Assamese",
          "Namaskar AI",
        ]}
        structuredData={[faqSchema, howToSchema, breadcrumbSchema]}
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
        <div className="section-reveal" style={{ animationDelay: "60ms" }}>
          <HeroSection
            currentLanguage={language}
            t={t}
            onNewsletterClick={scrollToResources}
            onCommunityClick={scrollToCommunity}
          />
        </div>

        {/* Resources Section */}
        <div className="section-reveal" style={{ animationDelay: "120ms" }}>
          <ResourcesSection currentLanguage={language} t={t} />
        </div>

        {/* Pillar Guides */}
        <div className="section-reveal" style={{ animationDelay: "180ms" }}>
          <PillarGuidesSection currentLanguage={language} />
        </div>

        {/* News Section */}
        <div className="section-reveal" style={{ animationDelay: "220ms" }}>
          <NewsSection t={t} currentLanguage={language} />
        </div>

        {/* Community Section */}
        <div className="section-reveal" style={{ animationDelay: "260ms" }}>
          <CommunitySection currentLanguage={language} t={t} />
        </div>

        {/* Latest Videos (Facebook embeds) */}
        <div className="section-reveal" style={{ animationDelay: "300ms" }}>
          <InstagramSection t={t} />
        </div>
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
