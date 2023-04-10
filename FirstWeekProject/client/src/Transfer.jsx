import { useState } from "react";
import server from "./server";
import {keccak256} from 'ethereum-cryptography/keccak'
import { getPublicKey, sign, utils, Signature} from 'ethereum-cryptography/secp256k1'
import {utf8ToBytes} from 'ethereum-cryptography/utils'
const SECRET_MESSAGE = import.meta.env.VITE_SECRET_MESSAGE

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signatureGen, setSignatureGen] = useState([]);
  const [recoveryBitGen, setRecoveryBitGen] = useState(0);
  const [messageHashed, setMessageHashed] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const generateSignature = async (privateKey) =>{

    const nonceResponse = await server.post(`generate-nonce`)
    const message = SECRET_MESSAGE + " " + nonceResponse.data.nonce
    const messageToBytes = utf8ToBytes(message)
    const messageHash = keccak256(messageToBytes)
    setMessageHashed(messageHash)
    const [signature, recoveryBit ] = await sign(messageHash, privateKey, {recovered:true})
    setSignatureGen(signature)
    setRecoveryBitGen(recoveryBit)

  }

  async function transfer(evt) {
    evt.preventDefault();
    try {
      console.log(signatureGen)
      console.log(recoveryBitGen)
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature: signatureGen,
        recovery_bit:recoveryBitGen,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <div className="container rounded-3xl flex-col">
      <div className="mt-2 mb-2 flex flex-col justify-center">
      <h1 className="text-3xl font-bold">Generate Signature</h1>
        <input
        className="mt-3 mb-3"
          placeholder="Type a Private Key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
        <button className='hover:bg-purple-700 border-neutral-300 border-2 bg-purple-950 cursor-pointer text-stone-50 rounded-2xl md:px-10 lg:px-10 mt-3 mb-3 px-5 py-3'
        onClick={async ()=>{ await generateSignature(privateKey)}}>
        Generate Signature
        </button>
        <div className=" border-b-2 mt-2 border-zinc-300">

        <p className="text-xl break-all">{signatureGen ? signatureGen : ""}</p>
        </div>
      </div>

    <form className="rounded-3xl flex-col" onSubmit={transfer}>
      <h1 className="text-3xl font-bold">Send Transaction</h1>

      <label className="text-xl">
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label className="text-xl">
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <input type="submit" className=" hover:bg-purple-700 bg-purple-950 cursor-pointer text-stone-50 rounded-2xl px-6 py-3" value="Transfer" />
    </form>
    </div>
  );
}

export default Transfer;
