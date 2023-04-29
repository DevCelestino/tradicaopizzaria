import crypto from "crypto"
import multer from "multer"
import { resolve } from "path"

export default {
  upload(folder: string) {
    var fs = require("fs")
    var dir = resolve(__dirname, "..", "..", folder)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)

    return {
      storage: multer.diskStorage({
        destination: dir,
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex")
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
}
