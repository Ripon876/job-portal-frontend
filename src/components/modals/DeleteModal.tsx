import { Button, Flex, Modal, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
  confirm: () => void;
  title: string;
};

const DeleteModal = ({ opened, confirm, close, title = "" }: Props) => {
  return (
    <Modal opened={opened} onClose={close} title={title} centered>
      <Text> Are you sure you want to delete this?</Text>
      <Flex justify={"end"} gap={"md"} pt={"md"}>
        <Button onClick={close} variant="outline">
          Cancel
        </Button>
        <Button onClick={confirm} color="red">
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
};

export default DeleteModal;
