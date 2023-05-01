import express, { Router } from "express"
import multer from "multer"
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController"
import { UserDetailsController } from "./controllers/user/UserDetailsController"
import { CreateCategoryController } from "./controllers/category/CreateCategoryController"
import { ListCategoriesController } from "./controllers/category/ListCategoriesController"
import { CreateProductController } from "./controllers/product/CreateProductController"
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController"
import { CreateOrderController } from "./controllers/order/CreateOrderController"
import { RemoveOrderController } from "./controllers/order/RemoveOrderController"
import { UndraftOrderController } from "./controllers/order/UndraftOrderController"
import { AddOrderItemController } from "./controllers/orderitem/AddOrderItemController"
import { RemoveOrderItemController } from "./controllers/orderitem/RemoveOrderItemController"
import { isAuthenticated } from "./middlewares/isAuthenticated"


const router = Router()
const upload = multer(uploadConfig.upload("./tmp"))

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

//User routes
router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/userinfo', isAuthenticated, new UserDetailsController().handle)

//Category routes
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoriesController().handle)

//Product routes
router.post('/product', isAuthenticated, upload.single("file"), new CreateProductController().handle)
router.get('/productsByCategory', isAuthenticated, new ListProductsByCategoryController().handle)

//Order routes
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.put('/order/undraft', isAuthenticated, new UndraftOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

//Order item routes
router.post('/order/orderItem', isAuthenticated, new AddOrderItemController().handle)
router.delete('/order/orderItem', isAuthenticated, new RemoveOrderItemController().handle)

export { router }
