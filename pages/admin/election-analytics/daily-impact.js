import React, { useState, useEffect, useMemo } from "react";
import ElectionAnalyticsLayout from "@/components/ElectionAnalyticsLayout";
import {
  HiLightningBolt,
  HiTrendingUp,
  HiTrendingDown,
  HiSearch,
  HiGlobeAlt,
  HiNewspaper,
  HiExternalLink,
  HiSparkles,
  HiRefresh,
  HiFire,
  HiShieldCheck
} from "react-icons/hi";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { useElectionLanguage } from "@/context/ElectionLanguageContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export default function DailyImpactPage() {
  const { lang, isMr, isEn, t } = useElectionLanguage();
  const [dailyImpact, setDailyImpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState("");
  const [selectedDate, setSelectedDate] = useState("all");
  const [availableDates, setAvailableDates] = useState(["2026-11-25", "2026-11-24"]);

  // Feed filter states
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [feedSearchQuery, setFeedSearchQuery] = useState("");
  const [feedSelectedAc, setFeedSelectedAc] = useState("all");

  useEffect(() => {
    fetchDailyImpact("all");
  }, []);

  const fetchDailyImpact = async (targetDate) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/election-analytics/daily-impact?date=${targetDate}`);
      const data = await res.json();
      if (data && (data.acImpactScorecard || data.curatedTopHeadlines)) {
        setDailyImpact(data);
        if (data.date) setSelectedDate(data.date);
        if (data.availableDates?.length) setAvailableDates(data.availableDates);
      }
    } catch (err) {
      console.error("Error fetching daily impact:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshMsg("");
    try {
      const res = await fetch("/api/election-analytics/daily-impact?refresh=true");
      const data = await res.json();
      if (data && data.acImpactScorecard) {
        setDailyImpact(data);
        setRefreshMsg(data.message || (isMr ? "ताजी माहिती अपडेट झाली!" : "Fresh intelligence fetched!"));
      }
    } catch (err) {
      console.error("Refresh error:", err);
      setRefreshMsg(isMr ? "रिफ्रेश अयशस्वी. साठवलेला डेटा दाखवत आहे." : "Refresh failed. Displaying cached data.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchDailyImpact(date);
  };

  // Timeline Trend Chart Data
  const trendChartData = useMemo(() => {
    const trend = dailyImpact?.timelineTrend || [];
    return {
      labels: trend.map((t) => t.date),
      datasets: [
        {
          label: isMr ? "सकारात्मक जनभावना (%)" : "Positive Sentiment (%)",
          data: trend.map((t) => t.positive),
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          tension: 0.35,
          fill: true,
          pointBackgroundColor: "#10b981",
          pointRadius: 4
        },
        {
          label: isMr ? "उष्णता निर्देशांक (Heat Score)" : "Heat Score",
          data: trend.map((t) => t.heatScore),
          borderColor: "#ef4444",
          borderDash: [5, 5],
          tension: 0.3,
          pointBackgroundColor: "#ef4444",
          pointRadius: 4
        },
        {
          label: isMr ? "नकारात्मक जनभावना (%)" : "Negative Sentiment (%)",
          data: trend.map((t) => t.negative),
          borderColor: "#f97316",
          tension: 0.35,
          pointBackgroundColor: "#f97316",
          pointRadius: 3
        }
      ]
    };
  }, [dailyImpact, isMr]);

  // AC Heat Score Chart Data
  const acHeatChartData = useMemo(() => {
    const list = dailyImpact?.acImpactScorecard || [];
    return {
      labels: list.map((ac) => ac.acName),
      datasets: [
        {
          label: isMr ? "उष्णता गुणांक (०-१००)" : "Heat Score (0-100)",
          data: list.map((ac) => ac.heatScore),
          backgroundColor: list.map((ac) =>
            ac.heatScore >= 80 ? "#ef4444" : ac.heatScore >= 70 ? "#f97316" : "#eab308"
          ),
          borderRadius: 8
        }
      ]
    };
  }, [dailyImpact, isMr]);

  const allSocialList = dailyImpact?.socialMediaPulse?.socialSignals || [];
  const allHeadlinesList = dailyImpact?.curatedTopHeadlines || [];

  return (
    <ElectionAnalyticsLayout
      pageTitle={isMr ? "थेट पडसाद व बातम्या" : "Daily Media & AC Impact"}
      activePage="/admin/election-analytics/daily-impact"
    >
      {/* Top Banner with 4-Call Refresh Button - Clean White Theme */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
              <HiLightningBolt className="w-3.5 h-3.5 text-blue-600" />
              {t("dailyPipelineBadge")}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t("dbLive")}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("dailyTitle")}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {t("dailySub")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <HiRefresh className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? t("refreshing") : t("refreshButton")}</span>
          </button>
        </div>
      </div>

      {refreshMsg && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
          <HiSparkles className="w-4 h-4 text-amber-600" />
          <span>{refreshMsg}</span>
        </div>
      )}

      {/* Date Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <HiGlobeAlt className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold text-slate-800">{t("dateSelector")}</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => handleDateChange("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedDate === "all"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <HiGlobeAlt className="w-3.5 h-3.5" />
            <span>{t("allCombinedFeed")} ({allSocialList.length + allHeadlinesList.length})</span>
          </button>

          {availableDates.map((dt) => {
            const isSelected = selectedDate === dt;
            const label =
              dt === "2026-11-25"
                ? isMr ? "📅 २५ नोव्हेंबर (ताजी बातमी)" : "📅 25 Nov (Latest)"
                : dt === "2026-11-24"
                ? isMr ? "📅 २४ नोव्हेंबर" : "📅 24 Nov"
                : `📅 ${dt}`;

            return (
              <button
                key={dt}
                onClick={() => handleDateChange(dt)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Graphs Row: 7-Day Dynamic Trend & AC Heat Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Dynamic Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">
                {t("timelineTrendTitle")}
              </h3>
              <p className="text-xs text-slate-500">
                {t("timelineTrendSub")}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800">
              {t("dbLive")}
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <Line
              data={trendChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: "index", intersect: false },
                plugins: {
                  legend: { position: "top", labels: { boxWidth: 12, font: { size: 11, weight: "bold" } } },
                  tooltip: { backgroundColor: "#1e293b", padding: 10 }
                },
                scales: {
                  y: { min: 0, max: 100, grid: { color: "#f1f5f9" }, ticks: { font: { size: 10 } } },
                  x: { grid: { display: false }, ticks: { font: { size: 10, weight: "bold" } } }
                }
              }}
            />
          </div>
        </div>

        {/* AC Heat Score Chart */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-800">
              {isMr ? "विधानसभा मतदारसंघ राजकीय उष्णता" : "Assembly Constituencies Political Heat Score"}
            </h3>
            <p className="text-xs text-slate-500">
              {isMr ? "६ मतदारसंघांमधील घडामोडींची तीव्रता" : "Intensity of political developments across 6 ACs"}
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <Bar
              data={acHeatChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { backgroundColor: "#1e293b", padding: 10 }
                },
                scales: {
                  y: { min: 0, max: 100, grid: { color: "#f1f5f9" }, ticks: { font: { size: 10 } } },
                  x: { grid: { display: false }, ticks: { font: { size: 10, weight: "bold" } } }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* LIVE SIGNALS FEED HUB */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        {/* Hub Banner - Clean Light Theme */}
        <div className="bg-slate-50/90 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600 border border-orange-200">
              <HiSparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base md:text-lg font-extrabold text-slate-900">
                  {t("feedHubTitle")}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t("dbLive")}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {t("feedHubSub")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white text-slate-700 border border-slate-200 font-medium shadow-2xs">
              {isMr ? "उपलब्ध:" : "Available:"} <strong className="text-orange-600">{allSocialList.length}</strong> {isMr ? "सोशल पोस्ट्स" : "Social Posts"} • <strong className="text-orange-600">{allHeadlinesList.length}</strong> {isMr ? "बातम्या" : "Press News"}
            </span>
          </div>
        </div>

        {/* Search & AC Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isMr ? "फीड मध्ये शोधा (उदा. शेतकरी, हमीभाव, आरक्षण, रुग्णालय, कापूस)..." : "Search in feed (e.g. Farmers, MSP, Hospital, Cotton)..."}
              value={feedSearchQuery}
              onChange={(e) => setFeedSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-xs md:text-sm text-slate-800 placeholder-slate-400 transition-all outline-hidden"
            />
            {feedSearchQuery && (
              <button
                onClick={() => setFeedSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={feedSelectedAc}
              onChange={(e) => setFeedSelectedAc(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 text-xs md:text-sm text-slate-700 font-semibold transition-all outline-hidden cursor-pointer"
            >
              <option value="all">{isMr ? "सर्व मतदारसंघ (All Constituencies)" : "All Constituencies"}</option>
              <option value="Nanded North">{isMr ? "८६ नांदेड उत्तर" : "86 Nanded North"}</option>
              <option value="Nanded South">{isMr ? "८७ नांदेड दक्षिण" : "87 Nanded South"}</option>
              <option value="Bhokar">{isMr ? "८५ भोकर" : "85 Bhokar"}</option>
              <option value="Naigaon">{isMr ? "८९ नायगाव" : "89 Naigaon"}</option>
              <option value="Deglur">{isMr ? "९० देगलूर" : "90 Deglur"}</option>
              <option value="Mukhed">{isMr ? "९१ मुखेड" : "91 Mukhed"}</option>
              <option value="Nanded PC">{isMr ? "नांदेड लोकसभा" : "Nanded PC"}</option>
            </select>
          </div>
        </div>

        {/* Platform & Sentiment Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          {/* Platform Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setSelectedPlatform("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {isMr ? "सर्व" : "All"} ({allSocialList.length + allHeadlinesList.length})
            </button>
            <button
              onClick={() => setSelectedPlatform("facebook")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === "facebook" ? "bg-[#1877F2] text-white shadow-xs" : "text-slate-600 hover:text-[#1877F2]"
              }`}
            >
              <FaFacebook className="w-3.5 h-3.5" /> {isMr ? "फेसबुक" : "FB"} ({allSocialList.filter((s) => (s.platform || "").toLowerCase().includes("facebook")).length})
            </button>
            <button
              onClick={() => setSelectedPlatform("instagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === "instagram" ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              <FaInstagram className="w-3.5 h-3.5" /> {isMr ? "इन्स्टा" : "Insta"} ({allSocialList.filter((s) => (s.platform || "").toLowerCase().includes("instagram")).length})
            </button>
            <button
              onClick={() => setSelectedPlatform("twitter")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === "twitter" ? "bg-sky-500 text-white shadow-xs" : "text-slate-600 hover:text-sky-600"
              }`}
            >
              <FaTwitter className="w-3.5 h-3.5" /> {isMr ? "ट्विटर (X)" : "X"} ({allSocialList.filter((s) => (s.platform || "").toLowerCase().includes("twitter") || (s.platform || "").toLowerCase().includes("x")).length})
            </button>
            <button
              onClick={() => setSelectedPlatform("youtube")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === "youtube" ? "bg-red-600 text-white shadow-xs" : "text-slate-600 hover:text-red-600"
              }`}
            >
              <FaYoutube className="w-3.5 h-3.5" /> {isMr ? "युट्यूब" : "YT"} ({allSocialList.filter((s) => (s.platform || "").toLowerCase().includes("youtube")).length})
            </button>
            <button
              onClick={() => setSelectedPlatform("news")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === "news" ? "bg-orange-600 text-white shadow-xs" : "text-slate-600 hover:text-orange-600"
              }`}
            >
              <HiNewspaper className="w-3.5 h-3.5" /> {isMr ? "वृत्तपत्रे" : "Press"} ({allHeadlinesList.length})
            </button>
          </div>

          {/* Sentiment Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedSentiment("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSentiment === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
              }`}
            >
              {isMr ? "सर्व जनभावना" : "All Sentiments"}
            </button>
            <button
              onClick={() => setSelectedSentiment("positive")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSentiment === "positive" ? "bg-emerald-600 text-white shadow-2xs" : "text-emerald-700"
              }`}
            >
              {isMr ? "सकारात्मक" : "Positive"}
            </button>
            <button
              onClick={() => setSelectedSentiment("neutral")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSentiment === "neutral" ? "bg-amber-500 text-white shadow-2xs" : "text-amber-700"
              }`}
            >
              {isMr ? "तटस्थ" : "Neutral"}
            </button>
            <button
              onClick={() => setSelectedSentiment("negative")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSentiment === "negative" ? "bg-red-600 text-white shadow-2xs" : "text-red-700"
              }`}
            >
              {isMr ? "नकारात्मक" : "Negative"}
            </button>
          </div>
        </div>

        {/* FEED GRID */}
        <div className="space-y-6">
          {/* 1. SOCIAL POSTS */}
          {selectedPlatform !== "news" && (
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                    {isMr ? "सोशल मीडिया सिग्नल्स (Facebook, Instagram, X, YouTube)" : "Social Media Signals (Facebook, Instagram, X, YouTube)"}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allSocialList
                  .filter((soc) => {
                    const p = (soc.platform || "").toLowerCase();
                    const platMatch =
                      selectedPlatform === "all" ||
                      (selectedPlatform === "facebook" && p.includes("facebook")) ||
                      (selectedPlatform === "instagram" && p.includes("instagram")) ||
                      (selectedPlatform === "twitter" && (p.includes("x") || p.includes("twitter"))) ||
                      (selectedPlatform === "youtube" && p.includes("youtube"));

                    const sentMatch =
                      selectedSentiment === "all" ||
                      (soc.sentiment || "").toLowerCase() === selectedSentiment.toLowerCase();

                    const acMatch =
                      feedSelectedAc === "all" ||
                      (soc.mappedAc || "").toLowerCase().includes(feedSelectedAc.toLowerCase());

                    const q = feedSearchQuery.trim().toLowerCase();
                    const queryMatch =
                      !q ||
                      (soc.title || "").toLowerCase().includes(q) ||
                      (soc.text || "").toLowerCase().includes(q) ||
                      (soc.author || "").toLowerCase().includes(q) ||
                      (soc.handle || "").toLowerCase().includes(q) ||
                      (soc.mappedAc || "").toLowerCase().includes(q);

                    return platMatch && sentMatch && acMatch && queryMatch;
                  })
                  .map((soc) => {
                    const isFb = soc.platform.includes("Facebook");
                    const isIg = soc.platform.includes("Instagram");
                    const isTw = soc.platform.includes("X") || soc.platform.includes("Twitter");
                    const isYt = soc.platform.includes("YouTube");

                    const sentText =
                      soc.sentiment === "Positive"
                        ? isMr ? "सकारात्मक" : "Positive"
                        : soc.sentiment === "Negative"
                        ? isMr ? "नकारात्मक" : "Negative"
                        : isMr ? "तटस्थ" : "Neutral";

                    return (
                      <div
                        key={soc.id}
                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1.5 ${
                                isFb
                                  ? "bg-[#1877F2] text-white"
                                  : isIg
                                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                  : isTw
                                  ? "bg-sky-600 text-white"
                                  : "bg-red-600 text-white"
                              }`}
                            >
                              {isFb && <FaFacebook className="w-3 h-3 text-white" />}
                              {isIg && <FaInstagram className="w-3 h-3 text-white" />}
                              {isTw && <FaTwitter className="w-3 h-3 text-sky-400" />}
                              {isYt && <FaYoutube className="w-3 h-3 text-white" />}
                              {soc.platform}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                📅 {soc.dateLabel || soc.date || (isMr ? "२५ नोव्हेंबर" : "25 Nov")}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                                {soc.mappedAc}
                              </span>
                            </div>
                          </div>

                          <div className="pt-0.5">
                            <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                              {soc.author}
                              {soc.handle && (
                                <span className="text-[11px] text-slate-400 font-normal">
                                  {soc.handle}
                                </span>
                              )}
                            </p>
                            <h5 className="text-sm font-extrabold text-slate-800 mt-1">
                              {soc.title}
                            </h5>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              "{soc.text}"
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                soc.sentiment === "Positive"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : soc.sentiment === "Negative"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            >
                              {sentText}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {soc.engagement}
                            </span>
                          </div>

                          {soc.link && (
                            <a
                              href={soc.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                            >
                              {isFb ? (isMr ? "फेसबुक पोस्ट पहा" : "View FB Post") : isIg ? (isMr ? "रील पहा" : "Watch Reel") : isTw ? (isMr ? "ट्विटरवर पहा" : "Open on X") : (isMr ? "व्हिडिओ पहा" : "Watch Video")}{" "}
                              <HiExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* 2. REGIONAL PRESS HEADLINES */}
          {(selectedPlatform === "all" || selectedPlatform === "news") && (
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                  <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
                    {isMr
                      ? "स्थानिक वृत्तपत्रे व माध्यम मथळे (पुढारी, सकाळ, ॲग्रोवन, सरकारनामा, एबीपी माझा)"
                      : "Regional Press & Vernacular News (Pudhari, Sakal, AgroWon, Sarkarnama, ABP Majha)"}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allHeadlinesList
                  .filter((head) => {
                    const acMatch =
                      feedSelectedAc === "all" ||
                      (head.mappedAc || "").toLowerCase().includes(feedSelectedAc.toLowerCase());

                    const q = feedSearchQuery.trim().toLowerCase();
                    const queryMatch =
                      !q ||
                      (head.title || "").toLowerCase().includes(q) ||
                      (head.summary || "").toLowerCase().includes(q) ||
                      (head.source || "").toLowerCase().includes(q) ||
                      (head.mappedAc || "").toLowerCase().includes(q);

                    return acMatch && queryMatch;
                  })
                  .map((head, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 text-slate-800 flex items-center gap-1">
                            <HiNewspaper className="w-3 h-3 text-slate-600" />
                            {head.source}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-100">
                              📅 {head.dateLabel || head.date || (isMr ? "२५ नोव्हेंबर" : "25 Nov")}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-800">
                              {head.mappedAc}
                            </span>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {head.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {head.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                          {isMr ? "प्रमाणित बातमी संदर्भ" : "Verified News Citation"}
                        </span>
                        {head.link && head.link !== "#" ? (
                          <a
                            href={head.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-bold text-slate-800 hover:text-orange-600"
                          >
                            {isMr ? "मूळ बातमी वाचा" : "Read Source Article"} <HiExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">{isMr ? "संग्रहित फीड" : "Archived feed"}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ElectionAnalyticsLayout>
  );
}
