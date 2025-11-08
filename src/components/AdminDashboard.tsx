"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LandingContentForm from "@/components/admin/LandingContentForm";
import ServicesManager from "@/components/admin/ServicesManager";
import PackagesManager from "@/components/admin/PackagesManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import SiteLinksForm from "@/components/admin/SiteLinksForm";
import { Home, Briefcase, Package, Image, Star, Link } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Konten Utama</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Layanan</span>
          </TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Paket</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Portofolio</span>
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Testimoni</span>
          </TabsTrigger>
          <TabsTrigger value="links" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">Social Links</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Konten Landing Page</CardTitle>
              <CardDescription>
                Kelola konten utama website seperti hero section, about, contact info
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LandingContentForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kelola Layanan</CardTitle>
              <CardDescription>
                Tambah, edit, atau hapus layanan yang ditawarkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServicesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kelola Paket</CardTitle>
              <CardDescription>
                Tambah, edit, atau hapus paket wedding yang tersedia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PackagesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kelola Portofolio</CardTitle>
              <CardDescription>
                Tambah, edit, atau hapus portofolio project wedding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kelola Testimoni</CardTitle>
              <CardDescription>
                Tambah, edit, atau hapus testimoni dari klien
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TestimonialsManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Kelola link WhatsApp, Instagram, TikTok
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SiteLinksForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}