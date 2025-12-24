/**
 * ============================================
 * Main Application Component
 * ============================================
 * 
 * This is the root component of the application.
 * It sets up:
 * - React Router for page navigation
 * - React Query for data fetching (optional, for future use)
 * - Authentication context for user login state
 * - Toast notifications for user feedback
 * 
 * FOLDER STRUCTURE:
 * - /pages       = Full page components (Home, Login, Dashboard, etc.)
 * - /components  = Reusable UI components
 * - /contexts    = React Contexts (shared state like auth)
 * - /services    = API calls and external services
 * - /types       = TypeScript type definitions
 * - /hooks       = Custom React hooks
 */

// UI Components for notifications
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// React Query for data fetching (optional feature)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Router for navigation
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Our custom auth context
import { AuthProvider } from "@/contexts/AuthContext";

// Protected route wrapper
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Page components
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Create a React Query client (for caching API responses)
const queryClient = new QueryClient();

/**
 * App Component
 * 
 * The component structure is like nested boxes:
 * 
 * QueryClientProvider (data caching)
 *   └── AuthProvider (login state)
 *         └── TooltipProvider (tooltips)
 *               └── BrowserRouter (page navigation)
 *                     └── Routes (your pages)
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            {/* Toast notification containers */}
            <Toaster />
            <Sonner />

            {/* Routes */}
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* PROTECTED ROUTES */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
