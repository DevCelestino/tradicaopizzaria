import prismaClient from "../../prisma"

interface OrderRequest {
  order_id: string
}

class UndraftOrderService {
  async execute({ order_id }: OrderRequest) {
    //Creates a new order
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
