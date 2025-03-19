import { PinataSDK } from "pinata";
import { getSignedUrl } from ".";

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.VITE_GATEWAY_URL}`,
});

export async function uploadFileToPinata(file: File) {
  let url;
  try {
    url = await getSignedUrl();
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(file);
  if (!file) return;
  try {
    const upload = await pinata.upload.public.file(file).url(url);
    console.log(upload);
    return upload.cid;
  } catch (error) {
    console.log(error);
  }
}
