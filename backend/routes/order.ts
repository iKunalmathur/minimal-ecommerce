import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import checkAuth from "../middleware/checkAuth";

const router = express.Router();

const { order: Order } = new PrismaClient();

// Get all users orders
router.get("/", checkAuth, async (request: any, response: Response) => {
  console.log("/order:get accessed");
  const { user: userId } = request;

  const userData = await Order.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      item: true,
    },
  });

  return response.json(userData);
});

// Create Orders
router.post("/", checkAuth, async (request: Request, response: Response) => {
  console.log("/order:post accessed");

  const data = request.body;

  console.log(data);

  if (!data || data.length === 0) {
    return response.json({
      status: "error",
      message: "No order found, 🤔",
    });
  }

  try {
    const result = await Order.createMany({
      data,
    });

    if (result.count === 0) {
      return response.json({
        status: "error",
        message: "Internal server error, 😵",
      });
    }

    console.log("New Order Created");

    return response.json({
      status: "success",
      message: "Order Placed Successfully, ✔",
    });
  } catch (error) {
    console.log(error);
    return response.json({
      status: "error",
      message: "Internal server error, 😵",
    });
  }
});

module.exports = router;
