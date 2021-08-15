import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    // Process a POST request

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, request.body)
      .then((res) => {
        return response.json(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Handle any other HTTP method
    return response.status(404).send("404 Page not found");
  }
}
