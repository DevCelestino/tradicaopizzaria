import { Request, Response } from "express"
import { ListReadyToDoOrdersService } from "../../services/order/ListReadyToDoOrdersService"

class ListReadyToDoOrdersController {
  async handle(req: Request, res: Response) {
    const listReadyToDoOrdersService = new ListReadyToDoOrdersService()
    const orders = await listReadyToDoOrdersService.execute()

    return res.json(orders)
  }
}

export { ListReadyToDoOrdersController }
