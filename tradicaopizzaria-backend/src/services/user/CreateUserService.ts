import { hash } from "bcryptjs"
import prismaClient from "../../prisma"

interface UserRequest {
  name: string
  email: string
  username: string
  password: string
}

class CreateUserService {
  async execute({ name, email, username, password }: UserRequest) {
    //Initial null props validations
    if (!email) throw new Error("Invalid email")
    if (!username) throw new Error("Invalid username")
    if (!password) throw new Error("Invalid password")

    //Already in use email or username validation
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    })
    if (userAlreadyExists) throw new Error("Email/username already in use")

    //User insert on table users
    const passwordHash = await hash(password, 3.6)
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true
      }
    })
    return user
  }
}

export { CreateUserService }
