"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Circle, Users, Camera, Music, Calendar, Star, Phone, Mail, MapPin, Clock, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function WeddingOrganizer() {
  const [links, setLinks] = useState<{
    wa_konsultasi?: string;
    wa_cs?: string;
    instagram?: string;
    tiktok?: string;
  }>({});

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch("/api/sitelinks");
        const data = await res.json(); // ✅ langsung JSON, bukan .text()

        setLinks(data);
      } catch (err) {
        console.error("Gagal memuat link:", err);
      }
    }

    fetchLinks();
  }, []);

  const handleWhatsAppKonsultasi = () => {
    if (!links.wa_konsultasi)
      return alert("Nomor WA Konsultasi belum diset di Admin!");
    window.open(`https://wa.me/${links.wa_konsultasi}`, "_blank");
  };

  const handleWhatsAppCS = () => {
    if (!links.wa_cs) return alert("Nomor WA CS belum diset di Admin!");
    window.open(`https://wa.me/${links.wa_cs}`, "_blank");
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: Circle,
      title: "Full Wedding Organizer",
      description: "Paket lengkap dari awal hingga akhir pernikahan",
      features: ["Perencanaan detail", "Koordinasi acara", "Manajemen vendor", "Supervisi hari H"]
    },
    {
      icon: Users,
      title: "Intimate Wedding",
      description: "Pernikahan privat dan personal",
      features: ["Gathering terbatas", "Personalisasi maksimal", "Setting cozy", "Budaya custom"]
    },
    {
      icon: Heart,
      title: "Decoration & Styling",
      description: "Dekorasi dan styling pernikahan elegan",
      features: ["Theme design", "Floral arrangement", "Lighting design", "Backdrop premium"]
    },
    {
      icon: Music,
      title: "MC & Entertainment",
      description: "Hiburan dan hosting profesional",
      features: ["MC berpengalaman", "Sound system", "Live music", "Photobooth"]
    },
    {
      icon: Camera,
      title: "Documentation & Photography",
      description: "Dokumentasi kenangan abadi",
      features: ["Photography prewed", "Cinematic video", "Drone shot", "Edit profesional"]
    }
  ];

  const packages = [
    {
      name: "Silver Package",
      price: "15jt",
      features: ["Up to 100 tamu", "Basic decoration", "4 jam documentation", "1 coordinator"],
      popular: false
    },
    {
      name: "Gold Package",
      price: "25jt",
      features: ["Up to 200 tamu", "Premium decoration", "6 jam documentation", "2 coordinator", "Photobooth"],
      popular: true
    },
    {
      name: "Diamond Package",
      price: "40jt",
      features: ["Up to 300 tamu", "Luxury decoration", "Full day documentation", "4 coordinator", "Drone shot", "Live music"],
      popular: false
    },
    {
      name: "Custom Package",
      price: "Custom",
      features: ["Personalized sesuai kebutuhan", "Flexible durasi", "Custom decoration", "All inclusive"],
      popular: false
    }
  ];

  const testimonials = [
    {
      couple: "Rina & Budi",
      quote: "Kami sangat puas dengan hasilnya! Tim sangat profesional dan pernikahan kami berjalan sempurna.",
      rating: 5,
      location: "Bali",
      theme: "Garden Theme"
    },
    {
      couple: "Siti & Ahmad",
      quote: "Dari awal hingga akir, kami didampingi dengan baik. Setiap detail diperhatikan dengan sempurna.",
      rating: 5,
      location: "Jakarta",
      theme: "Classic Elegance"
    },
    {
      couple: "Maya & Dimas",
      quote: "Wedding organizer terbaik yang pernah kami temukan! Hasilnya melebihi ekspektasi kami.",
      rating: 5,
      location: "Bandung",
      theme: "Modern Minimalist"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    const phoneNumber = "6281234567890";
    const message = "Halo, saya ingin konsultasi jasa wedding organizer";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-rose-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Elegan Wedding
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("hero")} className="text-gray-700 hover:text-rose-500 transition-colors">Beranda</button>
              <button onClick={() => scrollToSection("about")} className="text-gray-700 hover:text-rose-500 transition-colors">Tentang Kami</button>
              <button onClick={() => scrollToSection("services")} className="text-gray-700 hover:text-rose-500 transition-colors">Layanan</button>
              <button onClick={() => scrollToSection("portfolio")} className="text-gray-700 hover:text-rose-500 transition-colors">Portofolio</button>
              <button onClick={() => scrollToSection("packages")} className="text-gray-700 hover:text-rose-500 transition-colors">Paket</button>
              <button onClick={() => scrollToSection("contact")} className="text-gray-700 hover:text-rose-500 transition-colors">Kontak</button>
            </div>
            <Button onClick={handleWhatsAppKonsultasi} className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-white to-pink-100 z-0"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h- bg-rose-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Wujudkan Pernikahan <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">Impianmu</span> Bersama Elegan Wedding
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Dari konsep hingga hari H, kami hadir untuk memastikan setiap momen sempurna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleWhatsAppKonsultasi} size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-lg px-8 py-4">
              Konsultasi Gratis
            </Button>
            <Button variant="outline" size="lg" className="text-rose-600 border-rose-200 hover:bg-rose-50 text-lg px-8 py-4">
              Lihat Portofolio
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-rose-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-rose-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Tentang Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami percaya setiap cinta punya cerita, dan tugas kami membuatnya abadi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Elegan Wedding adalah wedding organizer profesional yang berdedikasi untuk mewujudkan pernikahan impian Anda. Dengan pengalaman lebih dari 10 tahun dalam industri pernikahan, kami telah membantu ratusan pasangan menciptakan momen spesial yang tak terlupakan.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Tim kami terdiri dari para profesional kreatif yang passionatenya dalam menciptakan pernikahan yang tidak hanya indah secara visual, tetapi juga penuh makna dan emosi.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">500+</div>
                  <div className="text-gray-600">Pernikahan Sukses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">10+</div>
                  <div className="text-gray-600">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">50+</div>
                  <div className="text-gray-600">Vendor Partner</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">98%</div>
                  <div className="text-gray-600">Kepuasan Klien</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Sarah", role: "Founder & Lead Planner", image: "/placeholder-avatar.jpg" },
                { name: "Michael", role: "Creative Director", image: "/placeholder-avatar.jpg" },
                { name: "Lisa", role: "Wedding Coordinator", image: "/placeholder-avatar.jpg" },
                { name: "David", role: "Photography Director", image: "/placeholder-avatar.jpg" }
              ].map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full flex items-center justify-center">
                      <Users className="h-10 w-10 text-rose-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Layanan Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan komprehensif untuk pernikahan impian Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-200">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-8 w-8 text-rose-500" />
                  </div>
                  <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
                    Lihat Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Portofolio Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Karya-karya terbaik yang telah kami wujudkan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { location: "Bali", theme: "Garden Paradise", guests: "150", image: "/placeholder-wedding1.jpg" },
              { location: "Jakarta", theme: "Classic Elegance", guests: "200", image: "/placeholder-wedding2.jpg" },
              { location: "Bandung", theme: "Modern Minimalist", guests: "100", image: "/placeholder-wedding3.jpg" },
              { location: "Yogyakarta", theme: "Cultural Heritage", guests: "300", image: "/placeholder-wedding4.jpg" },
              { location: "Surabaya", theme: "Beach Wedding", guests: "180", image: "/placeholder-wedding5.jpg" },
              { location: "Malang", theme: "Rustic Charm", guests: "120", image: "/placeholder-wedding6.jpg" }
            ].map((portfolio, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-white opacity-80" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Lihat Gallery
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{portfolio.theme}</h3>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {portfolio.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {portfolio.guests} tamu
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Paket & Harga</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-rose-500 scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-1">
                      Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-rose-500 mt-2">{pkg.price}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                  <Button 
                    className={`w-full mt-6 ${pkg.popular ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white' : 'border-rose-200 text-rose-600 hover:bg-rose-50'}`}
                    onClick={handleWhatsAppKonsultasi}
                  >
                    {pkg.popular ? 'Pilih Paket' : 'Konsultasi Sekarang'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Testimoni Klien</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kisah sukses dari pasangan yang telah mempercayakan kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-rose-100">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-rose-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{testimonial.couple}</h3>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                    <Badge variant="outline">{testimonial.theme}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Hubungi Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mari diskusikan pernikahan impian Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-white rounded-lg">
                  <Phone className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Telepon</h3>
                  <p className="text-gray-600">+62 812-3456-7890</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg">
                  <Mail className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">info@eleganwedding.com</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg">
                  <MapPin className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Alamat</h3>
                  <p className="text-gray-600">Jl. Elegan No. 123, Jakarta</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg">
                  <Clock className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Jam Operasional</h3>
                  <p className="text-gray-600">Senin - Sabtu: 09:00 - 18:00</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <a href={links.instagram || "#"} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="text-rose-600 border-rose-200 hover:bg-rose-50">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </a>

                <a href={links.tiktok || "#"} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="text-rose-600 border-rose-200 hover:bg-rose-50">
                    <FaTiktok className="h-5 w-5 fill-current text-rose-600" />
                  </Button>
                </a>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Formulir Konsultasi</CardTitle>
                <CardDescription>
                  Isi formulir di bawah dan kami akan segera menghubungi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Nama Anda" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Tanggal Acara</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="location">Lokasi Acara</Label>
                    <Input id="location" placeholder="Kota/Provinsi" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="service">Jenis Layanan</Label>
                  <Input id="service" placeholder="Pilih layanan yang Anda butuhkan" />
                </div>
                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea id="message" placeholder="Ceritakan kebutuhan pernikahan Anda..." rows={4} />
                </div>
                <Button onClick={handleWhatsAppKonsultasi} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
                  Kirim Konsultasi
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-8 w-8" />
              <span className="text-2xl font-serif font-bold">Elegan Wedding</span>
            </div>
            <p className="text-lg mb-6 opacity-90">
              Kami Hadir untuk Merayakan Cinta Bersamamu 💍
            </p>
            
            <div className="flex flex-wrap justify-center space-x-8 mb-8">
              <button onClick={() => scrollToSection("hero")} className="hover:text-pink-200 transition-colors">Beranda</button>
              <button onClick={() => scrollToSection("about")} className="hover:text-pink-200 transition-colors">Tentang Kami</button>
              <button onClick={() => scrollToSection("services")} className="hover:text-pink-200 transition-colors">Layanan</button>
              <button onClick={() => scrollToSection("portfolio")} className="hover:text-pink-200 transition-colors">Portofolio</button>
              <button onClick={() => scrollToSection("packages")} className="hover:text-pink-200 transition-colors">Paket</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-pink-200 transition-colors">Kontak</button>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href={links.instagram || "#"} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-white hover:text-pink-200 hover:bg-white/10">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </a>

                <a href={links.tiktok || "#"} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-white hover:text-pink-200 hover:bg-white/10">
                    <FaTiktok className="text-white hover:text-pink-200 hover:bg-white/10" />
                  </Button>
                </a>
            </div>
            
            <div className="border-t border-pink-400 pt-8 text-sm opacity-75">
              © 2024 Elegan Wedding. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={handleWhatsAppCS}
          size="icon" 
          className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg h-16 w-16 flex items-center justify-center group"
        >
          <Phone className="h-6 w-6" />
          <div className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat via WhatsApp
          </div>
        </Button>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}