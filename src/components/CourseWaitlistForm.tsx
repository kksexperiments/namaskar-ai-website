import { FormEvent, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { Language } from "@/types/language";

interface CourseWaitlistFormProps {
  language: Language;
}

const RATE_LIMIT_MS = 60_000;
const MIN_TIME_TO_SUBMIT_MS = 3_000;
const LAST_SUBMIT_STORAGE_KEY = "namaskar-ai-course-waitlist-last-submit";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONSENT_TEXT = "We’ll only use this for course and enrollment updates. No spam.";

const normalizeIndiaMobile = (phoneInput: string): string | null => {
  const digits = phoneInput.replace(/\D/g, "");

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

const CourseWaitlistForm = ({ language }: CourseWaitlistFormProps) => {
  const { toast } = useToast();
  const location = useLocation();
  const pageLoadTimeRef = useRef(Date.now());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const copy = useMemo(() => {
    if (language === "as") {
      return {
        title: "Course updates list-ত যোগ দিয়ক",
        subtitle: "cohort schedule, enrollment window আৰু fee update পাব।",
        nameLabel: "নাম (ঐচ্ছিক)",
        namePlaceholder: "আপোনাৰ নাম",
        emailLabel: "ইমেইল (ঐচ্ছিক)",
        emailPlaceholder: "আপোনাৰ ইমেইল",
        phoneLabel: "ফোন (ঐচ্ছিক)",
        phonePlaceholder: "+91 9XXXXXXXXX",
        consentLabel: "মই course আৰু enrollment update পাবলৈ সন্মতি দিছোঁ।",
        submit: "Updates Submit কৰক",
        submitting: "Submit হৈ আছে...",
        success: "ধন্যবাদ। আপুনি course updates list-ত যোগ হ’ল।",
        failure: "এই মুহূর্তত submit কৰিব পৰা নগ’ল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।",
        requirementError: "ইমেইল বা ফোনৰ ভিতৰত কমেও এটা দিয়ক।",
        emailError: "অনুগ্ৰহ কৰি বৈধ ইমেইল দিয়ক।",
        phoneError: "অনুগ্ৰহ কৰি বৈধ ভাৰতীয় ১০-সংখ্যাৰ মোবাইল নম্বৰ দিয়ক।",
        consentError: "অগ্ৰসর হ’বলৈ consent দিব লাগিব।",
        minTimeError: "অনুগ্ৰহ কৰি কিছু সময় অপেক্ষা কৰি পুনৰ চেষ্টা কৰক।",
        rateLimitError: "অনুগ্ৰহ কৰি ১ মিনিট পিছত পুনৰ submit কৰক।",
        endpointError: "Waitlist endpoint configured নহয়।",
      };
    }

    return {
      title: "Join the Course Updates List",
      subtitle: "Get cohort, enrollment window, and fee updates.",
      nameLabel: "Name (optional)",
      namePlaceholder: "Your name",
      emailLabel: "Email (optional)",
      emailPlaceholder: "your@email.com",
      phoneLabel: "Phone (optional)",
      phonePlaceholder: "+91 9XXXXXXXXX",
      consentLabel: "I agree to receive course and enrollment updates.",
      submit: "Submit updates",
      submitting: "Submitting...",
      success: "Thanks. You have joined the course updates list.",
      failure: "Could not submit right now. Please try again.",
      requirementError: "Provide at least one of email or phone.",
      emailError: "Please enter a valid email address.",
      phoneError: "Please enter a valid Indian 10-digit mobile number.",
      consentError: "Consent is required to proceed.",
      minTimeError: "Please wait a moment and submit again.",
      rateLimitError: "Please wait 1 minute before submitting again.",
      endpointError: "Waitlist endpoint is not configured.",
    };
  }, [language]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (honeypot.trim().length > 0) {
      return;
    }

    if (Date.now() - pageLoadTimeRef.current < MIN_TIME_TO_SUBMIT_MS) {
      setErrorMessage(copy.minTimeError);
      return;
    }

    if (!consentChecked) {
      setErrorMessage(copy.consentError);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const rawPhone = phone.trim();

    if (!normalizedEmail && !rawPhone) {
      setErrorMessage(copy.requirementError);
      return;
    }

    if (normalizedEmail && !EMAIL_REGEX.test(normalizedEmail)) {
      setErrorMessage(copy.emailError);
      return;
    }

    const normalizedPhone = rawPhone ? normalizeIndiaMobile(rawPhone) : null;
    if (rawPhone && !normalizedPhone) {
      setErrorMessage(copy.phoneError);
      return;
    }

    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT?.trim();
    if (!endpoint) {
      setErrorMessage(copy.endpointError);
      return;
    }

    const now = Date.now();
    const lastSubmittedAt = Number(localStorage.getItem(LAST_SUBMIT_STORAGE_KEY) || "0");
    if (lastSubmittedAt && now - lastSubmittedAt < RATE_LIMIT_MS) {
      setErrorMessage(copy.rateLimitError);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        locale: language,
        page: location.pathname,
        name: name.trim(),
        email: normalizedEmail,
        phone_raw: rawPhone,
        phone_e164: normalizedPhone ?? "",
        consent: true,
        user_agent: navigator.userAgent,
        referrer: document.referrer || "",
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseBody: { ok?: boolean; error?: string } | null = null;
      try {
        responseBody = (await response.json()) as { ok?: boolean; error?: string };
      } catch {
        responseBody = null;
      }

      if (!response.ok || responseBody?.ok === false) {
        throw new Error(responseBody?.error || `HTTP ${response.status}`);
      }

      localStorage.setItem(LAST_SUBMIT_STORAGE_KEY, String(now));
      setSuccessMessage(copy.success);
      setName("");
      setEmail("");
      setPhone("");
      setConsentChecked(false);
      pageLoadTimeRef.current = Date.now();

      trackEvent("course_waitlist_submitted", {
        locale: language,
        page: location.pathname,
        has_email: Boolean(normalizedEmail),
        has_phone: Boolean(normalizedPhone),
      });

      toast({
        title: copy.success,
        description: CONSENT_TEXT,
      });
    } catch (error) {
      console.error("Waitlist submission failed:", error);
      setErrorMessage(copy.failure);
      trackEvent("course_waitlist_failed", {
        locale: language,
        page: location.pathname,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-card/95 p-5">
      <h2 className="text-xl font-semibold">{copy.title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{copy.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="hidden" aria-hidden="true">
          <Label htmlFor="company_website">Company website</Label>
          <Input
            id="company_website"
            name="company_website"
            type="text"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="waitlist-name">{copy.nameLabel}</Label>
            <Input
              id="waitlist-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={copy.namePlaceholder}
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlist-email">{copy.emailLabel}</Label>
            <Input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={copy.emailPlaceholder}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="waitlist-phone">{copy.phoneLabel}</Label>
          <Input
            id="waitlist-phone"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={copy.phonePlaceholder}
            disabled={submitting}
          />
        </div>

        <div className="rounded-lg border border-border bg-muted/35 p-3">
          <div className="flex items-start gap-3">
            <Checkbox
              id="waitlist-consent"
              checked={consentChecked}
              onCheckedChange={(value) => setConsentChecked(value === true)}
              disabled={submitting}
            />
            <div className="space-y-1">
              <Label htmlFor="waitlist-consent" className="text-sm font-medium leading-relaxed">
                {copy.consentLabel}
              </Label>
              <p className="text-xs text-muted-foreground">{CONSENT_TEXT}</p>
            </div>
          </div>
        </div>

        {errorMessage && (
          <p className="rounded-md border border-destructive/25 bg-destructive/10 p-3 text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700">
            {successMessage}
          </p>
        )}

        <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {copy.submitting}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {copy.submit}
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default CourseWaitlistForm;
