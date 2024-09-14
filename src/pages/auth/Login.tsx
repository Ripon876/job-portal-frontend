import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, resetError } from "@/store/auth/authSlice";
import { AppDispatch, RootState } from "@/store/store";

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { values, errors, onSubmit, setFieldValue } = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (data: FormValues) => {
    dispatch(login(data));
  };

  useEffect(() => {
    dispatch(resetError());
    
    if (error && !loading) {
      toast.error(error);
    }

    if (isAuthenticated && !loading) {
      toast.success("Login successful");
      navigate("/dashboard/jobs");
    }
    return () => {
      dispatch(resetError());
    };
  }, [error, isAuthenticated, user]);

  return (
    <Box className="blurry-background">
      <Paper radius="md" p="xl" w={"27rem"} withBorder {...props}>
        <Text size="xl" mb={"md"} fw={500}>
          Welcome back,
        </Text>

        <form onSubmit={onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="johndoe@gmail.com"
              value={values.email}
              onChange={(event) =>
                setFieldValue("email", event.currentTarget.value)
              }
              error={errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={values.password}
              onChange={(event) =>
                setFieldValue("password", event.currentTarget.value)
              }
              error={
                errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component={Link}
              to="/signup"
              type="button"
              c="dimmed"
              size="xs"
            >
              Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl" size="md" loading={loading}>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
