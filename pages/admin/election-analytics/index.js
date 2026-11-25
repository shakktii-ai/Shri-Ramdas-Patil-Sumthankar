import React, { useState, useEffect, useMemo } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import { ELECTION_PAGES } from "@/components/ElectionSidebar";
import Link from "next/link";
import {
  HiChartBar,
  HiUsers,
  HiLocationMarker,
  HiLightningBolt,
  HiTrendingUp,
  HiTrendingDown,
  HiCheckCircle,
  HiSparkles,
  HiGlobeAlt,
  HiScale,
  HiBriefcase,
  HiExclamationCircle,
  HiArrowRight,
  HiShieldCheck
} from "react-icons/hi";
import { FaBullseye } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ElectionAnalyticsExecutiveOverview() {
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
        console.error("Error loading executive overview data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const meta = data?.constituencyMeta || {};
  const ge2024 = data?.ge2024ResultAnalysis || {};
  const segments = ge2024?.segmentWiseSummary || [];
  const indepTargets = data?.independentStrategy?.acWiseIndependentTargets || [];

  const marginChartData = useMemo(() => {
    if (!segments.length) return { labels: [], datasets: [] };
    return {
      labels: segments.map((s) => `${s.name} (AC ${s.acNo})`),
      datasets: [
        {
          label: "INC Votes (2024)",
          data: segments.map((s) => s.incVotes || 0),
          backgroundColor: "rgba(59, 130, 246, 0.85)",
          borderRadius: 6
        },
        {
          label: "BJP Votes (2024)",
          data: segments.map((s) => s.bjpVotes || 0),
          backgroundColor: "rgba(249, 115, 22, 0.85)",
          borderRadius: 6
        },
        {
          label: "VBA Votes (2024)",
          data: segments.map((s) => s.vbaVotes || 0),
          backgroundColor: "rgba(16, 185, 129, 0.85)",
          borderRadius: 6
        }
      ]
    };
  }, [segments]);

  if (loading) {
    return (
      <ElectionAnalyticsLayout
        pageTitle="Executive & 2024 GE Overview – Shri Ramdas Patil Sumthankar"
        activePage="/admin/election-analytics"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-xs text-slate-500 font-bold">MongoDB Atlas वरून निवडणूक डेटा लोड होत आहे...</p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle="Executive & 2024 GE Overview – Shri Ramdas Patil Sumthankar"
      activePage="/admin/election-analytics"
    >
      {/* Hero Banner: Independent Candidate Mission - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 relative overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs flex items-center gap-1.5">
            <HiSparkles className="w-3.5 h-3.5 text-amber-600" />
            अपक्ष उमेदवार रणनीती (Independent Candidate Strategy)
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {data?.candidateName || "श्री रामदास पाटील सुमठाणकर"} • {meta.pcNumber || 16}-{meta.name || "नांदेड"} लोकसभा
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          नांदेड लोकसभा मतदारसंघ: २०२४ निकाल विश्लेषण व अपक्ष विजयी समीकरण
        </h2>

        <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {data?.independentStrategy?.slogan || "न पक्षाची मक्तेदारी, न राजकीय घराणेशाही — थेट जनतेचा नेता, नांदेडचा विकास!"}
          {" "}महायुती (भाजप) आणि महाविकास आघाडी (काँग्रेस) या दोन्ही प्रस्थापित आघाड्यांमधील अंतर्गत कलह, शेतकरी असंतोष आणि सत्ताविरोधी लाटेमुळे यंदाची लढत चौरंगी असून, अपक्ष विजयाची ऐतिहासिक संधी निर्माण झाली आहे.
        </p>

        {/* 4 Main Executive Metrics - Clean Light Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">एकूण मतदार (Electorate)</span>
            <p className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              {meta.totalVoters ? meta.totalVoters.toLocaleString("en-IN") : "१८,५१,८४३"}
            </p>
            <span className="text-[10px] text-indigo-600 font-semibold">६ प्रमुख विधानसभा मतदारसंघ</span>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">२०२४ मतदान टक्केवारी</span>
            <p className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              {ge2024.turnout || "60.94%"}
            </p>
            <span className="text-[10px] text-emerald-700 font-semibold">
              {ge2024.winner?.votes && ge2024.runnerUp?.votes 
                ? `${((ge2024.winner.votes + ge2024.runnerUp.votes + (ge2024.secondRunnerUp?.votes || 0)) / 100000).toFixed(2)} लाख मते`
                : "११.२८ लाख प्रत्यक्ष मतदान"}
            </span>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">२०२४ आघाडी तफावत (Margin)</span>
            <p className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
              {ge2024.margin ? Math.abs(ge2024.margin).toLocaleString("en-IN") : "५९,४४२"}
            </p>
            <span className="text-[10px] text-blue-600 font-semibold">
              {ge2024.winner?.party || "INC"} विजयी विरुद्ध {ge2024.runnerUp?.party || "BJP"}
            </span>
          </div>

          <div className="bg-amber-50/80 rounded-2xl p-4 border-2 border-amber-300">
            <span className="text-[11px] text-amber-800 font-bold block uppercase tracking-wider">अपक्ष विजयी उद्दिष्ट (Target)</span>
            <p className="text-xl md:text-2xl font-extrabold text-amber-950 mt-1">
              {data?.independentStrategy?.winningTarget ? data.independentStrategy.winningTarget.split("(")[0] : "३.४ ते ३.६ लाख मते"}
            </p>
            <span className="text-[10px] text-amber-800 font-bold">३५% व्होट शेअर विजयासाठी पुरेसा</span>
          </div>
        </div>
      </div>

      {/* QUICK HUB: 6 OTHER DEDICATED SECTIONS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            Dedicated Intelligence Modules (स्वतंत्र दालने)
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-2">
            निवडणूक विश्लेषण: सर्व ६ स्वतंत्र पेजेस
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            कोणत्याही घटकाचे सखोल विश्लेषण पाहण्यासाठी डाव्या बाजूच्या साइडबारमधून किंवा खालील कार्ड्सवरून थेट उघडा:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {ELECTION_PAGES.filter((p) => p.href !== "/admin/election-analytics").map((pg) => {
            const Icon = pg.icon;
            return (
              <Link
                key={pg.href}
                href={pg.href}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-400 hover:shadow-xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {pg.label}
                    </h4>
                    <p className="text-[11px] text-slate-500">{pg.marathi}</p>
                  </div>
                </div>
                <HiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2024 GE VOTE COMPARISON CHART & MARGIN BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-800">
              २०२४ सार्वत्रिक निवडणूक: ६ विधानसभा मतदारसंघांतील प्रत्यक्ष मतदान (INC vs BJP vs VBA)
            </h3>
            <p className="text-xs text-slate-500">
              MongoDB Atlas थेट निकाल डेटा: विधानसभा निहाय मतांची तुलना
            </p>
          </div>

          <div className="h-72 w-full pt-4">
            <Bar
              data={marginChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top", labels: { boxWidth: 12, font: { size: 11, weight: "bold" } } },
                  tooltip: { 
                    backgroundColor: "#ffffff", 
                    titleColor: "#0f172a", 
                    bodyColor: "#334155", 
                    borderColor: "#e2e8f0", 
                    borderWidth: 1,
                    padding: 10 
                  }
                },
                scales: {
                  y: { grid: { color: "#f1f5f9" }, ticks: { font: { size: 10 } } },
                  x: { grid: { display: false }, ticks: { font: { size: 10, weight: "bold" } } }
                }
              }}
            />
          </div>
        </div>

        {/* Why Independent Wins Card - Clean Light Accent */}
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/70 border-2 border-amber-300 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950">
                अपक्ष विजयाची गुरुकिल्ली
              </span>
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">
              त्रिकोणी/चौरंगी लढतीत ३५% मते विजयासाठी पुरेशी!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              पारंपरिक थेट द्विकोणी लढतीत ५०%+ मते लागतात. परंतु यंदा भाजप (~३.२ लाख) आणि काँग्रेस (~३.० लाख) यांच्यात समसमान मते विभागली जाणार आहेत.
            </p>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              त्यामुळे <strong className="text-slate-900">श्री रामदास पाटील सुमठाणकर</strong> यांनी तटस्थ शेतकरी, सुशिक्षित तरुण व नाराज कार्यकर्त्यांची मोट बांधून <strong className="text-amber-900">३.४ ते ३.६ लाख मते</strong> मिळवल्यास थेट विजय मिळतो!
            </p>
          </div>

          <div className="pt-3 border-t border-amber-200 flex items-center justify-between">
            <Link
              href="/admin/election-analytics/strategic-plan"
              className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              <span>सविस्तर अपक्ष रणनीती पहा</span>
              <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Assembly Constituency Margins Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            ६ विधानसभा मतदारसंघ: २०२४ प्रत्यक्ष निकाल व अपक्ष लक्ष्य तक्ता
          </h3>
          <p className="text-xs text-slate-500">
            विधानसभानिहाय मिळालेली मते, आघाडी व श्री रामदास पाटील सुमठाणकर यांचे विजयी उद्दिष्ट
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">मतदारसंघ (AC)</th>
                <th className="py-3 px-4">काँग्रेस मते (INC)</th>
                <th className="py-3 px-4">भाजप मते (BJP)</th>
                <th className="py-3 px-4">वंचित मते (VBA)</th>
                <th className="py-3 px-4">आघाडी (Margin)</th>
                <th className="py-3 px-4">आघाडी घेणारा पक्ष</th>
                <th className="py-3 px-4">अपक्ष विजयी टार्गेट</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {segments.map((seg) => {
                const targetObj = indepTargets.find((t) => t.acNo === seg.acNo);
                return (
                  <tr key={seg.acNo} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {seg.name} ({seg.acNo})
                    </td>
                    <td className="py-3 px-4 font-semibold text-blue-700">
                      {seg.incVotes ? seg.incVotes.toLocaleString("en-IN") : "-"}
                    </td>
                    <td className="py-3 px-4 font-semibold text-orange-700">
                      {seg.bjpVotes ? seg.bjpVotes.toLocaleString("en-IN") : "-"}
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      {seg.vbaVotes ? seg.vbaVotes.toLocaleString("en-IN") : "-"}
                    </td>
                    <td className="py-3 px-4 font-bold">
                      {seg.margin ? Math.abs(seg.margin).toLocaleString("en-IN") : "0"} मते
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        seg.leadParty === "INC"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {seg.leadParty} (+{seg.margin ? Math.abs(seg.margin).toLocaleString("en-IN") : "0"})
                      </span>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-amber-900 bg-amber-50/50">
                      {targetObj?.targetVotes ? `${targetObj.targetVotes.toLocaleString("en-IN")} मते` : "६०,००० मते"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Factors from MongoDB: Factors Working For & Against */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Factors Working For */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <HiCheckCircle className="w-5 h-5 text-emerald-600" />
            <h4 className="text-base font-extrabold text-slate-900">
              महायुतीसाठी काम करणारे घटक (Ground Factors For NDA)
            </h4>
          </div>
          <div className="space-y-3">
            {(ge2024.factorsWorkingForNDA || []).map((f, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <span className="text-xs font-extrabold text-emerald-900 block">{f.title}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Factors Working Against */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <HiExclamationCircle className="w-5 h-5 text-red-600" />
            <h4 className="text-base font-extrabold text-slate-900">
              महायुतीविरोधी लाट व असंतोष (Factors Working Against NDA)
            </h4>
          </div>
          <div className="space-y-3">
            {(ge2024.factorsWorkingAgainstNDA || []).map((f, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 space-y-1">
                <span className="text-xs font-extrabold text-red-900 block">{f.title}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical PC Elections Timeline (2009, 2014, 2019, 2024) from MongoDB */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            नांदेड लोकसभा: ऐतिहासिक निवडणूक निकाल आलेख (२००९ - २०२४)
          </h3>
          <p className="text-xs text-slate-500">
            नांदेडच्या मतदारांनी गेल्या चार निवडणुकांत दिलेला कौल व बदललेली राजकीय समीकरणे
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(data?.pcElectoralHistory || []).map((elec, i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-indigo-100 text-indigo-800">
                  {elec.election} ({elec.year})
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  elec.winningParty === "INC" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
                }`}>
                  {elec.winningParty} विजयी
                </span>
              </div>

              <div className="space-y-1 pt-1 text-xs text-slate-700">
                <p>
                  <strong>विजेता:</strong> {elec.winner?.candidate} ({elec.winner?.party})
                </p>
                <p className="text-[11px] text-slate-500">
                  मते: {elec.winner?.votes?.toLocaleString("en-IN")} ({elec.winner?.percentage}%)
                </p>
                <p>
                  <strong>उपविजेता:</strong> {elec.runnerUp?.candidate} ({elec.runnerUp?.party})
                </p>
                <p className="text-[11px] text-slate-500">
                  मते: {elec.runnerUp?.votes?.toLocaleString("en-IN")} ({elec.runnerUp?.percentage}%)
                </p>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span>तफावत:</span>
                  <strong className="text-slate-900">{Math.abs(elec.margin || 0).toLocaleString("en-IN")} मते</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ElectionAnalyticsLayout>
  );
}