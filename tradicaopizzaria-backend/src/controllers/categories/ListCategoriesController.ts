import { Request, Response } from "express"
import { ListCategoriesService } from "../../services/categories/ListCategoriesService"

class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const listCategoriesService = new ListCategoriesService()
    const category = await listCategoriesService.execute()

    return res.json(category)
  }
}

export { ListCategoriesController }
