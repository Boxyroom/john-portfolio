"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { useContactModal } from "@/components/ContactModal";
import { SectionLink } from "@/components/SectionLink";
const motionCards = [
  {
    label: "React",
    code: "const Hero = () => {}",
    position: "top-left",
  },
  {
    label: "TypeScript",
    code: "type Project = { title: string; }",
    position: "top-right",
  },
  {
    label: "CSS",
    code: ".hero { display: grid; }",
    position: "bottom-left",
  },
  {
    label: "API",
    code: "GET /api/projects",
    position: "bottom-right",
  },
] as const;

const tabs = [
  "Effects",
  "Motion",
  "Physics",
  "Interaction",
  "SVG",
  "Scroll",
] as const;
type HeroTab = (typeof tabs)[number];

const mobileVisibleTabs = new Set<HeroTab>([
  "Effects",
  "Physics",
  "SVG",
  "Scroll",
]);

const labPanels = [
  {
    id: "pointer-response",
    label: "Pointer response",
    variant: "pointer-response",
  },
  {
    id: "motion",
    label: "Motion choreography",
    variant: "default",
  },
  {
    id: "click-move",
    label: "Click and move",
    variant: "click-move",
  },
] as const;

const comingSoon = {
  SVG: "Interactive vector systems, icons, and animated diagrams.",
  Physics: "Natural-feeling UI motion driven by simple physics principles.",
} satisfies Partial<Record<HeroTab, string>>;

const effectParticles = [
  ["4%", "13%", 1.6, "rgba(244, 234, 216, 0.36)", "28s", "-2s", "28px", "-42px", 0.34],
  ["6%", "37%", 2.7, "rgba(226, 149, 75, 0.42)", "24s", "-9s", "-34px", "24px", 0.44],
  ["8%", "62%", 1.9, "rgba(244, 234, 216, 0.34)", "31s", "-18s", "42px", "-20px", 0.32],
  ["10%", "84%", 3.1, "rgba(200, 116, 52, 0.38)", "27s", "-5s", "-38px", "-32px", 0.42],
  ["13%", "22%", 2.1, "rgba(226, 149, 75, 0.48)", "33s", "-15s", "36px", "28px", 0.5],
  ["15%", "49%", 1.7, "rgba(244, 234, 216, 0.33)", "23s", "-7s", "-30px", "46px", 0.31],
  ["17%", "71%", 3.4, "rgba(226, 149, 75, 0.39)", "29s", "-21s", "26px", "-48px", 0.43],
  ["19%", "91%", 1.5, "rgba(244, 234, 216, 0.37)", "38s", "-12s", "44px", "-24px", 0.3],
  ["22%", "11%", 2.6, "rgba(200, 116, 52, 0.42)", "26s", "-24s", "-46px", "36px", 0.46],
  ["24%", "35%", 1.8, "rgba(244, 234, 216, 0.36)", "32s", "-8s", "28px", "-54px", 0.34],
  ["26%", "58%", 2.9, "rgba(226, 149, 75, 0.43)", "25s", "-14s", "-48px", "26px", 0.48],
  ["28%", "79%", 1.6, "rgba(244, 234, 216, 0.32)", "35s", "-28s", "34px", "38px", 0.29],
  ["31%", "18%", 3.5, "rgba(200, 116, 52, 0.36)", "30s", "-11s", "-32px", "-44px", 0.4],
  ["33%", "43%", 2, "rgba(244, 234, 216, 0.39)", "39s", "-19s", "48px", "24px", 0.36],
  ["35%", "67%", 3.1, "rgba(226, 149, 75, 0.38)", "24s", "-4s", "-42px", "42px", 0.44],
  ["37%", "87%", 1.7, "rgba(244, 234, 216, 0.35)", "34s", "-27s", "30px", "-50px", 0.31],
  ["40%", "15%", 1.5, "rgba(244, 234, 216, 0.34)", "36s", "-23s", "50px", "-28px", 0.3],
  ["42%", "31%", 2.4, "rgba(226, 149, 75, 0.5)", "27s", "-13s", "-36px", "48px", 0.52],
  ["44%", "51%", 3.4, "rgba(244, 234, 216, 0.37)", "33s", "-20s", "32px", "-40px", 0.38],
  ["46%", "74%", 1.8, "rgba(200, 116, 52, 0.42)", "28s", "-6s", "-50px", "-26px", 0.43],
  ["49%", "9%", 2.2, "rgba(244, 234, 216, 0.4)", "31s", "-25s", "38px", "30px", 0.36],
  ["50%", "27%", 1.6, "rgba(226, 149, 75, 0.47)", "22s", "-10s", "-24px", "-52px", 0.49],
  ["51%", "59%", 2.7, "rgba(244, 234, 216, 0.36)", "37s", "-31s", "46px", "28px", 0.35],
  ["52%", "89%", 1.9, "rgba(200, 116, 52, 0.39)", "30s", "-16s", "-44px", "-34px", 0.41],
  ["55%", "20%", 3.2, "rgba(244, 234, 216, 0.38)", "26s", "-18s", "30px", "50px", 0.39],
  ["57%", "41%", 1.7, "rgba(226, 149, 75, 0.45)", "40s", "-30s", "-52px", "-22px", 0.46],
  ["59%", "64%", 3.6, "rgba(200, 116, 52, 0.4)", "25s", "-9s", "40px", "36px", 0.45],
  ["61%", "83%", 2, "rgba(244, 234, 216, 0.35)", "32s", "-21s", "-34px", "-48px", 0.34],
  ["64%", "12%", 1.8, "rgba(244, 234, 216, 0.41)", "29s", "-4s", "-42px", "32px", 0.37],
  ["66%", "34%", 2.8, "rgba(226, 149, 75, 0.42)", "36s", "-29s", "46px", "-36px", 0.45],
  ["68%", "55%", 1.5, "rgba(244, 234, 216, 0.32)", "41s", "-35s", "-28px", "54px", 0.28],
  ["70%", "77%", 3.3, "rgba(226, 149, 75, 0.38)", "27s", "-8s", "34px", "-50px", 0.42],
  ["73%", "18%", 2, "rgba(244, 234, 216, 0.36)", "35s", "-17s", "-50px", "-24px", 0.34],
  ["75%", "39%", 3, "rgba(200, 116, 52, 0.43)", "30s", "-22s", "28px", "46px", 0.46],
  ["77%", "61%", 1.9, "rgba(244, 234, 216, 0.34)", "38s", "-12s", "-38px", "-40px", 0.32],
  ["79%", "86%", 2.7, "rgba(226, 149, 75, 0.44)", "28s", "-27s", "52px", "22px", 0.47],
  ["82%", "10%", 1.6, "rgba(244, 234, 216, 0.39)", "33s", "-5s", "-26px", "48px", 0.35],
  ["84%", "28%", 2.5, "rgba(226, 149, 75, 0.37)", "42s", "-33s", "38px", "-30px", 0.39],
  ["86%", "50%", 1.8, "rgba(244, 234, 216, 0.35)", "34s", "-18s", "-54px", "28px", 0.33],
  ["88%", "70%", 3.4, "rgba(200, 116, 52, 0.39)", "26s", "-7s", "32px", "-54px", 0.43],
  ["91%", "21%", 1.9, "rgba(244, 234, 216, 0.4)", "37s", "-28s", "-44px", "38px", 0.36],
  ["93%", "43%", 3, "rgba(226, 149, 75, 0.43)", "29s", "-13s", "34px", "42px", 0.47],
  ["95%", "64%", 1.6, "rgba(244, 234, 216, 0.31)", "40s", "-24s", "-30px", "-46px", 0.29],
  ["97%", "83%", 2.3, "rgba(200, 116, 52, 0.36)", "31s", "-3s", "42px", "-26px", 0.38],
  ["5%", "93%", 1.8, "rgba(226, 149, 75, 0.34)", "43s", "-38s", "-36px", "30px", 0.32],
  ["12%", "6%", 2.2, "rgba(244, 234, 216, 0.35)", "45s", "-33s", "40px", "26px", 0.31],
  ["21%", "52%", 1.5, "rgba(244, 234, 216, 0.33)", "44s", "-30s", "24px", "-46px", 0.29],
  ["29%", "96%", 2.4, "rgba(226, 149, 75, 0.36)", "34s", "-20s", "-48px", "-28px", 0.38],
  ["38%", "6%", 1.7, "rgba(244, 234, 216, 0.36)", "39s", "-14s", "46px", "34px", 0.33],
  ["45%", "94%", 2.1, "rgba(226, 149, 75, 0.35)", "28s", "-24s", "-40px", "-44px", 0.37],
  ["54%", "5%", 1.4, "rgba(244, 234, 216, 0.34)", "42s", "-17s", "28px", "52px", 0.28],
  ["63%", "95%", 2, "rgba(244, 234, 216, 0.32)", "36s", "-10s", "-32px", "-50px", 0.3],
  ["72%", "96%", 1.6, "rgba(226, 149, 75, 0.33)", "47s", "-39s", "48px", "-22px", 0.31],
  ["81%", "94%", 2.4, "rgba(244, 234, 216, 0.34)", "35s", "-26s", "-42px", "-34px", 0.33],
  ["90%", "5%", 1.5, "rgba(226, 149, 75, 0.35)", "44s", "-36s", "36px", "42px", 0.33],
  ["16%", "15%", 1.3, "rgba(244, 234, 216, 0.3)", "49s", "-42s", "-20px", "-56px", 0.25],
  ["23%", "25%", 2.8, "rgba(226, 149, 75, 0.4)", "32s", "-6s", "56px", "18px", 0.43],
  ["34%", "29%", 1.4, "rgba(244, 234, 216, 0.32)", "46s", "-37s", "-56px", "20px", 0.27],
  ["43%", "68%", 2.6, "rgba(226, 149, 75, 0.41)", "27s", "-11s", "22px", "-58px", 0.44],
  ["56%", "72%", 1.5, "rgba(244, 234, 216, 0.34)", "43s", "-34s", "-58px", "24px", 0.3],
  ["65%", "47%", 3.2, "rgba(200, 116, 52, 0.41)", "31s", "-15s", "54px", "-18px", 0.45],
  ["74%", "53%", 1.4, "rgba(244, 234, 216, 0.32)", "48s", "-40s", "-22px", "58px", 0.27],
  ["83%", "37%", 2.9, "rgba(226, 149, 75, 0.39)", "25s", "-19s", "58px", "20px", 0.42],
  ["92%", "56%", 1.3, "rgba(244, 234, 216, 0.31)", "46s", "-35s", "-52px", "-18px", 0.26],
  ["3%", "48%", 2.2, "rgba(226, 149, 75, 0.37)", "37s", "-23s", "44px", "34px", 0.38],
  ["18%", "96%", 1.4, "rgba(244, 234, 216, 0.31)", "50s", "-44s", "-24px", "-52px", 0.26],
  ["49%", "43%", 2.5, "rgba(244, 234, 216, 0.42)", "29s", "-16s", "40px", "-34px", 0.41],
  ["51%", "37%", 1.8, "rgba(226, 149, 75, 0.48)", "24s", "-3s", "-34px", "38px", 0.5],
  ["53%", "52%", 3.7, "rgba(200, 116, 52, 0.44)", "26s", "-12s", "30px", "44px", 0.5],
  ["47%", "54%", 1.6, "rgba(244, 234, 216, 0.43)", "35s", "-29s", "-44px", "-30px", 0.39],
  ["58%", "48%", 2.1, "rgba(226, 149, 75, 0.46)", "30s", "-25s", "52px", "12px", 0.48],
  ["42%", "48%", 1.4, "rgba(244, 234, 216, 0.38)", "41s", "-32s", "-18px", "-54px", 0.34],
] as const;

const effectConnections = [
  ["17%", "71%", "18deg", "13%", "15.5s", "-3s"],
  ["42%", "31%", "-24deg", "10%", "18s", "-10s"],
  ["73%", "18%", "31deg", "12%", "21s", "-15s"],
] as const;

const effectStreaks = [
  ["far", "small", "left-right", "8%", "18%", "108px", "7.8s", "-0.5s", "1px", "0.1px", 0.18, 0.39, 0.66, 0.98, 0.76],
  ["near", "standard", "diagonal-down", "76%", "16%", "188px", "6.2s", "-1.5s", "1.85px", "0.48px", 0.34, 0.68, 0.74, 1.24, 0.9],
  ["near", "large", "steep-up", "84%", "72%", "280px", "6.4s", "-3s", "3px", "0.9px", 0.42, 0.8, 0.82, 1.42, 1.02],
  ["far", "small", "right-left", "24%", "4%", "98px", "8.2s", "-4.2s", "0.95px", "0.08px", 0.16, 0.36, 0.62, 0.92, 0.72],
  ["mid", "bright", "shallow-up", "12%", "82%", "220px", "6.4s", "-5s", "1.9px", "0.42px", 0.38, 0.74, 0.76, 1.3, 0.96],
  ["far", "small", "bottom-top", "68%", "92%", "118px", "8.6s", "-6.1s", "1px", "0.12px", 0.17, 0.38, 0.64, 0.96, 0.74],
  ["near", "standard", "shallow-down", "18%", "44%", "170px", "6.8s", "-2.4s", "1.8px", "0.46px", 0.32, 0.64, 0.72, 1.2, 0.9],
  ["near", "standard", "diagonal-up", "62%", "28%", "235px", "6.6s", "-7.1s", "2.25px", "0.66px", 0.36, 0.72, 0.78, 1.28, 0.96],
  ["far", "small", "top-bottom", "92%", "36%", "104px", "7.9s", "-3.7s", "0.95px", "0.09px", 0.16, 0.36, 0.62, 0.94, 0.72],
  ["mid", "small", "steep-down", "44%", "88%", "148px", "7.8s", "-6.8s", "1.2px", "0.18px", 0.23, 0.48, 0.68, 1.06, 0.82],
] as const;

type PhysicsNode = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  pinned?: boolean;
};

type PhysicsLink = {
  a: number;
  b: number;
  rest: number;
  stiffness: number;
};

const physicsInitialNodes = [
  { id: 0, x: 150, y: 74, pinned: true },
  { id: 1, x: 300, y: 64, pinned: true },
  { id: 2, x: 460, y: 74, pinned: true },
  { id: 3, x: 610, y: 64, pinned: true },
  { id: 4, x: 190, y: 150 },
  { id: 5, x: 340, y: 150 },
  { id: 6, x: 500, y: 150 },
  { id: 7, x: 570, y: 218 },
  { id: 8, x: 420, y: 244 },
  { id: 9, x: 265, y: 232 },
  { id: 10, x: 350, y: 296 },
  { id: 11, x: 500, y: 300 },
] as const;

const physicsRawLinks = [
  [0, 1, 0.5],
  [1, 2, 0.5],
  [2, 3, 0.5],
  [0, 4, 0.62],
  [1, 4, 0.54],
  [1, 5, 0.62],
  [2, 5, 0.54],
  [2, 6, 0.62],
  [3, 6, 0.54],
  [4, 5, 0.44],
  [5, 6, 0.44],
  [6, 7, 0.46],
  [7, 8, 0.42],
  [8, 9, 0.42],
  [9, 4, 0.46],
  [5, 8, 0.48],
  [9, 10, 0.38],
  [8, 10, 0.36],
  [8, 11, 0.36],
  [7, 11, 0.38],
  [10, 11, 0.34],
  [4, 8, 0.24],
  [5, 9, 0.24],
  [6, 8, 0.24],
] as const;

function createPhysicsNodes() {
  return physicsInitialNodes.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    vx: "pinned" in node && node.pinned ? 0 : (node.id % 2 === 0 ? 18 : -18),
    vy: "pinned" in node && node.pinned ? 0 : node.id % 3 === 0 ? 10 : -6,
    ox: node.x,
    oy: node.y,
    pinned: "pinned" in node ? node.pinned : false,
  }));
}

function createPhysicsLinks(): PhysicsLink[] {
  return physicsRawLinks.map(([a, b, stiffness]) => {
    const nodeA = physicsInitialNodes[a];
    const nodeB = physicsInitialNodes[b];
    const dx = nodeB.x - nodeA.x;
    const dy = nodeB.y - nodeA.y;

    return {
      a,
      b,
      stiffness,
      rest: Math.sqrt(dx * dx + dy * dy),
    };
  });
}

function PointerResponseCard() {
  const [localPointer, setLocalPointer] = useState({
    x: 0,
    y: 0,
    active: false,
    width: 0,
  });
  const lines = ["POINTER", "RESPONSE"];
  const characterWidth = 8;
  const lineHeight = 18;

  function getLetterTransform(line: string, lineIndex: number, index: number) {
    const lineWidth = line.length * characterWidth;
    const origin = {
      x:
        localPointer.width / 2 -
        lineWidth / 2 +
        index * characterWidth +
        characterWidth / 2,
      y: lineIndex * lineHeight + lineHeight / 2,
    };
    const dx = origin.x - localPointer.x;
    const dy = origin.y - localPointer.y;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const force = localPointer.active ? Math.max(0, 1 - distance / 80) * 24 : 0;

    return `translate(${(dx / distance) * force}px, ${
      (dy / distance) * force
    }px)`;
  }

  return (
    <span
      className="block text-center"
      data-pointer-active={localPointer.active}
      data-pointer-x={localPointer.x}
      data-pointer-y={localPointer.y}
      onMouseLeave={() =>
        setLocalPointer((current) => ({ ...current, active: false }))
      }
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setLocalPointer({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          active: true,
          width: rect.width,
        });
      }}
    >
      {lines.map((line, lineIndex) => (
        <span className="block" key={line}>
          {line.split("").map((character, characterIndex) => {
            return (
              <span
                className="inline-block transition-transform duration-300 ease-out"
                key={`${line}-${character}-${characterIndex}`}
                style={{
                  transform: getLetterTransform(
                    line,
                    lineIndex,
                    characterIndex,
                  ),
                }}
              >
                {character}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function ClickAndMoveCard({
  baseTransform,
  className,
  resetKey,
}: {
  baseTransform: string;
  className?: string;
  resetKey: number;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({
    pointerX: 0,
    pointerY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setOffset({ x: 0, y: 0 });
  }, [resetKey]);

  return (
    <div
      className={`cursor-grab rounded-sm border border-bone/10 bg-charcoal/55 p-4 text-center text-sm font-bold text-bone-muted hover:border-copper/50 hover:text-bone active:cursor-grabbing ${className ?? ""} ${
        isDragging ? "" : "transition duration-300"
      }`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsDragging(true);
        setDragStart({
          pointerX: event.clientX,
          pointerY: event.clientY,
          offsetX: offset.x,
          offsetY: offset.y,
        });
      }}
      onPointerMove={(event) => {
        if (!isDragging) {
          return;
        }

        setOffset({
          x: dragStart.offsetX + event.clientX - dragStart.pointerX,
          y: dragStart.offsetY + event.clientY - dragStart.pointerY,
        });
      }}
      onPointerUp={() => setIsDragging(false)}
      style={{
        transform: `${baseTransform} translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      Click&Move
    </div>
  );
}

function EffectsShowcase() {
  return (
    <div className="effects-scene relative flex h-full min-h-[260px] w-full items-center justify-center overflow-hidden p-3 sm:min-h-[320px] sm:p-4">
      <div className="effects-scene-field relative flex h-full min-h-[240px] w-full items-center justify-center overflow-hidden rounded-sm sm:min-h-[300px]">
        <div className="effects-scene-atmosphere pointer-events-none absolute inset-0 transition duration-700" />
        <div className="effects-scene-haze pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-[28rem]" />

        {effectParticles.map((particle, index) => {
          const [left, top, size, color, duration, delay, driftX, driftY, opacity] =
            particle;
          const particleCategory =
            size >= 3.4 ? "accent" : size >= 2.2 ? "medium" : "dust";
          const particleLayer =
            particleCategory === "accent"
              ? "foreground"
              : particleCategory === "medium" || index % 5 === 0
                ? "mid"
                : "background";
          const particleDirection =
            index % 3 === 0
              ? "vertical"
              : index % 3 === 1
                ? "diagonal"
                : "horizontal";
          const particleSize =
            particleCategory === "accent"
              ? size * 3.35
              : particleCategory === "medium"
                ? size * 2.35
                : size * 1.28;
          const particleDuration =
            particleCategory === "accent"
              ? `${12 + (index % 6)}s`
              : particleCategory === "medium"
                ? `${7 + (index % 6)}s`
                : `${10 + (index % 7)}s`;
          const layerDuration =
            particleLayer === "background"
              ? `${Math.round(Number.parseFloat(particleDuration) * 1.75)}s`
              : particleLayer === "mid"
                ? `${Math.round(Number.parseFloat(particleDuration) * 1.18)}s`
                : particleDuration;
          const layerSize =
            particleLayer === "background"
              ? particleSize * 0.72
              : particleLayer === "mid"
                ? particleSize
                : particleSize * 1.08;
          const layerOpacity =
            particleLayer === "background"
              ? opacity * 0.58
              : particleLayer === "mid"
                ? opacity * 0.92
                : Math.min(opacity * 1.08, 0.56);

          return (
            <span
              className={`effects-particle effects-particle-${particleCategory} effects-particle-${particleLayer} effects-particle-${particleDirection} absolute rounded-full`}
              key={`${left}-${top}-${index}`}
              style={
                {
                  left,
                  top,
                  width: `${layerSize}px`,
                  height: `${layerSize}px`,
                  color,
                  backgroundColor: color,
                  animationDuration: layerDuration,
                  animationDelay: delay,
                  "--particle-opacity": layerOpacity,
                  "--particle-x": driftX,
                  "--particle-y": driftY,
                } as CSSProperties
              }
            />
          );
        })}

        {effectConnections.map(([left, top, rotate, width, duration, delay]) => (
          <span
            className="effects-connection absolute"
            key={`${left}-${top}-${rotate}`}
            style={
              {
                left,
                top,
                width,
                animationDuration: duration,
                animationDelay: delay,
                "--connection-rotate": rotate,
              } as CSSProperties
            }
          />
        ))}

        {effectStreaks.map(
          (
            [
              depth,
              profile,
              path,
              left,
              top,
              width,
              duration,
              delay,
              height,
              blur,
              riseOpacity,
              peakOpacity,
              startScale,
              peakScale,
              endScale,
            ],
            index,
          ) => (
            <span
              className={`effects-streak effects-streak-${depth} effects-streak-${profile} effects-streak-${path} absolute`}
              key={`${path}-${left}-${top}-${index}`}
              style={
                {
                  left,
                  top,
                  width,
                  animationDuration: duration,
                  animationDelay: delay,
                  "--streak-height": height,
                  "--streak-blur": blur,
                  "--streak-rise-opacity": riseOpacity,
                  "--streak-peak-opacity": peakOpacity,
                  "--streak-start-scale": startScale,
                  "--streak-peak-scale": peakScale,
                  "--streak-end-scale": endScale,
                } as CSSProperties
              }
            />
          ),
        )}

        <div className="effects-orb-spill pointer-events-none absolute left-1/2 top-1/2 z-20 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-72" />
        <div className="effects-orb-halo pointer-events-none absolute left-1/2 top-1/2 z-20 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-64" />
        <div className="effects-orb pointer-events-none absolute left-1/2 top-1/2 z-40 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_32%,#f4ead8_0%,#e2954b_20%,#c87434_42%,rgba(200,116,52,0.18)_68%,transparent_72%)] opacity-95 sm:size-40" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/14 blur-3xl sm:size-52" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-bright/5 blur-[72px]" />

        <div className="relative z-50 mt-44 text-center sm:mt-56">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-bone">
            EFFECTS LAB
          </p>
          <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.08em] text-bone-muted/80">
            Glassmorphism <span aria-hidden="true">&bull;</span> Lighting{" "}
            <span aria-hidden="true">&bull;</span> Atmosphere
          </p>
        </div>
      </div>
    </div>
  );
}

function SvgBlueprintShowcase() {
  return (
    <div className="svg-blueprint relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-sm border border-bone/10 bg-charcoal/70 p-4 shadow-inset">
      <svg
        aria-label="Animated blueprint construction of the JC maker mark"
        className="relative z-10 h-[300px] w-full max-w-[760px]"
        role="img"
        viewBox="0 0 760 360"
      >
        <defs>
          <linearGradient id="blueprintCopperLine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4ead8" stopOpacity="0.88" />
            <stop offset="52%" stopColor="#e2954b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c87434" stopOpacity="0.72" />
          </linearGradient>
          <filter id="blueprintGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="svg-blueprint-guides" fill="none">
          <path d="M184 70 H576" />
          <path d="M184 180 H576" />
          <path d="M184 290 H576" />
          <path d="M256 52 V306" />
          <path d="M330 52 V306" />
          <path d="M436 52 V306" />
          <path d="M512 52 V306" />
          <circle cx="458" cy="180" r="92" />
          <circle cx="458" cy="180" r="66" />
          <circle cx="292" cy="220" r="50" />
          <path d="M228 92 H356 V268 H228 Z" />
          <path d="M382 88 H552 V272 H382 Z" />
          <path d="M214 306 H546" />
          <path d="M214 298 V314" />
          <path d="M330 298 V314" />
          <path d="M458 298 V314" />
          <path d="M546 298 V314" />
        </g>

        <g className="svg-blueprint-construction" fill="none">
          <path d="M330 92 V212 C330 248 304 268 274 258" />
          <path d="M246 214 C244 238 258 256 282 262" />
          <path d="M508 118 C474 84 414 92 392 134" />
          <path d="M392 134 C366 184 386 246 440 260" />
          <path d="M440 260 C476 268 504 252 520 230" />
          <path d="M256 92 L330 92" />
          <path d="M246 214 L330 214" />
          <path d="M392 134 L508 118" />
          <path d="M440 260 L520 230" />
          <path d="M292 220 L458 180" />
          <path d="M330 92 L520 230" />
          <path d="M246 214 L508 118" />
        </g>

        <g className="svg-blueprint-form" fill="none">
          <path d="M330 92 V212 C330 248 304 268 274 258 C252 250 242 232 246 214" />
          <path d="M508 118 C476 88 418 94 392 134 C366 184 386 246 440 260 C476 268 504 252 520 230" />
        </g>

        <g className="svg-blueprint-annotations">
          <text x="188" y="48">GUIDES</text>
          <text x="478" y="84">RADIUS</text>
          <text x="240" y="332">BASELINE</text>
          <text x="546" y="198">MARK</text>
        </g>

        <g className="svg-blueprint-final" fill="none">
          <path
            className="svg-blueprint-final-shadow"
            d="M330 92 V212 C330 248 304 268 274 258 C252 250 242 232 246 214"
          />
          <path
            className="svg-blueprint-final-shadow"
            d="M508 118 C476 88 418 94 392 134 C366 184 386 246 440 260 C476 268 504 252 520 230"
          />
          <path d="M330 92 V212 C330 248 304 268 274 258 C252 250 242 232 246 214" />
          <path d="M508 118 C476 88 418 94 392 134 C366 184 386 246 440 260 C476 268 504 252 520 230" />
          <path className="svg-blueprint-signature-line" d="M236 288 H532" />
        </g>
      </svg>
    </div>
  );
}

function PhysicsSpringShowcase() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<PhysicsNode[]>(createPhysicsNodes());
  const linksRef = useRef<PhysicsLink[]>(createPhysicsLinks());
  const draggedNodeRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerVelocityRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const [nodes, setNodes] = useState<PhysicsNode[]>(() => createPhysicsNodes());

  function getSvgPoint(event: { clientX: number; clientY: number }) {
    const svg = svgRef.current;

    if (!svg) {
      return { x: 0, y: 0 };
    }

    const matrix = svg.getScreenCTM();

    if (!matrix) {
      return { x: 0, y: 0 };
    }

    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const transformed = point.matrixTransform(matrix.inverse());

    return {
      x: transformed.x,
      y: transformed.y,
    };
  }

  function getTouchPoint(
    event: ReactTouchEvent<SVGCircleElement | SVGSVGElement>,
  ) {
    const touch = event.touches[0] ?? event.changedTouches[0];

    if (!touch) {
      return null;
    }

    return getSvgPoint(touch);
  }

  function startDragAtPoint(point: { x: number; y: number }, id: number) {
    draggedNodeRef.current = id;
    pointerRef.current = point;
    pointerVelocityRef.current = { x: 0, y: 0 };
    lastPointerRef.current = {
      x: point.x,
      y: point.y,
      time: performance.now(),
    };

    const node = nodesRef.current[id];
    node.x = point.x;
    node.y = point.y;
    node.vx = 0;
    node.vy = 0;
  }

  function updateDragPoint(point: { x: number; y: number }) {
    if (draggedNodeRef.current === null) {
      return;
    }

    const now = performance.now();
    const elapsed = Math.max((now - lastPointerRef.current.time) / 1000, 0.016);

    pointerVelocityRef.current = {
      x: (point.x - lastPointerRef.current.x) / elapsed,
      y: (point.y - lastPointerRef.current.y) / elapsed,
    };
    lastPointerRef.current = {
      x: point.x,
      y: point.y,
      time: now,
    };
    pointerRef.current = point;
  }

  function releaseDraggedNode() {
    if (draggedNodeRef.current === null) {
      return;
    }

    const releasedNode = nodesRef.current[draggedNodeRef.current];
    releasedNode.vx = pointerVelocityRef.current.x * 0.55;
    releasedNode.vy = pointerVelocityRef.current.y * 0.55;
    draggedNodeRef.current = null;
  }

  function beginPointerDrag(event: ReactPointerEvent<SVGCircleElement>, id: number) {
    if (event.pointerType === "touch") {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    try {
      svgRef.current?.setPointerCapture(event.pointerId);
    } catch {
      // Some SVG implementations do not support capture on the parent SVG.
    }

    startDragAtPoint(getSvgPoint(event), id);
  }

  function movePointerDrag(event: ReactPointerEvent<SVGSVGElement>) {
    if (event.pointerType === "touch" || draggedNodeRef.current === null) {
      return;
    }

    event.preventDefault();
    updateDragPoint(getSvgPoint(event));
  }

  function endPointerDrag(event: ReactPointerEvent<SVGSVGElement>) {
    if (event.pointerType === "touch" || draggedNodeRef.current === null) {
      return;
    }

    releaseDraggedNode();

    try {
      if (svgRef.current?.hasPointerCapture(event.pointerId)) {
        svgRef.current.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignore capture release failures from SVG edge cases.
    }
  }

  function beginTouchDrag(event: ReactTouchEvent<SVGCircleElement>, id: number) {
    event.preventDefault();
    event.stopPropagation();

    const point = getTouchPoint(event);

    if (!point) {
      return;
    }

    startDragAtPoint(point, id);
  }

  function moveTouchDrag(event: ReactTouchEvent<SVGSVGElement>) {
    if (draggedNodeRef.current === null) {
      return;
    }

    event.preventDefault();

    const point = getTouchPoint(event);

    if (!point) {
      return;
    }

    updateDragPoint(point);
  }

  function endTouchDrag(event: ReactTouchEvent<SVGSVGElement>) {
    if (draggedNodeRef.current === null) {
      return;
    }

    event.preventDefault();
    releaseDraggedNode();
  }

  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();

    function solve(now: number) {
      const nodes = nodesRef.current;
      const links = linksRef.current;
      const elapsed = now / 1000;
      const delta = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;

      for (let substep = 0; substep < 3; substep += 1) {
        const dt = delta / 3;
        const draggedNode = draggedNodeRef.current;

        nodes.forEach((node) => {
          if (draggedNode === node.id) {
            node.x = pointerRef.current.x;
            node.y = pointerRef.current.y;
            node.vx = 0;
            node.vy = 0;

            return;
          }

          if (node.pinned) {
            node.x = node.ox + Math.sin(elapsed * 0.9 + node.id) * 2.8;
            node.y = node.oy + Math.cos(elapsed * 0.7 + node.id) * 1.3;
            node.vx = 0;
            node.vy = 0;

            return;
          }

          node.vy += 225 * dt;
          node.vx += Math.sin(elapsed * 1.25 + node.id * 0.7) * 7 * dt;

          if (node.id >= 10) {
            node.vy += 46 * dt;
          }
        });

        links.forEach((link) => {
          const a = nodes[link.a];
          const b = nodes[link.b];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const normalX = dx / distance;
          const normalY = dy / distance;
          const relativeVelocity =
            (b.vx - a.vx) * normalX + (b.vy - a.vy) * normalY;
          const force =
            (distance - link.rest) * link.stiffness * 14 +
            relativeVelocity * link.stiffness * 0.72;
          const fx = normalX * force;
          const fy = normalY * force;
          const aFree = !a.pinned && draggedNodeRef.current !== a.id;
          const bFree = !b.pinned && draggedNodeRef.current !== b.id;

          if (aFree) {
            a.vx += fx * dt;
            a.vy += fy * dt;
          }

          if (bFree) {
            b.vx -= fx * dt;
            b.vy -= fy * dt;
          }
        });

        nodes.forEach((node) => {
          if (node.pinned || draggedNodeRef.current === node.id) {
            return;
          }

          node.vx *= 0.986;
          node.vy *= 0.986;
          node.x += node.vx * dt;
          node.y += node.vy * dt;

          if (node.x < 48 || node.x > 712) {
            node.x = Math.max(48, Math.min(712, node.x));
            node.vx *= -0.38;
          }

          if (node.y < 48 || node.y > 322) {
            node.y = Math.max(48, Math.min(322, node.y));
            node.vy *= -0.38;
          }
        });

        for (let pass = 0; pass < 3; pass += 1) {
          links.forEach((link) => {
            const a = nodes[link.a];
            const b = nodes[link.b];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const correction = (distance - link.rest) * 0.16;
            const cx = (dx / distance) * correction;
            const cy = (dy / distance) * correction;
            const aFree = !a.pinned && draggedNodeRef.current !== a.id;
            const bFree = !b.pinned && draggedNodeRef.current !== b.id;

            if (aFree && bFree) {
              a.x += cx * 0.5;
              a.y += cy * 0.5;
              b.x -= cx * 0.5;
              b.y -= cy * 0.5;
            } else if (aFree) {
              a.x += cx;
              a.y += cy;
            } else if (bFree) {
              b.x -= cx;
              b.y -= cy;
            }
          });
        }
      }

      setNodes(nodes.map((node) => ({ ...node })));
      frame = requestAnimationFrame(solve);
    }

    frame = requestAnimationFrame(solve);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="physics-lab relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-sm border border-bone/10 bg-charcoal/70 p-4 shadow-inset">
      <svg
        aria-label="Interactive spring physics simulation"
        className="relative z-10 h-[300px] w-full max-w-[760px] touch-none"
        onPointerCancel={endPointerDrag}
        onPointerMove={movePointerDrag}
        onPointerUp={endPointerDrag}
        onTouchCancel={endTouchDrag}
        onTouchEnd={endTouchDrag}
        onTouchMove={moveTouchDrag}
        ref={svgRef}
        role="img"
        viewBox="0 0 760 360"
      >
        <defs>
          <filter id="physicsNodeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="physics-links">
          {linksRef.current.map((link) => {
            const a = nodes[link.a];
            const b = nodes[link.b];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const strain = Math.max(
              -0.25,
              Math.min(0.35, (distance - link.rest) / link.rest),
            );
            const tension = Math.max(0, strain);
            const compression = Math.max(0, -strain);

            return (
              <line
                key={`${link.a}-${link.b}`}
                style={
                  {
                    "--link-compression": compression,
                    "--link-tension": tension,
                  } as CSSProperties
                }
                x1={a.x}
                x2={b.x}
                y1={a.y}
                y2={b.y}
              />
            );
          })}
        </g>

        <g className="physics-nodes">
          {nodes.map((node) => (
            <circle
              className={node.pinned ? "physics-node-pinned" : ""}
              cx={node.x}
              cy={node.y}
              key={node.id}
              r={node.pinned ? 6 : node.id >= 10 ? 7 : 5}
            />
          ))}
        </g>
        <g className="physics-hit-targets">
          {nodes.map((node) => (
            <circle
              cx={node.x}
              cy={node.y}
              fill="transparent"
              key={`hit-${node.id}`}
              onPointerDown={(event) => beginPointerDrag(event, node.id)}
              onTouchStart={(event) => beginTouchDrag(event, node.id)}
              pointerEvents="all"
              r={node.pinned ? 20 : 24}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function Hero() {
  const { openContactModal } = useContactModal();
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const scrollCarouselRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<HeroTab>("Effects");
  const [panelVisible, setPanelVisible] = useState(true);
  const [motionPhase, setMotionPhase] = useState<
    "float" | "merge" | "bang" | "app" | "dissolve"
  >("float");
  const [pointer, setPointer] = useState({ x: 50, y: 45 });
  const [scrollLab, setScrollLab] = useState({
    progress: 0,
    scrollTop: 0,
  });
  const [scrollCarousel, setScrollCarousel] = useState({
    scrollLeft: 0,
    width: 0,
  });
  const [magneticOffset, setMagneticOffset] = useState({
    x: 0,
    y: 0,
  });
  const [magneticProximity, setMagneticProximity] = useState(0);
  const [orbitAnchorId, setOrbitAnchorId] = useState<string | null>(null);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [choreographyResetKey, setChoreographyResetKey] = useState(0);
  const orbitStartedAtRef = useRef(0);
  const carouselItemWidth = 190;
  const carouselItemGap = 32;
  const carouselSequenceWidth = 3 * (carouselItemWidth + carouselItemGap);
  const carouselItems = [
    "Welcome",
    "Imagine",
    "Create",
    "Welcome",
    "Imagine",
    "Create",
    "Welcome",
    "Imagine",
    "Create",
  ];

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 639px)");

    function keepMobileTabCurated() {
      if (mobileQuery.matches && !mobileVisibleTabs.has(activeTab)) {
        setActiveTab("Effects");
        setPanelVisible(true);
      }
    }

    keepMobileTabCurated();
    mobileQuery.addEventListener("change", keepMobileTabCurated);

    return () => {
      mobileQuery.removeEventListener("change", keepMobileTabCurated);
    };
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Motion") {
      return;
    }

    const phases = ["float", "merge", "bang", "app"] as const;

    let index = 0;

    const interval = window.setInterval(() => {
      index = (index + 1) % phases.length;
      setMotionPhase(phases[index]);
    }, 1500);

    return () => window.clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (orbitAnchorId !== "motion") {
      return;
    }

    let frameId = 0;

    function tick(time: number) {
      if (orbitStartedAtRef.current === 0) {
        orbitStartedAtRef.current = time;
      }

      setOrbitAngle(((time - orbitStartedAtRef.current) / 1600) * Math.PI * 2);
      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [orbitAnchorId]);

  useEffect(() => {
    if (activeTab === "Scroll" && scrollCarouselRef.current) {
      scrollCarouselRef.current.scrollLeft = carouselSequenceWidth;
      setScrollCarousel({
        scrollLeft: carouselSequenceWidth,
        width: scrollCarouselRef.current.clientWidth,
      });
    }
  }, [activeTab, carouselSequenceWidth]);

  function selectTab(tab: HeroTab) {
    if (tab === activeTab) {
      return;
    }

    setPanelVisible(false);
    window.setTimeout(() => {
      setActiveTab(tab);
      setPanelVisible(true);
    }, 140);
  }

  function getOrbitTransform(panelId: string) {
    if (orbitAnchorId !== "motion") {
      return "translate(0px, 0px)";
    }

    if (
      panelId !== "pointer-response" &&
      panelId !== "click-move" &&
      panelId !== "magnetic-control"
    ) {
      return "translate(0px, 0px)";
    }

    const amplitude = panelId === "magnetic-control" ? 1 : 1.32;

    return `translate(${Math.sin(orbitAngle) * 104 * amplitude}px, ${
      Math.sin(orbitAngle * 2) * 52 * amplitude
    }px) rotate(${Math.sin(orbitAngle) * 7 * amplitude}deg) scale(${
      1 + Math.sin(orbitAngle * 2) * 0.1 * amplitude
    })`;
  }

  function endChoreography() {
    setOrbitAnchorId(null);
    setMagneticOffset({ x: 0, y: 0 });
    setChoreographyResetKey((key) => key + 1);
  }

  function getCarouselFocus(index: number) {
    const itemCenter =
      index * (carouselItemWidth + carouselItemGap) + carouselItemWidth / 2;
    const viewportCenter = scrollCarousel.scrollLeft + scrollCarousel.width / 2;
    const distance = Math.abs(itemCenter - viewportCenter);
    const range = scrollCarousel.width * 0.5 || 1;

    return Math.min(1, Math.max(0, 1 - distance / range));
  }

  const helloSectionTop = 260;
  const helloSectionHeight = 180;
  const scrollViewportHeight = 320;
  const helloCenter = helloSectionTop + helloSectionHeight / 2;
  const helloCenterInViewport = helloCenter - scrollLab.scrollTop;
  const helloIsActive =
    helloCenterInViewport > scrollViewportHeight * 0.08 &&
    helloCenterInViewport < scrollViewportHeight * 0.92;

  return (
    <section className="container-shell grid min-h-[calc(100vh-73px)] items-start gap-8 px-6 py-8 lg:min-h-0 lg:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
      <div className="lg:-mt-6">
        <p className="section-kicker mb-5">
          28 years building in the field. Now building in code.
        </p>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.9] text-bone sm:text-6xl lg:text-8xl">
          Software built with the discipline of a craftsman.
        </h1>
        <p className="body-copy mt-7 max-w-2xl">
          I bring decades of construction leadership into software development:
          planning carefully, solving under pressure, and delivering work that
          is clear, durable, and ready for real users.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <SectionLink className="btn-primary" href="#projects">
            View projects
          </SectionLink>
          <button
            className="btn-secondary"
            onClick={(event) => openContactModal(event.currentTarget)}
            type="button"
          >
            Let's Talk
          </button>
        </div>
      </div>

      <div className="relative lg:-mt-5 overflow-hidden rounded-sm border border-bone/10 bg-charcoal-2 p-4 shadow-glow">
        <div className="aspect-[4/5] rounded-sm border border-bone/10 bg-[linear-gradient(145deg,#28221c_0%,#20343a_45%,#c87434_100%)] p-6 text-bone sm:aspect-[5/4] lg:aspect-[9/10]">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-bone/70">
              <span>Frontend Lab</span>
              <span>2026</span>
            </div>

            <div className="mt-6 grid grid-cols-4 border-b border-bone/15 text-[0.58rem] font-black uppercase tracking-[0.08em] text-bone-muted sm:grid-cols-6 sm:text-[0.64rem] lg:text-[0.68rem]">
              {tabs.map((tab) => (
                <button
                  className={`relative px-1 pb-3 text-center transition duration-300 hover:text-bone focus:outline-none focus-visible:text-bone ${
                    mobileVisibleTabs.has(tab) ? "" : "hidden sm:block"
                  }`}
                  key={tab}
                  onClick={() => selectTab(tab)}
                  type="button"
                >
                  <span className={activeTab === tab ? "text-bone" : ""}>
                    {tab}
                  </span>
                  <span
                    className={`absolute bottom-[-1px] left-1/2 h-0.5 w-8 -translate-x-1/2 bg-copper-bright transition-all duration-300 ${
                      activeTab === tab
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="relative mt-8 flex flex-1 overflow-hidden">
              <div
                className={`flex w-full transition-opacity duration-300 ease-out ${
                  panelVisible ? "opacity-100" : "opacity-0"
                }`}
                key={activeTab}
              >
                {activeTab === "Motion" && (
                  <div className="relative w-full overflow-hidden rounded-sm border border-bone/10 bg-charcoal/65 p-5 shadow-inset">
                    <div className="relative h-[240px]">
                      {motionCards.map((card) => {
                        const positions = {
                          "top-left": "left-8 top-6",
                          "top-right": "right-8 top-6",
                          "bottom-left": "left-8 bottom-6",
                          "bottom-right": "right-8 bottom-6",
                        } as const;

                        const isCenterPhase =
                          motionPhase === "merge" || motionPhase === "bang";

                        const centerPositionStyles = isCenterPhase
                          ? card.position === "top-left"
                            ? {
                                left: "50%",
                                top: "50%",
                                right: "auto",
                                bottom: "auto",
                              }
                            : card.position === "top-right"
                              ? {
                                  right: "50%",
                                  top: "50%",
                                  left: "auto",
                                  bottom: "auto",
                                }
                              : card.position === "bottom-left"
                                ? {
                                    left: "50%",
                                    bottom: "50%",
                                    right: "auto",
                                    top: "auto",
                                  }
                                : {
                                    right: "50%",
                                    bottom: "50%",
                                    left: "auto",
                                    top: "auto",
                                  }
                          : {};

                        const centerTransform = isCenterPhase
                          ? card.position === "top-left"
                            ? "translate(-50%, -50%)"
                            : card.position === "top-right"
                              ? "translate(50%, -50%)"
                              : card.position === "bottom-left"
                                ? "translate(-50%, 50%)"
                                : "translate(50%, 50%)"
                          : "translate(0px, 0px)";

                        return (
                          <div
                            key={card.label}
                            className={`absolute w-[125px] rounded-sm border border-bone/10 bg-charcoal-2/80 p-3 transition-all duration-[1800ms] ${positions[card.position]}`}
                            style={{
                              ...centerPositionStyles,
                              transform: centerTransform,

                              scale:
                                motionPhase === "bang"
                                  ? Math.sin(Date.now() / 2) * 0.2 + 1.12
                                  : 1,

                              opacity:
                                motionPhase === "app"
                                  ? 0
                                  : motionPhase === "bang"
                                    ? 0.45
                                    : 0.92,

                              boxShadow:
                                motionPhase === "bang"
                                  ? "0 0 40px rgba(200,116,52,.8), 0 0 100px rgba(200,116,52,.7), 0 0 180px rgba(200,116,52,.5)"
                                  : "",
                            }}
                          >
                            <div
                              className={`h-full w-full ${
                                motionPhase === "bang"
                                  ? "animate-card-vibrate"
                                  : ""
                              }`}
                            >
                              <p className="text-center text-[10px] font-black uppercase tracking-[0.12em] text-copper-bright">
                                {card.label}
                              </p>

                              <pre className="mt-2 min-h-[36px] whitespace-pre-wrap text-[10px] text-bone">
                                {card.code}
                              </pre>
                            </div>
                          </div>
                        );
                      })}
                      <div
                        className="absolute left-1/2 top-1/2 w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-sm border border-bone/10 bg-charcoal-2/95 p-3 transition-all duration-1000"
                        style={{
                          opacity:
                            motionPhase === "bang"
                              ? 0.35
                              : motionPhase === "app"
                                ? 1
                                : 0,

                          transform:
                            motionPhase === "bang"
                              ? "translate(-50%, -50%) scale(0.4)"
                              : motionPhase === "app"
                                ? "translate(-50%, -50%) scale(1.05)"
                                : "translate(-50%, -50%) scale(0.1)",

                          boxShadow:
                            motionPhase === "app"
                              ? "0 0 60px rgba(200,116,52,.95), 0 0 180px rgba(200,116,52,.85), 0 0 320px rgba(200,116,52,.65)"
                              : "",
                        }}
                      >
                        <div className="border-b border-bone/10 pb-2">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-copper-bright">
                            App
                          </p>
                        </div>

                        <div className="mt-3 space-y-2 text-xs font-bold text-bone">
                          <div>Projects</div>
                          <div>Profile</div>
                          <div>Settings</div>
                        </div>

                        <button
                          className="mt-4 w-full rounded-sm border border-copper/40 py-2 text-xs font-black uppercase tracking-[0.12em] text-copper-bright"
                          type="button"
                        >
                          Launch
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Interaction" && (
                  <div
                    className="relative w-full overflow-hidden rounded-sm border border-bone/10 bg-charcoal/65 p-5 shadow-inset"
                    onMouseMove={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      setPointer({
                        x: ((event.clientX - rect.left) / rect.width) * 100,
                        y: ((event.clientY - rect.top) / rect.height) * 100,
                      });

                      const magneticButton = magneticButtonRef.current;

                      if (magneticButton) {
                        const buttonRect =
                          magneticButton.getBoundingClientRect();
                        const nearestX = Math.max(
                          buttonRect.left,
                          Math.min(event.clientX, buttonRect.right),
                        );
                        const nearestY = Math.max(
                          buttonRect.top,
                          Math.min(event.clientY, buttonRect.bottom),
                        );
                        const dx = event.clientX - nearestX;
                        const dy = event.clientY - nearestY;
                        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                        const attractionRadius = 90;
                        const proximity = Math.max(
                          0,
                          1 - distance / attractionRadius,
                        );

                        setMagneticProximity(proximity);

                        if (distance < attractionRadius) {
                          const pull = proximity * 3;

                          setMagneticOffset((current) => ({
                            x: current.x + (dx / distance) * pull,
                            y: current.y + (dy / distance) * pull,
                          }));
                        }
                      }
                    }}
                    style={{
                      background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(200,116,52,0.34), rgba(27,23,19,0.7) 34%, rgba(18,16,14,0.88) 70%)`,
                    }}
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-copper-bright">
                      Cursor-reactive surface
                    </p>
                    <div
                      className="absolute size-20 rounded-full border border-copper/30 bg-copper/10 blur-[1px] transition-transform duration-200"
                      style={{
                        left: `${pointer.x}%`,
                        top: `${pointer.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                    <div
                      className="relative mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-5"
                      data-orbit-anchor={orbitAnchorId ?? undefined}
                    >
                      {labPanels.map((panel, index) => {
                        const baseTransform = `translate(${(pointer.x - 50) / (18 + index * 5)}px, ${(pointer.y - 50) / (24 + index * 5)}px) ${getOrbitTransform(panel.id)}`;
                        const layoutClass =
                          panel.id === "pointer-response"
                            ? "col-span-2 w-[180px] justify-self-center"
                            : panel.id === "motion"
                              ? "col-span-2 w-[220px] cursor-pointer justify-self-center rounded-full border-copper/40 bg-charcoal-2/80 px-6 py-4 text-center text-copper-bright shadow-glow"
                              : "col-start-1 w-[145px] justify-self-start";

                        if (panel.variant === "click-move") {
                          return (
                            <ClickAndMoveCard
                              baseTransform={baseTransform}
                              className={layoutClass}
                              key={panel.id}
                              resetKey={choreographyResetKey}
                            />
                          );
                        }

                        return (
                          <div
                            className={`rounded-sm border border-bone/10 bg-charcoal/55 p-4 text-sm font-bold text-bone-muted transition duration-300 hover:border-copper/50 hover:text-bone ${layoutClass}`}
                            key={panel.id}
                            onPointerDown={
                              panel.id === "motion"
                                ? (event) => {
                                    orbitStartedAtRef.current = 0;
                                    setOrbitAngle(0);
                                    setOrbitAnchorId("motion");
                                    event.currentTarget.setPointerCapture(
                                      event.pointerId,
                                    );
                                  }
                                : undefined
                            }
                            onPointerUp={
                              panel.id === "motion"
                                ? () => endChoreography()
                                : undefined
                            }
                            onPointerCancel={
                              panel.id === "motion"
                                ? () => endChoreography()
                                : undefined
                            }
                            style={{
                              transform: baseTransform,
                            }}
                          >
                            {panel.variant === "pointer-response" ? (
                              <PointerResponseCard />
                            ) : (
                              panel.label
                            )}
                          </div>
                        );
                      })}
                      <button
                        className="col-start-2 w-[165px] justify-self-end rounded-sm border border-copper/50 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-copper-bright transition hover:bg-copper hover:text-charcoal"
                        ref={magneticButtonRef}
                        style={{
                          boxShadow:
                            magneticProximity > 0
                              ? `0 0 ${8 + magneticProximity * 28}px rgba(226, 149, 75, ${0.12 + magneticProximity * 0.48})`
                              : undefined,
                          transform: `${getOrbitTransform("magnetic-control")} translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                        }}
                        type="button"
                      >
                        Magnetic control
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "Scroll" && (
                  <div className="relative w-full overflow-hidden rounded-sm border border-bone/10 bg-charcoal/65 shadow-inset">
                    <div className="absolute left-0 top-0 z-10 h-1 w-full bg-charcoal-3">
                      <div
                        className="h-full bg-copper-bright transition-[width] duration-150"
                        style={{ width: `${scrollLab.progress * 100}%` }}
                      />
                    </div>

                    <div
                      className="h-[320px] overflow-y-auto p-5"
                      onScroll={(event) => {
                        const target = event.currentTarget;
                        const maxScroll =
                          target.scrollHeight - target.clientHeight;

                        setScrollLab({
                          progress:
                            maxScroll > 0 ? target.scrollTop / maxScroll : 0,
                          scrollTop: target.scrollTop,
                        });

                      }}
                    >
                      <section className="relative flex min-h-[260px] flex-col justify-center overflow-hidden rounded-sm border border-bone/10 bg-charcoal-2/70 p-5">
                        <div
                          className="pointer-events-none absolute inset-x-[-20%] top-8 h-20 rounded-full bg-blueprint/70 blur-sm"
                          style={{
                            transform: `translateY(${scrollLab.scrollTop * 0.18}px)`,
                          }}
                        />
                        <div
                          className="pointer-events-none absolute left-10 top-20 h-24 w-24 rounded-sm border border-copper/40 bg-copper/20"
                          style={{
                            transform: `translateY(${scrollLab.scrollTop * 0.38}px) rotate(12deg)`,
                          }}
                        />
                        <div
                          className="pointer-events-none absolute bottom-8 right-8 h-16 w-36 rounded-sm border border-bone/15 bg-bone/10"
                          style={{
                            transform: `translateY(${scrollLab.scrollTop * 0.65}px) rotate(-8deg)`,
                          }}
                        />

                        <div className="relative z-10">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-copper-bright">
                            Scroll Lab
                          </p>
                          <p className="mt-4 text-3xl font-black text-bone">
                            Miniature webpage
                          </p>
                          <p className="mt-4 text-sm font-semibold leading-6 text-bone-muted">
                            Scroll inside this panel to drive the progress bar.
                          </p>
                        </div>
                      </section>

                      <section className="flex min-h-[180px] items-center p-5">
                        <div
                          className="w-full text-center transition duration-1000 ease-out"
                          style={{
                            opacity: helloIsActive ? 1 : 0,
                            transform: helloIsActive
                              ? "translateY(0px)"
                              : "translateY(32px)",
                            transitionDuration: helloIsActive
                              ? "1800ms"
                              : "300ms",
                          }}
                        >
                          <p className="text-6xl font-black text-bone">Hello</p>
                        </div>
                      </section>

                      <section className="mt-24 min-h-[520px] p-5">
                        <div className="sticky top-5 text-center">
                          <p className="text-5xl font-black text-copper-bright">
                            IDEA
                          </p>
                        </div>
                        <div className="mt-16 space-y-10 pb-8 text-center">
                          {["DESIGN", "BUILD", "LAUNCH"].map((step) => (
                            <div key={step}>
                              <p className="text-4xl font-black text-bone/50">
                                ↓
                              </p>
                              <p className="mt-4 text-4xl font-black tracking-[0.12em] text-bone">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="mt-4 py-6">
                        <div
                          className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                          onScroll={(event) => {
                            const target = event.currentTarget;

                            if (target.scrollLeft < carouselSequenceWidth / 2) {
                              target.scrollLeft += carouselSequenceWidth;
                            }

                            if (
                              target.scrollLeft >
                              carouselSequenceWidth * 1.5
                            ) {
                              target.scrollLeft -= carouselSequenceWidth;
                            }

                            setScrollCarousel({
                              scrollLeft: target.scrollLeft,
                              width: target.clientWidth,
                            });
                          }}
                          ref={scrollCarouselRef}
                        >
                          <div className="flex w-max gap-8 py-6">
                            {carouselItems.map((item, index) => {
                              const focus = getCarouselFocus(index);

                              return (
                                <p
                                  className="w-[190px] shrink-0 text-center text-4xl font-black text-bone transition-opacity duration-150"
                                  key={`${item}-${index}`}
                                  style={{
                                    opacity: 0.12 + focus * 0.88,
                                  }}
                                >
                                  {item}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      </section>

                    </div>
                  </div>
                )}

                {activeTab === "Effects" && <EffectsShowcase />}

                {activeTab === "SVG" && <SvgBlueprintShowcase />}

                {activeTab === "Physics" && <PhysicsSpringShowcase />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
