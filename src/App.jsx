import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";

import { SavedPropertiesProvider } from "./context/SavedPropertiesContext";
import { ServiceRequestsProvider } from "./context/ServiceRequestsProvider";
import { InspectionsProvider } from "./context/InspectionsProvider";
import { PropertiesProvider } from "./context/PropertiesProvider";
import { AgentApplicationsProvider } from "./context/AgentApplicationsProvider";
import { ProviderApplicationsManager } from "./context/ProviderApplicationsManager";
import { ReviewsProvider } from "./context/ReviewsProvider";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import InspectionPage from "./pages/InspectionPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ServiceProvidersPage from "./pages/ServiceProvidersPage";
import ProviderDetailsPage from "./pages/ProviderDetailsPage";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import SavedPage from "./pages/SavedPage";
import ActivityPage from "./pages/ActivityPage";
import ProfilePage from "./pages/ProfilePage";
import HouseFinderDashboard from "./pages/HouseFinderDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import AgentInspectionsPage from "./pages/AgentInspectionsPage";
import AdminPropertyReviewsPage from "./pages/AdminPropertyReviewsPage";
import AdminAgentReviewsPage from "./pages/AdminAgentReviewsPage";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import ProviderProfileCompletionPage from "./pages/ProviderProfileCompletionPage";
import AdminProviderReviewsPage from "./pages/AdminProviderReviewsPage";
import ReviewPage from "./pages/ReviewPage";
import ProviderServiceRequestsPage from "./pages/ProviderServiceRequestsPage";
import MyListingsPage from "./pages/MyListingsPage";
import NotFoundPage from "./pages/NotFoundPage";

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
