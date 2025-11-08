"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

export default function SiteLinksForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    wa_konsultasi: "",
    wa_cs: "",
    instagram: "",
    tiktok: "",
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/sitelinks");
      const data = await res.json();
      
      if (data) {
        setFormData({
          wa_konsultasi: data.wa_konsultasi || "",
          wa_cs: data.wa_cs || "",
          instagram: data.instagram || "",
          tiktok: data.tiktok || "",
        });
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/sitelinks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Link berhasil diperbarui",
        });
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating links:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui link",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="wa_konsultasi">WhatsApp Konsultasi</Label>
          <Input
            id="wa_konsultasi"
            name="wa_konsultasi"
            value={formData.wa_konsultasi}
            onChange={handleChange}
            placeholder="628123456789 (tanpa +)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: 628123456789 (gunakan 62 untuk Indonesia)
          </p>
        </div>

        <div>
          <Label htmlFor="wa_cs">WhatsApp Customer Service</Label>
          <Input
            id="wa_cs"
            name="wa_cs"
            value={formData.wa_cs}
            onChange={handleChange}
            placeholder="628123456789 (tanpa +)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Format: 628123456789 (gunakan 62 untuk Indonesia)
          </p>
        </div>

        <div>
          <Label htmlFor="instagram">Instagram URL</Label>
          <Input
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="https://instagram.com/eleganwedding"
          />
        </div>

        <div>
          <Label htmlFor="tiktok">TikTok URL</Label>
          <Input
            id="tiktok"
            name="tiktok"
            value={formData.tiktok}
            onChange={handleChange}
            placeholder="https://tiktok.com/@eleganwedding"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Simpan Perubahan
          </>
        )}
      </Button>
    </form>
  );
}