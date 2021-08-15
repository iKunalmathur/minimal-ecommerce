import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getData, postData } from "../../services/handleApi";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, request.body)
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
