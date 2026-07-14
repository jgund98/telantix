import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The link-preview card (SMS, iMessage, X, LinkedIn, Slack, …).
 * Ink field, the Junction mark, and the brand line in poster type —
 * generated at build time, no runtime cost.
 */

export const alt = "Telantix — Routes that terminate. Dialer-grade SIP for U.S. call centers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [groteskData, monoData] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/SchibstedGrotesk-ExtraBold.ttf")),
    readFile(join(process.cwd(), "app/fonts/FragmentMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16140F",
          padding: "64px 72px 56px",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, background: "#F04E00" }} />
          <div
            style={{
              fontFamily: "FragmentMono",
              fontSize: 22,
              letterSpacing: 5,
              color: "#A8A294",
            }}
          >
            DIALER-GRADE SIP · BUILT FOR U.S. CALL CENTERS
          </div>
        </div>

        {/* Statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "SchibstedGrotesk",
            fontSize: 132,
            lineHeight: 0.95,
            letterSpacing: -3,
            color: "#F4F1EA",
          }}
        >
          <div>ROUTES THAT</div>
          <div style={{ display: "flex" }}>
            TERMINATE<span style={{ color: "#F04E00" }}>.</span>
          </div>
        </div>

        {/* Lockup + proof line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="66" height="81" viewBox="0 0 88 108" fill="none">
              <polygon points="8,20 36,20 43.5,27.5 29.5,41.5" fill="#F4F1EA" />
              <polygon points="66.5,50.5 88,72 60,72 52.5,64.5" fill="#F4F1EA" />
              <polygon points="0,80 80,0 80,28 0,108" fill="#F04E00" />
            </svg>
            <div
              style={{
                fontFamily: "SchibstedGrotesk",
                fontSize: 52,
                letterSpacing: -1.5,
                color: "#F4F1EA",
              }}
            >
              TELANTIX
            </div>
          </div>
          <div
            style={{
              fontFamily: "FragmentMono",
              fontSize: 20,
              letterSpacing: 3,
              color: "#A8A294",
            }}
          >
            A-LEVEL STIR/SHAKEN · 99.99% UPTIME
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SchibstedGrotesk", data: groteskData, weight: 800, style: "normal" },
        { name: "FragmentMono", data: monoData, weight: 400, style: "normal" },
      ],
    }
  );
}
