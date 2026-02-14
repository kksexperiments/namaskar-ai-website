import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock3, GraduationCap, ListChecks, Sparkles } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import CourseWaitlistForm from "@/components/CourseWaitlistForm";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const AICourseInAssamese = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";

  const tocItems = [
    { id: "overview", label: isAssamese ? "Course overview" : "Course overview" },
    { id: "who", label: isAssamese ? "কাৰ বাবে" : "Who it is for" },
    { id: "waitlist", label: isAssamese ? "Waitlist" : "Waitlist" },
    { id: "faq", label: "FAQ" },
  ];

  const outcomes = isAssamese
    ? [
        "Assamese-first prompt workflow",
        "Daily practical use-case execution",
        "Output quality review checklist",
        "Career, study, business use-case tracks",
      ]
    : [
        "Assamese-first prompt workflows",
        "Daily practical use-case execution",
        "Output quality review checklist",
        "Career, study, and business tracks",
      ];

  const faqItems = isAssamese
    ? [
        {
          question: "Course launch তাৰিখ ঘোষণা হৈছে নেকি?",
          answer: "এতিয়াও নহয়। এই পৃষ্ঠা coming soon আৰু waitlist notification-ৰ বাবে।",
        },
        {
          question: "Course online হ’বনে?",
          answer: "হয়, mobile-friendly format-ত Assamese audience-ৰ বাবে ডিজাইন কৰা হ’ব।",
        },
        {
          question: "Waitlist দিলে আপুনি কি পাব?",
          answer: "launch announcement, enrollment update, আৰু প্ৰথম access ৰ তথ্য।",
        },
      ]
    : [
        {
          question: "Is the launch date announced?",
          answer: "Not yet. This page is currently a coming-soon page with waitlist signup.",
        },
        {
          question: "Will the course be online?",
          answer: "Yes. It is planned as a mobile-friendly format for Assamese learners.",
        },
        {
          question: "What happens after joining the waitlist?",
          answer: "You receive launch announcement, enrollment update, and first-access details.",
        },
      ];

  const internalLinks = [
    { label: isAssamese ? "AI Prompt Packs" : "AI Prompt Packs", to: toLocalePath("/prompt-packs", language) },
    { label: isAssamese ? "AI Tools" : "AI Tools", to: toLocalePath("/ai-tools", language) },
    { label: isAssamese ? "Learning Roadmaps" : "Learning Roadmaps", to: toLocalePath("/learning-roadmaps", language) },
    { label: isAssamese ? "AI News" : "AI News", to: toLocalePath("/news", language) },
  ];

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "অসমীয়াত AI Course (Coming Soon) | নমস্কাৰ AI" : "AI Course in Assamese (Coming Soon) | Namaskar AI"}
        description={
          isAssamese
            ? "অসমীয়াত AI Course শীঘ্ৰেই আহিছে। launch notification পাবলৈ waitlist-ত নাম অন্তর্ভুক্ত কৰক।"
            : "AI Course in Assamese is coming soon. Join the waitlist to get launch notifications."
        }
        path={toLocalePath("/ai-course-in-assamese", language)}
        language={language}
        keywords={["AI course in Assamese", "Assamese AI course", "AI waitlist Assam", "Namaskar AI"]}
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
                <Clock3 className="mr-1.5 h-3.5 w-3.5" />
                {isAssamese ? "Coming Soon" : "Coming Soon"}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "অসমীয়াত AI Course" : "AI Course in Assamese"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "এইটো present course page নহয়। launch হওঁতেই আপুনি notification পাবলৈ তলৰ waitlist form submit কৰক।"
                  : "This is a coming-soon page. Join the waitlist below to be notified at launch."}
              </p>
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
                  <Sparkles className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "Course overview" : "Course overview"}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isAssamese
                    ? "Course-টো Assamese audience-ৰ practical scenario ধৰি design কৰা হৈছে যাতে আপুনি দিনদিনে AI ব্যৱহাৰ কৰি measurable ফল পাব পাৰে।"
                    : "This course is planned around practical Assamese audience scenarios so you can use AI daily and see measurable outcomes."}
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {outcomes.map((outcome) => (
                    <div key={outcome} className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
                      {outcome}
                    </div>
                  ))}
                </div>
              </Card>

              <Card id="who" className="border-primary/15 bg-card/95 p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-primary">
                  <GraduationCap className="h-4 w-4" />
                  <h2 className="text-xl font-semibold text-foreground">{isAssamese ? "কাৰ বাবে" : "Who it is for"}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isAssamese
                    ? "Aspirers (18-35), professionals, teachers, parents, small business owner আৰু Assamese-first learner-সকলৰ বাবে।"
                    : "Built for aspirers (18-35), professionals, teachers, parents, and small business owners who prefer Assamese-first learning."}
                </p>
              </Card>

              <div id="waitlist">
                <CourseWaitlistForm language={language} />
              </div>

              <Card className="border-primary/15 bg-card/95 p-5">
                <h2 className="text-xl font-semibold">{isAssamese ? "এতিয়াই শিকি থাকক" : "Continue learning now"}</h2>
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
