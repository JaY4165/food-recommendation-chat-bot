import express from "express";
import { initializeModel, initializeModelForRecipe } from "./utils.mjs";
import cors from "cors";

const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "1mb",
  })
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/api/v1/recommend-food", async (req, res) => {
  const { diet, factor } = req.body;
  const joinedDiet = diet.join(", ");
  const joinedFactor = factor.join(", ");
  const resData = await initializeModel(joinedDiet, joinedFactor);
  res.json(resData).status(200);
});

app.post("/api/v1/recipe", async (req, res) => {
  const { food } = req.body;
  const resData = await initializeModelForRecipe(food);
  res.json(resData).status(200);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
