import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import "./index.css";
import { useState } from "react";
import Hero from "./Hero";
import Stepper from "./Stepper";
import GenerateKeyPair from "./GenerateKeyPair";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const [currentStep, setCurrentStep] = useState(1)
  const [complete, setComplete] = useState(false)

  const [privateKeys, setPrivateKeys] = useState([])
  const [publicKeys, setPublicKeys] = useState([])

  return (
    <div className="flex-col">
      <Hero />
    {complete ? 
      <div className="flex flex-row">
    <Wallet
      balance={balance}
      setBalance={setBalance}
      address={address}
      setAddress={setAddress}
    />
    <Transfer setBalance={setBalance} address={address} />
      </div>
    : <div className="lg:flex md:flex lg:justify-center md:justify-center md:mr-11 lg:mr-11">
      <GenerateKeyPair
      address={address}
      setAddress={setAddress}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      complete={complete}
      setComplete={setComplete}
      privateKeys={privateKeys}
      setPrivateKeys={setPrivateKeys}
      publicKeys={publicKeys}
      setPublicKeys={setPublicKeys}
       />
      </div>
    
  }
    </div>
  );
}

export default App;
