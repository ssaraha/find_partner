import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import projectRoutes from "./routes/projectRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import requestRoutes from "./routes/requestRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import cors from "cors";
import path from "path"

import cookieParser from "cookie-parser";

const app = express();

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());//ALLOWS US TO PARSE INCOING REQUEST WITH JSON PAYLOADS(GET DATA JSON FROM FORM)
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());//ALLOWS TO PARSE THE INCOMING COOKIES


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/companies", companyRoutes);

console.log("ENV VAR .... ", process.env.NODE_ENV)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "frontend/dist")));
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT} now ...`)
});
