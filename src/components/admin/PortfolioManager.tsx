"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit2, Save, MapPin, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Portfolio {
  id: string;
  theme: string;
  location: string;
  guests: string;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
}

export default function PortfolioManager() {
  const { toast } = useToast();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    theme: "",
    location: "",
    guests: "",
    imageUrl: "",
    order: 0,
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat portofolio",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/portfolio", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData),
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: `Portofolio berhasil ${editingId ? "diperbarui" : "ditambahkan"}`,
        });
        fetchPortfolios();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan portofolio",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingId(portfolio.id);
    setFormData({
      theme: portfolio.theme,
      location: portfolio.location,
      guests: portfolio.guests,
      imageUrl: portfolio.imageUrl || "",
      order: portfolio.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus portofolio ini?")) return;

    try {
      const res = await fetch(`/api/portfolio?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Portofolio berhasil dihapus",
        });
        fetchPortfolios();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus portofolio",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      theme: "",
      location: "",
      guests: "",
      imageUrl: "",
      order: 0,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Daftar Portofolio ({portfolios.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Portofolio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Portofolio" : "Tambah Portofolio Baru"}
              </DialogTitle>
              <DialogDescription>
                Isi form di bawah untuk {editingId ? "memperbarui" : "menambahkan"} portofolio
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="theme">Tema Pernikahan</Label>
                <Input
                  id="theme"
                  value={formData.theme}
                  onChange={(e) =>
                    setFormData({ ...formData, theme: e.target.value })
                  }
                  placeholder="Garden Paradise"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Bali"
                  required
                />
              </div>

              <div>
                <Label htmlFor="guests">Jumlah Tamu</Label>
                <Input
                  id="guests"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  placeholder="150"
                  required
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">URL Gambar (opsional)</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="order">Urutan Tampil</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(false);
                  }}
                >
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{portfolio.theme}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {portfolio.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {portfolio.guests} tamu
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(portfolio)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(portfolio.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {portfolios.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Belum ada portofolio. Klik tombol "Tambah Portofolio" untuk menambahkan.
          </div>
        )}
      </div>
    </div>
  );
}