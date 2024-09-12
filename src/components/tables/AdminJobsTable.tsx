import { Table, Pagination, Box, Button, Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../modals/DeleteModal";

const AdminJobsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const jobs = [
    {
      id: 1,
      companyName: "Acme Corp",
      position: "Software Engineer",
      contract: "Full-time",
      location: "New York",
    },
    {
      id: 2,
      companyName: "Globex Inc",
      position: "Data Scientist",
      contract: "Part-time",
      location: "San Francisco",
    },
    {
      id: 3,
      companyName: "Hooli",
      position: "UX Designer",
      contract: "Intern",
      location: "Austin",
    },
    {
      id: 4,
      companyName: "Umbrella Corp",
      position: "Network Engineer",
      contract: "Full-time",
      location: "Seattle",
    },
  ];

  const handleDelete = (job?: any) => {
    console.log("delete job", job);
    close();
  };

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
            to={`/dashboard/jobs/${job.id}/edit`}
          >
            Edit
          </Menu.Item>
          <Menu.Item
            leftSection={<Trash2 style={{ width: rem(14), height: rem(14) }} />}
            color="red"
            onClick={() => open()}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };

  const rows = jobs.map((job) => (
    <Table.Tr key={job.id}>
      <Table.Td>{job.companyName}</Table.Td>
      <Table.Td>{job.position}</Table.Td>
      <Table.Td>{job.contract}</Table.Td>
      <Table.Td>{job.location}</Table.Td>
      <Table.Td ta={"end"}>
        <Actions job={job} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <DeleteModal
        opened={opened}
        close={close}
        title="Delete Job"
        confirm={handleDelete}
      />
      <Table mb="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Company name</Table.Th>
            <Table.Th>Position</Table.Th>
            <Table.Th>Contract</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th ta={"end"}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Box display="flex" style={{ justifyContent: "end" }}>
        <Pagination total={10} value={currentPage} onChange={setCurrentPage} />
      </Box>
    </Box>
  );
};

export default AdminJobsTable;
