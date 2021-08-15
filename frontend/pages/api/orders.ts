import type { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../services/handleApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = "/orders";
  const data = await getData(path);
  res.status(200).json(data);
}
