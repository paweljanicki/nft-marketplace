import { Flex } from "@mantine/core";
import { ConnectKitButton } from "connectkit";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex px={16} justify="space-between" align="center" w="full" h={60}>
      <div>{children}</div>
      <ConnectKitButton />
    </Flex>
  );
};
