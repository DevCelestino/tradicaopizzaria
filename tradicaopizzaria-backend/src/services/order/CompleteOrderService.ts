import prismaClient from "../../prisma"

class CompleteOrderService {
  async execute(order_id: string) {
    //Updates the order status to complete
    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        status: true
      },
      select: {
        id: true,
        status: true
      }
    })

    return order
  }
}

export { CompleteOrderService }
