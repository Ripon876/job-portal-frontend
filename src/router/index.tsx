import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Jobs from "@/pages/dashboard/Jobs";
import AddJob from "@/pages/dashboard/admin/AddJob";
import AppliedJobs from "@/pages/dashboard/user/AppliedJobs";
import Authenticated from "@/components/auth/Authenticated";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router: any = createBrowserRouter([
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
  {
    element: <Authenticated requiredRoles={["admin", "user"]} />,
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
            element: <Authenticated requiredRoles={["admin"]} />,
            children: [
              {
                path: "jobs/add",
                element: <AddJob />,
              },
            ],
          },
          {
            element: <Authenticated requiredRoles={["user"]} />,
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
