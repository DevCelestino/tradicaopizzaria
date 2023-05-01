import { Request, Response } from "express"
import { RemoveOrderItemService } from "../../services/orderitem/RemoveOrderItemService"

class RemoveOrderItemController {
  async handle(req: Request, res: Response) {
    const orderItem_id = req.query.orderitem_id as string;
    const removeOrderItemService = new RemoveOrderItemService()
    const orderItem = await removeOrderItemService.execute(orderItem_id)

    return res.json(orderItem)
  }
}

export { RemoveOrderItemController }
