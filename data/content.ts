import { generateAchievementPlaceholder } from "@/lib/placeholders";

export const profiles = {
  github:   { label: "GitHub",   href: "https://github.com/Vishal-Murugadhas" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/vishal-murugadhas-65a689335/" },
  leetcode: { label: "LeetCode", href: "https://leetcode.com/u/Vishal_Murugadhas/" },
  email:    { label: "Email",    href: "mailto:vishalmdhas@gmail.com" },
} as const;

export const identity = {
  name: "Vishal Murugadhas",
  initials: "VM",
  roleLine: "ML / AI Engineer · Data Pipelines",
  location: "Surat, India",
  email: "vishalmdhas@gmail.com",
  phone: "(+91) 9360236826",
  statusBadge: "Open to internships",
  profiles,
};

export const hero = {
  italicLead: "I build systems",
  mainLine: "that work when it matters.",
  subhead:
    "Catching a threat before it becomes a breach. Dispatching help before an emergency gets worse.",
  ctaPrimary: { label: "View Projects", href: "#projects" },
  ctaSecondary: { label: "Download Resume", href: "/Resume_U24EC007_Vishal_Murugadhas.pdf" },
  boardingPass: {
    origin: "SVNIT SURAT",
    destination: "YOUR TEAM",
    cgpa: "8.95",
    hackathon: "2nd / 450+ teams",
    leadership: "AI/ML Lead, GDGC",
  },
};

export const about = {
  paragraphs: [
    "I'm Vishal, a third-year B.Tech Electronics & Communication student at SVNIT Surat (CGPA: 8.95, graduating in 2028). I'm drawn to machine learning and the data pipelines that power it, and I enjoy turning messy, real-world data into reliable, scalable systems that solve meaningful problems.",
    "Off the project grind, I lead the AI/ML vertical at Google Developer Groups on Campus (GDGC) SVNIT, helping fellow students move from learning ML concepts to building and shipping real projects. I've also helped organise a university-level MUN with 50+ participants, which taught me that communication is just as important as technical expertise.",
    "My hands-on experience spans NLP, anomaly detection, computer vision, time-series forecasting, and real-time data engineering. From building Kafka/Flink streaming pipelines that processed nearly a million access events to developing AI-powered emergency-response systems, I enjoy working across the entire pipeline—from raw data and feature engineering to model development and deployment.",
    "I've secured **2nd place among 450+ teams at the Bank of Baroda × IIT Gandhinagar PSB Hackathon** and won the Inspiron 5.0 Hackathon at COEP Pune. I'm looking for ML/AI and data engineering internships where I can tackle high-impact problems, build production-oriented systems, and learn from engineers who push me to think bigger.",
  ],
  currently: [
    { label: "Studying", value: "SVNIT Surat · B.Tech ECE" },
    { label: "Leading", value: "AI/ML Vertical @ GDGC SVNIT" },
    { label: "Seeking", value: "ML / AI / Data Engineering internships" },
  ],
  statsMiniGrid: [
    { value: 8.95, label: "CGPA", suffix: "", decimals: 2 },
    { value: 2, label: "Place, PSB Hackathon", suffix: "nd", decimals: 0 },
    { value: 150, label: "LeetCode Solved", suffix: "+", decimals: 0 },
    { value: 450, label: "Teams Competed", suffix: "+", decimals: 0 },
  ],
};

export type ProjectStat = {
  number: string;
  caption: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  summary: string;
  badge?: string;
  role?: string;
  stats: ProjectStat[];
  bullets: string[];
  tags: string[];
  links: {
    github?: string;
    demo?: string;
  };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "phantom",
    index: "01",
    title: "PHANTOM: Privileged-Access Insider-Threat Detection Platform",
    summary:
      "Real-time privileged-access insider threat detection combining 4 detection engines, NLP justification scoring, and Kafka/Flink streaming.",
    badge: "2nd Place · 450+ teams · Bank of Baroda × IIT Gandhinagar PSB Hackathon 2026 · ₹3 Lakh prize",
    role: "Led NLP and data-pipeline engineering in a 3-person team",
    stats: [
      { number: "98.33%", caption: "IndicBERT NLP Accuracy" },
      { number: "977,705", caption: "Access Events Streamed" },
      { number: "37", caption: "Behavioral Features" },
    ],
    bullets: [
      "Contributed to a Bayesian-weighted Dynamic Insider Threat Score combining 4 detection engines.",
      "Built the Negative Access Profiler and an IndicBERT-based Justification NLP Scorer, reaching 98.33% accuracy.",
      "Designed the synthetic telemetry generator and Kafka/Flink streaming pipeline that produced 977,705 access events across 50 employees, yielding 4,500 employee-day records with 37 behavioral features.",
    ],
    tags: ["Python", "IndicBERT", "Kafka", "Flink", "IsolationForest", "Pandas", "NumPy"],
    links: {
      github: "https://github.com/Vishal-Murugadhas?tab=repositories",
    },
    featured: true,
  },
  {
    id: "aegisai",
    index: "02",
    title: "AegisAI: AI-Powered Autonomous Emergency Response System",
    summary:
      "Autonomous emergency-response platform coordinating 25 AI-powered CCTV nodes and 15 drones across 5 dispatch hubs with <800 ms latency.",
    stats: [
      { number: "<800 ms", caption: "End-to-End Dispatch" },
      { number: "98.1%", caption: "Weapon Precision (65 FPS)" },
      { number: "25 + 15", caption: "CCTV Nodes + Drones" },
    ],
    bullets: [
      "Autonomous emergency-response platform combining 25 AI-powered CCTV nodes, multi-modal computer vision and FastAPI dispatch orchestration to coordinate 15 drones across 5 dispatch hubs.",
      "Multi-stage detection pipeline (YOLOv8-pose, YOLOv8s, ByteTrack, Farneback Optical Flow, IsolationForest) for falls, fires, accidents and crowd anomalies; 98.1% weapon-detection precision at up to 65 FPS on an RTX 4090.",
      "Severity/priority scoring with 200 m spatial deduplication and no-fly-zone-aware routing, reaching <800 ms end-to-end dispatch latency in benchmarked simulations.",
    ],
    tags: ["YOLOv8", "ByteTrack", "Optical Flow", "IsolationForest", "FastAPI", "Python"],
    links: {
      github: "https://github.com/Vishal-Murugadhas?tab=repositories",
    },
  },
  {
    id: "stocksense",
    index: "03",
    title: "StockSense India: AI-Powered Market Predictor",
    summary:
      "Full-stack market-intelligence platform for NSE/BSE equities forecasting next-day direction with a leakage-resistant Logistic Regression pipeline.",
    stats: [
      { number: "52–68.5%", caption: "Out-of-Sample Accuracy" },
      { number: "14", caption: "Time-Series Features" },
      { number: "5+ yrs", caption: "OHLCV Data Analyzed" },
    ],
    bullets: [
      "Full-stack market-intelligence platform for NSE/BSE equities forecasting next-day direction with a leakage-resistant Logistic Regression pipeline trained on 5+ years of OHLCV data.",
      "14-feature time-series vector (return lags, rolling volatility, momentum, volume velocity); 52–68.5% out-of-sample directional accuracy using chronological train/test splits.",
    ],
    tags: ["Python", "Scikit-learn", "Time-Series", "Pandas", "React/Next.js"],
    links: {
      github: "https://github.com/Vishal-Murugadhas?tab=repositories",
      demo: "https://stocksense-demo.vercel.app", // TODO: replace with live demo URL
    },
  },
];

// Carousel Items (8 items for full 3D ring)
export const carouselAchievements = [
  {
    src: generateAchievementPlaceholder("2nd Place · PSB Hackathon", "Bank of Baroda × IIT Gandhinagar", "2026"),
    alt: "Bank of Baroda × IIT Gandhinagar PSB Hackathon 2026 podium",
    title: "2nd Place · PSB Hackathon",
    subtitle: "Bank of Baroda × IIT Gandhinagar · 2026",
    year: "2026",
    description: "Ranked 2nd out of 450+ national teams for the PHANTOM insider-threat detection platform.",
  },
  {
    src: generateAchievementPlaceholder("E-Rakshak Winner", "Gujarat Police Hackathon", ""),
    alt: "E-Rakshak Hackathon winner, organized by Gujarat Police",
    title: "E-Rakshak Winner",
    subtitle: "Gujarat Police Hackathon",
    // TODO: add year
    description: "Winner of the E-Rakshak Hackathon organized by Gujarat Police.",
  },
  {
    src: generateAchievementPlaceholder("Winner · Inspiron 5.0", "COEP Pune", "2025"),
    alt: "Inspiron 5.0 Hackathon first place trophy",
    title: "Winner · Inspiron 5.0",
    subtitle: "COEP Pune · 2025",
    year: "2025",
    description: "First place win at College of Engineering Pune national level technical hackathon.",
  },
  {
    src: generateAchievementPlaceholder("Prism Website", "SVNIT Sports Event", "2025"),
    alt: "Official website developed for Prism SVNIT",
    title: "Prism Website",
    subtitle: "SVNIT Sports Event · 2025",
    year: "2025",
    description: "Designed and engineered the official website for SVNIT's premier annual inter-college sports festival.",
  },
  {
    src: generateAchievementPlaceholder("150+ LeetCode", "Problem Solving", "Ongoing"),
    alt: "LeetCode profile problem solving metrics",
    title: "150+ LeetCode",
    subtitle: "Problem solving · Ongoing",
    year: "Ongoing",
    description: "Consistent problem solving in dynamic programming, graphs, trees, and algorithmic optimization.",
  },
  {
    src: generateAchievementPlaceholder("Top 15% by CGPA", "SVNIT Surat", "8.95"),
    alt: "Top 15% academic ranking at SVNIT Surat",
    title: "Top 15% by CGPA",
    subtitle: "SVNIT · 8.95",
    year: "2024–2028",
    description: "Academic excellence in Electronics & Communication Engineering with an 8.95 cumulative GPA.",
  },
  {
    src: generateAchievementPlaceholder("AI/ML Lead", "GDGC SVNIT", "2025–Present"),
    alt: "Google Developer Groups on Campus SVNIT AI/ML vertical",
    title: "AI/ML Lead",
    subtitle: "GDGC SVNIT · 2025–Present",
    year: "2025–Present",
    description: "Mentoring junior engineers and coordinating hands-on workshops in machine learning and data engineering.",
  },
  {
    src: generateAchievementPlaceholder("MINDBEND MUN", "50+ participants", "Jan 2025"),
    alt: "MINDBEND MUN organizing committee",
    title: "MINDBEND MUN",
    subtitle: "50+ participants · Jan 2025",
    year: "Jan 2025",
    description: "Organized and facilitated a university-level Model United Nations event with over 50 delegates.",
  },
];



export const experience = [
  {
    title: "AI/ML Lead",
    org: "Google Developer Groups on Campus (GDGC), SVNIT",
    period: "2025 — PRESENT",
    current: true,
    description:
      "Lead the AI/ML vertical of the club, guiding members on projects and technical learning in machine learning and AI.",
  },
  {
    title: "Organizing Team",
    org: "MINDBEND, SVNIT",
    period: "JAN 2025",
    current: false,
    description:
      "Planned and executed a university-level MUN event with 50+ participants, managing outreach and cross-team communication.",
  },
];

export const skillsRows = [
  {
    category: "Languages",
    skills: ["C++", "Python", "Java", "C"],
  },
  {
    category: "ML / AI",
    skills: [
      "Scikit-learn",
      "XGBoost",
      "Pandas",
      "NumPy",
      "YOLOv8",
      "IndicBERT",
      "Anomaly Detection (IsolationForest)",
      "Time-Series Modeling",
    ],
  },
  {
    category: "Web & Backend",
    skills: ["React", "Next.js", "Node.js", "Express.js", "FastAPI"],
  },
  {
    category: "Data & Infra",
    skills: ["Kafka", "Flink", "MongoDB", "Firebase", "Docker", "Git/GitHub"],
  },
  {
    category: "Simulation",
    skills: ["SimPy", "SUMO", "TraCI"],
  },
];

export const marqueeSkills = [
  "Python", "Kafka", "Flink", "YOLOv8", "IndicBERT", "FastAPI",
  "Scikit-learn", "XGBoost", "React", "Next.js", "Docker",
  "MongoDB", "ByteTrack", "IsolationForest", "Pandas", "NumPy",
  "Node.js", "SimPy", "SUMO",
];

export const education = [
  {
    school: "Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat",
    degree: "B.Tech, Electronics and Communication Engineering",
    period: "2024 — 2028",
    score: "CGPA 8.95",
  },
  {
    school: "The Indian School, Bahrain",
    degree: "CBSE Class XII & Class X",
    period: "2022 — 2024",
    score: "Class XII: 92.2% · Class X: 84.2%",
  },
];

export const contact = {
  headlineLead: "Let's build something",
  headlineItalic: "that matters.",
  subline:
    "Whether it's ML infrastructure, streaming data pipelines, or mission-critical systems — reach out directly.",
};

export const seo = {
  title: "Vishal Murugadhas — ML / AI Engineer & Data Pipeline Builder",
  description:
    "Portfolio of Vishal Murugadhas, B.Tech student at SVNIT Surat specializing in ML, AI systems, and streaming data pipelines. 2nd place at PSB Hackathon 2026.",
  url: "https://vishal-murugadhas.vercel.app", // TODO: replace with your domain
  ogImage: "/og-image.png",
};
