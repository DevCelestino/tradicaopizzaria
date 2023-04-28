import { Router } from "express"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController"
import { UserDetailsController } from "./controllers/user/UserDetailsController"
import { CreateCategoryController } from "./controllers/categories/CreateCategoryController"
import { ListCategoriesController } from "./controllers/categories/ListCategoriesController"
import { isAuthenticated } from "./middlewares/isAuthenticated"

const router = Router()

//User routes
router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/userinfo', isAuthenticated, new UserDetailsController().handle)

//Categories routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoriesController().handle)

export { router }
