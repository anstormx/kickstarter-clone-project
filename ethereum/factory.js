import web3 from "./web3";
import campaignfactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    campaignfactory.abi,
    "0x38BDf9780AA0ca7f819CD0BCcD175b9Da2542E1e"
);

export default instance;