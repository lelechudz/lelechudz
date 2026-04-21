import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Lei Maboloc — Mobile Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(255,179,71,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(198,106,253,0.25) 0%, transparent 50%), #0c0a14",
          fontFamily: "sans-serif",
          color: "#ffd9a0",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7 }}>
          Mobile Developer
        </div>
        <div style={{ fontSize: 96, fontWeight: 600, marginTop: 16, letterSpacing: "-0.02em" }}>
          LEI MABOLOC
        </div>
        <div style={{ fontSize: 28, marginTop: 16, color: "#ffb347" }}>
          Flutter · Dart · 3D &amp; Shaders
        </div>
        <div style={{ fontSize: 18, marginTop: 40, opacity: 0.6, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          4 shipped apps · Davao, PH
        </div>
      </div>
    ),
    { ...size },
  );
}
