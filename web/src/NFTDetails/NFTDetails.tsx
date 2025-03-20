import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { INFT } from "../shared/types";
import supabase from "../shared/utils/supabase";
import { ImageLoader } from "../shared/components/ImageLoader";
import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import { NFTAuction } from "./NFTAuction";

export const NFTDetails = (): React.ReactElement => {
  const { address, tokenId } = useParams();
  const [nft, setNFT] = useState<INFT | null>(null);
  useEffect(() => {
    async function fetchNFT() {
      // fetch NFT by address and tokenId
      const { error, data } = await supabase
        .from("nfts")
        .select()
        .eq("collection_address", address)
        .eq("token_id", tokenId);

      if (error || data.length === 0) {
        console.error("Error fetching NFT:", error);
      } else {
        setNFT(data[0]);
      }
    }
    fetchNFT();
  });

  if (!nft) {
    return <div>Loading...</div>;
  }

  return (
    <Stack>
      <Flex gap={32} direction={{ base: "column", sm: "row" }}>
        <Flex justify="center">
          <ImageLoader
            width={320}
            height={320}
            src={nft.image_uri}
            alt={nft.name}
          />
        </Flex>
        <Flex direction="column">
          <Title order={1} mb={16}>
            <Box c="dimmed" display="inline">
              #{nft.token_id}{" "}
            </Box>
            {nft.name}
          </Title>
          <Text>Owned by: {nft.owner}</Text>
          <Text>
            Collection:{" "}
            <Text
              c="blue.4"
              component={Link}
              to={`/collections/${nft.collection_address}`}
            >
              {nft.collection_address}
            </Text>
          </Text>
          <Text my={16} h={172} style={{ overflow: "hidden" }}>
            {nft.description}
          </Text>
        </Flex>
      </Flex>
      <NFTAuction nft={nft} />
    </Stack>
  );
};
