import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// =====================================================
// 🟢 GET - Ambil semua layanan aktif (publik)
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    // parsing fitur dari string JSON ke array biar frontend enak pakainya
    const formatted = services.map((item) => ({
      ...item,
      features: JSON.parse(item.features || "[]"),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Gagal ambil data services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// =====================================================
// 🔒 POST - Tambah service baru (admin only)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title dan description wajib diisi" }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon || "Circle",
        features: JSON.stringify(data.features || []),
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("❌ Gagal membuat service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

// =====================================================
// 🔒 PUT - Update service berdasarkan ID
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });
    }

    const updated = await prisma.service.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon || "Circle",
        features: JSON.stringify(data.features || []),
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Gagal update service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// =====================================================
// 🔒 DELETE - Hapus service berdasarkan ID
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

    await prisma.service.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gagal hapus service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
