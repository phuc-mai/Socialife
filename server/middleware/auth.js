import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) {
      return res.status(403).json({ message: "Access denied"})
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft()
    }

    const verified = jwt.verify(token, process.env.SECRET)
    req.body = verified
    next()
    
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}