import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ requiredRoles = [] }: { requiredRoles?: string[] }) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const hasRequiredRole =
    requiredRoles.length === 0 ||
    requiredRoles.some((role) => role === user?.role);

  return isAuthenticated && hasRequiredRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RoleGuard;
