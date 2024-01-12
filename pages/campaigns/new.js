import React, { Component } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Import Semantic UI CSS
import Layout from "../../components/Layout";
import { Router } from '../../routes'; 
//router allows you to redirect people from one page to another inside of our application


class CampaignNew extends Component {
    state = {  //to hold the value the user is entering
        mincontri:'',
        errormessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault(); //keeps the browser from attempting to submit the form
        this.setState({loading: true, errormessage: ''});
        
        try{
            const accounts = await web3.eth.getAccounts();
            
            await factory.methods
                .create_campaign(this.state.mincontri)
                .send({ from: accounts[0] });
            
            Router.pushRoute('/'); //redirects user to the root page
        }catch(err){
            this.setState({errormessage: err.message});
        }
        
        this.setState({loading: false});
    }


    render() {
        return ( 
            <Layout> 
                <div>
                    <h3>Create New Campaigns</h3>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errormessage}>
                        
                        <Form.Field>
                            <label>Minimum Contribution</label>
                            <Input 
                                label= "wei" 
                                labelPosition="right" 
                                placeholder="Enter an Amount" //displayed in the input field before the user enters any value
                                value={this.state.mincontri}
                                onChange={event => this.setState({mincontri: event.target.value})}
                            />
                        </Form.Field>
                        
                        <Message 
                            error //makes it look redish 
                            header="Oops!" 
                            content={this.state.errormessage} 
                        />

                        <Button 
                        floated="right" //moves button to right side
                        content="Submit"
                        type="submit"
                        loading={this.state.loading} //displays a spinner icon
                        primary //visual indication to show the button is associated with the primary action or focus of a particular context
                        />                       
                    </Form>
            
                </div>
            </Layout> //code inside gets passed as children to Layout component
        )
    }
}

export default CampaignNew;