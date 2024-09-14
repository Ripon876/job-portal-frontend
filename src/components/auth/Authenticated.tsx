import { fetchUser, resetError } from "@/store/auth/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Authenticated = ({}: {}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    }

    if (error) {
      dispatch(resetError());
      setLoading(false);
    }
  }, [isAuthenticated, error]);

  // Show loading screen until fetching user
  if (loading) {
    return (
      <Flex justify={"center"} align="center" h="100vh" mih={"100vh"}>
        <Loader color="blue" />
      </Flex>
    );
  } else {
    // Render Outlet if user is authenticated otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  }
};

export default Authenticated;
