"use client";

import Image from "next/image";

const steps = [
    {
        number: "01",
        title: "Upload resume once",
        desc: "Drop your PDF or DOCX. We extract your profile, skills, and goals automatically. No endless forms.",
        active: true,
    },
    {
        number: "02",
        title: "AI find matches",
        desc: "Our system maps your profile to the highest-probability colleges, jobs, and housing options that fit your exact needs.",
        active: false,
    },
    {
        number: "03",
        title: "Apply directly",
        desc: "Review your personalized dashboard and apply with a single click—no hidden fees, no agents getting in the way.",
        active: true,
    },
    {
        number: "04",
        title: "Move abroad, sorted",
        desc: "Secure your visa, pack your bags, and settle into your verified accommodation smoothly.",
        active: false,
    },
];

export default function ProcessSection() {
    return (
        <>
            <style>{`

        /* ── exact grid matching the design image ── */
        .process-bg {
          background-color: #e8edf8;
          background-image:
            linear-gradient(to right,  #b8c5de 1px, transparent 1px),
            linear-gradient(to bottom, #b8c5de 1px, transparent 1px);
          background-size: 38px 38px;
        }

        /* ── Easyy Peezzzyyy left/right swing ── */
        @keyframes swingLR {
          0%   { transform: translateX(0px)   rotate(-2deg); }
          25%  { transform: translateX(16px)  rotate(2deg);  }
          50%  { transform: translateX(0px)   rotate(-1deg); }
          75%  { transform: translateX(-16px) rotate(2deg);  }
          100% { transform: translateX(0px)   rotate(-2deg); }
        }
        .swing {
          display: inline-block;
          animation: swingLR 2.8s ease-in-out infinite;
          transform-origin: center center;
        }

        /* ── selection handle squares ── */
        .handle {
          position: absolute;
          width: 9px;
          height: 9px;
          background: #ffffff;
          border: 1.8px solid #111111;
        }
      `}</style>

            <section className="process-bg relative w-full min-h-screen">
                <div className="relative z-10 max-w-5xl mx-auto px-8 py-12 md:py-24 flex flex-col md:flex-row gap-20 items-start">

                    {/* ══════════════ LEFT — sticky label ══════════════ */}
                    <div className="w-full md:w-72 flex-shrink-0">
                        <div className="sticky top-24 flex flex-col items-center md:items-start gap-4">

                            {/* Selection-box wrapper — 20px padding so handles sit outside the pill */}
                            <div className="relative z-0" style={{ padding: "10px" }}>

                                {/* Rectangle stroke */}
                                <div
                                    className="absolute inset-0"
                                    style={{ border: "1.8px solid #111", pointerEvents: "none", zIndex: 10 }}
                                />

                                {/* ── 8 handles ── */}
                                {/* corners */}
                                <span className="handle" style={{ top: "-5px", left: "-5px" }} />
                                <span className="handle" style={{ top: "-5px", right: "-5px" }} />
                                <span className="handle" style={{ bottom: "-5px", left: "-5px" }} />
                                <span className="handle" style={{ bottom: "-5px", right: "-5px" }} />
                                {/* mid-edges */}
                                <span className="handle" style={{ top: "-5px", left: "50%", transform: "translateX(-50%)" }} />
                                <span className="handle" style={{ bottom: "-5px", left: "50%", transform: "translateX(-50%)" }} />
                                <span className="handle" style={{ top: "50%", left: "-5px", transform: "translateY(-50%)" }} />
                                <span className="handle" style={{ top: "50%", right: "-5px", transform: "translateY(-50%)" }} />

                                {/* Process pill */}
                                <button
                                    className="relative z-10 bg-[#0052FF] text-white font-black text-2xl rounded-full px-10 py-3 shadow-lg tracking-tight select-none whitespace-nowrap cursor-default"
                                >
                                    Process
                                </button>
                            </div>

                            {/* Easyy Peezzzyyy swing pill */}
                            <div className="swing absolute top-20 md:top-14 left-32 z-20" style={{ marginLeft: "28px" }}>
                                <span
                                    className="inline-block bg-[#E01E5A] text-white text-[11px] font-black tracking-widest uppercase rounded-full px-4 py-1.5 shadow-md border border-black"
                                >
                                    Easyy&nbsp;Peezzzyyy
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="md:hidden absolute top-24 left-0 -rotate-20">
                        <Image src="/images/arrow-down.svg" width={80} height={180} alt="arrow" />
                    </div>
                    {/* ══════════════ RIGHT — steps ══════════════ */}
                    <div className="flex-1 flex flex-col gap-5">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className={`rounded-2xl px-7 py-6 transition-all ${step.active
                                    ? "bg-[#0052FF] shadow-xl shadow-blue-400/30"
                                    : "bg-[#B7CEFF] backdrop-blur-sm"
                                    }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span
                                        className={`text-3xl font-black tracking-tighter leading-none ${step.active ? "text-white/60" : "text-[#0052FF]/50"
                                            }`}
                                    >
                                        {step.number}
                                    </span>
                                    <h3
                                        className={`text-[17px] md:text-xl font-semibold leading-snug ${step.active ? "text-white" : "text-gray-900"
                                            }`}
                                    >
                                        {step.title}
                                    </h3>
                                </div>
                                <p
                                    className={`text-sm leading-relaxed ${step.active ? "text-white/75" : "text-gray-600"
                                        }`}
                                >
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
}