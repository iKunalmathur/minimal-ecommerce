import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { token } = request.query;

  if (request.method === "GET") {
    // Process a GET request

    let config: Object = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res = await axios(config);
      return response.json(res.data);
    } catch (error) {
      console.log(error);
      return response.json({ status: "error", message: "No user found" });
    }
  } else {
    // Handle any other HTTP method
    return response.status(404).send("404 Page not found");
  }
}
