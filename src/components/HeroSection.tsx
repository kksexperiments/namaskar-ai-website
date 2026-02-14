import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  Play,
  Store,
  Users,
  Wand2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Content, Language } from "@/types/language";

interface HeroSectionProps {
  currentLanguage: Language;
  t: Content;
  onNewsletterClick: () => void;
  onCommunityClick: () => void;
}

const HeroSection = ({
  currentLanguage,
  t,
  onNewsletterClick,
  onCommunityClick,
}: HeroSectionProps) => {
  const isAssamese = currentLanguage === "as";

  const learnersText = isAssamese ? "১,০০০+ শিক্ষাৰ্থী" : "1,000+ learners";
  const followersText = isAssamese ? "25,000+ অনুসৰণকাৰী" : "25,000+ followers";
  const trustLine = isAssamese
    ? "অসমীয়া-বান্ধৱ ব্যাখ্যা, practical demo, আৰু কপি-ৰেডি prompt"
    : "Assamese-friendly explanations, practical demos, and copy-ready prompts";

  const lanes = [
    {
      icon: <BriefcaseBusiness className="h-4 w-4" />,
      title: isAssamese ? "Career আৰু Job" : "Career and Job",
      subtitle: isAssamese ? "CV, interview, skill roadmap" : "CV, interview, skill roadmap",
      path: "/prompt-packs?category=career_and_jobs",
    },
    {
      icon: <GraduationCap className="h-4 w-4" />,
      title: isAssamese ? "Student আৰু Aspirers" : "Students and Aspirers",
      subtitle: isAssamese ? "exam notes, study discipline" : "exam notes, study discipline",
      path: "/prompt-packs?category=study_and_skills",
    },
    {
      icon: <Store className="h-4 w-4" />,
      title: isAssamese ? "Small Business" : "Small Business",
      subtitle: isAssamese ? "sales, WhatsApp template" : "sales, WhatsApp templates",
      path: "/prompt-packs?category=business_and_income",
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: isAssamese ? "Parents আৰু Family" : "Parents and Family",
      subtitle: isAssamese ? "safe AI rules, child guide" : "safe AI rules, child guidance",
      path: "/prompt-packs?category=parents_and_family",
    },
  ];

  const quickSteps = isAssamese
    ? [
        "শ্ৰেণী বাছনি কৰক",
        "Prompt খুলি কপি কৰক",
        "নিজৰ data দি run কৰক",
      ]
    : ["Pick your category", "Open and copy a prompt", "Run with your own data"];

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_10%_0%,hsl(var(--accent)/0.22),transparent_42%),radial-gradient(circle_at_95%_15%,hsl(var(--primary)/0.2),transparent_38%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))] py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-0 cultural-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Card className="overflow-hidden border-primary/20 bg-[linear-gradient(130deg,hsl(var(--card)),hsl(var(--accent)/0.1),hsl(var(--primary)/0.08))] p-6 shadow-elegant sm:p-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-primary/25 bg-card/70 px-3 py-1 text-xs font-semibold text-primary">
              <Wand2 className="mr-1.5 h-3.5 w-3.5" />
              {isAssamese ? "Assamese-first AI learning" : "Assamese-first AI learning"}
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              <span className="gradient-text">{t.hero.headline}</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero.subheadline}
            </p>

            <p className="mt-3 text-sm font-medium text-foreground/80">{trustLine}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={onNewsletterClick}
                className="bg-gradient-primary px-6 py-3 font-semibold text-white shadow-button transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.hero.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onCommunityClick}
                className="border-2 border-primary/50 bg-card/70 px-6 py-3 font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Play className="mr-2 h-4 w-4" />
                {t.hero.secondaryCta}
              </Button>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/25 bg-card/80 p-3">
                <div className="text-xs text-muted-foreground">{isAssamese ? "সম্প্ৰদায়ৰ শক্তি" : "Community Scale"}</div>
                <div className="mt-1 text-base font-semibold text-primary">{learnersText}</div>
              </div>
              <div className="rounded-xl border border-accent/35 bg-card/80 p-3">
                <div className="text-xs text-muted-foreground">{isAssamese ? "সামাজিক প্ৰভাৱ" : "Social Reach"}</div>
                <div className="mt-1 text-base font-semibold text-primary">{followersText}</div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="border-primary/20 bg-card/90 p-5 shadow-card">
              <div className="mb-4 flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                <h3 className="text-base font-semibold">
                  {isAssamese ? "আজিৰ ১০ মিনিট AI Start" : "Today’s 10-Minute AI Start"}
                </h3>
              </div>

              <div className="space-y-2">
                {quickSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/40 p-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>

              <Link to="/prompt-packs" className="mt-4 block">
                <Button className="w-full bg-gradient-primary font-semibold text-white">
                  {isAssamese ? "Prompt Packs খোলক" : "Open Prompt Packs"}
                </Button>
              </Link>
            </Card>

            <Card className="border-primary/15 bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--primary)/0.08),hsl(var(--accent)/0.12))] p-5 shadow-card">
              <h3 className="mb-3 text-base font-semibold">
                {isAssamese ? "আপোনাৰ পৰিস্থিতিৰ বাবে দ্ৰুত লেন" : "Quick Lanes by Situation"}
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {lanes.map((lane) => (
                  <Link key={lane.path} to={lane.path}>
                    <div className="rounded-xl border border-primary/20 bg-card/85 p-3 transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-card">
                      <div className="mb-1 flex items-center gap-2 text-primary">
                        {lane.icon}
                        <p className="text-sm font-semibold text-foreground">{lane.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{lane.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
