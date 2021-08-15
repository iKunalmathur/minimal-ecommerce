import type { NextApiRequest, NextApiResponse } from "next";
import { getData, postData } from "../../services/handleApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const path = "/orders";
  const reqdata = req.body;
  const data = await postData(path, reqdata);
  res.status(200).json(data);
}
