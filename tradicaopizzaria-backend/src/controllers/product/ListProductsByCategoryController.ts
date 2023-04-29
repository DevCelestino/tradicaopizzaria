import { Request, Response } from "express"
import { ListProductsByCategoryService } from "../../services/product/ListProductsByCategoryService"

class ListProductsByCategoryController {
  async handle(req: Request, res: Response) {
    const { category_id } = req.body
    const listProductsByCategoryService = new ListProductsByCategoryService()
    const product = await listProductsByCategoryService.execute(category_id)

    return res.json(product)
  }
}

export { ListProductsByCategoryController }