import { useEffect, useState } from "react";
import { ICollection } from "../shared/types";
import supabase from "../shared/utils/supabase";
import { Box, Flex, Grid, Image, Loader, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./collections.module.css";

export function Collections(): React.ReactElement {
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
  }, []);

  supabase
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

  if (!collections) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
                <Box w={100} h={100} pos="relative">
                  <Flex
                    justify="center"
                    align="center"
                    h={100}
                    w={100}
                    pos="absolute"
                    style={{ zIndex: 10 }}
                  >
                    <Loader />
                  </Flex>
                  <Image
                    style={{ zIndex: 20 }}
                    pos="relative"
                    radius="md"
                    h={100}
                    w={100}
                    src={
                      import.meta.env.VITE_PINATA_BASE_URL +
                      collection.collection_cid
                    }
                    alt={collection.name}
                  />
                </Box>
                <Flex direction="column" align="start">
                  <Title order={3}>{collection.name}</Title>
                  <Text>{collection.symbol}</Text>
                </Flex>
              </Flex>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}
