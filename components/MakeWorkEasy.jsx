"use client";

import Image from 'next/image'
import React from 'react'

const MakeWorkEasy = () => {
    const cards = [
        {
            src: "/images/live-abroad.webp",
            caption: "Live Abroad",
            rotation: "-rotate-12 md:-rotate-12",
            translate: "translate-y-4 md:translate-y-8",
            zIndex: "z-10",
        },
        {
            src: "/images/study.webp",
            caption: "Study",
            rotation: "-rotate-6 md:-rotate-6",
            translate: "translate-y-1 md:translate-y-2",
            zIndex: "z-20",
        },
        {
            src: "/images/work.webp",
            caption: "Work",
            rotation: "rotate-2 md:rotate-2",
            translate: "-translate-y-2 md:-translate-y-4",
            zIndex: "z-30",
            active: true,
        },
        {
            src: "/images/live-abroad.webp",
            caption: "Live Abroad",
            rotation: "rotate-6 md:rotate-6",
            translate: "translate-y-2 md:translate-y-4",
            zIndex: "z-20",
        },
        {
            src: "/images/walking.webp",
            caption: "Live Abroad",
            rotation: "rotate-12 md:rotate-12",
            translate: "translate-y-6 md:translate-y-10",
            zIndex: "z-10",
        },
    ];

    return (
        <section className="relative bg-white py-16 md:py-24 overflow-hidden w-full flex flex-col items-center">
            {/* Header pill */}
            <div className="bg-[#0052FF] text-white px-5 py-2 rounded-full font-bold text-sm tracking-wide mb-12 inline-flex items-center gap-1.5 shadow-sm">
                <span className="opacity-70">#</span>
                <span>my workspace</span>
            </div>

            {/* Polaroid container */}
            <div className="relative flex flex-row items-center justify-start md:justify-center overflow-x-auto md:overflow-x-visible w-full px-8 md:px-4 mb-12 no-scrollbar scroll-smooth">
                <div className="flex flex-row items-center justify-start md:justify-center w-max md:w-full gap-2 md:gap-0 py-8 px-4">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`relative transition-all duration-300 hover:z-50 hover:scale-105 ${card.rotation} ${card.translate} ${card.zIndex} w-[140px] sm:w-[180px] md:w-[220px] flex-shrink-0 -mx-3 sm:-mx-4 md:-mx-5`}
                        >
                            <div className="bg-white p-2.5 pb-6 sm:p-3.5 sm:pb-9 md:p-4 md:pb-12 shadow-xl border border-gray-200 rounded-sm flex flex-col items-center">
                                <div className={`relative w-full aspect-square overflow-hidden bg-gray-50 ${card.active ? "border-[3px] md:border-4 border-[#0052FF]" : "border border-gray-100"}`}>
                                    <Image
                                        src={card.src}
                                        alt={card.caption}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 150px, 220px"
                                        priority={index < 3}
                                    />
                                </div>
                                <div className="mt-3 sm:mt-4 text-center">
                                    <span className="heading-special text-lg sm:text-xl md:text-2xl text-gray-800 font-bold select-none">
                                        {card.caption}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badge container with arrow */}
            <div className="relative mt-4 md:mt-8 z-40">
                {/* Handdrawn Arrow */}
                <div className="absolute -top-12 -right-8 md:-top-16 md:-right-10 rotate-[-15deg] md:rotate-0">
                    <svg width="45" height="45" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path 
                            d="M8 32 C 16 28, 22 22, 28 14 L 20 15 L 32 10 L 29 22 L 25 16 C 18 24, 12 30, 8 32 Z" 
                            fill="#F4C542" 
                            stroke="#000000" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* MAKING WORK EASY Badge */}
                <div 
                    className="bg-[#F4C542] text-black font-extrabold text-lg md:text-2xl tracking-wider px-6 py-3.5 md:px-8 md:py-4.5 border-[2.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-3 rounded-2xl md:rounded-[20px] select-none"
                    style={{ fontFamily: 'Courier New, monospace' }}
                >
                    MAKING WORK EASY
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    )
}

export default MakeWorkEasy