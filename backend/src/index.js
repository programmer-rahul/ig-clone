import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import app from "./app.js";

dotenv.config({
  path: ".env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Connected Successfully on Port :-", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("Server Connection Error");
  });
  




