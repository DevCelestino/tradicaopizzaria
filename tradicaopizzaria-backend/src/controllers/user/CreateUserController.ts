import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/CreateUserService"

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, username, password } = req.body
    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email, username, password })

    return res.json(user)
  }
}

export { CreateUserController }
