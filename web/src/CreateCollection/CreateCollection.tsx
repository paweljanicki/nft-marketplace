import { Button, TextInput } from "@mantine/core";
import { matches, useForm } from "@mantine/form";
import { useWriteNftFactoryCreateNftContract } from "../contracts";
import { extractContractAddressFromTransaction } from ".";
import { ImageUpload } from "../shared/components/ImageUpload";
import { uploadFileToPinata } from "../shared/utils/pinata";
import { useState } from "react";

interface ICreateCollectionForm {
  name: string;
  symbol: string;
}

interface ICreateCollection extends ICreateCollectionForm {
  collectionCID: string;
}

export function CreateCollection(): React.ReactElement {
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<ICreateCollectionForm>({
    initialValues: {
      name: "",
      symbol: "",
    },
    validate: {
      name: matches(
        /^(?=.{3,100}$)(?! )[A-Za-z0-9]+( [A-Za-z0-9]+)*(?<! )$/,
        "Letters, numbers and spaces only. Starts and ends with a letter or number. 3-100 characters"
      ),
      symbol: matches(
        /^[A-Z0-9]{3,30}$/,
        "Only uppercase letters and numbers are allowed. 3-30 characters"
      ),
    },
  });

  const { writeContractAsync } = useWriteNftFactoryCreateNftContract();

  const createNFTCollection = async ({
    name,
    symbol,
    collectionCID,
  }: ICreateCollection) => {
    const factoryContract = import.meta.env.VITE_NFT_FACTORY_CONTRACT;
    if (!factoryContract) {
      throw new Error("Factory contract not found");
    }

    const txHash = await writeContractAsync({
      address: factoryContract,
      args: [name, symbol, collectionCID],
    });

    const NFTcontractAddress =
      await extractContractAddressFromTransaction(txHash);

    console.log("NFT Contract Address:", NFTcontractAddress);
  };

  const handleSubmit = async (value: ICreateCollectionForm) => {
    console.log(value);
    if (!image) {
      return;
    }
    const collectionCID = await uploadFileToPinata(image);
    console.log("Collection Image CID:", collectionCID);

    if (!collectionCID) {
      return;
    }

    await createNFTCollection({ ...value, collectionCID });
  };

  return (
    <form
      onSubmit={form.onSubmit(async (value) => {
        handleSubmit(value as ICreateCollectionForm);
      })}
    >
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder="Crazy Ape Club"
        withAsterisk
        mb={8}
      />
      <TextInput
        {...form.getInputProps("symbol")}
        label="Symbol"
        placeholder="CZAPC"
        withAsterisk
        mb={8}
      />
      <ImageUpload
        onSelect={(file) => {
          console.log("Selected file", file);
          if (file) {
            setImage(file);
          }
        }}
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
