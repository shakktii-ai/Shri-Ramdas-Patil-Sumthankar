import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  HiChartBar,
  HiLightningBolt,
  HiLocationMarker,
  HiUsers,
  HiExclamationCircle,
  HiBriefcase,
  HiSparkles,
  HiLogout,
  HiSwitchHorizontal,
  HiGlobeAlt
} from "react-icons/hi";
import { useElectionLanguage } from "@/context/ElectionLanguageContext";

export const ELECTION_NAV_LINKS = [
  {
    href: "/admin/election-analytics",
    label: "Executive & 2024 GE",
    marathi: "कार्यकारी सारांश व २०२४ निकाल",
    icon: HiChartBar,
  },
  {
    href: "/admin/election-analytics/daily-impact",
    label: "Daily Media & AC Impact",
    marathi: "थेट पडसाद व बातम्या",
    icon: HiLightningBolt,
    badge: { en: "Live", mr: "लाईव्ह" }
  },
  {
    href: "/admin/election-analytics/assembly-segments",
    label: "Assembly Segments (6 ACs)",
    marathi: "६ विधानसभा मतदारसंघ",
    icon: HiLocationMarker
  },
  {
    href: "/admin/election-analytics/demographics",
    label: "Caste & Demographics",
    marathi: "जातीय व सामाजिक रचना",
    icon: HiUsers
  },
  {
    href: "/admin/election-analytics/issues-demands",
    label: "Issues & Demands Radar",
    marathi: "२९ कळीचे प्रश्न व मागण्या",
    icon: HiExclamationCircle
  },
  {
    href: "/admin/election-analytics/economy",
    label: "Economy & Industry Profile",
    marathi: "आर्थिक, शेती व उद्योग",
    icon: HiBriefcase
  },
  {
    href: "/admin/election-analytics/strategic-plan",
    label: "Strategic Plan (Independent)",
    marathi: "अपक्ष विजयी रणनीती",
    icon: HiSparkles,
    highlight: true,
    badge: { en: "Strategy", mr: "अपक्ष" }
  }
];

export const ELECTION_PAGES = ELECTION_NAV_LINKS;

export default function ElectionSidebar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { lang, setLanguage, isMr, isEn, t } = useElectionLanguage();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
      localStorage.removeItem("username");
      localStorage.removeItem("allowedPages");
      localStorage.removeItem("activePortal");
    }
    router.push("/login");
  };

  return (
    <aside
      className={`flex flex-col bg-white text-slate-800 min-h-screen border-r border-slate-200 shadow-sm transition-all duration-300 z-40 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Candidate Profile Header */}
      <div
        className={`flex border-b border-slate-100 ${
          collapsed ? "flex-col-reverse items-center gap-3 py-4 px-2" : "items-center gap-3 px-4 py-4"
        }`}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400 shadow-sm flex-shrink-0">
          <Image
            src="/Shri_Ramdas_patil.jpeg"
            alt="Shri Ramdas Patil Sumthankar"
            fill
            className="object-cover"
          />
        </div>
        {!collapsed && (
          <div className="leading-tight min-w-0 flex-1">
            <p className="text-slate-900 font-extrabold text-sm truncate" title={isMr ? "श्री रामदास पाटील सुमठाणकर" : "Shri Ramdas Patil Sumthankar"}>
              {isMr ? "रामदास पाटील सुमठाणकर" : "Ramdas Patil Sumthankar"}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="px-1.5 py-0.2 rounded-md text-[9px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                {isMr ? "अपक्ष उमेदवार" : "Independent"}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {isMr ? "नांदेड लोकसभा" : "Nanded PC"}
              </span>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors flex-shrink-0 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Language Switcher Pill in Sidebar */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setLanguage("mr")}
              className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isMr
                  ? "bg-white text-orange-600 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>मराठी</span>
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isEn
                  ? "bg-white text-orange-600 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>English</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Links (7 Dedicated Election Pages) */}
      <nav className="flex-1 py-3 space-y-1.5 px-2.5 overflow-y-auto scrollbar-none">
        {!collapsed && (
          <div className="px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            {t("navTitle")}
          </div>
        )}

        {ELECTION_NAV_LINKS.map((link) => {
          const isActive = router.pathname === link.href;
          const Icon = link.icon;
          const displayLabel = isMr ? link.marathi : link.label;
          const badgeText = link.badge ? (typeof link.badge === "object" ? link.badge[lang] : link.badge) : null;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-xl text-xs font-bold transition-all duration-200 group ${
                collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
              } ${
                isActive
                  ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 border border-orange-200/80 font-extrabold shadow-2xs"
                  : link.highlight
                  ? "bg-amber-50/70 text-amber-900 hover:bg-amber-100/70 border border-amber-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
              title={collapsed ? displayLabel : ""}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  isActive
                    ? "text-orange-600"
                    : link.highlight
                    ? "text-amber-600"
                    : "text-slate-400 group-hover:text-slate-700"
                }`}
              />

              {!collapsed && (
                <div className="leading-tight min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate">{displayLabel}</span>
                    {badgeText && (
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase ${
                          isActive
                            ? "bg-orange-500 text-white"
                            : badgeText === "Live" || badgeText === "लाईव्ह"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {badgeText}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Switch to Visitor Portal & Logout Footer */}
      <div className="px-2.5 pb-4 border-t border-slate-100 pt-3 space-y-1.5">
        {/* Switch to Visitor Portal Button */}
        <Link
          href="/admin"
          className={`flex items-center rounded-xl text-xs font-bold transition-all duration-200 bg-orange-500 hover:bg-orange-600 text-white shadow-xs p-2.5 cursor-pointer ${
            collapsed ? "justify-center" : "gap-2.5 px-3"
          }`}
          title={collapsed ? t("switchVisitor") : ""}
        >
          <svg className="w-4 h-4 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {!collapsed && <span className="truncate">{t("switchVisitor")}</span>}
        </Link>

        {/* Portal Select Link */}
        <Link
          href="/admin/portal-select"
          className={`flex items-center rounded-xl text-xs font-semibold text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-all p-2 cursor-pointer ${
            collapsed ? "justify-center" : "gap-2 px-3"
          }`}
          title={collapsed ? t("switchPortal") : ""}
        >
          <HiSwitchHorizontal className="w-4 h-4 flex-shrink-0 text-slate-400" />
          {!collapsed && <span>{t("switchPortal")}</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? t("logout") : ""}
        >
          <HiLogout className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>{t("logout")}</span>}
        </button>
      </div>
    </aside>
  );
}
