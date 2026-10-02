import { palette, siteConfig } from "@/lib/config";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Barres de forme d'onde déterministes, colorées comme dans l'app (graves, médiums, aigus).
const BARS = Array.from({ length: 72 }, (_, i) => {
  const h = 18 + Math.abs(Math.sin(i * 0.53) * 70 + Math.sin(i * 0.17) * 50);
  const band = i % 7 < 3 ? palette.low : i % 7 < 5 ? palette.mid : palette.high;
  return { h: Math.round(h), band };
});

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title") || siteConfig.tagline;
  const fontData = await fetch(
    new URL("../../assets/fonts/Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: palette.bg,
          color: palette.text,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              backgroundColor: palette.deckA,
            }}
          />
          <div style={{ fontSize: "30px", color: palette.text }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: "22px", color: palette.textMuted }}>
            · For macOS
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: "900px",
          }}
        >
          {postTitle}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            height: "140px",
          }}
        >
          {BARS.map((bar, i) => (
            <div
              key={i}
              style={{
                width: "9px",
                height: `${bar.h}px`,
                borderRadius: "3px",
                backgroundColor: bar.band,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
