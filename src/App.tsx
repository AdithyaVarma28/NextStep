
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CareerRecommendations from "./pages/CareerRecommendations";
import SkillMapping from "./pages/SkillMapping";
import CareerSwap from "./pages/CareerSwap";
import AICoach from "./pages/AICoach";
import ResumeFeedback from "./pages/ResumeFeedback";
import DayInLife from "./pages/DayInLife";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recommendations" element={<CareerRecommendations />} />
              <Route path="/skill-mapping" element={<SkillMapping />} />
              <Route path="/career-swap" element={<CareerSwap />} />
              <Route path="/ai-coach" element={<AICoach />} />
              <Route path="/resume-feedback" element={<ResumeFeedback />} />
              <Route path="/day-in-life" element={<DayInLife />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
