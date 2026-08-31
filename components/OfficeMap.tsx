"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// 10 Horridus Place, Montana Park, Pretoria 0182
const LNG = 28.2195;
const LAT = -25.6548;

export default function OfficeMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [LNG, LAT],
      zoom: 15,
      scrollZoom: false,
    });

    // Orange marker
    const el = document.createElement("div");
    el.style.cssText = `
      width: 20px;
      height: 20px;
      background: #f97316;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;

    new mapboxgl.Marker({ element: el })
      .setLngLat([LNG, LAT])
      .setPopup(
        new mapboxgl.Popup({ offset: 14 }).setHTML(
          `<p style="margin:0;font-size:13px;font-weight:600;color:#111">Built4U Office</p>
           <p style="margin:4px 0 0;font-size:12px;color:#555">10 Horridus Place<br>Montana Park, 0182</p>`
        )
      )
      .addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ filter: "grayscale(100%)" }}
    />
  );
}
