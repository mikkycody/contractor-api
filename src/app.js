import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
import logger from "./logger";

require("dotenv").config();

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(routes);
const port = process.env.PORT || 4040;

app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});

export default app;
