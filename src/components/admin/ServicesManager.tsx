"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit2, Save, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string;
  order: number;
  isActive: boolean;
}

export default function ServicesManager() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Circle",
    features: [""],
    order: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat layanan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        features: formData.features.filter((f) => f.trim() !== ""),
      };

      const res = await fetch("/api/services", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: `Layanan berhasil ${editingId ? "diperbarui" : "ditambahkan"}`,
        });
        fetchServices();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan layanan",
        variant: "destructive",
      });
    }
  };

const handleEdit = (service: any) => {
  let features: string[] = [];

  // pastikan fitur bisa di-handle apapun formatnya
  if (Array.isArray(service.features)) {
    features = service.features;
  } else if (typeof service.features === "string") {
    try {
      const parsed = JSON.parse(service.features);
      if (Array.isArray(parsed)) {
        features = parsed;
      } else {
        features = service.features.split(",");
      }
    } catch {
      features = service.features.split(",");
    }
  }

  setEditingId(service.id);
  setFormData({
    title: service.title,
    description: service.description,
    icon: service.icon,
    features,
    order: service.order,
  });
  setIsDialogOpen(true);
};


  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Layanan berhasil dihapus",
        });
        fetchServices();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus layanan",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      icon: "Circle",
      features: [""],
      order: 0,
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
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
        <h3 className="text-lg font-semibold">Daftar Layanan ({services.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Layanan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Layanan" : "Tambah Layanan Baru"}
              </DialogTitle>
              <DialogDescription>
                Isi form di bawah untuk {editingId ? "memperbarui" : "menambahkan"} layanan
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Layanan</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Full Wedding Organizer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Paket lengkap dari awal hingga akhir pernikahan"
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="icon">Icon (nama dari lucide-react)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="Circle, Heart, Users, Camera, Music"
                />
              </div>

              <div>
                <Label>Fitur-fitur</Label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Fitur ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFeature}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Fitur
                  </Button>
                </div>
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

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(service)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
<div className="flex flex-wrap gap-2">
  {(() => {
    let features: string[] = [];

    const raw = service.features;

    if (Array.isArray(raw)) {
      // kalau sudah array langsung pakai
      features = raw;
    } else if (typeof raw === "string") {
      try {
        // coba parse JSON
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          features = parsed;
        } else {
          // fallback kalau hasil parse bukan array
          features = raw.split(",");
        }
      } catch {
        // fallback kalau bukan JSON valid
        features = raw.split(",");
      }
    }

    return features.map((feature, idx) => (
      <span
        key={idx}
        className="px-2 py-1 bg-rose-50 text-rose-600 rounded text-xs"
      >
        {feature.trim()}
      </span>
    ));
  })()}
</div>


            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Belum ada layanan. Klik tombol "Tambah Layanan" untuk menambahkan.
          </div>
        )}
      </div>
    </div>
  );
}