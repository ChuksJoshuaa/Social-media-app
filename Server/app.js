import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

//routes
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("The App is running smoothly");
});
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

// mongoose.set("useFindAndModify", false);
