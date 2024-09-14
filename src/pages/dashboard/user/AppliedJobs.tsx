import JobsListing from "@/components/listings/JobsListing";
import { Box, Title } from "@mantine/core";

const AppliedJobs = () => {
  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        Applied Jobs
      </Title>
      <JobsListing appliedOnly/>
    </Box>
  );
};

export default AppliedJobs;
