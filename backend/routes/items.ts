import { PrismaClient } from "@prisma/client";
import express, { Request, request, Response, response } from "express";

const router = express.Router();

const { item: Item } = new PrismaClient();

// Server DB
const dummyItems = [
  {
    id: 1,
    title: "product title 1",
    description: "product description",
    price: 99.99,
    image: "/products/1.jpg",
  },
  {
    id: 2,
    title: "product title 2",
    description: "product description",
    price: 99.99,
    image: "/products/2.jpg",
  },
  {
    id: 3,
    title: "product title 3",
    description: "product description",
    price: 99.99,
    image: "/products/3.jpg",
  },
  {
    id: 4,
    title: "product title 4",
    description: "product description",
    price: 99.99,
    image: "/products/4.jpg",
  },
];

// Send All Items
router.get("/", async (request: Request, response: Response) => {
  const items: Object[] = await Item.findMany({
    where: {
      publish: true,
    },
  });

  if (items.length === 0) {
    return response.json(dummyItems);
  }
  response.json(items);
});

router.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  const item: any = await Item.findUnique({
    where: {
      id: Number(id),
    },
  });

  response.json(item);
});

module.exports = router;
