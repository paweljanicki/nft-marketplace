import { Button, Stack, Text, Title } from "@mantine/core";
import { INFT } from "../shared/types";
import { useAccount } from "wagmi";

export function NFTAuction({ nft }: { nft: INFT }): React.ReactElement {
  const account = useAccount();
  return (
    <Stack>
      <Title order={2}>Auction</Title>
      <Text>The auction hasn't started yet.</Text>
      {account?.address === nft.owner && <Button>Start auction</Button>}
    </Stack>
  );
}
