import { useEffect, useRef, useState } from "react";
import { BookOpenText, Check, ClipboardList, Copy, TriangleAlert } from "lucide-react";

import { Language } from "@/types/language";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PromptPacksGuideProps {
  language: Language;
}

interface TemplateItem {
  id: string;
  titleEn: string;
  titleAs: string;
  promptEn: string;
  promptAs: string;
}

const TEMPLATE_ITEMS: TemplateItem[] = [
  {
    id: "study-plan",
    titleEn: "Weekly Study Plan Builder",
    titleAs: "সাপ্তাহিক অধ্যয়ন পৰিকল্পনা",
    promptEn:
      "Act as a study coach. Context: I am preparing for [exam/subject] and can study [X] hours per day. Task: Create a 7-day plan with topic order, revision slots, and mini tests. Output format: A daily table with time blocks and one progress checkpoint per day.",
    promptAs:
      "আপুনি এজন study coach হিচাপে কাম কৰক। Context: মই [exam/subject]-ৰ বাবে প্ৰস্তুতি লৈ আছোঁ আৰু দৈনিক [X] ঘণ্টা পঢ়িব পাৰোঁ। Task: topic order, revision slot আৰু mini testসহ ৭ দিনৰ plan সাজি দিয়ক। Output format: দিন অনুসৰি time-block table আৰু প্ৰতিদিনে ১টা progress checkpoint।",
  },
  {
    id: "business-offer",
    titleEn: "Local Business Offer Message",
    titleAs: "স্থানীয় ব্যৱসায় অফাৰ বাৰ্তা",
    promptEn:
      "Act as a marketing assistant for a small Assamese business. Context: My business is [type], target customers are [audience], and offer is [offer]. Task: Write 5 WhatsApp-ready promotional messages in simple Assamese + English mix. Output format: Numbered list with one-line CTA in each.",
    promptAs:
      "আপুনি অসমীয়াৰ small business-ৰ marketing assistant হিচাপে কাম কৰক। Context: মোৰ business [type], target customer [audience], আৰু offer [offer]। Task: সহজ Assamese + English mix-ত WhatsApp-ready ৫টা promotional message লিখক। Output format: numbered list আৰু প্ৰতিটোত ১ line CTA থাকিব।",
  },
  {
    id: "job-interview",
    titleEn: "Interview Practice Simulator",
    titleAs: "Interview Practice Simulator",
    promptEn:
      "Act as an interviewer for the role [job role]. Context: My experience is [X], strengths are [Y], and weak area is [Z]. Task: Ask me 8 interview questions, wait for my answers, then score me on clarity, confidence, and relevance. Output format: Question-by-question feedback and 3 improvement actions.",
    promptAs:
      "আপুনি [job role]-ৰ interviewer হিচাপে কাম কৰক। Context: মোৰ experience [X], strength [Y], আৰু weak area [Z]। Task: মোক ৮টা interview question সোধক, মোৰ উত্তৰৰ পাছত clarity, confidence আৰু relevance-ত score দিয়ক। Output format: question-wise feedback আৰু ৩টা improvement action।",
  },
  {
    id: "parent-child-rules",
    titleEn: "Parent AI Safety Rules",
    titleAs: "Parent AI Safety Rules",
    promptEn:
      "Act as a family education advisor. Context: Child age is [age], uses phone for [purpose], and screen time is [duration]. Task: Create a simple home AI usage policy with do/don't rules, privacy rules, and homework boundaries. Output format: One-page checklist in Assamese-first language.",
    promptAs:
      "আপুনি family education advisor হিচাপে কাম কৰক। Context: শিশুৰ বয়স [age], ফোন ব্যৱহাৰ [purpose], screen time [duration]। Task: ঘৰৰ বাবে সহজ AI usage policy সাজক যাতে do/don't rules, privacy rules আৰু homework boundaries থাকে। Output format: Assamese-first one-page checklist।",
  },
  {
    id: "content-ideas",
    titleEn: "30-Day Content Ideas",
    titleAs: "৩০ দিনৰ Content Ideas",
    promptEn:
      "Act as a content strategist. Context: My niche is [topic], audience is [audience], platform is [Instagram/YouTube], and posting frequency is [X/week]. Task: Generate 30 content ideas with hook, format, and CTA. Output format: Table with columns: Day, Idea, Hook, Format, CTA.",
    promptAs:
      "আপুনি content strategist হিচাপে কাম কৰক। Context: মোৰ niche [topic], audience [audience], platform [Instagram/YouTube], আৰু posting frequency [X/week]। Task: hook, format আৰু CTAসহ ৩০টা content idea তৈরি কৰক। Output format: Day, Idea, Hook, Format, CTA টেবুল।",
  },
];

const PromptPacksGuide = ({ language }: PromptPacksGuideProps) => {
  const isAssamese = language === "as";
  const { toast } = useToast();
  const [copiedTemplateKey, setCopiedTemplateKey] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const structureItems = isAssamese
    ? [
        { title: "Role", body: "AI-ক কোন ৰূপত কাম কৰাব (teacher, coach, marketer) স্পষ্ট কৰক।" },
        { title: "Context", body: "আপোনাৰ পৰিস্থিতি, লক্ষ্য, সীমাবদ্ধতা, audience উল্লেখ কৰক।" },
        { title: "Task", body: "AI-এ সঠিকভাৱে কি কৰিব লাগে তাক action ভাষাত লিখক।" },
        { title: "Output", body: "ফলাফলৰ format নির্ধারণ কৰক (table, bullets, checklist, script)।" },
      ]
    : [
        { title: "Role", body: "Define who AI should act as: teacher, coach, marketer, and so on." },
        { title: "Context", body: "Share your situation, goal, constraints, and audience." },
        { title: "Task", body: "Use action language for exactly what AI should produce." },
        { title: "Output", body: "Specify output format: table, bullets, checklist, script." },
      ];

  const mistakes = isAssamese
    ? [
        "Role নলিখি সোজাকৈ vague প্রশ্ন কৰা",
        "Context নেদি generic output আশা কৰা",
        "একেলগে বহু কাম দিয়া",
        "Desired output format উল্লেখ নকৰা",
        "Language preference স্পষ্ট নকৰা",
        "Review নকৰি output সোজাকৈ ব্যৱহাৰ কৰা",
        "Sensitive data prompt-ত দিয়া",
        "একেটা prompt-এ test নকৰি conclude কৰা",
        "Follow-up refine prompt নকৰা",
        "Prompt history ৰাখি নাথকা",
      ]
    : [
        "Asking vague prompts without defining role",
        "Expecting specific output without context",
        "Combining too many tasks in one prompt",
        "Not specifying output format",
        "Not setting language preference clearly",
        "Using output without review",
        "Sharing sensitive data in prompts",
        "Testing only once before deciding quality",
        "Skipping follow-up refinement",
        "Not maintaining a personal prompt library",
      ];

  const copyTemplate = async (template: TemplateItem, templateLanguage: Language) => {
    const key = `${template.id}-${templateLanguage}`;
    const text = templateLanguage === "as" ? template.promptAs : template.promptEn;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplateKey(key);
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
      feedbackTimerRef.current = setTimeout(() => {
        setCopiedTemplateKey((previous) => (previous === key ? null : previous));
      }, 1400);

      toast({
        title: isAssamese ? "Template কপি সম্পূৰ্ণ" : "Template copied",
        description: templateLanguage === "as" ? template.titleAs : template.titleEn,
      });
    } catch {
      toast({
        title: isAssamese ? "কপি ব্যৰ্থ" : "Copy failed",
        description: isAssamese ? "অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।" : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6 border-primary/20 bg-[linear-gradient(140deg,hsl(var(--card)),hsl(var(--accent)/0.1),hsl(var(--primary)/0.08))] p-5 sm:p-6">
      <div className="mb-4">
        <div className="mb-1 inline-flex items-center gap-2 text-primary">
          <BookOpenText className="h-4 w-4" />
          <h2 className="text-xl font-semibold">{isAssamese ? "AI Prompts Guide" : "AI Prompts Guide"}</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {isAssamese
            ? "Prompt structure, সাধাৰণ ভুল, আৰু copy-ready template-এ prompt quality বহুত উন্নত কৰে।"
            : "Use this guide to improve prompt quality with structure, mistakes to avoid, and copy-ready templates."}
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="structure">
          <AccordionTrigger className="text-base font-semibold">
            <span className="inline-flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />
              {isAssamese ? "Prompt structure (Role / Context / Task / Output)" : "Prompt structure (Role / Context / Task / Output)"}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {structureItems.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-background/85 p-3">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mistakes">
          <AccordionTrigger className="text-base font-semibold">
            <span className="inline-flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 text-primary" />
              {isAssamese ? "১০টা beginner mistake" : "10 beginner mistakes"}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2 md:grid-cols-2">
              {mistakes.map((mistake, index) => (
                <div key={mistake} className="rounded-lg border border-border bg-background/85 p-3 text-sm">
                  <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                  {mistake}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="templates">
          <AccordionTrigger className="text-base font-semibold">
            <span className="inline-flex items-center gap-2">
              <Copy className="h-4 w-4 text-primary" />
              {isAssamese ? "৫টা copy-ready template (EN + AS)" : "5 copy-ready templates (EN + AS)"}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {TEMPLATE_ITEMS.map((template) => (
                <Card key={template.id} className="border-border/80 bg-background/90 p-4">
                  <h3 className="text-sm font-semibold">
                    {isAssamese ? template.titleAs : template.titleEn}
                  </h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-md border border-border bg-card p-3">
                      <p className="mb-2 text-xs font-semibold text-muted-foreground">অসমীয়া</p>
                      <p className="text-sm leading-relaxed text-foreground/90">{template.promptAs}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full"
                        onClick={() => copyTemplate(template, "as")}
                      >
                        {copiedTemplateKey === `${template.id}-as` ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copiedTemplateKey === `${template.id}-as`
                          ? isAssamese
                            ? "কপি সম্পূৰ্ণ"
                            : "Copied"
                          : isAssamese
                            ? "অসমীয়া কপি"
                            : "Copy Assamese"}
                      </Button>
                    </div>
                    <div className="rounded-md border border-border bg-card p-3">
                      <p className="mb-2 text-xs font-semibold text-muted-foreground">English</p>
                      <p className="text-sm leading-relaxed text-foreground/90">{template.promptEn}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-3 w-full"
                        onClick={() => copyTemplate(template, "en")}
                      >
                        {copiedTemplateKey === `${template.id}-en` ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copiedTemplateKey === `${template.id}-en`
                          ? isAssamese
                            ? "কপি সম্পূৰ্ণ"
                            : "Copied"
                          : isAssamese
                            ? "English কপি"
                            : "Copy English"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default PromptPacksGuide;
