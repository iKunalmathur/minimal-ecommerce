import express, { Request, request, Response, response } from "express";

const router = express.Router();

// Server DB
const Items = [
  {
    id: 1,
    name: "product name 1",
    description: "product description",
    price: 99.99,
    image: "/products/1.jpg",
  },
  {
    id: 2,
    name: "product name 2",
    description: "product description",
    price: 99.99,
    image: "/products/2.jpg",
  },
  {
    id: 3,
    name: "product name 3",
    description: "product description",
    price: 99.99,
    image: "/products/3.jpg",
  },
  {
    id: 4,
    name: "product name 4",
    description: "product description",
    price: 99.99,
    image: "/products/4.jpg",
  },
];

// Send All Items
router.get("/", (request: Request, response: Response) => {
  return response.json(Items);
});

module.exports = router;
