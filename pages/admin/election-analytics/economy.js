import React, { useState, useEffect } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import { useElectionLanguage } from "@/context/ElectionLanguageContext";
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
  const { isMr, t } = useElectionLanguage();
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
        pageTitle={isMr ? "अर्थव्यवस्था व उद्योग" : "Economy & Industry"}
        activePage="/admin/election-analytics/economy"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-xs text-slate-500 font-bold">
            {isMr ? "MongoDB Atlas वरून आर्थिक व शेती डेटा लोड होत आहे..." : "Loading Economy & Agriculture data from MongoDB Atlas..."}
          </p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle={isMr ? "अर्थव्यवस्था व उद्योग" : "Economy & Industry"}
      activePage="/admin/election-analytics/economy"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <FaSeedling className="w-3.5 h-3.5 text-emerald-600" />
            {isMr ? "आर्थिक, शेती व औद्योगिक प्रोफाइल" : "Economic, Agrarian & Industrial Profile"}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            {isMr ? "स्थानिक समृद्धी अजेंडा" : "Local Prosperity Agenda"}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isMr ? "नांदेड लोकसभा: शेती संकट, कुष्णूर एमआयडीसी व औद्योगिक पुनरुज्जीवन" : "Nanded Parliamentary Constituency: Agrarian Crisis, Kushnoor MIDC & Industrial Revival"}
        </h2>
        <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {econ.overview || (isMr
            ? "नांदेड जिल्हा प्रामुख्याने कापूस, सोयाबीन, केळी व हळद उत्पादक जिल्हा आहे. परंतु प्रक्रिया उद्योगांचा अभाव आणि एमआयडीसीच्या रखडलेल्या विकासामुळे सुशिक्षित तरुणांचे स्थलांतर होत आहे."
            : "Nanded is primarily a cotton, soybean, banana, and turmeric growing district. Lack of agro-processing units and stalled MIDC expansion have caused major youth outward migration.")}
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
            <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">
              {isMr ? "प्राथमिक क्षेत्र" : "Primary Sector"}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              {isMr ? "कापूस, सोयाबीन व हळद पिके" : "Cotton, Soybean & Cash Crops"}
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {crops.dominantCrop || (isMr ? "कापूस हे जिल्ह्याचे प्रमुख नगदी पीक आहे." : "Cotton is the primary cash crop of the district.")}
          </p>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 space-y-2">
            <div>
              <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-slate-400">
                {isMr ? "प्रमुख नगदी पिके:" : "Major Cash Crops:"}
              </strong>
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
                <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-slate-400">
                  {isMr ? "फलोत्पादन:" : "Horticulture:"}
                </strong>
                <p className="text-xs text-slate-600 mt-0.5">{crops.horticulture}</p>
              </div>
            )}

            {crops.pulsesAndGrains?.length > 0 && (
              <div>
                <strong className="text-slate-900 block text-[11px] uppercase tracking-wider text-slate-400">
                  {isMr ? "कडधान्ये व तृणधान्ये:" : "Pulses & Cereals:"}
                </strong>
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
            <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider">
              {isMr ? "जलसंपदा व सिंचन" : "Water Resources & Irrigation"}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              {isMr ? "धरणे, उपसा सिंचन व लेंडी प्रकल्प" : "Dams, Lift Irrigation & Lendi Project"}
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
              <span>{isMr ? "मध्यम सिंचन प्रकल्प:" : "Medium Irrigation Projects:"}</span>
              <strong className="text-slate-900">{irrigation.mediumProjectsCount || 10} {isMr ? "प्रकल्प" : "Projects"}</strong>
            </div>
            <div className="flex justify-between">
              <span>{isMr ? "लघु सिंचन प्रकल्प:" : "Minor Irrigation Projects:"}</span>
              <strong className="text-slate-900">{irrigation.minorProjectsCount || 394} {isMr ? "प्रकल्प" : "Projects"}</strong>
            </div>
            <div className="flex justify-between">
              <span>{isMr ? "कृषी विंधन विहिरी:" : "Irrigation Borewells:"}</span>
              <strong className="text-slate-900">{irrigation.irrigationBorewells ? irrigation.irrigationBorewells.toLocaleString(isMr ? "en-IN" : "en-US") : "6,620"}</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3: MIDC Industrial Clusters */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <FaIndustry className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider">
              {isMr ? "द्वितीयक क्षेत्र" : "Secondary Sector"}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              {isMr ? "एमआयडीसी औद्योगिक वसाहती" : "MIDC Industrial Clusters"}
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
              <span>{isMr ? "एकूण औद्योगिक क्षेत्रे:" : "Total Industrial Areas:"}</span>
              <strong className="text-slate-900">{midcList.length} {isMr ? "वसाहती" : "Clusters"}</strong>
            </div>
            <div className="flex justify-between">
              <span>{isMr ? "वस्त्रोद्योग युनिट्स:" : "Textile Units:"}</span>
              <strong className="text-slate-900">{textileList.length} {isMr ? "कारखाने" : "Units"}</strong>
            </div>
            <div className="flex justify-between">
              <span>{isMr ? "साखर कारखाने:" : "Sugar Factories:"}</span>
              <strong className="text-slate-900">{sugarList.length} {isMr ? "कारखाने" : "Factories"}</strong>
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
              {isMr
                ? `नांदेड जिल्ह्यातील साखर कारखाने (${sugarList.length} सहकारी व खाजगी)`
                : `Sugar Factories in Nanded District (${sugarList.length} Co-op & Private SSKs)`}
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
              {isMr ? "वस्त्रोद्योग व रखडलेले मोठे प्रकल्प" : "Textile Mills & Stalled Key Projects"}
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
            {isMr ? "श्री रामदास पाटील सुमठाणकर: आर्थिक विकास संकल्पनामा" : "Shri Ramdas Patil Sumthankar: Economic Development Manifesto"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              {isMr ? "१. कापूस-सोयाबीन प्रक्रिया क्लस्टर्स (Agro-Clusters)" : "1. Cotton-Soybean Agro-Processing Clusters"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isMr
                ? "नायगाव, बिलोली व देगलूरमध्ये थेट जिनिंग, ऑईल मिल्स आणि फूड प्रोसेसिंग युनिट्सना विशेष वीज व कर सवलत."
                : "Special power tariffs and tax concessions for ginning, oil mills, and food processing units in Naigaon, Biloli, and Deglur."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              {isMr ? "२. कुष्णूर एमआयडीसीत स्थानिक तरुणांना ८०% रोजगार कोटा" : "2. 80% Local Youth Employment Quota in Kushnoor MIDC"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isMr
                ? "नवीन येणाऱ्या सर्व बहुराष्ट्रीय कंपन्यांमध्ये नांदेडच्या भूमिपुत्रांना कौशल्य प्रशिक्षण देऊन थेट नोकऱ्या."
                : "Specialized skill training ensuring direct hiring of local Nanded youths across all incoming industrial ventures."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              {isMr ? "३. लेंडी प्रकल्प व उपसा सिंचन योजनांचे पुनरुज्जीवन" : "3. Revival of Stalled Lendi Project & Lift Schemes"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isMr
                ? "३० वर्षे प्रलंबित लेंडी प्रकल्प व गोदावरी खोरे उपसा योजनांसाठी केंद्र व राज्य सरकारकडून युद्धपातळीवर निधी मिळवणे."
                : "War-footing fund mobilization from Central and State governments for the 30-year pending Lendi project and Godavari lift schemes."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <HiCheckCircle className="w-4 h-4 text-emerald-600" />
              {isMr ? "४. व्यापारी व सुशिक्षित वर्गासाठी 'सिंगल विंडो' खासदार कक्ष" : "4. 'Single Window' MP Cell for Traders & Entrepreneurs"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isMr
                ? "नांदेड शहर व तालुका व्यापारी केंद्रांमध्ये शासकीय परवानग्या व सुलभ कर्जासाठी थेट खासदार जनसंपर्क कक्षाची स्थापना."
                : "Dedicated MP facilitation cell in Nanded urban & taluka hubs ensuring smooth approvals, credit access, and trader safety."}
            </p>
          </div>
        </div>
      </div>
    </ElectionAnalyticsLayout>
  );
}