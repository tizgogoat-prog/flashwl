import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reglement from "./pages/Reglement";
import Streamers from "./pages/Streamers";
import Whitelist from "./pages/Whitelist";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import ReglementDiscord from "./pages/reglement/ReglementDiscord";
import ReglementHRP from "./pages/reglement/ReglementHRP";
import ReglementInterdictions from "./pages/reglement/ReglementInterdictions";
import ReglementSASP from "./pages/reglement/ReglementSASP";
import ReglementSAMC from "./pages/reglement/ReglementSAMC";
import ReglementGouvernement from "./pages/reglement/ReglementGouvernement";
import ReglementEntreprises from "./pages/reglement/ReglementEntreprises";
import ReglementImmobilier from "./pages/reglement/ReglementImmobilier";
import ReglementIllegal from "./pages/reglement/ReglementIllegal";
import ReglementNotionsRP from "./pages/reglement/ReglementNotionsRP";
import ReglementFAQ from "./pages/reglement/ReglementFAQ";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reglement" element={<Reglement />} />
          <Route path="/reglement/discord" element={<ReglementDiscord />} />
          <Route path="/reglement/hrp" element={<ReglementHRP />} />
          <Route path="/reglement/interdictions" element={<ReglementInterdictions />} />
          <Route path="/reglement/sasp" element={<ReglementSASP />} />
          <Route path="/reglement/samc" element={<ReglementSAMC />} />
          <Route path="/reglement/gouvernement" element={<ReglementGouvernement />} />
          <Route path="/reglement/entreprises" element={<ReglementEntreprises />} />
          <Route path="/reglement/immobilier" element={<ReglementImmobilier />} />
          <Route path="/reglement/illegal" element={<ReglementIllegal />} />
          <Route path="/reglement/notions-rp" element={<ReglementNotionsRP />} />
          <Route path="/reglement/faq" element={<ReglementFAQ />} />
          <Route path="/streamers" element={<Streamers />} />
          <Route path="/whitelist" element={<Whitelist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
