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
    ? "আৰম্ভণিৰ পৰা বাস্তৱ ব্যৱহাৰলৈকে Assamese-first পথনির্দেশিকা"
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
      title: isAssamese ? "অসমীয়াত AI Course (শীঘ্ৰেই)" : "AI Course in Assamese (Coming Soon)",
      description: isAssamese
        ? "Course launch আপডেটৰ বাবে waitlist-ত নাম অন্তর্ভুক্ত কৰক।"
        : "Join the waitlist to get notified when the course launches.",
      path: toLocalePath("/ai-course-in-assamese", currentLanguage),
      icon: GraduationCap,
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
      </div>
    </section>
  );
};

export default PillarGuidesSection;
