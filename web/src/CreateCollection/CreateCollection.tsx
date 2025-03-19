import { Button, TextInput } from "@mantine/core";
import { matches, useForm } from "@mantine/form";
import { useWriteNftFactoryCreateNftContract } from "../contracts";
import { extractContractAddressFromTransaction } from ".";

interface ICreateCollection {
  name: string;
  symbol: string;
}

export function CreateCollection(): React.ReactElement {
  const form = useForm<ICreateCollection>({
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

  const createNFTCollection = async ({ name, symbol }: ICreateCollection) => {
    const factoryContract = import.meta.env.VITE_NFT_FACTORY_CONTRACT;
    if (!factoryContract) {
      throw new Error("Factory contract not found");
    }

    const txHash = await writeContractAsync({
      address: factoryContract,
      args: [name, symbol],
    });

    const NFTcontractAddress =
      await extractContractAddressFromTransaction(txHash);

    console.log("NFT Contract Address:", NFTcontractAddress);
  };

  const handleSubmit = async (value: ICreateCollection) => {
    console.log(value);
    createNFTCollection(value);
  };

  return (
    <form
      onSubmit={form.onSubmit(async (value) => {
        handleSubmit(value as ICreateCollection);
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
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
