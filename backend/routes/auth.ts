import "../config/dotEnvConfig";

import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Prisma, PrismaClient } from "@prisma/client";

const router = express.Router();

const { user: User } = new PrismaClient();

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
};

// In App DB
const Users: User[] = [];
const JWT_SECRET = `${process.env.JWT_SECRET}`;

// Login
router.post("/login", async (request: Request, response: Response) => {
  const { email, password: plainTextPassword } = request.body;

  // Need To Perform Validation
  // email
  if (!email) {
    return response.json({
      status: "error",
      message: "Email cannot be empty",
    });
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return response.json({
      status: "error",
      message: "Invalid email address",
    });
  }
  // password
  if (!plainTextPassword) {
    return response.json({
      status: "error",
      message: "Password cannot be empty",
    });
  }
  // Validation Passed
  console.log("Success : ", "Validation Passed");

  // Get User From DB

  const user = await User.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return response.json({
      status: "error",
      message: "Invalid credentials / User not found ☹",
    });
  }

  // Check if password matched

  const isMatched = await bcrypt.compare(plainTextPassword, user.password);

  if (!isMatched) {
    return response.json({
      status: "error",
      message: "Invalid credentials, Nice Try 😅",
    });
  }

  const token = sign(
    {
      identifier: user.id,
      name: user.name,
    },
    JWT_SECRET
  );

  if (!token) {
    return response.json({
      status: "error",
      message: "Internal seriver error",
    });
  }

  // Login Success

  console.log("Login Success");

  return response.json({
    status: "success",
    message: "Login Successfull, 😄",
    data: token,
  });
});

// Sign Up
router.post("/signup", async (request: Request, response: Response) => {
  const { name, email, phone, password: plainTextPassword } = request.body;

  // Validate Data

  // name
  if (!name) {
    return response.json({
      status: "error",
      message: "Full name cannot be empty",
    });
  }
  // email
  if (!email) {
    return response.json({
      status: "error",
      message: "Email cannot be empty",
    });
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return response.json({
      status: "error",
      message: "Invalid email address",
    });
  }
  // phone number
  if (!phone) {
    return response.json({
      status: "error",
      message: "Phone number cannot be empty",
    });
  }
  if (phone.length < 10 || phone.length > 16) {
    return response.json({
      status: "error",
      message: "Invalid phone number",
    });
  }
  // password
  if (!plainTextPassword) {
    return response.json({
      status: "error",
      message: "Password cannot be empty",
    });
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(plainTextPassword)) {
    return response.json({
      status: "error",
      message:
        "Password should be minimum eight characters, at least one letter and one number",
    });
  }

  // Validation Passed
  console.log("Success : ", "Validation Passed");
  // Check if already exists

  const userExists = await User.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    console.log("Error : ", "User already exists");
    return response.json({
      status: "error",
      message: "User already exists, 😒",
    });
  }

  // Creating new user and store to db

  const id = Math.floor(Math.random() * 10000);
  const password = await bcrypt.hash(plainTextPassword, 10);

  const data = {
    id,
    name,
    email,
    phone,
    active: true,
    password,
  };

  try {
    const newUser = await User.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        password: false,
      },
    });

    console.log("Success : ", "New User Created");

    response.json({
      status: "success",
      message: "Sign up Successfull, 😃",
      data: newUser,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        response.json({
          status: "error",
          message: "Phone Number Already In Use, 😫",
        });
      }
    }
    throw error;
  }
});

module.exports = router;
