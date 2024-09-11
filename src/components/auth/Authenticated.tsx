import { Navigate, Outlet } from "react-router-dom";

const Authenticated = ({
  requiredRoles = [],
}: {
  requiredRoles?: string[];
}) => {
  // TODO: Check if user is authenticated
  const isAuthenticated = true;
  const userRole = "admin";

  const hasRequiredRole =
    requiredRoles.length === 0 ||
    requiredRoles.some((role) => role === userRole);

  return isAuthenticated && hasRequiredRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Authenticated;
