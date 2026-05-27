"use client";
import React from 'react'

import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiArrowUpRight } from "react-icons/fi";
import ResumeLeadPopup from "./Resumeleadpopup";

export default function Navbar() {
    const [popupOpen, setPopupOpen] = React.useState(false);
    return (
        <header className="w-full border-t-4 border-blue-500 bg-[#f5f5f5]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">

                {/* Left Section */}
                <div className="flex items-center gap-4 lg:gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex flex-col leading-none">
                        <Image src={"/images/Abroad-blue-logo.webp"} alt="Acolyte Abroad" height={60} className="w-24 h-auto object-contain lg:w-[110px]" width={120} />
                    </Link>
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm">
                        <FiSearch className="mr-2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search paths..."
                            className="w-[220px] bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Center Nav */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="/#job-seekers" className="transition hover:text-black">
                        Jobs Abroad
                    </Link>

                    <Link href="/#job-seekers" className="transition hover:text-black">
                        Jobs
                    </Link>

                    <Link href="/#for-living" className="transition hover:text-black">
                        Accommodation
                    </Link>

                    <Link href="/#for-students" className="transition hover:text-black">
                        Destinations
                    </Link>
                </nav>

                {/* Right Button */}
                <button
                    onClick={() => setPopupOpen(true)}
                    className="flex items-center gap-2 rounded-full bg-[#eef2ff] px-5 py-2.5 text-sm font-semibold text-[#1d4ed8] transition hover:bg-[#dbe4ff] cursor-pointer"
                >
                    Get Started
                    <FiArrowUpRight className="text-base" />
                </button>
            </div>

            {/* Mobile Search */}


            {popupOpen && <ResumeLeadPopup
                isOpen={popupOpen}          // boolean — controlled by parent useState
                onClose={() => setPopupOpen(false)}  // called on backdrop click or X
                source="homepage_cta"       // optional CRM source tag
            />}
        </header>
    );
}