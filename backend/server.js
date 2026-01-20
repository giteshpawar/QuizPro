const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://quiz-pro-pi.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/test", require("./routes/testRoutes"));

app.use("/api/general-knowledge", require("./routes/generalKnowledgeRoutes"));

app.use("/api/marathi-grammar", require("./routes/marathiGrammarRoutes"));

app.use("/api/math", require("./routes/mathRoutes"));

app.use("/api/contact", require("./routes/contactRoutes"));

app.use("/api/intelligence",require("./routes/intelligenceRoutes"));

app.use("/api/finalexam", require("./routes/finalTestRoutes"));

app.use("/api/contact", require("./routes/contactRoutes"));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
