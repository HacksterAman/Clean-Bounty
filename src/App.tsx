import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import SignInPage from "./components/auth/SignIn";
import SignUpPage from "./components/auth/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import MapView from "./pages/MapView";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";
import { AITest } from "./components/AITest";

const queryClient = new QueryClient();

const App = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen bg-gray-50">
            <main>
              <Routes>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <Upload />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <ProtectedRoute>
                      <MapView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/rewards"
                  element={
                    <ProtectedRoute>
                      <Rewards />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ai-test"
                  element={
                    <ProtectedRoute>
                      <AITest />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
