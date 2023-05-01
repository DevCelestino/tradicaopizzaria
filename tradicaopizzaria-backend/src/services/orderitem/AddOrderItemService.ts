import prismaClient from "../../prisma"

interface OrderItemRequest {
  order_id: string,
  product_id: string,
  quantity: number
}

class AddOrderItemService {
  async execute({ order_id, product_id, quantity }: OrderItemRequest) {
    //Creates a new order
    const orderItem = await prismaClient.orderItem.create({
      data: {
        order_id: order_id,
        product_id: product_id,
        quantity: quantity
      },
      select: {
        id: true,
        order_id: true,
        product_id: true,
        quantity: true
      }
    })

    return orderItem
  }
}

export { AddOrderItemService }
