import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();
const { user: User } = new PrismaClient();

router.get("/", checkAuth, async (request: any, response: Response) => {
  const { user: id } = request;

  const userData = await User.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      password: false,
    },
  });

  return response.json(userData);
});

router.get("/verify", checkAuth, async (request: any, response: Response) => {
  const { user: id } = request;

  const userData = await User.findUnique({
    where: {
      id,
    },
    select: {
      id: false,
      name: true,
      email: true,
      phone: false,
      password: false,
    },
  });

  return response.json(userData);
});

module.exports = router;
