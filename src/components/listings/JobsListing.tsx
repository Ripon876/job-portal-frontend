import { useEffect, useState } from "react";
import { Box, Flex, Grid, Pagination, Text } from "@mantine/core";
import JobsListingSearchBar from "./JobsListingSearchBar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchJobs, setLimit, setPage } from "@/store/job/jobSlice";
import { useDebouncedState } from "@mantine/hooks";

type Props = {};

const JobsListing = ({}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, meta, loading } = useSelector((state: RootState) => state.job);
  const page = useSelector((state: RootState) => state.job.meta.page);
  const [searchQuery, setSearchQuery] = useDebouncedState("", 500);
  const [query, setQuery] = useState("");
  const [searchFitlers, setSearchFilters] = useState({});
  const [filters, setFilters] = useState({
    location: "",
    contract: "",
  });

  const setCurrentPage = (page: number) => {
    dispatch(setPage(page));
  };

  const updateSearchFitlers = async (clear = false) => {
    if (clear) {
      setSearchFilters({
        location: "",
        contract: "",
      });
    } else {
      setSearchFilters(filters);
    }
  };

  useEffect(() => {
    dispatch(setLimit(9));
  }, []);

  useEffect(() => {
    dispatch(fetchJobs({ ...searchFitlers, companyName: searchQuery }));
  }, [page, searchQuery, searchFitlers]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <Box pb={"lg"} mb={"lg"}>
      <JobsListingSearchBar
        searchQuery={query}
        setSearchQuery={setQuery}
        filters={filters}
        setFilters={setFilters}
        updateSearchFitlers={updateSearchFitlers}
      />

      <Box mt={"md"}>
        {jobs.length === 0 && !loading && (
          <Flex justify={"center"} align={"center"} py={"xl"}>
            <Text size="sm" c="dimmed">
              No jobs found
            </Text>
          </Flex>
        )}
        {/* TODO: render job cards dynamically */}
        <Grid>
          {jobs.map((job) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <JobCard job={job} />
            </Grid.Col>
          ))}
        </Grid>
        {jobs.length > 0 && (
          <Box display="flex" style={{ justifyContent: "center" }} my={"3rem"}>
            <Pagination
              value={meta.page}
              onChange={setCurrentPage}
              total={Math.ceil(meta.total / meta.limit)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default JobsListing;
