import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  response.json(request.body);
});

module.exports = router;
