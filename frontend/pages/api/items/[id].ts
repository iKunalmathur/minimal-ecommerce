/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`
      );
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
