import { useAccount, useDisconnect } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const abbreviateAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };
  
  return (
    <div className='flex'>
      <div className='flex  px-7.5 py-2.5'> {abbreviateAddress(address)}</div> 
      <button className='flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho' onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}