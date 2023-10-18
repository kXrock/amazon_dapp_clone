import { useEffect,useState } from 'react'
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
  const [account,setAccount]= useState(null);
  const [provider,setProvider] =useState();

const loadBlockchaindata =async()=>{
  const provider= new ethers.providers.Web3Provider(window.ethereum);
  setProvider(provider);

  const network= await provider.getNetwork();
  console.log(network);

  const dappazon = new ethers.Contract(0x5FbDB2315678afecb367f032d93F642f64180aa3,Dappazon,provider)
}

useEffect(()=>{
  loadBlockchaindata();
},[])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}></Navigation>
    </div>
  );
}

export default App;
