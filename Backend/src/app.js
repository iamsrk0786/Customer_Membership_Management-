import express from "express";
import cors from "cors";
import customerRoutes from "./routes/customerRoute.js";
import membershipRoutes from "./routes/membershipRoute.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/customers", customerRoutes);
app.use("/api/memberships", membershipRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
