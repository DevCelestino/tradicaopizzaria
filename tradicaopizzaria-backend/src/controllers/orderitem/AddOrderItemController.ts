import { Request, Response } from "express"
import { AddOrderItemService } from "../../services/orderitem/AddOrderItemService"

class AddOrderItemController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, quantity } = req.body
    const addOrderItemService = new AddOrderItemService()
    const orderItem = await addOrderItemService.execute({ order_id, product_id, quantity })

    return res.json(orderItem)
  }
}

export { AddOrderItemController }
