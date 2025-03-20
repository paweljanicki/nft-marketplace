import { CopyButton, ActionIcon, Text } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

interface ShortAddressProps {
  address: string;
}

export const ShortAddress: React.FC<ShortAddressProps> = ({ address }) => {
  const shorten = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <CopyButton value={address} timeout={1500}>
      {({ copied, copy }) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text>{shorten(address)}</Text>
          <ActionIcon
            onClick={copy}
            color={copied ? "teal" : "transparent"}
            size="sm"
          >
            {copied ? (
              <IconCheck size={16} />
            ) : (
              <IconCopy color="gray" size={16} />
            )}
          </ActionIcon>
        </div>
      )}
    </CopyButton>
  );
};
