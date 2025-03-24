import {
  Box,
  Button,
  Flex,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { matches, useForm } from "@mantine/form";
import { useWriteNftFactoryCreateNftContract } from "../contracts";
import { extractContractAddressFromTransaction } from ".";
import { ImageUpload } from "../shared/components/ImageUpload";
import { uploadFileToPinata } from "../shared/utils/pinata";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

interface ICreateCollectionForm {
  name: string;
  symbol: string;
}

interface ICreateCollection extends ICreateCollectionForm {
  collectionCID: string;
}

export function CreateCollection(): React.ReactElement {
  const account = useAccount();
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "default" | "uploadingImage" | "deployingContract" | "success" | "error"
  >("default");
  const [deployedContractAddress, setDeployedContractAddress] =
    useState<string>("");

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

    if (!NFTcontractAddress) {
      throw new Error("Error creating NFT collection");
    }
    setDeployedContractAddress(NFTcontractAddress);
  };

  const handleSubmit = async (value: ICreateCollectionForm) => {
    console.log(value);
    if (!image) {
      notifications.show({
        title: "Error",
        message: "Please upload an image",
        color: "red",
      });
      return;
    }
    setStatus("uploadingImage");
    const collectionCID = await uploadFileToPinata(image);
    console.log("Collection Image CID:", collectionCID);

    if (!collectionCID) {
      setStatus("error");
      return;
    }

    setStatus("deployingContract");
    try {
      await createNFTCollection({ ...value, collectionCID });
      setStatus("success");
    } catch (error) {
      console.error("Error creating collection", error);
      setStatus("error");
      return;
    }
  };

  if (!account.address) {
    return (
      <Flex align="center" justify="center" style={{ height: "80vh" }}>
        <Text>Please connect your wallet to create a collection</Text>
      </Flex>
    );
  }

  if (status !== "default") {
    return (
      <Flex align="center" justify="center" style={{ height: "80vh" }}>
        <Flex align="center" justify="center" gap={16}>
          <Text>
            {status === "uploadingImage" && "Uploading Image. Please wait..."}
            {status === "deployingContract" &&
              "To create the collection approve transaction in your wallet"}
          </Text>
          {(status === "uploadingImage" || status === "deployingContract") && (
            <Loader />
          )}
          <Text c="red">
            {status === "error" && "Error creating collection"}
          </Text>
          {status === "success" && (
            <Stack align="center">
              <Text>
                Collection created successfully with contract address:
              </Text>
              <Text fw="bold">{deployedContractAddress}</Text>
              <Link to={`/collections/${deployedContractAddress}`}>
                <Button>View collection</Button>
              </Link>
            </Stack>
          )}
        </Flex>
      </Flex>
    );
  }

  return (
    <Box maw={1024}>
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
    </Box>
  );
}
