import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import campaign from "../ethereum/campaign";

class Requestrow extends Component {
  state = {
    loading1: false,
    loading2: false
  };
  
  onApprove = async () => {
    const instance = campaign(this.props.address);
    this.setState({ loading1: true, errorMessage: "" });

    try{
      const accounts = await web3.eth.getAccounts();
      await instance.methods.approve_request(this.props.id).send({
      from: accounts[0],
      });
    } catch (err) {
        console.log(err);
    }
    this.setState({ loading1: false });
  };

  onFinalize = async () => {
    const instance = campaign(this.props.address);
    this.setState({ loading2: true, errorMessage: "" });
    
    try{
      const accounts = await web3.eth.getAccounts();
      await instance.methods.finalize_request(this.props.id).send({
        from: accounts[0],
      });
    } catch (err) {
        console.log(err);
    }
    this.setState({ loading2: false });
  }
  


  render() {
    const { Row, Cell } = Table;
    const { id, request, contributorscount } = this.props;
    const readyToFinalize = request.approvercount > contributorscount / BigInt(2);

    return (
      <Row
        disabled={request.status}
        positive={readyToFinalize && !request.status}
      >
        <Cell>{id+1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recepient}</Cell>
        <Cell>
          {Number(request.approvercount)}/{Number(contributorscount)} 
        </Cell> 
        <Cell>
          {request.status ? null : (
            <Button color="green" basic onClick={this.onApprove} loading={this.state.loading1}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.status ? null : (
            <Button color="teal" basic onClick={this.onFinalize} loading={this.state.loading2}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default Requestrow;
