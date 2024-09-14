import { Card, Image, Text, Badge, Button, Group, Box } from "@mantine/core";
import jobCardImage from "@/assets/images/job-card.svg";
import { Job } from "@/store/job/jobSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type Props = {
  job: Job;
  apply: (job: Job) => void;
  appliedOnly?: boolean;
};

const JobCard = ({ job, apply, appliedOnly = false }: Props) => {
  const { loading, applyingFor, appliedJobs } = useSelector(
    (state: RootState) => state.job
  );

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mih={"100%"}>
      <Card.Section>
        <Image src={jobCardImage} height={160} alt="Frontend Developer" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" align="">
        <Box maw={"65%"}>
          <Text fw={500}>{job.position}</Text>
          <Text size="sm" c="dimmed">
            {job.companyName}
          </Text>
          <Text size="sm" c="dimmed">
            {job.location}
          </Text>
        </Box>
        <Badge color="blue" variant="light">
          {job.contract}
        </Badge>
      </Group>

      {/* Disable the apply button if the job is already applied */}
      <Button
        color="blue"
        mt="md"
        w={"max-content"}
        radius="xl"
        loading={applyingFor === job._id && loading}
        onClick={() => apply(job)}
        disabled={appliedOnly || appliedJobs.includes(job._id)}
      >
        {appliedOnly || appliedJobs.includes(job._id) ? "Applied" : "Apply"}
      </Button>
    </Card>
  );
};

export default JobCard;
