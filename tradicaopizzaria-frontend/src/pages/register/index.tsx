import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState, FormEvent } from "react"
import { toast } from 'react-toastify'

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

import { AuthContext } from "@/contexts/AuthContext"

import { canSSRGuest } from "@/utils/canSSRGuest"

import logoImg from "../../../public/logo.svg"

import styles from "../../styles/home.module.scss"

export default function Register() {
  const { register } = useContext(AuthContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    if (name === "" || email === "" || username === "" || password === "") {
      if (!name) toast.warning("Please enter your name")
      else if (!email) toast.warning("Please enter your email")
      else if (!username) toast.warning("Please enter your username")
      else if (!password) toast.warning("Please enter your password")
      return
    }

    setLoading(true)

    let data = {
      registerName: name,
      registerEmail: email,
      registerUsername: username,
      registerPassword: password
    }

    await register(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da Pizzaria"
        />
        <div className={styles.login}>
          <h1>Create your account</h1>
          <form onSubmit={handleRegister}>
            <Input
              placeholder="Enter your name"
              type="text"
              value={name}
              onChange={(e => setName(e.target.value))}
            />
            <Input
              placeholder="Enter your email"
              type="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              value={email}
              onChange={(e => setEmail(e.target.value))}
              onInvalid={(e) => {e.preventDefault(); toast.warning("Invalid email format")}}
            />
            <Input
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={(e => setUsername(e.target.value))}
            />
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e => setPassword(e.target.value))}
            />
            <Button
              type="submit"
              loading={loading}
            >
              Register
            </Button>
          </form>
          <Link
            className={styles.text}
            href="/"
          >
            Already have an account? Log in
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
