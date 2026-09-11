import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import seed from "./config/seed.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const { PORT = 5000, MONGODB_URI, CLIENT_ORIGIN } = process.env;

await connectDB(MONGODB_URI);
await seed();

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/content", contentRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
