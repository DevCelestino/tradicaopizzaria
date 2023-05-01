import prismaClient from "../../prisma"

interface OrderRequest {
  table: number,
  name: string
}

class CreateOrderService {
  async execute({ table, name }: OrderRequest) {
    //Creates a new order
    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name
      },
      select: {
        id: true,
        table: true,
        status: true,
        draft: true,
        name: true
      }
    })

    return order
  }
}

export { CreateOrderService }
