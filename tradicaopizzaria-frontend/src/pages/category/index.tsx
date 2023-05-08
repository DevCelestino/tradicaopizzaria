import Head from "next/head"

import { Header } from "@/components/Header"

import { canSSRAuth } from "@/utils/canSSRAuth"

export default function Category() {
  return (
    <>
      <Head>
        <title>Categories</title>
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
