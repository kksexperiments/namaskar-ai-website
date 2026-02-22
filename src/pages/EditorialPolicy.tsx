import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EditorialPolicy = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/editorial-policy", language);

  const sourceTiers = isAssamese
    ? [
        { tier: "Tier 1", sources: "Official docs, product notes, policy pages", use: "Primary facts আৰু definitions" },
        { tier: "Tier 2", sources: "Research papers, standards bodies", use: "Methodology আৰু technical claims" },
        { tier: "Tier 3", sources: "Reputed media coverage", use: "Context, adoption signals, case references" },
      ]
    : [
        { tier: "Tier 1", sources: "Official docs, product notes, policy pages", use: "Primary facts and definitions" },
        { tier: "Tier 2", sources: "Research papers and standards bodies", use: "Methodology and technical claims" },
        { tier: "Tier 3", sources: "Reputed media coverage", use: "Context, adoption signals, and case references" },
      ];

  const workflow = isAssamese
    ? [
        "প্ৰথমে claim list কৰা হয় (কি কথা verify কৰিব লাগিব)।",
        "প্ৰতিটো claim-ৰ বাবে কমেও ১টা primary source আৰু ১টা supporting source verify কৰা হয়।",
        "regional context (Assam/India) পৃথককৈ mention কৰা হয় যাতে generalization নোহোৱা হয়।",
        "publish-পিছত নিয়মিত update আৰু correction log maintain কৰা হয়।",
      ]
    : [
        "We list all factual claims first (what must be verified).",
        "Each claim is validated against at least one primary and one supporting source.",
        "Assam/India context is separated from global context to avoid over-generalization.",
        "Post-publication updates and corrections are maintained as an explicit log.",
      ];

  const faqs = isAssamese
    ? [
        {
          question: "Namaskar AI-ৰ content কেনেকৈ verify কৰা হয়?",
          answer:
            "আমাৰ team claim-based checklist অনুসৰি official docs, research, আৰু reputed publications মিলাই verify কৰে।",
        },
        {
          question: "ভুল তথ্য দেখিলে কেনেকৈ report কৰিব পাৰিম?",
          answer:
            "আপুনি email-এ issue report কৰিব পাৰে। valid হ’লে correction priority basis-এ update কৰা হয়।",
        },
        {
          question: "content কিমান সঘনাই update হয়?",
          answer:
            "high-change topic (AI tools/pricing/policies) অধিক সঘনাই আৰু evergreen guide monthly/quarterly review-এ update হয়।",
        },
      ]
    : [
        {
          question: "How does Namaskar AI verify content?",
          answer:
            "We use a claim-by-claim checklist validated against official documentation, research, and reputable publications.",
        },
        {
          question: "How can I report an issue or factual error?",
          answer:
            "You can report it by email. Valid reports are corrected on priority and logged in our update trail.",
        },
        {
          question: "How frequently are pages updated?",
          answer:
            "Fast-changing topics (tools, pricing, policy) are checked more frequently; evergreen guides are reviewed monthly or quarterly.",
        },
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isAssamese ? "Editorial Policy | নমস্কাৰ AI" : "Editorial Policy | Namaskar AI",
    description: isAssamese
      ? "Namaskar AI-ৰ source standards, fact-check workflow, correction policy আৰু update cadence।"
      : "Namaskar AI source standards, fact-check workflow, correction policy, and update cadence.",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    url: toAbsoluteSiteUrl(canonicalPath),
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
        name: isAssamese ? "Editorial Policy" : "Editorial Policy",
        item: toAbsoluteSiteUrl(canonicalPath),
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "Editorial Policy | নমস্কাৰ AI" : "Editorial Policy | Namaskar AI"}
        description={
          isAssamese
            ? "Namaskar AI-ৰ source standards, fact-check workflow, correction policy আৰু update cadence।"
            : "Source standards, fact-check workflow, correction policy, and update cadence followed by Namaskar AI."
        }
        path={canonicalPath}
        language={language}
        keywords={[
          "Namaskar AI editorial policy",
          "AI content fact check Assam",
          "Assamese AI source standards",
          "AI correction policy",
        ]}
        structuredData={[pageSchema, faqSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell space-y-6">
          <Link
            to={toLocalePath("/", language)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home"}
          </Link>

          <Card className="platform-hero-card">
            <div className="relative z-10">
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">
                {isAssamese ? "Editorial Policy" : "Editorial Policy"}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                {isAssamese
                  ? "আমাৰ মূল নীতি: দ্ৰুত নহয়, reliable guidance। অসমীয়া learner-সকলৰ বাবে clear, practical আৰু verifiable AI তথ্য।"
                  : "Our core principle is reliability over speed. We publish clear, practical, and verifiable AI guidance for Assamese-first learners."}
              </p>
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <ShieldCheck className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "Source Standards" : "Source Standards"}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border/70">
                    <th className="px-3 py-2">{isAssamese ? "স্তৰ" : "Tier"}</th>
                    <th className="px-3 py-2">{isAssamese ? "উৎস" : "Source Type"}</th>
                    <th className="px-3 py-2">{isAssamese ? "ব্যৱহাৰ" : "How We Use It"}</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceTiers.map((row) => (
                    <tr key={row.tier} className="border-b border-border/40">
                      <td className="px-3 py-2 font-medium">{row.tier}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.sources}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-4 w-4" />
              <h2 className="text-xl font-semibold">
                {isAssamese ? "Fact-Check Workflow" : "Fact-Check Workflow"}
              </h2>
            </div>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <div className="mb-3 inline-flex items-center gap-2 text-primary">
              <RefreshCw className="h-4 w-4" />
              <h2 className="text-xl font-semibold">{isAssamese ? "Corrections & Updates" : "Corrections & Updates"}</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{isAssamese ? "ভুল/অসম্পূৰ্ণ তথ্য পালে correction note সহ update কৰা হয়।" : "Factual corrections are published with clear update notes."}</li>
              <li>{isAssamese ? "AI tool pricing/policy change হ’লে সংশ্লিষ্ট guide revise কৰা হয়।" : "Tool pricing/policy changes trigger page revisions."}</li>
              <li>{isAssamese ? "community feedback-ৰ ভিত্তিত FAQs আৰু examples refine কৰা হয়।" : "Community feedback is used to refine FAQs and practical examples."}</li>
            </ul>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-xl font-semibold">{isAssamese ? "FAQ" : "FAQ"}</h2>
            <Accordion type="single" collapsible className="mt-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`editorial-faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5 text-sm text-muted-foreground">
            {isAssamese ? "issue report বা correction request: hello@namaskar.ai" : "For issue reports or correction requests: hello@namaskar.ai"}
          </Card>
        </div>
      </main>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default EditorialPolicy;
