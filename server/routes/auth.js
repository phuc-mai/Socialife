const express = require("express")

import { login } from "../controllers/auth.js"

const router = express.Router()

router.post("/login", login)

export default router