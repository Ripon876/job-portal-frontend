import { Table } from "@mantine/core";

export type Job = {
  id: number;
  companyName: string;
  position: string;
  contract: string;
  location: string;
};

type Props = {
  jobs: Job[];
  Actions?: React.ComponentType<{ job: any }>;
};

const JobsTable = ({ jobs, Actions }: Props) => {
  const rows = jobs.map((job) => (
    <Table.Tr key={job.id}>
      <Table.Td>{job.companyName}</Table.Td>
      <Table.Td>{job.position}</Table.Td>
      <Table.Td>{job.contract}</Table.Td>
      <Table.Td>{job.location}</Table.Td>
      {Actions && (
        <Table.Td ta={"end"}>
          <Actions job={job} />
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Table mb="lg">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Company name</Table.Th>
          <Table.Th>Position</Table.Th>
          <Table.Th>Contract</Table.Th>
          <Table.Th>Location</Table.Th>
          {Actions && <Table.Th ta={"end"}>Actions</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default JobsTable;
