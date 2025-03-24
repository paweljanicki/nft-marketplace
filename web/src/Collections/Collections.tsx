import { useEffect, useRef, useState } from "react";
import { ICollection } from "../shared/types";
import supabase from "../shared/utils/supabase";
import { Box, Flex, Grid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./collections.module.css";
import { ImageLoader } from "../shared/components/ImageLoader";

export function Collections(): React.ReactElement {
  const collectionsChannelRef = useRef<any>(null);
  const [collections, setCollections] = useState<ICollection[] | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      const { data, error } = await supabase.from("collections").select();
      if (error) {
        console.error("Error fetching collections:", error);
        setCollections(null);
      } else {
        setCollections(data);
      }
    }
    fetchCollections();

    const collectionsChannel = supabase
      .channel("collections")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "collections" },
        (payload) => {
          console.log("Change received!", payload);
          if (!payload.new) {
            return;
          }

          const newCollection = payload.new as ICollection;
          setCollections((collections) => {
            if (!collections) {
              return null;
            }
            return [...collections, newCollection];
          });
        }
      )
      .subscribe();
    collectionsChannelRef.current = collectionsChannel;

    return () => {
      console.log("Cleaning up subscription channel");
      if (collectionsChannelRef.current) {
        supabase.removeChannel(collectionsChannelRef.current);
      }
    };
  }, []);

  if (!collections) {
    return <p>Loading...</p>;
  }

  return (
    <Box maw={1024}>
      <h1>Collections</h1>

      <Grid>
        {collections.map((collection) => {
          return (
            <Grid.Col
              span={{ base: 12, sm: 6 }}
              key={collection.contract_address}
            >
              <Flex
                className={styles.collectionCard}
                component={Link}
                to={`/collections/${collection.contract_address}`}
                align="center"
                gap={16}
                p={8}
              >
                <ImageLoader
                  width={100}
                  height={100}
                  src={
                    import.meta.env.VITE_PINATA_BASE_URL +
                    collection.collection_cid
                  }
                  alt={collection.name}
                />
                <Flex direction="column" align="start">
                  <Title order={3}>{collection.name}</Title>
                  <Text>{collection.symbol}</Text>
                </Flex>
              </Flex>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
}
