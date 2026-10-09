import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, 'public', 'resumes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const resumes = [
  {
    fileName: 'Amol_Ippar_Full_Stack_Developer.pdf',
    title: 'Full Stack Developer (Java | Spring Boot | React.js | MERN)',
    summary: 'Proactive and results-driven Full Stack Developer with Post Graduate Diploma in Advanced Computing (PG-DAC) from CDAC Pune (79.50%, Highest Marks in Database Technologies) and Bachelor of Engineering in IT from SPPU (CGPA 7.95). Proficient in developing enterprise REST APIs with Spring Boot and Node.js, engineering responsive client applications with React.js and Tailwind CSS, and designing optimized relational databases in MySQL.',
    skills: [
      { category: 'Frontend', items: 'React.js 18, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Redux Toolkit, React Query, Vite, Responsive Design' },
      { category: 'Backend', items: 'Java, Spring Boot, Spring Security, JWT, RESTful APIs, Hibernate/JPA, Node.js, Express.js' },
      { category: 'Databases', items: 'MySQL (Advanced SQL, Indexing, ACID), MongoDB, Mongoose, Relational Schema Modeling' },
      { category: 'Tools & Practices', items: 'Git, GitHub, Maven, Postman, VS Code, IntelliJ IDEA, Agile/Scrum, Manual & API Testing' }
    ],
    projects: [
      {
        name: 'FleetPulse – Fleet & Logistics Management System',
        tech: 'Java, Spring Boot, Spring Security, JWT, MySQL, React.js, Tailwind CSS',
        bullets: [
          'Engineered an enterprise fleet management platform featuring vehicle lifecycle tracking, driver shifts, and trip route dispatches.',
          'Implemented secure role-based authorization (Admin, Fleet Manager, Driver) using Spring Security and stateless JWT authentication.',
          'Designed relational database schema in MySQL with optimized indexes and transactional integrity using Spring Data JPA.',
          'Created interactive React dashboard with data tables, vehicle telemetry status badges, and fuel consumption analytics.'
        ]
      },
      {
        name: 'AnnaRestro – Restaurant Platform & Online Ordering',
        tech: 'React.js, Redux Toolkit, Node.js, Express.js, MongoDB, Razorpay API',
        bullets: [
          'Developed digital restaurant ordering system supporting table QR-code access, categorized menus, and instant cart management.',
          'Integrated Razorpay payment gateway with cryptographic HMAC-SHA256 signature verification for tamper-proof transactions.',
          'Built administrative kitchen order dashboard with real-time status transitions (Received, Preparing, Ready, Delivered).'
        ]
      },
      {
        name: 'Manufacturing Work Order Management System',
        tech: 'Java, Spring Boot, Spring Security, MySQL, React.js, Tailwind CSS',
        bullets: [
          'Constructed an industrial shop-floor work order tracking platform enforcing state machine transitions from Draft to QA Inspection.',
          'Built role-specific views for Plant Managers, Line Supervisors, and Machine Operators with automated downtime reporting.'
        ]
      }
    ]
  },
  {
    fileName: 'Amol_Ippar_Java_Backend_Developer.pdf',
    title: 'Java Backend Developer (Spring Boot | REST APIs | MySQL | Microservices)',
    summary: 'Dedicated Java Backend Software Engineer with Post Graduate Diploma in Advanced Computing (PG-DAC) from CDAC Pune (79.50%, Topped Database Technologies & SQL) and BE in Information Technology from SPPU (7.95 CGPA). Experienced in designing high-performance RESTful microservices, implementing Spring Security with JWT filters, modeling relational database architectures in MySQL, and writing clean, maintainable, production-ready code.',
    skills: [
      { category: 'Core & Enterprise Java', items: 'Core Java (OOP, Collections, Multithreading, Streams, Exception Handling), Java 17/21, JDBC, Servlets' },
      { category: 'Frameworks & Architecture', items: 'Spring Boot, Spring Security, Spring Data JPA, Hibernate ORM, RESTful API Design, Layered Architecture' },
      { category: 'Database & SQL', items: 'MySQL (Highest Scorer in CDAC), SQL Query Optimization, Indexing, Transactions, MongoDB' },
      { category: 'Tools & DevOps Basics', items: 'Maven, Git, GitHub, Postman, MySQL Workbench, IntelliJ IDEA, VS Code, Linux/Bash' }
    ],
    projects: [
      {
        name: 'FleetPulse – Fleet Logistics Backend System',
        tech: 'Java 17, Spring Boot 3, Spring Security, JWT, Spring Data JPA, MySQL 8.0',
        bullets: [
          'Architected scalable backend service with layered design: Controller -> Service -> Repository -> Entity.',
          'Configured stateless JWT authentication filter and role-based URL authorization protecting sensitive enterprise dispatch endpoints.',
          'Optimized database queries with JPA derived methods, indexing on driver and vehicle tables, and handled transactional rollback guarantees.',
          'Documented and tested 25+ REST API endpoints using Postman with automated integration test suites.'
        ]
      },
      {
        name: 'Manufacturing Work Order Management Service',
        tech: 'Java, Spring Boot, Spring Data JPA, Hibernate, Bean Validation, MySQL',
        bullets: [
          'Engineered state machine workflow engine validating transitions (Draft, Approved, In Production, QA Sign-Off, Completed).',
          'Enforced robust business validations using Jakarta Bean Validation and customized GlobalExceptionHandler.',
          'Built relational mapping with OneToMany and ManyToOne cascading rules and custom SQL aggregation queries for production yields.'
        ]
      },
      {
        name: 'Employee Management & Audit Service',
        tech: 'Spring Boot, Spring Data JPA, Hibernate, MySQL, REST APIs',
        bullets: [
          'Developed RESTful CRUD services for employee directory, department allocations, and role designations.',
          'Utilized pagination, sorting, and specification filters to ensure sub-100ms API response latency on large record sets.'
        ]
      }
    ]
  },
  {
    fileName: 'Amol_Ippar_Software_Tester.pdf',
    title: 'Software Test Engineer / QA Engineer (Manual Testing | API Testing | Postman | JIRA)',
    summary: 'Quality-oriented Software Test Engineer with strong CDAC PG-DAC foundations in Software Engineering, SDLC, STLC, manual test execution, and API validation. Skilled in designing comprehensive test scenarios, authoring test cases, executing regression and smoke suites, validating RESTful APIs with Postman, and verifying data integrity via SQL queries in relational databases.',
    skills: [
      { category: 'Testing Fundamentals', items: 'Manual Testing, Functional Testing, Regression Testing, Smoke & Sanity Testing, Integration Testing, System Testing' },
      { category: 'Test Artifacts & Design', items: 'Test Plan, Test Scenarios, Test Cases, Boundary Value Analysis (BVA), Equivalence Class Partitioning, RTM' },
      { category: 'API & Database Testing', items: 'Postman, REST API Testing (Status Codes, Headers, JSON Schema Validation), SQL Queries, Joins, Data Validation' },
      { category: 'Defect Management & Tools', items: 'JIRA, Bug Life Cycle, Bug Reporting & Severity/Priority Matrix, Git, GitHub, DevTools, MySQL Workbench' }
    ],
    projects: [
      {
        name: 'Quality Assurance & API Verification – FleetPulse',
        tech: 'Manual Testing, Postman, REST API Testing, MySQL Database Testing',
        bullets: [
          'Authored 80+ comprehensive test cases covering authentication workflows, vehicle reservations, and driver shift scheduling.',
          'Conducted rigorous API testing in Postman verifying HTTP response codes (200, 201, 400, 401, 403, 404, 500) and JWT token expirations.',
          'Executed backend database verification by writing SQL queries to ensure foreign key integrity and ACID compliance during concurrent bookings.',
          'Identified and logged 18 defects in JIRA with reproducible steps, expected vs. actual results, and priority classifications.'
        ]
      },
      {
        name: 'End-to-End Validation – AnnaRestro Ordering Platform',
        tech: 'Functional Testing, Regression Testing, Payment Gateway Testing, Cross-Browser Testing',
        bullets: [
          'Validated critical customer order flow: table QR scanning, cart item quantity changes, coupon logic, and checkout.',
          'Performed end-to-end payment gateway validation with Razorpay test cards, verifying payment webhooks and signature errors.',
          'Conducted cross-browser and mobile responsive testing across Chrome, Firefox, and Safari on various viewport sizes.'
        ]
      },
      {
        name: 'Industrial Workflow Verification – Manufacturing Work Orders',
        tech: 'Negative Testing, Boundary Value Analysis, State Machine Verification',
        bullets: [
          'Executed extensive negative testing on work order state transitions to confirm unauthorized stage skipping is strictly blocked.',
          'Designed boundary value test cases for operator work hours, machine tolerance limits, and line item production quantities.'
        ]
      }
    ]
  },
  {
    fileName: 'Amol_Ippar_Machine_Learning_Developer.pdf',
    title: 'Python & Machine Learning Developer (Data Analysis | Scikit-Learn | Flask | React)',
    summary: 'Analytical Software Engineer with solid mathematical foundation (HSC Science, BE IT, CDAC Pune) passionate about applied machine learning, statistical modeling, and data-driven web applications. Proficient in Python data science libraries (NumPy, Pandas, scikit-learn), developing Flask microservices for model serving, and integrating interactive visualization dashboards with React.js.',
    skills: [
      { category: 'Programming & Web', items: 'Python 3, Flask, REST APIs, JavaScript (ES6+), React.js, HTML5, CSS3, Tailwind CSS' },
      { category: 'Machine Learning & Math', items: 'Supervised Learning (Regression, Classification, Decision Trees), Feature Engineering, Model Evaluation (ROC, AUC, Confusion Matrix)' },
      { category: 'Data Analysis & Libs', items: 'NumPy, Pandas, scikit-learn, Matplotlib, Recharts, Exploratory Data Analysis (EDA)' },
      { category: 'Databases & Tools', items: 'SQL, MySQL, MongoDB, SQLite, Jupyter Notebooks, Git, GitHub, VS Code, Postman' }
    ],
    projects: [
      {
        name: 'Predictive Analytics & Machine Learning Platform',
        tech: 'Python, Flask, scikit-learn, Pandas, NumPy, React.js, Tailwind CSS, Recharts',
        bullets: [
          'Engineered an interactive web platform for uploading CSV datasets and generating automated exploratory statistical summaries.',
          'Implemented scikit-learn pipelines for linear regression and classification with customizable hyperparameter sliders.',
          'Constructed Flask REST API endpoints that execute model inference and return formatted confusion matrix and ROC metrics.',
          'Designed responsive React frontend utilizing Recharts to render real-time prediction curves and residual plots.'
        ]
      },
      {
        name: 'StockTrail – Financial Portfolio Analytics Engine',
        tech: 'React.js, Node.js, Express.js, MongoDB, Recharts, Financial Calculations',
        bullets: [
          'Developed financial calculation module for weighted average buy prices, realized/unrealized profit-loss, and CAGR returns.',
          'Visualized asset allocation across equities and mutual funds using interactive pie and area charts.',
          'Engineered export utilities allowing users to download structured CSV transaction histories.'
        ]
      },
      {
        name: 'Academic Defaulter Identification Analytics System',
        tech: 'React.js, Node.js, Express.js, MongoDB Aggregation',
        bullets: [
          'Created automated aggregation pipelines computing running student attendance percentages against regulatory 75% threshold.',
          'Generated monthly trend distributions to help faculty identify and counsel at-risk students before final examinations.'
        ]
      }
    ]
  },
  {
    fileName: 'Amol_Ippar_Salesforce_Developer.pdf',
    title: 'Salesforce Developer / Associate Software Engineer (Apex | LWC | SOQL | Admin)',
    summary: 'Certified Post Graduate Software Engineer with CDAC PG-DAC (79.50%) and BE in Information Technology (7.95 CGPA). Experienced in Salesforce platform development, Apex programming, Lightning Web Components (LWC), Trigger Frameworks, SOQL optimization, Custom Metadata, and enterprise application architectures. Fast learner with strong analytical skills and dedication to high-standard enterprise solutions.',
    skills: [
      { category: 'Salesforce Development', items: 'Apex (Classes, Triggers, Batch Apex, Queueable), SOQL & SOSL, Lightning Web Components (LWC), Unit Testing (90%+ coverage)' },
      { category: 'Salesforce Admin & Config', items: 'Salesforce Flows, Validation Rules, Security & Sharing Model, Profiles, Permission Sets, Custom Objects/Fields, Data Loader' },
      { category: 'Enterprise Full Stack', items: 'Java, Spring Boot, JavaScript, HTML5/CSS3, RESTful APIs, JSON, Relational Databases (MySQL, SQL)' },
      { category: 'Developer Tools', items: 'VS Code with Salesforce Extensions, Salesforce CLI (sf), Git, GitHub, Postman, Workbench' }
    ],
    projects: [
      {
        name: 'Salesforce Validation & Trigger Bypass Switcher',
        tech: 'Salesforce, Apex, Lightning Web Components (LWC), Custom Metadata Types, Hierarchical Settings',
        bullets: [
          'Architected an enterprise bypass switch utility allowing administrators and data migration engineers to disable validation rules and triggers selectively without deploying code.',
          'Designed Apex Trigger Handler pattern that evaluates cached Custom Metadata Types for zero performance overhead during standard production transactions.',
          'Built an administrative Lightning Web Component (LWC) toggle dashboard for rapid user-level and profile-level bypass activations.',
          'Authored comprehensive Apex unit test classes achieving over 95% code coverage for positive and negative scenarios.'
        ]
      },
      {
        name: 'FleetPulse – Enterprise Logistics Management System',
        tech: 'Java, Spring Boot, Spring Security, MySQL, React.js',
        bullets: [
          'Designed enterprise-grade business application adhering to strict separation of concerns and role-based permissions.',
          'Engineered relational database models and transactional state management mirroring enterprise ERP workflows.'
        ]
      },
      {
        name: 'Manufacturing Work Order Quality & Flow System',
        tech: 'Java, Spring Boot, MySQL, REST APIs, UI Components',
        bullets: [
          'Built multi-stage lifecycle state engine enforcing compliance approvals and supervisor sign-offs across production lines.'
        ]
      }
    ]
  }
];

async function createResumePdf(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 in points
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const colorPrimary = rgb(0.08, 0.22, 0.45); // Deep Navy
  const colorSecondary = rgb(0.15, 0.45, 0.82); // Vibrant Blue
  const colorDark = rgb(0.12, 0.14, 0.17); // Text Dark
  const colorMuted = rgb(0.38, 0.42, 0.48); // Slate Muted
  const colorBorder = rgb(0.85, 0.88, 0.92); // Light Gray Divider

  let y = height - 36;
  const margin = 40;
  const contentWidth = width - margin * 2;

  // Header - Name
  page.drawText('AMOL IPPAR', {
    x: margin,
    y: y,
    size: 20,
    font: fontBold,
    color: colorPrimary,
  });
  y -= 18;

  // Role Title
  page.drawText(data.title, {
    x: margin,
    y: y,
    size: 11,
    font: fontBold,
    color: colorSecondary,
  });
  y -= 14;

  // Contact Info
  const contactText = 'Pune, Maharashtra | +91 9766043761 | amolippar2003@gmail.com | linkedin.com/in/amol-ippar | github.com/Amolippar';
  page.drawText(contactText, {
    x: margin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });
  y -= 10;

  // Top Divider
  page.drawLine({
    start: { x: margin, y: y },
    end: { x: width - margin, y: y },
    thickness: 1,
    color: colorSecondary,
  });
  y -= 16;

  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 10.5,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y: y },
      end: { x: width - margin, y: y },
      thickness: 0.75,
      color: colorBorder,
    });
    y -= 12;
  }

  function wrapText(text, maxChars) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxChars) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Section 1: Professional Summary
  drawSectionHeader('Professional Summary');
  const summaryLines = wrapText(data.summary, 98);
  for (const line of summaryLines) {
    page.drawText(line, {
      x: margin,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: colorDark,
    });
    y -= 11.5;
  }
  y -= 6;

  // Section 2: Technical Skills
  drawSectionHeader('Technical Skills');
  for (const skill of data.skills) {
    page.drawText(`•  ${skill.category}: `, {
      x: margin + 4,
      y: y,
      size: 8.5,
      font: fontBold,
      color: colorDark,
    });
    const prefixWidth = fontBold.widthOfTextAtSize(`•  ${skill.category}: `, 8.5);
    const itemLines = wrapText(skill.items, 80);
    page.drawText(itemLines[0] || '', {
      x: margin + 4 + prefixWidth,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: colorDark,
    });
    y -= 12;
    for (let i = 1; i < itemLines.length; i++) {
      page.drawText(itemLines[i], {
        x: margin + 20,
        y: y,
        size: 8.5,
        font: fontRegular,
        color: colorDark,
      });
      y -= 11.5;
    }
  }
  y -= 4;

  // Section 3: Key Technical Projects
  drawSectionHeader('Key Technical Projects');
  for (const project of data.projects) {
    // Project Title & Tech
    page.drawText(project.name, {
      x: margin,
      y: y,
      size: 9.5,
      font: fontBold,
      color: colorSecondary,
    });
    y -= 11;
    page.drawText(`Tech Stack: ${project.tech}`, {
      x: margin,
      y: y,
      size: 8,
      font: fontOblique,
      color: colorMuted,
    });
    y -= 11;

    for (const bullet of project.bullets) {
      const bulletLines = wrapText(bullet, 92);
      page.drawText('• ', {
        x: margin + 6,
        y: y,
        size: 8,
        font: fontBold,
        color: colorSecondary,
      });
      page.drawText(bulletLines[0], {
        x: margin + 14,
        y: y,
        size: 8.2,
        font: fontRegular,
        color: colorDark,
      });
      y -= 10.5;
      for (let i = 1; i < bulletLines.length; i++) {
        page.drawText(bulletLines[i], {
          x: margin + 14,
          y: y,
          size: 8.2,
          font: fontRegular,
          color: colorDark,
        });
        y -= 10.5;
      }
    }
    y -= 3;
  }
  y -= 2;

  // Section 4: Education & Qualifications
  drawSectionHeader('Education & Qualifications');
  const eduList = [
    {
      inst: 'Centre for Development of Advanced Computing (C-DAC), Pune',
      degree: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
      period: 'Aug 2025 – Feb 2026',
      details: 'Overall: 79.50% | Highest Marks in Database Technologies & SQL'
    },
    {
      inst: 'Savitribai Phule Pune University (Anantrao Pawar College of Engineering)',
      degree: 'Bachelor of Engineering in Information Technology (BE IT)',
      period: 'Completed: Dec 2024',
      details: 'Overall CGPA: 7.95 / 10'
    },
    {
      inst: 'Dayanand Science College, Latur',
      degree: 'Higher Secondary Certificate (HSC) — Science (PCMB)',
      period: 'Completed: May 2020',
      details: 'Specialization in Mathematics, Physics & Computer Science'
    }
  ];

  for (const edu of eduList) {
    page.drawText(edu.degree, {
      x: margin,
      y: y,
      size: 8.5,
      font: fontBold,
      color: colorDark,
    });
    page.drawText(edu.period, {
      x: width - margin - fontRegular.widthOfTextAtSize(edu.period, 8),
      y: y,
      size: 8,
      font: fontRegular,
      color: colorMuted,
    });
    y -= 10.5;
    page.drawText(`${edu.inst} — ${edu.details}`, {
      x: margin,
      y: y,
      size: 8,
      font: fontRegular,
      color: colorMuted,
    });
    y -= 11.5;
  }

  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(targetDir, data.fileName);
  fs.writeFileSync(filePath, pdfBytes);
  console.log(`Generated: ${filePath}`);
}

async function main() {
  for (const res of resumes) {
    await createResumePdf(res);
  }

  // Copy Full Stack resume as the default public/resume.pdf
  const defaultPath = path.join(__dirname, 'public', 'resume.pdf');
  const sourcePath = path.join(targetDir, 'Amol_Ippar_Full_Stack_Developer.pdf');
  fs.copyFileSync(sourcePath, defaultPath);
  console.log(`Copied default resume to: ${defaultPath}`);
}

main().catch(console.error);
