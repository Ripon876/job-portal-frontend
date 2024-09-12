import JobsListing from "@/components/listings/JobsListing";
// import AdminJobsTable from "@/components/tables/AdminJobsTable";
import { Box, Title } from "@mantine/core";

type Props = {};

const Jobs = ({}: Props) => {
  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        Jobs
      </Title>
      {/* TODO: render compoennt based on user role */}
      {/* <AdminJobsTable /> */}
      <JobsListing />
    </Box>
  );
};

export default Jobs;
