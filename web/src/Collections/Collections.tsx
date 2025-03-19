import { useEffect, useState } from "react";
import { ICollection } from "../shared/types";
import supabase from "../shared/utils/supabase";
import { Button, Grid, Image, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

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
              span={{ base: 12, sm: 6, lg: 4 }}
              key={collection.contract_address}
            >
              <Title order={3}>{collection.name}</Title>
              <Text>{collection.symbol}</Text>
              <Text>{collection.owner}</Text>
              <Text>{collection.contract_address}</Text>
              <Link to={`/collections/${collection.contract_address}`}>
                <Button size="sm" variant="light">
                  View
                </Button>
              </Link>
              <Image
                src={
                  import.meta.env.VITE_PINATA_BASE_URL +
                  collection.collection_cid
                }
                alt={collection.name}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}
