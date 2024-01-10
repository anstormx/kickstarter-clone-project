import React, { Component } from "react";
import factory from "./ethereum/factory";

class CampaignIndex extends Component {
    
    static async getInitialProps() { //does not require an instance to be created
        const campaigns = await factory.methods.getdeployedcampaign().call();
        return { campaigns };
    }
    
    render() {
    
    }
}

export default CampaignIndex;