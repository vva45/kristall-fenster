"use client";

/**
 * Vista previa SVG del elemento configurado. Porta la geometría del
 * prototipo (era un innerHTML de 200 líneas) a JSX puro: marco con el
 * color exterior, perfiles de hoja con el interior, líneas de
 * apertura en la convención de plano, sprossen, persiana y mosquitera.
 */
import { leafCountFor } from "./state";
import { leafWidthsMm } from "../../data/configurator/rules";
import type { ColorFinish, WindowConfig } from "../../data/configurator/types";

const clampChannel = (v: number) => Math.max(0, Math.min(255, v));

/** Aclara (+) u oscurece (−) un hex en porcentaje. */
const shade = (hex: string, percent: number): string => {
  const n = parseInt(hex.replace("#", ""), 16);
  const amount = Math.round(2.55 * percent);
  const r = clampChannel((n >> 16) + amount);
  const g = clampChannel(((n >> 8) & 0xff) + amount);
  const b = clampChannel((n & 0xff) + amount);
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
};

interface Panel {
  x: number;
  y: number;
  w: number;
  h: number;
  opening: WindowConfig["leafOpenings"][number];
}

const isFixed = (o: Panel["opening"]) => o === "fixed" || o === "fixedSash";

export function WindowPreview({
  config,
  exterior,
  interior,
  side,
}: {
  config: WindowConfig;
  exterior: ColorFinish;
  interior: ColorFinish;
  side: "exterior" | "interior";
}) {
  const shutterOn = config.shutter !== "none";

  // Encaja la ventana en el lienzo manteniendo la proporción real.
  const maxW = 620;
  const maxH = 480;
  const ratio = config.widthMm / config.heightMm;
  let w = maxW;
  let h = w / ratio;
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  const canvasW = Math.max(680, w + 96);
  const canvasH = Math.max(580, h + (shutterOn ? 150 : 114));
  const x = (canvasW - w) / 2;
  const y = shutterOn ? 78 : 42;
  const frame = Math.max(18, Math.min(34, w * 0.055));

  const visibleFinish = side === "exterior" ? exterior : interior;
  const frameShade = shade(visibleFinish.hex, -18);
  const rail = visibleFinish.hex;
  const gasket = config.gasket === "black" ? "#1f2221" : "#c7cac4";

  // Rectángulos de hoja (el hueco de cristal de cada una).
  const px = x + frame * 1.2;
  const py = y + frame * 1.2;
  const pw = w - frame * 2.4;
  const ph = h - frame * 2.4;
  const gap = frame * 0.5;
  let panels: Panel[];
  if (config.sash === "topLight") {
    const topH = ph * 0.28;
    panels = [
      { x: px, y: py, w: pw, h: topH - gap * 0.5, opening: config.leafOpenings[0] },
      { x: px, y: py + topH + gap, w: pw, h: ph - topH - gap, opening: config.leafOpenings[1] },
    ];
  } else if (config.sash === "bottomLight") {
    const bottomH = ph * 0.28;
    panels = [
      { x: px, y: py, w: pw, h: ph - bottomH - gap, opening: config.leafOpenings[0] },
      { x: px, y: py + ph - bottomH + gap * 0.5, w: pw, h: bottomH - gap * 0.5, opening: config.leafOpenings[1] },
    ];
  } else {
    const count = leafCountFor(config.sash);
    const panelW = (pw - gap * (count - 1)) / count;
    panels = Array.from({ length: count }, (_, i) => ({
      x: px + i * (panelW + gap),
      y: py,
      w: panelW,
      h: ph,
      opening: config.leafOpenings[i],
    }));
  }

  return (
    <svg
      viewBox={`0 0 ${canvasW} ${canvasH}`}
      role="img"
      aria-label={`${config.widthMm} × ${config.heightMm} mm`}
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="cfg-glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#eef7fc" />
          <stop offset="54%" stopColor="#c3d9e6" />
          <stop offset="100%" stopColor="#f5fafd" />
        </linearGradient>
        <linearGradient id="cfg-frame" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={visibleFinish.hex} />
          <stop offset="100%" stopColor={frameShade} />
        </linearGradient>
        <pattern id="cfg-mesh" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3b5158" strokeWidth="0.9" opacity="0.24" />
        </pattern>
      </defs>

      {/* Cajón de persiana con sus lamas. */}
      {shutterOn && (
        <g>
          <rect x={x - 18} y={y - 56} width={w + 36} height={56} rx={4} fill={shade(visibleFinish.hex, 12)} />
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={i}
              x1={x - 14}
              y1={y - 46 + i * 7}
              x2={x + w + 14}
              y2={y - 46 + i * 7}
              stroke={shade(visibleFinish.hex, -34)}
              strokeWidth={2}
              opacity={0.35}
            />
          ))}
        </g>
      )}

      {/* Marco exterior y cristal. */}
      <rect x={x} y={y} width={w} height={h} rx={4} fill="url(#cfg-frame)" />
      <rect
        x={x + frame}
        y={y + frame}
        width={w - frame * 2}
        height={h - frame * 2}
        rx={3}
        fill="url(#cfg-glass)"
      />
      {/* Perfil de hoja visto desde dentro: color interior. */}
      <rect
        x={x + frame * 0.62}
        y={y + frame * 0.62}
        width={w - frame * 1.24}
        height={h - frame * 1.24}
        fill="none"
        stroke={rail}
        strokeWidth={Math.max(8, frame * 0.34)}
        opacity={0.95}
      />

      {/* Postes / travesaños entre hojas. */}
      {config.sash === "topLight" && (
        <rect x={x} y={y + h * 0.32} width={w} height={frame * 0.72} fill={rail} />
      )}
      {config.sash === "bottomLight" && (
        <rect x={x} y={y + h * 0.7} width={w} height={frame * 0.72} fill={rail} />
      )}
      {(config.sash === "two" || config.sash === "three") &&
        Array.from({ length: leafCountFor(config.sash) - 1 }, (_, i) => {
          const railX = x + (w / leafCountFor(config.sash)) * (i + 1);
          return (
            <rect
              key={i}
              x={railX - frame * 0.34}
              y={y + frame * 0.6}
              width={frame * 0.68}
              height={h - frame * 1.2}
              fill={rail}
            />
          );
        })}

      {/* Sprossen. */}
      {config.muntin !== "none" &&
        panels.map((p, pi) => (
          <g key={`m-${pi}`}>
            {Array.from({ length: config.muntinVertical }, (_, i) => {
              const mx = p.x + (p.w / (config.muntinVertical + 1)) * (i + 1);
              return (
                <line key={`v${i}`} x1={mx} y1={p.y} x2={mx} y2={p.y + p.h} stroke={gasket} strokeWidth={4} opacity={0.7} />
              );
            })}
            {Array.from({ length: config.muntinHorizontal }, (_, i) => {
              const my = p.y + (p.h / (config.muntinHorizontal + 1)) * (i + 1);
              return (
                <line key={`h${i}`} x1={p.x} y1={my} x2={p.x + p.w} y2={my} stroke={gasket} strokeWidth={4} opacity={0.7} />
              );
            })}
          </g>
        ))}

      {/* Líneas de apertura, como en un plano. */}
      {panels.map((p, pi) => {
        if (isFixed(p.opening)) return null;
        if (p.opening === "slideLeft" || p.opening === "slideRight") {
          const direction = p.opening === "slideLeft" ? -1 : 1;
          const cy = p.y + p.h / 2;
          return <g key={`o-${pi}`} stroke="#e55353" strokeWidth={3} fill="none"><line x1={p.x + p.w * 0.25} y1={cy} x2={p.x + p.w * 0.75} y2={cy} /><path d={`M ${p.x + p.w * (direction < 0 ? .25 : .75)} ${cy} l ${-direction * 12} -9 m ${direction * 12} 9 l ${-direction * 12} 9`} /></g>;
        }
        const leftHinge = p.opening === "turnLeft" || p.opening === "tiltTurnLeft";
        const hingeX = leftHinge ? p.x + 12 : p.x + p.w - 12;
        const handleX = leftHinge ? p.x + p.w - 12 : p.x + 12;
        const yTop = p.y + 12;
        const yMid = p.y + p.h / 2;
        const yBottom = p.y + p.h - 12;
        const showTilt =
          p.opening === "tilt" || p.opening === "tiltTurnLeft" || p.opening === "tiltTurnRight";
        return (
          <g key={`o-${pi}`}>
            {p.opening !== "tilt" && (
              <path
                d={`M ${hingeX} ${yTop} L ${handleX} ${yMid} L ${hingeX} ${yBottom}`}
                fill="none"
                stroke="#e55353"
                strokeWidth={3}
                opacity={0.92}
              />
            )}
            {showTilt && (
              <path
                d={`M ${p.x + 12} ${yBottom} L ${p.x + p.w / 2} ${yTop} L ${p.x + p.w - 12} ${yBottom}`}
                fill="none"
                stroke="#e55353"
                strokeWidth={3}
                opacity={0.82}
              />
            )}
          </g>
        );
      })}

      {/* Cotas por hoja y cota vertical total. */}
      {panels.map((p, index) => (
        <g key={`dim-${index}`} fill="#2f4c74" fontFamily="var(--font-plex-mono), monospace" fontSize={12}>
          <line x1={p.x} y1={y + h + 18} x2={p.x + p.w} y2={y + h + 18} stroke="#7790ad" />
          <line x1={p.x} y1={y + h + 13} x2={p.x} y2={y + h + 23} stroke="#7790ad" />
          <line x1={p.x + p.w} y1={y + h + 13} x2={p.x + p.w} y2={y + h + 23} stroke="#7790ad" />
          <text x={p.x + p.w / 2} y={y + h + 36} textAnchor="middle">{leafWidthsMm(config.widthMm, config.sash)[index]} mm</text>
        </g>
      ))}
      <g fill="#2f4c74" stroke="#7790ad" fontFamily="var(--font-plex-mono), monospace" fontSize={13}>
        <line x1={x - 28} y1={y} x2={x - 28} y2={y + h} />
        <line x1={x - 34} y1={y} x2={x - 22} y2={y} /><line x1={x - 34} y1={y + h} x2={x - 22} y2={y + h} />
        <text x={x - 40} y={y + h / 2} textAnchor="middle" fill="#2f4c74" stroke="none" transform={`rotate(-90 ${x - 40} ${y + h / 2})`}>{config.heightMm} mm</text>
      </g>

      {/* Mosquitera. */}
      {config.mosquito && (
        <rect
          x={x + frame}
          y={y + frame}
          width={w - frame * 2}
          height={h - frame * 2}
          fill="url(#cfg-mesh)"
          opacity={0.75}
        />
      )}

      {/* Manillas en las hojas practicables. */}
      {panels.map((p, pi) => {
        if (isFixed(p.opening) || p.opening === "tilt") return null;
        const leftHinge = p.opening === "turnLeft" || p.opening === "tiltTurnLeft";
        const hx = leftHinge ? p.x + p.w - 8 : p.x + 8;
        const hy = p.y + p.h * 0.52;
        return (
          <g key={`hd-${pi}`} fill="#3c434b" opacity={0.9}>
            <rect x={hx - 4} y={hy - 22} width={8} height={44} rx={4} />
            <rect x={leftHinge ? hx - 28 : hx + 2} y={hy - 4} width={28} height={8} rx={4} />
          </g>
        );
      })}

      {/* Cota. */}
      <text
        x={canvasW / 2}
        y={canvasH - 22}
        textAnchor="middle"
        fill="#2f4c74"
        fontSize={17}
        fontWeight={600}
        fontFamily="var(--font-plex-mono), monospace"
      >
        {config.widthMm} × {config.heightMm} mm
      </text>
    </svg>
  );
}
