import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { test } = useContext(AppContext);
  return (
    <h1 className="text-3xl">
      {test}
    </h1>
  )
}

export default Home
