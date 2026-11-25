import React, { useState, useEffect } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import { useElectionLanguage } from "@/context/ElectionLanguageContext";
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
  const { isMr, t } = useElectionLanguage();
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
        pageTitle={isMr ? "अपक्ष रणनीतिक कृती आराखडा" : "Strategic Action Plan (Independent)"}
        activePage="/admin/election-analytics/strategic-plan"
      >
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-xs text-slate-500 font-bold">
            {isMr ? "MongoDB Atlas वरून अपक्ष रणनीती डेटा लोड होत आहे..." : "Loading Independent Strategy data from MongoDB Atlas..."}
          </p>
        </div>
      </ElectionAnalyticsLayout>
    );
  }

  return (
    <ElectionAnalyticsLayout
      pageTitle={isMr ? "अपक्ष रणनीतिक कृती आराखडा" : "Strategic Action Plan (Independent)"}
      activePage="/admin/election-analytics/strategic-plan"
    >
      {/* Top Banner - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 relative overflow-hidden space-y-4">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs flex items-center gap-1.5">
              <HiSparkles className="w-3.5 h-3.5 text-amber-600" />
              {isMr ? "अपक्ष विजयी रणनीती" : "Independent Winning Strategy"}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {isMr ? "उमेदवार:" : "Candidate:"} {strategy.candidateName || data?.candidateName || (isMr ? "श्री रामदास पाटील सुमठाणकर" : "Shri Ramdas Patil Sumthankar")}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isMr ? "नांदेड लोकसभा: अपक्ष विजयी समीकरण व सर्वपक्षीय विरोधक विश्लेषण" : "Nanded Parliamentary Constituency: Independent Victory Formula & Multi-Party Analysis"}
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed">
            {strategy.slogan || (isMr ? "न पक्षाची मक्तेदारी, न राजकीय घराणेशाही — थेट जनतेचा नेता, नांदेडचा विकास!" : "No Party Monopoly, No Dynastic Rule — Directly the People's Voice, Development for Nanded!")}
          </p>

          {/* Quick Stats Grid - Clean Light Theme */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-amber-50/80 rounded-2xl p-3 border-2 border-amber-300">
              <span className="text-[11px] text-amber-800 font-bold block uppercase tracking-wider">
                {isMr ? "अपक्ष विजयी कोटा (लक्ष्य)" : "Independent Victory Target"}
              </span>
              <p className="text-lg md:text-xl font-extrabold text-amber-950 mt-0.5">
                {strategy.winningTarget ? strategy.winningTarget.split("(")[0] : (isMr ? "३.४ ते ३.६ लाख मते" : "3.4 - 3.6 Lakh Votes")}
              </p>
              <span className="text-[10px] text-amber-800 font-bold">
                {isMr ? "३५% व्होट शेअर पुरेसा" : "35% vote share sufficient"}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">
                {isMr ? "लढतीचे स्वरूप" : "Contest Dynamics"}
              </span>
              <p className="text-lg md:text-xl font-extrabold text-slate-900 mt-0.5">
                {isMr ? "त्रिकोणी / चौरंगी" : "Triangular / 4-Cornered"}
              </p>
              <span className="text-[10px] text-indigo-600 font-semibold">
                {isMr ? "मते विभागणीचा थेट लाभ" : "Direct gain from vote split"}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">
                {isMr ? "मुख्य केंद्रबिंदू" : "Core Focus Focus"}
              </span>
              <p className="text-lg md:text-xl font-extrabold text-emerald-700 mt-0.5">
                {isMr ? "शेतकरी + युवा विकास" : "Farmers & Youth Revival"}
              </p>
              <span className="text-[10px] text-slate-500">
                {isMr ? "२९ स्थानिक मागण्यांवर भर" : "Driven by 29 local demands"}
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">
                {isMr ? "उमेदवारी स्वरूप" : "Candidacy Type"}
              </span>
              <p className="text-sm md:text-base font-extrabold text-slate-900 mt-0.5 truncate">
                {strategy.candidacyType || (isMr ? "अपक्ष (Independent)" : "Independent")}
              </p>
              <span className="text-[10px] text-slate-500 font-medium">
                {isMr ? "पक्षातीत लोकनेता" : "Leader beyond party lines"}
              </span>
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
          <span>{isMr ? "१. सर्वपक्षीय विरोधक विश्लेषण (BJP vs Congress vs VBA)" : "1. Opposition Analysis (BJP vs Congress vs VBA)"}</span>
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
          <span>{isMr ? "२. अपक्ष विजयाचे अंकगणित (The 3.5L Math)" : "2. Victory Arithmetic (The 3.5L Math)"}</span>
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
          <span>{isMr ? "३. ६ मतदारसंघांचे लक्ष्य (AC Targets)" : "3. Assembly Targets (6 ACs)"}</span>
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
          <span>{isMr ? "४. १०० दिवसांचा कृती आराखडा (100-Day Roadmap)" : "4. 100-Day Tactical Roadmap"}</span>
        </button>
      </div>

      {/* SECTION 1: COUNTER STRATEGY AGAINST OPPONENTS */}
      {activeTab === "counterStrategy" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                {isMr ? "सर्वपक्षीय विरोधक काउंटर-रणनीती" : "Multi-Front Opposition Counter-Strategy"}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                {isMr ? "प्रतिस्पर्धी पक्षांचे सखोल विश्लेषण व अपक्ष उमेदवाराची संधी" : "Deep Analysis of Opponents & Independent Opportunity"}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                {isMr
                  ? "श्री रामदास पाटील सुमठाणकर यांनी दोन्ही प्रस्थापित आघाड्यांमधील मतभेदांचे रूपांतर अपक्ष विजयात कसे करावे?"
                  : "How Shri Ramdas Patil Sumthankar can translate internal party friction within both establishments into an Independent victory."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CARD A: BJP / MAHAYUTI */}
              <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/30 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-orange-500 text-white">
                      {isMr ? "महायुती / भाजप" : "Mahayuti / BJP"}
                    </span>
                    <span className="text-xs font-bold text-orange-800">
                      {isMr ? "सत्ताधारी गट" : "Ruling Block"}
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {bjp.partyBlock || (isMr ? "महायुती / भाजप गट" : "Mahayuti / BJP Alliance")}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">{isMr ? "बलस्थाने:" : "Strengths:"}</strong> {bjp.strengths || (isMr ? "शासकीय यंत्रणा, निवडणूक निधी." : "Administrative machinery, election funding.")}
                    </div>
                    <div>
                      <strong className="text-red-700">{isMr ? "कमकुवत दुवे व अंतर्गत कलह:" : "Vulnerabilities & Internal Discord:"}</strong>
                      <p className="mt-1 text-slate-600 leading-relaxed">
                        {bjp.vulnerabilities || (isMr ? "चव्हाण-चिखलीकर छुपा संघर्ष, मूळ भाजप कार्यकर्त्यांमधील नाराजी, कापूस-सोयाबीन हमीभाव शेतकरी असंतोष." : "Subsurface leadership friction, disaffection among cadre, agrarian resentment over cotton-soybean prices.")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-orange-200/80 bg-white p-3 rounded-xl">
                  <span className="text-[10px] font-extrabold uppercase text-orange-700 tracking-wider block">
                    {isMr ? "श्री रामदास पाटील - अपक्ष रणनीती:" : "Shri Ramdas Patil - Independent Strategy:"}
                  </span>
                  <p className="text-xs text-slate-800 font-medium mt-1">
                    {bjp.independentOpportunity || (isMr ? "नाराज कार्यकर्त्यांशी समन्वय साधणे, शेतकरी असंतोषाचे थेट नेतृत्व करून सत्ताविरोधी मतांचे ध्रुवीकरण करणे." : "Coordinate with disgruntled grassroots cadre, lead farmer protests directly, and harness anti-incumbency.")}
                  </p>
                </div>
              </div>

              {/* CARD B: CONGRESS / MVA */}
              <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-600 text-white">
                      {isMr ? "महाविकास आघाडी / काँग्रेस" : "MVA / Congress"}
                    </span>
                    <span className="text-xs font-bold text-blue-800">
                      {isMr ? "पारंपरिक विरोधी पक्ष" : "Traditional Opposition"}
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {cong.partyBlock || (isMr ? "महाविकास आघाडी / काँग्रेस" : "MVA / Congress Alliance")}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">{isMr ? "बलस्थाने:" : "Strengths:"}</strong> {cong.strengths || (isMr ? "परंपरागत व्होटबँक." : "Traditional vote banks.")}
                    </div>
                    <div>
                      <strong className="text-red-700">{isMr ? "कमकुवत दुवे व संघटनात्मक पोकळी:" : "Vulnerabilities & Vacuum:"}</strong>
                      <p className="mt-1 text-slate-600 leading-relaxed">
                        {cong.vulnerabilities || (isMr ? "अशोक चव्हाणांनंतर ग्रामीण संघटना खिळखिळी, सक्षम नेतृत्वाची वानवा, केवळ भाजपविरोधावर अवलंबून राहणे." : "Weakened rural organization, vacuum in decisive ground leadership, reliance merely on anti-BJP sentiment.")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-200/80 bg-white p-3 rounded-xl">
                  <span className="text-[10px] font-extrabold uppercase text-blue-700 tracking-wider block">
                    {isMr ? "श्री रामदास पाटील - अपक्ष रणनीती:" : "Shri Ramdas Patil - Independent Strategy:"}
                  </span>
                  <p className="text-xs text-slate-800 font-medium mt-1">
                    {cong.independentOpportunity || (isMr ? "काँग्रेसच्या निष्क्रीयतेला पर्याय म्हणून स्वतःला 'नांदेडच्या विकासाचा नवा चेहरा' म्हणून पुढे करणे; सुशिक्षित युवा व व्यापारी वर्ग जोडणे." : "Present as the proactive, developmental alternative to Congress inaction; mobilize educated youth and merchants.")}
                  </p>
                </div>
              </div>

              {/* CARD C: VBA / THIRD FRONT */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-600 text-white">
                      {isMr ? "वंचित बहुजन आघाडी / तिसरी आघाडी" : "VBA / Third Front"}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      {isMr ? "व्होट-स्प्लिटर फॅक्टर" : "Vote-Splitter Factor"}
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    {vba.partyBlock || (isMr ? "वंचित बहुजन आघाडी (VBA) / AIMIM" : "VBA / AIMIM Block")}
                  </h4>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">{isMr ? "प्रभाव क्षेत्र:" : "Sphere of Influence:"}</strong> {vba.strengths || (isMr ? "देगलूर, नांदेड उत्तर व भोकरमध्ये व्होट-स्प्लिटिंग पॉकेट." : "Vote-splitting pockets in Deglur, Nanded North, and Bhokar.")}
                    </div>
                    <div>
                      <strong className="text-red-700">{isMr ? "मर्यादा:" : "Limitations:"}</strong>
                      <p className="mt-1 text-slate-600 leading-relaxed">
                        {vba.vulnerabilities || (isMr ? "विजयी कोट्यापर्यंत पोहोचू शकत नाहीत; विशिष्ट समाजापुरता प्रभाव मर्यादित." : "Cannot reach the winning threshold; influence limited to specific pockets.")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-emerald-200/80 bg-white p-3 rounded-xl">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider block">
                    {isMr ? "श्री रामदास पाटील - अपक्ष रणनीती:" : "Shri Ramdas Patil - Independent Strategy:"}
                  </span>
                  <p className="text-xs text-slate-800 font-medium mt-1">
                    {vba.independentOpportunity || (isMr ? "सर्वसमावेशक, तटस्थ सामाजिक आघाडी उभी करून सर्व घटकांमधील तरुणांना स्थानिक रोजगाराच्या मुद्द्यावर जोडणे." : "Build an inclusive, neutral social front rallying youth across communities on local employment.")}
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
                {isMr ? "अपक्ष विजय अंकगणित" : "Independent Victory Arithmetic"}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                {isMr
                  ? "त्रिकोणी लढतीमध्ये अपक्ष विजयाचे थेट अंकगणित (The 3.5 Lakh Formula)"
                  : "Direct Mathematics for Independent Victory in Triangular Contest (3.5L Formula)"}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                {isMr
                  ? "नांदेड लोकसभा मतदारसंघात एकूण नोंदणीकृत मतदार सुमारे १८.५ लाख असून सरासरी ६०% मतदानात ~११ लाख मतदान होते."
                  : "Nanded PC has ~18.5 lakh registered voters; at ~60% turnout, approximately ~11 lakh votes are polled."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isMr ? "पारंपरिक थेट लढत" : "Traditional 2-Way Contest"}
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  {isMr ? "द्विकोणी लढतीत (२ पक्ष)" : "In a 2-Way Contest"}
                </h4>
                <p className="text-3xl font-extrabold text-slate-700">
                  {isMr ? "५.५+ लाख मते" : "5.5+ Lakh Votes"}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isMr
                    ? "५०%+ मतदान आवश्यक असते, जे राष्ट्रीय पक्षांच्या चिन्हाशिवाय अपक्षाला मिळवणे कठीण असते."
                    : "50%+ vote share required, which is difficult for an independent without national party machinery."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/80 rounded-2xl p-6 space-y-3 border-2 border-amber-400 shadow-xs">
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                  {isMr ? "यंदाचे प्रत्यक्ष समीकरण" : "Actual 2024-26 Equation"}
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  {isMr ? "त्रिकोणी / चौरंगी लढत (यंदा)" : "Triangular / 4-Way Split"}
                </h4>
                <p className="text-3xl font-extrabold text-amber-700">
                  {strategy.winningTarget ? strategy.winningTarget.split("(")[0] : (isMr ? "३.४ ते ३.६ लाख मते" : "3.4 - 3.6 Lakh Votes")}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isMr ? (
                    <>भाजप (~३.२ लाख) आणि काँग्रेस (~३.० लाख) यांच्यात मते विभागली जाणार असल्याने, <strong>३.५ लाख मते मिळवणारा अपक्ष उमेदवार थेट विजयी होतो!</strong></>
                  ) : (
                    <>With BJP (~3.2L) and Congress (~3.0L) polarizing against each other, <strong>an Independent crossing 3.5L votes wins outright!</strong></>
                  )}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-xs">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {isMr ? "मतांची विभागणी" : "Split Votes"}
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  {isMr ? "इतर / वंचित फॅक्टर" : "Other / VBA Factor"}
                </h4>
                <p className="text-3xl font-extrabold text-emerald-600">
                  {isMr ? "१.२ ते १.५ लाख" : "1.2 - 1.5 Lakh"}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isMr
                    ? "वंचित, नोटा व इतर अपक्ष १.२ लाख मते घेतील. यामुळे मुख्य उमेदवारांचा विजयाचा कटऑफ थेट खाली येतो."
                    : "VBA, NOTA, and fringe candidates pool 1.2+ lakh votes, significantly lowering the winning cutoff threshold."}
                </p>
              </div>
            </div>

            {/* Core Vote Pillars for Shri Ramdas Patil */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-base font-extrabold text-slate-900 mb-4">
                {isMr
                  ? "श्री रामदास पाटील सुमठाणकर यांच्या मतांचे ४ प्रमुख खांब (Core Vote Pillars):"
                  : "4 Core Vote Pillars for Shri Ramdas Patil Sumthankar:"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {isMr ? "१. शेतकरी असंतोष" : "1. Agrarian Discontent"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                      {isMr ? "१.२ लाख" : "1.2 Lakh"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isMr
                      ? "नायगाव, मुखेड व भोकरमधील कापूस-सोयाबीन उत्पादक, पीक विमा नुकसानग्रस्त शेतकरी."
                      : "Cotton and soybean growers in Naigaon, Mukhed, and Bhokar impacted by crop insurance delays."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {isMr ? "२. सुशिक्षित बेरोजगार युवा" : "2. Educated Youth"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800">
                      {isMr ? "९० हजार" : "90 Thousand"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isMr
                      ? "नांदेड उत्तर, दक्षिण व शहरी भागातील तरुण ज्यांना एमआयडीसी, आयटी व नवीन उद्योग हवे आहेत."
                      : "Youth in Nanded North, South, and urban pockets demanding MIDC revival and modern employment."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {isMr ? "३. लिंगायत व व्यापारी वर्ग" : "3. Lingayat & Traders"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
                      {isMr ? "७० हजार" : "70 Thousand"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isMr
                      ? "देगलूर, बिलोली, मुखेड व नांदेड शहरातील व्यापारी, जे पक्षांच्या दबावाला वैतागले आहेत."
                      : "Merchants in Deglur, Biloli, Mukhed, and Nanded City tired of administrative coercion."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {isMr ? "४. वैयक्तिक जनसंपर्क गट" : "4. Grassroots Networks"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">
                      {isMr ? "७० हजार" : "70 Thousand"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {isMr
                      ? "गावपातळीवरील ग्रामपंचायत, सोसायटी व जुने निष्ठावंत कार्यकर्ते ज्यांचा स्वतःचा हक्काचा प्रभाव आहे."
                      : "Village-level Gram Panchayat, cooperative society, and loyal local networks."}
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
                {isMr ? "मतदारसंघनिहाय लक्ष्य" : "Constituency-Wise Targets"}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                {isMr
                  ? "६ विधानसभा मतदारसंघांचे लक्ष्य व मायक्रो-प्लॅनिंग (Target Votes from MongoDB)"
                  : "6 Assembly Constituency Targets & Micro-Planning (Target Votes from MongoDB)"}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                {isMr
                  ? "प्रत्येक विधानसभा मतदारसंघातून अपक्ष विजयासाठी आवश्यक असणारा किमान मतांचा वाटा."
                  : "Minimum vote share required from each assembly segment for Independent victory."}
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
                        {isMr ? "लक्ष्य:" : "Target:"} {ac.targetVotes ? ac.targetVotes.toLocaleString(isMr ? "en-IN" : "en-US") : ""} {isMr ? "मते" : "Votes"}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      {ac.acName}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>{isMr ? "रणनीती:" : "Strategy:"}</strong> {ac.strategy}
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
                  {isMr ? "६ मतदारसंघांची एकूण एकत्रित मते:" : "Combined 6-AC Total Votes:"} <strong>{isMr ? "३,५०,००० मते (3.5 Lakh Votes)" : "3,50,000 Votes (3.5 Lakh Votes)"}</strong>
                </span>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-extrabold">
                {isMr ? "अपक्ष विजयी आघाडी" : "Independent Winning Margin"}
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
                {isMr ? "प्रचार मोहीम अंमलबजावणी" : "Tactical Campaign Execution"}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-2">
                {isMr ? "१०० दिवसांचा अपक्ष प्रचार व जनसंपर्क कृती आराखडा" : "100-Day Tactical Independent Campaign Roadmap"}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                {isMr
                  ? "श्री रामदास पाटील सुमठाणकर यांच्या नेतृत्वाखालील टप्प्याटप्प्याने राबवायची मोहीम."
                  : "Phased execution strategy led by Shri Ramdas Patil Sumthankar."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                    {isMr ? "टप्पा १: दिवस १ ते २५ • बूथ संघटन व डिजिटल फळी" : "Phase 1: Days 1 to 25 • Booth Mobilization & Digital Army"}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isMr ? "पायाभूत तयारी" : "Ground Foundation"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {isMr
                    ? "सर्व १,९००+ मतदान केंद्रांवर (Booths) ५-५ निष्ठावंत स्थानिक तरुणांची नेमणूक"
                    : "Deploying 5 Committed Local Youths Across All 1,900+ Polling Booths"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isMr
                    ? "प्रत्येक गावात 'पाटील समर्थक मित्रमंडळ' आणि व्हॉट्सॲप ग्रुप्स तयार करणे. पक्षाच्या चिन्हाशिवाय थेट उमेदवाराचा वैयक्तिक परिचय, कार्य आणि विकासाचा दृष्टिकोन घराघरांपर्यंत पोहोचवणे."
                    : "Establishing local village support networks and WhatsApp communication trees. Taking the candidate's personal credibility and development vision directly door-to-door without party middlemen."}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {isMr ? "टप्पा २: दिवस २६ ते ६० • 'नांदेड विकास जनसंवाद यात्रा'" : "Phase 2: Days 26 to 60 • 'Nanded Vikas Jan-Samvad Yatra'"}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isMr ? "थेट जनसंपर्क" : "Direct Mass Outreach"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {isMr
                    ? "सर्व ६ विधानसभा मतदारसंघांतून श्री रामदास पाटील यांची थेट पदयात्रा व शेतकरी संवाद"
                    : "Direct Foot March (Padyatra) & Farmer Townhalls by Shri Ramdas Patil Across All 6 ACs"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isMr
                    ? "नायगाव, मुखेड, भोकर, देगलूर, नांदेड उत्तर व दक्षिणमधील प्रमुख आठवडी बाजार आणि खेड्यापाड्यांत थेट चौपाल सभा. २९ मागण्यांचे 'नांदेड विकास संकल्पपत्र' प्रकाशित करून जनतेकडून स्वाक्षऱ्या गोळा करणे."
                    : "Townhall meetings in major weekly markets and rural clusters of Naigaon, Mukhed, Bhokar, Deglur, and Nanded North/South. Distributing the 29-Demands Citizen Charter and collecting public endorsements."}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                    {isMr ? "टप्पा ३: दिवस ६१ ते ८५ • नाराज कार्यकर्ते व स्थानिक नेते समन्वय" : "Phase 3: Days 61 to 85 • Coalition of Disaffected Grassroots Leaders"}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isMr ? "पडद्यामागील राजकीय रणनीती" : "Strategic Alignment"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {isMr
                    ? "भाजप व काँग्रेसमधील असंतुष्ट स्थानिक आजी-माजी लोकप्रतिनिधींना सोबत घेणे"
                    : "Bringing Together Disillusioned Grassroots Leaders From Both BJP and Congress"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isMr
                    ? "जिल्हा परिषद, पंचायत समिती व सहकारी संस्थांमधील स्वाभिमानी नेत्यांशी संवाद साधून त्यांना अपक्ष उमेदवाराला पाठिंबा देण्यास प्रवृत्त करणे. स्थानिक पातळीवर 'क्रॉस व्होटिंग' घडवून आणणे."
                    : "Coordinating with self-respecting local leaders in ZP, Panchayat Samiti, and cooperative networks to engineer strategic cross-voting in support of the Independent candidacy."}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                    {isMr ? "टप्पा ४: दिवस ८६ ते १०० • अंतिम मतदार मतदान मोहीम (GOTV)" : "Phase 4: Days 86 to 100 • Get Out The Vote (GOTV) Blitz"}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {isMr ? "मतदान दिवस रणनीती" : "Polling Day Execution"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {isMr
                    ? "अपक्ष निवडणूक चिन्हाचा प्रचंड प्रचार व सकाळच्या सत्रात ७०% मतदान करवून घेणे"
                    : "Aggressive Independent Symbol Promotion & Securing 70% Morning Voter Turnout"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isMr
                    ? "चिन्हाची घरोघरी ओळख (सॅम्पल स्लिप वाटप). शेतकरी, कामगार व ग्रामीण मतदारांना सकाळी ७ ते दुपारी १२ या वेळेत मतदान केंद्रावर आणण्यासाठी वाहनांचे नियोजन व बूथ एजंट्सचे संरक्षण."
                    : "Door-to-door distribution of voter slips with prominent election symbol. Mobilizing farmers, laborers, and rural voters between 7 AM and 12 PM with dedicated booth assistance."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </ElectionAnalyticsLayout>
  );
}