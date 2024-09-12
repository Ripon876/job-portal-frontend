import { Card, Image, Text, Badge, Button, Group, Box } from "@mantine/core";
import jobCardImage from "@/assets/images/job-card.svg";

type Props = {};

const JobCard = ({}: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={jobCardImage} height={160} alt="Frontend Developer" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" align="">
        <Box>
          <Text fw={500}>Frontend Developer</Text>
          <Text size="sm" c="dimmed">
            XYZ Company
          </Text>
        </Box>
        <Badge color="blue" variant="light">
          Full-time
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Enim duis ultricies
        euismod vel in ultrices massa elit.
      </Text>

      <Button color="blue" mt="md" w={"max-content"} radius="md">
        Apply
      </Button>
    </Card>
  );
};

export default JobCard;
