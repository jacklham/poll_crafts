import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "@/contexts/AuthContext";

// Components
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import PollsIndex from "./pages/polls/PollsIndex";
import PollDetail from "./pages/polls/PollDetail";
import CreatePoll from "./pages/polls/CreatePoll";
import Community from "./pages/community/Community";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/polls" replace />} />
            <Route path="/home" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/polls" element={<PollsIndex />} />
            <Route path="/polls/:id" element={<PollDetail />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePoll />
                </ProtectedRoute>
              }
            />
            <Route path="/community" element={<Community />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent multiple root creation during development
const container = document.getElementById("root");
if (container && !container.hasAttribute('data-root-created')) {
  container.setAttribute('data-root-created', 'true');
  createRoot(container).render(<App />);
}
