import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import portfolioRoutes from './routes/portfolioRoutes.js'

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Dynamic Porfolio server");
});

app.use('/user', userRoutes);
app.use('/api', portfolioRoutes);

const PORT = process.env.PORT || 5001;

const DATABASE_URL = process.env.MONGO_DB_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => app.listen(PORT, console.log(`server running on port ${PORT}`)))
  .catch((err) => console.log(err.message));
