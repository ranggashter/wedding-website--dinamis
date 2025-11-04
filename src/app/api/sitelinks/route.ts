import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "sourcepagelink.txt");

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

// ❌ Tidak pakai proteksi admin untuk GET, supaya publik bisa fetch link WA/IG/TikTok
export async function GET() {
  try {
    const links = readLinksFile();
    return NextResponse.json(links);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}

// POST tetap proteksi admin
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const lines = Object.entries(data).map(([key, val]) => `<${key}:${val}>`).join("\n");
    fs.writeFileSync(filePath, lines);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}