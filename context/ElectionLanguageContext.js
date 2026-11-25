import React, { createContext, useContext, useState, useEffect } from "react";

const ElectionLanguageContext = createContext({
  lang: "mr",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (val) => val
});

export const DICTIONARY = {
  mr: {
    // Navigation & Common
    navTitle: "निवडणूक विश्लेषण दालने",
    candidateName: "श्री रामदास पाटील सुमठाणकर",
    candidateShort: "रामदास पाटील सुमठाणकर",
    candidateBadge: "अपक्ष उमेदवार",
    pcName: "नांदेड लोकसभा मतदारसंघ",
    pcShort: "१६-नांदेड लोकसभा",
    dbLive: "थेट डेटाबेस (MongoDB Live)",
    loadingData: "डेटा लोड होत आहे...",
    switchVisitor: "अभ्यागत पोर्टल ➔",
    switchPortal: "पोर्टल बदला",
    logout: "लॉगआउट",
    all: "सर्व",
    search: "शोधा...",
    details: "तपशील",
    back: "मागे जा",

    // Navigation Pages
    navExecutive: "कार्यकारी सारांश व २०२४ निकाल",
    navDaily: "थेट पडसाद व बातम्या",
    navSegments: "६ विधानसभा मतदारसंघ",
    navDemographics: "जातीय व सामाजिक रचना",
    navIssues: "२९ कळीचे प्रश्न व मागण्या",
    navEconomy: "आर्थिक, शेती व उद्योग",
    navStrategy: "अपक्ष विजयी रणनीती",

    // Executive & 2024 GE
    execTitle: "नांदेड लोकसभा मतदारसंघ: २०२४ निकाल विश्लेषण व अपक्ष विजयी समीकरण",
    execBadge: "अपक्ष उमेदवार रणनीती (Independent Candidate Strategy)",
    totalVoters: "एकूण मतदार (Electorate)",
    turnout2024: "२०२४ मतदान टक्केवारी",
    margin2024: "२०२४ आघाडी तफावत (Margin)",
    independentTarget: "अपक्ष विजयी उद्दिष्ट (Target)",
    targetNote: "३५% व्होट शेअर विजयासाठी पुरेसा",
    voterCountNote: "६ प्रमुख विधानसभा मतदारसंघ",
    directVotesNote: "११.२८ लाख प्रत्यक्ष मतदान",
    winnerRunnerNote: "काँग्रेस विजयी विरुद्ध भाजप",
    geComparisonTitle: "२०२४ सार्वत्रिक निवडणूक: ६ विधानसभा मतदारसंघांतील प्रत्यक्ष मतदान (INC vs BJP vs VBA)",
    geComparisonSub: "विधानसभानिहाय काँग्रेस, भाजप व वंचित बहुजन आघाडी मतांची थेट तुलना",
    whyIndepTitle: "त्रिकोणी/चौरंगी लढतीत ३५% मते विजयासाठी पुरेशी!",
    whyIndepBadge: "अपक्ष विजयाची गुरुकिल्ली",
    whyIndepP1: "पारंपरिक थेट द्विकोणी लढतीत ५०%+ मते लागतात. परंतु यंदा भाजप (~३.२ लाख) आणि काँग्रेस (~३.० लाख) यांच्यात समसमान मते विभागली जाणार आहेत.",
    whyIndepP2: "त्यामुळे श्री रामदास पाटील सुमठाणकर यांनी तटस्थ शेतकरी, सुशिक्षित तरुण व नाराज कार्यकर्त्यांची मोट बांधून ३.४ ते ३.६ लाख मते मिळवल्यास थेट विजय मिळतो!",
    viewFullStrategy: "सविस्तर अपक्ष रणनीती पहा ➔",
    acTableTitle: "६ विधानसभा मतदारसंघ: २०२४ प्रत्यक्ष निकाल व अपक्ष लक्ष्य तक्ता",
    acTableSub: "विधानसभानिहाय मिळालेली मते, आघाडी व श्री रामदास पाटील सुमठाणकर यांचे विजयी उद्दिष्ट",
    colAc: "मतदारसंघ (AC)",
    colInc: "काँग्रेस मते (INC)",
    colBjp: "भाजप मते (BJP)",
    colVba: "वंचित मते (VBA)",
    colMargin: "आघाडी (Margin)",
    colLeadingParty: "आघाडी घेणारा पक्ष",
    colIndepTarget: "अपक्ष विजयी टार्गेट",
    ndaFactorsFor: "महायुतीसाठी काम करणारे घटक (Ground Factors For NDA)",
    ndaFactorsAgainst: "महायुतीविरोधी लाट व असंतोष (Factors Working Against NDA)",
    historyTitle: "नांदेड लोकसभा: ऐतिहासिक निवडणूक निकाल आलेख (२००९ - २०२४)",
    historySub: "नांदेडच्या मतदारांनी गेल्या चार सार्वत्रिक निवडणुकांत दिलेला कौल",

    // Daily Media Impact
    dailyTitle: "थेट सोशल मीडिया व वृत्तपत्रीय पडसाद विश्लेषण",
    dailySub: "नांदेड लोकसभा मतदारसंघामध्ये Facebook, Instagram, Twitter (X), YouTube आणि प्रादेशिक वृत्तपत्रांमध्ये उमटणारे ताजे पडसाद व जनभावनेचा दैनिक आलेख.",
    dailyPipelineBadge: "दैनिक ४-कॉल इंटेलिजन्स पाईपलाईन (Daily Pulse)",
    refreshButton: "ताजी माहिती फेच करा (४-Call Refresh)",
    refreshing: "विश्लेषण सुरू आहे...",
    dateSelector: "तारीख निवडा:",
    allCombinedFeed: "सर्व एकत्रित फीड",
    timelineTrendTitle: "दैनिक जनभावना व उष्णता निर्देशांक कल (Sentiment & Heat Score Trend)",
    timelineTrendSub: "सकारात्मक, नकारात्मक जनभावना व मतदारसंघ तणाव पातळीचा दैनिक आलेख",
    acHeatmapTitle: "६ विधानसभा मतदारसंघ उष्णता गुणांक (AC Heat Index / Hotspots)",
    acHeatmapSub: "स्थानिक समस्या व राजकीय घडामोडींनुसार मतदारसंघांची संवेदनशीलता",
    feedHubTitle: "थेट सोशल मीडिया व वृत्तपत्रीय फीड (Live Feed & Signals Hub)",
    feedHubSub: "नांदेड लोकसभा मतदारसंघ: Facebook, Instagram, X (Twitter), YouTube आणि प्रादेशिक वृत्तपत्रांमधील थेट पडसाद.",
    filterPlatform: "प्लॅटफॉर्म निवडा:",
    filterSentiment: "जनभावना:",
    searchFeed: "बातमी किंवा सोशल पोस्ट शोधा...",
    foundSignals: "सापडलेले सिग्नल्स:",
    originalSource: "मूळ स्त्रोत पहा",

    // Assembly Segments
    assemblyTitle: "नांदेड लोकसभा: ६ विधानसभा मतदारसंघ सखोल राजकीय समीकरणे",
    assemblySub: "प्रत्येक मतदारसंघाची मतदार संख्या, विद्यमान आमदार, सामाजिक व जातीय रचना, निवडणूक निकाल इतिहास आणि श्री रामदास पाटील सुमठाणकर यांच्या अपक्ष विजयासाठीचे रणनीतिक लक्ष्य.",
    assemblyBadge: "६ विधानसभा मतदारसंघ मायक्रो-ऍनालिसिस (Micro Intelligence)",
    coreAcLabel: "नांदेड लोकसभा क्षेत्रातील ६ प्रमुख विधानसभा मतदारसंघ (Core ACs):",
    incumbentMla: "विद्यमान आमदार (Incumbent MLA):",
    totalElectorate: "२०२४ मतदान (GE Votes):",
    casteComposition: "सामाजिक व जातीय रचना (Demographics):",
    casteShare: "जातीय टक्केवारी (Caste Share):",
    groundDynamics: "स्थानिक राजकीय समीकरणे (Ground Dynamics):",
    candidatePlaybook: "श्री रामदास पाटील - अपक्ष रणनीती:",
    targetedCampaign: "मतदारसंघ लक्ष्यित मोहीम:",
    counterOpponents: "विरोधक काउंटर:",
    counterOpponentsDesc: "भाजप आणि काँग्रेस या दोन्ही पक्षांच्या अंतर्गत कलहातील नाराज स्थानिक नेत्यांशी थेट समन्वय साधून क्रॉस-व्होटिंग घडवणे.",
    boothCampaign: "बूथ मोहीम:",
    boothCampaignDesc: "प्रत्येक मतदान केंद्रावर ५ निष्ठावंत स्थानिक तरुणांची फळी नेमून घरोघरी अपक्ष प्रचार पोहोचवणे.",
    referenceAcsTitle: "नांदेड जिल्ह्यातील इतर शेजारील विधानसभा मतदारसंघ (Reference Constituencies):",

    // Issues & Demands
    issuesTitle: "नांदेड लोकसभा: २९ प्रमुख विकासात्मक प्रश्न व जनआकांक्षा",
    issuesSub: "गेल्या कित्येक वर्षांत दोन्ही प्रमुख राष्ट्रीय पक्षांनी दुर्लक्ष केलेल्या शेती, सिंचन, दळणवळण, एमआयडीसी रोजगार व आरोग्य या क्षेत्रांतील सर्व २९ कळीच्या मागण्यांचा थेट डेटाबेस. श्री रामदास पाटील सुमठाणकर यांचा हा मुख्य निवडणूक जाहीरनामा आहे.",
    issuesBadge: "नांदेडचे २९ कळीचे प्रश्न व मागण्या (29 Demands Radar)",
    issuesSearchPlaceholder: "मागण्यांमध्ये शोधा (उदा. रेल्वे, लेंडी, कापूस, सोयाबीन, विमानतळ, रुग्णालय, एमआयडीसी)...",
    foundDemands: "एकूण सापडलेल्या मागण्या:",
    filterSector: "क्षेत्र (Sector):",
    filterPriority: "तीव्रता (Priority):",
    deptLabel: "संबंधित विभाग:",
    timelineLabel: "कालावधी:",
    politicalBenefitLabel: "राजकीय लाभ:",

    // Economy & Industry
    economyTitle: "नांदेड लोकसभा: शेती संकट, कुष्णूर एमआयडीसी व औद्योगिक पुनरुज्जीवन",
    economyBadge: "आर्थिक, शेती व औद्योगिक प्रोफाइल (Economic Intelligence)",
    economySub: "नांदेड जिल्हा प्रामुख्याने कापूस, सोयाबीन, केळी व हळद उत्पादक जिल्हा आहे. परंतु प्रक्रिया उद्योगांचा अभाव आणि एमआयडीसीच्या रखडलेल्या विकासामुळे सुशिक्षित तरुणांचे स्थलांतर होत आहे.",
    primarySector: "प्राथमिक क्षेत्र",
    agricultureTitle: "कापूस, सोयाबीन व हळद पिके",
    majorCashCrops: "प्रमुख नगदी पिके:",
    horticulture: "फलोत्पादन (Horticulture):",
    pulsesGrains: "कडधान्ये व तृणधान्ये:",
    waterSector: "जलसंपदा व सिंचन",
    irrigationTitle: "धरणे, उपसा सिंचन व लेंडी प्रकल्प",
    mediumProjects: "मध्यम सिंचन प्रकल्प:",
    minorProjects: "लघु सिंचन प्रकल्प:",
    borewells: "कृषी विंधन विहिरी:",
    secondarySector: "द्वितीयक क्षेत्र",
    midcTitle: "एमआयडीसी औद्योगिक वसाहती",
    totalMidc: "एकूण औद्योगिक क्षेत्रे:",
    totalTextile: "वस्त्रोद्योग युनिट्स:",
    totalSugar: "साखर कारखाने:",
    sugarFactoriesTitle: "नांदेड जिल्ह्यातील साखर कारखाने (Co-op & Private SSK)",
    textilePendingTitle: "वस्त्रोद्योग व रखडलेले मोठे प्रकल्प",
    economicManifestoTitle: "श्री रामदास पाटील सुमठाणकर: आर्थिक विकास संकल्पनामा",

    // Strategic Plan
    stratTitle: "नांदेड लोकसभा: अपक्ष विजयी समीकरण व सर्वपक्षीय विरोधक विश्लेषण",
    stratBadge: "अपक्ष विजयी रणनीती (Independent Winning Strategy)",
    tabCounter: "१. सर्वपक्षीय विरोधक विश्लेषण (BJP vs Congress vs VBA)",
    tabMath: "२. अपक्ष विजयाचे अंकगणित (The 3.5L Math)",
    tabAc: "३. ६ मतदारसंघांचे लक्ष्य (AC Targets)",
    tabRoadmap: "४. १०० दिवसांचा कृती आराखडा (100-Day Roadmap)",
    winningQuota: "अपक्ष विजयी कोटा (Target):",
    fightFormat: "लढतीचे स्वरूप:",
    fightFormatVal: "त्रिकोणी / चौरंगी",
    coreFocus: "मुख्य केंद्रबिंदू:",
    coreFocusVal: "शेतकरी + युवा विकास",
    candidacyType: "उमेदवारी स्वरूप:",
    oppAnalysisTitle: "प्रतिस्पर्धी पक्षांचे सखोल विश्लेषण व अपक्ष उमेदवाराची संधी",
    oppAnalysisSub: "श्री रामदास पाटील सुमठाणकर यांनी दोन्ही प्रस्थापित आघाड्यांमधील मतभेदांचे रूपांतर अपक्ष विजयात कसे करावे?",
    strengthsLabel: "बलस्थाने:",
    vulnerabilitiesLabel: "कमकुवत दुवे व अंतर्गत कलह:",
    indepOppLabel: "श्री रामदास पाटील - अपक्ष रणनीती:",
    voteMathTitle: "त्रिकोणी लढतीमध्ये अपक्ष विजयाचे थेट अंकगणित (The 3.5 Lakh Formula)",
    voteMathSub: "नांदेड लोकसभा मतदारसंघात एकूण नोंदणीकृत मतदार सुमारे १८.५ लाख असून सरासरी ६०% मतदानात ~११ लाख मतदान होते.",
    twoWayFight: "पारंपरिक थेट लढत (द्विकोणी २ पक्ष)",
    threeWayFight: "यंदाचे प्रत्यक्ष समीकरण (त्रिकोणी / चौरंगी)",
    otherVoteSplit: "मतांची विभागणी (इतर / वंचित फॅक्टर)",
    coreVotePillarsTitle: "श्री रामदास पाटील सुमठाणकर यांच्या मतांचे ४ प्रमुख खांब (Core Vote Pillars):",
    acTargetsTitle: "६ विधानसभा मतदारसंघांचे लक्ष्य व मायक्रो-प्लॅनिंग (Target Votes from MongoDB)",
    acTargetsSub: "प्रत्येक विधानसभा मतदारसंघातून अपक्ष विजयासाठी आवश्यक असणारा किमान मतांचा वाटा.",
    combinedVotesTotal: "६ मतदारसंघांची एकूण एकत्रित मते:",
    roadmapTitle: "१०० दिवसांचा अपक्ष प्रचार व जनसंपर्क कृती आराखडा",
    roadmapSub: "श्री रामदास पाटील सुमठाणकर यांच्या नेतृत्वाखालील टप्प्याटप्प्याने राबवायची मोहीम.",

    // Demographics
    demoTitle: "नांदेड लोकसभा: जातीय रचना व अपक्ष उमेदवाराची सर्वसमावेशक आघाडी",
    demoSub: "डेटाबेसमधील अधिकृत सामाजिक घटकांचे विश्लेषण. मराठा, दलित, मुस्लिम, लिंगायत, धनगर, बंजारा, मन्नेरवारलू व ओबीसी समाजाच्या आकांक्षा पूर्ण करण्यासाठी उभारलेली आघाडी.",
    demoBadge: "जातीय व सामाजिक समीकरणे (Social Coalition Intelligence)",
    casteShareChartTitle: "जातीय लोकसंख्या टक्केवारी (Caste Share %)",
    casteShareChartSub: "नांदेड लोकसभा मतदारसंघ सामाजिक विभाजन",
    coalitionTitle: "\"पक्षातीत नांदेड - सर्वांचा विकास\": रामदास पाटील यांची सर्वसमावेशक रणनीती",
    coalitionSub: "भाजप आणि काँग्रेस हे दोन्ही पक्ष विशिष्ट पारंपारिक व्होटबँकेवर अवलंबून असतात. श्री रामदास पाटील सुमठाणकर कोणत्याही पक्षाचे बांधील नसल्याने सर्व समाजातील स्वाभिमानी मतदारांना एकत्र बांधू शकतात:",
    communityBreakdownTitle: "प्रत्येक सामाजिक घटकाचे सखोल विश्लेषण (Live Community Breakdown)",
    communityBreakdownSub: "मतदारांची टक्केवारी, पारंपारिक राजकीय कल, कळीच्या स्थानिक मागण्या आणि प्रभाव तालुके.",
    categoryLabel: "प्रवर्ग:",
    politicalInclinationLabel: "राजकीय कल:",
    localDemandsLabel: "कळीचे स्थानिक प्रश्न:",
    keyTalukasLabel: "प्रभाव तालुके:"
  },

  en: {
    // Navigation & Common
    navTitle: "Election Intelligence Modules",
    candidateName: "Shri Ramdas Patil Sumthankar",
    candidateShort: "Ramdas Patil Sumthankar",
    candidateBadge: "Independent Candidate",
    pcName: "Nanded Parliamentary Constituency",
    pcShort: "16-Nanded PC",
    dbLive: "MongoDB Atlas Live",
    loadingData: "Loading intelligence data...",
    switchVisitor: "Visitor Portal ➔",
    switchPortal: "Switch Portal",
    logout: "Logout",
    all: "All",
    search: "Search...",
    details: "Details",
    back: "Go Back",

    // Navigation Pages
    navExecutive: "Executive & 2024 GE Overview",
    navDaily: "Daily Media & AC Impact",
    navSegments: "Assembly Segments (6 ACs)",
    navDemographics: "Caste & Demographics",
    navIssues: "Issues & 29 Demands Radar",
    navEconomy: "Economy & Industry Profile",
    navStrategy: "Strategic Action Plan",

    // Executive & 2024 GE
    execTitle: "Nanded Parliamentary Constituency: 2024 General Election Analysis & Independent Victory Formula",
    execBadge: "Independent Candidate Electoral Strategy",
    totalVoters: "Total Electorate",
    turnout2024: "2024 Voter Turnout",
    margin2024: "2024 Victory Margin",
    independentTarget: "Independent Victory Target",
    targetNote: "35% Vote Share Suffices for Victory",
    voterCountNote: "6 Core Assembly Segments",
    directVotesNote: "11.28 Lakh Total Votes Polled",
    winnerRunnerNote: "INC Winner vs BJP Runner-Up",
    geComparisonTitle: "2024 General Election: Votes Polled Across 6 Assembly Segments (INC vs BJP vs VBA)",
    geComparisonSub: "Direct Segment-Wise Comparison of INC, BJP, and Vanchit Bahujan Aghadi votes",
    whyIndepTitle: "35% Vote Share is Sufficient for Victory in a 3-Way/4-Way Contest!",
    whyIndepBadge: "The Independent Winning Math",
    whyIndepP1: "A traditional two-way direct contest requires 50%+ votes. However, this election will see votes split evenly between BJP (~3.2 Lakh) and Congress (~3.0 Lakh).",
    whyIndepP2: "Therefore, by mobilizing neutral farmers, educated youth, and disgruntled cadre across party lines, Shri Ramdas Patil Sumthankar can secure 3.4 to 3.6 Lakh votes and win outright!",
    viewFullStrategy: "View Detailed Independent Strategy ➔",
    acTableTitle: "6 Assembly Constituencies: 2024 Actual Results & Independent Target Matrix",
    acTableSub: "Votes polled, victory margins, leading coalitions, and Shri Ramdas Patil Sumthankar's victory targets",
    colAc: "Assembly Segment (AC)",
    colInc: "Congress Votes (INC)",
    colBjp: "BJP Votes (BJP)",
    colVba: "VBA Votes (VBA)",
    colMargin: "Margin",
    colLeadingParty: "Leading Party",
    colIndepTarget: "Independent Target",
    ndaFactorsFor: "Ground Factors Working in Favor of NDA/BJP",
    ndaFactorsAgainst: "Anti-Incumbency & Distress Factors Working Against NDA/BJP",
    historyTitle: "Nanded Lok Sabha: Historical Electoral Trend (2009 - 2024)",
    historySub: "Constituency verdicts and voting patterns across the last four parliamentary general elections",

    // Daily Media Impact
    dailyTitle: "Live Social Media & Regional Press Impact Intelligence",
    dailySub: "Real-time daily tracker of media narratives, ground sentiment, and public signals across Facebook, Instagram, X (Twitter), YouTube, and regional newspapers in Nanded PC.",
    dailyPipelineBadge: "Daily 4-Call Intelligence Pulse",
    refreshButton: "Fetch Fresh Intelligence (4-Call Refresh)",
    refreshing: "Analyzing intelligence data...",
    dateSelector: "Select Date:",
    allCombinedFeed: "All Combined Feed",
    timelineTrendTitle: "Daily Public Sentiment & AC Heat Score Trend",
    timelineTrendSub: "Comparative timeline of positive vs negative public sentiment and constituency tension levels",
    acHeatmapTitle: "6 Assembly Constituencies Heat Score (AC Heat Index / Hotspots)",
    acHeatmapSub: "Constituency sensitivity index driven by agrarian distress, cooperative friction, and municipal dynamics",
    feedHubTitle: "Live Social Media & Regional Press Feed & Signals Hub",
    feedHubSub: "Curated intelligence feed across Facebook, Instagram, X (Twitter), YouTube, and Marathi regional press.",
    filterPlatform: "Filter Platform:",
    filterSentiment: "Sentiment:",
    searchFeed: "Search news or social signal...",
    foundSignals: "Signals Found:",
    originalSource: "Open Original Link",

    // Assembly Segments
    assemblyTitle: "Nanded Lok Sabha: 6 Assembly Constituencies In-Depth Intelligence",
    assemblySub: "Detailed breakdown of electorate size, incumbent MLAs, social demographics, electoral history, and Shri Ramdas Patil Sumthankar's winning targets for each assembly constituency.",
    assemblyBadge: "6 Assembly Segments Micro Intelligence",
    coreAcLabel: "6 Core Assembly Constituencies in Nanded PC:",
    incumbentMla: "Incumbent MLA:",
    totalElectorate: "2024 Votes Polled:",
    casteComposition: "Social & Caste Demographics:",
    casteShare: "Caste Distribution:",
    groundDynamics: "Local Political & Electoral Dynamics:",
    candidatePlaybook: "Shri Ramdas Patil - Independent Action Playbook:",
    targetedCampaign: "Constituency Outreach Plan:",
    counterOpponents: "Opposition Counter-Strategy:",
    counterOpponentsDesc: "Coordinate discreetly with disgruntled grassroots leadership in BJP and Congress to trigger tactical cross-voting.",
    boothCampaign: "Booth Mobilization:",
    boothCampaignDesc: "Station 5 dedicated young volunteers at each polling station to deliver direct independent messaging.",
    referenceAcsTitle: "Neighboring Assembly Constituencies in Nanded District (Reference ACs):",

    // Issues & Demands
    issuesTitle: "Nanded Lok Sabha: 29 Core Developmental Demands & Public Grievances",
    issuesSub: "Comprehensive intelligence radar on 29 critical constituency demands across agriculture, irrigation, railway connectivity, MIDC industrial hubs, and healthcare ignored by mainstream parties.",
    issuesBadge: "Nanded 29 Key Demands Radar",
    issuesSearchPlaceholder: "Search demands (e.g. Railway, Lendi, Cotton, Soybean, Airport, Hospital, MIDC)...",
    foundDemands: "Total Demands Found:",
    filterSector: "Sector:",
    filterPriority: "Priority Level:",
    deptLabel: "Concerned Ministry/Dept:",
    timelineLabel: "Target Timeline:",
    politicalBenefitLabel: "Electoral Impact:",

    // Economy & Industry
    economyTitle: "Nanded Lok Sabha: Agrarian Crisis, Kushnoor MIDC & Industrial Revival",
    economyBadge: "Agrarian, Industrial & Infrastructure Profile",
    economySub: "Nanded is primarily a cotton, soybean, banana, and turmeric farming district, but suffers from severe lack of agro-processing hubs and stalled MIDC expansion leading to youth out-migration.",
    primarySector: "Primary Agrarian Sector",
    agricultureTitle: "Cotton, Soybean & Cash Crops Economy",
    majorCashCrops: "Major Cash Crops:",
    horticulture: "Horticulture:",
    pulsesGrains: "Pulses & Grains:",
    waterSector: "Water Resources & Irrigation",
    irrigationTitle: "Dams, Lift Irrigation & The Lendi Project",
    mediumProjects: "Medium Irrigation Projects:",
    minorProjects: "Minor Irrigation Projects:",
    borewells: "Agricultural Irrigation Borewells:",
    secondarySector: "Secondary Industrial Sector",
    midcTitle: "MIDC Industrial Clusters & Zones",
    totalMidc: "Active Industrial Zones:",
    totalTextile: "Textile Processing Units:",
    totalSugar: "Sugar Factories:",
    sugarFactoriesTitle: "Sugar Mills in Nanded District (Co-op & Private SSK)",
    textilePendingTitle: "Textile Units & Stalled Infrastructure Projects",
    economicManifestoTitle: "Shri Ramdas Patil Sumthankar: Economic Transformation Manifesto",

    // Strategic Plan
    stratTitle: "Nanded Lok Sabha: Independent Winning Arithmetic & Multi-Party Analysis",
    stratBadge: "Independent Victory Action Plan",
    tabCounter: "1. Opposition Analysis (BJP vs Congress vs VBA)",
    tabMath: "2. Winning Arithmetic (The 3.5L Math)",
    tabAc: "3. 6 Constituency Targets (AC Targets)",
    tabRoadmap: "4. 100-Day Campaign Execution Roadmap",
    winningQuota: "Target Victory Quota:",
    fightFormat: "Contest Structure:",
    fightFormatVal: "Triangular / Four-Way",
    coreFocus: "Campaign Core:",
    coreFocusVal: "Farmers + Youth Jobs",
    candidacyType: "Candidacy Mode:",
    oppAnalysisTitle: "Multi-Front Opposition Analysis & Independent Opportunity",
    oppAnalysisSub: "How Shri Ramdas Patil Sumthankar can convert inter-party friction into an outright independent electoral triumph.",
    strengthsLabel: "Strengths:",
    vulnerabilitiesLabel: "Vulnerabilities & Internal Friction:",
    indepOppLabel: "Shri Ramdas Patil - Independent Opportunity:",
    voteMathTitle: "The Independent Victory Math in a 3-Way Contest (3.5 Lakh Formula)",
    voteMathSub: "Nanded PC has ~18.5 Lakh registered voters. At an average 60% turnout, ~11 Lakh votes are polled.",
    twoWayFight: "Traditional Two-Way Fight (2 Parties)",
    threeWayFight: "Actual 2026/Current Equation (3-Way / 4-Way)",
    otherVoteSplit: "Third Front & Other Splits (VBA / Independents)",
    coreVotePillarsTitle: "4 Core Vote Pillars for Shri Ramdas Patil Sumthankar:",
    acTargetsTitle: "6 Assembly Constituency Targets & Micro-Planning (Target Votes from MongoDB)",
    acTargetsSub: "Minimum required vote quota from each assembly constituency for an independent victory.",
    combinedVotesTotal: "Total Combined Votes Across 6 Segments:",
    roadmapTitle: "100-Day Independent Campaign & Grassroots Outreach Roadmap",
    roadmapSub: "Phased tactical campaign execution led by Shri Ramdas Patil Sumthankar.",

    // Demographics
    demoTitle: "Nanded Lok Sabha: Caste Demographics & Inclusive Coalition",
    demoSub: "Official database intelligence on key social demographics. An all-inclusive developmental coalition uniting Maratha, Dalit, Muslim, Lingayat, Dhangar, Banjara, Mannervarlu, and OBC communities.",
    demoBadge: "Social Coalition & Caste Dynamics",
    casteShareChartTitle: "Caste Population Distribution (Caste Share %)",
    casteShareChartSub: "Nanded Lok Sabha Constituency Social Breakdown",
    coalitionTitle: "\"Inclusive Nanded, Development for All\": The Independent Playbook",
    coalitionSub: "Mainstream political parties rely on exclusive traditional vote banks. Being completely independent, Shri Ramdas Patil Sumthankar unites progress-oriented citizens across all communities:",
    communityBreakdownTitle: "Live Community Breakdown & Dynamics",
    communityBreakdownSub: "Electorate percentages, traditional party alignments, local issues, and key influence talukas.",
    categoryLabel: "Category:",
    politicalInclinationLabel: "Political Alignment:",
    localDemandsLabel: "Key Local Demands:",
    keyTalukasLabel: "Key Influence Talukas:"
  }
};

export const SECTOR_TRANSLATIONS = {
  mr: {
    "Infrastructure": "पायाभूत सुविधा (Infrastructure)",
    "Agriculture": "शेती व हमीभाव (Agriculture)",
    "Industry & Employment": "उद्योग व रोजगार (Industry)",
    "Irrigation & Water Resources": "जलसंपदा व सिंचन (Irrigation)",
    "Healthcare": "आरोग्य व वैद्यकीय (Healthcare)",
    "Education": "शिक्षण व कौशल्य (Education)",
    "Civic & Urban Development": "नागरी व शहर विकास (Urban)",
    "Railways": "रेल्वे कनेक्टिव्हिटी (Railways)"
  },
  en: {
    "Infrastructure": "Infrastructure",
    "Agriculture": "Agriculture & MSP",
    "Industry & Employment": "Industry & Employment",
    "Irrigation & Water Resources": "Irrigation & Water Resources",
    "Healthcare": "Healthcare & Medical",
    "Education": "Education & Skills",
    "Civic & Urban Development": "Civic & Urban Development",
    "Railways": "Railways"
  }
};

export function ElectionLanguageProvider({ children }) {
  const [lang, setLangState] = useState("mr");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("election_portal_lang");
      if (saved === "en" || saved === "mr") {
        setLangState(saved);
      }
    }
  }, []);

  const setLanguage = (newLang) => {
    if (newLang === "en" || newLang === "mr") {
      setLangState(newLang);
      if (typeof window !== "undefined") {
        localStorage.setItem("election_portal_lang", newLang);
      }
    }
  };

  const toggleLanguage = () => {
    const next = lang === "mr" ? "en" : "mr";
    setLanguage(next);
  };

  const t = (keyOrObj, fallback = "") => {
    if (!keyOrObj) return fallback || "";
    if (typeof keyOrObj === "object") {
      return keyOrObj[lang] || keyOrObj.mr || keyOrObj.en || fallback || "";
    }
    const dict = DICTIONARY[lang] || DICTIONARY.mr;
    return dict[keyOrObj] || fallback || keyOrObj;
  };

  return (
    <ElectionLanguageContext.Provider
      value={{
        lang,
        setLanguage,
        toggleLanguage,
        t,
        isMr: lang === "mr",
        isEn: lang === "en"
      }}
    >
      {children}
    </ElectionLanguageContext.Provider>
  );
}

export function useElectionLanguage() {
  return useContext(ElectionLanguageContext);
}
