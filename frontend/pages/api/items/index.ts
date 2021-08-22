/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    publish: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`);
      return response.json(res.data);
    } catch (error) {
      console.log(error);
      return response.json({ status: "error", message: "No product found" });
    }
  } else {
    // Handle any other HTTP method
    return response.status(404).send("404 Page not found");
  }
}
