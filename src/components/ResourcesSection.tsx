import { Card } from "@/components/ui/card";
import { ArrowRight, Bot, Library, Map, MessageSquare, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Content, Language } from "@/types/language";
import { toLocalePath } from "@/lib/locale";
import HeritageEmblemBadge from "@/components/HeritageEmblemBadge";

interface ResourcesSectionProps {
  currentLanguage: Language;
  t: Content;
}

const ResourcesSection = ({ currentLanguage, t }: ResourcesSectionProps) => {
  const isAssamese = currentLanguage === "as";

  const resources = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      emblem: "rhino" as const,
      title: isAssamese ? "AI Prompt Packs" : "AI Prompt Packs",
      description: isAssamese
        ? "অসমীয়া-প্ৰধান কপি-ৰেডি prompt, যি আপুনি তৎক্ষণাত ব্যৱহাৰ কৰিব পাৰে।"
        : "Assamese-first copy-ready prompts you can use immediately.",
      highlight: isAssamese ? "আজিৰ কাম: ১টা prompt run কৰক" : "Today’s goal: run 1 prompt",
      path: toLocalePath("/prompt-packs", currentLanguage),
      gradient:
        "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--primary)/0.08),hsl(var(--accent)/0.18))]",
    },
    {
      icon: <Bot className="h-5 w-5" />,
      emblem: "xaroi" as const,
      title: isAssamese ? "AI Tools Guide" : "AI Tools Guide",
      description: isAssamese
        ? "কোন কামত কোন AI tool, কতখিনি সহজ আৰু কিমান সময় বাচাব পাৰিব।"
        : "Know which AI tool to use for which task, and how much time it saves.",
      highlight: isAssamese ? "প্ৰয়োগ-কেন্দ্ৰিক tool তালিকা" : "Practical tool shortlist",
      path: toLocalePath("/ai-tools", currentLanguage),
      gradient:
        "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--accent)/0.12),hsl(var(--primary)/0.06))]",
    },
    {
      icon: <Map className="h-5 w-5" />,
      emblem: "jaapi" as const,
      title: isAssamese ? "Learning Roadmaps" : "Learning Roadmaps",
      description: isAssamese
        ? "Aspirers, business owner, parent, teacher - সকলোৰে বাবে ধাপে ধাপে পথ।"
        : "Step-by-step roadmaps for aspirers, business owners, parents, and teachers.",
      highlight: isAssamese ? "৩০ দিনৰ actionable পথ" : "30-day actionable path",
      path: toLocalePath("/learning-roadmaps", currentLanguage),
      gradient:
        "bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--primary)/0.1),hsl(var(--accent)/0.1))]",
    },
  ];

  return (
    <section id="resources" className="relative py-16 sm:py-20 heritage-section-block">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_5%_40%,hsl(var(--accent)/0.15),transparent_36%),radial-gradient(circle_at_98%_60%,hsl(var(--primary)/0.12),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/80 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {isAssamese ? "Learning Hub" : "Learning Hub"}
          </div>

          <div className="mb-3 flex items-center justify-center gap-3">
            <Library className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold font-poppins gradient-text sm:text-4xl">
              {t.resources.headline}
            </h2>
          </div>

          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t.resources.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {resources.map((resource, index) => (
            <Link
              key={resource.path}
              to={resource.path}
              className="group block"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <Card
                className={`heritage-panel-card h-full border-primary/15 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-elegant ${resource.gradient}`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <HeritageEmblemBadge emblem={resource.emblem} label={`${resource.title} emblem`} />
                  <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary md:flex">
                    {resource.icon}
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                  {resource.title}
                </h3>

                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>

                <div className="mb-5 rounded-lg border border-primary/20 bg-card/75 p-2.5 text-xs font-medium text-foreground/90 heritage-callout">
                  {resource.highlight}
                </div>

                <div className="flex items-center justify-between text-sm font-semibold text-primary">
                  <span>{isAssamese ? "এতিয়াই অন্বেষণ কৰক" : "Explore now"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
