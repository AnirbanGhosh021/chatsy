import { ENV } from "../lib/env.js"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const socketAuthMiddleWare = async (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie

    const token = cookieHeader
      ?.split(";")
      .find((row) => row.trim().startsWith("jwt="))
      ?.split("=")[1]

    if (!token) {
      console.log("Socket rejected: No token")
      return next(new Error("Unauthorized - No token provided"))
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET)

    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return next(new Error("User not found"))
    }

    socket.user = user
    socket.userId = user._id.toString()

    console.log(`Socket Authenticated: ${user.fullName}`)

    next()
  } catch (error) {
    console.log("Socket auth error:", error.message)
    next(new Error("Unauthorized - Authentication failed"))
  }
}