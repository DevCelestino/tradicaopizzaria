import Router from "next/router"
import { createContext, ReactNode, useState, useEffect } from "react"
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { toast } from 'react-toastify';

import { api } from "../services/apiClient"


type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  register: (credentials: RegisterProps) => Promise<void>
  signOut: () => void
}

type UserProps = {
  id: string
  name: string
  username: string
  email: string
}

type SignInProps = {
  logInUsername: string
  logInPassword: string
}

type RegisterProps = {
  registerName: string
  registerEmail: string
  registerUsername: string
  registerPassword: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@auth.token')
    Router.push("/")
  } catch {
    console.log("Error trying to log out")
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { "@auth.token": token } = parseCookies()

    if (token) {
      api.get("/userinfo").then(response => {
        const { id, name, username, email } = response.data

        setUser({ id, name, username, email })
      }).catch(error => {
        signOut()
      })
    }
  }, [])

  async function signIn({ logInUsername, logInPassword }: SignInProps) {
    try {
      const response = await api.post('/session', { username: logInUsername, password: logInPassword })
      const { id, name, username, email, token } = response.data

      setCookie(undefined, "@auth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      })

      setUser({ id, name, username, email })
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("Log in succeeded")
      Router.push("/dashboard")
    } catch (err: any) {
      const { error: message } = err.response.data
      if (message === "Username/password incorrect") toast.error("Username/password incorrect")
      else toast.error("Log in failed")
    }
  }

  async function register({ registerName, registerEmail, registerUsername, registerPassword }: RegisterProps) {
    try {
      await api.post('/user', { name: registerName, email: registerEmail, username: registerUsername, password: registerPassword })
      const responseLogIn = await api.post('/session', { username: registerUsername, password: registerPassword })
      const { id, name, username, email, token } = responseLogIn.data

      setCookie(undefined, "@auth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
      })
      setUser({ id, name, username, email })
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success("User created successfully")
      Router.push("/dashboard")
    } catch (err: any) {
      const { error: message } = err.response.data
      if (message === "Email/username already in use") toast.error("Email/username already in use")
      else toast.error("User creation failed")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, register, signOut } as AuthContextData}>
      {children}
    </AuthContext.Provider>
  )
}