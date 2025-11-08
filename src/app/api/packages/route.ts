import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// =====================================================
// 🟢 GET - Ambil semua package aktif (publik)
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    // ubah features dari JSON string ke array biar langsung bisa dipakai di frontend
    const formatted = packages.map((pkg) => ({
      ...pkg,
      features: JSON.parse(pkg.features || "[]"),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("❌ Gagal ambil packages:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

// =====================================================
// 🔒 POST - Tambah package baru (admin only)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    if (!data.name || !data.price) {
      return NextResponse.json({ error: "Name dan Price wajib diisi" }, { status: 400 });
    }

    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        price: data.price,
        features: JSON.stringify(data.features || []),
        isPopular: data.isPopular ?? false,
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("❌ Gagal membuat package:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}

// =====================================================
// 🔒 PUT - Update package (admin only)
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: "ID diperlukan untuk update" }, { status: 400 });
    }

    const pkg = await prisma.package.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
        features: JSON.stringify(data.features || []),
        isPopular: data.isPopular ?? false,
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("❌ Gagal update package:", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

// =====================================================
// 🔒 DELETE - Hapus package (admin only)
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

    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gagal hapus package:", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
