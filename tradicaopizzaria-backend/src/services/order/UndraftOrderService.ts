import prismaClient from "../../prisma"

class UndraftOrderService {
  async execute(order_id: string) {
    //Updates the draft order status to false
    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        draft: false
      },
      select: {
        id: true,
        draft: true
      }
    })

    return order
  }
}

export { UndraftOrderService }
