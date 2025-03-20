import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ICollection, INFT } from "../shared/types";
import supabase from "../shared/utils/supabase";
import { notifications } from "@mantine/notifications";
import { Box, Button, Flex, Image, Loader, Text, Title } from "@mantine/core";
import { useAccount } from "wagmi";
import { NFTCard } from "./NFTCard";
import { ShortAddress } from "../shared/components/ShortAddress";

export function CollectionDetails(): React.ReactElement {
  const account = useAccount();
  const { address } = useParams();
  const [collection, setCollection] = useState<ICollection | null>(null);
  const [NFTs, setNFTs] = useState<INFT[]>([]);

  useEffect(() => {
    async function fetchCollection() {
      const { data, error } = await supabase
        .from("collections")
        .select()
        .eq("contract_address", address);

      if (error || data.length === 0) {
        console.error("Error fetching collections:", error);
        setCollection(null);
        notifications.show({
          title: "Error fetching collection",
          message: "Collection not found",
          color: "red",
        });
      } else {
        setCollection(data[0]);
      }
    }

    async function fetchNFTs() {
      const { data, error } = await supabase
        .from("nfts")
        .select()
        .eq("collection_address", address);

      if (error) {
        console.error("Error fetching NFTs:", error);
        notifications.show({
          title: "Error fetching NFTs",
          message: "NFTs not found",
          color: "red",
        });
      } else if (data.length === 0) {
        console.log("No NFTs found");
      } else {
        console.log(data);
        setNFTs(data);
      }
    }

    fetchCollection();
    fetchNFTs();
  }, [address]);

  supabase
    .channel("nfts")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "nfts" },
      (payload) => {
        console.log("Change received!", payload);
        if (!payload.new) {
          return;
        }

        const newNFT = payload.new as INFT;
        setNFTs((items) => {
          return [...items, newNFT];
        });
      }
    )
    .subscribe();

  if (!address || !collection) {
    return <div>Loading...</div>;
  }

  return (
    <Box maw={1024}>
      <Flex justify="space-between" align="center" mb={16}>
        <Title order={1}>{collection.name}</Title>
        {account && account.address === collection.owner && (
          <Button variant="outline" component={Link} to="mint">
            Mint
          </Button>
        )}
      </Flex>
      <Flex gap={32}>
        <Box w={160} h={160} pos="relative">
          <Flex
            justify="center"
            align="center"
            h={160}
            w={160}
            pos="absolute"
            style={{ zIndex: 10 }}
          >
            <Loader />
          </Flex>
          <Image
            style={{ zIndex: 20 }}
            pos="relative"
            radius="md"
            h={160}
            w={160}
            src={
              import.meta.env.VITE_PINATA_BASE_URL + collection.collection_cid
            }
            alt={collection.name}
          />
        </Box>
        <Flex direction="column" gap={8}>
          <Flex gap="8">
            <Text>Symbol:</Text>
            <Text style={{ textTransform: "uppercase" }} fw="bold">
              {collection.symbol}
            </Text>
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 0, sm: 8 }}
          >
            <Text>Contract:</Text>
            <ShortAddress address={collection.contract_address} />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 0, sm: 8 }}
          >
            <Text>Owner:</Text>
            <ShortAddress address={collection.owner} />
          </Flex>
        </Flex>
      </Flex>
      <Box mt={32}>
        <Title order={2} mb={16}>
          Items:
        </Title>
        <Flex gap={16} wrap="wrap">
          {NFTs.length === 0 && <Text>No items found</Text>}
          {NFTs.map((nft) => (
            <Box key={nft.token_id} w={240}>
              <NFTCard nft={nft} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
