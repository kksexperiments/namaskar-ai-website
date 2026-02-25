import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Fragment, Suspense, lazy, useLayoutEffect } from "react";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import { getLanguageFromPath } from "./lib/locale";
import AdminRoute from "./components/AdminRoute";

const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AIInAssamese = lazy(() => import("./pages/AIInAssamese"));
const ChatGPTInAssamese = lazy(() => import("./pages/ChatGPTInAssamese"));
const AICourseInAssamese = lazy(() => import("./pages/AICourseInAssamese"));
const FAQ = lazy(() => import("./pages/FAQ"));
const LearnAIInAssamese30Days = lazy(() => import("./pages/LearnAIInAssamese30Days"));
const BestAICourseForAssameseSpeakers = lazy(() => import("./pages/BestAICourseForAssameseSpeakers"));
const LearningAssameseWithAI = lazy(() => import("./pages/LearningAssameseWithAI"));
const AssameseLLMChatbotGuide = lazy(() => import("./pages/AssameseLLMChatbotGuide"));
const EditorialPolicy = lazy(() => import("./pages/EditorialPolicy"));
const PressAndCollaboration = lazy(() => import("./pages/PressAndCollaboration"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PromptPacks = lazy(() => import("./pages/PromptPacks"));
const AITools = lazy(() => import("./pages/AITools"));
const LearningRoadmaps = lazy(() => import("./pages/LearningRoadmaps"));
const News = lazy(() => import("./pages/News"));
const Article = lazy(() => import("./pages/Article"));
const Admin = lazy(() => import("./pages/Admin"));
const GeoTracker = lazy(() => import("./pages/GeoTracker"));
const GeoTrackingPlaybook = lazy(() => import("./pages/GeoTrackingPlaybook"));

const queryClient = new QueryClient();
const baseRoutes = [
  { path: "/", element: <Index /> },
  { path: "/prompt-packs", element: <PromptPacks /> },
  { path: "/ai-tools", element: <AITools /> },
  { path: "/learning-roadmaps", element: <LearningRoadmaps /> },
  { path: "/news", element: <News /> },
  { path: "/ai-in-assamese", element: <AIInAssamese /> },
  { path: "/chatgpt-in-assamese", element: <ChatGPTInAssamese /> },
  { path: "/ai-course-in-assamese", element: <AICourseInAssamese /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/learn-ai-in-assamese-30-days", element: <LearnAIInAssamese30Days /> },
  { path: "/best-ai-course-for-assamese-speakers", element: <BestAICourseForAssameseSpeakers /> },
  { path: "/learning-assamese-with-ai", element: <LearningAssameseWithAI /> },
  { path: "/assamese-llm-chatbot-guide", element: <AssameseLLMChatbotGuide /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/editorial-policy", element: <EditorialPolicy /> },
  { path: "/press-collaboration", element: <PressAndCollaboration /> },
  { path: "/article/:slug", element: <Article /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/admin", element: <Admin /> },
  { path: "/auth", element: <Auth /> },
  {
    path: "/geo-tracker",
    element: (
      <AdminRoute>
        <GeoTracker />
      </AdminRoute>
    ),
  },
  {
    path: "/geo-tracking-playbook",
    element: (
      <AdminRoute>
        <GeoTrackingPlaybook />
      </AdminRoute>
    ),
  },
];

const RouteLanguageSync = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.lang = getLanguageFromPath(location.pathname);
  }, [location.pathname]);

  return null;
};

const RouteFallback = () => (
  <div className="platform-page flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteLanguageSync />
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {baseRoutes.map((route) => (
              <Route key={`en-${route.path}`} path={route.path} element={route.element} />
            ))}

            {baseRoutes.map((route) => {
              if (route.path === "/") {
                return (
                  <Fragment key="as-root">
                    <Route path="/as" element={route.element} />
                    <Route path="/as/" element={route.element} />
                  </Fragment>
                );
              }

              const assamesePath = `/as${route.path}`;
              return <Route key={`as-${route.path}`} path={assamesePath} element={route.element} />;
            })}

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
