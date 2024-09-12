import { Box, Title } from "@mantine/core";
import JobForm from "@/components/forms/JobForm";

type Props = {};
type FormValues = {
  companyName: string;
  position: string;
  contract: string;
  location: string;
};

const AddJob = ({}: Props) => {
  const initialValues = {
    companyName: "",
    position: "",
    contract: "",
    location: "",
  };

  const handleSubmit = (data: FormValues) => {
    console.log("add job data", data);
  };

  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        Add new job
      </Title>
      <Box>
        <JobForm initialValues={initialValues} handleSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};

export default AddJob;
