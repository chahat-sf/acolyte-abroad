"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    Check,
    CheckCheck,
    CheckCircle2,
    ChevronDown,
    GraduationCap,
    Loader2,
    Lock,
    Upload,
    X,
    Zap,
} from "lucide-react";
import { IoMdCloseCircleOutline } from "react-icons/io";

// ─── Constants ───────────────────────────────────────────────────────────────

const PORTAL_LEAD_API_URL = "https://crm.acolyteliving.com/api/portal-lead";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const PHONE_COUNTRY_CODES = [
    { code: "+44", label: "+44 (UK)" },
    { code: "+1", label: "+1 (US/CA)" },
    { code: "+91", label: "+91 (IN)" },
    { code: "+86", label: "+86 (CN)" },
    { code: "+61", label: "+61 (AU)" },
    { code: "+971", label: "+971 (AE)" },
    { code: "+234", label: "+234 (NG)" },
    { code: "+33", label: "+33 (FR)" },
    { code: "+49", label: "+49 (DE)" },
    { code: "+65", label: "+65 (SG)" },
    { code: "+60", label: "+60 (MY)" },
    { code: "+82", label: "+82 (KR)" },
    { code: "+81", label: "+81 (JP)" },
    { code: "+92", label: "+92 (PK)" },
    { code: "+880", label: "+880 (BD)" },
];

const UNIVERSITIES = [
    "King's College London",
    "University of Manchester",
    "University of Edinburgh",
    "University of Birmingham",
    "University of Leeds",
    "University College London",
    "University of Nottingham",
    "University of Bristol",
    "University of Glasgow",
];

// A minimal list — swap out for your full COUNTRY_SELECT_OPTIONS import
const COUNTRIES = [
    { value: "gb", label: "United Kingdom" },
    { value: "in", label: "India" },
    { value: "us", label: "United States" },
    { value: "au", label: "Australia" },
    { value: "ng", label: "Nigeria" },
    { value: "cn", label: "China" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "pk", label: "Pakistan" },
    { value: "bd", label: "Bangladesh" },
    { value: "ca", label: "Canada" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "sg", label: "Singapore" },
    { value: "my", label: "Malaysia" },
    { value: "other", label: "Other" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isAllowedFile(file) {
    const t = file.type;
    if (t === "application/pdf" || t === "image/jpeg" || t === "image/png") return true;
    return /\.(pdf|jpe?g|png)$/i.test(file.name);
}

async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result;
            if (typeof data !== "string") { reject(new Error("Could not read file")); return; }
            const comma = data.indexOf(",");
            resolve(comma >= 0 ? data.slice(comma + 1) : data);
        };
        reader.onerror = () => reject(reader.error ?? new Error("Could not read file"));
        reader.readAsDataURL(file);
    });
}

function formatPhone(code, national) {
    const n = national.replace(/\s+/g, "").trim();
    return n ? `${code}${n}` : "";
}

// ─── Toast (lightweight, no dependency) ──────────────────────────────────────

function useToast() {
    const [toasts, setToasts] = useState([]);
    const add = useCallback((msg, type = "info") => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => [...prev, { id, msg, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);
    return {
        toasts,
        error: msg => add(msg, "error"),
        success: msg => add(msg, "success"),
    };
}

function ToastList({ toasts }) {
    if (!toasts.length) return null;
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`px-5 py-3 rounded-xl shadow-xl text-xs md:text-sm font-semibold text-white backdrop-blur-md
            ${t.type === "error" ? "bg-red-500/90" : "bg-emerald-500/90"}`}
                >
                    {t.msg}
                </div>
            ))}
        </div>
    );
}

// ─── Main Popup Component ─────────────────────────────────────────────────────

/**
 * ResumeLeadPopup
 *
 * Props:
 *   isOpen  {boolean}  – controlled by parent via useState
 *   onClose {function} – called when user closes the popup
 *   source  {string}   – optional source tag sent to CRM (default "resume_popup")
 */
export default function ResumeLeadPopup({ isOpen, onClose, source = "resume_popup" }) {
    const { toasts, error, success } = useToast();
    const fileInputRef = useRef(null);
    const detectTimer = useRef(null);

    const [files, setFiles] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const [detectedUni, setDetectedUni] = useState(null);
    const [done, setDone] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneCode, setPhoneCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [university, setUniversity] = useState("");
    const [country, setCountry] = useState("");
    const [intake, setIntake] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Reset form when popup closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setFiles([]); setDetectedUni(null); setDone(false);
                setName(""); setEmail(""); setPhone(""); setUniversity("");
                setCountry(""); setIntake(""); setPhoneCode("+91");
                if (detectTimer.current) clearTimeout(detectTimer.current);
            }, 300);
        }
    }, [isOpen]);

    // Simulate university detection when first file is added
    useEffect(() => {
        if (detectTimer.current) clearTimeout(detectTimer.current);
        const first = files[0];
        if (!first) { setDetectedUni(null); setUniversity(""); return; }
        setDetectedUni(null); setUniversity("");
        detectTimer.current = setTimeout(() => {
            const uni = UNIVERSITIES[Math.floor(Math.random() * UNIVERSITIES.length)];
            setDetectedUni(uni);
            setUniversity(uni);
        }, 1200);
        return () => clearTimeout(detectTimer.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files[0]?.name, files[0]?.size]);

    const addFiles = useCallback((incoming) => {
        const list = Array.from(incoming);
        setFiles(prev => {
            const next = [...prev];
            for (const f of list) {
                if (!isAllowedFile(f)) { error(`${f.name} is not supported (PDF, JPG, PNG only).`); continue; }
                if (f.size > MAX_FILE_BYTES) { error(`${f.name} exceeds 10 MB.`); continue; }
                if (next.length >= MAX_FILES) { error(`Max ${MAX_FILES} files allowed.`); break; }
                next.push(f);
            }
            return next;
        });
    }, [error]);

    const removeFile = (i) => {
        setFiles(prev => prev.filter((_, idx) => idx !== i));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async () => {
        if (submitting) return;
        const n = name.trim(), em = email.trim(), uni = university.trim();
        const national = phone.replace(/\s+/g, "").trim();
        const ph = formatPhone(phoneCode, phone);

        if (files.length === 0) return error("Please upload your resume.");
        if (!n || !em) return error("Please enter your name and email.");
        if (!national) return error("Please enter your mobile number.");
        if (!uni) return error("Please enter your university.");
        if (!country) return error("Please select a country.");
        if (!intake) return error("Please select an intake.");

        setSubmitting(true);
        try {
            const primary = files[0];
            const booking_completion = await fileToBase64(primary);
            const filename = primary.name || "resume";

            const additional_documents = await Promise.all(
                files.slice(1).map(async f => ({
                    document: await fileToBase64(f),
                    filename: f.name || "document",
                }))
            );

            const res = await fetch(PORTAL_LEAD_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: n,
                    email: em,
                    phone: ph,
                    university: uni,
                    country,
                    intake,
                    source,
                    booking_completion,
                    additional_documents,
                }),
            });

            const body = await res.json().catch(() => ({}));
            if (body?.status && body.status !== "success") throw new Error(body.message ?? "Request not accepted.");

            success("Resume submitted! Check your inbox within 24 hours.");
            setDone(true);
        } catch (err) {
            error(err?.message ?? "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return <ToastList toasts={toasts} />;

    return (
        <>
            <ToastList toasts={toasts} />

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Submit your resume"
                className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
            >
                <div
                    className="relative w-full max-w-xl rounded-[28px] bg-white shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
                    style={{ maxHeight: "90vh", scrollbarWidth: "none" }}
                    onClick={e => e.stopPropagation()}
                >


                    {/* Body */}
                    <div className="bg-slate-100 p-3 md:p-5 overflow-y-auto flex-1" style={{ scrollbarWidth: "none" }}>
                        {!done ? (
                            <>
                                {/* Heading */}
                                <div className="mb-4 text-center relative">
                                    <h2 className="text-xl md:text-2xl font-extrabold text-[#161D83] tracking-tight mb-2">
                                        Initialize your guide
                                    </h2>
                                    <div className="text-blue-800 text-lg md:text-xl absolute right-3 top-1/4 -translate-y-1/2 cursor-pointer" onClick={onClose}>
                                        <IoMdCloseCircleOutline />

                                    </div>

                                </div>

                                <div className="space-y-3 max-w-xl mx-auto">

                                    {/* Drop zone */}
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={e => { e.preventDefault(); setDragOver(false); }}
                                        onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files); }}
                                        className={`
                      border-2 border-dashed rounded-2xl py-3 px-3 text-center cursor-pointer transition-all duration-300 relative overflow-hidden
                      ${files.length > 0 ? "border-emerald-400 bg-emerald-50" : dragOver ? "border-blue-500 bg-blue-50" : "border-blue-300 bg-white"}
                    `}
                                    >
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            className="hidden"
                                            onChange={e => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ""; }}
                                        />
                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                            <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center shadow border transition-colors
                        ${files.length > 0 ? "bg-white border-emerald-300 text-emerald-600" : "bg-white border-slate-200 text-[#161D83]"}`}>
                                                {files.length > 0
                                                    ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                                                    : <Upload className="w-3.5 h-3.5" strokeWidth={2} />}
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-xs font-bold text-slate-900 leading-tight">
                                                    {files.length > 0 ? "Files added" : "Drop resume here"}
                                                </h3>
                                                <p className="text-[10px] text-slate-500 font-medium">
                                                    {files.length > 0 ? "Click to add more (max 5, 10 MB each)." : "PDF, JPG, or PNG"}
                                                </p>
                                            </div>
                                            <span className="ml-auto inline-block bg-[#161D83] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md cursor-pointer hover:bg-blue-900 transition-colors active:scale-95 shrink-0">
                                                Browse
                                            </span>
                                        </div>
                                    </div>

                                    {/* File list */}
                                    {files.length > 0 && (
                                        <ul className="space-y-1.5">
                                            {files.map((f, i) => (
                                                <li key={`${i}-${f.name}`} className="flex items-center justify-between gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                                                            <Check className="w-3 h-3" strokeWidth={2.5} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                                <p className="truncate text-xs font-bold text-slate-900">{f.name}</p>
                                                                {i === 0 && (
                                                                    <span className="shrink-0 rounded bg-emerald-600/15 px-1 py-0.5 text-[8px] font-black uppercase tracking-widest text-emerald-800">
                                                                        Primary
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[10px] text-slate-500">{(f.size / 1024 / 1024).toFixed(1)} MB</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(i)}
                                                        className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-500 hover:bg-white hover:text-red-500 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Detected uni banner */}
                                    {detectedUni && (
                                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-slate-700 px-3 py-2 rounded-xl text-xs">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                <GraduationCap className="w-3 h-3 text-[#161D83]" strokeWidth={2} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-blue-400 leading-none mb-0.5">Target Locked</p>
                                                <p className="text-xs text-slate-700">Generating guide for <strong className="text-slate-900">{detectedUni}</strong>.</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Name + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label htmlFor="p-name" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                                            <input
                                                id="p-name" type="text" value={name} onChange={e => setName(e.target.value)}
                                                placeholder="e.g. Jane Doe" autoComplete="name"
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs md:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label htmlFor="p-email" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                            <input
                                                id="p-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                                                placeholder="jane@example.com" autoComplete="email"
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs md:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        {/* Phone */}
                                        <div className="space-y-1">
                                            <span id="p-phone-label" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</span>
                                            <div className="flex w-full overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-blue-500 transition-colors">
                                                <div className="relative flex shrink-0 border-r border-slate-200">
                                                    <select
                                                        value={phoneCode} onChange={e => setPhoneCode(e.target.value)}
                                                        aria-labelledby="p-phone-label"
                                                        className="min-w-[1rem] cursor-pointer appearance-none bg-white  pl-2 pr-2 text-xs font-medium text-slate-900 focus:outline-none"
                                                    >
                                                        {PHONE_COUNTRY_CODES.map(r => (
                                                            <option key={r.code} value={r.code}>{r.label}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" strokeWidth={2} />
                                                </div>
                                                <input
                                                    type="tel" inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)}
                                                    placeholder="7XXX XXX XXX" aria-labelledby="p-phone-label"
                                                    className="flex-1 min-w-0 bg-white px-4 py-2 text-xs md:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none border-0"
                                                />
                                            </div>
                                        </div>

                                        {/* University */}


                                    </div>
                                    {/* Country + Intake */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5 relative">
                                            <label htmlFor="p-country" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Country</label>
                                            <select
                                                id="p-country" value={country} onChange={e => setCountry(e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs md:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select country</option>
                                                {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute right-4 bottom-3.5 w-4 h-4 text-slate-500" strokeWidth={2} />
                                        </div>
                                        <div className="space-y-1.5 relative">
                                            <label htmlFor="p-intake" className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Intake</label>
                                            <select
                                                id="p-intake" value={intake} onChange={e => setIntake(e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs md:text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select intake</option>
                                                <option value="sep-2026">September 2026</option>
                                                <option value="jan-2027">January 2027</option>
                                                <option value="sep-2027">September 2027</option>
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute right-4 bottom-3.5 w-4 h-4 text-slate-500" strokeWidth={2} />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="pb-2">
                                        <button
                                            type="button"
                                            disabled={submitting}
                                            onClick={handleSubmit}
                                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:pointer-events-none text-white font-black py-4 px-8 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 text-xs md:text-[13px] uppercase tracking-widest flex items-center justify-center gap-2"
                                        >
                                            {submitting
                                                ? <><Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} /> Submitting</>
                                                : <><span>Submit</span><Zap className="w-4 h-4" strokeWidth={2} /></>}
                                        </button>

                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Success state */
                            <div className="text-center py-16 flex flex-col items-center justify-center min-h-[400px]">
                                <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-7 relative">
                                    <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-spin" style={{ animationDuration: "4s" }} />
                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                        <CheckCheck className="w-8 h-8" strokeWidth={2} />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Guide Generation Initiated</h3>
                                <p className="text-xs md:text-sm text-slate-500 font-medium max-w-sm mx-auto mb-7 leading-relaxed">
                                    Our system is compiling your custom dossier. It will be dispatched to your email within the next 24 hours.
                                </p>
                                <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3.5 shadow-sm mb-6">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs md:text-sm font-bold text-slate-700">
                                        Dispatching to: <span className="text-slate-900">{email.trim() || "your email"}</span>
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="inline-flex items-center gap-2 text-[#161D83] font-black text-xs md:text-sm uppercase tracking-widest hover:gap-3 transition-all"
                                >
                                    Close <ArrowRight className="w-4 h-4" strokeWidth={2} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


