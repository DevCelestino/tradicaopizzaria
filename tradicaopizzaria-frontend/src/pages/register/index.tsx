import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

import styles from "../../styles/home.module.scss"

import logoImg from "../../../public/logo.svg"

export default function Home() {
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
          <form>
            <Input
              placeholder="Enter your name"
              type="text"
            />
            <Input
              placeholder="Enter your email"
              type="email"
            />
            <Input
              placeholder="Enter your username"
              type="text"
            />
            <Input
              placeholder="Enter your password"
              type="password"
            />
            <Button
              type="submit"
              loading={false}
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
