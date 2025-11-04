"use client";

import { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [pixelId, setPixelId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPixelId() {
      try {
        const res = await fetch("/api/sitelinks");
        const data = await res.json();

        if (data.pixel) {
          setPixelId(data.pixel);
        } else {
          console.warn("⚠️ Pixel ID belum diset oleh admin");
        }
      } catch (err) {
        console.error("❌ Gagal mengambil Pixel ID:", err);
      }
    }

    fetchPixelId();
  }, []);

  useEffect(() => {
    if (!pixelId) return;

    console.log("✅ Injecting Facebook Pixel for ID:", pixelId);

    const script = document.createElement("script");
    script.innerHTML = `
      console.log("[Pixel] Script started for ID: ${pixelId}");
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
      console.log("[Pixel] fbq init and PageView triggered");
    `;
    document.head.appendChild(script);

    return () => {
      console.log("🧹 Removing Pixel script for ID:", pixelId);
      script.remove();
    };
  }, [pixelId]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}