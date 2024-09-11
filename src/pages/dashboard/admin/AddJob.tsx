import { Box, Title } from "@mantine/core";

type Props = {};

const AddJob = ({}: Props) => {
  return (
    <Box p={"md"}>
      <Title order={2} pb={"md"}>
        Add new job
      </Title>
    </Box>
  );
};

export default AddJob;
