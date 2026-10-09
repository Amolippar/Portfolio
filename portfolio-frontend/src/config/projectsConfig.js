/**
 * Centralized Project Configuration & Schema Normalizer
 * Provides uniform project metadata across the frontend, ensuring compatibility
 * between Spring Boot API responses and local fallback definitions.
 */

export const PROJECTS_CONFIG = [
  {
    id: 1,
    title: "FleetPulse – Fleet & Logistics Management System",
    slug: "fleetpulse",
    shortDescription: "Enterprise fleet management and logistics platform engineered with Java Spring Boot, Spring Security, JWT, and React.js to monitor vehicles, driver schedules, fuel telemetry, and dispatch routes.",
    fullDescription: "FleetPulse is a comprehensive enterprise fleet coordination platform designed to eliminate operational friction in logistics dispatch and vehicle asset maintenance. Built with a robust Spring Boot microservice-ready backend and interactive React.js dashboard, the system orchestrates driver duty shifts, vehicle lifecycle tracking, fuel consumption logs, and automated preventive maintenance schedules with strict role-based access control.",
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    category: "Spring Boot",
    technologies: "Java, Spring Boot, Spring Security, JWT, MySQL, Hibernate/JPA, React.js, Tailwind CSS, REST APIs, Maven",
    frontendTechStack: "React.js 19, Tailwind CSS, Lucide Icons, Axios, React Router 7",
    backendTechStack: "Java 17/21, Spring Boot 3, Spring Security, JWT, Spring Data JPA, Hibernate",
    databaseTechStack: "MySQL 8.0, Relational Indexing, Foreign Key Constraints",
    tools: "Git, GitHub, Maven, Postman, VS Code, IntelliJ IDEA",
    liveDemoUrl: "/demo/fleetpulse",
    githubUrl: "https://github.com/Amolippar/fleetpulse",
    githubFrontendUrl: "https://github.com/Amolippar/fleetpulse",
    githubBackendUrl: "https://github.com/Amolippar/fleetpulse",
    detailsUrl: "/projects/fleetpulse",
    deploymentStatus: "deployed",
    localPort: 5174,
    isFeatured: true,
    displayOrder: 1
  },
  {
    id: 2,
    title: "AnnaRestro – Restaurant Management & Online Ordering",
    slug: "annarestro",
    shortDescription: "Full-stack digital dining and restaurant operations platform with QR table menu browsing, interactive multi-item cart, Razorpay payment verification, and real-time kitchen order management.",
    fullDescription: "AnnaRestro transforms traditional restaurant hospitality by providing a frictionless contactless ordering experience. Customers scan QR codes at tables or browse online to view categorized culinary menus with dietary tags, configure customized order items, and execute secure digital transactions. The kitchen staff and managers access real-time dispatch pipelines to mark prep status and generate analytical revenue reports.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    category: "Full Stack",
    technologies: "React.js, Redux Toolkit, Node.js, Express.js, MongoDB, Mongoose, Razorpay API, Tailwind CSS, JWT",
    frontendTechStack: "React.js 19, Redux Toolkit, Tailwind CSS, Lucide Icons, React Router 7",
    backendTechStack: "Node.js, Express.js, Spring Boot micro-services, Razorpay SDK, JWT",
    databaseTechStack: "MongoDB, Mongoose ODM, Aggregation Pipelines",
    tools: "Postman, Git, GitHub, VS Code, npm",
    liveDemoUrl: "/demo/annarestro",
    githubUrl: "https://github.com/Amolippar/annarestro",
    githubFrontendUrl: "https://github.com/Amolippar/annarestro",
    githubBackendUrl: "https://github.com/Amolippar/annarestro",
    detailsUrl: "/projects/annarestro",
    deploymentStatus: "deployed",
    localPort: 5175,
    isFeatured: true,
    displayOrder: 2
  },
  {
    id: 3,
    title: "CineVault – Movie & Entertainment Discovery Platform",
    slug: "cinevault",
    shortDescription: "Feature-rich entertainment discovery platform offering instant movie searches, genre exploration, trending media carousels, detailed cast telemetry, and personalized watchlist curation.",
    fullDescription: "CineVault delivers an immersive entertainment catalog for cinephiles. Built with React and TypeScript, it integrates TMDB media endpoints to provide dynamic genre-wise discovery, trailer previews, cast profiles, user ratings, and persistent watchlist storage with optimistic client caching.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    category: "React",
    technologies: "React.js, TypeScript, Tailwind CSS, TanStack Query, TMDB API, Axios, Lucide Icons",
    frontendTechStack: "React 18, TypeScript, Tailwind CSS, TanStack Query, Vite",
    backendTechStack: "Node.js, Express.js, REST APIs",
    databaseTechStack: "LocalStorage Sync, Redis Cache ready",
    tools: "Vite, Git, GitHub, VS Code, Vitest",
    liveDemoUrl: "/demo/cinevault",
    githubUrl: "https://github.com/Amolippar/cinevault",
    githubFrontendUrl: "https://github.com/Amolippar/cinevault",
    githubBackendUrl: "https://github.com/Amolippar/cinevault",
    detailsUrl: "/projects/cinevault",
    deploymentStatus: "deployed",
    localPort: 5176,
    isFeatured: true,
    displayOrder: 3
  },
  {
    id: 4,
    title: "StockTrail – Personal Finance & Portfolio Tracker",
    slug: "stocktrail",
    shortDescription: "Comprehensive financial asset and portfolio tracker enabling investors to log equities, track buy/sell transactions, compute realized/unrealized P&L, and visualize asset allocation.",
    fullDescription: "StockTrail empowers retail investors with analytical clarity over equity holdings and personal wealth portfolios. Built with Vue.js / React frontends and Spring Boot / Express financial services, it computes dynamic cost basis, portfolio diversity indices, dividend returns, and sector exposure graphs.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    category: "Full Stack",
    technologies: "Vue 3 / React, Pinia, Java Spring Boot, MySQL, REST APIs, Chart.js, Tailwind CSS",
    frontendTechStack: "Vue 3, Pinia / React.js, Tailwind CSS, Lucide Icons",
    backendTechStack: "Java Spring Boot / Node.js Express, Financial Calculation Engines",
    databaseTechStack: "MySQL 8.0, Transaction Ledgers, Portfolio Audit Tables",
    tools: "Git, GitHub, Maven, Postman, Vite",
    liveDemoUrl: "/demo/stocktrail",
    githubUrl: "https://github.com/Amolippar/stocktrail-main",
    githubFrontendUrl: "https://github.com/Amolippar/stocktrail-frontend",
    githubBackendUrl: "https://github.com/Amolippar/stocktrail-backend",
    detailsUrl: "/projects/stocktrail",
    deploymentStatus: "deployed",
    localPort: 5177,
    isFeatured: false,
    displayOrder: 4
  },
  {
    id: 5,
    title: "Instagram Clone – Social Media Platform",
    slug: "instagram-clone",
    shortDescription: "Modern social networking platform replicating core Instagram capabilities, including post publishing with media uploads, interactive likes/comments, follow graphs, and user profiles.",
    fullDescription: "A full-scale social application architected to replicate modern social media workflows. Users upload visual content, interact through double-tap likes and comments, explore discovered feeds, follow developer peers, and customize their public profile biographies.",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    category: "Full Stack",
    technologies: "React.js, Tailwind CSS, Node.js, Express.js, MongoDB, JWT Authentication, Cloudinary API",
    frontendTechStack: "React.js, Tailwind CSS, Axios, Lucide Icons",
    backendTechStack: "Node.js, Express.js, JWT, Multer, Cloudinary SDK",
    databaseTechStack: "MongoDB, Mongoose ODM, Social Graph Schemas",
    tools: "Postman, Git, GitHub, VS Code",
    liveDemoUrl: "/demo/instagram-clone",
    githubUrl: "https://github.com/Amolippar/instagram-clone",
    githubFrontendUrl: "https://github.com/Amolippar/instagram-clone-frontend",
    githubBackendUrl: "https://github.com/Amolippar/instagram-clone-backend",
    detailsUrl: "/projects/instagram-clone",
    deploymentStatus: "deployed",
    localPort: 3001,
    isFeatured: false,
    displayOrder: 5
  },
  {
    id: 6,
    title: "Manufacturing Work Order Management System",
    slug: "manufacturing-work-orders",
    shortDescription: "Industrial work-order tracking system enabling plant managers, supervisors, and machine operators to coordinate production schedules, monitor stage progress, and log QA inspections.",
    fullDescription: "Engineered for discrete manufacturing floors, this workflow system tracks the complete lifecycle of production orders from material issue to final quality audit. Station operators log cycle times, report machine bottlenecks, and submit quality pass/fail criteria across multi-stage assembly lines.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    category: "Spring Boot",
    technologies: "Java, Spring Boot, Spring Data JPA, MySQL, React.js, Tailwind CSS, REST APIs",
    frontendTechStack: "React.js, Tailwind CSS, Lucide Icons, Axios",
    backendTechStack: "Java Spring Boot, Hibernate, Transaction Management",
    databaseTechStack: "MySQL 8.0, ACID State Machines, Audit Logs",
    tools: "Maven, Git, GitHub, IntelliJ IDEA",
    liveDemoUrl: "/demo/manufacturing-work-orders",
    githubUrl: "https://github.com/Amolippar/manufacturing-workorders",
    githubFrontendUrl: "https://github.com/Amolippar/manufacturing-workorders-frontend",
    githubBackendUrl: "https://github.com/Amolippar/manufacturing-workorders",
    detailsUrl: "/projects/manufacturing-work-orders",
    deploymentStatus: "deployed",
    localPort: 5178,
    isFeatured: false,
    displayOrder: 6
  },
  {
    id: 7,
    title: "Student Attendance & Defaulter Analytics System",
    slug: "student-attendance-system",
    shortDescription: "Academic management portal allowing professors to record division-wise lecture attendance with one click, compute cumulative percentages, and flag attendance defaulters for timely intervention.",
    fullDescription: "Designed for educational institutions like engineering colleges, this attendance management platform streamlines classroom roll calls. Professors filter by semester, subject, and division to record attendance, while automated background jobs calculate cumulative presence and alert students with attendance below 75%.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    category: "Full Stack",
    technologies: "React.js, Node.js, Express.js, MongoDB, JWT, Tailwind CSS, Excel/CSV Export",
    frontendTechStack: "React.js, Tailwind CSS, Lucide Icons, Axios",
    backendTechStack: "Node.js, Express.js, JWT, Attendance Aggregation Engine",
    databaseTechStack: "MongoDB / MySQL, Relational Roster Models",
    tools: "Postman, Git, GitHub, VS Code",
    liveDemoUrl: "/demo/student-attendance-system",
    githubUrl: "https://github.com/Amolippar/student-attendance",
    githubFrontendUrl: "https://github.com/Amolippar/student-attendance-frontend",
    githubBackendUrl: "https://github.com/Amolippar/student-attendance-backend",
    detailsUrl: "/projects/student-attendance-system",
    deploymentStatus: "deployed",
    localPort: 5179,
    isFeatured: false,
    displayOrder: 7
  },
  {
    id: 8,
    title: "Predictive Analytics & ML Dashboard",
    slug: "predictive-analytics",
    shortDescription: "Data analysis and machine learning platform featuring automated regression forecasting, correlation matrix visualization, CSV dataset ingestion, and interactive model parameter tuning.",
    fullDescription: "A full-featured machine learning exploration dashboard that turns raw tabular datasets into predictive intelligence. Users upload CSV files, view descriptive statistics, adjust hyperparameter sliders (learning rate, estimators, threshold), and inspect ROC curves and confusion matrices in real time.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    category: "Machine Learning",
    technologies: "Python, Flask, Scikit-Learn, Pandas, NumPy, React.js, Tailwind CSS, Recharts",
    frontendTechStack: "React.js, Tailwind CSS, SVG Visualizers, Recharts",
    backendTechStack: "Python, Flask, Scikit-Learn, Pandas, NumPy",
    databaseTechStack: "Pandas DataFrame In-Memory, SQLite Serializer",
    tools: "Jupyter Notebook, Git, GitHub, VS Code, Python 3.11",
    liveDemoUrl: "/demo/predictive-analytics",
    githubUrl: "https://github.com/Amolippar/predictive-analytics",
    githubFrontendUrl: "https://github.com/Amolippar/predictive-analytics-frontend",
    githubBackendUrl: "https://github.com/Amolippar/predictive-analytics-backend",
    detailsUrl: "/projects/predictive-analytics",
    deploymentStatus: "deployed",
    localPort: 5180,
    isFeatured: false,
    displayOrder: 8
  },
  {
    id: 9,
    title: "Salesforce Validation & Trigger Bypass Switcher",
    slug: "salesforce-validation-switcher",
    shortDescription: "Developer and administrator utility enabling granular, user-level or profile-level activation and deactivation of Salesforce validation rules, triggers, and workflow flows during data migrations.",
    fullDescription: "Engineered to overcome enterprise governor limit bottlenecks during bulk ETL data migrations. The switcher leverages Custom Metadata Types and hierarchical Custom Settings to provide an interactive administrative console that toggles apex triggers, validation rules, and record flows without deploying code changes.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    category: "Salesforce",
    technologies: "Salesforce Apex, Custom Metadata Types, SOQL, Lightning Web Components, React.js, Node.js",
    frontendTechStack: "React.js, Tailwind CSS, LWC-Inspired Controls",
    backendTechStack: "Salesforce Apex, Tooling API, Node.js Express Proxy",
    databaseTechStack: "Salesforce Custom Metadata & Schema Models",
    tools: "SFDX CLI, VS Code, Developer Console, Workbench",
    liveDemoUrl: "/demo/salesforce-validation-switcher",
    githubUrl: "https://github.com/Amolippar/sf-validation-manager",
    githubFrontendUrl: "https://github.com/Amolippar/sf-validation-manager",
    githubBackendUrl: "https://github.com/Amolippar/sf-validation-manager",
    detailsUrl: "/projects/salesforce-validation-switcher",
    deploymentStatus: "deployed",
    localPort: 3000,
    isFeatured: false,
    displayOrder: 9
  },
  {
    id: 10,
    title: "Amol Ippar – Full-Stack Developer Portfolio",
    slug: "developer-portfolio",
    shortDescription: "Modern, production-grade developer portfolio built with React.js, Tailwind CSS, and Java Spring Boot REST backend featuring role-tailored resume downloads, live project explorers, and contact management.",
    fullDescription: "A high-performance portfolio platform showcasing the engineering capabilities of Amol Ippar. Designed with a layered client-server architecture, reactive state management, interactive project telemetry simulators, and verified recruiter-friendly resume pathways.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    category: "Full Stack",
    technologies: "Java, Spring Boot 3, Spring Security, JWT, MySQL, React.js, Vite, Tailwind CSS, Framer Motion",
    frontendTechStack: "React.js 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons",
    backendTechStack: "Java 21, Spring Boot 3.3, Spring Security 6, JWT, Spring Data JPA",
    databaseTechStack: "MySQL 8.0, Auto-Seeding Schema, Connection Pool",
    tools: "Maven, Git, GitHub, VS Code, Postman",
    liveDemoUrl: "/demo/developer-portfolio",
    githubUrl: "https://github.com/Amolippar/Portfolio",
    githubFrontendUrl: "https://github.com/Amolippar/portfolio-frontend",
    githubBackendUrl: "https://github.com/Amolippar/portfolio-backend",
    detailsUrl: "/projects/developer-portfolio",
    deploymentStatus: "deployed",
    localPort: 5173,
    isFeatured: false,
    displayOrder: 10
  }
];

/**
 * Normalizes any project object (whether returned from Spring Boot API or fallback)
 * to guarantee all required fields and correct links exist.
 */
export function normalizeProject(rawProject) {
  if (!rawProject) return null;

  const fallback = PROJECTS_CONFIG.find(
    (p) => p.slug === rawProject.slug || p.id === rawProject.id
  ) || {};

  const slug = rawProject.slug || fallback.slug || String(rawProject.id || '');
  const detailsUrl = rawProject.detailsUrl || fallback.detailsUrl || `/projects/${slug}`;

  // Validate liveDemoUrl: must be non-empty and start with http/https or /demo/
  let liveDemoUrl = rawProject.liveDemoUrl || fallback.liveDemoUrl || `/demo/${slug}`;
  if (typeof liveDemoUrl === 'string') {
    liveDemoUrl = liveDemoUrl.trim();
    if (!liveDemoUrl.startsWith('http://') && !liveDemoUrl.startsWith('https://') && !liveDemoUrl.startsWith('/demo/')) {
      liveDemoUrl = `/demo/${slug}`;
    }
  } else {
    liveDemoUrl = `/demo/${slug}`;
  }

  const isLive = Boolean(liveDemoUrl);
  const deploymentStatus = rawProject.deploymentStatus || (isLive ? 'deployed' : (fallback.deploymentStatus || 'deployed'));

  return {
    ...fallback,
    ...rawProject,
    slug,
    detailsUrl,
    liveDemoUrl,
    isLive,
    deploymentStatus,
    githubUrl: rawProject.githubUrl || fallback.githubUrl || 'https://github.com/Amolippar',
    githubFrontendUrl: rawProject.githubFrontendUrl || fallback.githubFrontendUrl || rawProject.githubUrl || fallback.githubUrl,
    githubBackendUrl: rawProject.githubBackendUrl || fallback.githubBackendUrl || rawProject.githubUrl || fallback.githubUrl,
  };
}

/**
 * Lookup helper to retrieve normalized project configuration by slug.
 */
export function getProjectConfigBySlug(slug) {
  const match = PROJECTS_CONFIG.find((p) => p.slug === slug);
  return normalizeProject(match);
}
