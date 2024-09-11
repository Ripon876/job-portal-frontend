import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";

type Props = {};
type FormValues = {
  email: string;
  name: string;
  password: string;
  terms: boolean;
};

const Signup = (props: Props) => {
  const { values, errors, onSubmit, setFieldValue } = useForm<FormValues>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: false,
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
    console.log("signup data", data);
  };

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

            <Checkbox
              required
              label="I accept terms and conditions"
              checked={values.terms}
              onChange={(event) =>
                setFieldValue("terms", event.currentTarget.checked)
              }
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
