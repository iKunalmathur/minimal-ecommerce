import axios from "axios";
import { NextApiResponse } from "next";

export default async function handler(request: any, response: NextApiResponse) {
  if (request.method === "POST") {
    const token = request.cookies.token;
    console.log(token);
    // Process a POST request

    let config: Object = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: request.body,
    };

    try {
      const res = await axios(config);
      return response.json(res.data);
    } catch (error) {
      console.error(error);
    }
  } else if (request.method === "GET") {
    const { token } = request.query;
    // Process a GET request

    let config: Object = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
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
      return response.json({ status: "error", message: "No order found" });
    }
  } else {
    // Handle any other HTTP method
    return response.status(404).send("404 Page not found");
  }
}
