import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

import { SavedPropertiesProvider } from "./context/SavedPropertiesContext";
import { ServiceRequestsProvider } from "./context/ServiceRequestsProvider";
import { InspectionsProvider } from "./context/InspectionsProvider";
import { PropertiesProvider } from "./context/PropertiesProvider";
import { AgentApplicationsProvider } from "./context/AgentApplicationsProvider";
import { ProviderApplicationsManager } from "./context/ProviderApplicationsManager";
import { ReviewsProvider } from "./context/ReviewsProvider";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));

const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const AddPropertyPage = lazy(() => import("./pages/AddPropertyPage"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));
const InspectionPage = lazy(() => import("./pages/InspectionPage"));

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailsPage = lazy(() => import("./pages/ServiceDetailsPage"));
const ServiceProvidersPage = lazy(() => import("./pages/ServiceProvidersPage"));
const ProviderDetailsPage = lazy(() => import("./pages/ProviderDetailsPage"));
const ServiceRequestPage = lazy(() => import("./pages/ServiceRequestPage"));

const SavedPage = lazy(() => import("./pages/SavedPage"));
const ActivityPage = lazy(() => import("./pages/ActivityPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const HouseFinderDashboard = lazy(() => import("./pages/HouseFinderDashboard"));
const AgentDashboard = lazy(() => import("./pages/AgentDashboard"));
const AgentInspectionsPage = lazy(() => import("./pages/AgentInspectionsPage"));

const AdminPropertyReviewsPage = lazy(
  () => import("./pages/AdminPropertyReviewsPage"),
);
const AdminAgentReviewsPage = lazy(
  () => import("./pages/AdminAgentReviewsPage"),
);
const AdminProviderReviewsPage = lazy(
  () => import("./pages/AdminProviderReviewsPage"),
);

const ServiceProviderDashboard = lazy(
  () => import("./pages/ServiceProviderDashboard"),
);
const ProviderProfileCompletionPage = lazy(
  () => import("./pages/ProviderProfileCompletionPage"),
);
const ProviderServiceRequestsPage = lazy(
  () => import("./pages/ProviderServiceRequestsPage"),
);

const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const MyListingsPage = lazy(() => import("./pages/MyListingsPage"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <ProviderApplicationsManager>
      <AgentApplicationsProvider>
        <PropertiesProvider>
          <InspectionsProvider>
            <ServiceRequestsProvider>
              <ReviewsProvider>
                <SavedPropertiesProvider>
                  <BrowserRouter>
                    <ScrollToTop />

                    <Suspense
                      fallback={
                        <div
                          className="flex min-h-[50vh] items-center justify-center bg-[#F7F3EA] text-[#174C3C]"
                          role="status"
                        >
                          Loading House&Serv...
                        </div>
                      }
                    >
                      <Routes>
                        <Route element={<MainLayout />}>
                          <Route path="/register" element={<RegisterPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route
                            path="/forgot-password"
                            element={<ForgotPasswordPage />}
                          />
                          <Route path="/" element={<HomePage />} />
                          <Route
                            path="/dashboard/agent/properties/new"
                            element={<AddPropertyPage />}
                          />
                          <Route
                            path="/dashboard/agent/properties/:id/edit"
                            element={<AddPropertyPage />}
                          />
                          <Route
                            path="/properties"
                            element={<PropertiesPage />}
                          />
                          <Route
                            path="/properties/:id"
                            element={<PropertyDetailsPage />}
                          />
                          <Route
                            path="/properties/:id/inspection"
                            element={<InspectionPage />}
                          />
                          <Route path="/services" element={<ServicesPage />} />
                          <Route
                            path="/services/:id"
                            element={<ServiceDetailsPage />}
                          />
                          <Route
                            path="/services/:id/providers"
                            element={<ServiceProvidersPage />}
                          />
                          <Route
                            path="/providers/:id"
                            element={<ProviderDetailsPage />}
                          />
                          <Route
                            path="/providers/:id/request"
                            element={<ServiceRequestPage />}
                          />
                          <Route path="/saved" element={<SavedPage />} />
                          <Route path="/activity" element={<ActivityPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route
                            path="/dashboard/house-finder"
                            element={<HouseFinderDashboard />}
                          />
                          <Route
                            path="/dashboard/agent"
                            element={<AgentDashboard />}
                          />
                          <Route
                            path="/dashboard/agent/inspections"
                            element={<AgentInspectionsPage />}
                          />
                          <Route
                            path="/dashboard/admin"
                            element={<AdminDashboardPage />}
                          />
                          <Route
                            path="/dashboard/admin/properties"
                            element={<AdminPropertyReviewsPage />}
                          />
                          <Route
                            path="/dashboard/admin/agents"
                            element={<AdminAgentReviewsPage />}
                          />
                          <Route
                            path="/admin/provider-reviews"
                            element={<AdminProviderReviewsPage />}
                          />
                          <Route
                            path="/dashboard/provider"
                            element={<ServiceProviderDashboard />}
                          />
                          <Route
                            path="/dashboard/provider/requests"
                            element={<ProviderServiceRequestsPage />}
                          />
                          <Route
                            path="/services/review/:id"
                            element={<ReviewPage />}
                          />
                          <Route
                            path="/dashboard/provider/profile"
                            element={<ProviderProfileCompletionPage />}
                          />
                          <Route
                            path="/dashboard/agent/properties"
                            element={<MyListingsPage />}
                          />
                          <Route path="*" element={<NotFoundPage />} />
                        </Route>
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </SavedPropertiesProvider>
              </ReviewsProvider>
            </ServiceRequestsProvider>
          </InspectionsProvider>
        </PropertiesProvider>
      </AgentApplicationsProvider>
    </ProviderApplicationsManager>
  );
}

export default App;
