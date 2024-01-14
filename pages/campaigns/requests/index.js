import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from "../../../components/Layout";
import campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link } from "../../../routes";




class Requests extends Component {
    static async getInitialProps(props) { 

        return { address };
    }

    render() {
        return(
            <Layout>
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <h3>Pending Requests</h3>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                                    <a>
                                        <Button primary>
                                            Add Requests
                                        </Button>
                                    </a>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>

                        </Grid.Row>
                    </Grid>
                </div>
            </Layout>
        );
    }
}

export default Requests;