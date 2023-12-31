const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

/* USER REGISTER */
module.exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      userPicturePath,
      location,
      occupation,
    } = req.body

    /* Check if user exists */
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" })
    }

    /* Hass the password */
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    /* Create a new User */
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userPicturePath,
      friends: [],
      location,
      occupation,
      viewdProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 10000)
    }

    /* Save new User */
    const savedUser = await User.create(newUser)

    /* Send a success response */
    res.status(200).json({ message: "User registered successfully!", user: savedUser })

    /* Handle any errors that occur during registration */
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Registration failed", error: err.message })
  }
}

/* USER LOG IN */
module.exports.login = async (req, res) => {
  try {
    /* Take information from the form */
    const { email, password } = req.body

    /* Check if the user exists */
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" })
    }

    /* Compare password */
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" })
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ token, user })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message})
  }
}


