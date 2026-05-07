import EcosystemSection from "@/components/Ecosystemsection";
import FeaturedWorks from "@/components/FeaturedWork";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MakeWorkEasy from "@/components/MakeWorkEasy";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <MakeWorkEasy />
      <FeaturedWorks />
      <EcosystemSection />
      <Footer />
    </>
  );
};

export default page;
