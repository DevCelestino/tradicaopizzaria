import prismaClient from "../../prisma"

class RemoveOrderService {
  async execute(order_id: string) {
    //Deletes the order
    const order = await prismaClient.order.delete({
      where: {
        id: order_id
      }
    })

    return order
  }
}

export { RemoveOrderService }
