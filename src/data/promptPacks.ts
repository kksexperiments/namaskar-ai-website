export type PromptCategory =
  | "career_and_jobs"
  | "study_and_skills"
  | "business_and_income"
  | "teachers_and_training"
  | "parents_and_family"
  | "government_and_office"
  | "content_and_growth";

export interface PromptCopy {
  as: string;
  en: string;
}

export interface PromptPack {
  id: string;
  category: PromptCategory | string;
  tags: string[];
  title: PromptCopy;
  prompt: PromptCopy;
}

export const PROMPT_CATEGORY_LABELS: Record<PromptCategory, PromptCopy> = {
  career_and_jobs: {
    as: "কৰ্মজীৱন আৰু চাকৰি",
    en: "Career and Jobs",
  },
  study_and_skills: {
    as: "পঢ়া-শুনা আৰু দক্ষতা",
    en: "Study and Skills",
  },
  business_and_income: {
    as: "ব্যৱসায় আৰু আয়",
    en: "Business and Income",
  },
  teachers_and_training: {
    as: "শিক্ষক আৰু প্ৰশিক্ষণ",
    en: "Teachers and Training",
  },
  parents_and_family: {
    as: "অভিভাৱক আৰু পৰিয়াল",
    en: "Parents and Family",
  },
  government_and_office: {
    as: "চৰকাৰী/অফিচ কাম",
    en: "Government and Office",
  },
  content_and_growth: {
    as: "কনটেন্ট আৰু গ্ৰ'থ",
    en: "Content and Growth",
  },
};

export const LOCAL_PROMPT_PACKS: PromptPack[] = [
  {
    id: "career-30-day-roadmap",
    category: "career_and_jobs",
    tags: ["career", "beginner", "roadmap", "ai"],
    title: {
      as: "৩০ দিনৰ AI কৰ্মজীৱন আৰম্ভণি ৰোডমেপ",
      en: "30-Day AI Career Starter Roadmap",
    },
    prompt: {
      as: `আপুনি এজন বাস্তৱমুখী AI Career Coach হিচাপে কাম কৰক। মই নতুন আৰু টেকনিকেল পটভূমি শক্তিশালী নহয়।

মোৰ তথ্য:
- বয়স: [বয়স]
- বৰ্তমান অৱস্থা (student/job/freelancer): [অৱস্থা]
- দৈনিক সময়: [সময়]
- বাজেট: [বাজেট]
- লক্ষ্য: [লক্ষ্য]

অনুগ্ৰহ কৰি এই ফৰ্মেটত উত্তৰ দিয়ক:
1) ৩০ দিনৰ Stage-wise প্লান (Week 1/2/3/4)
2) প্ৰতিদিনে ৩০-৬০ মিনিটে কি কি কৰিব
3) ফ্ৰী বা Low-cost tools তালিকা
4) ২টা Mini project যি Instagram/LinkedIn-ত দেখুৱাব পাৰি
5) এই পথত সাধাৰণ ভুলবোৰ আৰু কেনেকৈ এৰাব
6) শেষত "আজিৰ প্ৰথম ২০ মিনিট" টাস্ক

নিয়ম:
- সহজ অসমীয়াত লিখিব, প্ৰয়োজন হ’লে English tech term ব্যৱহাৰ কৰিব পাৰে
- আপুনি/আপোনাৰ সম্বোধন বজাই ৰাখিব
- অতিৰিক্ত তত্ত্ব নহয়, কেবল কৰণীয় ধাপ দিব`,
      en: `Act as a practical AI Career Coach for a beginner with low technical confidence.

My details:
- Age: [age]
- Current status (student/job/freelancer): [status]
- Daily available time: [time]
- Budget: [budget]
- Goal: [goal]

Please respond in this format:
1) 30-day stage-wise plan (Week 1/2/3/4)
2) Daily 30-60 minute action list
3) Free or low-cost tools
4) Two mini projects to showcase on Instagram/LinkedIn
5) Common mistakes and how to avoid them
6) “First 20 minutes today” action

Rules:
- Keep it simple and practical
- Avoid heavy theory
- Include clear next actions`,
    },
  },
  {
    id: "career-skill-gap-plan",
    category: "career_and_jobs",
    tags: ["skill-gap", "planning", "upskilling"],
    title: {
      as: "Skill Gap বিশ্লেষণ আৰু সাপ্তাহিক উন্নতি পৰিকল্পনা",
      en: "Skill Gap Analysis and Weekly Improvement Plan",
    },
    prompt: {
      as: `আপুনি এজন Skill Strategist। মোৰ লক্ষ্যপদ হৈছে [লক্ষ্যপদ], কিন্তু মোৰ দক্ষতা আৰু অভিজ্ঞতা সীমিত।

বৰ্তমান দক্ষতা:
[দক্ষতা তালিকা]

অনুগ্ৰহ কৰি:
1) লক্ষ্যপদৰ বাবে Top 10 দক্ষতা টেবুলত দেখুৱাওক
2) মোৰ দক্ষতাক Beginner/Intermediate/Strong হিচাপে মেপ কৰক
3) Gap থকা দক্ষতাৰ বাবে ৬ সপ্তাহৰ প্লান
4) প্ৰতিসপ্তাহে ১টা measurable output (যেনে: project, post, CV update)
5) ১০০% ফ্ৰী resource দিয়ে আৰম্ভণি path

ভাষা আৰু tone:
- আশ্বাসমূলক, মানসিক চাপ কমোৱা ভঙ্গী
- "আপুনি পাৰিব" ধৰণৰ practical guidance
- অসমীয়াত ব্যাখ্যা, English keyword bracket-ত`,
      en: `You are a Skill Strategist. My target role is [target role], but my current skills are limited.

Current skills:
[skill list]

Please provide:
1) A table of top 10 skills needed for the target role
2) A mapping of my level (Beginner/Intermediate/Strong)
3) A 6-week plan to close major gaps
4) One measurable output per week (project/post/CV update)
5) A free-resource-first path

Tone:
- Reassuring and practical
- Low stress, high clarity`,
    },
  },
  {
    id: "job-resume-upgrade",
    category: "career_and_jobs",
    tags: ["resume", "job", "cv", "first-job"],
    title: {
      as: "চাকৰিৰ বাবে Resume/CV শক্তিশালী কৰক",
      en: "Upgrade Resume/CV for Job Applications",
    },
    prompt: {
      as: `আপুনি এজন Resume Expert। এই চাকৰিৰ বিবৰণ (JD) আৰু মোৰ বৰ্তমান Resume অনুসৰি নতুন Resume লিখক।

Job Description:
[JD paste]

Current Resume:
[Resume paste]

আউটপুট:
1) 6-second scan pass কৰিব পৰা হেডলাইন
2) Professional summary (৪-৫ লাইন)
3) Skills section (JD মিল থকা keyword সহ)
4) Experience bullets - STAR format, quantifiable language
5) Freshers হ’লে project-based experience format
6) ATS-friendly plain text version
7) Cover letter opening ৩টা ভিন্ন style-ত

নিয়ম:
- অতি fancy language নহয়
- বাস্তৱভিত্তিক আৰু honest wording
- অসমীয়াত ব্যাখ্যা, final resume English-ত দিব`,
      en: `Act as a Resume Expert. Rewrite my resume based on this Job Description and current CV.

Job Description:
[paste JD]

Current Resume:
[paste resume]

Output:
1) 6-second-scan headline
2) Professional summary (4-5 lines)
3) Skills section aligned to JD keywords
4) Experience bullets in STAR style with measurable impact
5) If fresher: project-based experience structure
6) ATS-friendly plain text version
7) 3 opening options for a cover letter

Rules:
- Keep language realistic and credible
- Avoid fluff`,
    },
  },
  {
    id: "job-interview-coach",
    category: "career_and_jobs",
    tags: ["interview", "mock", "communication"],
    title: {
      as: "Interview Mock Coach (ভয় কমাও, উত্তৰ সাজু কৰক)",
      en: "Interview Mock Coach (Reduce Fear, Prepare Answers)",
    },
    prompt: {
      as: `আপুনি এজন Interview Coach। মই [role] পজিচনৰ interview দিবলৈ ওলাইছোঁ। মোৰ ভয় হৈছে [ভয় লিখক]।

মোৰ background:
[সংক্ষিপ্ত background]

এই কামবোৰ কৰক:
1) ১৫টা সম্ভাব্য interview question (easy → hard)
2) প্ৰতিটোৰ model answer - সহজ, natural, অহংকাৰবিহীন
3) "Tell me about yourself" ৰ 30-sec আৰু 90-sec version
4) interviewer-লৈ আমি সুধিব পৰা ৮টা ভাল question
5) body language + voice + pause quick checklist
6) Interview আগৰ ২৪ ঘন্টাৰ prep plan

গুৰুত্বপূৰ্ণ:
- Assamese explanation
- simple English lines where needed
- tone: warm, respectful, confidence-building`,
      en: `You are an Interview Coach. I’m preparing for a [role] interview. My major fear is [fear].

Background:
[short background]

Do the following:
1) 15 likely interview questions (easy to hard)
2) Model answers for each (natural, credible, non-arrogant)
3) “Tell me about yourself” in 30-sec and 90-sec versions
4) 8 smart questions I should ask the interviewer
5) Quick checklist for body language, voice, and pauses
6) 24-hour pre-interview prep plan

Tone: warm, practical, confidence-building.`,
    },
  },
  {
    id: "study-chapter-simplifier",
    category: "study_and_skills",
    tags: ["study", "exam", "notes", "assamese"],
    title: {
      as: "Chapter-to-Notes Simplifier (অসমীয়াত সহজ বুজাব)",
      en: "Chapter-to-Notes Simplifier",
    },
    prompt: {
      as: `আপুনি এজন Study Assistant। তলৰ chapter-টো Assamese-friendly language-ত exam-ready notes কৰি দিয়ক।

Chapter/Text:
[paste text]

আউটপুট format:
1) ১০ লাইনৰ easy summary
2) মূল concept তালিকা (simple উদাহৰণ সহ)
3) Important terms: English term + Assamese explanation
4) Top 20 probable questions (short + long)
5) দ্ৰুত revision cheat sheet (১ পৃষ্ঠা)
6) ৫ মিনিট voice-revision script

নিয়ম:
- তথ্য সলনি নকৰাকৈ সহজ কৰি বুজাওক
- bullet point heavy, mobile-friendly
- আপুনি/আপোনাৰ ভদ্ৰ সম্বোধন বজাই ৰাখিব`,
      en: `Act as a Study Assistant. Convert the following chapter into exam-ready notes.

Chapter/Text:
[paste text]

Output format:
1) 10-line easy summary
2) Core concepts with simple examples
3) Important terms: English term + simple explanation
4) Top 20 probable exam questions (short + long)
5) One-page quick revision cheat sheet
6) 5-minute voice-revision script

Rules:
- Keep meaning accurate
- Keep structure mobile-friendly`,
    },
  },
  {
    id: "study-daily-accountability",
    category: "study_and_skills",
    tags: ["daily-plan", "students", "discipline"],
    title: {
      as: "দৈনিক পঢ়া Accountability Coach",
      en: "Daily Study Accountability Coach",
    },
    prompt: {
      as: `আপুনি মোৰ Daily Study Accountability Coach।

মোৰ লক্ষ্য:
[goal]

মোৰ পৰিস্থিতি:
- দৈনিক সময়: [time]
- কমজোৰ বিষয়: [subjects]
- distraction: [issues]

মোক এই ফৰ্মেটত plan দিয়ক:
1) ৭ দিনৰ realistic study schedule
2) প্ৰতি দিনে top ৩ priority task
3) Pomodoro count আৰু break plan
4) Daily self-check template (yes/no + score)
5) পিছপৰা দিন recover কৰাৰ fallback plan
6) দিনৰ শেষত মিছা নোহোৱা progress report format

tone:
- কঠোৰ নহয়, সহযোগী
- confidence আৰু consistency বঢ়োৱা`,
      en: `You are my Daily Study Accountability Coach.

Goal:
[goal]

Context:
- Time available per day: [time]
- Weak subjects: [subjects]
- Main distractions: [issues]

Provide:
1) A realistic 7-day schedule
2) Top 3 daily priorities
3) Pomodoro and break plan
4) Daily self-check template (yes/no + score)
5) Recovery plan for missed days
6) Honest end-of-day progress report format

Tone: supportive, practical, consistency-focused.`,
    },
  },
  {
    id: "business-small-shop-sales",
    category: "business_and_income",
    tags: ["business", "sales", "local-shop", "whatsapp"],
    title: {
      as: "ছোট দোকানৰ বিক্ৰী বৃদ্ধি Action Plan",
      en: "Small Shop Sales Growth Action Plan",
    },
    prompt: {
      as: `আপুনি এজন Local Business Growth Advisor। মোৰ দোকান/ব্যৱসায়ৰ তথ্য তলত দিছোঁ।

ব্যৱসায়:
[দোকানৰ ধৰণ]
স্থান:
[লোকেশন]
বৰ্তমান সমস্যা:
[সমস্যা]

অনুগ্ৰহ কৰি:
1) ৩০ দিনৰ বিক্ৰী বৃদ্ধি plan
2) Low-cost marketing idea (WhatsApp, local groups, referral)
3) Daily, weekly, monthly KPI
4) Assamese + English mix-ত ১০টা customer offer line
5) Repeat customer বৃদ্ধি strategy
6) ভুল কমাবলৈ billing/stock simple template

নিয়ম:
- বাস্তৱসম্মত
- কম ডাটা/কম বাজেট friendy
- অহংকাৰবিহীন, বুজিব পৰা ভাষা`,
      en: `Act as a Local Business Growth Advisor.

Business type: [type]
Location: [location]
Current problems: [problems]

Provide:
1) 30-day sales growth plan
2) Low-cost marketing ideas (WhatsApp/local groups/referrals)
3) Daily/weekly/monthly KPIs
4) 10 customer offer lines (Assamese + English mix style)
5) Repeat-customer strategy
6) Simple billing/stock template to reduce mistakes

Keep it practical and low-budget friendly.`,
    },
  },
  {
    id: "business-whatsapp-replies",
    category: "business_and_income",
    tags: ["whatsapp", "customer-support", "templates"],
    title: {
      as: "WhatsApp Customer Reply Template Generator",
      en: "WhatsApp Customer Reply Template Generator",
    },
    prompt: {
      as: `আপুনি মোৰ WhatsApp Customer Communication Assistant।

ব্যৱসায়ৰ ধৰণ: [type]
সাধাৰণ customer question:
[questions]

মোৰ বাবে template লিখক:
1) Greeting + trust-building opener (১০টা)
2) Price inquiry reply (ভদ্ৰ আৰু স্পষ্ট)
3) Delivery delay apology reply
4) Out-of-stock alternative suggestion
5) Payment reminder (soft tone)
6) Feedback অনুৰোধ message
7) Angry customer de-escalation script

নিয়ম:
- সন্মানজনক language
- আপুনি/আপোনাৰ টোন
- copy-paste ready short format`,
      en: `You are my WhatsApp Customer Communication Assistant.

Business type: [type]
Common customer questions:
[questions]

Create templates for:
1) Greeting and trust-building opener (10 options)
2) Price inquiry response
3) Delivery delay apology
4) Out-of-stock alternative suggestion
5) Soft payment reminder
6) Feedback request
7) Angry-customer de-escalation response

Make all templates short, respectful, and copy-paste ready.`,
    },
  },
  {
    id: "teacher-lesson-plan",
    category: "teachers_and_training",
    tags: ["teacher", "lesson-plan", "classroom"],
    title: {
      as: "শিক্ষকৰ বাবে Smart Lesson Plan Generator",
      en: "Smart Lesson Plan Generator for Teachers",
    },
    prompt: {
      as: `আপুনি এজন Classroom Planning Assistant। মই [class/subject]ৰ শিক্ষক/শিক্ষিকা।

Topic:
[topic]
Class level:
[class]
Time:
[minutes]

অনুগ্ৰহ কৰি lesson plan দিয়ক:
1) Learning objective (৩টা)
2) Warm-up activity
3) Main teaching steps (time split সহ)
4) Student activity / group task
5) quick assessment (৫টা প্ৰশ্ন)
6) homework task
7) slow learner আৰু advanced learner-ৰ বাবে পৃথক strategy

ভাষা:
- অসমীয়াত সহজ ব্যাখ্যা
- classroom-ready action steps`,
      en: `You are a Classroom Planning Assistant. I teach [class/subject].

Topic: [topic]
Class level: [class]
Duration: [minutes]

Create a lesson plan with:
1) 3 learning objectives
2) Warm-up activity
3) Main teaching flow with time split
4) Student activity/group task
5) Quick assessment (5 questions)
6) Homework
7) Differentiation for slow and advanced learners`,
    },
  },
  {
    id: "teacher-topic-simplifier",
    category: "teachers_and_training",
    tags: ["teacher", "explanation", "story-method"],
    title: {
      as: "কঠিন বিষয় সহজ গল্পৰে বুজাওক",
      en: "Explain Difficult Topics Through Simple Story",
    },
    prompt: {
      as: `আপুনি এজন Story-based Teaching Expert। এই কঠিন বিষয়টো স্কুল স্তৰত সহজকৈ বুজাব লাগিব।

Topic:
[topic]
Class:
[class]

আউটপুট:
1) ১ মিনিটৰ গল্প-ভিত্তিক intro
2) বাস্তৱ জীৱনৰ ৩টা উদাহৰণ
3) chalkboard/slide-ত কি আঁকিব/দেখুৱাব
4) student-এ সুধিব পৰা সম্ভাব্য ১০টা প্ৰশ্ন + সহজ উত্তৰ
5) misconception তালিকা (ভুল ধাৰণা)
6) class শেষৰ ৩০-second recap script

নিয়ম:
- অধিক টেকনিকেল jargon এৰাওক
- Assamese চিন্তাধাৰাৰ লগত মিল থকা উদাহৰণ দিয়ক`,
      en: `Act as a story-based teaching expert. Explain this difficult topic for school students.

Topic: [topic]
Class: [class]

Output:
1) 1-minute story intro
2) 3 real-life examples
3) What to draw/show on board/slides
4) 10 likely student questions with simple answers
5) Common misconceptions
6) 30-second class-end recap script`,
    },
  },
  {
    id: "parents-ai-basics",
    category: "parents_and_family",
    tags: ["parents", "ai-awareness", "children"],
    title: {
      as: "অভিভাৱকৰ বাবে AI বুজা আৰু সন্তানক গাইড কৰা",
      en: "Parent Guide: Understand AI and Guide Children",
    },
    prompt: {
      as: `আপুনি এজন Parent Mentor। মই AI লৈ চিন্তিত অভিভাৱক। মোৰ সন্তানৰ বয়স [age]।

অনুগ্ৰহ কৰি:
1) AI কি - ২ মিনিটত অভিভাৱকৰ ভাষাত বুজাওক
2) "ভয় নহয়, smart ব্যৱহাৰ" এই mind-set গঠন কৰিবলৈ ১০টা কথা
3) বয়সভিত্তিক (8-12 / 13-17 / 18+) safe AI use plan
4) ঘৰত AI শিকাৰ ৭ দিনৰ family activity
5) শিশুৰ homework-ত AI ব্যৱহাৰৰ নৈতিক নিয়ম
6) red-flag list: over-dependence, misinformation, privacy risk
7) parent-child conversation starter (অসমীয়াত)

tone:
- ভদ্ৰ, আশ্বাসমূলক, দোষাৰোপবিহীন`,
      en: `You are a Parent Mentor. I’m a concerned parent and my child is [age].

Please provide:
1) AI explained in 2 minutes for parents
2) 10 reassurance points: “not fear, smart usage”
3) Age-based safe AI use plan (8-12 / 13-17 / 18+)
4) 7-day family AI learning activity plan
5) Ethical rules for homework use
6) Red flags: overdependence, misinformation, privacy risks
7) Parent-child conversation starters`,
    },
  },
  {
    id: "parents-homework-helper",
    category: "parents_and_family",
    tags: ["homework", "family", "learning-support"],
    title: {
      as: "ঘৰুৱা Homework সহায়ক Prompt",
      en: "Home Homework Support Prompt",
    },
    prompt: {
      as: `আপুনি এজন patient Homework Assistant। এই প্ৰশ্ন/অধ্যায়টো শিশুক নিজে বুজি সমাধান কৰিবলৈ সহায় কৰক।

Question/Topic:
[paste]
Class level:
[class]

উত্তৰ format:
1) প্ৰথমে সহজকৈ concept বুজাওক
2) Step-by-step hint দিয়ক (সম্পূৰ্ণ answer তৎক্ষণাত নিদিব)
3) শিশুৱে চেষ্টা কৰাৰ পিছত model answer
4) একে ধৰণৰ ৩টা practice প্ৰশ্ন
5) parent-এ ১০ মিনিটত কেনেকৈ review কৰিব

নিয়ম:
- শিশুক লজ্জিত নকৰিব
- positive আৰু respectful tone
- আপুনি/আপোনাৰ ভদ্ৰ ভাষা`,
      en: `Act as a patient Homework Assistant. Help the child understand and solve this on their own.

Question/Topic:
[paste]
Class level:
[class]

Response format:
1) Explain the concept simply
2) Give step-by-step hints (don’t reveal full answer immediately)
3) Provide model answer after attempt
4) Add 3 similar practice questions
5) Give a 10-minute parent review checklist`,
    },
  },
  {
    id: "govt-letter-assistant",
    category: "government_and_office",
    tags: ["official-letter", "office", "formal-writing"],
    title: {
      as: "অফিচ/চৰকাৰী চিঠি Draft Assistant",
      en: "Office/Government Letter Draft Assistant",
    },
    prompt: {
      as: `আপুনি এজন Official Writing Assistant। মই [department/office] ত কাম কৰোঁ। তলৰ বিষয়ত formal চিঠি/ইমেইল লিখিব লাগিব।

বিষয়:
[subject]
প্ৰাপক:
[recipient]
উদ্দেশ্য:
[purpose]
সময়সীমা:
[deadline]

অনুগ্ৰহ কৰি:
1) অসমীয়াত formal draft
2) English official draft
3) subject line ৫টা বিকল্প
4) short follow-up mail format
5) polite reminder format
6) common language mistakes to avoid

নিয়ম:
- সংক্ষিপ্ত, স্পষ্ট, professional tone
- অপ্ৰয়োজনীয় কঠিন শব্দ এৰাওক`,
      en: `You are an Official Writing Assistant. I work in [department/office] and need a formal letter/email.

Topic: [subject]
Recipient: [recipient]
Purpose: [purpose]
Deadline: [deadline]

Provide:
1) Formal draft in Assamese
2) Formal draft in English
3) 5 subject-line options
4) Short follow-up email format
5) Polite reminder format
6) Common language mistakes to avoid`,
    },
  },
  {
    id: "govt-notice-simplifier",
    category: "government_and_office",
    tags: ["public-notice", "scheme", "simplify"],
    title: {
      as: "জটিল Notice/Policy সহজ অসমীয়াত বুজাওক",
      en: "Simplify Complex Notice/Policy",
    },
    prompt: {
      as: `আপুনি এজন Public Communication Specialist। তলৰ notice/policy সাধাৰণ মানুহে সহজে বুজিব পৰা ভাষাত লিখি দিয়ক।

মূল নথি:
[paste notice]

আউটপুট:
1) ৮ লাইনৰ plain-language summary
2) কাৰ বাবে (eligibility)
3) কি লাভ/কি বাধ্যবাধকতা
4) কাগজপত্ৰ কি লাগিব
5) deadline আৰু important date
6) "কি ভুল নকৰিব" তালিকা
7) WhatsApp share format (very short)

নিয়ম:
- অসমীয়াত স্পষ্ট, কোনো বিভ্ৰান্তি নহয়
- ভুল ব্যাখ্যা এৰাই আইনগত ভাষাৰ অৰ্থ সঠিক ৰাখিব`,
      en: `You are a Public Communication Specialist. Simplify this policy/notice for common citizens.

Original document:
[paste notice]

Output:
1) 8-line plain-language summary
2) Eligibility
3) Benefits and obligations
4) Required documents
5) Deadlines and key dates
6) “Do not make these mistakes” list
7) Very short WhatsApp-share version`,
    },
  },
  {
    id: "content-calendar-assamese",
    category: "content_and_growth",
    tags: ["instagram", "reels", "content-plan", "assamese"],
    title: {
      as: "Assamese Audienceৰ বাবে ৩০ দিনৰ Content Calendar",
      en: "30-Day Content Calendar for Assamese Audience",
    },
    prompt: {
      as: `আপুনি এজন Content Strategist। মোৰ niche: [niche]। মোৰ audience Assamese-speaking beginners।

মোৰ লক্ষ্য:
[followers/leads/sales]

অনুগ্ৰহ কৰি:
1) ৩০ দিনৰ content calendar (day-wise)
2) post type (reel/carousel/story/live) সহ
3) প্ৰতিদিনে ১টা hook line (অসমীয়া + English mix)
4) CTA line ২০টা
5) audience trust গঢ়িবলৈ community-first angle
6) low-data-friendly content format
7) weekly review checklist (কি চলিল/কি নচলিল)

tone:
- warm, humble, community-first
- theory নহয়, practical content idea`,
      en: `You are a Content Strategist. My niche is [niche]. My audience is Assamese-speaking beginners.

Goal:
[followers/leads/sales]

Provide:
1) A day-wise 30-day content calendar
2) Post type per day (reel/carousel/story/live)
3) One hook line per day (Assamese + English mix style)
4) 20 CTA lines
5) Community-first trust-building angle
6) Low-data-friendly content format
7) Weekly review checklist`,
    },
  },
  {
    id: "content-reel-script-engine",
    category: "content_and_growth",
    tags: ["script", "reel", "short-video", "creator"],
    title: {
      as: "Hook → Story → Demo → CTA Reel Script Engine",
      en: "Hook → Story → Demo → CTA Reel Script Engine",
    },
    prompt: {
      as: `আপুনি short-video script writer। বিষয়: [topic]। target audience: [audience]।

মোক ৫টা reel script দিয়ক এই গঠনত:
1) ৩ second hook
2) relatable সমস্যা
3) live demo line (tool actually working)
4) clear takeaway
5) CTA (comment/save/share)

প্ৰতিটো script-ত:
- Assamese প্ৰধান ভাষা
- English tech term minimally
- on-screen text
- voice-over line
- caption
- hashtag set (local + niche)

অতি polished নহয়, community-trust tone বজাই ৰাখিব`,
      en: `You are a short-video script writer.

Topic: [topic]
Target audience: [audience]

Create 5 reel scripts with this structure:
1) 3-second hook
2) Relatable problem
3) Live-demo line (show tool working)
4) Clear takeaway
5) CTA (comment/save/share)

For each script include:
- On-screen text
- Voice-over line
- Caption
- Hashtag set (local + niche)

Tone: practical, human, community-trust.`,
    },
  },
  {
    id: "career-freelance-first-client",
    category: "career_and_jobs",
    tags: ["freelance", "earning", "client", "portfolio"],
    title: {
      as: "Freelancing-ত প্ৰথম Client পোৱাৰ Practical Plan",
      en: "Practical Plan to Get Your First Freelance Client",
    },
    prompt: {
      as: `আপুনি এজন Freelance Launch Mentor। মই AI-ভিত্তিক service আৰম্ভ কৰিব বিচাৰোঁ, কিন্তু এতিয়ালৈকে client পোৱা নাই।

মোৰ তথ্য:
- দক্ষতা: [skill]
- আগ্ৰহৰ service: [service]
- দৈনিক সময়: [time]
- প্লেটফৰ্ম: [upwork/fiverr/linkedin/instagram]

অনুগ্ৰহ কৰি:
1) ১৪ দিনৰ client acquisition plan
2) beginner-friendly ৩টা service package (price range সহ)
3) profile bio, service description, portfolio sample outline
4) outreach message ১০টা (respectful tone-ত)
5) প্ৰথম call/DM-ৰ বাবে question checklist
6) client reject কৰিলে follow-up strategy
7) প্ৰথম ৭ দিনত measurable KPI

নিয়ম:
- অসমীয়াত স্পষ্ট ব্যাখ্যা
- English template line দিব পাৰে
- অতিৰিক্ত তত্ত্ব নহয়, কেৱল কাম-কেন্দ্ৰিক ধাপ`,
      en: `You are a Freelance Launch Mentor. I want to start AI-based services but I have not landed any clients yet.

My details:
- Skills: [skill]
- Service interest: [service]
- Daily time: [time]
- Platform: [upwork/fiverr/linkedin/instagram]

Please provide:
1) A 14-day client acquisition plan
2) Three beginner-friendly service packages with price ranges
3) Profile bio, service description, and portfolio sample outline
4) Ten outreach message templates with respectful tone
5) First-call/DM question checklist
6) Follow-up strategy after rejection
7) Measurable KPIs for the first 7 days

Rules:
- Keep it practical and execution-focused
- Avoid heavy theory`,
    },
  },
  {
    id: "business-offer-campaign-local-festivals",
    category: "business_and_income",
    tags: ["small-business", "offers", "campaign", "local-market"],
    title: {
      as: "স্থানীয় উৎসৱৰ বাবে দোকান Offer Campaign Builder",
      en: "Offer Campaign Builder for Local Festival Season",
    },
    prompt: {
      as: `আপুনি এজন Local Retail Marketing Coach। মোৰ ব্যৱসায় [business type]। আগন্তুক উৎসৱ: [festival name]।

মোৰ লক্ষ্য:
- বিক্ৰী বঢ়োৱা
- নতুন গ্ৰাহক আনা
- পুৰণি গ্ৰাহক পুনৰ সক্ৰিয় কৰা

মোৰ বাবে সাজি দিয়ক:
1) ১০ দিনৰ উৎসৱ campaign plan
2) daily post/status idea (WhatsApp + Instagram)
3) offer structure (combo, bundle, limited-time)
4) দোকানৰ front-banner text (অসমীয়া + English)
5) গ্ৰাহকক ফোন/মেছেজ কৰাৰ script
6) daily sales tracker format
7) campaign শেষত review framework (কি সফল/কি উন্নতি লাগিব)

নিয়ম:
- কম বাজেট, কম ডাটা আৰু বাস্তৱমুখী চিন্তা
- আপুনি/আপোনাৰ ভদ্ৰ সম্বোধন বজাই ৰাখিব
- copy-paste ready output`,
      en: `You are a Local Retail Marketing Coach. My business is [business type], and the upcoming festival is [festival name].

Goals:
- Increase sales
- Acquire new customers
- Reactivate old customers

Create:
1) A 10-day festival campaign plan
2) Daily post/status ideas for WhatsApp and Instagram
3) Offer structures (combo, bundle, limited-time)
4) Front-banner text in Assamese + English
5) Customer call/message scripts
6) Daily sales tracker format
7) End-of-campaign review framework

Rules:
- Keep it low-budget and practical
- Make outputs copy-paste ready`,
    },
  },
  {
    id: "parents-home-ai-rules-charter",
    category: "parents_and_family",
    tags: ["parents", "safe-use", "digital-discipline", "children"],
    title: {
      as: "ঘৰৰ AI ব্যৱহাৰৰ নীতি (Parent-Child Charter)",
      en: "Home AI Usage Rules (Parent-Child Charter)",
    },
    prompt: {
      as: `আপুনি এজন Family Digital Mentor। আমাৰ ঘৰতে AI ব্যৱহাৰৰ বাবে সহজ, মানৱিক আৰু সুৰক্ষিত নিয়ম লাগিব।

পৰিয়ালৰ তথ্য:
- শিশুৰ বয়স: [age]
- mobile usage সময়: [time]
- স্কুলৰ ধৰণ: [school type]

অনুগ্ৰহ কৰি:
1) ঘৰুৱা AI ব্যৱহাৰৰ ১২টা স্পষ্ট নিয়ম
2) homework-ত acceptable আৰু unacceptable use
3) privacy, misinformation, plagiarism ৰ simple সতৰ্কতা
4) সপ্তাহত এবাৰ parent-child review meeting template
5) ভুল হ’লে punishment নহয়, correction-based approach
6) শিশুৰ self-reflection প্ৰশ্ন ১০টা
7) ছপা কৰি টাঙি থ’ব পৰা ১ পৃষ্ঠাৰ charter format

tone:
- আশ্বাসমূলক
- দোষাৰোপবিহীন
- অসমীয়াত সহজ বাক্য`,
      en: `You are a Family Digital Mentor. We need simple, humane, and safe AI usage rules for our home.

Family details:
- Child age: [age]
- Daily mobile usage: [time]
- School type: [school type]

Please provide:
1) 12 clear home AI usage rules
2) Acceptable vs unacceptable homework usage
3) Simple cautions for privacy, misinformation, and plagiarism
4) Weekly parent-child review meeting template
5) Correction-based approach instead of punishment
6) 10 child self-reflection questions
7) One-page printable charter format

Tone: reassuring and non-judgmental.`,
    },
  },
  {
    id: "office-daily-task-automation",
    category: "government_and_office",
    tags: ["office", "automation", "productivity", "government"],
    title: {
      as: "অফিচৰ দৈনিক কাম Automation Assistant",
      en: "Daily Office Task Automation Assistant",
    },
    prompt: {
      as: `আপুনি এজন Office Productivity Consultant। মই [department] ত কাম কৰোঁ, আৰু পুনৰাবৃত্তিমূলক কামবোৰ সহজ কৰিব বিচাৰোঁ।

মোৰ দৈনিক কাম:
[task list]

মোৰ বাবে plan দিয়ক:
1) কোনবোৰ কাম AI-এ সহায় কৰিব পাৰে (priority table)
2) email draft, note summary, file naming, meeting minutes template
3) sensitive data নোখোৱাকৈ safe workflow
4) ১৫ মিনিটৰ training module (সহকৰ্মীৰ বাবে)
5) SOP format: input → process → output
6) weekly productivity metric
7) manual fallback plan (AI নচলিলে কি কৰিব)

নিয়ম:
- professional tone
- অসমীয়া ব্যাখ্যা, প্ৰয়োজন সাপেক্ষে English template
- বাস্তৱত অবিলম্বে প্ৰয়োগ কৰিব পৰা ধাপ`,
      en: `You are an Office Productivity Consultant. I work in [department] and want to simplify repetitive tasks with AI.

Daily tasks:
[task list]

Provide:
1) Priority table of tasks suitable for AI assistance
2) Templates for email draft, note summary, file naming, and meeting minutes
3) Safe workflow that avoids exposing sensitive data
4) A 15-minute internal training module
5) SOP format: input -> process -> output
6) Weekly productivity metrics
7) Manual fallback plan if AI is unavailable

Rules:
- Keep it immediately implementable
- Maintain professional clarity`,
    },
  },
];
