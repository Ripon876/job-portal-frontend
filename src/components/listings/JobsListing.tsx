import { useState } from "react";
import { Box, Grid, Pagination } from "@mantine/core";
import JobsListingSearchBar from "./JobsListingSearchBar";
import JobCard from "./JobCard";

type Props = {};

const JobsListing = ({}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    contract: "",
  });

  const applyFilters = async () => {
    console.log("apply filters", filters);
  };

  return (
    <Box pb={"lg"} mb={"lg"}>
      <JobsListingSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
      />

      <Box mt={"md"}>
        {/* TODO: render job cards dynamically */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <JobCard />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <JobCard />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <JobCard />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <JobCard />
          </Grid.Col>
        </Grid>
        <Box display="flex" style={{ justifyContent: "center" }} my={"3rem"}>
          <Pagination
            total={10}
            value={currentPage}
            onChange={setCurrentPage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JobsListing;
