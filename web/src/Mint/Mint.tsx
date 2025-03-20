import {
  Box,
  Button,
  Flex,
  Loader,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { hasLength, matches, useForm } from "@mantine/form";
import { Link, useParams } from "react-router-dom";
import { ImageUpload } from "../shared/components/ImageUpload";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { uploadFileToPinata } from "../shared/utils/pinata";
import { createJsonFile } from "../shared/utils";
import { useWriteNftMint } from "../contracts";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../wagmi";

interface IMintNFTForm {
  name: string;
  description: string;
}

interface IMintNFT {
  to: Address;
  metadataURI: string;
}

export function Mint(): React.ReactElement {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "default" | "uploadingMetadata" | "minting" | "success" | "error"
  >("default");
  const account = useAccount();
  const { address } = useParams();

  const form = useForm<IMintNFTForm>({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: matches(
        /^(?=.{3,100}$)(?! )[^\s](?:.*[^\s])?$/,
        "3-100 characters. No leading or trailing spaces"
      ),
      description: hasLength({ min: 3, max: 1000 }),
    },
  });

  const { writeContractAsync } = useWriteNftMint();

  if (!address || !account.address) {
    return <Text>Connect a wallet</Text>;
  }

  const mintNFT = async ({ to, metadataURI }: IMintNFT) => {
    const hash = await writeContractAsync({
      address: address as Address, // NFT contract address
      args: [to, metadataURI],
    });

    await waitForTransactionReceipt(config, {
      hash,
    });
  };

  const uploadMetadata = async ({
    name,
    description,
  }: IMintNFTForm): Promise<string> => {
    const IPFS_BASE_URL =
      import.meta.env.VITE_PINATA_BASE_URL || "https://ipfs.io/ipfs/";

    if (!image) {
      notifications.show({
        title: "Image is required",
        message: "Please upload image",
        color: "red",
      });
      throw new Error("Image is required");
    }

    const imageCID = await uploadFileToPinata(image);

    console.log("Image CID:", imageCID);

    const metadata = createJsonFile({
      name: name,
      description: description,
      image: IPFS_BASE_URL + imageCID,
    });

    const metadataCID = await uploadFileToPinata(metadata);

    console.log("metadataCID:", metadataCID);

    const metadataURI = IPFS_BASE_URL + metadataCID;

    console.log("metadataURI:", metadataURI);

    return metadataURI;
  };

  const handleSubmit = async (values: IMintNFTForm) => {
    setStatus("uploadingMetadata");
    console.log("Minting NFT with values:", values);
    const metadataURI = await uploadMetadata(values);

    setStatus("minting");
    try {
      await mintNFT({
        to: account.address as Address, // current user
        metadataURI,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      return;
    }
  };

  if (status !== "default") {
    return (
      <Flex
        maw={1024}
        align="center"
        justify="center"
        style={{ height: "80vh" }}
      >
        <Flex align="center" justify="center" gap={16}>
          <Text>
            {status === "uploadingMetadata" &&
              "Uploading Metadata. Please wait..."}
            {status === "minting" &&
              "To mint the NFT approve transaction in your wallet"}
          </Text>
          {(status === "uploadingMetadata" || status === "minting") && (
            <Loader />
          )}
          <Text c="red">{status === "error" && "Error minting NFT"}</Text>
          {status === "success" && (
            <Stack align="center">
              <Text>
                NFT minted successfully. You can view it in your collection
              </Text>
              <Link to={`/collections/${address}`}>
                <Button variant="outline">Go to collection</Button>
              </Link>
            </Stack>
          )}
        </Flex>
      </Flex>
    );
  }

  return (
    <Box maw={1024}>
      <Title order={1}>Mint NFT</Title>
      <Text>{address}</Text>
      <form
        onSubmit={form.onSubmit(async (value) => {
          handleSubmit(value as IMintNFTForm);
        })}
      >
        <TextInput
          {...form.getInputProps("name")}
          label="Name"
          placeholder="Unique NFT name"
          withAsterisk
          mb={8}
        />
        <Textarea
          {...form.getInputProps("description")}
          label="Description"
          placeholder="Lorem Ipsum..."
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
    </Box>
  );
}
