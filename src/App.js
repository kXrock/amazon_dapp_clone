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

async function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState();
  const [dappazon, setdappazon] = useState();

  const loadBlockchaindata = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    const dappazon = new ethers.Contract(config[network.chainId].dappazon.address, Dappazon, provider)
    setdappazon(dappazon);
  }

  const items = [];
  for (var i = 1; i <= 9; i++) {
    const item= await dappazon.items[i];
    items.push(item);
  }

  useEffect(() => {
    loadBlockchaindata();
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}></Navigation>
    </div>
  );
}

export default App;
