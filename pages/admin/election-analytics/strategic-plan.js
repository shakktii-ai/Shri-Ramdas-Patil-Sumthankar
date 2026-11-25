import React, { useState, useEffect } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import {
  HiSparkles,
  HiShieldCheck,
  HiTrendingUp,
  HiUserGroup,
  HiLocationMarker,
  HiCheckCircle,
  HiFlag,
  HiLightningBolt,
  HiScale,
  HiFire,
  HiGlobeAlt
} from "react-icons/hi";
import { FaBullseye, FaHandshake, FaChartPie } from "react-icons/fa";

export default function StrategicPlanPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("counterStrategy"); // 'counterStrategy' | 'voteMath' | 'actionPlan' | 'acTargets'

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/election-analytics/nanded");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Error loading strategic plan data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const strategy = data?.independentStrategy || {};
  const opp = strategy.multiPartyOppositionAnalysis || {};
  const bjp = opp.mahayutiBjp || {};
  const cong = opp.mvaCongress || {};
  const vba = opp.vbaThirdFront || {};
  const acTargets = strategy.acWiseIndependentTargets || [];

  if (loading) {
    return (
      <ElectionAnalyticsLayout
        pageTitle="Strategic Plan (Independent) – Shri Ramdas Patil Sumthankar"
        activePage="/admin/election-analytics/strategic-plan"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-xs text-slate-500 font-bold">MongoDB Atlas वरून अपक्ष रणनीती डेटा लोड होत आहे...</p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle="Independent Strategic Action Plan – Shri Ramdas Patil Sumthankar"
      activePage="/admin/election-analytics/strategic-plan"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 relative overflow-hidden space-y-4">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs flex items-center gap-1.5">
              <HiSparkles className="w-3.5 h-3.5 text-amber-600" /> अपक्ष विजयी रणनीती (Independent Winning Strategy)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              उमेदवार: {strategy.candidateName || data?.candidateName || "श्री रामदास पाटील सुमठाणकर"}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            नांदेड लोकसभा: अपक्ष विजयी समीकरण व सर्वपक्षीय विरोधक विश्लेषण
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed">
            {strategy.slogan || "न पक्षाची मक्तेदारी, न राजकीय घराणेशाही — थेट जनतेचा नेता, नांदेडचा विकास!"}
          </p>

          {/* Quick Stats Grid - Clean Light Theme */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-amber-50/80 rounded-2xl p-3 border-2 border-amber-300">
              <span className="text-[11px] text-amber-800 font-bold block uppercase tracking-wider">अपक्ष विजयी कोटा (Target)</span>
              <p className="text-lg md:text-xl font-extrabold text-amber-950 mt-0.5">
                {strategy.winningTarget ? strategy.winningTarget.split("(")[0] : "३.४ ते ३.६ लाख मते"}
              </p>
              <span className="text-[10px] text-amber-800 font-bold">३५% व्होट शेअर पुरेसा</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">लढतीचे स्वरूप</span>
              <p className="text-lg md:text-xl font-extrabold text-slate-900 mt-0.5">त्रिकोणी / चौरंगी</p>
              <span className="text-[10px] text-indigo-600 font-semibold">मते विभागणीचा थेट लाभ</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">मुख्य केंद्रबिंदू</span>
              <p className="text-lg md:text-xl font-extrabold text-emerald-700 mt-0.5">शेतकरी + युवा विकास</p>
              <span className="text-[10px] text-slate-500">२९ स्थानिक मागण्यांवर भर</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">उमेदवारी स्वरूप</span>
              <p className="text-sm md:text-base font-extrabold text-slate-900 mt-0.5 truncate">
                {strategy.candidacyType || "Independent (अपक्ष)"}
              </p>
              <span className="text-[10px] text-slate-500 font-medium">पक्षातीत लोकनेता</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("counterStrategy")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === "counterStrategy"
              ? "bg-orange-500 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <HiScale className="w-4 h-4" />
          <span>१. सर्वपक्षीय विरोधक विश्लेषण (BJP vs Congress vs VBA)</span>
        </button>

        <button
          onClick={() => setActiveTab("voteMath")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === "voteMath"
              ? "bg-orange-500 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FaBullseye className="w-3.5 h-3.5" />
          <span>२. अपक्ष विजयाचे अंकगणित (The 3.5L Math)</span>
        </button>

        <button
          onClick={() => setActiveTab("acTargets")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === "acTargets"
              ? "bg-orange-500 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <HiLocationMarker className="w-4 h-4" />
          <span>३. ६ मतदारसंघांचे लक्ष्य (AC Targets)</span>
        </button>

        <button
          onClick={() => setActiveTab("actionPlan")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === "actionPlan"
              ? "bg-orange-500 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <HiFire className="w-4 h-4" />
          <span>४. १०० दिवसांचा कृती आराखडा (100-Day Roadmap)</span>
        </button>
      </div>

      {/* SECTION 1: COUNTER STRATEGY AGAINST OPPONENTS */}
      {activeTab === "counterStrategy" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                Multi-Front Opposition Counter-Strategy
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                प्रतिस्पर्धी पक्षांचे सखोल विश्लेषण व अपक्ष उमेदवाराची संधी
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                श्री रामदास पाटील सुमठाणकर यांनी दोन्ही प्रस्थापित आघाड्यांमधील मतभेदांचे रूपांतर अपक्ष विजयात कसे करावे?
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CARD A: BJP / MAHAYUTI */}
              <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/30 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-orange-500 text-white">
                      महायुती / भाजप
                    </span>
                    <span className="text-xs font-bold text-orange-800">सत्ताधारी ब्लॉक</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {bjp.partyBlock || "महायुती / भाजप गट"}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">बलस्थाने:</strong> {bjp.strengths || "शासकीय यंत्रणा, निवडणूक निधी."}
                    </div>
                    <div>
                      <strong className="text-red-700">कमकुवत दुवे व अंतर्गत कलह:</strong>
                      <p className="mt-1 text-slate-600 leading-relaxed">
                        {bjp.vulnerabilities || "चव्हाण-चिखलीकर छुपा संघर्ष, मूळ भाजप कार्यकर्त्यांमधील नाराजी, कापूस-सोयाबीन हमीभाव शेतकरी असंतोष."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-orange-200/80 bg-white p-3 rounded-xl">
                  <span className="text-[10px] font-extrabold uppercase text-orange-700 tracking-wider block">
                    श्री रामदास पाटील - अपक्ष रणनीती:
                  </span>
                  <p className="text-xs text-slate-800 font-medium mt-1">
                    {bjp.independentOpportunity || "नाराज कार्यकर्त्यांशी समन्वय साधणे, शेतकरी असंतोषाचे थेट नेतृत्व करून सत्ताविरोधी मतांचे ध्रुवीकरण करणे."}
                  </p>
                </div>
              </div>

              {/* CARD B: CONGRESS / MVA */}
              <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-600 text-white">
                      महाविकास आघाडी / काँग्रेस
                    </span>
                    <span className="text-xs font-bold text-blue-800">पारंपरिक विरोधी पक्ष</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {cong.partyBlock || "महाविकास आघाडी / काँग्रेस"}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">बलस्थाने:</strong> {cong.strengths || "परंपरागत व्होटबँक."}
                    </div>
                    <div>
                      <strong className="text-red-700">कमकुवत दुवे व संघटनात्मक पोकळी:</strong>
                      <p className="mt-1 text-slate-600 leading-relaxed">
                        {cong.vulnerabilities || "अशोक चव्हाणांनंतर ग्रामीण संघटना खिळखिळी, सक्षम नेतृत्वाची वानवा, केवळ भाजपविरोधावर अवलंबून राहणे."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-200/80 bg-white p-3 rounded-xl">
                  <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider block">
                    श्री रामदास पाटील - अपक्ष रणनीती:
                  </span>
                  <p className="text-xs text-slate-800 font-medium mt-1">
                    {cong.independentOpportunity || "काँग्रेसच्या निष्क्रीयतेला पर्याय म्हणून स्वतःला 'नांदेडच्या विकासाचा नवा चेहरा' म्हणून पुढे करणे; सुशिक्षित युवा व व्यापारी वर्ग जोडणे."}
                  </p>
                </div>
              </div>

              {/* CARD C: VBA / THIRD FRONT */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-600 text-white">
                      वंचित बहुजन आघाडी / Third Front
                    </span>
                    <span className="text-xs font-bold text-emerald-800">व्होट-स्प्लिटर फॅक्टर</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {vba.partyBlock || "वंचित बहुजन आघाडी (VBA) / AIMIM"}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">प्रभाव क्षेत्र:</strong> {vba.strengths || "देगलूर, नांदेड उत्तर व भोकरमध्ये व्होट-स्प्लिटिंग पॉकेट."}
                    </div>
                    <div>
                      <strong className="text-red-700">मर्यादा:</strong>
                      <p className="mt-1 text-slate-600 leading-relaxed">
                        {vba.vulnerabilities || "विजयी कोट्यापर्यंत पोहोचू शकत नाहीत; विशिष्ट समाजापुरता प्रभाव मर्यादित."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-200/80 bg-white p-3 rounded-xl">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider block">
                    श्री रामदास पाटील - अपक्ष रणनीती:
                  </span>
                  <p className="text-xs text-slate-800 font-medium mt-1">
                    {vba.independentOpportunity || "सर्वसमावेशक, तटस्थ सामाजिक आघाडी उभी करून सर्व घटकांमधील तरुणांना स्थानिक रोजगाराच्या मुद्द्यावर जोडणे."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: THE 3.5 LAKH VOTE MATH */}
      {activeTab === "voteMath" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                Independent Victory Arithmetic
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                त्रिकोणी लढतीमध्ये अपक्ष विजयाचे थेट अंकगणित (The 3.5 Lakh Formula)
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                नांदेड लोकसभा मतदारसंघात एकूण नोंदणीकृत मतदार सुमारे १८.५ लाख असून सरासरी ६०% मतदानात ~११ लाख मतदान होते.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">पारंपरिक थेट लढत</span>
                <h4 className="text-xl font-bold text-slate-900">द्विकोणी लढतीत (२ पक्ष)</h4>
                <p className="text-3xl font-extrabold text-slate-700">५.५+ लाख मते</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  ५०%+ मतदान आवश्यक असते, जे राष्ट्रीय पक्षांच्या चिन्हाशिवाय अपक्षाला मिळवणे कठीण असते.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/80 rounded-2xl p-6 space-y-3 border-2 border-amber-400 shadow-xs">
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">यंदाचे प्रत्यक्ष समीकरण</span>
                <h4 className="text-xl font-bold text-slate-900">त्रिकोणी / चौरंगी लढत (यंदा)</h4>
                <p className="text-3xl font-extrabold text-amber-700">
                  {strategy.winningTarget ? strategy.winningTarget.split("(")[0] : "३.४ ते ३.६ लाख मते"}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  भाजप (~३.२ लाख) आणि काँग्रेस (~३.० लाख) यांच्यात मते विभागली जाणार असल्याने, <strong>३.५ लाख मते मिळवणारा अपक्ष उमेदवार थेट विजयी होतो!</strong>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">मतांची विभागणी</span>
                <h4 className="text-xl font-bold text-slate-900">इतर / वंचित फॅक्टर</h4>
                <p className="text-3xl font-extrabold text-emerald-600">१.२ ते १.५ लाख</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  वंचित, नोटा व इतर अपक्ष १.२ लाख मते घेतील. यामुळे मुख्य उमेदवारांचा विजयाचा कटऑफ थेट खाली येतो.
                </p>
              </div>
            </div>

            {/* Core Vote Pillars for Shri Ramdas Patil */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-base font-extrabold text-slate-900 mb-4">
                श्री रामदास पाटील सुमठाणकर यांच्या मतांचे ४ प्रमुख खांब (Core Vote Pillars):
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">१. शेतकरी असंतोष</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">१.२ लाख</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    नायगाव, मुखेड व भोकरमधील कापूस-सोयाबीन उत्पादक, पीक विमा नुकसानग्रस्त शेतकरी.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">२. सुशिक्षित बेरोजगार युवा</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800">९० हजार</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    नांदेड उत्तर, दक्षिण व शहरी भागातील तरुण ज्यांना एमआयडीसी, आयटी व नवीन उद्योग हवे आहेत.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">३. लिंगायत व व्यापारी वर्ग</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">७० हजार</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    देगलूर, बिलोली, मुखेड व नांदेड शहरातील व्यापारी, जे पक्षांच्या दबावाला वैतागले आहेत.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">४. वैयक्तिक जनसंपर्क व स्वाभिमानी गट</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">७० हजार</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    गावपातळीवरील ग्रामपंचायत, सोसायटी व जुने निष्ठावंत कार्यकर्ते ज्यांचा स्वतःचा हक्काचा प्रभाव आहे.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ASSEMBLY CONSTITUENCY TARGETS */}
      {activeTab === "acTargets" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Constituency-Wise Targets
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                ६ विधानसभा मतदारसंघांचे लक्ष्य व मायक्रो-प्लॅनिंग (Target Votes from MongoDB)
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                प्रत्येक विधानसभा मतदारसंघातून अपक्ष विजयासाठी आवश्यक असणारा किमान मतांचा वाटा.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {acTargets.map((ac) => (
                <div key={ac.acNo} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-indigo-100 text-indigo-800">
                        AC {ac.acNo} • {ac.acName}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600">
                        लक्ष्य: {ac.targetVotes?.toLocaleString("en-IN")} मते
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      {ac.acName}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>रणनीती:</strong> {ac.strategy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Target Sum */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <HiCheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-bold text-slate-900">
                  ६ मतदारसंघांची एकूण एकत्रित मते: <strong>३,५०,००० मते (3.5 Lakh Votes)</strong>
                </span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-extrabold">
                अपक्ष विजयी आघाडी (Winning Margin)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: 100-DAY ROADMAP */}
      {activeTab === "actionPlan" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                Tactical Campaign Execution
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                १०० दिवसांचा अपक्ष प्रचार व जनसंपर्क कृती आराखडा
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                श्री रामदास पाटील सुमठाणकर यांच्या नेतृत्वाखालील टप्प्याटप्प्याने राबवायची मोहीम.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                    टप्पा १: दिवस १ ते २५ • बूथ संघटन व डिजिटल आर्मी
                  </span>
                  <span className="text-xs font-bold text-slate-500">पायाभूत तयारी</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  सर्व १,९००+ मतदान केंद्रांवर (Booths) ५-५ निष्ठावंत स्थानिक तरुणांची नेमणूक
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  प्रत्येक गावात "पाटील समर्थक मित्रमंडळ" आणि व्हॉट्सॲप ग्रुप्स तयार करणे. पक्षाच्या चिन्हाशिवाय थेट उमेदवाराचा वैयक्तिक परिचय, कार्य आणि विकासाचा दृष्टिकोन घराघरांपर्यंत पोहोचवणे.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    टप्पा २: दिवस २६ ते ६० • "नांदेड विकास जनसंवाद यात्रा"
                  </span>
                  <span className="text-xs font-bold text-slate-500">थेट जनसंपर्क</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  सर्व ६ विधानसभा मतदारसंघांतून श्री रामदास पाटील यांची थेट पदयात्रा व शेतकरी संवाद
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  नायगाव, मुखेड, भोकर, देगलूर, नांदेड उत्तर व दक्षिणमधील प्रमुख आठवडी बाजार आणि खेड्यापाड्यांत थेट चौपाल सभा. २९ मागण्यांचे "नांदेड विकास संकल्पपत्र" प्रकाशित करून जनतेकडून स्वाक्षऱ्या गोळा करणे.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                    टप्पा ३: दिवस ६१ ते ८५ • नाराज कार्यकर्ते व स्थानिक नेते समन्वय
                  </span>
                  <span className="text-xs font-bold text-slate-500">पडद्यामागील राजकीय रणनीती</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  भाजप व काँग्रेसमधील असंतुष्ट स्थानिक आजी-माजी लोकप्रतिनिधींना सोबत घेणे
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  जिल्हा परिषद, पंचायत समिती व सहकारी संस्थांमधील स्वाभिमानी नेत्यांची गुप्त बैठक घेऊन त्यांना अपक्ष उमेदवाराला पाठिंबा देण्यास प्रवृत्त करणे. स्थानिक पातळीवर "क्रॉस व्होटिंग" (Cross-voting) घडवून आणणे.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                    टप्पा ४: दिवस ८६ ते १०० • अंतिम मतदार मतदान मोहीम (GOTV)
                  </span>
                  <span className="text-xs font-bold text-slate-500">मतदान दिवस रणनीती</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  अपक्ष निवडणूक चिन्हाचा प्रचंड प्रचार व सकाळच्या सत्रात ७०% मतदान करवून घेणे
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  चिन्हाची घरोघरी ओळख (सॅम्पल स्लिप वाटप). शेतकरी, कामगार व ग्रामीण मतदारांना सकाळी ७ ते दुपारी १२ या वेळेत मतदान केंद्रावर आणण्यासाठी वाहनांचे नियोजन व बूथ एजंट्सचे संरक्षण.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ElectionAnalyticsLayout>
  );
}