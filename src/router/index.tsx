import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Jobs from "@/pages/dashboard/Jobs";
import AddJob from "@/pages/dashboard/admin/AddJob";
import EditJob from "@/pages/dashboard/admin/EditJob";
import AppliedJobs from "@/pages/dashboard/user/AppliedJobs";
import Authenticated from "@/components/auth/Authenticated";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import UnAuthenticated from "@/components/auth/UnAuthenticated";
import RoleGuard from "@/components/auth/RoleGuard";

const router: any = createBrowserRouter([
  {
    element: <UnAuthenticated />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/login"} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <Authenticated />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "jobs",
            element: <Jobs />,
          },
          {
            element: <RoleGuard requiredRoles={["admin"]} />,
            children: [
              {
                path: "jobs/add",
                element: <AddJob />,
              },
              {
                path: "jobs/:id/edit",
                element: <EditJob />,
              },
            ],
          },
          {
            element: <RoleGuard requiredRoles={["user"]} />,
            children: [
              {
                path: "jobs/applied",
                element: <AppliedJobs />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
