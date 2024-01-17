import React, { Component } from "react";
import web3 from "../../../ethereum/web3";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import Layout from "../../../components/Layout";
import { Router, Link } from '../../../routes'; 
import campaign from "../../../ethereum/campaign";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


class RequestNew extends Component {
    state = {  //to hold the value the user is entering
        description:'',
        amount:'',
        recepient:'',
        loading: false
    }

    notification = (message, type) => {
        toast[type](message);
    };

    static async getInitialProps(props) { 
        const { address } = props.query;

        return { address };
    }

    onSubmit = async (event) => {
        event.preventDefault(); //keeps the browser from attempting to submit the form
        this.setState({loading: true, errormessage: ''});
        const instance = campaign(this.props.address);
        try{
            const accounts = await web3.eth.getAccounts();
        
            await instance.methods
                .create_request(this.state.description,web3.utils.toWei(this.state.amount, 'ether'),this.state.recepient)
                .send({ from: accounts[0] });
            
            Router.pushRoute(`/campaigns/${this.props.address}/requests`); //redirects user to the root page
        }catch(err){
            this.notification(`Error Creating Campaign, ${err.message}`, 'error');
        }
        
        this.setState({loading: false});
    }


    render() {
        return ( 
            <Layout> 
                <div>
                    <h3>Add Request</h3>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errormessage}>                        
                        <Form.Field>
                            <label>Description</label>
                            <Input                     
                                placeholder="Enter an Description" //displayed in the input field before the user enters any value
                                value={this.state.description}
                                onChange={event => this.setState({description: event.target.value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Amount in ether</label>
                            <Input 
                                label= "ether" 
                                labelPosition="right" 
                                placeholder="Enter an Amount" //displayed in the input field before the user enters any value
                                value={this.state.amount}
                                onChange={event => this.setState({amount: event.target.value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Recepient</label>
                            <Input 
                                placeholder="Enter an Address" //displayed in the input field before the user enters any value
                                value={this.state.recepient}
                                onChange={event => this.setState({recepient: event.target.value})}
                            />
                        </Form.Field>                                    
                        <Button 
                        floated="right" //moves button to right side
                        content="Submit"
                        type="submit"
                        loading={this.state.loading} //displays a spinner icon
                        primary //visual indication to show the button is associated with the primary action or focus of a particular context
                        />                       
                    </Form>
                    <ToastContainer />
                </div>
            </Layout> //code inside gets passed as children to Layout component
        )
    }
}

export default RequestNew;