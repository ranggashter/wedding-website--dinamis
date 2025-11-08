"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Circle, Users, Camera, Music, Star, Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function WeddingOrganizer() {
  const router = useRouter();

  const [links, setLinks] = useState({
    wa_konsultasi: "",
    wa_cs: "",
    instagram: "",
    tiktok: ""
  });

  const [content, setContent] = useState({
    heroTitle: "Wujudkan Pernikahan Impianmu Bersama Elegan Wedding",
    heroSubtitle: "Dari konsep hingga hari H, kami hadir untuk memastikan setiap momen sempurna.",
    aboutTitle: "Tentang Kami",
    aboutSubtitle: "Kami percaya setiap cinta punya cerita, dan tugas kami membuatnya abadi.",
    aboutDesc1: "Elegan Wedding adalah wedding organizer profesional yang berdedikasi untuk mewujudkan pernikahan impian Anda. Dengan pengalaman lebih dari 10 tahun dalam industri pernikahan, kami telah membantu ratusan pasangan menciptakan momen spesial yang tak terlupakan.",
    aboutDesc2: "Tim kami terdiri dari para profesional kreatif yang passionate dalam menciptakan pernikahan yang tidak hanya indah secara visual, tetapi juga penuh makna dan emosi.",
    statWeddings: "500+",
    statYears: "10+",
    statVendors: "50+",
    statSatisfaction: "98%",
    phoneNumber: "+62 812-3456-7890",
    email: "info@eleganwedding.com",
    address: "Jl. Elegan No. 123, Jakarta",
    workingHours: "Senin - Sabtu: 09:00 - 18:00",
    footerTagline: "Kami Hadir untuk Merayakan Cinta Bersamamu 💍"
  });

  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch site links
        const linksRes = await fetch("/api/sitelinks");
        if (linksRes.ok) {
          const linksData = await linksRes.json();
          setLinks(linksData);
        }

        // Fetch landing page content
        const contentRes = await fetch("/api/landing-content");
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          setContent(prev => ({ ...prev, ...contentData }));
        }

        // Fetch services
        const servicesRes = await fetch("/api/services");
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }

        // Fetch packages
        const packagesRes = await fetch("/api/packages");
        if (packagesRes.ok) {
          const packagesData = await packagesRes.json();
          setPackages(packagesData);
        }

        // Fetch portfolios
const fetchPortfolios = async () => {
  try {
    const res = await fetch("/api/portfolio");
    const data = await res.json();

    // opsional: filter hanya portofolio aktif
    const active = data.filter((p: any) => p.isActive !== false);
    setPortfolios(active);
  } catch (error) {
    console.error("Gagal memuat portofolio:", error);
  }
};

fetchPortfolios();


        // Fetch testimonials
        const testimonialsRes = await fetch("/api/testimonials");
        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTestimonials(testimonialsData);
        }

        // Fetch team members
        const teamRes = await fetch("/api/team");
        if (teamRes.ok) {
          const teamData = await teamRes.json();
          setTeam(teamData);
        }

      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppKonsultasi = () => {
    if (!links.wa_konsultasi) {
      return alert("Nomor WA Konsultasi belum diset di Admin!");
    }
    window.open(`https://wa.me/${links.wa_konsultasi}`, "_blank");
  };

  const handleWhatsAppCS = () => {
    if (!links.wa_cs) {
      return alert("Nomor WA CS belum diset di Admin!");
    }
    window.open(`https://wa.me/${links.wa_cs}`, "_blank");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const getIcon = (iconName) => {
    const icons = { Circle, Users, Heart, Music, Camera };
    return icons[iconName] || Circle;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-rose-500 mx-auto mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

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
              <button onClick={() => router.push("/login")} className="text-gray-700 hover:text-rose-500 transition-colors font-semibold ml-4">Login</button>
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
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleWhatsAppKonsultasi} size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-lg px-8 py-4">
              Konsultasi Gratis
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("portfolio")} className="text-rose-600 border-rose-200 hover:bg-rose-50 text-lg px-8 py-4">
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{content.aboutTitle}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.aboutSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {content.aboutDesc1}
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {content.aboutDesc2}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">{content.statWeddings}</div>
                  <div className="text-gray-600">Pernikahan Sukses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">{content.statYears}</div>
                  <div className="text-gray-600">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">{content.statVendors}</div>
                  <div className="text-gray-600">Vendor Partner</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-500 mb-2">{content.statSatisfaction}</div>
                  <div className="text-gray-600">Kepuasan Klien</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {team.map((member, index) => (
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
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              const features = typeof service.features === 'string' ? JSON.parse(service.features) : service.features;
              
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-rose-100 hover:border-rose-200">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8 text-rose-500" />
                    </div>
                    <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button onClick={handleWhatsAppKonsultasi} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white">
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Portofolio Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Karya-karya terbaik yang telah kami wujudkan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((portfolio: any, index: number) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                {portfolio.imageUrl ? (
                  <img
                    src={portfolio.imageUrl}
                    alt={portfolio.theme}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-300 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-white opacity-80" />
                  </div>
                )}
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

          {portfolios.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              Belum ada portofolio untuk ditampilkan.
            </div>
          )}
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
            {packages.map((pkg, index) => {
              const features = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features;
              
              return (
                <Card key={index} className={`relative ${pkg.isPopular ? 'ring-2 ring-rose-500 scale-105' : ''}`}>
                  {pkg.isPopular && (
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
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                    <Button 
                      className={`w-full mt-6 ${pkg.isPopular ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white' : 'border-rose-200 text-rose-600 hover:bg-rose-50'}`}
                      variant={pkg.isPopular ? "default" : "outline"}
                      onClick={handleWhatsAppKonsultasi}
                    >
                      {pkg.isPopular ? 'Pilih Paket' : 'Konsultasi Sekarang'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
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
                      <h3 className="font-semibold">{testimonial.coupleName}</h3>
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
                  <p className="text-gray-600">{content.phoneNumber}</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg">
                  <Mail className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">{content.email}</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg">
                  <MapPin className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Alamat</h3>
                  <p className="text-gray-600">{content.address}</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg">
                  <Clock className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Jam Operasional</h3>
                  <p className="text-gray-600">{content.workingHours}</p>
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
              {content.footerTagline}
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
                  <FaTiktok className="h-5 w-5" />
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