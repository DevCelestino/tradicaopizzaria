import { Request, Response } from "express"
import { CompleteOrderService } from "../../services/order/CompleteOrderService"

class CompleteOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string
    const completeOrderService = new CompleteOrderService()
    const order = await completeOrderService.execute(order_id)

    return res.json(order)
  }
}

export { CompleteOrderController }
