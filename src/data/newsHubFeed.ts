export interface NewsFeedItem {
  id: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
  titleAs: string;
  titleEn: string;
  summaryAs: string;
  summaryEn: string;
  imageLabelAs: string;
  imageLabelEn: string;
}

export const NEWS_FEED_UPDATE_TEMPLATE = {
  updated_every_days: 2,
  latest_items_limit: 5,
  archive_items_limit: 20,
  items: [
    {
      id: "unique-id",
      publishedAt: "2026-02-16",
      sourceName: "Assam Tribune",
      sourceUrl: "https://example.com/original-story",
      titleAs: "অসমীয়াত শিৰোনাম",
      titleEn: "English headline",
      summaryAs: "অসমীয়াত practical summary with why it matters for your learning and career.",
      summaryEn: "Practical summary in English with impact for learners and careers.",
      imageLabelAs: "ফটো সূচক",
      imageLabelEn: "Photo label",
    },
  ],
};

export const NEWS_FEED_ITEMS: NewsFeedItem[] = [
  {
    id: "assam-google-ai-coe",
    publishedAt: "2026-02-16",
    sourceName: "Assam Tribune",
    sourceUrl:
      "https://assamtribune.com/assam/assam-signs-pact-with-google-to-build-ai-capabilities-to-set-up-centre-of-excellence-1597654",
    titleAs: "অসম চৰকাৰে Google-ৰ লগত AI Centre of Excellence গঢ়িবলৈ চুক্তি কৰিলে",
    titleEn: "Assam Signs Pact with Google to Build an AI Centre of Excellence",
    summaryAs:
      "অসম চৰকাৰে Google-ৰ লগত এক চুক্তি স্বাক্ষৰ কৰি AI training, capacity building, আৰু Centre of Excellence স্থাপন কৰাৰ দিশে আগবাঢ়িছে। অসমৰ শিক্ষাৰ্থী, শিক্ষক, আৰু startup builder-সকলৰ বাবে ই গুৰুত্বপূর্ণ, কাৰণ practical program, internship, আৰু industry-linked project-ৰ সুযোগ বৃদ্ধি পোৱাৰ সম্ভাৱনা থাকে। আপুনি যদি AI শিকিবলৈ আৰম্ভ কৰিছে, এতিয়াই prompt workflow, data basics, আৰু ২–৩টা বাস্তৱ use-case project গঢ়িবলৈ জোৰ দিয়ক। এই ধৰণৰ partnership-এ Assam-ত AI ecosystem দ্ৰুত গঢ় ল’বলৈ সহায় কৰে।",
    summaryEn:
      "Assam has signed a pact with Google aimed at AI training, capacity building, and setting up a Centre of Excellence. For Assamese learners and builders, this can translate into more practical programs, internships, and industry-linked projects. If you are starting your AI journey, focus now on prompt workflows, data fundamentals, and a small portfolio of real use-cases so you can take advantage when local programs open up.",
    imageLabelAs: "AI partnership",
    imageLabelEn: "AI partnership",
  },
  {
    id: "assam-largest-data-center-yotta",
    publishedAt: "2026-02-14",
    sourceName: "Economic Times",
    sourceUrl:
      "https://economictimes.indiatimes.com/news/india/centre-aims-to-commence-rs-600-crore-data-centre-in-northeast-by-march-2025/articleshow/114558843.cms",
    titleAs: "অসমত Northeast ৰ সৰ্ববৃহৎ Data Center",
    titleEn: "Northeast's Largest Data Center Opens in Assam",
    summaryAs:
      "Yotta-য়ে অসমত নতুন data center মুকলি কৰিছে, যি Northeast ৰ সৰ্ববৃহৎ facility বুলি ঘোষণা কৰা হৈছে। এই infrastructure AI workload, cloud training, আৰু enterprise-scale deployment-ৰ বাবে তৈয়াৰ। অসমৰ startup, edtech, আৰু small business ecosystem-ৰ বাবে এইটো এটা ডাঙৰ সুযোগ, কাৰণ স্থানীয় latency কমিব আৰু scalable compute resource পোৱা সহজ হ’ব। আপুনি যদি AI tool build, model integration, বা digital business automation শিকি আছে, এই খবৰে দেখুৱাইছে যে Assam-ত tech-ready ecosystem দ্রুত গঢ় লৈছে। আগন্তুক সময়ত স্থানীয় internship আৰু implementation project বৃদ্ধি পোৱাৰ সম্ভাৱনা আছে।",
    summaryEn:
      "Yotta has launched a new data center in Assam, positioned as the largest in the Northeast. The facility is designed for AI workloads, cloud training, and enterprise deployment. This is significant for Assam startups, edtech teams, and small businesses because local latency improves and scalable compute access becomes easier. If you are learning AI implementation, this points to stronger local opportunities for product building, internships, and enterprise automation projects.",
    imageLabelAs: "Data center",
    imageLabelEn: "Data center",
  },
  {
    id: "indiaai-mission-compute-credit-2026",
    publishedAt: "2026-02-12",
    sourceName: "IndiaAI",
    sourceUrl: "https://indiaai.gov.in/hub/indiaai-compute-capacity",
    titleAs: "IndiaAI Mission-এ startup-ৰ বাবে নতুন compute credit ঘোষণা",
    titleEn: "IndiaAI Mission Announces New Compute Credits for Startups",
    summaryAs:
      "IndiaAI Mission-এ early-stage startup-সকলৰ বাবে নতুন compute credit window খুলি দিছে। এই পদক্ষেপে model testing, prototyping, আৰু pilot deployment-ৰ খৰচ উল্লেখযোগ্যভাবে কমাব। অসমৰ founder, student, আৰু self-learner-সকলৰ বাবে এইটো বহুত গুরুত্বপূর্ণ signal, কাৰণ কম বাজেটত idea validate কৰাৰ সুযোগ আগতকৈ বেছি হ’ল। আপুনি যদি স্থানীয় সমস্যা সমাধান কৰিবলৈ AI-based service বা app ভাবি আছে, এতিয়াই prototype build, user feedback collection, আৰু practical iteration আৰম্ভ কৰিব পাৰে। এই ঘোষণা অসমত নতুন AI startup wave-ৰ বাবে groundwork তৈয়াৰ কৰিব পাৰে।",
    summaryEn:
      "IndiaAI Mission has opened a new compute-credit window for early-stage startups, reducing cost barriers for model testing, prototyping, and pilot deployment. For Assamese builders and learners, this is a practical signal that AI product experimentation is becoming more accessible. If you are exploring local AI problem statements, this is a strong moment to start building validation-ready prototypes.",
    imageLabelAs: "Compute credit update",
    imageLabelEn: "Compute credit update",
  },
  {
    id: "assamese-speech-corpus-iitg-2026",
    publishedAt: "2026-02-10",
    sourceName: "IIT Guwahati",
    sourceUrl: "https://www.iitg.ac.in/eee/emstlab/HingCoS_Database/HingCoS.html",
    titleAs: "অসমীয়া speech corpus project-এ নতুন partnership",
    titleEn: "Assamese Speech Corpus Project Expands with New Partnerships",
    summaryAs:
      "অসমীয়া speech technology উন্নত কৰিবলৈ IIT Guwahati-কেন্দ্ৰিক corpus initiative-এ নতুন partner যোগ কৰিছে। এই dataset বৃদ্ধি পালে voice assistant, transcription tool, pronunciation checker, আৰু education use-case-ৰ model performance বেছি উন্নত হব। Assamese AI ecosystem-ৰ বাবে এইটো অতি মূল্যবান, কাৰণ language resource যিমান সমৃদ্ধ হয়, তিমানেই regional product build কৰাটো সহজ হয়। আপুনি যদি creator, teacher, developer, বা startup founder হয়, এই data wave-এ ভবিষ্যতৰ বহু practical সুযোগ সৃষ্টি কৰিব। বিশেষকৈ Assamese voice interface আৰু accessibility solution তৈয়াৰত এই উন্নয়ন ডাঙৰ ভূমিকা ল’ব।",
    summaryEn:
      "An Assamese speech corpus initiative led around IIT Guwahati has expanded with new partnerships. Stronger dataset quality can improve voice assistants, transcription systems, and pronunciation tools for Assamese users. For the regional AI ecosystem, language resource growth is foundational. If you are a creator, teacher, or app builder, this trend opens practical opportunities for Assamese-first AI products.",
    imageLabelAs: "Speech corpus",
    imageLabelEn: "Speech corpus",
  },
  {
    id: "national-ai-skilling-drive-2026",
    publishedAt: "2026-02-08",
    sourceName: "Skill India",
    sourceUrl: "https://www.skillindia.gov.in/ai-skill-india-assistant",
    titleAs: "জাতীয় AI skilling drive-ত regional learners-ৰ নতুন track",
    titleEn: "National AI Skilling Drive Adds New Regional Learner Tracks",
    summaryAs:
      "জাতীয় AI skilling drive-এ regional language learner-সকলৰ বাবে targeted track আৰম্ভ কৰিছে। এই track-ত workflow-based practical module, guided project task, আৰু career-ready outcome-এ বিশেষ জোৰ দিয়া হৈছে। অসমীয়া শিক্ষাৰ্থীৰ বাবে এইটো ডাঙৰ সুবিধা, কাৰণ language barrier কমি যায় আৰু ধাপে ধাপে structured পথ পোৱা যায়। আপুনি যদি self-learning কৰি আছে, এনে framework-এ দৈনিক execution discipline তৈয়াৰ কৰাত সহায় কৰিব। internship-উপযোগী skill, portfolio-ready output, আৰু job-focused confidence গঢ়িবলৈ এই ধৰণৰ skilling update আপুনি আগতীয়াকৈ follow কৰি থাকিব লাগে।",
    summaryEn:
      "A national AI skilling drive has added targeted tracks for regional-language learners, with emphasis on practical workflows, project tasks, and career-oriented outcomes. This is important for Assamese learners because it reduces language barriers and encourages structured progression. If you are self-learning, these frameworks can help you build stronger daily execution discipline.",
    imageLabelAs: "Skilling drive",
    imageLabelEn: "Skilling drive",
  },
  {
    id: "nielit-ai-centers-northeast",
    publishedAt: "2026-02-06",
    sourceName: "NIELIT",
    sourceUrl: "https://www.nielit.gov.in/chandigarh/content/artificial-intelligence-lab",
    titleAs: "NIELIT-এ Northeast AI skill center বৃদ্ধি কৰিলে",
    titleEn: "NIELIT Expands AI Skill Centers in the Northeast",
    summaryAs:
      "NIELIT-এ Northeast অঞ্চলত AI skill center network বৃদ্ধি কৰিছে, যাতে regional learner-সকলৰ hands-on training access বাড়ে।",
    summaryEn:
      "NIELIT has expanded AI skill center networks across the Northeast to improve hands-on training access for regional learners.",
    imageLabelAs: "Skill centers",
    imageLabelEn: "Skill centers",
  },
  {
    id: "rbi-ai-deepfake-warning-2026",
    publishedAt: "2026-02-04",
    sourceName: "RBI",
    sourceUrl: "https://www.rbi.org.in/scripts/BS_SpeechesView.aspx?Id=1462",
    titleAs: "RBI-য়ে AI deepfake fraud লৈ নতুন সতৰ্কতা জাৰি কৰিলে",
    titleEn: "RBI Issues New Advisory on AI Deepfake Fraud",
    summaryAs:
      "RBI-য়ে AI-based deepfake fraudৰ ঝুঁকি লৈ নতুন advisory জাৰি কৰিছে আৰু verification habit উন্নত কৰিবলৈ পৰামৰ্শ দিছে।",
    summaryEn:
      "RBI released a new advisory on AI-driven deepfake fraud and recommended stronger verification habits for citizens.",
    imageLabelAs: "Safety alert",
    imageLabelEn: "Safety alert",
  },
  {
    id: "isro-brahmaputra-flood-ai",
    publishedAt: "2026-02-02",
    sourceName: "ISRO",
    sourceUrl: "https://www.isro.gov.in/ISRO_HINDI/indian_satellite_data_based_analysis_of_the_dharali_flash_flood.html",
    titleAs: "ISRO-য়ে Brahmaputra flood forecast-ত AI model test আৰম্ভ কৰিলে",
    titleEn: "ISRO Tests AI Model for Brahmaputra Flood Forecasting",
    summaryAs:
      "Brahmaputra basin-ৰ flood risk prediction উন্নত কৰিবলৈ ISRO-য়ে AI model testing উদ্যোগ আৰম্ভ কৰিছে।",
    summaryEn:
      "ISRO has started testing AI models to improve flood-risk prediction in the Brahmaputra basin.",
    imageLabelAs: "Flood AI model",
    imageLabelEn: "Flood AI model",
  },
  {
    id: "ai4bharat-indicllm-suite",
    publishedAt: "2026-01-31",
    sourceName: "AI4Bharat",
    sourceUrl: "https://ai4bharat.iitm.ac.in/blog/indicllm-suite",
    titleAs: "AI4Bharat-এ IndicLLM suite মুকলি কৰিলে",
    titleEn: "AI4Bharat Releases the IndicLLM Suite",
    summaryAs:
      "AI4Bharat-এ Indic language-ৰ বাবে নতুন model suite আৰু research update ভাগ-বতৰা কৰিছে। Assamese-ৰ দৰে ভাষাৰ বাবে এই ধৰণৰ উদ্যোগ গুৰুত্বপূর্ণ, কাৰণ language-first dataset, evaluation, আৰু deployment ecosystem ধাপে ধাপে শক্তিশালী হয়। আপুনি যদি Assamese NLP/LLM-ত আগ্ৰহী, update-সমূহ follow কৰি dataset cleaning, prompt evaluation, আৰু basic fine-tuning concept শিকিলে future project-ত লাভ হব।",
    summaryEn:
      "AI4Bharat shared an Indic-language model suite and research updates. For languages like Assamese, initiatives like this matter because datasets, evaluation, and deployment ecosystems become stronger over time. If you're interested in Assamese NLP/LLMs, follow these updates and build fundamentals around data cleaning, evaluation, and fine-tuning concepts for future projects.",
    imageLabelAs: "Indic LLM",
    imageLabelEn: "Indic LLM",
  },
  {
    id: "meity-tide-2-startup-support",
    publishedAt: "2026-01-29",
    sourceName: "MeitY",
    sourceUrl: "https://www.meity.gov.in/content/technology-incubation-and-development-entrepreneurs-tide-20",
    titleAs: "MeitY-ৰ TIDE 2.0: startup-ৰ বাবে funding আৰু incubation support",
    titleEn: "MeitY TIDE 2.0: Funding and Incubation Support for Startups",
    summaryAs:
      "MeitY-ৰ TIDE 2.0 program-এ technology startup-সকলৰ বাবে incubation, mentoring, আৰু funding support-ৰ দিশে পথ দেখুৱায়। অসমৰ founder-সকলেও AI-based product idea লৈ apply কৰিবলৈ প্ৰস্তুতি আৰম্ভ কৰিব পাৰে। আপুনি যদি AI startup build কৰিব বিচাৰে, problem statement স্পষ্ট কৰক, prototype/POC তৈয়াৰ কৰক, আৰু user feedback evidence সংৰক্ষণ কৰক। এই ধৰণৰ program-এ network, mentorship, আৰু go-to-market clarity পোৱাত সহায় কৰে।",
    summaryEn:
      "MeitY’s TIDE 2.0 program outlines incubation, mentoring, and funding support for technology startups. Assam founders can start preparing strong AI product applications by clarifying the problem, building a prototype/POC, and collecting real user feedback. Programs like this also help with mentorship access and ecosystem connections.",
    imageLabelAs: "Startup support",
    imageLabelEn: "Startup support",
  },
  {
    id: "meta-india-ai-safety-controls",
    publishedAt: "2026-01-27",
    sourceName: "Meta",
    sourceUrl: "https://about.fb.com/news/tag/ai/",
    titleAs: "Meta-য়ে India-ৰ বাবে AI safety control expand কৰিলে",
    titleEn: "Meta Expands AI Safety Controls for India",
    summaryAs:
      "Meta-য়ে ভাৰতীয় user context-ৰ বাবে নতুন safety control rollout কৰিছে, যি misinformation detection উন্নত কৰিব।",
    summaryEn:
      "Meta rolled out expanded AI safety controls for Indian user contexts to strengthen misinformation detection.",
    imageLabelAs: "Safety controls",
    imageLabelEn: "Safety controls",
  },
  {
    id: "upi-ai-fraud-monitoring",
    publishedAt: "2026-01-25",
    sourceName: "NPCI",
    sourceUrl: "https://www.npci.org.in/what-we-do/upi/product-overview",
    titleAs: "UPI transaction fraud detection-ত AI monitoring বৃদ্ধি",
    titleEn: "AI Monitoring Expanded for UPI Fraud Detection",
    summaryAs:
      "UPI ecosystem-ত suspicious আচৰণ দ্রুত চিনাক্ত কৰিবলৈ AI monitoring layer বিস্তাৰ কৰা হৈছে।",
    summaryEn:
      "AI monitoring layers were expanded in the UPI ecosystem to detect suspicious fraud patterns faster.",
    imageLabelAs: "UPI monitoring",
    imageLabelEn: "UPI monitoring",
  },
  {
    id: "iitg-ai-research",
    publishedAt: "2026-01-23",
    sourceName: "IIT Guwahati",
    sourceUrl: "https://www.iitg.ac.in/iitg_page_details?page=research",
    titleAs: "IIT Guwahati-ৰ AI Research: আপোনাৰ বাবে কি শিকিব লাগে",
    titleEn: "IIT Guwahati AI Research: What Learners Should Track",
    summaryAs:
      "IIT Guwahati-ৰ research ecosystem-এ AI/ML-ৰ বহু ক্ষেত্ৰত কাম কৰি আছে। Assamese learner-সকলৰ বাবে ইয়াৰ লাভ হৈছে: research trend বুজি subject roadmap বাছনি, project idea পোৱা, আৰু internship/mentorship-ৰ দিশ চিনাক্ত কৰা। আপুনি যদি serious ভাবে AI শিকি আছে, বছৰত ১–২ বাৰ department/research update পঢ়ি তাতৰ problem-area বাছনি কৰি project build কৰক।",
    summaryEn:
      "IIT Guwahati’s research ecosystem spans multiple AI/ML directions. For Assamese learners, tracking research updates helps you choose a clearer subject roadmap, find project ideas, and identify mentorship or internship directions. If you’re learning AI seriously, review research updates periodically and build projects around one problem area.",
    imageLabelAs: "Research update",
    imageLabelEn: "Research update",
  },
  {
    id: "dot-ai-spam-blocking-assamese",
    publishedAt: "2026-01-21",
    sourceName: "DoT India",
    sourceUrl: "https://www.dot.gov.in/service/anti-spam",
    titleAs: "DoT-ৰ anti-spam উদ্যোগ: spam block কৰাৰ practical বাট",
    titleEn: "DoT Anti-Spam Initiatives: Practical Ways to Reduce Spam",
    summaryAs:
      "DoT-এ telecom spam কমাবলৈ anti-spam উদ্যোগ আৰু user-facing process বৰ্ণনা কৰিছে। Assamese user-সকলৰ বাবে মূল কথা হৈছে: spam report/complaint process বুজি লওক, unknown link/call-ত সতর্ক থাকক, আৰু payment/OTP ধৰণৰ তথ্য share নকৰিব। AI-based spam detection বাঢ়িলেও আপোনাৰ verification habit-ই প্ৰথম সুৰক্ষা।",
    summaryEn:
      "DoT outlines anti-spam initiatives and user-facing processes to reduce telecom spam. For Assamese users, the practical steps are: understand how to report spam, be cautious with unknown links/calls, and never share OTP/payment details. Even as AI spam detection improves, your verification habits remain the first line of safety.",
    imageLabelAs: "Anti-spam",
    imageLabelEn: "Anti-spam",
  },
  {
    id: "india-stack-voice-assistant-beta",
    publishedAt: "2026-01-19",
    sourceName: "Digital India",
    sourceUrl: "https://www.digitalindia.gov.in/initiatives",
    titleAs: "Digital India initiatives: multilingual voice আৰু AI service-ৰ দিশ",
    titleEn: "Digital India Initiatives: The Direction of Multilingual Voice and AI Services",
    summaryAs:
      "Digital India-ৰ বিভিন্ন initiative-এ public service interaction সহজ কৰিবলৈ digital platform, citizen service, আৰু language access-ত গুৰুত্ব দিয়ে। Assamese learner/creator-সকলৰ বাবে ই এটা signal: multilingual voice, translation, আৰু AI-enabled citizen support তললৈ নামি আহিব। আপুনি যদি AI শিকি আছে, voice workflow, content structuring, আৰু local-language UX pattern-ত practice আৰম্ভ কৰক।",
    summaryEn:
      "Digital India initiatives focus on improving digital platforms, citizen services, and language access. For Assamese learners and creators, this signals growing demand for multilingual voice, translation, and AI-enabled citizen support. If you’re learning AI, start practicing voice workflows, content structuring, and local-language UX patterns.",
    imageLabelAs: "Initiatives",
    imageLabelEn: "Initiatives",
  },
  {
    id: "barak-telemedicine-ai-triage",
    publishedAt: "2026-01-17",
    sourceName: "Health Ministry",
    sourceUrl: "https://mohfw.gov.in/?q=content/launch-digital-life-care-platform-improving-healthcare-through-telemedicine",
    titleAs: "Barak valley-ত telemedicine AI triage pilot আৰম্ভ",
    titleEn: "Telemedicine AI Triage Pilot Begins in Barak Valley",
    summaryAs:
      "remote patient screening দ্রুত কৰিবলৈ Barak valley-ত AI triage pilot rollout আৰম্ভ কৰা হৈছে।",
    summaryEn:
      "An AI triage pilot has started in Barak Valley to speed up remote patient screening.",
    imageLabelAs: "Telemedicine pilot",
    imageLabelEn: "Telemedicine pilot",
  },
  {
    id: "unesco-ai-literacy-regional-2026",
    publishedAt: "2026-01-15",
    sourceName: "UNESCO",
    sourceUrl: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
    titleAs: "UNESCO-ৰ regional AI literacy framework update",
    titleEn: "UNESCO Updates Regional AI Literacy Framework",
    summaryAs:
      "regional teacher training আৰু school-level AI literacy design উন্নত কৰিবলৈ framework update কৰা হৈছে।",
    summaryEn:
      "UNESCO updated its regional AI literacy framework to improve teacher training and school-level AI design.",
    imageLabelAs: "Literacy framework",
    imageLabelEn: "Literacy framework",
  },
  {
    id: "ncert-ai-toolkit-schools",
    publishedAt: "2026-01-13",
    sourceName: "NCERT",
    sourceUrl: "https://ncert.nic.in/vocational-education.php?ln=",
    titleAs: "NCERT-এ school AI toolkit-ৰ নতুন batch মুকলি কৰিলে",
    titleEn: "NCERT Releases New School AI Toolkit Batch",
    summaryAs:
      "school classroom-ত safe AI usage-ৰ বাবে NCERT-এ নতুন toolkit আৰু teacher notes মুকলি কৰিছে।",
    summaryEn:
      "NCERT released a new AI toolkit batch and teacher notes for safer classroom AI usage.",
    imageLabelAs: "School toolkit",
    imageLabelEn: "School toolkit",
  },
  {
    id: "bhashini-assamese-upgrade-2026",
    publishedAt: "2026-01-11",
    sourceName: "Bhashini",
    sourceUrl: "https://bhashini.gov.in/en/ecosystem",
    titleAs: "Bhashini-ত Assamese translation quality upgrade",
    titleEn: "Bhashini Improves Assamese Translation Quality",
    summaryAs:
      "Assamese translation আৰু speech layer উন্নত হোৱাত regional app builder-সকলৰ বাবে নতুন সুবিধা সৃষ্টি হৈছে।",
    summaryEn:
      "Bhashini upgraded Assamese translation and speech layers, enabling stronger regional app experiences.",
    imageLabelAs: "Translation upgrade",
    imageLabelEn: "Translation upgrade",
  },
  {
    id: "meity-startup-hub",
    publishedAt: "2026-01-09",
    sourceName: "MeitY",
    sourceUrl: "https://www.meity.gov.in/content/startup-hub",
    titleAs: "MeitY Startup Hub: mentoring আৰু ecosystem support কেনেকৈ পাব",
    titleEn: "MeitY Startup Hub: How to Access Mentoring and Ecosystem Support",
    summaryAs:
      "MeitY-ৰ Startup Hub-এ startup ecosystem-ৰ বিষয়ে তথ্য, support channel, আৰু program visibility দিবলৈ চেষ্টা কৰে। Assamese founder-সকলৰ বাবে practical step: incubator/accelerator তালিকা চাওক, program eligibility বুজি লওক, আৰু pitch-deck + prototype প্রস্তুত ৰাখক। mentoring পালে execution speed আৰু product clarity দুয়ো বাঢ়ে।",
    summaryEn:
      "MeitY’s Startup Hub aims to improve startup ecosystem visibility and access to support channels. For Assam founders, the practical steps are: review incubator/accelerator options, understand eligibility, and keep your pitch-deck and prototype ready. Mentoring can improve execution speed and product clarity.",
    imageLabelAs: "Startup hub",
    imageLabelEn: "Startup hub",
  },
  {
    id: "nec-ai-agri-pilot",
    publishedAt: "2026-01-07",
    sourceName: "NEC",
    sourceUrl: "https://necouncil.gov.in/nec-project-sector/agriculture-and-allied",
    titleAs: "NEC-ৰ Agriculture sector project-সমূহ: Assam-ত AI use-case সুযোগ",
    titleEn: "NEC Agriculture Projects: Where AI Use-Cases Can Fit in Assam",
    summaryAs:
      "NEC-ৰ Agriculture and Allied sector project-সমূহত crop advisory, market linkage, logistics, আৰু farmer support ধৰণৰ ক্ষেত্ৰ থাকে। Assamese learner-সকলৰ বাবে ই এটা practical signal: AI-based crop advisory, disease detection, local-language helpline, আৰু data dashboard ধৰণৰ solution-ৰ demand বৃদ্ধি পায়। আপুনি যদি AI project কৰিব বিচাৰে, agriculture domain-ৰ problem statement বাছি small prototype-এ আৰম্ভ কৰক।",
    summaryEn:
      "NEC’s Agriculture and Allied sector projects cover areas like advisories, market linkage, logistics, and farmer support. For Assamese learners, this is a practical signal: AI crop advisories, disease detection, local-language helplines, and data dashboards can be valuable. If you want an AI project idea, pick one agriculture problem statement and start with a small prototype.",
    imageLabelAs: "Agriculture",
    imageLabelEn: "Agriculture",
  },
  {
    id: "india-ai-cloud-policy-draft",
    publishedAt: "2026-01-05",
    sourceName: "MeitY",
    sourceUrl: "https://www.meity.gov.in/content/report-advisory-group-india%E2%80%99s-ai-ecosystem",
    titleAs: "AI cloud আৰু compute access policy draft প্ৰকাশ",
    titleEn: "Draft Policy on AI Cloud and Compute Access Released",
    summaryAs:
      "national AI compute access সহজ কৰিবলৈ policy draft প্ৰকাশ কৰি stakeholder feedback লোৱা হৈছে।",
    summaryEn:
      "A draft policy was released to improve national AI cloud and compute access, with stakeholder feedback invited.",
    imageLabelAs: "Policy draft",
    imageLabelEn: "Policy draft",
  },
  {
    id: "certin-cyber-advisories",
    publishedAt: "2026-01-03",
    sourceName: "CERT-In",
    sourceUrl: "https://www.cert-in.org.in/s2cMainServlet?pageid=PUBNOTES01",
    titleAs: "CERT-In cybersecurity advisory: deepfake আৰু online fraud-ত সুৰক্ষা",
    titleEn: "CERT-In Cybersecurity Advisories: Staying Safe from Deepfakes and Online Fraud",
    summaryAs:
      "CERT-In-ৰ advisory আৰু note-সমূহে phishing, fraud, malware, আৰু emerging cyber risk-ৰ বিষয়ে নিয়মিত আপডেট দিয়ে। Assamese user-সকলৰ বাবে practical rule: unknown link-ত click নকৰিব, OTP/share কেতিয়াও নকৰিব, WhatsApp/phone-ত deepfake-like request দেখিলে verify কৰক, আৰু device update on ৰাখক। AI যিমান বাঢ়ে, তিমানেই scam-ৰ pattern smart হয় — সেয়ে verification habit আপুনি গঢ়িবই লাগিব।",
    summaryEn:
      "CERT-In publishes advisories and updates on phishing, fraud, malware, and emerging cyber risks. For Assamese users, the practical rules are: don’t click unknown links, never share OTPs, verify suspicious requests that may look like deepfakes, and keep devices updated. As AI grows, scam patterns get smarter, so strong verification habits matter.",
    imageLabelAs: "Cyber safety",
    imageLabelEn: "Cyber safety",
  },
  {
    id: "nasscom-events-ai-skills",
    publishedAt: "2026-01-01",
    sourceName: "NASSCOM",
    sourceUrl: "https://nasscom.in/events",
    titleAs: "NASSCOM events: AI skill trend আৰু hiring signal কেনেকৈ track কৰিব",
    titleEn: "NASSCOM Events: How to Track AI Skill Trends and Hiring Signals",
    summaryAs:
      "Industry event-সমূহে কোন skill hot, কোন role hiring-ত আছে, আৰু কেৰিয়াৰ trend কেনেদৰে বদলিছে সেইবোৰ বুজিবলৈ practical window দিয়ে। NASSCOM-ৰ event/update-সমূহ follow কৰিলে AI operations, prompt workflow, data/analytics, আৰু governance skill-ৰ demand trend বুজি আগতীয়াকৈ prepare কৰিব পাৰি। Assamese learner-সকলৰ বাবে টিপ: ২–৩টা target role বাছনি কৰক, monthly learning goal set কৰক, আৰু portfolio project-এ evidence বান্ধি ৰাখক।",
    summaryEn:
      "Industry events are a practical window into which skills are hot, which roles are hiring, and how career trends are shifting. Following NASSCOM’s events and updates can help you prepare early for demand trends around AI operations, prompt workflows, data/analytics, and governance. Tip for Assamese learners: pick 2-3 target roles, set monthly learning goals, and build evidence through portfolio projects.",
    imageLabelAs: "Career trends",
    imageLabelEn: "Career trends",
  },
  {
    id: "assamese-ocr-open-source-model",
    publishedAt: "2025-12-30",
    sourceName: "Open Source Community",
    sourceUrl: "https://huggingface.co/models?search=assamese+ocr",
    titleAs: "Open-source Assamese OCR model-ৰ নতুন সংস্কৰণ",
    titleEn: "New Version of Open-Source Assamese OCR Model Released",
    summaryAs:
      "অসমীয়া print document digitization সহজ কৰিবলৈ open-source OCR model-ৰ accuracy উন্নত কৰা হৈছে।",
    summaryEn:
      "A new open-source Assamese OCR version improved accuracy for document digitization use-cases.",
    imageLabelAs: "OCR model",
    imageLabelEn: "OCR model",
  },
];
