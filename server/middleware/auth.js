import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization")
    if (!token) {
      return res.status(403).json({ message: "Access denied"})
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft()
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    var previousBody = req.body

    req.body = Object.assign(previousBody, {
      verified
    })
    
    next()
    
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}