import { List, ListPlus, LogOut } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  NavLink,
  Title,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/store/auth/authSlice";

type Props = {};

const DashboardLayout = ({}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [opened, { toggle }] = useDisclosure();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const items = () => {
    const navItems = [{ label: "Jobs", link: "/dashboard/jobs", icon: List }];

    if (user?.role === "admin") {
      navItems.push({
        label: "Add new job",
        link: "/dashboard/jobs/add",
        icon: ListPlus,
      });
    } else {
      navItems.push({
        label: "Applied Jobs",
        link: "/dashboard/jobs/applied",
        icon: ListPlus,
      });
    }

    return navItems.map((item) => (
      <NavLink
        component={Link}
        to={item.link}
        key={item.label}
        active={location.pathname === item.link}
        label={item.label}
        leftSection={<item.icon size="1rem" strokeWidth="1.5" />}
        fz={"lg"}
        fw={500}
      />
    ));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 350, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={2}>Job Portal</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Flex direction="column" justify={"space-between"} h={"100%"}>
          <Box>{items()}</Box>
          <NavLink
            label="Logout"
            leftSection={<LogOut size="1rem" strokeWidth="1.5" />}
            fz={"lg"}
            fw={500}
            onClick={logout}
          />
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
