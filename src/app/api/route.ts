// import { NextApiResponse } from "next";
import { writeFile } from "fs/promises";

export async function GET(request: Request) {
  console.log("BODY", request.body);
  return Response.json({ message: "hello world" });
}

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("file") as unknown as File;

  if (!file) {
    return Response.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `${process.cwd()}/public/upload/${file.name}`;
  await writeFile(path, buffer);

  return Response.json({ success: true, fileName: `${file.name}` });
}
