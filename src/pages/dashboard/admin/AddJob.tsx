import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {};
type FormValues = {
  companyName: string;
  position: string;
  contract: string;
  location: string;
};

const AddJob = ({}: Props) => {
  const { values, errors, onSubmit, setFieldValue } = useForm<FormValues>({
    initialValues: {
      companyName: "",
      position: "",
      contract: "",
      location: "",
    },
    validate: {
      companyName: (val) => (!val ? "Name is required" : null),
      position: (val) => (!val ? "Position is required" : null),
      contract: (val) => (!val ? "Contract is required" : null),
      location: (val) => (!val ? "Location is required" : null),
    },
  });

  const handleSubmit = (data: FormValues) => {
    console.log("login data", data);
  };

  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        Add new job
      </Title>
      <Box>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Company Name"
              placeholder="ABC Inc."
              value={values.companyName}
              onChange={(event) =>
                setFieldValue("companyName", event.currentTarget.value)
              }
              error={errors.email && "Company name is required"}
              radius="md"
            />

            <TextInput
              required
              label="Position"
              placeholder="Software Engineer"
              value={values.position}
              onChange={(event) =>
                setFieldValue("position", event.currentTarget.value)
              }
              error={errors.email && "Position is required"}
              radius="md"
            />

            <Select
              required
              label="Contract"
              placeholder="Full-time"
              data={["Full-time", "Part-time"]}
              value={values.contract}
              onChange={(value) => setFieldValue("contract", value || "")}
              error={errors.email && "Contract is required"}
              radius="md"
              withCheckIcon={false}
            />

            <TextInput
              required
              label="Location"
              placeholder="New York"
              value={values.location}
              onChange={(event) =>
                setFieldValue("location", event.currentTarget.value)
              }
              error={errors.email && "Location is required"}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button type="submit" radius="xl" size="md">
              Add
            </Button>
          </Group>
        </form>
      </Box>
    </Box>
  );
};

export default AddJob;
