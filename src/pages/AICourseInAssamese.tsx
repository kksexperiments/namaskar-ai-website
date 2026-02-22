import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  ListChecks,
  Sparkles,
  Target,
  Users2,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import CourseWaitlistForm from "@/components/CourseWaitlistForm";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const AICourseInAssamese = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/ai-course-in-assamese", language);

  const tocItems = [
    { id: "overview", label: isAssamese ? "Course overview" : "Course overview" },
    { id: "curriculum", label: isAssamese ? "Curriculum" : "Curriculum" },
    { id: "tracks", label: isAssamese ? "Learning tracks" : "Learning tracks" },
    { id: "enrollment", label: isAssamese ? "Enrollment" : "Enrollment" },
    { id: "faq", label: "FAQ" },
  ];

  const highlights = isAssamese
    ? [
        { label: "Duration", value: "৪ সপ্তাহ (guided path)" },
        { label: "Format", value: "Assamese + English practical lessons" },
        { label: "Level", value: "Beginner to intermediate" },
        { label: "Outcome", value: "Real workflow projects" },
      ]
    : [
        { label: "Duration", value: "4 weeks (guided path)" },
        { label: "Format", value: "Assamese plus English practical lessons" },
        { label: "Level", value: "Beginner to intermediate" },
        { label: "Outcome", value: "Real workflow projects" },
      ];

  const curriculumRows = isAssamese
    ? [
        {
          module: "Module 1: AI basics + prompting",
          focus: "role, context, task, output format framework",
          output: "10 usable prompts",
        },
        {
          module: "Module 2: Productivity workflows",
          focus: "study, career, business daily use-case automation",
          output: "1 personal workflow pack",
        },
        {
          module: "Module 3: Quality and safety",
          focus: "fact-checking, risk filters, response correction loops",
          output: "review checklist",
        },
        {
          module: "Module 4: Portfolio execution",
          focus: "project-based implementation for real context",
          output: "2 portfolio-ready mini projects",
        },
      ]
    : [
        {
          module: "Module 1: AI basics and prompting",
          focus: "role, context, task, output-format framework",
          output: "10 usable prompts",
        },
        {
          module: "Module 2: Productivity workflows",
          focus: "study, career, and business use-case execution",
          output: "1 personal workflow pack",
        },
        {
          module: "Module 3: Quality and safety",
          focus: "fact-checking, risk filters, and correction loops",
          output: "review checklist",
        },
        {
          module: "Module 4: Portfolio execution",
          focus: "project implementation for your real scenario",
          output: "2 portfolio-ready mini projects",
        },
      ];

  const tracks = isAssamese
    ? [
        {
          title: "Student track",
          detail: "exam preparation, smart notes, revision workflows",
        },
        {
          title: "Career track",
          detail: "CV, interview, research, and communication workflows",
        },
        {
          title: "Business track",
          detail: "customer replies, offer copy, and operations automation",
        },
      ]
    : [
        {
          title: "Student track",
          detail: "exam preparation, smart notes, and revision workflows",
        },
        {
          title: "Career track",
          detail: "CV, interview, research, and communication workflows",
        },
        {
          title: "Business track",
          detail: "customer replies, offer copy, and operations automation",
        },
      ];

  const enrollmentSteps = isAssamese
    ? [
        "তলৰ form-ত enrollment interest submit কৰক।",
        "cohort schedule আৰু fee update email/SMS-এ পাব।",
        "slot confirm হ’লে onboarding instructions share কৰা হ’ব।",
      ]
    : [
        "Submit your enrollment interest in the form below.",
        "Receive cohort schedule and fee updates by email or SMS.",
        "When slots open, onboarding instructions will be shared.",
      ];

  const faqItems = isAssamese
    ? [
        {
          question: "এইটো সম্পূৰ্ণ online নেকি?",
          answer: "হয়। course flow mobile-friendly আৰু online delivery model-এ প্ৰস্তুত।",
        },
        {
          question: "আগতে coding জানিব লাগিবনে?",
          answer: "নালাগে। prompt-first workflow-এৰে আৰম্ভ কৰি gradual ভাৱে advanced module-লৈ যাব।",
        },
        {
          question: "এই course কাক বেছি fit?",
          answer: "student, working professional, creator, teacher আৰু small business owner-ৰ বাবে fit।",
        },
        {
          question: "certificate থাকিব নে?",
          answer: "cohort structure final হওঁতেই completion credential framework publish কৰা হ’ব।",
        },
      ]
    : [
        {
          question: "Is this fully online?",
          answer: "Yes. The course is designed as a mobile-friendly online learning format.",
        },
        {
          question: "Do I need coding before joining?",
          answer: "No. It starts with prompt-first workflows and gradually moves to advanced modules.",
        },
        {
          question: "Who is this course best for?",
          answer: "It is designed for students, professionals, creators, teachers, and small business owners.",
        },
        {
          question: "Will there be a certificate?",
          answer: "Completion credential details will be published with the final cohort structure.",
        },
      ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: isAssamese ? "অসমীয়াত AI Course | নমস্কাৰ AI" : "AI Course in Assamese | Namaskar AI",
    description: isAssamese
      ? "Assamese-first AI course: practical module, workflow project, আৰু guided execution path."
      : "Assamese-first practical AI course with workflow projects and guided execution path.",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    provider: {
      "@type": "Organization",
      name: "Namaskar AI",
      url: toAbsoluteSiteUrl(toLocalePath("/", language)),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAssamese ? "ঘৰ" : "Home",
        item: toAbsoluteSiteUrl(toLocalePath("/", language)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isAssamese ? "অসমীয়াত AI Course" : "AI Course in Assamese",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  const internalLinks = [
    { label: isAssamese ? "৩০ দিনৰ AI Plan" : "30-day AI plan", to: toLocalePath("/learn-ai-in-assamese-30-days", language) },
    { label: isAssamese ? "Best AI Course তুলনা" : "Best AI Course comparison", to: toLocalePath("/best-ai-course-for-assamese-speakers", language) },
    { label: isAssamese ? "AI Prompt Packs" : "AI Prompt Packs", to: toLocalePath("/prompt-packs", language) },
    { label: "FAQ", to: toLocalePath("/faq", language) },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "অসমীয়াত AI Course | নমস্কাৰ AI" : "AI Course in Assamese | Namaskar AI"}
        description={
          isAssamese
            ? "Assamese-first practical AI course: curriculum, module outcome, learning tracks, আৰু enrollment update একেটা পৃষ্ঠাত।"
            : "Assamese-first practical AI course with curriculum, outcomes, learning tracks, and enrollment details."
        }
        path={canonicalPath}
        language={language}
        keywords={["AI course in Assamese", "Assamese AI course", "AI training Assam", "Namaskar AI course"]}
        structuredData={[courseSchema, faqSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell">
          <Link to={toLocalePath("/", language)} className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home"}
          </Link>

          <Card className="platform-hero-card mb-6">
            <div className="relative z-10">
              <div className="platform-chip mb-2">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Program Blueprint" : "Program Blueprint"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "অসমীয়াত AI Course" : "AI Course in Assamese"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "এইটো Assamese-first full course overview পৃষ্ঠা। curriculum, track, আৰু enrollment flow স্পষ্টকৈ ইয়াত পাব।"
                  : "This is the complete Assamese-first course overview page with clear curriculum, tracks, and enrollment flow."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild>
                  <a href="#enrollment">{isAssamese ? "Enrollment update লওক" : "Get enrollment updates"}</a>
                </Button>
                <Button asChild variant="outline">
                  <Link to={toLocalePath("/learn-ai-in-assamese-30-days", language)}>
                    {isAssamese ? "৩০ দিনৰ plan খোলক" : "Open 30-day plan"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <Card className="h-fit border-primary/15 bg-card/95 p-4 lg:sticky lg:top-24">
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
                <ListChecks className="h-4 w-4 text-primary" />
                {isAssamese ? "Table of Contents" : "Table of Contents"}
              </div>
              <div className="space-y-2 text-sm">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    {item.label}
                  </a>
                ))}
              </div>
            </Card>

            <div className="space-y-5">
              <Card id="overview" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <BookOpenCheck className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Course overview" : "Course overview"}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isAssamese
                    ? "Assamese speaker-সকলৰ practical AI execution speed বঢ়াবলৈ এই course-টো structured module আৰু project-based design-এ প্ৰস্তুত।"
                    : "This course is designed to increase practical AI execution speed for Assamese speakers with structured modules and project-based work."}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item.label} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="mt-1 font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="curriculum" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <Target className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Curriculum" : "Curriculum"}</h2>
                </div>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left">
                      <tr>
                        <th className="px-3 py-2">{isAssamese ? "Module" : "Module"}</th>
                        <th className="px-3 py-2">{isAssamese ? "Focus" : "Focus"}</th>
                        <th className="px-3 py-2">{isAssamese ? "Output" : "Output"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {curriculumRows.map((row) => (
                        <tr key={row.module} className="border-t border-border">
                          <td className="px-3 py-2 font-medium">{row.module}</td>
                          <td className="px-3 py-2">{row.focus}</td>
                          <td className="px-3 py-2">{row.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card id="tracks" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <Users2 className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Learning tracks" : "Learning tracks"}</h2>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  {tracks.map((track) => (
                    <div key={track.title} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                      <p className="font-semibold">{track.title}</p>
                      <p className="mt-1 text-muted-foreground">{track.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="enrollment" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <CalendarDays className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Enrollment process" : "Enrollment process"}</h2>
                </div>
                <div className="space-y-2">
                  {enrollmentSteps.map((step, index) => (
                    <div key={step} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                      <span className="mr-2 font-semibold text-primary">{index + 1}.</span>
                      {step}
                    </div>
                  ))}
                </div>
              </Card>

              <CourseWaitlistForm language={language} />

              <Card className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">{isAssamese ? "Related learning pages" : "Related learning pages"}</h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {internalLinks.map((link) => (
                    <Button key={link.to} asChild variant="outline" className="justify-start">
                      <Link to={link.to}>
                        {link.label}
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Link>
                    </Button>
                  ))}
                </div>
              </Card>

              <Card id="faq" className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">FAQ</h2>
                <Accordion type="single" collapsible className="mt-3">
                  {faqItems.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default AICourseInAssamese;
