import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button, Flex, Menu, Radio, TextInput } from "@mantine/core";

type Filters = {
  location: string;
  contract: string;
};

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  applyFilters: () => void;
};

const JobsListingSearchBar = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  applyFilters,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const canApply = filters.location || filters.contract;

  const clearFilters = () => {
    setFilters({
      location: "",
      contract: "",
    });
    setOpened(false);
  };

  const radioStyle: any = {
    label: {
      cursor: "pointer",
      userSelect: "none",
    },
  };

  const onApplyFilters = () => {
    setOpened(false);
    applyFilters();
  };

  return (
    <Flex w={"100%"} justify={"space-between"} gap={"md"}>
      <TextInput
        leftSection={<Search size={16} />}
        style={{ flex: 1 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        styles={{
          input: {
            height: "45px",
          },
        }}
      />

      <Menu
        withArrow
        shadow="md"
        offset={0}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Menu.Target>
          <Button
            variant="light"
            onClick={() => setOpened((opened) => !opened)}
            h={"45px"}
          >
            <Filter />
          </Button>
        </Menu.Target>
        <Menu.Dropdown py={"lg"} px={"md"}>
          <TextInput
            label="Location"
            placeholder="New York"
            value={filters.location}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                location: e.target.value || "",
              }))
            }
            mb={"xs"}
          />
          <Radio.Group
            name="favoriteFramework"
            label="Contract"
            mb={"lg"}
            value={filters.contract}
            onChange={(value) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                contract: value,
              }))
            }
          >
            <Flex direction={"column"} gap={"xs"}>
              <Radio value="Full-time" label="Full-time" styles={radioStyle} />
              <Radio value="Part-time" label="Part-time" styles={radioStyle} />
            </Flex>
          </Radio.Group>

          <Flex justify={"space-between"}>
            <Button
              variant="light"
              disabled={!canApply}
              onClick={onApplyFilters}
            >
              Apply
            </Button>
            <Button
              variant="transparent"
              disabled={!!!canApply}
              onClick={clearFilters}
            >
              Clear
            </Button>
          </Flex>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default JobsListingSearchBar;
