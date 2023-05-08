import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState, FormEvent } from "react"
import { toast } from "react-toastify"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

import { AuthContext } from "../contexts/AuthContext"

import { canSSRGuest } from "@/utils/canSSRGuest"

import logoImg from "../../public/logo.svg"

import styles from "../styles/home.module.scss"

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()

    if (username === "" || password === "") {
      if (!username) toast.warning("Please enter your username")
      else if (!password) toast.warning("Please enter your password")
      return
    }

    setLoading(true)

    let data = {
      logInUsername: username,
      logInPassword: password
    }

    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da Pizzaria"
        />
        <div className={styles.login}>
          <h1>Log in to your account</h1>
          <form onSubmit={handleSignIn}>
            <Input
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              loading={loading}
            >
              Log in
            </Button>
          </form>
          <Link
            className={styles.text}
            href="/register"
          >
            Don't have an account yet? Create a new account
          </Link>
        </div>
      </div >
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
