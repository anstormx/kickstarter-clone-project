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
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View campaign</a>
                    </Link> 
                ),
                fluid: true //makes the cards stretch to the entire width of its container
                };
            }
        );

        return <Card.Group items={items} />;        
    }
    
    
    render() {
        return ( 
            <Layout> 
                <div>
                    <h3>Open Campaigns</h3>
                    <Link route='/campaigns/new'>
                        <a> 
                            <Button 
                                floated="right" //moves button to right side
                                content="Create Campaign"
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