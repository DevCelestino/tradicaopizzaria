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
import { UndraftOrderController } from "./controllers/order/UndraftOrderController"
import { ListReadyToDoOrdersController } from "./controllers/order/ListReadyToDoOrdersController"
import { RemoveOrderController } from "./controllers/order/RemoveOrderController"
import { AddOrderItemController } from "./controllers/orderitem/AddOrderItemController"
import { ListOrderItemsController } from "./controllers/orderitem/ListOrderItemsController"
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
router.get('/product/byCategory', isAuthenticated, new ListProductsByCategoryController().handle)

//Order routes
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.put('/order/undraft', isAuthenticated, new UndraftOrderController().handle)
router.get('/order/undraft', isAuthenticated, new ListReadyToDoOrdersController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

//Order item routes
router.post('/order/item', isAuthenticated, new AddOrderItemController().handle)
router.get('/order/item', isAuthenticated, new ListOrderItemsController().handle)
router.delete('/order/item', isAuthenticated, new RemoveOrderItemController().handle)

export { router }
