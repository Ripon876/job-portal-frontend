import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ requiredRoles = [] }: { requiredRoles?: string[] }) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Check if user has required role for the current route
  const hasRequiredRole =
    requiredRoles.length === 0 ||
    requiredRoles.some((role) => role === user?.role);

  // Redirect to jobs page if user does not have required role to access current route
  return isAuthenticated && hasRequiredRole ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard/jobs" replace />
  );
};

export default RoleGuard;
