// components/Footer.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    Mail,
    Facebook,
    Instagram,
    Linkedin,
    ChevronRight,
    ShieldCheck,
    Lock,
    Globe,
    Star,
    Trophy,
    Clock,
    Headset,
    MessageCircle,
    CheckCircle,
    Globe2,
} from "lucide-react";
// import logo from "../../assets/acolyte living white-logo.png";
import { usePathname } from "next/navigation";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const pathname = usePathname();

    const hideHeader = pathname?.startsWith("/partner-dashboard");

    if (hideHeader) return null;

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubscribed(true);
            setEmail("");
        }, 1000);
    };

    const currentYear = new Date().getFullYear();

    // Updated contact info
    const contactInfo = [
        {
            type: "phone",
            label: "24/7 Support",
            value: "+91 90330 39207",
            href: "tel:+919033039207",
            icon: <Phone className="w-6 h-6 text-primary-400" />,
            available: "Available 24/7",
        },
        {
            type: "email",
            label: "Email Us",
            value: "support@acolyteliving.com",
            href: "mailto:support@acolyteliving.com",
            icon: <Mail className="w-6 h-6 text-primary-400" />,
            available: "Response within 2 hours",
        },
        {
            type: "whatsapp",
            label: "WhatsApp",
            value: "+91-90332-12685",
            href: "https://wa.me/919033049736",
            icon: <MessageCircle className="w-6 h-6 text-primary-400" />,
            available: "Instant messaging",
        },
    ];

    // ✅ Only the requested social links
    const socialLinks = [
        {
            name: "Website",
            href: "https://acolyteliving.com/",
            icon: <Globe2 className="w-5 h-5" />,
        },
        {
            name: "Facebook",
            href: "https://www.facebook.com/acolyteliving.uk",
            icon: <FiFacebook className="w-5 h-5" />,
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/acolyte.living?igsh=aGpqcXZibHJ4YXBn",
            icon: <FiInstagram className="w-5 h-5" />,
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/company/106801948/admin/dashboard/",
            icon: <FiLinkedin className="w-5 h-5" />,
        },
    ];

    const awards = [
        {
            name: "Best Student Accommodation 2024",
            icon: <Trophy className="w-6 h-6 text-yellow-500" />,
        },
        // { name: '100% Verified Listings', icon: <ShieldCheck className="w-6 h-6 text-green-500" /> },
        // { name: 'Lowest Price Guarantee', icon: <Star className="w-6 h-6 text-yellow-500" /> },
        {
            name: "250+ Global Cities",
            icon: <Globe className="w-6 h-6 text-blue-500" />,
        },
    ];

    const keyFeatures = [
        "250+ Global Cities",
        "Instant & Easy Bookings",
        // '100% Verified Listings',
        "24/7 Professional Service",
        "Lowest Price Guarantee",
        // 'All-inclusive Bills'
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Properties", href: "/" },
        { name: "About Us", href: "/" },
        { name: "Partners", href: "/" },
        { name: "Blogs", href: "/" },
        { name: "Contact", href: "/" },
    ];

    const legalLinks = [
        { name: "Blog", href: "/" },
        { name: "Terms of Service", href: "/" },
        { name: "Privacy Policy", href: "/" },
        { name: "Refund Policy", href: "/" },
    ];

    return (
        <footer className="bg-gradient-to-b from-[#052659] to-[#0C0818] text-white">


            {/* Main Footer Content */}
            <div className="py-6 sm:py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Company Info */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="flex items-center gap-3 mb-6 group">
                                <Image src={"/images/white-logo.webp"} alt="Acolyte Living" height={60} className="w-24 h-auto object-contain lg:w-[140px]" width={120} />
                            </Link>

                            <p className="text-white/80 leading-relaxed mb-6 font-['Red_Hat_Display']">
                                Your global education journey starts with the right home. Find
                                premium student accommodation in 250+ cities worldwide with
                                verified listings and 24/7 support.
                            </p>

                            {/* Key Features */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-white mb-3 flex items-center gap-2 font-['Red_Hat_Mono']">
                                    <Star className="w-4 h-4 text-[#0B52BF]" />
                                    Why Choose Acolyte Abroad
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {keyFeatures.map((feature, index) => (
                                        <span
                                            key={index}
                                            className="bg-white/5 backdrop-blur-sm text-xs text-white/80 px-3 py-1.5 rounded-full border border-white/10 font-['Red_Hat_Display']"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Contact Information + Social */}
                        <div className="lg:col-span-2">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-['Red_Hat_Mono']">
                                <Headset className="w-5 h-5 text-[#0B52BF]" />
                                24/7 Student Support
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {contactInfo.map((contact, index) => (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors duration-300 group border border-white/10"
                                        {...(contact.href.startsWith("http")
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                    >
                                        <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200 text-[#0B52BF]">
                                            {contact.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium text-white group-hover:text-[#0B52BF] transition-colors duration-200 font-['Red_Hat_Mono']">
                                                {contact.label}
                                            </div>
                                            <div className="text-white/80 text-sm truncate font-['Red_Hat_Display']">
                                                {contact.value}
                                            </div>
                                            <div className="text-xs text-white/60 mt-1 flex items-center gap-1 font-['Red_Hat_Display']">
                                                <Clock className="w-3 h-3" />
                                                {contact.available}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4 className="font-semibold text-white mb-4 flex items-center gap-2 font-['Red_Hat_Mono']">
                                    <Globe className="w-4 h-4 text-[#0B52BF]" />
                                    Connect With Us
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 px-4 py-2.5 rounded-lg transition-colors duration-300 group border border-white/10"
                                            aria-label={`Follow us on ${social.name}`}
                                        >
                                            <span className="text-[#0B52BF] group-hover:scale-110 transition-transform duration-200">
                                                {social.icon}
                                            </span>
                                            <span className="text-sm text-white/80 group-hover:text-white transition-colors duration-200 font-['Red_Hat_Display']">
                                                {social.name}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 md:block hidden">
                        <h4 className="font-semibold text-white mb-3 font-['Red_Hat_Mono']">
                            Quick Links
                        </h4>
                        <ul className="list-disc list-inside text-sm text-white/80 font-['Red_Hat_Display'] flex gap-3">
                            {navLinks.map((link) => (
                                <li key={link.name} className="first:list-none">
                                    <Link
                                        href={link.href}
                                        className="hover:text-[#0B52BF] transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 py-8 max-w-7xl mx-auto px-4">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="text-center lg:text-left">
                            <p className="text-white/60 text-sm font-['Red_Hat_Display']">
                                © {currentYear} ACOLYTE ABROAD PRIVATE LIMITED. All rights
                                reserved.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-3">
                                {legalLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="text-white/60 hover:text-[#0B52BF] text-sm transition-colors duration-200 font-['Red_Hat_Display']"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-white/60 font-['Red_Hat_Display']">
                                <ShieldCheck className="w-5 h-5 text-[#0B52BF]" />
                                <span className="text-sm">SSL Secured</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/60 font-['Red_Hat_Display']">
                                <Lock className="w-5 h-5 text-[#0B52BF]" />
                                <span className="text-sm">Data Protected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;