const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const authRouter = require("./routes/auth")

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())
app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})