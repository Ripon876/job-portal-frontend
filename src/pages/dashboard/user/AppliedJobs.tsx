import { Box, Title } from "@mantine/core";
import AppliedJobsTable from "@/components/tables/AppliedJobsTable";

type Props = {};

const AppliedJobs = ({}: Props) => {
  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        Applied Jobs
      </Title>

      <AppliedJobsTable />
    </Box>
  );
};

export default AppliedJobs;
