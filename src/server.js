import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errHandler } from "./middlewares/errorHandler.js";
dotenv.config();
import cors from "cors"

import userRoute from "./routes/user.router.js";
import financeRoute from "./routes/finance.route.js";
import dashboard from "./routes/dashboard.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors()
);

//all routes 
app.use("/api", userRoute);
app.use("/api",financeRoute);
app.use("/api",dashboard);


app.use(errHandler);
connectDB();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
