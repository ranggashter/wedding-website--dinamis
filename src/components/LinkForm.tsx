"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LinkForm() {
  const [links, setLinks] = useState({
    instagram: "",
    tiktok: "",
    whatsapp: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/links")
      .then((r) => r.json())
      .then((data) => setLinks((prev) => ({ ...prev, ...data })))
      .catch(() => setStatus("Gagal memuat link"));
  }, []);

  const handleSave = async () => {
    setStatus("Menyimpan...");
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(links),
    });
    if (res.ok) setStatus("✅ Disimpan!");
    else setStatus("❌ Gagal menyimpan");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold mb-2">Konfigurasi Link Sosial Media</h2>

      {["instagram", "tiktok", "whatsapp"].map((platform) => (
        <div key={platform}>
          <Label className="capitalize">{platform}</Label>
          <Input
            value={(links as any)[platform]}
            onChange={(e) =>
              setLinks({ ...links, [platform]: e.target.value })
            }
            placeholder={`Masukkan URL ${platform}`}
          />
        </div>
      ))}

      <Button onClick={handleSave}>Simpan</Button>
      {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
    </div>
  );
}