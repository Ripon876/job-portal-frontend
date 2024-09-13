import { Box, Title } from "@mantine/core";
import JobForm from "@/components/forms/JobForm";

type Props = {};
type FormValues = {
  companyName: string;
  position: string;
  contract: string;
  location: string;
  shortDescription: string;
};

const EditJob = ({}: Props) => {
  const initialValues = {
    companyName: "XYZ Inc.",
    position: "Software Engineer",
    contract: "Full-time",
    location: "New York",
    shortDescription:
      "We are looking for a software engineer to join our team.",
  };

  const handleSubmit = (data: FormValues) => {
    console.log("edit job data", data);
  };

  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        Edit job
      </Title>
      <Box>
        <JobForm initialValues={initialValues} handleSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default EditJob;
