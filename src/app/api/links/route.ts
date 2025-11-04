import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // sesuaikan path

const filePath = path.join(process.cwd(), "sourcepagelink.txt");

// Fungsi bantu baca file
function readLinksFile() {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf-8");
  const links: Record<string, string> = {};
  const matches = content.match(/<([^:>]+):([^>]+)>/g) || [];
  for (const m of matches) {
    const [, key, value] = m.match(/<([^:>]+):([^>]+)>/) || [];
    if (key && value) links[key] = value;
  }
  return links;
}

// Proteksi route: hanya admin yang login
async function checkAdminSession(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null; // artinya boleh lanjut
}

// GET
export async function GET(req: Request) {
  const authError = await checkAdminSession(req);
  if (authError) return authError;

  try {
    const links = readLinksFile();
    return NextResponse.json(links);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}

// POST
export async function POST(req: Request) {
  const authError = await checkAdminSession(req);
  if (authError) return authError;

  try {
    const data = await req.json();
    const lines = Object.entries(data)
      .map(([key, val]) => `<${key}:${val}>`)
      .join("\n");
    fs.writeFileSync(filePath, lines);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}