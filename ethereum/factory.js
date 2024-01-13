import web3 from "./web3";
import campaignfactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    campaignfactory.abi,
    "0x77cBe25944ae06792377ACe8170bA230af6B4F42"
);

export default instance;