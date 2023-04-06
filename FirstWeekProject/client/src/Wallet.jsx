import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container rounded-3xl flex-col">
      <h1 className="text-3xl font-bold">Your Wallet</h1>

      <label className="text-xl">
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="text-xl">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
