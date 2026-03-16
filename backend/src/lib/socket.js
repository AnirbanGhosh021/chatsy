import { Server } from "socket.io"
import http from "http"
import express from "express"
import { ENV } from "./env.js"
import { socketAuthMiddleWare } from "../middleware/socketAuthMiddleWare.js"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "https://chatsy-frontend-j9k6.onrender.com"],
    credentials: true,
  },
})

// Apply auth middleware
io.use(socketAuthMiddleWare)

// 🔥 Map userId → socketId
const userSocketMap = {}

// ⭐ EXPORT THIS FUNCTION
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId]
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.user.fullName)

  const userId = socket.userId

  userSocketMap[userId] = socket.id

  io.emit("getOnlineUser", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.fullName)

    delete userSocketMap[userId]

    io.emit("getOnlineUser", Object.keys(userSocketMap))
  })
})

export { server, app, io }
