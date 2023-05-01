import prismaClient from "../../prisma"

class ListOrderItemsService {
  async execute(order_id: string) {
    //Returns all items linked to an order
    const orderItems = await prismaClient.orderItem.findMany({
      where: {
        order_id: order_id
      },
      include: {
        products: true,
        orders: true
      }
    })
    return orderItems
  }
}

export { ListOrderItemsService }
