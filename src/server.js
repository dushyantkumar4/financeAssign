import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errHandler } from "./middlewares/errorHandler.js";
dotenv.config();
import userRouter from "./routes/user.router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//all routes 
app.use("/api", userRouter);


app.use(errHandler);
connectDB();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
