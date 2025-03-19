import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export function useSupabaseList<T>({
  tableName,
  key,
  value,
  order,
  limit = 100,
}: {
  tableName: string;
  key: string;
  value: string | number | boolean;
  order: {
    column: string;
    ascending: boolean;
  };
  limit: number;
}) {
  const [list, setList] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!key) return;
    console.log("Fetching", tableName, "by", key, "with value", value);

    async function getItem() {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq(key, value)
        .order(order.column, { ascending: order.ascending })
        .limit(limit);

      if (error) {
        console.error(
          `Error fetching ${tableName} by ${key}: ${value}. Error details:`,
          error
        );
        setList(null);
      } else {
        setList(data || null);
      }
      setLoading(false);
    }

    getItem();
  }, [tableName, key, value, limit, order.column, order.ascending]);

  async function reload() {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq(key, value)
      .order(order.column, { ascending: order.ascending })
      .limit(limit);

    if (error) {
      console.error(
        `Error fetching ${tableName} by ${key}: ${value}. Error details:`,
        error
      );
      setList(null);
    } else {
      setList(data || null);
    }
    setLoading(false);
  }

  return { item: list, loading, reload };
}
