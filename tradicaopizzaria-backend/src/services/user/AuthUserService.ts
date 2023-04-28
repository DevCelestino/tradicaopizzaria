import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import prismaClient from "../../prisma"

interface AuthRequest {
  username: string
  password: string
}

class AuthUserService {
  async execute({ username, password }: AuthRequest) {
    //Initial validation if there is a user registered using the username or email informed
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username }
        ]
      }
    })
    if (!user) {
      throw new Error("Username/password incorrect")
    }

    //Validation if the password informed matches with the one on the database
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error("Username/password incorrect")
    }

    //If everything is correct, generates the session token for the user
    const token = sign(
      {
        name: user.name,
        email: user.email,
        username: user.username
      },
      process.env.JWT_PRIVATE_KEY,
      {
        subject: user.id,
        expiresIn: "30d"
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: token
    }
  }
}

export { AuthUserService }