"use client";

/**
 * Live route diagram — the product, drawn.
 * A signal originates, crosses the junction, and terminates at a
 * destination. Every path is a real corridor; motion carries meaning.
 */

type Route = {
  d: string;
  cc: string;
  y: number;
  dur: number;
  delay: number;
};

// Origin cluster at left → junction at center → destinations at right.
const ORIGIN_X = 46;
const ORIGIN_Y = 232;
const JX = 322;
const JY = 232;

const DESTS: { cc: string; label: string; y: number }[] = [
  { cc: "212", label: "NEW YORK", y: 60 },
  { cc: "213", label: "LOS ANGELES", y: 130 },
  { cc: "312", label: "CHICAGO", y: 200 },
  { cc: "713", label: "HOUSTON", y: 270 },
  { cc: "404", label: "ATLANTA", y: 340 },
  { cc: "214", label: "DALLAS", y: 404 },
];

const DEST_X = 610;

function buildPath(destY: number): string {
  // origin → junction (converge), junction → destination (diverge)
  const c1x = (ORIGIN_X + JX) / 2;
  const c2x = (JX + DEST_X) / 2;
  return `M ${ORIGIN_X} ${ORIGIN_Y} C ${c1x} ${ORIGIN_Y}, ${c1x} ${JY}, ${JX} ${JY} C ${c2x} ${JY}, ${c2x} ${destY}, ${DEST_X} ${destY}`;
}

const ROUTES: Route[] = DESTS.map((dstn, i) => ({
  d: buildPath(dstn.y),
  cc: dstn.cc,
  y: dstn.y,
  dur: 3.4 + i * 0.15,
  delay: i * 0.62,
}));

export function RouteMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 740 460"
      className={className}
      role="img"
      aria-label="A call originating, crossing the Telantix junction, and terminating across U.S. metros."
      fill="none"
    >
      {/* Base corridors — faint, always present */}
      {ROUTES.map((r, i) => (
        <path
          key={`base-${i}`}
          d={r.d}
          stroke="var(--color-hair)"
          strokeWidth={1}
        />
      ))}

      {/* Running signal packets */}
      {ROUTES.map((r, i) => (
        <path
          key={`sig-${i}`}
          d={r.d}
          stroke="var(--color-signal)"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={100}
          style={{
            strokeDasharray: "7 100",
            animation: `signal-run ${r.dur}s cubic-bezier(0.4,0,0.2,1) ${r.delay}s infinite`,
          }}
        />
      ))}

      {/* Destination nodes */}
      {ROUTES.map((r, i) => (
        <g key={`dst-${i}`}>
          <circle
            cx={DEST_X}
            cy={r.y}
            r={3}
            stroke="var(--color-signal)"
            strokeWidth={1.5}
            fill="none"
            style={{
              animation: `ring-arrive ${r.dur}s cubic-bezier(0.4,0,0.2,1) ${r.delay}s infinite`,
            }}
          />
          <circle
            cx={DEST_X}
            cy={r.y}
            r={3}
            fill="var(--color-mute-2)"
            style={{
              animation: `node-arrive ${r.dur}s cubic-bezier(0.4,0,0.2,1) ${r.delay}s infinite`,
            }}
          />
          <text
            x={DEST_X + 14}
            y={r.y - 8}
            className="font-mono"
            fontSize={13}
            fill="var(--color-ink)"
            fontWeight={400}
          >
            {r.cc}
          </text>
          <text
            x={DEST_X + 14}
            y={r.y + 8}
            className="font-mono"
            fontSize={9}
            letterSpacing="0.1em"
            fill="var(--color-mute)"
          >
            {DESTS[i].label}
          </text>
        </g>
      ))}

      {/* The Junction — geometry from the mark, standing at the crossing */}
      <g transform={`translate(${JX - 20} ${JY - 26})`}>
        <polygon points="4,10 18,10 21.75,13.75 14.75,20.75" fill="var(--color-ink)" />
        <polygon
          points="33.25,25.25 44,36 30,36 26.25,32.25"
          fill="var(--color-ink)"
        />
        <polygon points="0,40 40,0 40,14 0,54" fill="var(--color-signal)" />
      </g>

      {/* Origin marker */}
      <circle cx={ORIGIN_X} cy={ORIGIN_Y} r={5} fill="var(--color-ink)" />
      <circle
        cx={ORIGIN_X}
        cy={ORIGIN_Y}
        r={5}
        stroke="var(--color-ink)"
        strokeWidth={1}
        fill="none"
        opacity={0.35}
      >
        <animate
          attributeName="r"
          values="5;13;5"
          dur="2.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.35;0;0.35"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x={ORIGIN_X - 6}
        y={ORIGIN_Y + 26}
        className="font-mono"
        fontSize={10}
        letterSpacing="0.12em"
        fill="var(--color-mute)"
      >
        CALL IN
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------------
   Mobile — a portrait route map. Calls flow top → junction → out,
   sized to be legible on a phone (not a shrunk desktop diagram).
   --------------------------------------------------------------- */

const M_ORIGIN = { x: 180, y: 52 };
const M_JX = 180;
const M_JY = 214;
const M_DEST_Y = 402;
const M_DESTS = [
  { cc: "212", label: "NYC", x: 40 },
  { cc: "213", label: "LA", x: 110 },
  { cc: "312", label: "CHI", x: 180 },
  { cc: "305", label: "MIA", x: 250 },
  { cc: "404", label: "ATL", x: 320 },
];

function buildPathMobile(dx: number): string {
  return `M ${M_ORIGIN.x} ${M_ORIGIN.y} C ${M_JX} 130, ${M_JX} 130, ${M_JX} ${M_JY} C ${M_JX} 300, ${dx} 300, ${dx} ${M_DEST_Y}`;
}

export function RouteMapMobile({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 470"
      className={className}
      role="img"
      aria-label="A call entering, crossing the Telantix junction, and connecting across destinations."
      fill="none"
    >
      {/* base routes */}
      {M_DESTS.map((d, i) => (
        <path
          key={`mbase-${i}`}
          d={buildPathMobile(d.x)}
          stroke="var(--color-hair)"
          strokeWidth={1.25}
        />
      ))}

      {/* running signals */}
      {M_DESTS.map((d, i) => (
        <path
          key={`msig-${i}`}
          d={buildPathMobile(d.x)}
          stroke="var(--color-signal)"
          strokeWidth={3}
          strokeLinecap="round"
          pathLength={100}
          style={{
            strokeDasharray: "8 100",
            animation: `signal-run ${3.2 + i * 0.16}s cubic-bezier(0.4,0,0.2,1) ${i * 0.5}s infinite`,
          }}
        />
      ))}

      {/* destination nodes + labels */}
      {M_DESTS.map((d, i) => (
        <g key={`mdst-${i}`}>
          <circle
            cx={d.x}
            cy={M_DEST_Y}
            r={4}
            stroke="var(--color-signal)"
            strokeWidth={1.5}
            fill="none"
            style={{ animation: `ring-arrive ${3.2 + i * 0.16}s cubic-bezier(0.4,0,0.2,1) ${i * 0.5}s infinite` }}
          />
          <circle
            cx={d.x}
            cy={M_DEST_Y}
            r={4}
            fill="var(--color-mute-2)"
            style={{ animation: `node-arrive ${3.2 + i * 0.16}s cubic-bezier(0.4,0,0.2,1) ${i * 0.5}s infinite` }}
          />
          <text x={d.x} y={M_DEST_Y + 26} textAnchor="middle" className="font-mono" fontSize={15} fill="var(--color-ink)">
            {d.cc}
          </text>
          <text x={d.x} y={M_DEST_Y + 42} textAnchor="middle" className="font-mono" fontSize={10} letterSpacing="0.08em" fill="var(--color-mute)">
            {d.label}
          </text>
        </g>
      ))}

      {/* the junction */}
      <g transform={`translate(${M_JX - 26} ${M_JY - 33})`}>
        <polygon points="5,13 24,13 29,18 20,27" fill="var(--color-ink)" />
        <polygon points="44,34 58,48 40,48 35,43" fill="var(--color-ink)" />
        <polygon points="0,53 53,0 53,18 0,71" fill="var(--color-signal)" />
      </g>

      {/* origin */}
      <circle cx={M_ORIGIN.x} cy={M_ORIGIN.y} r={6} fill="var(--color-ink)" />
      <circle cx={M_ORIGIN.x} cy={M_ORIGIN.y} r={6} stroke="var(--color-ink)" strokeWidth={1} fill="none" opacity={0.35}>
        <animate attributeName="r" values="6;15;6" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0;0.35" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <text x={M_ORIGIN.x + 16} y={M_ORIGIN.y + 4} className="font-mono" fontSize={11} letterSpacing="0.12em" fill="var(--color-mute)">
        CALL IN
      </text>
    </svg>
  );
}
