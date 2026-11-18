
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-600">Checking your account...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardRoutes = {
      house_finder: "/dashboard/house-finder",
      agent: "/dashboard/agent",
      service_provider: "/dashboard/provider",
      admin: "/dashboard/admin",
    };

    return (
      <Navigate
        to={dashboardRoutes[user.role] || "/"}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
