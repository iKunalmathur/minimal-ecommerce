/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../services/handleApi";

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
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/items`)
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
