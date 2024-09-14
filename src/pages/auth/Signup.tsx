import { resetError, resetSuccess, signup } from "@/store/auth/authSlice";
import { AppDispatch, RootState } from "@/store/store";
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

type Props = {};
type FormValues = {
  email: string;
  name: string;
  password: string;
};

const Signup = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [submited, setSubmited] = useState(false);
  const { values, errors, onSubmit, setFieldValue } = useForm<FormValues>({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validate: {
      name: (val) => (!val ? "Name is required" : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (data: FormValues) => {
    dispatch(signup(data));
    setSubmited(true);
  };

  useEffect(() => {
    if (submited && error && !loading) {
      toast.error(error);
    }

    if (success && !loading) {
      toast.success("Signup successful");
      navigate("/login");
    }

    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [error, success]);

  return (
    <Box className="blurry-background">
      <Paper radius="md" p="xl" w={"27rem"} withBorder {...props}>
        <Text size="xl" mb={"md"} fw={500}>
          Welcome,
        </Text>

        <form onSubmit={onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={values.name}
              onChange={(event) =>
                setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />

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
              to="/login"
              type="button"
              c="dimmed"
              size="xs"
            >
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl" size="md">
              Sign Up
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
