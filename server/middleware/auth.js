import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    const isCustomAuth = token.length > 200

    let decodedData

    if (token && isCustomAuth) {
      // normal auth
      decodedData = jwt.verify(token, "test") // test is the jwt secret
      req.userId = decodedData?.id
    } else {
      // google auth
      // decodedData = jwt.decode(token)
      // req.userId = decodedData?.sub
      req.userId = token
    }
    console.log(req.userId)

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
