import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 10000


// middlewares
app.use(express.json())
app.use(cors({ origin: "https://hungry-hub-client.onrender.com" }));
// app.use(cors({origin:"http://localhost:5174"}))
// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))