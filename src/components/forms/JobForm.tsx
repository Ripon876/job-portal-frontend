import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type FormValues = {
  companyName: string;
  position: string;
  contract: string;
  location: string;
};

type JobFormProps = {
  initialValues: FormValues;
  handleSubmit: (values: FormValues) => void;
  loading: boolean;
};

const JobForm = ({ initialValues, handleSubmit, loading }: JobFormProps) => {
  const { values, errors, setFieldValue, onSubmit } = useForm<FormValues>({
    initialValues,
    validate: {
      companyName: (val) => (!val ? "Company name is required" : null),
      position: (val) => (!val ? "Position is required" : null),
      contract: (val) => (!val ? "Contract is required" : null),
      location: (val) => (!val ? "Location is required" : null),
    },
  });

  return (
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
          error={errors.companyName}
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
          error={errors.position}
          radius="md"
        />

        <Select
          required
          label="Contract"
          placeholder="Full time"
          data={["Full time", "Part time"]}
          value={values.contract}
          onChange={(value) => setFieldValue("contract", value || "")}
          error={errors.contract}
          withCheckIcon={false}
          radius="md"
        />

        <TextInput
          required
          label="Location"
          placeholder="New York"
          value={values.location}
          onChange={(event) =>
            setFieldValue("location", event.currentTarget.value)
          }
          error={errors.location}
          radius="md"
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Button type="submit" radius="xl" size="md" loading={loading}>
          Save
        </Button>
      </Group>
    </form>
  );
};

export default JobForm;
