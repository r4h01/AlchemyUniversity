const express = require("express")
const app = express()
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")
const { keccak256 } = require("ethereum-cryptography/keccak")
const secp = require("ethereum-cryptography/secp256k1")
const { utf8ToBytes } = require("ethereum-cryptography/utils")
const { toHex } = require("ethereum-cryptography/utils")
require("dotenv").config()
const port = process.env.PORT
const MESSAGE = process.env.SECRET_MESSAGE

app.use(cors())
app.use(express.json())

let balances, nonce

app.get("/", (req, res) => {
  res.send({ message: "HELLO" })
})
app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", async (req, res) => {
  const { signature, recovery_bit, recipient, amount } = req.body
  const signUint = new Uint8Array(Object.values(signature))
  const message = MESSAGE + " " + nonce
  const messageToBytes = utf8ToBytes(message)
  const messageHash = keccak256(messageToBytes)
  const senderUint = secp.recoverPublicKey(messageHash, signUint, recovery_bit)
  let senderAddress = keccak256(senderUint.slice(1)).slice(-20)
  let sender = `0x${toHex(senderAddress)}`
  setInitialBalance(sender)
  setInitialBalance(recipient)
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" })
  } else {
    balances[sender] -= amount
    balances[recipient] += amount
    res.send({ balance: balances[sender] })
  }
})

app.post("/set-address", (req, res) => {
  const { bodyAddresses } = req.body
  balances = bodyAddresses
  res.send({ obj: balances })
})

app.post("/generate-nonce", (req, res) => {
  nonce = uuidv4()
  res.send({ nonce: nonce.toString() })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
