export const config = {
  developer: {
    name: "Aryan",
    fullName: "Aryan Sahni",
    title: "Product Operations & Industrial AI",
    description:
      "Product operations and analytics specialist transitioning into industrial AI. Turning messy product data into decisions teams actually ship.",
  },
  social: {
    github: "",
    email: "aryan93sahni@gmail.com",
    location: "Nürnberg, Germany",
  },
  about: {
    title: "About Me",
    description:
      "I build the operational backbone behind product decisions — cleaning activity data, surfacing retention signals, and making weekly health reports run themselves. With experience at DotPe and BusyBots, I connect SQL, dashboards, and automation so feature adoption climbs and reporting noise disappears. Now based in Germany and starting an M.Sc. in Artificial Intelligence for Industrial Applications at OTH Amberg-Weiden, I'm focused on bringing that same product rigor into ML systems for real-world operations.",
  },
  experiences: [
    {
      position: "Product Operations",
      company: "DotPe",
      period: "2024 - 2025",
      location: "New Delhi, India",
      description:
        "Drove feature adoption with SQL/Python analysis (+15% usage), automated Tableau & Power BI health reporting (8h/week saved), cut user complaints 20% via NPS friction mapping, and reduced issue resolve time 30% through Jira/Confluence workflow redesign.",
      responsibilities: [
        "Analyzed user adoption, UX, and retention with SQL and Python",
        "Automated weekly product-health dashboards in Tableau and Power BI",
        "Mapped UX friction through NPS and support tickets with PMs",
        "Optimized cross-discipline ticket intake in Jira and Confluence",
      ],
      technologies: ["SQL", "Python", "Tableau", "Power BI", "Jira", "Confluence"],
    },
    {
      position: "RPA Intern",
      company: "BusyBots",
      period: "2024",
      location: "New Delhi, India",
      description:
        "Automated cross-departmental data workflows with PowerApps and Dataverse, cutting manual processing time by 40% and eliminating entry errors while protecting role-based data access.",
      responsibilities: [
        "Automated repetitive data workflows with PowerApps and Dataverse",
        "Built role-based Dataverse access for multiple user personas",
        "Reduced manual processing time by 40%",
      ],
      technologies: ["PowerApps", "Dataverse", "Automation"],
    },
    {
      position: "M.Sc. Artificial Intelligence",
      company: "OTH Amberg-Weiden",
      period: "2026 - Present",
      location: "Amberg, Germany",
      description:
        "Beginning a Master's in Artificial Intelligence for Industrial Applications, focused on applying ML/DL to real industrial and product systems.",
      responsibilities: [
        "Industrial AI coursework and applied ML",
        "Deep learning and data systems for operations",
      ],
      technologies: ["Python", "PyTorch", "Machine Learning", "Deep Learning"],
    },
    {
      position: "Bachelor of Computer Application",
      company: "Bharati Vidyapeeth University",
      period: "2021 - 2024",
      location: "Delhi, India",
      description:
        "Built a foundation in computer science, web development, and data structures while shipping personal full-stack and analytics projects.",
      responsibilities: [
        "Computer application fundamentals",
        "Web development and data structures",
        "Personal product and analytics projects",
      ],
      technologies: ["Java", "JavaScript", "Python", "SQL", "React"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "ATS Resume Builder",
      category: "Full-Stack",
      technologies: "Prisma, SQLite, JWT, bcrypt, LocalStorage",
      image: "/images/project-resume.svg",
      description:
        "ATS-friendly CV generator with 4 customizable templates, real-time preview, pixel-perfect A4 PDF export, JWT auth, and dual Prisma/SQLite + LocalStorage persistence with JSON import/export.",
      link: "#work",
    },
    {
      id: 2,
      title: "Car Park Occupancy",
      category: "Data / ML",
      technologies: "Python, Time-Series, Haversine, Pandas",
      image: "/images/project-parking.svg",
      description:
        "Aggregated 1.2M+ time-series records across 9 car parks, engineered traffic-flow analysis with 92% accuracy, and mapped GPS distances with Haversine across 15+ locations.",
      link: "#work",
    },
    {
      id: 3,
      title: "Product Health Dashboards",
      category: "Analytics",
      technologies: "SQL, Python, Tableau, Power BI",
      image: "/images/project-dashboard.svg",
      description:
        "Automated weekly product-health reporting for stakeholders, saving 8 hours per week and surfacing adoption, retention, and UX friction signals.",
      link: "#work",
    },
    {
      id: 4,
      title: "Workflow Automation",
      category: "RPA",
      technologies: "PowerApps, Dataverse, Automation",
      image: "/images/project-rpa.svg",
      description:
        "Cross-departmental RPA flows with role-based Dataverse access that cut manual processing time by 40% and eliminated data-entry errors.",
      link: "#work",
    },
  ],
  contact: {
    email: "aryan93sahni@gmail.com",
    phone: "+49 155 1151 3979",
    github: "mailto:aryan93sahni@gmail.com",
    linkedin: "mailto:aryan93sahni@gmail.com",
    twitter: "mailto:aryan93sahni@gmail.com",
    facebook: "mailto:aryan93sahni@gmail.com",
    instagram: "mailto:aryan93sahni@gmail.com",
  },
  skills: {
    develop: {
      title: "PRODUCT OPS",
      description: "Adoption, retention & reporting systems",
      details:
        "SQL + Python analysis, Tableau/Power BI automation, NPS friction mapping, and cross-team workflows in Jira/Confluence that move product metrics.",
      tools: [
        "SQL",
        "Python",
        "Tableau",
        "Power BI",
        "Jira",
        "Confluence",
        "NPS",
        "Retention",
        "Dashboards",
        "Automation",
      ],
    },
    design: {
      title: "INDUSTRIAL AI",
      description: "ML systems for real operations",
      details:
        "Transitioning into industrial AI with PyTorch, time-series analysis, and full-stack tooling — applying product rigor to machine learning for the physical world.",
      tools: [
        "Python",
        "PyTorch",
        "Pandas",
        "Scikit-Learn",
        "React",
        "JavaScript",
        "Docker",
        "Git",
        "Time-Series",
        "Deep Learning",
      ],
    },
  },
};
