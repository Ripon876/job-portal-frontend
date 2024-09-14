import { Pagination, Box, Button, Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";
import JobsTable from "./JobsTable";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteJob,
  fetchJobs,
  Job,
  resetError,
  resetSuccess,
  setPage,
} from "@/store/job/jobSlice";
import toast from "react-hot-toast";

const PostedJobsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, meta, error, success, loading } = useSelector(
    (state: RootState) => state.job
  );
  const page = useSelector((state: RootState) => state.job.meta.page);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const setCurrentPage = (page: number) => {
    dispatch(setPage(page));
  };

  const openDeleteModal = (job: Job) => {
    setSelectedJob(job);
    open();
  };

  const handleDelete = () => {
    if (selectedJob) {
      dispatch(deleteJob(selectedJob._id));
    }

    close();
  };

  useEffect(() => {
    dispatch(fetchJobs({ postedOnly: 1 }));
  }, [page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success && !loading) {
      toast.success("Job deleted successfully");
      navigate("/dashboard/jobs");
    }

    return () => {
      dispatch(resetError());
      dispatch(resetSuccess());
    };
  }, [error, loading]);

  const Actions = ({ job }: { job: any }) => {
    return (
      <Menu withArrow shadow="md" offset={-5}>
        <Menu.Target>
          <Button variant="transparent" c={"dark"}>
            <Ellipsis style={{ width: rem(20), height: rem(20) }} />
          </Button>
        </Menu.Target>
        <Menu.Dropdown py={"md"} px={"sm"}>
          <Menu.Item
            leftSection={<Pencil style={{ width: rem(14), height: rem(14) }} />}
            component={Link}
            to={`/dashboard/jobs/${job._id}/edit`}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 style={{ width: rem(14), height: rem(14) }} />}
            color="red"
            onClick={() => openDeleteModal(job)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <Box>
      <DeleteModal
        opened={opened}
        close={close}
        title="Delete Job"
        confirm={handleDelete}
        loading={loading}
      />
      <JobsTable jobs={jobs} Actions={Actions} />
      {jobs.length > 0 && (
        <Box display="flex" style={{ justifyContent: "end" }}>
          <Pagination
            total={Math.ceil(meta.total / meta.limit)}
            value={meta.page}
            onChange={setCurrentPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostedJobsTable;
