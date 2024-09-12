import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Box,
  Flex,
} from "@mantine/core";
import jobCardImage from "@/assets/images/job-card.svg";

type Props = {};

const JobCard = ({}: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mih={"100%"}>
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

      <Flex direction={"column"} justify={"space-between"} flex={1}>
        <Text size="sm" c="dimmed">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Enim duis
          ultricies euismod vel in ultrices massa elit.Enim duis ultricies
        </Text>

        <Button color="blue" mt="md" w={"max-content"} radius="xl">
          Apply
        </Button>
      </Flex>
    </Card>
  );
};

export default JobCard;
