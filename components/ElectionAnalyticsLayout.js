import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiExclamationCircle,
  HiGlobeAlt,
  HiSparkles
} from "react-icons/hi";

export default function ElectionAnalyticsLayout({
  children,
  pageTitle = "Election Intelligence Portal",
  activePage = "/admin/election-analytics",
  dbStatus = { connected: true, source: "MongoDB Atlas (visitorpatil)", lastSync: null }
}) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      const user = localStorage.getItem("username") || "";
      const allowedStr = localStorage.getItem("allowedPages");
      const allowedPages = allowedStr ? JSON.parse(allowedStr) : [];

      if (!role) {
        router.push("/login");
        return;
      }

      const electionPerm =
        role === "admin" ||
        user === "admin" ||
        (Array.isArray(allowedPages) && allowedPages.includes("/admin/election-analytics"));

      if (!electionPerm) {
        setHasAccess(false);
        router.replace("/admin");
      }
    }
  }, [router]);

  if (!isClient) return null;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-red-200 shadow-lg text-center space-y-4 max-w-md">
          <HiExclamationCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Access Denied (प्रवेश नाकारला)</h2>
          <p className="text-xs text-slate-600">
            आपल्या खात्याला निवडणूक विश्लेषण पोर्टलचा (Election Analytics) ऍक्सेस नाही. कृपया मुख्य ॲडमिनशी संपर्क साधा.
          </p>
          <Link
            href="/admin"
            className="inline-block px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-xs"
          >
            अभ्यागत पोर्टलवर परत जा
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle} – Shri Ramdas Patil Sumthankar</title>
        <meta
          name="description"
          content="Independent Candidate Electoral Intelligence Portal for Shri Ramdas Patil Sumthankar - Nanded Lok Sabha."
        />
      </Head>

      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Compact Top Header Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
          <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <HiSparkles className="w-4 h-4 text-amber-500" />
              </span>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {pageTitle.split("–")[0].trim()}
                </h1>
                <p className="text-[11px] text-slate-500">
                  श्री रामदास पाटील सुमठाणकर (अपक्ष उमेदवार) • १६-नांदेड लोकसभा मतदारसंघ
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>MongoDB Atlas Live</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
          श्री रामदास पाटील सुमठाणकर • स्वतंत्र निवडणूक रणनीती व विश्लेषण प्रणाली • नांदेड लोकसभा (महाराष्ट्र)
        </footer>
      </div>
    </>
  );
}
