import prismaClient from "../../prisma"

class UserDetailsService {
  async execute(user_id: string) {
    //Returns the user informations
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
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

export { UserDetailsService }
