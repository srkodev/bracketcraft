
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournaments from "./pages/Tournaments";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Dashboard from "./pages/Dashboard";
import TournamentBracket from "./pages/TournamentBracket";
import CreateTournament from "./pages/CreateTournament";
import CreateTeam from "./pages/CreateTeam";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/create" element={<CreateTournament />} />
            <Route path="/tournaments/:id/bracket" element={<TournamentBracket />} />
            {/* Teams routes are still available but only accessible through tournament links */}
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/create" element={<CreateTeam />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/teams/:id/manage" element={<TeamDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
