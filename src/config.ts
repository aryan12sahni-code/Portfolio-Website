export const config = {
  developer: {
    name: "Aryan",
    fullName: "Aryan Sahni",
    title: "AI Engineer",
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
  ],
  projects: [
    {
      id: 1,
      title: "ATS-Friendly Resume Builder",
      category: "Full-Stack Product",
      technologies: "Prisma, SQLite, JWT, bcrypt, LocalStorage, Print CSS",
      image: "/images/project-resume.svg",
      description:
        "Built an ATS-friendly CV generator with 4 customizable templates and real-time preview. Custom print CSS produces pixel-perfect vector A4 PDF exports. Includes JWT + bcrypt auth, guest-demo access, Prisma/SQLite persistence with LocalStorage backups, auto cloud sync, and JSON import/export for cross-device migration.",
      link: "/myworks",
    },
    {
      id: 2,
      title: "Car Park Traffic & Occupancy Analysis",
      category: "Data Science / Time-Series",
      technologies: "Python, Pandas, Time-Series, Haversine, Disk Caching",
      image: "/images/project-parking.svg",
      description:
        "Aggregated and cleaned 1.2M+ time-series records across 9 car parks into a unified dataset with disk-caching (65% faster loads). Engineered a traffic-flow algorithm with 10-minute gap masking (92% accuracy), ran 7-day and 30-day baseline analyses to separate long-term demand from retail spikes, and mapped GPS distances across 15+ locations with the Haversine formula.",
      link: "/myworks",
    },
    {
      id: 3,
      title: "Product Health Dashboards",
      category: "Product Analytics",
      technologies: "SQL, Python, Tableau, Power BI, Power Query",
      image: "/images/project-dashboard.svg",
      description:
        "Automated weekly product-health reporting for DotPe stakeholders using Tableau and Power BI, saving 8 hours of reporting each week. Combined SQL/Python activity analysis with NPS and support-ticket signals so PMs could prioritize friction points and improve feature adoption.",
      link: "/myworks",
    },
    {
      id: 4,
      title: "LightUp — AI Vision Assistant",
      category: "Assistive Intelligence · OTH Amberg-Weiden",
      technologies:
        "Python, FastAPI, NiceGUI, YOLOv8, Florence-2, OpenCV, dlib, TTS",
      image: "/images/project-lightup.svg",
      description:
        "Built a real-time AI assistant for visually impaired users that reads a live camera feed and speaks results aloud — object detection (YOLOv8n), face recognition with voice enrollment (OpenCV + dlib), and scene description (Florence-2). Unified FastAPI + NiceGUI stack on edge hardware with motion gating and audio cooldowns (~452 ms/frame), plus a physics-based power/battery telemetry dashboard.",
      link: "/myworks",
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
      title: "RPA",
      description: "Workflow automation & Dataverse",
      details:
        "At BusyBots, automated cross-department data workflows with PowerApps and Dataverse — cutting manual processing 40%, removing entry errors, and locking down role-based access across personas.",
      tools: [
        "PowerApps",
        "Dataverse",
        "Automation",
        "RPA",
        "Workflows",
        "Role-Based Access",
        "Data Integrity",
        "Process Mapping",
      ],
    },
  },
};
