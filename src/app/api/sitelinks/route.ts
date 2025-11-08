import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 📂 Lokasi penyimpanan file link (bisa kamu ubah sesuai kebutuhan)
const filePath = path.join(process.cwd(), "sourcepagelink.txt");

// 🔹 Baca file link (format: <key:value>)
function readLinksFile() {
  try {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, "utf-8");
    const links: Record<string, string> = {};

    const matches = content.match(/<([^:>]+):([^>]+)>/g) || [];
    for (const m of matches) {
      const [, key, value] = m.match(/<([^:>]+):([^>]+)>/) || [];
      if (key && value) links[key] = value;
    }
    return links;
  } catch (err) {
    console.error("❌ Gagal membaca file link:", err);
    return {};
  }
}

// 🔹 Simpan data link ke file (dalam format <key:value>)
function writeLinksFile(data: Record<string, string>) {
  try {
    const validEntries = Object.entries(data).filter(([key, val]) => key && val);
    const lines = validEntries.map(([key, val]) => `<${key}:${val}>`).join("\n");
    fs.writeFileSync(filePath, lines, "utf-8");
  } catch (err) {
    console.error("❌ Gagal menulis file link:", err);
    throw err;
  }
}

// =====================================================
// 🟢 GET (Publik) — Siapa pun bisa ambil link
export async function GET() {
  try {
    const links = readLinksFile();
    return NextResponse.json(links);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}

// =====================================================
// 🔒 PUT (Admin) — Update link
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();

    if (typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    writeLinksFile(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}

// =====================================================
// 🔒 POST (Admin) — Bisa juga untuk create/update
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    if (typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    writeLinksFile(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
