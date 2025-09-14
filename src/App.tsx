import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PromptPacks from "./pages/PromptPacks";
import AITools from "./pages/AITools";
import LearningRoadmaps from "./pages/LearningRoadmaps";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import News from "./pages/News";
import Article from "./pages/Article";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prompt-packs" element={<PromptPacks />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/learning-roadmaps" element={<LearningRoadmaps />} />
          <Route path="/news" element={<News />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
