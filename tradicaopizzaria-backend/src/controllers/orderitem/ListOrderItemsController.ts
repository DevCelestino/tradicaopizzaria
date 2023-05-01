import { Request, Response } from "express"
import { ListOrderItemsService } from "../../services/orderitem/ListOrderItemsService"

class ListOrderItemsController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string
    const listOrderItemsService = new ListOrderItemsService()
    const orderItem = await listOrderItemsService.execute(order_id)

    return res.json(orderItem)
  }
}

export { ListOrderItemsController }
