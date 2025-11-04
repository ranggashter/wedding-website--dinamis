"use client";

import { useState, useEffect } from "react";

export default function AdminForm() {
  const [formData, setFormData] = useState({
    instagram: "",
    tiktok: "",
    wa_konsultasi: "",
    wa_cs: "",
  });

  const [pixelId, setPixelId] = useState(""); // Pixel tersendiri

  // 🔹 Ambil data link & pixel dari API
  useEffect(() => {
    fetch("/api/sitelinks")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          instagram: data.instagram || "",
          tiktok: data.tiktok || "",
          wa_konsultasi: data.wa_konsultasi || "",
          wa_cs: data.wa_cs || "",
        });
        setPixelId(data.pixel || ""); // isi default pixel
      })
      .catch(() => console.log("⚠️ Gagal memuat data"));
  }, []);

  // 🔹 Update input sosial & WA
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Simpan semua link sosial + WA
  const handleSubmitLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/sitelinks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, pixel: pixelId }),
    });
    if (res.ok) alert("✅ Data link & WA tersimpan!");
  };

  // 🔹 Simpan hanya Pixel (dan ke localStorage juga)
  const handleSavePixel = async (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("fb_pixel_id", pixelId);
    const res = await fetch("/api/sitelinks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, pixel: pixelId }),
    });

    if (res.ok) alert("✅ Pixel ID tersimpan & aktif!");
  };

  return (
    <div className="space-y-10 max-w-xl">
      {/* ====== BAGIAN LINK SOSIAL & WHATSAPP ====== */}
      <form onSubmit={handleSubmitLinks} className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">
          Manajemen Link & WhatsApp
        </h2>

        <input
          name="instagram"
          placeholder="Link Instagram"
          value={formData.instagram}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="tiktok"
          placeholder="Link TikTok"
          value={formData.tiktok}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="wa_konsultasi"
          placeholder="Nomor WhatsApp Konsultasi (cth: 628123456789)"
          value={formData.wa_konsultasi}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="wa_cs"
          placeholder="Nomor WhatsApp CS (cth: 628987654321)"
          value={formData.wa_cs}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
        >
          Simpan Link
        </button>
      </form>

      {/* ====== BAGIAN PIXEL FACEBOOK ====== */}
      <form onSubmit={handleSavePixel} className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Facebook Pixel</h2>
        <input
          name="pixel"
          placeholder="Masukkan Facebook Pixel ID"
          value={pixelId}
          onChange={(e) => setPixelId(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Pixel
        </button>
      </form>
    </div>
  );
}