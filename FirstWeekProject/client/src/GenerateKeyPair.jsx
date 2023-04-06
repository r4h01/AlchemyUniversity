import React, { useState } from 'react'
import Stepper from './Stepper'
import {toHex} from 'ethereum-cryptography/utils'
import {keccak256} from 'ethereum-cryptography/keccak'
import { getPublicKey, sign, utils, Signature} from 'ethereum-cryptography/secp256k1'
import server from "./server";

function GenerateKeyPair({address, setAddress, currentStep, setCurrentStep, complete, setComplete, privateKeys, setPrivateKeys, publicKeys, setPublicKeys}) {
    const steps = ["Generate PKey", "Generate Address", "List Key Pair", "Confirm"]

    const generateKeyPair = async () => {
        if(currentStep === 1) {
            for (let i = 0; i < 3; i++) {
                let pk = utils.randomPrivateKey()
                setPrivateKeys(array => [...array, pk])
            }
            setCurrentStep((prev) => prev + 1)
        } else if(currentStep === 2){
            for (let i = 0; i < privateKeys.length; i++) {
                let pubKey = getPublicKey(privateKeys[i])
                let address = keccak256(pubKey.slice(1)).slice(-20)
                setPublicKeys(array => [...array, `0x${toHex(address)}`])
            }
            setCurrentStep((prev) => prev + 1)
        }  else if(currentStep === 3){
            let bodyAddresses = {}
            let balances = [100, 50, 25]
            for (let i = 0; i < publicKeys.length; i++) {
                bodyAddresses[publicKeys[i].toString()]=balances[i]
            }
            console.log(bodyAddresses)
            try {
                const setAddress = await server.post(`/set-address`, {bodyAddresses:bodyAddresses} );
                console.log(setAddress.data)
              } catch (ex) {
                alert(ex.response.data.message);
              }
            setCurrentStep((prev) => prev + 1)
        }
    }

    const renderKeyPair =  publicKeys.map((keypair,i)=>{
        return (
                <ul className='text-slate-300' key={i}>
                    <li className=' mt-2 font-semibold text-justify ml-14'>
                        <label className="font-bold text-sm ">Private Key {i + 1}</label>
                        {toHex(privateKeys[i])}
                    </li>
                    <li className='mt-2 mb-3 font-semibold  text-justify ml-14'>
                        <label className=" font-bold text-sm ">Public Key {i + 1}</label>
                        {keypair}
                    </li>
                </ul>)
    })


  return (
    <div>
        <Stepper
        address={address}
        setAddress={setAddress}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        complete={complete}
        setComplete={setComplete}
        steps={steps}
         />
         <div className='flex justify-center mt-5'>
        <button className='hover:bg-purple-700 border-neutral-300 border-2 bg-purple-950 cursor-pointer text-stone-50 rounded-2xl md:px-10 lg:px-10 px-5 py-3' onClick={()=>{
            currentStep === steps.length
            ? setComplete(true) 
            : generateKeyPair()
        }}>{currentStep === steps.length
            ? "Confirm" : `Next`}</button>
        
         </div>
         {publicKeys.length>0 ? (<div className='bg-purple-800 rounded-lg mt-5 flex flex-col py-10 text-xs justify-center border-slate-300 border-2'>
            {renderKeyPair}
         </div> ): ""}
    </div>
  )
}

export default GenerateKeyPair