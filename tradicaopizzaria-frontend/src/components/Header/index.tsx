import Link from "next/link"
import { useContext } from "react"

import { FiLogOut } from "react-icons/fi"

import styles from "./styles.module.scss"

import { AuthContext } from "@/contexts/AuthContext"

export function Header() {
  const { signOut } = useContext(AuthContext)

  return (
    <header className={styles.header}>
      <Link href={"/dashboard"}>
        <img
          src="/logo.svg"
          width={190}
          height={60}
          alt="Logo da Pizzaria"
        />
      </Link>
      <nav>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="/category">
          Categories
        </Link>
        <Link href="/product">
          Menu
        </Link>
        <button
          onClick={signOut}
        >
          <FiLogOut size={24} />
        </button>
      </nav>
    </header>
  )
}
