import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;
  const cookie = serialize("_token", token as string, {
    httpOnly: true,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  res.redirect("/");
}
