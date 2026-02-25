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
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

const sectionRevealVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const HomeSectionReveal = ({ children, index }: { children: ReactNode; index: number }) => (
  <motion.div
    custom={index}
    variants={sectionRevealVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.18 }}
  >
    {children}
  </motion.div>
);

const HeritageDivider = () => <div aria-hidden="true" className="heritage-miri-divider mx-auto w-full max-w-7xl" />;

const Index = () => {
  const { language, switchLanguage, showModal, closeModal, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/", language);
  const homepageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const jaapiGridY = useTransform(scrollY, (value) => (prefersReducedMotion ? 0 : value * 0.2));

  const scrollToCommunity = () => {
    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResources = () => {
    document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const root = homepageRef.current;
    if (!root) {
      return;
    }

    const magneticNodes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-magnetic="true"]')
    );

    const cleanups = magneticNodes.map((node) => {
      const handleMove = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        node.style.setProperty("--magnetic-x", `${Math.max(-6, Math.min(6, offsetX * 0.08))}`);
        node.style.setProperty("--magnetic-y", `${Math.max(-6, Math.min(6, offsetY * 0.08))}`);
      };

      const reset = () => {
        node.style.setProperty("--magnetic-x", "0");
        node.style.setProperty("--magnetic-y", "0");
      };

      node.addEventListener("mousemove", handleMove);
      node.addEventListener("mouseleave", reset);
      node.addEventListener("blur", reset);

      return () => {
        node.removeEventListener("mousemove", handleMove);
        node.removeEventListener("mouseleave", reset);
        node.removeEventListener("blur", reset);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [language, prefersReducedMotion]);

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
    <div ref={homepageRef} className="heritage-homepage min-h-screen bg-background">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div className="heritage-jaapi-grid absolute inset-[-10%]" style={{ y: jaapiGridY }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(227,197,140,0.24),transparent_36%),radial-gradient(circle_at_95%_8%,rgba(26,58,58,0.12),transparent_32%),linear-gradient(180deg,rgba(253,252,248,0.86),rgba(253,252,248,0.96))]" />
      </div>
      <div className="relative z-10">
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
        <HomeSectionReveal index={0}>
          <HeroSection
            currentLanguage={language}
            t={t}
            onNewsletterClick={scrollToResources}
            onCommunityClick={scrollToCommunity}
          />
        </HomeSectionReveal>
        <HeritageDivider />

        {/* Resources Section */}
        <HomeSectionReveal index={1}>
          <ResourcesSection currentLanguage={language} t={t} />
        </HomeSectionReveal>
        <HeritageDivider />

        {/* Pillar Guides */}
        <HomeSectionReveal index={2}>
          <PillarGuidesSection currentLanguage={language} />
        </HomeSectionReveal>
        <HeritageDivider />

        {/* News Section */}
        <HomeSectionReveal index={3}>
          <NewsSection t={t} currentLanguage={language} />
        </HomeSectionReveal>
        <HeritageDivider />

        {/* Community Section */}
        <HomeSectionReveal index={4}>
          <CommunitySection currentLanguage={language} t={t} />
        </HomeSectionReveal>
        <HeritageDivider />

        {/* Latest Videos (Facebook embeds) */}
        <HomeSectionReveal index={5}>
          <InstagramSection t={t} />
        </HomeSectionReveal>
      </main>

      {/* Footer */}
      <motion.div
        variants={sectionRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        custom={6}
      >
        <Footer
          currentLanguage={language}
          onLanguageChange={switchLanguage}
          t={t}
        />
      </motion.div>
      </div>
    </div>
  );
};

export default Index;
