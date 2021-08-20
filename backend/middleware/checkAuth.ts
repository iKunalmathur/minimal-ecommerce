import "../config/dotEnvConfig";

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const JWT_SECRET = `${process.env.JWT_SECRET}`;

const checkAuth = async (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("authorization");

  // Check if token exist in header
  if (!token) {
    return response.json({
      status: "error",
      message: "Access Forbidden",
    });
  }

  // Check if token vaild
  try {
    const tokenDecoded: any = await verify(token, JWT_SECRET);

    request.user = tokenDecoded.id;

    console.log("Access Authorized 👍");

    next();
  } catch (error) {
    return response.json({
      status: "error",
      message: "Session expired, 😖",
    });
  }
};

export default checkAuth;
