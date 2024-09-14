import JobsListing from "@/components/listings/JobsListing";
import { RootState } from "@/store/store";
import PostedJobsTable from "@/components/tables/PostedJobsTable";
import { Box, Title } from "@mantine/core";
import { useSelector } from "react-redux";

type Props = {};

const Jobs = ({}: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        {user?.role === "admin" ? "Posted Jobs" : "Jobs"}
      </Title>
      {/* Render the appropriate component based on the user's role */}
      {user?.role === "admin" ? <PostedJobsTable /> : <JobsListing />}
    </Box>
  );
};

export default Jobs;
