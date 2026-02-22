import { BookOpen, GraduationCap, MessageSquareText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Language } from "@/types/language";
import { toLocalePath } from "@/lib/locale";

interface PillarGuidesSectionProps {
  currentLanguage: Language;
}

const PillarGuidesSection = ({ currentLanguage }: PillarGuidesSectionProps) => {
  const isAssamese = currentLanguage === "as";

  const heading = isAssamese ? "Pillar Guides" : "Pillar Guides";
  const subtitle = isAssamese
    ? "আৰম্ভণিৰ পৰা বাস্তৱ ব্যৱহাৰলৈকে Assamese-first পথনিৰ্দেশিকা"
    : "Assamese-first topic guides from first steps to practical use.";

  const guides = [
    {
      title: isAssamese ? "অসমীয়াত AI" : "AI in Assamese",
      description: isAssamese
        ? "নতুনৰ বাবে structured beginner guide, core শব্দ আৰু আৰম্ভণিৰ পথ।"
        : "Beginner-first guide with core terms and a practical starting path.",
      path: toLocalePath("/ai-in-assamese", currentLanguage),
      icon: BookOpen,
    },
    {
      title: isAssamese ? "অসমীয়াত ChatGPT" : "ChatGPT in Assamese",
      description: isAssamese
        ? "setup, দৈনিক use-case আৰু safe usage checklist এটা ঠাইত।"
        : "Setup, daily use-cases, and safe usage checklist in one page.",
      path: toLocalePath("/chatgpt-in-assamese", currentLanguage),
      icon: MessageSquareText,
    },
    {
      title: isAssamese ? "অসমীয়াত AI Course" : "AI Course in Assamese",
      description: isAssamese
        ? "curriculum, track আৰু enrollment flow একেটা পৃষ্ঠাত চাওক।"
        : "Explore curriculum, tracks, and enrollment flow in one page.",
      path: toLocalePath("/ai-course-in-assamese", currentLanguage),
      icon: GraduationCap,
    },
  ];

  const searchGuides = [
    {
      title: isAssamese ? "৩০ দিনত AI শিকক" : "Learn AI in 30 Days",
      path: toLocalePath("/learn-ai-in-assamese-30-days", currentLanguage),
    },
    {
      title: isAssamese ? "Best AI Course তুলনা" : "Best AI Course Comparison",
      path: toLocalePath("/best-ai-course-for-assamese-speakers", currentLanguage),
    },
    {
      title: isAssamese ? "AI-এ অসমীয়া শিকা" : "Learning Assamese with AI",
      path: toLocalePath("/learning-assamese-with-ai", currentLanguage),
    },
    {
      title: isAssamese ? "Assamese LLM Guide" : "Assamese LLM Guide",
      path: toLocalePath("/assamese-llm-chatbot-guide", currentLanguage),
    },
    {
      title: isAssamese ? "Editorial Policy" : "Editorial Policy",
      path: toLocalePath("/editorial-policy", currentLanguage),
    },
    {
      title: isAssamese ? "Press & Collaboration" : "Press & Collaboration",
      path: toLocalePath("/press-collaboration", currentLanguage),
    },
  ];

  return (
    <section id="pillar-guides" className="relative py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_6%_20%,hsl(var(--accent)/0.14),transparent_38%),radial-gradient(circle_at_95%_80%,hsl(var(--primary)/0.12),transparent_35%)]" />

      <div className="platform-shell relative">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">{heading}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <Card
              key={guide.path}
              className="border-primary/15 bg-[linear-gradient(145deg,hsl(var(--card)),hsl(var(--accent)/0.08),hsl(var(--primary)/0.09))] p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <guide.icon className="mb-3 h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{guide.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
              <Button asChild variant="outline" className="mt-4 w-full border-primary/25">
                <Link to={guide.path}>
                  {isAssamese ? "খোলক" : "Open Guide"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <Card className="mt-5 border-primary/15 bg-card/95 p-4">
          <h3 className="text-sm font-semibold text-foreground">
            {isAssamese ? "Search-targeted long-form guides" : "Search-targeted long-form guides"}
          </h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {searchGuides.map((guide) => (
              <Button key={guide.path} asChild variant="outline" className="justify-start">
                <Link to={guide.path}>
                  {guide.title}
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PillarGuidesSection;
