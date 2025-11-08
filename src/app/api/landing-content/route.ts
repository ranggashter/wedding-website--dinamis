import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// =====================================================
// 🟢 GET - Ambil 1 konten landing page (publik)
export async function GET() {
  try {
    let content = await prisma.landingPageContent.findFirst();

    // kalau belum ada, buat default supaya form gak error
    if (!content) {
      content = await prisma.landingPageContent.create({ data: {} });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("❌ Gagal ambil landing content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// =====================================================
// 🔒 PUT - Update konten (admin only)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();
    const existing = await prisma.landingPageContent.findFirst();

    const updated = existing
      ? await prisma.landingPageContent.update({
          where: { id: existing.id },
          data,
        })
      : await prisma.landingPageContent.create({ data });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Gagal update landing content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
