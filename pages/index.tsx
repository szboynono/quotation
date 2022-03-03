import type { NextPage } from 'next'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Home: NextPage = () => {
  const { currentAccount, metaMaskInstalled } = useContext(AppContext);
  return (
    <h1 className="text-3xl">
      {/* current Account: {currentAccount}
      installed: {metaMaskInstalled.toString()} */}
    </h1>
  )
}

export default Home
