const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const db = require("../db/database")

const router = express.Router()

const SECRET_KEY = process.env.SECRET_KEY

// User Register Endpoint
router.post("/register", async (req, res) => {
    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    db.run(`
      INSERT INTO Users (username, password) VALUES (?,?)  
    `, [username, password], (err) => {
        if (err) {
            return res.status(400).json({error: "User already exists."})
        }
        res.status(201).json({message: "User registered successfully."})
    })
})

// User Login Endpoint
router.post("/users", (req, res) => {
    const {username, password} = req.body

    db.get(`SELECT * FROM Users WHERE username=?`, [username], async (err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "Invalid credentials"})
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (isValidPassword) {
            res.status(400).json({error: "Invalid credentials"})
        }

        const token = jwt.sign({id: user.id, usename: user.username}, SECRET_KEY, {expiresIn: "1h"})
        res.json({token})
    })
})

module.exports = router