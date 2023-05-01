import prismaClient from "../../prisma"

interface OrderItemRequest {
  orderItem_id: string
}

class RemoveOrderItemService {
  async execute({ orderItem_id }: OrderItemRequest) {
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
