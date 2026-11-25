import React, { useState, useEffect, useMemo } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import {
  HiUsers,
  HiCheckCircle,
  HiSparkles,
  HiLocationMarker
} from "react-icons/hi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DemographicsPage() {
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
        console.error("Error loading demographics data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const casteList = data?.casteDemographics || [];

  const chartData = useMemo(() => {
    if (!casteList.length) return { labels: [], datasets: [] };
    const palette = [
      "#f97316", "#3b82f6", "#10b981", "#eab308", "#a855f7",
      "#ec4899", "#06b6d4", "#f43f5e", "#84cc16", "#64748b",
      "#8b5cf6", "#d97706"
    ];
    return {
      labels: casteList.map((c) => `${c.caste} (${c.percentage}%)`),
      datasets: [
        {
          data: casteList.map((c) => c.percentage),
          backgroundColor: palette.slice(0, casteList.length),
          borderWidth: 2,
          borderColor: "#ffffff"
        }
      ]
    };
  }, [casteList]);

  if (loading) {
    return (
      <ElectionAnalyticsLayout
        pageTitle="Caste & Social Demographics – Shri Ramdas Patil Sumthankar"
        activePage="/admin/election-analytics/demographics"
      >
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle="Caste & Social Demographics – Shri Ramdas Patil Sumthankar"
      activePage="/admin/election-analytics/demographics"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <HiUsers className="w-3.5 h-3.5 text-indigo-600" />
            जातीय व सामाजिक समीकरणे (Social Coalition Intelligence)
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            MongoDB Atlas Live
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          नांदेड लोकसभा: जातीय रचना व अपक्ष उमेदवाराची सर्वसमावेशक आघाडी
        </h2>
        <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
          डेटाबेसमधील अधिकृत {casteList.length} सामाजिक घटकांचे विश्लेषण. मराठा, दलित, मुस्लिम, लिंगायत, धनगर, बंजारा, मन्नेरवारलू व ओबीसी 
          समाजाच्या आकांक्षा पूर्ण करण्यासाठी श्री रामदास पाटील सुमठाणकर यांनी उभारलेली सर्वसमावेशक विकासाची आघाडी.
        </p>
      </div>

      {/* Doughnut Chart & Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-800">
              जातीय लोकसंख्या टक्केवारी (Caste Share %)
            </h3>
            <p className="text-xs text-slate-500">नांदेड लोकसभा मतदारसंघ सामाजिक विभाजन</p>
          </div>

          <div className="h-72 w-full pt-4 flex items-center justify-center">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10, weight: "bold" } } },
                  tooltip: { 
                    backgroundColor: "#ffffff", 
                    titleColor: "#0f172a", 
                    bodyColor: "#334155", 
                    borderColor: "#e2e8f0", 
                    borderWidth: 1,
                    padding: 10 
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Independent Coalition Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                अपक्ष सामाजिक समीकरण (Independent Coalition Formula)
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
              "पक्षातीत नांदेड - सर्वांचा विकास": रामदास पाटील यांची सर्वसमावेशक रणनीती
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-2">
              भाजप आणि काँग्रेस हे दोन्ही पक्ष विशिष्ट पारंपारिक व्होटबँकेवर अवलंबून असतात. 
              श्री रामदास पाटील सुमठाणकर कोणत्याही पक्षाचे बांधील नसल्याने सर्व समाजातील स्वाभिमानी मतदारांना एकत्र बांधू शकतात:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-1">
              <h5 className="text-xs font-extrabold text-orange-900">मराठा + शेतकरी वर्ग</h5>
              <p className="text-[11px] text-orange-800 leading-relaxed">
                कापूस-सोयाबीन भाव, दुष्काळ मदत व स्वाभिमान रक्षणासाठी थेट बांधावर जाऊन साथ.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
              <h5 className="text-xs font-extrabold text-blue-900">दलित + बहुजन युवक</h5>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                रोजगार, एमआयडीसीतील उद्योग, शिक्षण व घटनादत्त अधिकारांच्या संरक्षणाचा स्पष्ट शब्द.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <h5 className="text-xs font-extrabold text-emerald-900">लिंगायत, मुस्लिम व व्यापारी</h5>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                शासकीय जाचातून मुक्ती, बाजारपेठांचे आधुनिकीकरण व शांततापूर्ण विकासाची हमी.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Deep-Dive Grid (100% Dynamic from MongoDB Atlas) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">
            प्रत्येक सामाजिक घटकाचे सखोल विश्लेषण (Live Community Breakdown: {casteList.length} घटकांची नोंद)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            मतदारांची टक्केवारी, पारंपारिक राजकीय कल, कळीच्या स्थानिक मागण्या आणि प्रभाव तालुके (थेट MongoDB डेटाबेसमधून).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {casteList.map((caste, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-900">{caste.caste}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">
                    {caste.percentage}% {caste.range ? `(${caste.range})` : ""}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-semibold">
                  प्रवर्ग: <span className="text-slate-800">{caste.category || "General"}</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <p>
                    <strong className="text-slate-900">राजकीय कल:</strong> {caste.politicalInclination}
                  </p>
                  <p>
                    <strong className="text-slate-900">कळीचे स्थानिक प्रश्न:</strong> {caste.localIssuesAndDemands}
                  </p>
                  {Array.isArray(caste.keyTalukas) && (
                    <p className="flex items-center gap-1 text-[11px] text-indigo-700 font-bold pt-1">
                      <HiLocationMarker className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{caste.keyTalukas.join(", ")}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <HiCheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>अपक्ष थेट संवाद: {caste.historicAlignment || "सर्वपक्षीय जनसंपर्क"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ElectionAnalyticsLayout>
  );
}
