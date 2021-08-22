import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

const router = express.Router();

const { user: User, item: Item } = new PrismaClient();
// Seed user
router.get("/users", async (request: Request, response: Response) => {
  // Delete Old Data
  await User.deleteMany({});

  // dummy data
  // DB handle Id by it self

  const password = await bcrypt.hash("password01", 10);

  const data = [
    {
      name: "John Doe",
      email: "johndoe01@example.com",
      phone: "+91 9876543201",
      active: true,
      password,
    },
    {
      name: "Jane Doe",
      email: "janedoe01@example.com",
      phone: "+92 9876543201",
      active: false,
      password,
    },
  ];

  const result = await User.createMany({
    data,
  });

  if (result.count === 0) {
    return response.json({
      status: "error",
      message: "Internal Server Error",
    });
  }

  const users = await User.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      password: false,
    },
  });

  // send
  return response.json({
    status: "success",
    data: users,
    message: "Password is [password01]",
  });
});

// Seed Items
router.get("/items", async (request: Request, response: Response) => {
  // Delete Old Data
  await Item.deleteMany({});

  const data = [
    {
      title: "Gigabyte AERO 15S OLED KB Thin+Light High Performa",
      description:
        "4K UHD OLED Display, GeForce RTX 2060, i7-10875H, 16GB DDR4, 512GB NVMe SSD, 8.5hrs Battery Life(AERO 15S OLED KB-8US5130SP)",
      image: "/items/1.jpg",
      publish: true,
      price: 2199.99,
    },
    {
      title: "ASUS ROG Strix G17 (2021) Gaming Laptop",
      description:
        "17.3” 300Hz IPS Type FHD, NVIDIA GeForce RTX 3070, AMD Ryzen 9 5900HX, 16GB DDR4, 1TB PCIe NVMe SSD, RGB Keyboard, Windows 10, G713QR-ES96",
      image: "/items/2.jpg",
      publish: true,
      price: 2021.73,
    },
    {
      title: "New Dell XPS 17 9700 17 inch UHD Plus Laptop.",
      description:
        "Intel i9-10885H 10th Gen, 32GB DDR4 RAM, 1TB SSD, NVIDIA GeForce RTX 2060 6GB GDDR6, Windows 10 Home, 17-30.99 inches",
      image: "/items/3.jpg",
      publish: true,
      price: 2779.98,
    },
    {
      title: "2021 Apple MacBook Pro",
      description:
        "Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray",
      image: "/items/4.jpg",
      publish: true,
      price: 2999.99,
    },
    {
      title: "Razer Blade 15 RTX",
      description:
        "World's Smallest 15.6 Gaming Laptop (144Hz Full HD Thin Bezel, 8th Gen Intel Core i7-8750H 6 Core, NVIDIA GeForce RTX 2080 Max-Q, 16GB RAM, 512GB SSD, Windows 10, CNC Aluminum)",
      image: "/items/5.jpg",
      publish: true,
      price: 2569.98,
    },
  ];

  const result = await Item.createMany({
    data,
  });

  if (result.count === 0) {
    return response.json({
      status: "error",
      message: "Internal Server Error",
    });
  }

  const items = await Item.findMany({
    where: {
      publish: true,
    },
  });

  // send
  return response.json({
    status: "success",
    data: items,
  });
});

module.exports = router;
