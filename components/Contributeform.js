import React, { Component } from "react";
import { Form, Input, Message, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS    
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class Contributeform extends Component {
    state = {
        contribution: "",
        errorMessage: "",
        loading: false,
      };
    
      onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: "" });
        const instance = campaign(this.props.address);

        try {
        //   const Amount = web3.utils.fro
          const accounts = await web3.eth.getAccounts();

          await instance.methods
            .contribute()
            .send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.contribution, 'ether')
            });
    
          Router.replaceRoute(`/campaigns/${this.props.address}`); //refreshing the page
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
      };
    
      render() {
        return (
            <div>
            <h3>Contribute to this campaign</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Enter Amount</label>
                <Input
                  label="ether"
                  labelPosition="right"
                  value={this.state.contribution}
                  onChange={(event) =>
                    this.setState({ contribution: event.target.value })
                  }
                />
              </Form.Field>
              <Message error header="Oops!" content={this.state.errorMessage} />
              <Button loading={this.state.loading} primary>
                Contribute!
              </Button>
            </Form>
            </div>
        );
      }
}

export default Contributeform;