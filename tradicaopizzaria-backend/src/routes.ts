import { Router } from "express"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController"

const router = Router()

//User routes
router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

export { router }
