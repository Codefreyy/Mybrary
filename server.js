if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config() // !should use config
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")

// view engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

// database
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL) //  USE newUrlParse is not used anymore

const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))

// router
app.use("/", indexRouter)
app.use("/authors", authorRouter)

app.listen(process.env.PORT || 3000)