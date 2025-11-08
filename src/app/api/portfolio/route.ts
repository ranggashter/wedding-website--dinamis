import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// =====================================================
// 🟢 GET - Ambil semua portofolio aktif (publik)
export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("❌ Gagal ambil portfolio:", error);
    return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 });
  }
}

// =====================================================
// 🔒 POST - Tambah portofolio baru (admin only)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    if (!data.theme || !data.location || !data.guests) {
      return NextResponse.json({ error: "Field wajib belum lengkap" }, { status: 400 });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        theme: data.theme,
        location: data.location,
        guests: data.guests,
        imageUrl: data.imageUrl || null,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("❌ Gagal membuat portfolio:", error);
    return NextResponse.json({ error: "Failed to create portfolio" }, { status: 500 });
  }
}

// =====================================================
// 🔒 PUT - Update data portofolio (admin only)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: data.id },
      data: {
        theme: data.theme,
        location: data.location,
        guests: data.guests,
        imageUrl: data.imageUrl || null,
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    console.error("❌ Gagal update portfolio:", error);
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }
}

// =====================================================
// 🔒 DELETE - Hapus portofolio (admin only)
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }

    await prisma.portfolio.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gagal hapus portfolio:", error);
    return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 });
  }
}
