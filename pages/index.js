import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import Layout from "../components/Layout";
import { Link } from '../routes'; //allows us to create link tags for navigation 



class CampaignIndex extends Component {
    
    static async getInitialProps() { //does not require an instance to be created
        const campaigns = await factory.methods.getdeployedcampaign().call();
        return { campaigns };
    }

    rendercampaigns() {
        const items = this.props.campaigns.map( address => 
            { return {  
                header: `🚀 Campaign_${address}`,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View campaign</a>
                    </Link> 
                ),
                fluid: true, //makes the cards stretch to the entire width of its container
                raised: true, // Add a shadow to the Card
                color: "teal" // Choose a color
                };
            }
        );

        return <Card.Group items={items} />;        
    }
    
    
    render() {
        return ( 
            <Layout> 
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>🌈 Welcome to CrowdCoin! 🌟</h1>
                    <h3 style={{ fontSize: '18px', color: 'gray', marginBottom: '40px' }}>Explore and Create Unconventional Campaigns</h3>
                    <h3>Open Campaigns</h3>
                    <Link route='/campaigns/new'>
                        <a> 
                            <Button 
                                floated="right" //moves button to right side
                                content="🚀 Create Campaign"
                                icon="add circle"
                                primary //visual indication to show the button is associated with the primary action or focus of a particular context
                            />
                        </a>
                    </Link>     
                    {this.rendercampaigns()}
                                     
                </div>
            </Layout> //code inside gets passed as children to Layout component
        )
    }
}

export default CampaignIndex;