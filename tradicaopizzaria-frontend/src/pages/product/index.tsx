import Head from "next/head"

import { Header } from "@/components/Header"

import { canSSRAuth } from "@/utils/canSSRAuth"

export default function Product() {
  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <Header />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
