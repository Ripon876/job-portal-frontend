import { Box, Title } from "@mantine/core";
import JobForm from "@/components/forms/JobForm";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { postJob, resetError, resetSuccess } from "@/store/job/jobSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {};
type FormValues = {
  companyName: string;
  position: string;
  contract: string;
  location: string;
};

const AddJob = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.job
  );
  const initialValues = {
    companyName: "",
    position: "",
    contract: "",
    location: "",
  };

  // Dispatch postJob action with job data to add a new job
  const handleSubmit = (data: FormValues) => {
    dispatch(postJob(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success && !loading) {
      toast.success("Job posted successfully");
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
        Add new job
      </Title>
      <Box>
        <JobForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default AddJob;
