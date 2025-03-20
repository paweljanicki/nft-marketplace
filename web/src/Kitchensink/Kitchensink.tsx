import { Contracts } from "./Contracts";
import { EnglishAuction } from "./EnglishAuction";
import { Pinata } from "./Pinata";

export const Kitchensink = () => {
  return (
    <div>
      <h1>Kitchensink</h1>
      <Pinata />
      {/* <Contracts /> */}
      <EnglishAuction />
    </div>
  );
};
