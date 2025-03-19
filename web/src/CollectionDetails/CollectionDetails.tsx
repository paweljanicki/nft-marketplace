import { useParams } from "react-router-dom";

export function CollectionDetails(): React.ReactElement {
  const { address } = useParams();

  if (!address) {
    return <div>Loading...</div>;
  }

  return <div>Details {address}</div>;
}
