import React, { useState, useEffect, useMemo } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import {
  HiExclamationCircle,
  HiSearch,
  HiCheckCircle,
  HiLocationMarker,
  HiSparkles,
  HiFilter,
  HiClock,
  HiOfficeBuilding,
  HiLightningBolt
} from "react-icons/hi";
import { useElectionLanguage, SECTOR_TRANSLATIONS } from "@/context/ElectionLanguageContext";

export default function IssuesDemandsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { lang, isMr, isEn, t } = useElectionLanguage();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/election-analytics/nanded");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Error loading issues data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const issuesList = data?.issuesAndDemands || [];

  const sectors = useMemo(() => {
    return ["all", ...new Set(issuesList.map((i) => i.sector).filter(Boolean))];
  }, [issuesList]);

  const priorities = useMemo(() => {
    return ["all", ...new Set(issuesList.map((i) => i.priority).filter(Boolean))];
  }, [issuesList]);

  const filteredIssues = useMemo(() => {
    return issuesList.filter((item) => {
      const sectorMatch = selectedSector === "all" || item.sector === selectedSector;
      const priorityMatch = selectedPriority === "all" || item.priority === selectedPriority;
      const q = searchQuery.trim().toLowerCase();
      const queryMatch =
        !q ||
        (item.issue || "").toLowerCase().includes(q) ||
        (item.description || "").toLowerCase().includes(q) ||
        (item.sector || "").toLowerCase().includes(q) ||
        (item.concernedDepartment || "").toLowerCase().includes(q) ||
        (item.id || "").toLowerCase().includes(q);
      return sectorMatch && priorityMatch && queryMatch;
    });
  }, [issuesList, selectedSector, selectedPriority, searchQuery]);

  const getSectorLabel = (sec) => {
    if (sec === "all") return isMr ? `सर्व क्षेत्रे (${issuesList.length})` : `All Sectors (${issuesList.length})`;
    return SECTOR_TRANSLATIONS[lang]?.[sec] || sec;
  };

  const getPriorityLabel = (pri) => {
    if (pri === "all") return isMr ? "सर्व प्राधान्यक्रम" : "All Priorities";
    if (isMr) {
      if (pri === "Critical") return "अति-तातडीचे";
      if (pri === "High") return "उच्च";
      if (pri === "Moderate") return "मध्यम";
    }
    return pri;
  };

  const getTimelineLabel = (timeline) => {
    if (!timeline) return "";
    if (isMr) {
      if (timeline.includes("Immediate")) return "तातडीने (१ वर्ष)";
      if (timeline.includes("Medium")) return "मध्यम मुदत (२-३ वर्षे)";
      if (timeline.includes("Long")) return "दीर्घ मुदत (५ वर्षे)";
    }
    return timeline;
  };

  const getBenefitLabel = (ben) => {
    if (!ben) return "";
    if (isMr) {
      if (ben === "High") return "उच्च राजकीय लाभ";
      if (ben === "Moderate") return "मध्यम लाभ";
    }
    return `${ben} Impact`;
  };

  if (loading) {
    return (
      <ElectionAnalyticsLayout
        pageTitle={isMr ? "२९ कळीचे प्रश्न व मागण्या" : "Issues & 29 Demands Radar"}
        activePage="/admin/election-analytics/issues-demands"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="text-xs text-slate-500 font-bold">{t("loadingData")}</p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle={isMr ? "२९ कळीचे प्रश्न व मागण्या" : "Issues & 29 Demands Radar"}
      activePage="/admin/election-analytics/issues-demands"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1.5">
            <HiExclamationCircle className="w-3.5 h-3.5 text-red-500" />
            {t("issuesBadge")}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {isMr ? "अपक्ष विकास संकल्पनामा" : "Independent Transformation Manifesto"}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t("issuesTitle")}
        </h2>
        <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {t("issuesSub")}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t("issuesSearchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs md:text-sm text-slate-800 placeholder-slate-400 transition-all outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap font-bold">
              {t("foundDemands")} <strong className="text-orange-600">{filteredIssues.length}</strong> / {issuesList.length}
            </span>
          </div>
        </div>

        {/* Sector Pills */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 flex-shrink-0">
              <HiFilter className="w-3.5 h-3.5" /> {t("filterSector")}
            </span>
            {sectors.map((sec) => {
              const isSelected = selectedSector === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-orange-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {getSectorLabel(sec)}
                </button>
              );
            })}
          </div>

          {/* Priority Pills */}
          {priorities.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 flex-shrink-0">
                <HiLightningBolt className="w-3.5 h-3.5" /> {t("filterPriority")}
              </span>
              {priorities.map((pri) => {
                const isSelected = selectedPriority === pri;
                return (
                  <button
                    key={pri}
                    onClick={() => setSelectedPriority(pri)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-red-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {getPriorityLabel(pri)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Issues Grid (Dynamically rendered from MongoDB Atlas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIssues.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-orange-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {SECTOR_TRANSLATIONS[lang]?.[item.sector] || item.sector || "General"}
                  </span>
                  {item.id && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                      {item.id}
                    </span>
                  )}
                </div>

                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                    item.priority === "Critical" || item.priority === "High"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {getPriorityLabel(item.priority)}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                {item.issue || item.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
              {item.concernedDepartment && (
                <div className="flex items-center gap-1.5 truncate">
                  <HiOfficeBuilding className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate" title={item.concernedDepartment}>
                    <strong>{t("deptLabel")}</strong> {item.concernedDepartment}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                {item.timeline && (
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <HiClock className="w-3.5 h-3.5 text-slate-400" />
                    {getTimelineLabel(item.timeline)}
                  </span>
                )}

                {item.politicalBenefit && (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t("politicalBenefitLabel")} {getBenefitLabel(item.politicalBenefit)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ElectionAnalyticsLayout>
  );
}
