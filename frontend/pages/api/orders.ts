import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    // Process a POST request
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        request.body
      );
      return response.json(res.data);
    } catch (error) {
      console.error(error);
    }
  } else {
    // Handle any other HTTP method
    return response.status(404).send("404 Page not found");
  }
}
