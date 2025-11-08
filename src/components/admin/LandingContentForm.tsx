"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function LandingContentForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutTitle: "",
    aboutSubtitle: "",
    aboutDesc1: "",
    aboutDesc2: "",
    statWeddings: "",
    statYears: "",
    statVendors: "",
    statSatisfaction: "",
    phoneNumber: "",
    email: "",
    address: "",
    workingHours: "",
    footerTagline: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/landing-content");
      const data = await res.json();
      
      if (data) {
        setFormData({
          heroTitle: data.heroTitle || "",
          heroSubtitle: data.heroSubtitle || "",
          aboutTitle: data.aboutTitle || "",
          aboutSubtitle: data.aboutSubtitle || "",
          aboutDesc1: data.aboutDesc1 || "",
          aboutDesc2: data.aboutDesc2 || "",
          statWeddings: data.statWeddings || "",
          statYears: data.statYears || "",
          statVendors: data.statVendors || "",
          statSatisfaction: data.statSatisfaction || "",
          phoneNumber: data.phoneNumber || "",
          email: data.email || "",
          address: data.address || "",
          workingHours: data.workingHours || "",
          footerTagline: data.footerTagline || "",
        });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      toast({
        title: "Error",
        description: "Gagal memuat konten",
        variant: "destructive",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/landing-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Konten berhasil diperbarui",
        });
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui konten",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      {/* Hero Section */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-lg font-semibold">Hero Section</h3>
        
        <div>
          <Label htmlFor="heroTitle">Judul Hero</Label>
          <Input
            id="heroTitle"
            name="heroTitle"
            value={formData.heroTitle}
            onChange={handleChange}
            placeholder="Wujudkan Pernikahan Impianmu..."
          />
        </div>

        <div>
          <Label htmlFor="heroSubtitle">Subtitle Hero</Label>
          <Textarea
            id="heroSubtitle"
            name="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={handleChange}
            placeholder="Dari konsep hingga hari H..."
            rows={2}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-lg font-semibold">About Section</h3>
        
        <div>
          <Label htmlFor="aboutTitle">Judul About</Label>
          <Input
            id="aboutTitle"
            name="aboutTitle"
            value={formData.aboutTitle}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="aboutSubtitle">Subtitle About</Label>
          <Input
            id="aboutSubtitle"
            name="aboutSubtitle"
            value={formData.aboutSubtitle}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="aboutDesc1">Deskripsi 1</Label>
          <Textarea
            id="aboutDesc1"
            name="aboutDesc1"
            value={formData.aboutDesc1}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="aboutDesc2">Deskripsi 2</Label>
          <Textarea
            id="aboutDesc2"
            name="aboutDesc2"
            value={formData.aboutDesc2}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-lg font-semibold">Statistik</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="statWeddings">Jumlah Pernikahan</Label>
            <Input
              id="statWeddings"
              name="statWeddings"
              value={formData.statWeddings}
              onChange={handleChange}
              placeholder="500+"
            />
          </div>

          <div>
            <Label htmlFor="statYears">Tahun Pengalaman</Label>
            <Input
              id="statYears"
              name="statYears"
              value={formData.statYears}
              onChange={handleChange}
              placeholder="10+"
            />
          </div>

          <div>
            <Label htmlFor="statVendors">Vendor Partner</Label>
            <Input
              id="statVendors"
              name="statVendors"
              value={formData.statVendors}
              onChange={handleChange}
              placeholder="50+"
            />
          </div>

          <div>
            <Label htmlFor="statSatisfaction">Kepuasan Klien</Label>
            <Input
              id="statSatisfaction"
              name="statSatisfaction"
              value={formData.statSatisfaction}
              onChange={handleChange}
              placeholder="98%"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-lg font-semibold">Informasi Kontak</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneNumber">Nomor Telepon</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+62 812-3456-7890"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@eleganwedding.com"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Alamat</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Jl. Elegan No. 123, Jakarta"
          />
        </div>

        <div>
          <Label htmlFor="workingHours">Jam Operasional</Label>
          <Input
            id="workingHours"
            name="workingHours"
            value={formData.workingHours}
            onChange={handleChange}
            placeholder="Senin - Sabtu: 09:00 - 18:00"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Footer</h3>
        
        <div>
          <Label htmlFor="footerTagline">Tagline Footer</Label>
          <Input
            id="footerTagline"
            name="footerTagline"
            value={formData.footerTagline}
            onChange={handleChange}
            placeholder="Kami Hadir untuk Merayakan Cinta Bersamamu 💍"
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
          "Simpan Perubahan"
        )}
      </Button>
    </form>
  );
}