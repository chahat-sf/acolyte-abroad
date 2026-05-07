"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

const pills = [
  { label: "Smart Matching", x: 40, y: 0 },
  { label: "Application Help", x: 260, y: 10 },
  { label: "Loans & Finances", x: 110, y: 70 },
  { label: "Accommodation", x: 40, y: 140 },
  { label: "Pre-departure Kit", x: 260, y: 140 },
];
const mobilepills = [
  { label: "Smart Matching", x: 0, y: 0 },
  { label: "Application Help", x: 160, y: 10 },
  { label: "Loans & Finances", x: 50, y: 70 },
  { label: "Accommodation", x: 0, y: 140 },
  { label: "Pre-departure Kit", x: 160, y: 140 },
];

function FallingPills({ triggered, pillsData }) {
  const containerRef = useRef(null);
  const pillRefs = useRef([]);
  const canvasContainerRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!triggered) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = 1.2;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });
    engineRef.current = engine;
    renderRef.current = render;

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };

    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      boundaryOptions,
    );
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height,
      boundaryOptions,
    );
    const rightWall = Bodies.rectangle(
      width + 5,
      height / 2,
      50,
      height,
      boundaryOptions,
    );

    const pillBodies = pillRefs.current
      .map((elem) => {
        if (!elem) return null;
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: "transparent" },
          restitution: 0.5,
          frictionAir: 0.03,
          friction: 0.3,
          chamfer: { radius: rect.height / 2 },
        });

        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 6,
          y: -2,
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

        return { elem, body };
      })
      .filter(Boolean);

    pillBodies.forEach(({ elem }) => {
      elem.style.position = "absolute";
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      mouseConstraint,
      ...pillBodies.map((wb) => wb.body),
    ]);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      pillBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      rafRef.current = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, [triggered]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "220px" }}
      >
        {/* Static pills (before trigger) or falling pills */}
        {pillsData.map((pill, i) => (
          <div
            key={pill.label}
            ref={(el) => (pillRefs.current[i] = el)}
            className="absolute bg-[#0052FF] text-white text-sm lg:text-xl font-semibold px-5 py-2.5 rounded-full shadow-md border border-black whitespace-nowrap cursor-grab active:cursor-grabbing select-none"
            style={!triggered ? { left: `${pill.x}px`, top: `${pill.y}px` } : {}}
          >
            {pill.label}
          </div>
        ))}
        {/* Matter.js canvas */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 z-0 pointer-events-none"
        />
      </div>

    </>

  );
}

export default function EcosystemSection() {
  const [triggered, setTriggered] = useState(false);

  return (
    <section className="lg:min-h-screen bg-[#f8fbff] flex items-center justify-center px-4 py-12 lg:py-16 relative overflow-hidden">
      <div className="w-full max-w-5xl relative overflow-hidden">
        {/* ECOSYSTEM badge */}
        <div className="inline-flex items-center border border-gray-200 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold tracking-widest  mb-6 shadow-sm">
          ECOSYSTEM
        </div>

        {/* Heading + Image row */}
        <div className="relative flex items-start">
          {/* Left: text */}
          <div className=" pr-4 z-10">
            <h2 className="text-5xl md:text-8xl text-black  heading-special max-w-3xl">
              Everything you need,<br />
              <span
                className="text-5xl md:text-8xl  heading-special"
                style={{
                  color: "#0052FF",
                }}
              >
                under one roof
              </span>
            </h2>


            <p className="text-blue-800/80 text-sm md:text-lg font-medium leading-relaxed max-w-lg mb-4 mt-8">
              Forget juggling multiple tabs and agents.
              <br />
              Acolyte Abroad is the only platform you need.
            </p>

            <hr className="border-gray-300 mb-6 w-4/5" />
          </div>

          {/* Right: Student image */}
        </div>

        {/* Falling pills area */}
        <div
          className="relative cursor-pointer md:block hidden"
          onClick={() => !triggered && setTriggered(true)}
          title={!triggered ? "Click to scatter!" : "Drag the pills around"}
        >
          <FallingPills triggered={triggered} pillsData={pills} />

          {!triggered && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1">
              <span className="text-xs text-gray-400 animate-pulse">
                click to scatter ↗
              </span>
            </div>
          )}
        </div>
        <div
          className="relative cursor-pointer block md:hidden"
          onClick={() => !triggered && setTriggered(true)}
          title={!triggered ? "Click to scatter!" : "Drag the pills around"}
        >
          <FallingPills triggered={triggered} pillsData={mobilepills} />

          {!triggered && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1">
              <span className="text-xs text-gray-400 animate-pulse">
                click to scatter ↗
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute -right-0 -bottom-0 lg:top-0 z-0 min-h-[70vh] lg:min-h-[120vh] w-1/2 md:block hidden">
        <Image
          src="/images/standing-student.webp"
          alt="Student with headphones"
          fill
          className=""
          loading="eager"
        />
      </div>
    </section>
  );
}
