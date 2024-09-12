import { useState } from "react";
import { Box } from "@mantine/core";
import JobsListingSearchBar from "./JobsListingSearchBar";

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
    <Box>
      <JobsListingSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
      />
    </Box>
  );
};

export default JobsListing;
