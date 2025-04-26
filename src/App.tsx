import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Research from "./pages/Research";
import PreProduction from "./pages/PreProduction";
import Production from "./pages/Production";
import PostProduction from "./pages/PostProduction";
import MinorTask from "./pages/MinorTask";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import FinalFoundationPortfolio from "./pages/FinalFoundationPortfolio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/research" element={<Research />} />
            <Route path="/pre-production" element={<PreProduction />} />
            <Route path="/production" element={<Production />} />
            <Route path="/post-production" element={<PostProduction />} />
            <Route path="/minor-task" element={<MinorTask />} />
            <Route path="/final-foundation-portfolio" element={<FinalFoundationPortfolio />} />
            <Route path="/post/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
