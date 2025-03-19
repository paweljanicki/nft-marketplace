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

export const createJsonFile = (
  data: object,
  fileName: string = "metadata.json"
) => {
  const jsonString = JSON.stringify(data, null, 2);
  const file = new File([jsonString], fileName, { type: "application/json" });
  return file;
};
