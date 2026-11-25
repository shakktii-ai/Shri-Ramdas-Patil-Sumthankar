import React, { useState, useEffect, useMemo } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import {
  HiLocationMarker,
  HiUsers,
  HiExclamationCircle,
  HiShieldCheck,
  HiTrendingUp,
  HiOfficeBuilding,
  HiCheckCircle,
  HiChevronRight,
  HiScale
} from "react-icons/hi";
import { FaBullseye } from "react-icons/fa";

export default function AssemblySegmentsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAcNo, setSelectedAcNo] = useState(86);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/election-analytics/nanded");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Error loading AC data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const allAcs = data?.assemblyConstituencies || [];
  const coreAcs = useMemo(() => allAcs.filter((ac) => ac.isCorePC), [allAcs]);
  const referenceAcs = useMemo(() => allAcs.filter((ac) => !ac.isCorePC), [allAcs]);
  const indepTargets = data?.independentStrategy?.acWiseIndependentTargets || [];

  const currentAc = useMemo(() => {
    return allAcs.find((ac) => ac.acNo === selectedAcNo) || coreAcs[0] || allAcs[0] || {};
  }, [allAcs, coreAcs, selectedAcNo]);

  const currentAcTarget = useMemo(() => {
    return indepTargets.find((t) => t.acNo === currentAc.acNo);
  }, [indepTargets, currentAc]);

  if (loading) {
    return (
      <ElectionAnalyticsLayout
        pageTitle="Assembly Segments (6 ACs) – Shri Ramdas Patil Sumthankar"
        activePage="/admin/election-analytics/assembly-segments"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-xs text-slate-500 font-bold">MongoDB Atlas वरून विधानसभा मतदारसंघ डेटा लोड होत आहे...</p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  const latestGe = currentAc.generalElections?.slice(-1)[0];

  return (
    <ElectionAnalyticsLayout
      pageTitle="Assembly Segments (6 ACs) – Shri Ramdas Patil Sumthankar"
      activePage="/admin/election-analytics/assembly-segments"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <HiLocationMarker className="w-3.5 h-3.5 text-indigo-600" />
            ६ विधानसभा मतदारसंघ मायक्रो-ऍनालिसिस (Micro Constituency Intelligence)
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            अपक्ष रणनीतिक लक्ष्य
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          नांदेड लोकसभा: ६ विधानसभा मतदारसंघ सखोल राजकीय समीकरणे
        </h2>
        <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
          प्रत्येक मतदारसंघाची मतदार संख्या, विद्यमान आमदार, सामाजिक व जातीय रचना, निवडणूक निकाल इतिहास आणि श्री रामदास पाटील सुमठाणकर यांच्या अपक्ष विजयासाठीचे रणनीतिक लक्ष्य.
        </p>
      </div>

      {/* Core Assembly Constituency Selector Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            नांदेड लोकसभा क्षेत्रातील ६ प्रमुख विधानसभा मतदारसंघ (Core ACs):
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {coreAcs.map((ac) => {
            const isSelected = ac.acNo === selectedAcNo;
            const targetObj = indepTargets.find((t) => t.acNo === ac.acNo);

            return (
              <button
                key={ac.acNo}
                onClick={() => setSelectedAcNo(ac.acNo)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white border-orange-500 shadow-md shadow-orange-500/20 scale-[1.02]"
                    : "bg-white text-slate-800 border-slate-200 hover:border-orange-300 hover:bg-orange-50/30"
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                    isSelected ? "text-orange-100" : "text-slate-400"
                  }`}>
                    AC {ac.acNo}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold truncate mt-0.5">
                    {ac.name}
                  </h4>
                </div>

                <div className={`mt-2 pt-2 border-t flex items-center justify-between text-[10px] ${
                  isSelected ? "border-white/20" : "border-slate-100"
                }`}>
                  <span className={isSelected ? "text-orange-100" : "text-slate-500"}>
                    {ac.acNo === 90 ? "SC राखीव" : "खुला प्रवर्ग"}
                  </span>
                  <span className={`font-bold ${isSelected ? "text-white" : "text-orange-600"}`}>
                    {targetObj ? `${(targetObj.targetVotes / 1000).toFixed(0)}k लक्ष्य` : "माहिती"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected AC Deep-Dive Card */}
      {currentAc && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
          {/* AC Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                  मतदारसंघ क्रमांक {currentAc.acNo}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                  {currentAc.acNo === 90 ? "SC Reserved (राखीव)" : "General (खुला प्रवर्ग)"}
                </span>
                {currentAc.isCorePC && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    नांदेड लोकसभा मतदारसंघ
                  </span>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                {currentAc.name} विधानसभा मतदारसंघ
              </h3>

              {currentAc.incumbentMLA && (
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  <strong>विद्यमान आमदार (Incumbent MLA):</strong> {currentAc.incumbentMLA}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {latestGe && (
                <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">२०२४ मतदान (GE Votes)</span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {latestGe.totalVotes ? latestGe.totalVotes.toLocaleString("en-IN") : "-"}
                  </span>
                  <span className="text-[10px] text-slate-500 block">टक्केवारी: {latestGe.turnout || "-"}</span>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-300 px-4 py-2.5 rounded-2xl text-center">
                <span className="text-[10px] text-amber-700 font-bold uppercase block">अपक्ष विजयी टार्गेट</span>
                <span className="text-lg font-extrabold text-amber-900">
                  {currentAcTarget?.targetVotes ? `${currentAcTarget.targetVotes.toLocaleString("en-IN")} मते` : "६०,००० मते"}
                </span>
                <span className="text-[10px] text-amber-800 block font-semibold">श्री रामदास पाटील</span>
              </div>
            </div>
          </div>

          {/* 3 Columns: Demographics, Political Dynamics, Strategy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Social & Caste Demographics */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center gap-2">
                <HiUsers className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  सामाजिक व जातीय रचना (Demographics)
                </h4>
              </div>

              {currentAc.casteDemography?.length ? (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">जातीय टक्केवारी (Caste Share):</span>
                  <div className="space-y-1.5">
                    {currentAc.casteDemography.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-200">
                        <span className="font-medium text-slate-800">{c.caste} ({c.category})</span>
                        <span className="font-extrabold text-indigo-600">{c.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : currentAc.dominantCastes?.length ? (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">प्रमुख सामाजिक घटक:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentAc.dominantCastes.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">सामाजिक डेटा उपलब्ध नाही.</p>
              )}
            </div>

            {/* Column 2: Political Dynamics from MongoDB Atlas */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center gap-2">
                <HiScale className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                  स्थानिक राजकीय समीकरणे (Ground Dynamics)
                </h4>
              </div>

              {currentAc.politicalDynamics?.length ? (
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {currentAc.politicalDynamics.map((dyn, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1 flex-shrink-0" />
                      <span className="leading-relaxed">{dyn}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-500">राजकीय समीकरणे डेटा उपलब्ध नाही.</p>
              )}
            </div>

            {/* Column 3: Independent Candidate Playbook */}
            <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/40 space-y-4">
              <div className="flex items-center gap-2">
                <HiShieldCheck className="w-5 h-5 text-amber-700" />
                <h4 className="text-sm font-extrabold text-amber-900 uppercase tracking-wide">
                  श्री रामदास पाटील - अपक्ष रणनीती
                </h4>
              </div>

              <div className="space-y-3 text-xs text-slate-800 leading-relaxed font-medium">
                {currentAcTarget ? (
                  <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider block">
                      मतदारसंघ लक्ष्यित मोहीम:
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      {currentAcTarget.strategy}
                    </p>
                  </div>
                ) : null}

                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider block">
                    विरोधक काउंटर:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    भाजप आणि काँग्रेस या दोन्ही पक्षांच्या अंतर्गत कलहातील नाराज स्थानिक नेत्यांशी थेट समन्वय साधून क्रॉस-व्होटिंग घडवणे.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider block">
                    बूथ मोहीम:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    प्रत्येक मतदान केंद्रावर ५ निष्ठावंत स्थानिक तरुणांची फळी नेमून घरोघरी अपक्ष प्रचार पोहोचवणे.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reference Assembly Constituencies in District */}
      {referenceAcs.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h4 className="text-sm font-extrabold text-slate-800">
            नांदेड जिल्ह्यातील इतर शेजारील विधानसभा मतदारसंघ (Reference Constituencies):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {referenceAcs.map((ac) => (
              <div key={ac.acNo} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-extrabold text-slate-900 block">{ac.name} (AC {ac.acNo})</span>
                <span className="text-[11px] text-slate-500">
                  {ac.acNo === 83 || ac.acNo === 84 ? "हिंगोली लोकसभा क्षेत्रात समाविष्ट" : "लातूर लोकसभा क्षेत्रात समाविष्ट"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ElectionAnalyticsLayout>
  );
}