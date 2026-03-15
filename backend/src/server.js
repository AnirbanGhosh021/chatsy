import express from "express"
import dotenv from "dotenv"
import path from "path"
import authRouters from "./routes/auth.route.js"
import messageRouters from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { ENV } from "./lib/env.js"
import { app, server } from "./lib/socket.js"

dotenv.config()


const PORT = process.env.PORT || 3000

// ✅ BODY LIMIT — ONLY THIS ONE
app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ limit: "20mb", extended: true }))

// ✅ CORS
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}))

// ✅ Cookies
app.use(cookieParser())

const __dirname = path.resolve()

// ✅ Routes
app.use("/api/auth", authRouters)
app.use("/api/messages", messageRouters)

// ✅ Production build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}

server.listen(PORT, () => {
  console.log("Server running on port " + PORT)
  connectDB()
})