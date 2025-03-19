import { Contracts } from "./Contracts";
import { Pinata } from "./Pinata";

export const Kitchensink = () => {
  return (
    <div>
      <h1>Kitchensink</h1>
      <Pinata />
      <Contracts />
    </div>
  );
};
