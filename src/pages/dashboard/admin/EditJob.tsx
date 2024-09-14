import { Box, Title } from "@mantine/core";
import JobForm from "@/components/forms/JobForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import {
  fetchJob,
  resetError,
  resetSuccess,
  updateJob,
} from "@/store/job/jobSlice";
import toast from "react-hot-toast";

type Props = {};
type FormValues = {
  _id?: string;
  companyName: string;
  position: string;
  contract: string;
  location: string;
};

const EditJob = ({}: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    job: jobToEdit,
    loading,
    error,
    success,
  } = useSelector((state: RootState) => state.job);

  const initialValues = {
    companyName: "",
    position: "",
    contract: "",
    location: "",
    ...jobToEdit,
  };

  // Dispatch the updateJob action with job data and id to update the job
  const handleSubmit = ({ _id, ...jobData }: FormValues) => {
    if (id) {
      dispatch(updateJob({ id, jobData }));
    }
  };

  // Fetch the job details to edit
  useEffect(() => {
    if (id) {
      dispatch(fetchJob(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success && !loading) {
      toast.success("Job updated successfully");
      navigate("/dashboard/jobs");
    }

    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [error, loading]);

  return (
    <Box p={"md"} maw={"1024px"} mx={"auto"}>
      <Title order={2} pb={"md"}>
        Edit job {loading}
      </Title>
      <Box>
        {Object.keys(jobToEdit).length > 0 && (
          <JobForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditJob;
