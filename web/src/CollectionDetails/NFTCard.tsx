import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Flex,
  Box,
  Loader,
} from "@mantine/core";
import { INFT } from "../shared/types";
import { Link } from "react-router-dom";
import { ImageLoader } from "../shared/components/ImageLoader";

export function NFTCard({ nft }: { nft: INFT }): React.ReactElement {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      w="full"
      component={Link}
      to={`nft/${nft.token_id}`}
    >
      <Card.Section>
        <ImageLoader
          width={240}
          height={240}
          src={nft.image_uri}
          alt={nft.token_id.toString()}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Flex gap={4}>
          <Text fw="bolder" c="dimmed">
            #{nft.token_id}
          </Text>
          <Text fw={500}>{nft.name}</Text>
        </Flex>
      </Group>

      <Button fullWidth mt="md" radius="md">
        Buy
      </Button>
    </Card>
  );
}
