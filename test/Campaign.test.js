const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const compiledfactory = require("../ethereum/build/CampaignFactory.json");
const compiledcampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignaddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledfactory.abi) //deploying a new factory contract
    .deploy({ data: compiledfactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "10000000" });

  await factory.methods.create_campaign("100").send({    //deploying campaign from factory
    from: accounts[0],
    gas: "10000000"
  }); // returns txn receipt

  [campaignaddress] = await factory.methods.getdeployedcampaign().call(); 
  //take the first element from the array returned by getdeployedcampaigns and assign it to campaignaddress
    
  campaign = new web3.eth.Contract(compiledcampaign.abi, 
    campaignaddress); //campaign has already been deployed above, 
    //we are just instructing web3 about its existence and getting campaign contract in js format
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address); 
    assert.ok(campaign.options.address);
  });

  it("caller is set as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1]
    });
    const iscontributor = await campaign.methods.contributors(accounts[1]).call();
    assert(iscontributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows manager to create request", async () => {
    await campaign.methods.create_request("Buy batteries", "100", accounts[1]).send({
        from: accounts[0],
        gas: "1000000"
      });
    const request = await campaign.methods.requests(0).call();

    assert.equal("Buy batteries", request.description);
  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether")
    });

    await campaign.methods.create_request("need money", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approve_request(0)
      .send({ from: accounts[0], gas: "1000000" });

    let initialbalance = await web3.eth.getBalance(accounts[1]);
    initialbalance = web3.utils.fromWei(initialbalance, "ether");
    initialbalance = parseFloat(initialbalance); 
    //converting string to decimal number for comparison

    await campaign.methods.finalize_request(0)
      .send({ from: accounts[0], gas: "1000000" });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance); 
    assert(balance > initialbalance);
  });
});
