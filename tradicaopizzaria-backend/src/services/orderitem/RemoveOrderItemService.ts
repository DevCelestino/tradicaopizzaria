import prismaClient from "../../prisma"

class RemoveOrderItemService {
  async execute(orderItem_id: string) {
    //Deletes the order
    const orderItem = await prismaClient.orderItem.delete({
      where: {
        id: orderItem_id
      }
    })

    return orderItem
  }
}

export { RemoveOrderItemService }
