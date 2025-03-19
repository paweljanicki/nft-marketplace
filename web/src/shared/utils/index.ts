import supabase from "./supabase";

export const getSignedUrl = async () => {
  const { data, error } = await supabase.functions.invoke(
    "get-pinata-signed-upload-url"
  );

  if (error) {
    throw error;
  }

  return data.uploadUrl;
};
