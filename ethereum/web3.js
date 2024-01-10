import Web3 from 'web3';
 
let web3;

if (typeof window!== 'undefined' && typeof window.web3!== 'undefined') { 
    //checking if window variable is defined to see if we are in a browser
    //checking if metamask is running in the browser

    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
  } else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
    'https://sepolia.infura.io/v3/686c8886840944cca961c69357f3887e'
    );
    web3 = new Web3(provider);
  }
  
 
export default web3;