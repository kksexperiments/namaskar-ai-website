import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  BriefcaseBusiness,
  Clock3,
  Facebook,
  GraduationCap,
  Lock,
  PlayCircle,
  Send,
  Shield,
  Sparkles,
  Store,
  Users,
  Youtube,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/hooks/useLanguage";
import { toLocalePath } from "@/lib/locale";
import { toAbsoluteSiteUrl } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/leadCapture";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CourseInterest = "all" | "ai_basics" | "career" | "govt_jobs" | "business" | "teachers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ROADMAP_RATE_LIMIT_MS = 60_000;
const ROADMAP_MIN_TIME_TO_SUBMIT_MS = 3_000;
const ROADMAP_LAST_SUBMIT_STORAGE_KEY = "namaskar-learning-roadmaps-last-submit";
const TARGET_LAUNCH_IST = "2026-03-15T00:00:00+05:30";

const assameseDigitMap: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

const normalizeDigits = (value: string) =>
  value
    .split("")
    .map((char) => assameseDigitMap[char] ?? char)
    .join("");

const normalizeIndiaMobile = (phoneInput: string): string | null => {
  const digits = normalizeDigits(phoneInput).replace(/\D/g, "");

  let national = "";
  if (digits.length === 10) {
    national = digits;
  } else if (digits.length === 12 && digits.startsWith("91")) {
    national = digits.slice(2);
  } else {
    return null;
  }

  if (!/^[6-9]\d{9}$/.test(national)) {
    return null;
  }

  return `+91${national}`;
};

const getCountdown = () => {
  const now = Date.now();
  const target = new Date(TARGET_LAUNCH_IST).getTime();
  const delta = Math.max(0, target - now);

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((delta % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isLive: delta === 0 };
};

const LearningRoadmaps = () => {
  const { language, switchLanguage, t } = useLanguage();
  const isAssamese = language === "as";
  const canonicalPath = toLocalePath("/learning-roadmaps", language);
  const absolutePageUrl = toAbsoluteSiteUrl(canonicalPath);
  const youtubeChannelUrl = import.meta.env.VITE_YOUTUBE_CHANNEL_URL?.trim() || "https://www.youtube.com/@namaskarai";
  const pageLoadTimeRef = useRef(Date.now());

  const [countdown, setCountdown] = useState(() => getCountdown());
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseInterest>("all");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const courseOptions = useMemo(
    () => [
      { value: "all" as CourseInterest, as: "সকলো", en: "All" },
      { value: "ai_basics" as CourseInterest, as: "AI ৰ আৰম্ভণি", en: "AI Basics" },
      { value: "career" as CourseInterest, as: "কেৰিয়াৰত AI", en: "Career" },
      { value: "govt_jobs" as CourseInterest, as: "চৰকাৰী চাকৰিত AI", en: "Govt Jobs" },
      { value: "business" as CourseInterest, as: "সৰু ব্যৱসায়ত AI", en: "Business" },
      {
        value: "teachers" as CourseInterest,
        as: "শিক্ষক আৰু অভিভাৱকৰ বাবে AI",
        en: "Teachers",
      },
    ],
    [],
  );

  const roadmaps = isAssamese
    ? [
        {
          id: "ai_basics" as CourseInterest,
          icon: Bot,
          title: "১. AI ৰ আৰম্ভণি (Beginner’s AI)",
          benefits: [
            "AI কি, সহজ আৰু practical ভাষাত শিকিব।",
            "ChatGPT কেনেকৈ ব্যৱহাৰ কৰিব লাগে স্পষ্টকৈ বুজিব।",
            "দৈনন্দিন জীৱনত AI কেনেকৈ সহায় কৰে শিকিব।",
          ],
          teaser: "ভিডিঅ’ মাৰ্চ মাহত লাইভ হ’ব",
        },
        {
          id: "career" as CourseInterest,
          icon: BriefcaseBusiness,
          title: "২. কেৰিয়াৰত AI (AI for Career Growth)",
          benefits: [
            "CV optimize কৰিবলৈ AI workflow পাব।",
            "ইণ্টাৰভিউ প্রস্তুতিৰ বাবে prompt template শিকিব।",
            "LinkedIn profile আৰু outreach strategy উন্নত কৰিব।",
          ],
          teaser: "ভিডিঅ’ মাৰ্চ মাহত লাইভ হ’ব",
        },
        {
          id: "govt_jobs" as CourseInterest,
          icon: Shield,
          title: "৩. চৰকাৰী চাকৰিত AI (AI for Govt Jobs)",
          benefits: [
            "APSC/UPSC preparation-ত smart AI planning শিকিব।",
            "notes, revision আৰু mock answer workflow পাব।",
            "time-management আৰু daily target সহজ হ’ব।",
          ],
          teaser: "ভিডিঅ’ এপ্ৰিল মাহত লাইভ হ’ব",
        },
        {
          id: "business" as CourseInterest,
          icon: Store,
          title: "৪. সৰু ব্যৱসায়ত AI (AI for Small Business)",
          benefits: [
            "দোকান আৰু ব্যৱসায় বঢ়াবলৈ AI tool ব্যৱহাৰ শিকিব।",
            "customer reply আৰু offer copy দ্রুত লিখিব পাৰিব।",
            "দৈনিক marketing workflow সহজ হ’ব।",
          ],
          teaser: "ভিডিঅ’ মাৰ্চ মাহত লাইভ হ’ব",
        },
        {
          id: "teachers" as CourseInterest,
          icon: GraduationCap,
          title: "৫. শিক্ষক আৰু অভিভাৱকৰ বাবে AI (AI for Teachers & Parents)",
          benefits: [
            "হ’মৱৰ্ক explanation আৰু question bank সহজ কৰিব।",
            "পৰীক্ষাৰ প্রস্তুতিৰ বাবে smart checklist পাব।",
            "শিশুৰ শিকাৰ plan AI-ৰ সহায়ত সহজে গঠন কৰিব।",
          ],
          teaser: "ভিডিঅ’ এপ্ৰিল মাহত লাইভ হ’ব",
        },
      ]
    : [
        {
          id: "ai_basics" as CourseInterest,
          icon: Bot,
          title: "1. AI Basics (Beginner’s AI)",
          benefits: [
            "Understand what AI is in simple practical language.",
            "Learn how to use ChatGPT correctly from day one.",
            "Apply AI to everyday tasks with confidence.",
          ],
          teaser: "Video coming in March",
        },
        {
          id: "career" as CourseInterest,
          icon: BriefcaseBusiness,
          title: "2. Career in AI (AI for Career Growth)",
          benefits: [
            "Improve CV quality using AI workflows.",
            "Prepare for interviews with guided prompt templates.",
            "Upgrade LinkedIn and job outreach faster.",
          ],
          teaser: "Video coming in March",
        },
        {
          id: "govt_jobs" as CourseInterest,
          icon: Shield,
          title: "3. Govt Job AI (AI for Govt Jobs)",
          benefits: [
            "Use AI for APSC/UPSC preparation planning.",
            "Build note, revision, and mock-answer systems.",
            "Save time with focused daily exam workflows.",
          ],
          teaser: "Video coming in April",
        },
        {
          id: "business" as CourseInterest,
          icon: Store,
          title: "4. Small Business AI (AI for Small Business)",
          benefits: [
            "Use AI tools to grow shop and business operations.",
            "Write customer replies and offers quickly.",
            "Run simple daily marketing workflows with less effort.",
          ],
          teaser: "Video coming in March",
        },
        {
          id: "teachers" as CourseInterest,
          icon: GraduationCap,
          title: "5. Teachers Toolkit (AI for Teachers & Parents)",
          benefits: [
            "Simplify homework explanations with AI support.",
            "Create better test-prep checklists quickly.",
            "Build child-focused learning plans with confidence.",
          ],
          teaser: "Video coming in April",
        },
      ];

  const teaserVideos = isAssamese
    ? [
        {
          title: "AI ৰ আৰম্ভণি — Episode 1",
          subtitle: "Intro + ChatGPT setup",
        },
        {
          title: "কেৰিয়াৰত AI — Episode 1",
          subtitle: "CV + interview workflow",
        },
        {
          title: "সৰু ব্যৱসায়ত AI — Episode 1",
          subtitle: "Offer + customer reply flow",
        },
      ]
    : [
        {
          title: "AI Basics - Episode 1",
          subtitle: "Intro plus ChatGPT setup",
        },
        {
          title: "Career in AI - Episode 1",
          subtitle: "CV plus interview workflow",
        },
        {
          title: "Small Business AI - Episode 1",
          subtitle: "Offer plus customer reply flow",
        },
      ];

  const copy = {
    back: isAssamese ? "ঘৰলৈ উভতি যাওক" : "Back to home",
    heroTitle: isAssamese ? "শিকাৰ ৰোডমেপ — অসমীয়াত AI ৰ পূৰ্ণ যাত্ৰা" : "Learning Roadmaps - Full AI Journey in Assamese",
    heroLead: isAssamese ? "অসমীয়াত AI ৰ পূৰ্ণ যাত্ৰা আৰম্ভ হৈছে" : "The complete Assamese AI learning journey starts here.",
    heroTagline: isAssamese ? "প্ৰথম ক’ৰ্ছ ১৫ মাৰ্চত লাইভ" : "First course goes live on March 15",
    waitingBadge: "1,200+ learners waiting",
    joinWaitlist: isAssamese ? "Join Waitlist" : "Join Waitlist",
    lockedText: isAssamese ? "লক কৰা" : "Locked",
    videoSoon: isAssamese ? "Video coming soon" : "Video coming soon",
    cardButton: isAssamese ? "Waitlist Join কৰক" : "Join Waitlist",
    waitlistTitle: isAssamese ? "Waitlist Join কৰক" : "Join the Waitlist",
    waitlistDescription: isAssamese
      ? "ফৰ্মটো পূৰণ কৰক। আপুনি YouTube আৰু ইমেইলত প্ৰথমে আপডেট পাব।"
      : "Fill this form and get first updates on YouTube and email.",
    nameLabel: isAssamese ? "আপোনাৰ নাম" : "Your Name",
    phoneLabel: isAssamese ? "ফোন নম্বৰ" : "Phone Number",
    emailLabel: isAssamese ? "ইমেইল" : "Email",
    interestLabel: isAssamese ? "কোনটো ক’ৰ্ছত আগ্ৰহী?" : "Which course are you interested in?",
    submit: isAssamese ? "Submit" : "Submit",
    submitting: isAssamese ? "Submit হৈ আছে..." : "Submitting...",
    thankYou: "ধন্যবাদ! আপুনি প্ৰথমে জানিব পাৰিব। YouTube আৰু ইমেইলত নোটিফিকেচন পাব।",
    thankYouEn: "Thank you! You will get notified on YouTube & email.",
    nameError: isAssamese ? "অনুগ্ৰহ কৰি নাম লিখক।" : "Please enter your name.",
    phoneError: isAssamese
      ? "অনুগ্ৰহ কৰি বৈধ ফোন নম্বৰ দিয়ক (উদাহৰণ: +91 9876543210)।"
      : "Please enter a valid phone number (example: +91 9876543210).",
    emailError: isAssamese ? "অনুগ্ৰহ কৰি বৈধ ইমেইল দিয়ক।" : "Please enter a valid email address.",
    requirementError: isAssamese ? "ইমেইল বা ফোনৰ ভিতৰত কমেও এটা দিয়ক।" : "Provide at least one of email or phone.",
    minTimeError: isAssamese ? "অনুগ্ৰহ কৰি কিছু সময় অপেক্ষা কৰি পুনৰ চেষ্টা কৰক।" : "Please wait a moment and submit again.",
    rateLimitError: isAssamese ? "অনুগ্ৰহ কৰি ১ মিনিট পিছত পুনৰ submit কৰক।" : "Please wait 1 minute before submitting again.",
    teaserTitle: isAssamese ? "মোৰ YouTube Series (Teaser)" : "Upcoming Series",
    teaserLead: "AI in Assamese — Coming Soon",
    teaserSub: isAssamese
      ? "Subscribe কৰক যাতে নতুন ভিডিঅ’ৰ নোটিফিকেচন পায়।"
      : "Subscribe to get notified when new videos drop.",
    subscribe: isAssamese ? "Subscribe কৰক" : "Subscribe",
    movementLine: "Courses coming soon — Join the movement",
    brandLine: "Namaskar AI — অসমীয়াৰ বাবে AI। সকলো ক’ৰ্ছ বিনামূলীয়া হ’ব।",
    shareText: isAssamese ? "পৃষ্ঠাটো share কৰক" : "Share this page",
    launchLive: isAssamese ? "ক’ৰ্ছ লাইভ হৈছে" : "Course is live",
  };

  const openWaitlist = (course: CourseInterest) => {
    setSelectedCourse(course);
    setErrorMessage(null);
    setSuccessMessage(null);
    setWaitlistOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (honeypot.trim().length > 0) {
      return;
    }

    if (Date.now() - pageLoadTimeRef.current < ROADMAP_MIN_TIME_TO_SUBMIT_MS) {
      setErrorMessage(copy.minTimeError);
      return;
    }

    const trimmedName = name.trim();
    const normalizedPhone = normalizeIndiaMobile(phone);
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setErrorMessage(copy.nameError);
      return;
    }

    if (!normalizedEmail && !phone.trim()) {
      setErrorMessage(copy.requirementError);
      return;
    }

    if (phone.trim() && !normalizedPhone) {
      setErrorMessage(copy.phoneError);
      return;
    }

    if (normalizedEmail && !EMAIL_REGEX.test(normalizedEmail)) {
      setErrorMessage(copy.emailError);
      return;
    }

    const now = Date.now();
    const lastSubmittedAt = Number(localStorage.getItem(ROADMAP_LAST_SUBMIT_STORAGE_KEY) || "0");
    if (lastSubmittedAt && now - lastSubmittedAt < ROADMAP_RATE_LIMIT_MS) {
      setErrorMessage(copy.rateLimitError);
      return;
    }

    setSubmitting(true);

    const selectedLabel = courseOptions.find((item) => item.value === selectedCourse);
    const payload = {
      timestamp: new Date().toISOString(),
      locale: language,
      page: canonicalPath,
      source: "learning-roadmaps-coming-soon",
      name: trimmedName,
      phone_raw: phone.trim(),
      phone_e164: normalizedPhone ?? "",
      email: normalizedEmail,
      course_interest: selectedCourse,
      course_interest_label: selectedLabel ? (isAssamese ? selectedLabel.as : selectedLabel.en) : selectedCourse,
      consent: true,
      user_agent: navigator.userAgent,
      referrer: document.referrer || "",
    };

    try {
      const result = await submitLead({
        endpoint: import.meta.env.VITE_WAITLIST_ENDPOINT?.trim(),
        endpointPayload: payload,
        fallbackTable: "waitlist_fallback_submissions",
        fallbackPayload: {
          source: payload.source,
          locale: payload.locale,
          page: payload.page,
          name: payload.name,
          email: payload.email,
          phone_raw: payload.phone_raw,
          phone_e164: payload.phone_e164,
          course_interest: payload.course_interest,
          course_interest_label: payload.course_interest_label,
          consent: payload.consent,
          user_agent: payload.user_agent,
          referrer: payload.referrer,
          payload,
        },
      });

      if (!result.ok) {
        throw new Error(result.error || "Waitlist submission failed.");
      }

      trackEvent("learning_roadmap_waitlist_submitted", {
        locale: language,
        course_interest: selectedCourse,
      });

      setSuccessMessage(isAssamese ? copy.thankYou : copy.thankYouEn);
      setName("");
      setPhone("");
      setEmail("");
      setHoneypot("");
      setSelectedCourse("all");
      localStorage.setItem(ROADMAP_LAST_SUBMIT_STORAGE_KEY, String(now));
      pageLoadTimeRef.current = Date.now();
    } catch (error) {
      setErrorMessage(isAssamese ? "এতিয়া submit কৰিব পৰা নগ'ল। অনুগ্ৰহ কৰি আকৌ চেষ্টা কৰক।" : "Could not submit right now. Please try again.");
      trackEvent("learning_roadmap_waitlist_failed", {
        locale: language,
        course_interest: selectedCourse,
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const shareText = encodeURIComponent(
    isAssamese
      ? "নমস্কাৰ AI-ৰ শিকাৰ ৰোডমেপ পৃষ্ঠা চাওক।"
      : "Check out Namaskar AI Learning Roadmaps page.",
  );
  const shareUrl = encodeURIComponent(absolutePageUrl);
  const whatsappShareUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

  const bihuPatternStyle = {
    backgroundImage:
      "radial-gradient(circle at 18% 20%, rgba(120, 170, 135, 0.22), transparent 44%), radial-gradient(circle at 85% 15%, rgba(177, 211, 162, 0.24), transparent 42%), repeating-linear-gradient(45deg, rgba(142, 184, 149, 0.08) 0, rgba(142, 184, 149, 0.08) 2px, transparent 2px, transparent 14px)",
  };

  const countdownBlocks = [
    { label: isAssamese ? "দিন" : "Days", value: countdown.days },
    { label: isAssamese ? "ঘণ্টা" : "Hours", value: countdown.hours },
    { label: isAssamese ? "মিনিট" : "Minutes", value: countdown.minutes },
    { label: isAssamese ? "ছেকেণ্ড" : "Seconds", value: countdown.seconds },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: isAssamese ? "as-IN" : "en-IN",
    mainEntity: [
      {
        "@type": "Question",
        name: isAssamese ? "প্ৰথম ক’ৰ্ছ কেতিয়া লাইভ হ’ব?" : "When is the first course going live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isAssamese ? "প্ৰথম ক’ৰ্ছ ১৫ মাৰ্চত লাইভ হ’ব।" : "The first course goes live on March 15.",
        },
      },
      {
        "@type": "Question",
        name: isAssamese ? "ক’ৰ্ছসমূহৰ মূল্য কিমান?" : "Will these courses be free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isAssamese ? "সকলো ক’ৰ্ছ বিনামূলীয়া হ’ব।" : "Yes, all courses will be free.",
        },
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
        item: toAbsoluteSiteUrl(toLocalePath("/", language)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isAssamese ? "শিকাৰ ৰোডমেপ" : "Learning Roadmaps",
        item: absolutePageUrl,
      },
    ],
  };

  return (
    <div className="platform-page">
      <Seo
        title={isAssamese ? "শিকাৰ ৰোডমেপ | নমস্কাৰ AI" : "Learning Roadmaps | Namaskar AI"}
        description={
          isAssamese
            ? "অসমীয়াত AI ৰ পূৰ্ণ যাত্ৰা। প্ৰথম ক’ৰ্ছ ১৫ মাৰ্চত লাইভ। waitlist-ত যোগ দি YouTube আৰু ইমেইল আপডেট লওক।"
            : "Complete Assamese AI roadmap hub. First course goes live on March 15. Join the waitlist for YouTube and email updates."
        }
        path={canonicalPath}
        language={language}
        keywords={[
          "AI learning roadmap Assamese",
          "AI course in Assamese coming soon",
          "Assamese AI YouTube series",
          "Namaskar AI waitlist",
        ]}
        structuredData={[faqSchema, breadcrumbSchema]}
      />

      <Header currentLanguage={language} onLanguageChange={switchLanguage} t={t} />

      <main className="pb-16 pt-8">
        <div className="platform-shell space-y-6">
          <Link
            to={toLocalePath("/", language)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>

          <Card className="relative overflow-hidden border-primary/20 bg-[linear-gradient(130deg,hsl(var(--card)),rgba(192,228,199,0.22),rgba(212,238,201,0.18))] p-6 shadow-elegant sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-80" style={bihuPatternStyle} />
            <div className="relative z-10">
              <div className="mb-3 inline-flex items-center rounded-full border border-primary/25 bg-card/85 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {copy.heroLead}
              </div>
              <h1 className="text-3xl font-poppins font-bold gradient-text sm:text-4xl">{copy.heroTitle}</h1>
              <p className="mt-3 text-base text-muted-foreground">{copy.heroTagline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge className="bg-primary/90 text-primary-foreground">{copy.waitingBadge}</Badge>
                {countdown.isLive ? (
                  <Badge variant="secondary">{copy.launchLive}</Badge>
                ) : (
                  <Badge variant="secondary">{isAssamese ? "Countdown আৰম্ভ হৈছে" : "Countdown running"}</Badge>
                )}
              </div>

              {!countdown.isLive ? (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {countdownBlocks.map((item) => (
                    <div key={item.label} className="rounded-xl border border-primary/20 bg-card/85 p-3 text-center">
                      <p className="text-2xl font-bold text-foreground">{String(item.value).padStart(2, "0")}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <Button className="bg-gradient-primary px-6 text-white" onClick={() => openWaitlist("all")}>
                  {copy.joinWaitlist}
                </Button>
                <Button asChild variant="outline">
                  <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">
                    <Youtube className="mr-2 h-4 w-4" />
                    {copy.subscribe}
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-2xl font-semibold text-foreground">
              {isAssamese ? "আমাৰ পৰিকল্পিত ৰোডমেপসমূহ" : "Planned Roadmaps"}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {roadmaps.map((roadmap) => (
                <Card
                  key={roadmap.title}
                  className="relative flex h-full flex-col border-primary/20 bg-[linear-gradient(150deg,hsl(var(--card)),rgba(188,221,186,0.14),rgba(216,238,208,0.12))] p-4 shadow-card"
                >
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    <Lock className="h-3 w-3" />
                    {copy.lockedText}
                  </div>

                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <roadmap.icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-semibold leading-snug">{roadmap.title}</h3>
                  <div className="mt-3 space-y-2">
                    {roadmap.benefits.map((line) => (
                      <p key={line} className="rounded-md border border-border bg-muted/35 px-2.5 py-2 text-sm leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary/90">
                    <Clock3 className="h-3.5 w-3.5" />
                    {roadmap.teaser}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{copy.videoSoon}</p>

                  <Button className="mt-4 bg-gradient-primary text-white" onClick={() => openWaitlist(roadmap.id)}>
                    <Lock className="mr-2 h-4 w-4" />
                    {copy.cardButton}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="border-primary/15 bg-card/95 p-5">
            <h2 className="text-2xl font-semibold">{copy.teaserTitle}</h2>
            <p className="mt-2 text-base text-muted-foreground">{copy.teaserLead}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {teaserVideos.map((video) => (
                <div key={video.title} className="rounded-xl border border-primary/20 bg-card/85 p-3">
                  <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-[linear-gradient(135deg,rgba(160,201,168,0.35),rgba(123,173,138,0.35),rgba(206,232,191,0.4))]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/90" />
                    </div>
                    <div className="absolute bottom-2 left-2 rounded bg-black/55 px-2 py-1 text-[11px] text-white">
                      {isAssamese ? "Coming soon" : "Coming soon"}
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{video.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{video.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button asChild className="bg-gradient-primary text-white">
                <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">
                  <Youtube className="mr-2 h-4 w-4" />
                  {copy.subscribe}
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">{copy.teaserSub}</p>
            </div>
          </Card>

          <Card className="border-primary/20 bg-[linear-gradient(145deg,hsl(var(--card)),rgba(183,219,179,0.2),rgba(205,233,197,0.16))] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold">{copy.movementLine}</p>
                <p className="mt-1 text-sm text-muted-foreground">{copy.brandLine}</p>
              </div>
              <Badge variant="secondary" className="inline-flex w-fit items-center gap-1 text-xs">
                <Users className="h-3.5 w-3.5" />
                {copy.waitingBadge}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{copy.shareText}</span>
              <Button asChild size="sm" variant="outline">
                <a href={whatsappShareUrl} target="_blank" rel="noreferrer">
                  <Send className="mr-1 h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={xShareUrl} target="_blank" rel="noreferrer">
                  X
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={facebookShareUrl} target="_blank" rel="noreferrer">
                  <Facebook className="mr-1 h-3.5 w-3.5" />
                  Facebook
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Dialog open={waitlistOpen} onOpenChange={setWaitlistOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-primary/20">
          <DialogHeader>
            <DialogTitle>{copy.waitlistTitle}</DialogTitle>
            <DialogDescription>{copy.waitlistDescription}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="hidden" aria-hidden="true">
              <Label htmlFor="roadmap-company_website">Company website</Label>
              <Input
                id="roadmap-company_website"
                name="company_website"
                type="text"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roadmap-waitlist-name">{copy.nameLabel}</Label>
              <Input
                id="roadmap-waitlist-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={isAssamese ? "আপোনাৰ নাম লিখক" : "Enter your name"}
                disabled={submitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roadmap-waitlist-phone">{copy.phoneLabel}</Label>
              <Input
                id="roadmap-waitlist-phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={isAssamese ? "+91 ৯৮৭৬৫৪৩২১০" : "+91 9876543210"}
                inputMode="tel"
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roadmap-waitlist-email">{copy.emailLabel}</Label>
              <Input
                id="roadmap-waitlist-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={isAssamese ? "আপোনাৰ ইমেইল লিখক" : "Enter your email"}
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roadmap-waitlist-interest">{copy.interestLabel}</Label>
              <select
                id="roadmap-waitlist-interest"
                value={selectedCourse}
                onChange={(event) => setSelectedCourse(event.target.value as CourseInterest)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                disabled={submitting}
              >
                {courseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {isAssamese ? option.as : option.en}
                  </option>
                ))}
              </select>
            </div>

            {errorMessage ? (
              <p className="rounded-md border border-destructive/25 bg-destructive/10 p-3 text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700">
                {successMessage}
              </p>
            ) : null}

            <Button type="submit" className="w-full bg-gradient-primary text-white" disabled={submitting}>
              {submitting ? copy.submitting : copy.submit}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer currentLanguage={language} onLanguageChange={switchLanguage} t={t} />
    </div>
  );
};

export default LearningRoadmaps;
