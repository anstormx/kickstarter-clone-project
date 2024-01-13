    // SPDX-License-Identifier: MIT

    pragma solidity ^0.8.9;

    contract CampaignFactory{
        address [] public deployedcampaigns;

        function create_campaign(uint mincontri) public{
            address newcampaign = address(new Campaign( mincontri, msg.sender ));
            deployedcampaigns.push(newcampaign);
        }

        function getdeployedcampaign() public view returns( address[] memory ){
            return deployedcampaigns;
        }
    
    }


    contract Campaign {
        
        struct Request { //new data type called request
            string description;
            uint value;
            address recepient;
            bool status;
            mapping (address => bool) approvals;
            uint approvercount;
        }
        
        address public manager;
        uint public mincontribution;
        mapping (address => bool) public contributors; //default bool: false
        uint public contributorscount;
        Request[] public requests;
        
        modifier manager_only() {   //used to reduce the amount of code
            require(msg.sender == manager);
            _; //_ means to run the rest of the code inside the function
        }

        constructor( uint mincontri, address creator) {
            manager = creator;
            mincontribution = mincontri;
            //address of the person who creates the contract
        }

        function contribute() public payable {
            require( msg.value > mincontribution );// in wei
            require(!contributors[msg.sender]) ;
            contributors[msg.sender] = true; 
            //address of the person who sends a contribution is the key for the mapping
            contributorscount++;
        }

        function create_request( string memory description, uint value, address recepient) public manager_only{
            Request storage newrequest = requests.push(); //creating a new instance of Request in memory and pushing it to the requests array
            newrequest.description = description;
            newrequest.value = value;
            newrequest.recepient = recepient;
            newrequest.status = false;
            newrequest.approvercount = 0;            
        }

        function approve_request(uint index) public {
            assert(contributors[msg.sender]); //checks if approved
            require(!requests[index].approvals[msg.sender]); //checks if already voted
            requests[index].approvals[msg.sender] = true;
            requests[index].approvercount++;
        }

        function finalize_request(uint index) public manager_only {
            require(!requests[index].status); //checks if request is not already approved
            require(requests[index].approvercount > contributorscount/2);
            requests[index].status = true; //sets request completed

            address payable recepientpayable = payable(requests[index].recepient); 
            //send and transfer functions are only available for objects of type address payable, not for address

            recepientpayable.transfer(requests[index].value); //sends money to recepient

        }

        function getsummary() public view returns (uint, uint, uint, uint, address) {
            return(
                mincontribution,
                address(this).balance,
                requests.length,
                contributorscount,
                manager
            );
        }
        function getrequestscount() public view returns (uint) {
            return requests.length;
        }
    }