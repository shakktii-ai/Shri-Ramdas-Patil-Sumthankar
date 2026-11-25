import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  HiUsers,
  HiChartBar,
  HiArrowRight,
  HiShieldCheck,
  HiDocumentText,
  HiCalendar,
  HiGlobeAlt,
  HiLogout,
  HiSparkles
} from "react-icons/hi";

export default function PortalSelect() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [hasElectionAccess, setHasElectionAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      const user = localStorage.getItem("username") || "";
      const allowedStr = localStorage.getItem("allowedPages");
      const allowedPages = allowedStr ? JSON.parse(allowedStr) : [];

      if (!role) {
        router.push("/login");
        return;
      }

      setUsername(user);
      setUserRole(role);

      const electionPerm =
        role === "admin" ||
        user === "admin" ||
        (Array.isArray(allowedPages) && allowedPages.includes("/admin/election-analytics"));

      setHasElectionAccess(electionPerm);

      // If user does not have election analytics permission, go directly to Visitor portal
      if (!electionPerm) {
        router.replace("/admin");
        return;
      }

      setLoading(false);
    }
  }, [router]);

  const handleSelectPortal = (portal) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activePortal", portal);
    }
    if (portal === "visitor") {
      router.push("/admin");
    } else {
      router.push("/admin/election-analytics");
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
      localStorage.removeItem("username");
      localStorage.removeItem("allowedPages");
      localStorage.removeItem("activePortal");
    }
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Select Portal – Shri Ramdas Patil Sumthankar</title>
        <meta name="description" content="Select between Visitor Management Portal and Election Analytics Portal." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 to-amber-50 flex flex-col justify-between p-4 md:p-8">
        {/* Top Bar */}
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 border-b border-orange-200/60">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400 shadow-md flex-shrink-0">
              <Image
                src="/Shri_Ramdas_patil.jpeg"
                alt="Shri Ramdas Patil Sumthankar"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-extrabold text-slate-900 leading-tight">
                श्री रामदास पाटील सुमठाणकर
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                नांदेड लोकसभा मतदारसंघ • स्वतंत्र जनसंपर्क व रणनीती प्रणाली
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800">{username}</span>
              <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                {userRole === "admin" ? "Super Admin" : "Authorized User"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-red-600 hover:border-red-200 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <HiLogout className="w-3.5 h-3.5" />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>

        {/* Center Content: Two Main Portal Cards */}
        <div className="max-w-4xl w-full mx-auto my-auto py-10">
          <div className="text-center mb-8 md:mb-12 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
              <HiShieldCheck className="w-4 h-4 text-orange-600" />
              कार्यक्षेत्र निवडा (Select Operating Portal)
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              कोणत्या पोर्टलवर काम करू इच्छिता?
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">
              आपल्या सोयीसाठी दैनंदिन अभ्यागत व्यवस्थापन आणि राजकीय निवडणूक विश्लेषण दोन स्वतंत्र दालनात विभागण्यात आले आहे.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* CARD 1: VISITOR PORTAL */}
            <div
              onClick={() => handleSelectPortal("visitor")}
              className="group bg-white rounded-3xl border-2 border-slate-200 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/10 p-6 md:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-200/60 transition-all" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                  <HiUsers className="w-7 h-7" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                    दैनिक जनसंपर्क
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  अभ्यागत व्यवस्थापन पोर्टल
                </h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                  Visitor Management Portal
                </p>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                  कार्यालयातील दैनंदिन अभ्यागतांची नोंदणी, आगत व निर्गत पत्रे (Inward/Outward Registry), वाढदिवस व शुभेच्छा कॅलेंडर, कार्यकर्ते व्यवस्थापन आणि निमंत्रण मंजुरी.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-6 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    अभ्यागत नोंदवही (Visitors)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    आगत / निर्गत पत्रे
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    वाढदिवस व कॅलेंडर
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    कार्यकर्ते व निमंत्रणे
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-orange-600 font-bold text-sm group-hover:text-orange-700">
                <span>अभ्यागत पोर्टलमध्ये प्रवेश करा</span>
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* CARD 2: ELECTION INTELLIGENCE PORTAL - Clean White Theme */}
            <div
              onClick={() => handleSelectPortal("election")}
              className="group bg-white rounded-3xl border-2 border-slate-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 p-6 md:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/80 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-100 transition-all" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <HiChartBar className="w-7 h-7" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                    <HiSparkles className="w-3 h-3 text-amber-600" />
                    अपक्ष विजयी रणनीती (Independent)
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  निवडणूक विश्लेषण पोर्टल
                </h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                  Election Intelligence Portal (7 Pages)
                </p>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                  श्री रामदास पाटील सुमठाणकर यांच्या अपक्ष उमेदवारीचे सखोल विश्लेषण: ६ विधानसभा मतदारसंघांचे बूथ गणित, २९ कळीच्या मागण्या, थेट सोशल मीडिया पडसाद व भाजप-काँग्रेस विरोधक काउंटर-रणनीती.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-6 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Executive & २०२४ GE
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    थेट सोशल मीडिया व बातम्या
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    ६ विधानसभा मतदारसंघ
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    २९ प्रश्न व अपक्ष रणनीती
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-indigo-600 font-bold text-sm group-hover:text-indigo-700">
                <span>निवडणूक विश्लेषण उघडा (७ स्वतंत्र पेजेस)</span>
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl w-full mx-auto text-center pt-6 border-t border-slate-200 text-xs text-slate-400">
          श्री रामदास पाटील सुमठाणकर जनसंपर्क कार्यालय • नांदेड लोकसभा मतदारसंघ (महाराष्ट्र)
        </div>
      </div>
    </>
  );
}
