import prismaClient from "../../prisma"

interface CategoryRequest {
  name: string
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    //Initial blank prop validation
    if (name === "") {
      throw new Error("Name invalid")
    }

    //Validates if there is already a category with the informed name registered
    const existentCategory = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    })
    if (existentCategory) {
      throw new Error("There is already a category with this name registered")
    }

    //Creates the new category in the database
    const category = await prismaClient.category.create({
      data: {
        name
      },
      select: {
        id: true,
        name: true
      }
    })

    return category
  }
}

export { CreateCategoryService }
