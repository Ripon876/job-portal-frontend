import { useState } from "react";
import { Box, Grid } from "@mantine/core";
import JobsListingSearchBar from "./JobsListingSearchBar";
import JobCard from "./JobCard";

type Props = {};

const JobsListing = ({}: Props) => {
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
      </Box>
    </Box>
  );
};

export default JobsListing;
