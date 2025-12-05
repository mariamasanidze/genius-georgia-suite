import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Layout Components
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Public Pages
import LandingPage from "@/pages/LandingPage";
import FeaturesPage from "@/pages/FeaturesPage";
import UseCasesPage from "@/pages/UseCasesPage";
import PricingPage from "@/pages/PricingPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LinkedInCallbackPage from "@/pages/dashboard/LinkedInCallbackPage";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import ActivateAccountPage from "@/pages/auth/ActivateAccountPage";

// Dashboard Pages
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ContentGenerator from "@/pages/dashboard/ContentGenerator";
import ContentCalendar from "@/pages/dashboard/ContentCalendar";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import CommunityPage from "@/pages/dashboard/CommunityPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import BillingPage from "@/pages/dashboard/BillingPage";
import ChangePasswordPage from "@/pages/dashboard/ChangePasswordPage.tsx";
import PostsPage from "@/pages/dashboard/PostsPage";
import PostDetailsPage from "@/pages/dashboard/PostDetailsPage";


// Other
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <LanguageProvider>
            <AuthProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>

                            {/* Public Marketing Routes */}
                            <Route
                                path="/"
                                element={
                                    <PublicLayout>
                                        <LandingPage />
                                    </PublicLayout>
                                }
                            />

                            <Route
                                path="/features"
                                element={
                                    <PublicLayout>
                                        <FeaturesPage />
                                    </PublicLayout>
                                }
                            />

                            <Route
                                path="/use-cases"
                                element={
                                    <PublicLayout>
                                        <UseCasesPage />
                                    </PublicLayout>
                                }
                            />

                            <Route
                                path="/pricing"
                                element={
                                    <PublicLayout>
                                        <PricingPage />
                                    </PublicLayout>
                                }
                            />

                            <Route
                                path="/about"
                                element={
                                    <PublicLayout>
                                        <AboutPage />
                                    </PublicLayout>
                                }
                            />

                            <Route
                                path="/contact"
                                element={
                                    <PublicLayout>
                                        <ContactPage />
                                    </PublicLayout>
                                }
                            />

                            {/* Authentication Routes */}
                            <Route
                                path="/login"
                                element={
                                    <AuthLayout>
                                        <LoginPage />
                                    </AuthLayout>
                                }
                            />

                            <Route
                                path="/register"
                                element={
                                    <AuthLayout>
                                        <RegisterPage />
                                    </AuthLayout>
                                }
                            />
                            <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
                            <Route path="/reset-password" element={<AuthLayout><ResetPasswordPage /></AuthLayout>} />
                            <Route
                                path="/activate-account"
                                element={<AuthLayout><ActivateAccountPage /></AuthLayout>}
                            />

                            {/* Protected Dashboard Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <DashboardPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/linkedin/callback" element={<LinkedInCallbackPage />} />

                            <Route
                                path="/content/generator"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <ContentGenerator />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/content/calendar"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <ContentCalendar />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/posts"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <PostsPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard/posts/:id"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <PostDetailsPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/analytics"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <AnalyticsPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/community"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <CommunityPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/settings"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <SettingsPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/billing"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <BillingPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/settings/change-password"
                                element={
                                    <ProtectedRoute>
                                        <DashboardLayout>
                                            <ChangePasswordPage />
                                        </DashboardLayout>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Catch-all 404 Route */}
                            <Route path="*" element={<NotFound />} />

                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </AuthProvider>
        </LanguageProvider>
    </QueryClientProvider>
);

export default App;
