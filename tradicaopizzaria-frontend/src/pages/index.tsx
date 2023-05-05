import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

import styles from "../styles/home.module.scss"

import logoImg from "../../public/logo.svg"

export default function Home() {
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
          <form>
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
