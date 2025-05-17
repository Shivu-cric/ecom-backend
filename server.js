const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const favouritesRoutes = require("./routes/favouriteRoutes");

config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartItemRoutes);
app.use("/api/favourites", favouritesRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
