import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const router = express.Router();

const { order: Order } = new PrismaClient();

// Create Orders
router.post("/", async (request: Request, response: Response) => {
  const data = request.body;

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
