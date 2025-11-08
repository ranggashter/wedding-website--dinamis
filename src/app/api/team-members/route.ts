import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// =====================================================
// 🟢 GET - ambil semua team member (publik)
export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error("❌ Gagal ambil data team:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

// =====================================================
// 🔒 POST - tambah team member baru (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();

    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl || null,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error("❌ Gagal tambah team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

// =====================================================
// 🔒 PUT - update team member (admin only)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();

    const member = await prisma.teamMember.update({
      where: { id: data.id },
      data: {
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl,
        order: data.order,
        isActive: data.isActive,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error("❌ Gagal update team member:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// =====================================================
// 🔒 DELETE - hapus team member (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.teamMember.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Gagal hapus team member:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
