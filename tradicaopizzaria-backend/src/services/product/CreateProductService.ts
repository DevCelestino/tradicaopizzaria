import prismaClient from "../../prisma"
import { resolve } from "path"

interface ProductRequest {
  name: string,
  price: string,
  description: string,
  banner: string,
  category_id: string
}

class CreateProductService {
  async execute({ name, price, description, banner, category_id }: ProductRequest) {
    var fs = require('fs')
    var filePath = resolve(__dirname, "..", "..", "..", "./tmp", `${banner}`)
    //Initial blank prop validation
    if (!name) {
      fs.unlinkSync(filePath)
      throw new Error("Name invalid")
    }
    if (!price) {
      fs.unlinkSync(filePath)
      throw new Error("Price invalid")
    }

    //Validates if there is already a product with this name registered
    const existentProduct = await prismaClient.product.findFirst({
      where: {
        name: name
      }
    })
    if (existentProduct) {
      fs.unlinkSync(filePath)
      throw new Error("There is already a product with this name registered")
    }

    //Creates a new product
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: banner,
        category_id: category_id
      }
    })

    return product
  }
}

export { CreateProductService }
