import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export function useSupabaseTable<T, K = T>({
  tableName,
  formatter,
  order,
}: {
  tableName: string;
  formatter?: (data: T[]) => K[];
  order?: {
    column: string;
    ascending: boolean;
  };
}) {
  const [data, setData] = useState<K[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
    async function getData() {
      let query = supabase.from(tableName).select();

      if (order) {
        query = query.order(order.column, { ascending: order.ascending });
      }

      const { data, error } = await query;

      if (error) {
        console.error(`Error fetching data from ${tableName}:`, error);
        setData(null);
      } else {
        const formattedData = formatter
          ? formatter(data)
          : (data as unknown as K[]);
        setData(formattedData);
        console.log(`Fetched data from ${tableName}:`, formattedData);
      }
      setLoading(false);
    }
  }, [tableName, formatter]);

  return { data, loading };
}
