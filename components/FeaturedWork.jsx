"use client";

import Image from "next/image";
import ScrollStack from "./ScrollStack";

const features = [
  "AI-MATCHED COLLEGE SHORTLISTING",
  "SOP, LOR & APPLICATION GUIDANCE",
  "UNIVERSITY DOCUMENTATION SUPPORT",
];
const jobSeekers = [
  "Resume-matched jobs from employers",
  "Work visa eligibility check",
  "Interview prep & optimization",
];
const forLiving = [
  " Verified student housing",
  "Rooms, shared flats & studios",
  "Lease help & move-in checklist",
];
export default function FeaturedWorks() {
  return (
    <section className="min-h-screen bg-[#f8fbff] flex flex-col items-center py-12 md:py-16 px-4">
      {/* Heading */}
      <h2 className="text-5xl md:text-7xl font-black text-black text-center leading-tight tracking-tight mb-4">
        FEATURED
        <br />
        WORKS
      </h2>

      {/* Sticky note subtitle */}
      <div
        className="bg-[#F5DDA1] px-5 py-4 mb-12 md:mb-4 text-center text-sm md:text-base text-black leading-snug shadow-md -rotate-3"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        One platform. Every solution.
        <br />
        For everyone, everywhere.
      </div>

      <ScrollStack className="w-full max-w-6xl" useWindowScroll={true}>
        {/* Card 1*/}
        <div className="scroll-stack-card w-full relative">
          {/* Blue background card with folder tab using clip-path */}
          <div className="relative w-full">
            {/* Folder tab */}
            <div
              className="absolute top-0 left-0 bg-[#0052FF] h-[58px] md:h-[74px] w-[150px] md:w-[210px] text-white text-xs md:text-sm lg:text-base font-bold tracking-widest px-4 z-10"
              style={{
                clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",

                top: "-58px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span className="relative md:bottom-2"> FOR STUDENTS</span>
            </div>

            {/* Main blue card */}
            <div
              className="bg-[#0052FF] w-full overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(180px) 0, calc(180px + 0px) 0px, 100% 0, 100% 100%, 0 100%)",
                borderRadius: "0 4px 4px 4px",
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Feature list */}
                <div className="flex flex-col gap-3 p-6 md:p-8 flex-1 ">
                  {features.map((feature, i) => (
                    <div key={i}>
                      <div
                        className="bg-black"
                        style={{
                          clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",
                          width: "70px",
                          top: "-10px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                      <div
                        className="bg-black text-white text-xs md:text-base w-fit font-bold tracking-widest px-4 py-3"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        {feature}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Image */}
                <div className="relative w-full md:w-1/2 h-[280px] md:h-[480px] lg:h-[652px]  p-4">
                  <Image
                    src="/images/studentimg1.webp"
                    alt="Students using laptop"
                    fill
                    className="object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="scroll-stack-card w-full relative">
          {/* Blue background card with folder tab using clip-path */}
          <div className="relative w-full">
            {/* Folder tab */}
            <div
              className="absolute -top-12 md:-top-[58px] left-20 md:left-40 lg:left-52 bg-[#b7ceff] h-[58px] md:h-[74px] w-[240px] md:w-[380px] text-black text-xs md:text-sm lg:text-base font-bold text-center tracking-widest px-4 z-10"
              style={{
                clipPath: "polygon(21% 10%, 77% 10%, 90% 90%, 10% 90%)",

                display: "flex",
                alignItems: "center",
              }}
            >
              <span className="relative md:bottom-2 left-1/6 md:left-1/4">
                FOR JOB SEEKERS
              </span>
            </div>

            {/* Main blue card */}
            <div
              className="bg-[#b7ceff] w-full overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(180px) 0, calc(180px + 0px) 0px, 100% 0, 100% 100%, 0 100%)",
                borderRadius: "0 4px 4px 4px",
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Feature list */}
                <div className="flex flex-col gap-3 p-6 md:p-8 flex-1 ">
                  {jobSeekers.map((feature, i) => (
                    <div key={i}>
                      <div
                        className="bg-[#0052FF]"
                        style={{
                          clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",
                          width: "70px",
                          top: "-10px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                      <div
                        className="bg-[#0052FF] text-white text-xs md:text-base w-fit lg:w-110 font-bold tracking-widest px-4 py-3 uppercase"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        {feature}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Image */}
                <div className="relative w-full md:w-1/2 h-[280px] md:h-[480px] lg:h-[652px]  p-4">
                  <Image
                    src="/images/studentimg2.webp"
                    alt="Students using laptop"
                    fill
                    className="object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="scroll-stack-card w-full relative">
          {/* Blue background card with folder tab using clip-path */}
          <div className="relative w-full">
            {/* Folder tab */}
            <div
              className="absolute -top-12 md:-top-[58px] left-[45%] lg:left-1/2 bg-[#0052FF] h-[58px] md:h-[74px] w-52 md:w-[380px] text-white text-xs md:text-sm lg:text-base font-bold text-center tracking-widest px-4 z-10"
              style={{
                clipPath: "polygon(21% 10%, 77% 10%, 90% 90%, 10% 90%)",

                display: "flex",
                alignItems: "center",
              }}
            >
              <span className="relative md:bottom-2 left-1/4 md:left-1/3">
                {" "}
                FOR LIVING
              </span>
            </div>

            {/* Main blue card */}
            <div
              className="bg-[#0052FF] w-full overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(180px) 0, calc(180px + 0px) 0px, 100% 0, 100% 100%, 0 100%)",
                borderRadius: "0 4px 4px 4px",
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: Feature list */}
                <div className="flex flex-col gap-3 p-6 md:p-8 flex-1 ">
                  {forLiving.map((feature, i) => (
                    <div key={i}>
                      <div
                        className="bg-black"
                        style={{
                          clipPath: "polygon(0 0, 85% 0, 100% 100%, 0% 100%)",
                          width: "70px",
                          top: "-10px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                      <div
                        className="bg-black text-white text-xs md:text-base w-fit font-bold tracking-widest px-4 py-3 uppercase"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        {feature}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Image */}
                <div className="relative w-full md:w-1/2 h-[280px] md:h-[480px] lg:h-[652px]  p-4">
                  <Image
                    src="/images/studentimg3.webp"
                    alt="Students using laptop"
                    fill
                    className="object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollStack>
    </section>
  );
}
