import "dotenv/config";
import express, { Request, Response } from "express";
const app = express();
const port = process.env.APP_PORT;

// use express json parser
app.use(express.json());

// home route
app.get("/", (request: Request, response: Response) => {
  return response.send(`<h1>backend server up at port ${port}</h1>`);
});

// App Listner
app.listen(port, () => {
  console.log(`backend server up at port ${port}`);
});
