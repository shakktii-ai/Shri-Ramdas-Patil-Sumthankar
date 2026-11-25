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

export default function IssuesDemandsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  if (loading) {
    return (
      <ElectionAnalyticsLayout
        pageTitle="Issues & 29 Demands Radar – Shri Ramdas Patil Sumthankar"
        activePage="/admin/election-analytics/issues-demands"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="text-xs text-slate-500 font-bold">MongoDB Atlas वरून २९ कळीचे प्रश्न लोड होत आहेत...</p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle="Issues & 29 Demands Radar – Shri Ramdas Patil Sumthankar"
      activePage="/admin/election-analytics/issues-demands"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1.5">
            <HiExclamationCircle className="w-3.5 h-3.5 text-red-500" />
            नांदेडचे २९ कळीचे प्रश्न व मागण्या (29 Demands Radar)
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            अपक्ष विकास संकल्पनामा
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          नांदेड लोकसभा: २९ प्रमुख विकासात्मक प्रश्न व जनआकांक्षा
        </h2>
        <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
          गेल्या कित्येक वर्षांत दोन्ही प्रमुख राष्ट्रीय पक्षांनी दुर्लक्ष केलेल्या शेती, सिंचन, दळणवळण, एमआयडीसी रोजगार व आरोग्य 
          या क्षेत्रांतील सर्व २९ कळीच्या मागण्यांचा थेट डेटाबेस. श्री रामदास पाटील सुमठाणकर यांचा हा मुख्य निवडणूक जाहीरनामा आहे.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="मागण्यांमध्ये शोधा (उदा. रेल्वे, लेंडी, कापूस, सोयाबीन, विमानतळ, रुग्णालय, एमआयडीसी)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs md:text-sm text-slate-800 placeholder-slate-400 transition-all outline-hidden"
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
              एकूण सापडलेल्या मागण्या: <strong className="text-indigo-600">{filteredIssues.length}</strong> / {issuesList.length}
            </span>
          </div>
        </div>

        {/* Sector Pills */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 flex-shrink-0">
              <HiFilter className="w-3.5 h-3.5" /> क्षेत्र (Sector):
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
                  {sec === "all" ? `सर्व क्षेत्रे (${issuesList.length})` : sec}
                </button>
              );
            })}
          </div>

          {/* Priority Pills */}
          {priorities.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 flex-shrink-0">
                <HiLightningBolt className="w-3.5 h-3.5" /> तीव्रता (Priority):
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
                    {pri === "all" ? "सर्व प्राधान्यक्रम" : pri}
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
            className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {item.sector || "General"}
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
                  {item.priority || "High"}
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
                    <strong>विभाग:</strong> {item.concernedDepartment}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                {item.timeline && (
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <HiClock className="w-3.5 h-3.5 text-slate-400" />
                    {item.timeline}
                  </span>
                )}

                {item.politicalBenefit && (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    राजकीय लाभ: {item.politicalBenefit}
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