import React, { Component } from "react";
import Layout from "../../components/Layout";
import campaign from "../../ethereum/campaign";
import { Card, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import web3 from "../../ethereum/web3";
import Contributeform from "../../components/Contributeform";


class CampaignShow extends Component {
    static async getInitialProps(props) { //does not require an instance to be created
        const instance = campaign(props.query.address); //address of the campaign
        const summary = await instance.methods.getsummary().call();
        return { 
            address: props.query.address,
            mincontri: summary[0],
            balance: summary[1],
            requestcount: summary[2],
            contributors: summary[3],
            manager: summary[4]    
        };
    }

    rendercard() {
        const {
            mincontri,
            balance,
            requestcount,
            contributors,
            manager
        } = this.props;
        
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap : 'break-word' }
            },
            {
                header: `${mincontri}`,
                meta: 'Minimum Contribution Amount (wei)',
                description: 'You must contribute at least this much to the campaign to become a approver of the campaign',
                style: { overflowWrap : 'break-word' }
            },
            {
                header: `${requestcount}`,
                meta: 'Number of Requests',
                description: 'A request to withdraw money from the contract',
                style: { overflowWrap : 'break-word' }
            },
            {
                header: `${contributors}`,
                meta: 'Number of Contributors',
                description: 'Number of people who have donated to the campaign',
                style: { overflowWrap : 'break-word' }
            },
            {
                header: web3.utils.fromWei( balance, 'ether'),
                meta: 'Campaign Balance',
                description: 'Money the campaign can spend',
                style: { overflowWrap : 'break-word' }
            }
            
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return ( 
            <Layout> 
                <div>
                    <Grid>
                        <Grid.Column width={10}>
                            {this.rendercard()} 
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Contributeform address={this.props.address}/>
                        </Grid.Column>
                    </Grid>
                </div>
            </Layout> //code inside gets passed as children to Layout component
        )
    }   
}

export default CampaignShow;