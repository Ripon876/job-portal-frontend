import { Card, Image, Text, Badge, Button, Group, Box } from "@mantine/core";
import jobCardImage from "@/assets/images/job-card.svg";
import { Job } from "@/store/job/jobSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type Props = {
  job: Job;
  apply: (job: Job) => void;
};

const JobCard = ({ job, apply }: Props) => {
  const { loading, applyingFor } = useSelector((state: RootState) => state.job);

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

      <Button
        color="blue"
        mt="md"
        w={"max-content"}
        radius="xl"
        loading={applyingFor === job._id && loading}
        onClick={() => apply(job)}
      >
        Apply
      </Button>
    </Card>
  );
};

export default JobCard;
