"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit2, Save, X, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface Package {
  id: string;
  name: string;
  price: string;
  features: string;
  isPopular: boolean;
  order: number;
  isActive: boolean;
}

export default function PackagesManager() {
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    features: [""],
    isPopular: false,
    order: 0,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat paket",
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

      const res = await fetch("/api/packages", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: `Paket berhasil ${editingId ? "diperbarui" : "ditambahkan"}`,
        });
        fetchPackages();
        resetForm();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan paket",
        variant: "destructive",
      });
    }
  };

const handleEdit = (pkg: Package) => {
  let features: string[] = [];

  if (Array.isArray(pkg.features)) {
    // Sudah array
    features = pkg.features;
  } else if (typeof pkg.features === "string") {
    try {
      const parsed = JSON.parse(pkg.features);
      if (Array.isArray(parsed)) {
        features = parsed;
      } else {
        features = pkg.features.split(",");
      }
    } catch {
      features = pkg.features.split(",");
    }
  }

  setEditingId(pkg.id);
  setFormData({
    name: pkg.name,
    price: pkg.price,
    features,
    isPopular: pkg.isPopular,
    order: pkg.order,
  });
  setIsDialogOpen(true);
};


  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus paket ini?")) return;

    try {
      const res = await fetch(`/api/packages?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Paket berhasil dihapus",
        });
        fetchPackages();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus paket",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      features: [""],
      isPopular: false,
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
        <h3 className="text-lg font-semibold">Daftar Paket ({packages.length})</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Paket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Paket" : "Tambah Paket Baru"}
              </DialogTitle>
              <DialogDescription>
                Isi form di bawah untuk {editingId ? "memperbarui" : "menambahkan"} paket
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Paket</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Gold Package"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="25jt atau Custom"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isPopular: checked })
                  }
                />
                <Label htmlFor="isPopular">Paket Populer</Label>
              </div>

              <div>
                <Label>Fitur-fitur Paket</Label>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={pkg.isPopular ? "ring-2 ring-rose-500" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <p className="text-2xl font-bold text-rose-500 mt-1">{pkg.price}</p>
                </div>
                {pkg.isPopular && (
                  <Star className="h-5 w-5 text-rose-500 fill-current" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
<div className="space-y-1">
  {(() => {
    let features: string[] = [];

    const raw = pkg.features;

    if (Array.isArray(raw)) {
      // kalau sudah array
      features = raw;
    } else if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          features = parsed;
        } else {
          features = raw.split(",");
        }
      } catch {
        features = raw.split(",");
      }
    }

    return features.map((feature, idx) => (
      <div key={idx} className="text-sm text-gray-600 flex items-start">
        <span className="mr-2">•</span>
        <span>{feature.trim()}</span>
      </div>
    ));
  })()}
</div>

              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(pkg)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(pkg.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {packages.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Belum ada paket. Klik tombol "Tambah Paket" untuk menambahkan.
          </div>
        )}
      </div>
    </div>
  );
}