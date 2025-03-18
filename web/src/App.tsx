// import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "./Header";

function App() {
  // const account = useAccount();
  // const { connectors, connect, status, error } = useConnect();
  // const { disconnect } = useDisconnect();

  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <Notifications autoClose={5000} position="top-right" />
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 240,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Header>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Header>
        </AppShell.Header>

        <AppShell.Navbar p="md">{/* <Navbar /> */}</AppShell.Navbar>

        <AppShell.Main w={{ base: "95vw" }}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default App;
