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

  const apply = (job: Job) => {
    dispatch(setApplyingFor(job._id));
    dispatch(applyForJob({ id: job._id }));
  };

  useEffect(() => {
    dispatch(setLimit(9));
  }, []);

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
      toast.success("Apply for job successfully");
    }

    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [error, loading]);

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
              <JobCard job={job} apply={apply} appliedOnly={appliedOnly} />
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
