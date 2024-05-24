import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  return JSON.stringify({ res, req });
    // if (req.method=='POST') {
    //     console.log(req.query);
    // } else {
        
    // }
}
