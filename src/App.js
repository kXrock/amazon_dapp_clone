import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {

const loadBlockchaindata =async()=>{
  const accounts= await window.ethereum.request({method:"eth_requestAccounts"});
  const account= ethers.utils.getAddress(accounts[0]);
  console.log(account);
}

/*useEffect(()=>{
  loadBlockchaindata()
},[])*/


  return (
    <div>

      <h2>Welcome to Dappazon</h2>
      <button onClick={loadBlockchaindata}>connect wallet</button>

    </div>
  );
}

export default App;
