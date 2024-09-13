import { useState } from "react";
import { Pagination, Box } from "@mantine/core";
import JobsTable, { Job } from "./JobsTable";

const AppliedJobsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const jobs: Job[] = [
    {
      id: 1,
      companyName: "Acme Corp",
      position: "Software Engineer",
      contract: "Full-time",
      location: "New York",
    },
    {
      id: 2,
      companyName: "Globex Inc",
      position: "Data Scientist",
      contract: "Part-time",
      location: "San Francisco",
    },
    {
      id: 3,
      companyName: "Hooli",
      position: "UX Designer",
      contract: "Intern",
      location: "Austin",
    },
    {
      id: 4,
      companyName: "Umbrella Corp",
      position: "Network Engineer",
      contract: "Full-time",
      location: "Seattle",
    },
  ];

  return (
    <Box>
      <JobsTable jobs={jobs} />
      <Box display="flex" style={{ justifyContent: "end" }}>
        <Pagination total={10} value={currentPage} onChange={setCurrentPage} />
      </Box>
    </Box>
  );
};

export default AppliedJobsTable;
