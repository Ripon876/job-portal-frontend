import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
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
]);

export default router;
