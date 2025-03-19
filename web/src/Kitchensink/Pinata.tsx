import { useState } from "react";
import { pinata } from "../shared/utils/pinata";
import { getSignedUrl } from "../shared/utils";

export const Pinata = () => {
  const [file, setFile] = useState<File | null>(null);

  async function upload() {
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3>Pinata</h3>
      <button onClick={getSignedUrl}>Get signed URL</button>
      <button onClick={upload}>Upload</button>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
          console.log(file);
        }}
      />
    </div>
  );
};
