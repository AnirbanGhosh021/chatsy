
import express from "express"
import dotenv from "dotenv"
import path from "path"
import authRouters from "./routes/auth.route.js";
import messageRouters from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser  from "cookie-parser";


dotenv.config()

const  app = express();
  

const PORT =process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

app.use("/api/auth", authRouters)
app.use("/api/messages", messageRouters)


//make ready for deployment 
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend/dist", "dist", "index.html"))
    })
}
app.listen(PORT, ()=> {
    console.log("Sarver runing on port "+ PORT)
    connectDB()
})