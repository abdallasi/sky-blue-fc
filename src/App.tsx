import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import { AuthProvider } from "./hooks/useAuth";
import Auth from "./pages/Auth";

import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Academy from "./pages/Academy";
import Stats from "./pages/Stats";
import Contact from "./pages/Contact";
import CMS from "./pages/CMS";
import Gallery from "./pages/Gallery";
import Apply from "./pages/Apply";
import NewsStory from "./pages/NewsStory";

import NotFound from "./pages/NotFound";
import { ComingSoon } from "./components/ComingSoon";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { useContent } from "./context/ContentContext";
import { useAuth } from "./hooks/useAuth";


const queryClient = new QueryClient();

/**
 * Hides every public page behind the coming soon screen while maintenance mode
 * is switched on in the CMS. Signed-in editors/admins always see the real site.
 */
const PublicGate = ({ children }: { children: React.ReactNode }) => {
  const { content, loading } = useContent();
  const { isEditor, loading: authLoading } = useAuth();

  if (loading || authLoading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (content.site?.maintenanceMode && !isEditor) {
    return <ComingSoon />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ContentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<PublicGate><Index /></PublicGate>} />
              <Route path="/about" element={<PublicGate><About /></PublicGate>} />
              <Route path="/team" element={<PublicGate><Team /></PublicGate>} />
              <Route path="/academy" element={<PublicGate><Academy /></PublicGate>} />
              <Route path="/stats" element={<PublicGate><Stats /></PublicGate>} />
              <Route path="/contact" element={<PublicGate><Contact /></PublicGate>} />
              <Route path="/gallery" element={<PublicGate><Gallery /></PublicGate>} />
              <Route path="/news/:id" element={<PublicGate><NewsStory /></PublicGate>} />
              {/* Trials now live inside the Academy page */}
              <Route path="/apply" element={<Navigate to="/academy#apply" replace />} />
              <Route path="/trials" element={<Navigate to="/academy#apply" replace />} />

              <Route path="/auth" element={<Auth />} />
              <Route path="/cms" element={<CMS />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<PublicGate><NotFound /></PublicGate>} />
            </Routes>

          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


