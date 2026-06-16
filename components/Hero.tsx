"use client";

import { useEffect, useRef, useState } from "react";
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
  "Motion",
  "Interaction",
  "Components",
  "Effects",
  "SVG",
  "Physics",
] as const;
type HeroTab = (typeof tabs)[number];

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

const accordionItems = [
  {
    title: "Reusable patterns",
    detail: "Small pieces composed into dependable interfaces.",
  },
  {
    title: "Stateful behavior",
    detail: "Controls respond clearly to user intent.",
  },
];

const componentTabs = ["Preview", "State", "API"] as const;

const comingSoon = {
  Effects: "Advanced visual effects for polished interface moments.",
  SVG: "Interactive vector systems, icons, and animated diagrams.",
  Physics: "Natural-feeling UI motion driven by simple physics principles.",
} satisfies Partial<Record<HeroTab, string>>;

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
    const force = localPointer.active
      ? Math.max(0, 1 - distance / 80) * 24
      : 0;

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

export function Hero() {
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<HeroTab>("Motion");
  const [panelVisible, setPanelVisible] = useState(true);
  const [motionPhase, setMotionPhase] = useState<
    "float" | "merge" | "bang" | "app" | "dissolve"
  >("float");
  const [pointer, setPointer] = useState({ x: 50, y: 45 });
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [componentTab, setComponentTab] =
    useState<(typeof componentTabs)[number]>("Preview");
  const [enabled, setEnabled] = useState(true);
  const [magneticOffset, setMagneticOffset] = useState({
    x: 0,
    y: 0,
  });
  const [magneticProximity, setMagneticProximity] = useState(0);
  const [orbitAnchorId, setOrbitAnchorId] = useState<string | null>(null);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [choreographyResetKey, setChoreographyResetKey] = useState(0);
  const orbitStartedAtRef = useRef(0);

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

  return (
    <section className="container-shell grid min-h-[calc(100vh-73px)] items-start gap-8 px-6 py-8 lg:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
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
          <a className="btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn-secondary" href="#contact">
            Start a conversation
          </a>
        </div>
      </div>

      <div className="relative lg:-mt-5 overflow-hidden rounded-sm border border-bone/10 bg-charcoal-2 p-4 shadow-glow">
        <div className="aspect-[5/4] lg:aspect-[9/10] rounded-sm border border-bone/10 bg-[linear-gradient(145deg,#28221c_0%,#20343a_45%,#c87434_100%)] p-6 text-bone">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-bone/70">
              <span>Frontend Lab</span>
              <span>2026</span>
            </div>

            <div className="mt-6 grid grid-cols-3 border-b border-bone/15 text-[0.58rem] font-black uppercase tracking-[0.08em] text-bone-muted sm:grid-cols-6 sm:text-[0.64rem] lg:text-[0.68rem]">
              {tabs.map((tab) => (
                <button
                  className="relative px-1 pb-3 text-center transition duration-300 hover:text-bone focus:outline-none focus-visible:text-bone"
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

                {activeTab === "Components" && (
                  <div className="grid w-full gap-4 rounded-sm border border-bone/10 bg-charcoal/65 p-5 shadow-inset">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-copper-bright">
                        Component playground
                      </p>
                      <button
                        aria-label="Toggle playground state"
                        aria-pressed={enabled}
                        className={`flex h-6 w-11 items-center rounded-full border border-bone/10 p-1 transition ${
                          enabled ? "bg-copper" : "bg-charcoal-3"
                        }`}
                        onClick={() => setEnabled((current) => !current)}
                        type="button"
                      >
                        <span
                          className="size-4 rounded-full bg-bone transition-transform duration-300"
                          style={{
                            transform: enabled
                              ? "translateX(20px)"
                              : "translateX(0)",
                          }}
                        />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 overflow-hidden rounded-sm border border-bone/10 text-xs font-black uppercase tracking-[0.12em]">
                      {componentTabs.map((tab) => (
                        <button
                          className={`px-2 py-3 transition ${
                            componentTab === tab
                              ? "bg-copper text-charcoal"
                              : "bg-charcoal-2/70 text-bone-muted hover:text-bone"
                          }`}
                          key={tab}
                          onClick={() => setComponentTab(tab)}
                          type="button"
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {accordionItems.map((item, index) => (
                        <button
                          className="w-full rounded-sm border border-bone/10 bg-charcoal-2/70 p-3 text-left transition hover:border-copper/40"
                          key={item.title}
                          onClick={() => setActiveAccordion(index)}
                          type="button"
                        >
                          <span className="flex items-center justify-between text-sm font-black text-bone">
                            {item.title}
                            <span className="text-copper-bright">
                              {activeAccordion === index ? "-" : "+"}
                            </span>
                          </span>
                          <span
                            className={`block overflow-hidden text-sm leading-6 text-bone-muted transition-all duration-300 ${
                              activeAccordion === index
                                ? "mt-2 max-h-20 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            {item.detail}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="rounded-sm border border-bone/10 bg-charcoal-2/70 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-steel">
                        Active panel
                      </p>
                      <p className="mt-2 text-lg font-black text-bone">
                        {componentTab} / {enabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                )}

                {(activeTab === "Effects" ||
                  activeTab === "SVG" ||
                  activeTab === "Physics") && (
                  <div className="flex w-full flex-col justify-center rounded-sm border border-bone/10 bg-charcoal/65 p-6 text-center shadow-inset">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-copper-bright">
                      {activeTab}
                    </p>
                    <p className="mt-6 text-4xl font-black text-bone">
                      Coming Soon
                    </p>
                    <p className="mt-4 text-sm font-semibold leading-6 text-bone-muted">
                      {comingSoon[activeTab]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
