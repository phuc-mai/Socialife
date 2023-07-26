const express = require("express")

import { getUser, getFriends, addRemoveFriend } from "../controllers/user.js"
import { verifyToken } from "../middleware/auth.js" 

const router = express.Router()

/* READ */
router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getFriends)

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)

export default router