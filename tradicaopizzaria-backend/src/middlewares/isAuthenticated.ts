import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface Payload {
  sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  //Verifies if there is a token informed inside the request header
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  //Separates the informed token from the prefix
  const [, token] = authToken.split(" ")

  //Checks if the token is trusted
  try {
    const { sub } = verify(token, process.env.JWT_PRIVATE_KEY) as Payload
    //If the token is trusted then continue to the next function and insert the user id inside the request
    req.user_id = sub
    return next()
  } catch (err) {
    //If the token is not trusted then return an unauthorized error
    return res.status(401).end()
  }
}
