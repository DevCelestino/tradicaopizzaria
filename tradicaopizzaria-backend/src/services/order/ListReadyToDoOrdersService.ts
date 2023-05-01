import prismaClient from "../../prisma"

class ListReadyToDoOrdersService {
  async execute() {
    //List all orders that are ready to be made
    const readyToDoOrders = await prismaClient.order.findMany({
      where: {
        status: false,
        draft: false
      },
      orderBy: {
        created_at: "desc",
      }
    })

    return readyToDoOrders
  }
}

export { ListReadyToDoOrdersService }
