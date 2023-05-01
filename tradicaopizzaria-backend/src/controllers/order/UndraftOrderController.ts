import { Request, Response } from "express"
import { UndraftOrderService } from "../../services/order/UndraftOrderService"

class UndraftOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string
    const undraftOrderService = new UndraftOrderService()
    const order = await undraftOrderService.execute(order_id)

    return res.json(order)
  }
}

export { UndraftOrderController }
