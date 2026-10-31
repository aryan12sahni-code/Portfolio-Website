export const profile = {
  name: "Aryan Sahni",
  firstName: "Aryan",
  lastName: "Sahni",
  title: "Product Operations · AI for Industry",
  location: "Nürnberg, Germany",
  email: "aryan93sahni@gmail.com",
  phone: "+49 155 1151 3979",
  headline: "I turn messy product data into decisions teams actually ship.",
  summary:
    "Product operations and analytics specialist transitioning into industrial AI. I connect SQL, dashboards, and automation so feature adoption climbs and reporting noise disappears.",
  languages: [
    { name: "Hindi", level: "Native" },
    { name: "English", level: "C1" },
    { name: "German", level: "A2" },
  ],
};

export const impactMetrics = [
  {
    id: "usage",
    label: "Feature usage lift",
    value: "15%",
    detail: "SQL + Python adoption analysis at DotPe",
  },
  {
    id: "time",
    label: "Reporting hours saved / week",
    value: "8h",
    detail: "Tableau & Power BI product-health automation",
  },
  {
    id: "complaints",
    label: "User complaints reduced",
    value: "20%",
    detail: "NPS + ticket friction mapping with PMs",
  },
  {
    id: "resolve",
    label: "Issue resolve time cut",
    value: "30%",
    detail: "Jira / Confluence workflow redesign",
  },
  {
    id: "rpa",
    label: "Manual processing cut",
    value: "40%",
    detail: "PowerApps + Dataverse RPA at BusyBots",
  },
];

export const about = {
  title: "About",
  body: [
    "I build the operational backbone behind product decisions — cleaning activity data, surfacing retention signals, and making weekly health reports run themselves.",
    "Now based in Germany and starting an M.Sc. in Artificial Intelligence for Industrial Applications at OTH Amberg-Weiden, I’m focused on bringing that same product rigor into ML systems for real-world operations.",
  ],
};

export const experience = [
  {
    role: "Product Operations",
    company: "DotPe",
    location: "New Delhi, India",
    period: "Sep 2024 – Nov 2025",
    highlights: [
      "Pulled and cleaned user activity with SQL and Python to analyze adoption, UX, and retention — driving a 15% boost in feature usage.",
      "Automated weekly product-health reporting with Tableau and Power BI dashboards, saving 8 hours of stakeholder reporting each week.",
      "Mapped UX friction through NPS and support tickets, helping PMs reprioritize and cut post-release complaints by 20%.",
      "Tightened cross-discipline ticket intake in Jira and Confluence, reducing issue resolve time by 30%.",
    ],
    stack: ["SQL", "Python", "Tableau", "Power BI", "Jira", "Confluence"],
  },
  {
    role: "RPA Intern",
    company: "BusyBots",
    location: "New Delhi, India",
    period: "Jun 2024 – Sep 2024",
    highlights: [
      "Automated cross-departmental data workflows with PowerApps and Dataverse, cutting manual processing time by 40% and eliminating entry errors.",
      "Designed role-based Dataverse access for multiple personas to protect security and integrity across automated flows.",
    ],
    stack: ["PowerApps", "Dataverse", "Automation"],
  },
];

export const projects = [
  {
    number: "01",
    name: "ATS-Friendly Resume Builder",
    summary:
      "CV generator with four templates, live preview, and pixel-perfect vector A4 PDF export via custom print CSS.",
    outcomes: [
      "JWT + bcrypt auth with guest-demo onboarding",
      "Prisma/SQLite + LocalStorage dual persistence with cloud sync",
      "JSON import/export for backup and schema migration",
    ],
    stack: ["Prisma", "SQLite", "JWT", "bcrypt", "LocalStorage"],
  },
  {
    number: "02",
    name: "Car Park Traffic & Occupancy Analysis",
    summary:
      "Time-series pipeline over 1.2M+ records across nine car parks to separate retail spikes from long-term demand.",
    outcomes: [
      "Disk-caching cut load times by 65%",
      "10-minute gap-masked traffic flow with 92% accuracy",
      "Haversine spatial mapping across 15+ GPS locations",
    ],
    stack: ["Python", "Time-Series", "Haversine", "Pandas"],
  },
];

export const education = [
  {
    school: "Ostbayerische Technische Hochschule Amberg-Weiden",
    degree: "M.Sc. Artificial Intelligence for Industrial Applications",
    location: "Amberg, Germany",
    period: "Mar 2026 – Sep 2028",
  },
  {
    school: "Bharati Vidyapeeth University",
    degree: "Bachelor of Computer Application",
    location: "Delhi, India",
    period: "Sep 2021 – Jul 2024",
  },
];

export const skillGroups = [
  {
    title: "Languages & Web",
    items: [
      "Python",
      "JavaScript",
      "React",
      "HTML",
      "Tailwind CSS",
      "C / C++",
      "Java",
      "MS SQL Server",
    ],
  },
  {
    title: "Data Science & ML",
    items: [
      "PyTorch",
      "NumPy",
      "Pandas",
      "Scikit-Learn",
      "Matplotlib",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    title: "Analytics & Visualization",
    items: [
      "SQL",
      "NoSQL",
      "Tableau",
      "Power BI",
      "Power Query",
      "Data Warehousing",
    ],
  },
  {
    title: "DevOps & Tools",
    items: ["Git", "Docker", "Jenkins", "Jira", "Confluence"],
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
