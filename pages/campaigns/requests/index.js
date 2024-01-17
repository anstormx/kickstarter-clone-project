import React, { Component } from 'react';
import { Table, Grid, Button } from 'semantic-ui-react';
import Layout from "../../../components/Layout";
import campaign from "../../../ethereum/campaign";
import { Link } from "../../../routes";
import Requestrow from "../../../components/Requestrow";

class Requests extends Component {
    static async getInitialProps(props) { 
        const { address } = props.query;
        const instance = campaign(address);
        const requestcount = await instance.methods.getrequestscount().call();
        const contributorscount = await instance.methods.contributorscount().call();
        const requests = await Promise.all(
            Array(Number(requestcount))
              .fill()
              .map((element, index) => {
                return instance.methods.requests(index).call();
              })
        );
        
        return { address, requests, contributorscount, requestcount };
    }

    renderrows() {
        return this.props.requests.map((request, index) => {
          return (
            <Requestrow
              key={index}
              id={index}
              request={request}
              address={this.props.address}
              contributorscount={this.props.contributorscount}
            />
          );
        });
      }
    

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return(
            <Layout>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={13} style={{marginTop:`20px`}}>
                                <h3>Pending Requests</h3>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                                    <a>
                                        <Button primary >
                                        🚀 Add Requests
                                        </Button>
                                    </a>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Table>
                            <Header>
                                <Row>
                                <HeaderCell>ID</HeaderCell>
                                <HeaderCell>Description</HeaderCell>
                                <HeaderCell>Amount</HeaderCell>
                                <HeaderCell>Recipient</HeaderCell>
                                <HeaderCell>Approval Count</HeaderCell>
                                <HeaderCell>Approve</HeaderCell>
                                <HeaderCell>Finalize</HeaderCell>
                                </Row>
                            </Header>
                            <Body>{this.renderrows()}</Body>
                        </Table>            
                        </Grid.Row>
                    </Grid>
                    <div style={{marginTop:`20px`}}>
                        <h4>Found {Number(this.props.requestcount)} requests </h4>
                    </div>
            </Layout>
        );
    }
}

export default Requests;