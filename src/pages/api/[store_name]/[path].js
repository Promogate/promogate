import fs from "fs";

export default async function api(req, res) {
  const filename = req.query;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(await fs.readFileSync(filename[0], "utf-8"));
  res.end();
}