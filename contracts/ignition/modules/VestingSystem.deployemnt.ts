import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// import { token } from "../../typechain-types/@openzeppelin/contracts";

const VestingSystemModule = buildModule("VestingSystemModule", (m) => {
  const deployer = m.getAccount(0);

  //Deploy OrganisationToken
  const OrganisationToken = m.contract("OrganizationToken", [],);

  //Deploy Vesting
  const Vesting = m.contract("Vesting", [OrganisationToken, deployer]);

  //Deploy NFT 
  const MemberNFT = m.contract("MemberNFT", [deployer]);

  return {OrganisationToken, Vesting, MemberNFT};
});
 
export default VestingSystemModule;
