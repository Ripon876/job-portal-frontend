import AdminJobsTable from "@/components/tables/AdminJobsTable";
import { Box, Title } from "@mantine/core";

type Props = {};

const Jobs = ({}: Props) => {
  return (
    <Box p={"md"}>
      <Title order={2} pb={"md"}>
        Jobs
      </Title>
      <AdminJobsTable />
    </Box>
  );
};

export default Jobs;
