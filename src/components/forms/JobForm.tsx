import {
  Button,
  Group,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type FormValues = {
  companyName: string;
  position: string;
  contract: string;
  location: string;
  shortDescription: string;
};

type JobFormProps = {
  initialValues: FormValues;
  handleSubmit: (values: FormValues) => void;
};

const JobForm = ({ initialValues, handleSubmit }: JobFormProps) => {
  const { values, errors, setFieldValue, onSubmit } = useForm<FormValues>({
    initialValues,
    validate: {
      companyName: (val) => (!val ? "Company name is required" : null),
      position: (val) => (!val ? "Position is required" : null),
      contract: (val) => (!val ? "Contract is required" : null),
      location: (val) => (!val ? "Location is required" : null),
      shortDescription: (val) =>
        !val ? "Short Description is required" : null,
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
          placeholder="Full-time"
          data={["Full-time", "Part-time"]}
          value={values.contract}
          onChange={(value) => setFieldValue("contract", value || "")}
          error={errors.contract}
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

        <Textarea
          required
          label="Short Description"
          description="Max 125 characters"
          placeholder="Lorem ipsum odor amet, consectetuer adipiscing elit"
          value={values.shortDescription}
          onChange={(event) =>
            setFieldValue("shortDescription", event.currentTarget.value)
          }
          error={errors.shortDescription}
          radius="md"
          rows={3}
          maxLength={125}
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Button type="submit" radius="xl" size="md">
          Save
        </Button>
      </Group>
    </form>
  );
};

export default JobForm;
