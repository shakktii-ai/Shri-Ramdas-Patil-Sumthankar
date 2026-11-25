import React, { useState, useEffect } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import {
  HiBriefcase,
  HiTrendingUp,
  HiCurrencyRupee,
  HiOfficeBuilding,
  HiCheckCircle,
  HiLightningBolt,
  HiSparkles,
  HiLocationMarker
} from "react-icons/hi";
import { FaIndustry, FaSeedling, FaTractor, FaWater } from "react-icons/fa";

export default function EconomyIndustryPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/election-analytics/nanded");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Error loading economy data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const econ = data?.economicProfile || {};
  const crops = econ?.crops || {};
  const irrigation = econ?.irrigationInfrastructure || {};
  const midcList = econ?.midcAreas || [];
  const sugarList = econ?.sugarFactories || [];
  const textileList = econ?.textileIndustries || [];
  const keyIndustries = econ?.keyIndustries || [];
  const industrialists = econ?.prominentIndustrialists || [];
  const research = econ?.researchAndSupport || [];

  if (loading) {
    return (
      <ElectionAnalyticsLayout
        pageTitle="Economy & Industry – Shri Ramdas Patil Sumthankar"
        activePage="/admin/election-analytics/economy"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-xs text-slate-500 font-bold">MongoDB Atlas वरून आर्थिक व शेती डेटा लोड होत आहे...</p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle="Economy & Industry – Shri Ramdas Patil Sumthankar"
      activePage="/admin/election-analytics/economy"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <FaSeedling className="w-3.5 h-3.5 text-emerald-600" />
            आर्थिक, शेती व औद्योगिक प्रोफाइल (Economic Intelligence)
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            स्थानिक समृद्धी अजेंडा
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          नांदेड लोकसभा: शेती संकट, कुष्णूर एमआयडीसी व औद्योगिक पुनरुज्जीवन
        </h2>
        <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {econ.overview || "नांदेड जिल्हा प्रामुख्याने कापूस, सोयाबीन, केळी व हळद उत्पादक जिल्हा आहे. परंतु प्रक्रिया उद्योगांचा अभाव आणि एमआयडीसीच्या रखडलेल्या विकासामुळे सुशिक्षित तरुणांचे स्थलांतर होत आहे."}
        </p>
      </div>

      {/* 3 Core Pillars: Agriculture, Irrigation, MIDC/Industry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Agriculture & Cash Crops */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <FaTractor className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">प्राथमिक क्षेत्र</span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              कापूस, सोयाबीन व हळद पिके
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {crops.dominantCrop || "कापूस हे जिल्ह्याचे प्रमुख नगदी पीक आहे."}
          </p>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-2">
            <div>
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-slate-400">प्रमुख नगदी पिके:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {(crops.majorCashCrops || []).map((c, i) => (
                  <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md font-semibold text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {crops.horticulture && (
              <div>
                <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-slate-400">फलोत्पादन (Horticulture):</strong>
                <p className="text-xs text-slate-600 mt-0.5">{crops.horticulture}</p>
              </div>
            )}

            {crops.pulsesAndGrains?.length > 0 && (
              <div>
                <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-slate-400">कडधान्ये व तृणधान्ये:</strong>
                <p className="text-[11px] text-slate-500 mt-0.5">{crops.pulsesAndGrains.join(", ")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Pillar 2: Irrigation Infrastructure */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <FaWater className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider">जलसंपदा व सिंचन</span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              धरणे, उपसा सिंचन व लेंडी प्रकल्प
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            {(irrigation.majorProjects || []).map((p, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">{p.name}</strong>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    {p.irrigatedArea}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{p.details}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>मध्यम सिंचन प्रकल्प:</span>
              <strong className="text-slate-900">{irrigation.mediumProjectsCount || 10} प्रकल्प</strong>
            </div>
            <div className="flex justify-between">
              <span>लघु सिंचन प्रकल्प:</span>
              <strong className="text-slate-900">{irrigation.minorProjectsCount || 394} प्रकल्प</strong>
            </div>
            <div className="flex justify-between">
              <span>कृषी विंधन विहिरी:</span>
              <strong className="text-slate-900">{irrigation.irrigationBorewells?.toLocaleString("en-IN") || "६,६२०"}</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3: MIDC Industrial Clusters */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <FaIndustry className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">द्वितीयक क्षेत्र</span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              एमआयडीसी औद्योगिक वसाहती
            </h3>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            {midcList.slice(0, 3).map((m, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">{m.name}</strong>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                    {m.scale}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{m.details}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>एकूण औद्योगिक क्षेत्रे:</span>
              <strong className="text-slate-900">{midcList.length} वसाहती</strong>
            </div>
            <div className="flex justify-between">
              <span>वस्त्रोद्योग युनिट्स:</span>
              <strong className="text-slate-900">{textileList.length} कारखाने</strong>
            </div>
            <div className="flex justify-between">
              <span>साखर कारखाने:</span>
              <strong className="text-slate-900">{sugarList.length} कारखाने</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Sugar Factories & Textile Mills Data from Atlas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sugar Factories */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <HiOfficeBuilding className="w-5 h-5 text-indigo-600" />
              नांदेड जिल्ह्यातील साखर कारखाने ({sugarList.length} Co-op & Private SSK)
            </h4>
          </div>

          <div className="space-y-2.5">
            {sugarList.map((s, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block">{s.name}</strong>
                  <span className="text-slate-500 text-[11px]">
                    {s.location} • {s.management}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  s.status === "Operational" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Textile Industries & Pending Projects */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <HiBriefcase className="w-5 h-5 text-indigo-600" />
              वस्त्रोद्योग व रखडलेले मोठे प्रकल्प
            </h4>
          </div>

          <div className="space-y-3">
            {/* Pending Irrigation */}
            {(irrigation.pendingProjects || []).map((p, i) => (
              <div key={i} className="p-3 rounded-2xl bg-red-50/60 border border-red-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-red-900">{p.name}</strong>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded font-bold text-[10px]">
                    {p.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">{p.impact}</p>
              </div>
            ))}

            {/* Textile Mills */}
            {textileList.map((t, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block">{t.name}</strong>
                  <span className="text-slate-500 text-[11px]">{t.location} • {t.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shri Ramdas Patil Independent Economic Manifesto */}
      <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HiSparkles className="w-6 h-6 text-amber-600" />
          <h3 className="text-xl font-extrabold text-slate-900">
            श्री रामदास पाटील सुमठाणकर: आर्थिक विकास संकल्पनामा
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              १. कापूस-सोयाबीन प्रक्रिया क्लस्टर्स (Agro-Clusters)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              नायगाव, बिलोली व देगलूरमध्ये थेट जिनिंग, ऑईल मिल्स आणि फूड प्रोसेसिंग युनिट्सना विशेष वीज व कर सवलत.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              २. कुष्णूर एमआयडीसीत स्थानिक तरुणांना ८०% रोजगार कोटा
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              नवीन येणाऱ्या सर्व बहुराष्ट्रीय कंपन्यांमध्ये नांदेडच्या भूमिपुत्रांना कौशल्य प्रशिक्षण देऊन थेट नोकऱ्या.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              ३. लेंडी प्रकल्प व उपसा सिंचन योजनांचे पुनरुज्जीवन
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              ३० वर्षे प्रलंबित लेंडी प्रकल्प व गोदावरी खोरे उपसा योजनांसाठी केंद्र व राज्य सरकारकडून युद्धपातळीवर निधी मिळवणे.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              ४. व्यापारी व सुशिक्षित वर्गासाठी 'सिंगल विंडो' खासदार कक्ष
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              नांदेड शहर व तालुका व्यापारी केंद्रांमध्ये शासकीय परवानग्या व सुलभ कर्जासाठी थेट खासदार जनसंपर्क कक्षाची स्थापना.
            </p>
          </div>
        </div>
      </div>
    </ElectionAnalyticsLayout>
  );
}