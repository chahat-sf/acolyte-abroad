"use client";

import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-[#F0F4FF] overflow-hidden flex items-center">
            {/* Background subtle radial */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,_#dde8ff_0%,_transparent_70%)] pointer-events-none" />

            <div className="relative w-full max-w-7xl mx-auto px-6  flex-row items-center justify-between md:gap-8 md:flex hidden">

                {/* LEFT — Character image with float animation */}
                <div className="relative -left-12 flex-shrink-0 w-[160px] lg:w-[440px] ">

                    <Image
                        src="/images/desktop-man.webp"
                        alt="Student with headphones"
                        width={960}
                        height={480}
                        className="object-contain drop-shadow-2xl lg:block hidden"
                        priority
                    />
                    <Image
                        src="/images/man.webp"
                        alt="Student with headphones"
                        width={960}
                        height={480}
                        className="object-contain drop-shadow-2xl block lg:hidden"
                        priority
                    />


                    {/* Stats card below image */}
                    <div className="mt-6 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg border border-white">
                        <p className="text-sm text-[#0052FF]/60 font-medium mb-3 tracking-wide">
                            The largest network of opportunities globally.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { value: "1000+", label: "COLLEGES" },
                                { value: "50K+", label: "JOBS" },
                                { value: "25K+", label: "VERIFIED ROOMS" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex-1 border border-gray-300 rounded-xl px-2 py-2 text-center shadow-xl"
                                >
                                    <p className="text-[#0052FF] font-extrabold text-2xl md:text-3xl leading-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-[9px] text-gray-400 font-semibold tracking-widest mt-0.5">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT — Headline + CTA */}
                <div className="flex-1 flex flex-col items-start gap-6 md:pl-8">
                    {/* Headline */}
                    <div className="leading-none">
                        {/* "Study, Work," pill */}
                        <div className="inline-flex items-center gap-2 bg-[#0052FF] text-white text-2xl md:text-5xl lg:text-7xl font-black rounded-2xl px-5 py-1 md:py-2 mb-3 relative">
                            {/* asterisk decoration */}
                            <span className="absolute -top-3 -left-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-black shadow">
                                ✳
                            </span>
                            Study, Work,
                        </div>

                        {/* "and live abroad" line */}
                        <div className="flex flex-wrap items-baseline gap-3 text-2xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-snug">
                            <span>and</span>
                            <span className="bg-[#0052FF] text-white rounded-2xl px-4 py-1">
                                live abroad
                            </span>
                        </div>

                        {/* "made simple." */}
                        <p className="text-2xl md:text-5xl lg:text-7xl font-black text-gray-900 mt-2">
                            made simple.
                        </p>
                    </div>

                    {/* Envelope CTA block with float animation */}
                    <div className="relative ml-44 flex flex-col  items-start animate-float-slow">
                        {/* Handwritten label */}
                        <div className="flex items-center gap-1  ml-4 ">
                            <span
                                className="text-[#0052FF] text-base lg:text-4xl    heading-special"
                            >
                                Upload your
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mb-1 ml-4">
                            <span
                                className="text-[#0052FF] text-base lg:text-4xl    heading-special"
                            >
                                Resume once
                            </span>
                        </div>
                        {/* Curved arrow SVG */}
                        <svg
                            className="ml-10 mb-1"
                            width="40"
                            height="36"
                            viewBox="0 0 40 36"
                            fill="none"
                        >
                            <path
                                d="M6 4 C10 20, 24 28, 32 32"
                                stroke="#111"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <path
                                d="M28 30 L32 32 L30 27"
                                stroke="#111"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        {/* Envelope + button */}
                        <div className="relative">
                            <Image
                                src="/images/envelop.webp"
                                alt="Upload resume"
                                width={210}
                                height={160}
                                className="object-contain drop-shadow-xl"
                            />

                            {/* CLICK HERE button */}
                            <button className="absolute -right-32 bottom-4 flex items-center gap-2 bg-[#E01E5A] hover:bg-[#c41a4f] active:scale-95 transition-all duration-150 text-white font-extrabold text-sm tracking-wider rounded-full px-4 py-2.5 shadow-lg cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="20"
                                    viewBox="0 0 34 32"
                                    fill="none"
                                    className="flex-shrink-0"
                                >
                                    <g clipPath="url(#clip0_3_754)">
                                        <path
                                            d="M0 4.8536L16.8369 29.4872L16.6392 15.7838L30.419 9.76124L0 4.8536Z"
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="2.08422"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3_754">
                                            <rect
                                                width="29.1791"
                                                height="27.0908"
                                                fill="white"
                                                transform="translate(0 4.85306) rotate(-9.57391)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                CLICK HERE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative w-full max-w-7xl mx-auto  flex flex-row items-center justify-between md:gap-8 block md:hidden">

                {/* LEFT — Character image with float animation */}
                <div className="relative -left-32 bottom-16 flex-shrink-0 h-[50vh] w-[560px] z-0 ">


                    <Image
                        src="/images/man.webp"
                        alt="Student with headphones"
                        width={960}
                        height={480}
                        className=" drop-shadow-2xl block lg:hidden"
                        priority
                    />


                    {/* Stats card below image */}

                </div>

                <div className="  absolute left-[45%] bottom-24">
                    {/* Headline */}
                    <div className="leading-none    ">
                        {/* "Study, Work," pill */}
                        <div className="inline-flex items-center gap-2 bg-[#0052FF] text-white text-2xl md:text-5xl lg:text-7xl md:font-black rounded-2xl px-5 py-1 md:py-2 mb-3 relative">
                            {/* asterisk decoration */}
                            <span className="absolute -top-3 -left-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg md:font-black shadow">
                                ✳
                            </span>
                            Study, Work,
                        </div>

                        {/* "and live abroad" line */}
                        <div className="flex flex-wrap items-baseline gap-2  md:gap-3 text-2xl md:text-5xl lg:text-7xl md:font-black text-gray-900 ">
                            <span>and</span>
                            <span className="bg-[#0052FF] text-white rounded-2xl px-2 md:px-4 py-1">
                                live abroad
                            </span>
                        </div>

                        {/* "made simple." */}
                        <p className="text-2xl md:text-5xl lg:text-7xl font-black text-gray-900 mt-2">
                            made simple.
                        </p>
                    </div>

                    {/* Envelope CTA block with float animation */}
                    <div className="relative ml-14  flex flex-col  items-start animate-float-slow">
                        {/* Handwritten label */}
                        <div className="flex items-center gap-1  ml-4 ">
                            <span
                                className="text-[#0052FF] text-base lg:text-4xl    heading-special"
                            >
                                Upload your
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mb-1 ml-4">
                            <span
                                className="text-[#0052FF] text-base lg:text-4xl    heading-special"
                            >
                                Resume once
                            </span>
                        </div>
                        {/* Curved arrow SVG */}
                        <svg
                            className="ml-10 mb-1"
                            width="40"
                            height="36"
                            viewBox="0 0 40 36"
                            fill="none"
                        >
                            <path
                                d="M6 4 C10 20, 24 28, 32 32"
                                stroke="#111"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <path
                                d="M28 30 L32 32 L30 27"
                                stroke="#111"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        {/* Envelope + button */}
                        <div className="relative">
                            <Image
                                src="/images/envelop.webp"
                                alt="Upload resume"
                                width={210}
                                height={160}
                                className="object-contain drop-shadow-xl h-32 md:h-52"
                            />

                            {/* CLICK HERE button */}
                            <button className="absolute -right-32 bottom-4 hidden md:flex items-center gap-2 bg-[#E01E5A] hover:bg-[#c41a4f] active:scale-95 transition-all duration-150 text-white font-extrabold text-sm tracking-wider rounded-full px-4 py-2.5 shadow-lg cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="20"
                                    viewBox="0 0 34 32"
                                    fill="none"
                                    className="flex-shrink-0"
                                >
                                    <g clipPath="url(#clip0_3_754)">
                                        <path
                                            d="M0 4.8536L16.8369 29.4872L16.6392 15.7838L30.419 9.76124L0 4.8536Z"
                                            fill="white"
                                            stroke="white"
                                            strokeWidth="2.08422"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3_754">
                                            <rect
                                                width="29.1791"
                                                height="27.0908"
                                                fill="white"
                                                transform="translate(0 4.85306) rotate(-9.57391)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                CLICK HERE
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg border border-white z-10">
                    <p className="text-sm text-[#0052FF]/60 font-medium mb-3 tracking-wide">
                        The largest network of opportunities globally.
                    </p>
                    <div className="flex gap-3">
                        {[
                            { value: "1000+", label: "COLLEGES" },
                            { value: "50K+", label: "JOBS" },
                            { value: "25K+", label: "VERIFIED ROOMS" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex-1 border border-gray-300 rounded-xl px-2 py-2 text-center shadow-xl"
                            >
                                <p className="text-[#0052FF] font-extrabold text-2xl md:text-3xl leading-tight">
                                    {stat.value}
                                </p>
                                <p className="text-[9px] text-gray-400 font-semibold tracking-widest mt-0.5">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* RIGHT — Headline + CTA */}

            </div>
            {/* Tailwind keyframes injected via style tag */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3.6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4.5s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}