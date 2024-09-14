import { useEffect, useState } from "react";
import { Box, Flex, Grid, Pagination, Text } from "@mantine/core";
import JobsListingSearchBar from "./JobsListingSearchBar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  applyForJob,
  fetchAppliedJobs,
  fetchJobs,
  Job,
  resetError,
  resetSuccess,
  setApplyingFor,
  setLimit,
  setPage,
} from "@/store/job/jobSlice";
import { useDebouncedState } from "@mantine/hooks";
import toast from "react-hot-toast";

type Props = {
  appliedOnly?: boolean;
};

const JobsListing = ({ appliedOnly = false }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, meta, loading, error, success } = useSelector(
    (state: RootState) => state.job
  );
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

  // Update the search filters when user apllies filters or clears the filters
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

  // Store Job that is being applied for & dispatch applyForJob action
  const apply = (job: Job) => {
    dispatch(setApplyingFor(job._id));
    dispatch(applyForJob({ id: job._id }));
  };

  // Set the limit to 9 for the job listing
  useEffect(() => {
    dispatch(setLimit(9));
  }, []);

  // Fetch Jobs with search queries when page or search query changes
  useEffect(() => {
    const query: Record<string, any> = {
      ...searchFitlers,
      companyName: searchQuery,
    };
    if (appliedOnly) {
      query.appliedOnly = 1;
    }

    dispatch(fetchJobs(query));
  }, [page, searchQuery, searchFitlers]);

  // Fetch the applied jobs upon mount to store them in the store.
  useEffect(() => {
    if (!appliedOnly) {
      dispatch(fetchAppliedJobs());
    }
  }, [appliedOnly]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success && !loading) {
      toast.success("Applied for job successfully");
    }

    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [error, loading]);

  return (
    <Box pb={"lg"} mb={"lg"}>
      {/* Searchbar with search and fitler options */}
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

        <Grid>
          {jobs.map((job) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <JobCard job={job} apply={apply} appliedOnly={appliedOnly} />
            </Grid.Col>
          ))}
        </Grid>

        {/* Pagination */}
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
