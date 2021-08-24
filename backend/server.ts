import express from "express";
import cors from "cors";

const app = express();
const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// application/json
app.use(express.json());

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome.");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is runnning: http://localhost:${PORT}/`);
});
