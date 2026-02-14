import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Fragment, useLayoutEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PromptPacks from "./pages/PromptPacks";
import AITools from "./pages/AITools";
import LearningRoadmaps from "./pages/LearningRoadmaps";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import News from "./pages/News";
import Article from "./pages/Article";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AIInAssamese from "./pages/AIInAssamese";
import ChatGPTInAssamese from "./pages/ChatGPTInAssamese";
import AICourseInAssamese from "./pages/AICourseInAssamese";
import ScrollToTop from "./components/ScrollToTop";
import { getLanguageFromPath } from "./lib/locale";

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
  { path: "/article/:slug", element: <Article /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/admin", element: <Admin /> },
  { path: "/auth", element: <Auth /> },
];

const RouteLanguageSync = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.lang = getLanguageFromPath(location.pathname);
  }, [location.pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteLanguageSync />
        <ScrollToTop />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
