"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit2, Save, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  coupleName: string;
  quote: string;
  rating: number;
  location: string;
  theme: string;
  order: number;
  isActive: boolean;
}

export default function TestimonialsManager() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    coupleName: "",
    quote: "",
    rating: 5,
    location: "",
    theme: "",
    order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat testimoni",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/testimonials", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData),
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: `Testimoni berhasil ${editingId ? "diperbarui" : "ditambahkan"}`,
        });
        fetchTestimonials();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan testimoni",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      coupleName: testimonial.coupleName,
      quote: testimonial.quote,
      rating: testimonial.rating,
      location: testimonial.location,
      theme: testimonial.theme,
      order: testimonial.order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;

    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Testimoni berhasil dihapus",
        });
        fetchTestimonials();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus testimoni",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      coupleName: "",
      quote: "",
      rating: 5,
      location: "",
      theme: "",
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
        <h3 className="text-lg font-semibold">Daftar Testimoni ({testimonials.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Testimoni
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Testimoni" : "Tambah Testimoni Baru"}
              </DialogTitle>
              <DialogDescription>
                Isi form di bawah untuk {editingId ? "memperbarui" : "menambahkan"} testimoni
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="coupleName">Nama Pasangan</Label>
                <Input
                  id="coupleName"
                  value={formData.coupleName}
                  onChange={(e) =>
                    setFormData({ ...formData, coupleName: e.target.value })
                  }
                  placeholder="Rina & Budi"
                  required
                />
              </div>

              <div>
                <Label htmlFor="quote">Testimoni</Label>
                <Textarea
                  id="quote"
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({ ...formData, quote: e.target.value })
                  }
                  placeholder="Kami sangat puas dengan hasilnya..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: parseInt(e.target.value) })
                  }
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
                <Label htmlFor="theme">Tema</Label>
                <Input
                  id="theme"
                  value={formData.theme}
                  onChange={(e) =>
                    setFormData({ ...formData, theme: e.target.value })
                  }
                  placeholder="Garden Theme"
                  required
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
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-rose-100">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{testimonial.coupleName}</CardTitle>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-rose-400 fill-current" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700 italic">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-xs text-gray-500">{testimonial.theme}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Belum ada testimoni. Klik tombol "Tambah Testimoni" untuk menambahkan.
          </div>
        )}
      </div>
    </div>
  );
}