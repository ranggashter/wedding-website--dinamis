import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// 🟢 GET - publik (bisa diakses tanpa login)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data testimoni" },
      { status: 500 }
    );
  }
}

// 🔒 POST - hanya admin (buat testimoni baru)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();

    // validasi sederhana biar data gak kosong
    if (!data.coupleName || !data.quote) {
      return NextResponse.json(
        { error: "Nama pasangan dan quote wajib diisi" },
        { status: 400 }
      );
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        coupleName: data.coupleName,
        quote: data.quote,
        rating: data.rating ?? 5,
        location: data.location ?? "",
        theme: data.theme ?? "",
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error("POST testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal membuat testimoni" },
      { status: 500 }
    );
  }
}

// 🔒 PUT - update data testimoni
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();

    if (!data.id) {
      return NextResponse.json({ error: "ID wajib disertakan" }, { status: 400 });
    }

    const updated = await prisma.testimonial.update({
      where: { id: data.id },
      data: {
        coupleName: data.coupleName,
        quote: data.quote,
        rating: data.rating,
        location: data.location,
        theme: data.theme,
        order: data.order,
        isActive: data.isActive,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate testimoni" },
      { status: 500 }
    );
  }
}

// 🔒 DELETE - hapus testimoni
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID wajib disertakan" }, { status: 400 });
    }

    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus testimoni" },
      { status: 500 }
    );
  }
}
