import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import chalk from "chalk"
import productRouter from "./router/productRouter.js"

const app = express();
dotenv.config({ path: "./config/config.env" })

app.use(morgan('tiny'))
app.use(cors());

//how to read form data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get("/", (request, response) => {
    response.send("<h1>welcome to node js class</h1>")
})

//config user-route /product routes
app.use("/product", productRouter)

const port = process.env.PORT
const hostName = process.env.HOST_NAME
const mongoUrl = process.env.MONGO_URL

//to connect mongo db
mongoose.connect(mongoUrl).then((response) => {
    console.log("mongo db connected sucessfully")
}).catch((err) => {
 console.log(err)
 process.exit(1)  // stop the node js process if unable to connect to mongodb
})
app.listen(port, () => {
    console.log(chalk.magenta(`Server is running on...http://localhost:${port}`))
})