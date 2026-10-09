package com.portfolio.config;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          ProfileRepository profileRepository,
                          EducationRepository educationRepository,
                          SkillRepository skillRepository,
                          ProjectRepository projectRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.educationRepository = educationRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedProfile();
        seedEducation();
        seedSkills();
        seedProjects();
        log.info("Database seeding checked and completed successfully!");
    }

    private void seedAdminUser() {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .username("admin")
                    .email("admin@portfolio.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(admin);
            log.info("Default admin user created: admin / admin123");
        }
    }

    private void seedProfile() {
        if (profileRepository.count() == 0) {
            Profile profile = Profile.builder()
                    .fullName("Amol Ippar")
                    .title("Full Stack Developer | Java | Spring Boot | React.js | CDAC Pune")
                    .bio("Passionate Full Stack Software Developer with a Bachelor of Engineering in Information Technology (SPPU) and PG-DAC from CDAC Pune (79.50%, Highest Marks in Database Technologies). Proficient in building robust enterprise REST APIs with Spring Boot, dynamic responsive user interfaces with React.js, and reliable database architectures with MySQL.")
                    .aboutDetails("I am a software engineer based in Pune, Maharashtra. I specialize in developing end-to-end web applications with modern tech stacks including Java, Spring Boot, Spring Security, MySQL, React.js, Tailwind CSS, and Node.js. My academic background combines rigorous training from CDAC Pune with a solid IT engineering foundation from SPPU. I have developed production-grade systems including FleetPulse (Fleet Management), AnnaRestro (Restaurant Platform), CineVault, StockTrail, and Industrial Work Order systems.")
                    .email("amolippar2003@gmail.com")
                    .phone("+91 9766043761")
                    .location("Pune, Maharashtra, India")
                    .githubUrl("https://github.com/Amolippar")
                    .linkedinUrl("https://www.linkedin.com/in/amol-ippar-87a35a24a/")
                    .resumeUrl("/resumes/Amol_Ippar_Full_Stack_Developer.pdf")
                    .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop")
                    .experienceStat("PG-DAC + BE IT")
                    .projectsStat("10 Verified")
                    .technologiesStat("20+ Tech")
                    .educationStat("CDAC Pune (79.50%) | BE IT (7.95 CGPA)")
                    .build();
            profileRepository.save(profile);
            log.info("Profile seed data created for Amol Ippar");
        }
    }

    private void seedEducation() {
        if (educationRepository.count() < 4) {
            educationRepository.deleteAll();
            List<Education> educations = Arrays.asList(
                    Education.builder()
                            .degree("Post Graduate Diploma in Advanced Computing (PG-DAC)")
                            .institution("Centre for Development of Advanced Computing (C-DAC), Pune")
                            .completionDate("August 2025 – February 2026")
                            .description("Scored 79.50% overall with Highest Marks in Database Technologies & SQL. Intensive advanced computing curriculum covering Advanced Java, Spring Boot, Microservices, Data Structures & Algorithms, React.js, Operating Systems, Software Engineering, and Database Technologies.")
                            .iconName("Award")
                            .displayOrder(1)
                            .build(),
                    Education.builder()
                            .degree("Bachelor of Engineering — Information Technology")
                            .institution("Savitribai Phule Pune University (Anantrao Pawar College of Engineering)")
                            .completionDate("Completed: December 2024 (CGPA: 7.95)")
                            .description("Comprehensive engineering education with emphasis on Software Engineering, Object-Oriented Analysis & Design, Database Management Systems, Computer Networks, and Cloud Computing. Built solid engineering foundations through hands-on full-stack development capstone projects.")
                            .iconName("GraduationCap")
                            .displayOrder(2)
                            .build(),
                    Education.builder()
                            .degree("HSC — Science (Higher Secondary Certificate)")
                            .institution("Dayanand Science College, Latur")
                            .completionDate("Completed: May 2020")
                            .description("Specialization in Mathematics, Physics, Chemistry, and Computer Science, cultivating strong mathematical and analytical problem-solving acumen.")
                            .iconName("BookOpen")
                            .displayOrder(3)
                            .build(),
                    Education.builder()
                            .degree("SSC (Secondary School Certificate)")
                            .institution("Bhagwan Vidyalaya, Latur")
                            .completionDate("Completed: May 2018")
                            .description("Completed Secondary School Certificate with distinction. Participated actively in academic science exhibitions, sports, and mathematics olympiads.")
                            .iconName("Award")
                            .displayOrder(4)
                            .build()
            );
            educationRepository.saveAll(educations);
            log.info("Education seed data populated with CDAC & SPPU (4 entries)");
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = Arrays.asList(
                    // Frontend
                    Skill.builder().name("React.js").category("Frontend").level("Strong").iconName("Atom").displayOrder(1).build(),
                    Skill.builder().name("JavaScript (ES6+)").category("Frontend").level("Strong").iconName("FileCode").displayOrder(2).build(),
                    Skill.builder().name("Tailwind CSS").category("Frontend").level("Strong").iconName("Layout").displayOrder(3).build(),
                    Skill.builder().name("HTML5 & CSS3").category("Frontend").level("Strong").iconName("Code").displayOrder(4).build(),
                    Skill.builder().name("Redux Toolkit").category("Frontend").level("Good").iconName("Layers").displayOrder(5).build(),
                    Skill.builder().name("Vite").category("Frontend").level("Good").iconName("Zap").displayOrder(6).build(),
                    Skill.builder().name("Bootstrap").category("Frontend").level("Good").iconName("Grid").displayOrder(7).build(),

                    // Backend
                    Skill.builder().name("Java").category("Backend").level("Strong").iconName("Coffee").displayOrder(8).build(),
                    Skill.builder().name("Spring Boot").category("Backend").level("Strong").iconName("Server").displayOrder(9).build(),
                    Skill.builder().name("Spring Security").category("Backend").level("Good").iconName("Shield").displayOrder(10).build(),
                    Skill.builder().name("RESTful APIs").category("Backend").level("Strong").iconName("Network").displayOrder(11).build(),
                    Skill.builder().name("Hibernate / JPA").category("Backend").level("Strong").iconName("Cpu").displayOrder(12).build(),
                    Skill.builder().name("Node.js & Express").category("Backend").level("Good").iconName("Terminal").displayOrder(13).build(),

                    // Database
                    Skill.builder().name("MySQL").category("Database").level("Strong").iconName("Database").displayOrder(14).build(),
                    Skill.builder().name("SQL (High Scorer)").category("Database").level("Strong").iconName("Table").displayOrder(15).build(),
                    Skill.builder().name("MongoDB").category("Database").level("Good").iconName("HardDrive").displayOrder(16).build(),

                    // Tools & Platforms
                    Skill.builder().name("Git & GitHub").category("Tools").level("Strong").iconName("GitBranch").displayOrder(17).build(),
                    Skill.builder().name("Postman").category("Tools").level("Strong").iconName("Send").displayOrder(18).build(),
                    Skill.builder().name("Maven").category("Tools").level("Strong").iconName("Compass").displayOrder(19).build(),
                    Skill.builder().name("VS Code & IntelliJ").category("Tools").level("Strong").iconName("Monitor").displayOrder(20).build(),
                    Skill.builder().name("Salesforce / Apex").category("Tools").level("Good").iconName("Cloud").displayOrder(21).build(),

                    // Testing & Quality
                    Skill.builder().name("Manual Testing").category("Testing").level("Good").iconName("ClipboardCheck").displayOrder(22).build(),
                    Skill.builder().name("Test Case Design").category("Testing").level("Good").iconName("FileSpreadsheet").displayOrder(23).build(),
                    Skill.builder().name("API Testing").category("Testing").level("Strong").iconName("Activity").displayOrder(24).build(),
                    Skill.builder().name("Bug Life Cycle & JIRA").category("Testing").level("Good").iconName("AlertCircle").displayOrder(25).build()
            );
            skillRepository.saveAll(skills);
            log.info("Skills seed data populated (25 verified skills)");
        }
    }

    private void seedProjects() {
        boolean needsReseed = projectRepository.count() != 10 ||
                projectRepository.findAll().stream().anyMatch(p -> p.getSlug() == null || p.getSlug().isBlank() || p.getFullDescription() == null || (p.getLiveDemoUrl() != null && p.getLiveDemoUrl().contains("vercel.app")));

        if (needsReseed) {
            projectRepository.deleteAll();

            List<Project> projects = Arrays.asList(
                    // 1. FleetPulse
                    Project.builder()
                            .slug("fleetpulse")
                            .title("FleetPulse – Fleet & Logistics Management System")
                            .shortDescription("Enterprise fleet management and logistics platform engineered with Java Spring Boot, Spring Security, JWT, and React.js to monitor vehicles, driver schedules, fuel telemetry, and dispatch routes.")
                            .fullDescription("FleetPulse is a comprehensive enterprise fleet coordination platform designed to eliminate operational friction in logistics dispatch and vehicle asset maintenance. Built with a robust Spring Boot microservice-ready backend and interactive React.js dashboard, the system orchestrates driver duty shifts, vehicle lifecycle tracking, fuel consumption logs, and automated preventive maintenance schedules with strict role-based access control.")
                            .problemStatement("Logistics dispatchers and fleet operations teams grapple with uncoordinated driver scheduling, unexpected vehicle breakdowns, and lack of real-time auditability over multi-stop dispatch trips.")
                            .objective("Develop a secure, high-throughput fleet management system featuring role-based authorization, comprehensive vehicle telemetry records, automated route status logs, and relational transaction integrity.")
                            .challenges("Maintaining ACID compliance across concurrent vehicle reservation queries, structuring JWT-based role separation for Fleet Managers, Drivers, and Maintenance Technicians, and designing high-performance REST endpoints with Spring Data JPA pagination.")
                            .solution("Designed a clean layered architecture (Controller → Service → Repository → Entity) in Spring Boot, configured JWT filters in Spring Security, optimized indexing on vehicle license and driver tables in MySQL, and delivered a responsive administrative dashboard in React.js.")
                            .technologies("Java, Spring Boot, Spring Security, JWT, MySQL, Hibernate/JPA, React.js, Tailwind CSS, REST APIs, Maven")
                            .frontendTechStack("React.js, Tailwind CSS, Lucide Icons, Axios, React Router")
                            .backendTechStack("Java 17/21, Spring Boot 3, Spring Security, JWT, Spring Data JPA, Hibernate")
                            .databaseTechStack("MySQL 8.0, Relational Indexing, Foreign Key Constraints")
                            .tools("Git, GitHub, Maven, Postman, VS Code, IntelliJ IDEA")
                            .responsibilities("Engineered RESTful API endpoints for vehicle and trip dispatch management; implemented secure JWT authentication flow and role-based route guards; modeled normalized relational schemas in MySQL; built responsive UI data tables and analytics cards in React.js.")
                            .architecture("Layered Client-Server Architecture. React frontend communicates via Axios HTTP client through a reverse-proxy/CORS layer to Spring Boot REST Controllers, guarded by JwtAuthenticationFilter and Spring Security SecurityFilterChain, delegating business rules to Service layer and persisting via JPA Repositories into MySQL.")
                            .features("Role-Based Access Control (Admin, Fleet Manager, Driver); Real-Time Vehicle Status Tracking; Driver Duty & Shift Allocation; Trip Dispatch Lifecycle (Scheduled, In-Transit, Completed, Cancelled); Fuel Consumption & Odometer Logging; Preventive Maintenance Scheduling; Secure JWT Session Management; Responsive Analytics Dashboard.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/fleetpulse")
                            .githubFrontendUrl("https://github.com/Amolippar/fleetpulse")
                            .githubBackendUrl("https://github.com/Amolippar/fleetpulse")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/fleetpulse#readme")
                            .imageUrl("https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80")
                            .category("Spring Boot")
                            .isFeatured(true)
                            .displayOrder(1)
                            .build(),

                    // 2. AnnaRestro
                    Project.builder()
                            .slug("annarestro")
                            .title("AnnaRestro – Restaurant Management & Online Ordering")
                            .shortDescription("Full-stack digital dining and restaurant operations platform with QR table menu browsing, interactive multi-item cart, Razorpay payment verification, and real-time kitchen order management.")
                            .fullDescription("AnnaRestro transforms traditional restaurant hospitality by providing a frictionless contactless ordering experience. Customers scan QR codes at tables or browse online to view categorized culinary menus with dietary tags, configure customized order items, and execute secure digital transactions. The kitchen staff and managers access real-time dispatch pipelines to mark prep status and generate analytical revenue reports.")
                            .problemStatement("Conventional restaurant dine-in and takeout processes experience prolonged waiting times during peak hours, outdated printed menus, manual payment collection delays, and inventory reconciliation issues.")
                            .objective("Build an intuitive, high-performance web platform enabling dynamic digital menu exploration, real-time cart state management, tamper-proof payment authorization, and automated order lifecycle tracking.")
                            .challenges("Synchronizing multi-item cart state across client sessions, preventing order race conditions during inventory depletions, and implementing cryptographic signature verification for online payment webhooks.")
                            .solution("Developed an interactive client using React.js, Redux Toolkit, and React Query, backed by Node.js and Express.js REST APIs with MongoDB document stores, integrating Razorpay gateway with SHA256 HMAC signature verification.")
                            .technologies("React.js, Redux Toolkit, Node.js, Express.js, MongoDB, Mongoose, Razorpay API, Tailwind CSS, JWT")
                            .frontendTechStack("React.js 18, Redux Toolkit, React Query, Tailwind CSS, Lucide Icons")
                            .backendTechStack("Node.js, Express.js, JWT, RESTful APIs, Razorpay SDK")
                            .databaseTechStack("MongoDB, Mongoose ODM, Aggregation Pipelines")
                            .tools("Postman, Git, GitHub, VS Code, npm")
                            .responsibilities("Designed intuitive menu browsing and cart management flows; integrated Razorpay payment verification webhook endpoints; built administrative dashboards for menu updates and order status transitions; structured MongoDB schemas with indexed lookup keys.")
                            .architecture("MERN Stack Architecture with decoupled client-server communications. React client manages optimistic UI updates using Redux and TanStack Query, dispatching REST calls to Express routing middleware with JWT validation and Mongoose models writing to MongoDB clusters.")
                            .features("Interactive Food Menu with Category Filters (Veg/Non-Veg, Chef Specials); Dynamic Cart & Real-Time Price Calculation; Secure Checkout with Razorpay Integration; Table QR-Code Direct Ordering; Kitchen Order Ticket (KOT) Management; Order Status Progression (Received, Preparing, Ready, Delivered); Admin Inventory & Revenue Analytics; Customer Order History.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/annarestro")
                            .githubFrontendUrl("https://github.com/Amolippar/annarestro")
                            .githubBackendUrl("https://github.com/Amolippar/annarestro")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/annarestro#readme")
                            .imageUrl("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80")
                            .category("Full Stack")
                            .isFeatured(true)
                            .displayOrder(2)
                            .build(),

                    // 3. CineVault
                    Project.builder()
                            .slug("cinevault")
                            .title("CineVault – Movie & Entertainment Discovery Platform")
                            .shortDescription("Feature-rich entertainment discovery platform offering instant movie searches, genre exploration, trending media carousels, detailed cast telemetry, and personalized watchlist curation.")
                            .fullDescription("CineVault is an entertainment portal designed for film and series enthusiasts. Leveraging external entertainment database APIs (TMDB), it offers cinematic high-definition poster galleries, debounced instant search, YouTube trailer embeds, cast filmographies, and user watchlist persistence across sessions.")
                            .problemStatement("Film enthusiasts struggle with cluttered streaming interfaces, intrusive advertising, and cumbersome search filters when seeking release dates, trailers, and ratings.")
                            .objective("Construct a sleek, dark-themed entertainment catalog application featuring responsive media grids, high-performance search debouncing, modal trailer playback, and local watchlist persistence.")
                            .challenges("Handling high-frequency API rate limits during rapid search typing, responsive image loading across varying network latencies, and cross-browser video modal playback compatibility.")
                            .solution("Implemented debounced search inputs with Axios abort controllers, responsive progressive image rendering, and modular React component structure with Tailwind CSS styling.")
                            .technologies("React.js, Tailwind CSS, TMDB REST API, Axios, Framer Motion, LocalStorage API")
                            .frontendTechStack("React.js, Tailwind CSS, Framer Motion, Lucide Icons, Axios")
                            .backendTechStack("External TMDB API Integration, Node.js proxy utilities")
                            .databaseTechStack("LocalStorage, IndexedDB / Session persistence")
                            .tools("VS Code, Git, GitHub, Vercel")
                            .responsibilities("Created reusable UI components (MovieCard, HeroCarousel, RatingBadge); engineered debounced search hook to prevent extraneous network overhead; integrated YouTube iframe trailer player; structured responsive layout across mobile and desktop breakpoints.")
                            .architecture("Component-driven Single Page Application (SPA) architecture utilizing client-side API consumption, custom caching hooks, and modular UI presentation layers with smooth Framer Motion transitions.")
                            .features("Trending & Top-Rated Media Carousels; Debounced Real-Time Search; Detailed Movie Info (Ratings, Runtime, Cast, Genres); Embedded Official YouTube Trailers; Personal Watchlist with Local Storage Sync; Filter by Genre, Release Year, and Language; Mobile-First Responsive Dark Mode UI.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/cinevault")
                            .githubFrontendUrl("https://github.com/Amolippar/cinevault")
                            .githubBackendUrl("https://github.com/Amolippar/cinevault")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/cinevault#readme")
                            .imageUrl("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80")
                            .category("React")
                            .isFeatured(true)
                            .displayOrder(3)
                            .build(),

                    // 4. StockTrail
                    Project.builder()
                            .slug("stocktrail")
                            .title("StockTrail – Personal Finance & Portfolio Tracker")
                            .shortDescription("Comprehensive financial asset and portfolio tracker enabling investors to log equities, track buy/sell transactions, compute realized/unrealized P&L, and visualize asset allocation.")
                            .fullDescription("StockTrail provides individual investors with clarity over their investment holdings. Designed to centralize stock trades, mutual fund contributions, and cash positions, StockTrail calculates weighted average purchase prices, live profit-and-loss margins, and sector allocation distributions with clear data visualizations.")
                            .problemStatement("Retail investors often maintain fragmented spreadsheets across multiple brokers, leading to inaccurate portfolio valuation, missed dividend records, and convoluted tax calculations.")
                            .objective("Build a centralized web platform for real-time asset monitoring, automated portfolio analytics, transaction history logging, and visual asset allocation breakdowns.")
                            .challenges("Accurately calculating FIFO (First-In, First-Out) capital gains across multiple partial buy/sell transactions and rendering responsive financial charts without performance degradation.")
                            .solution("Designed a modular financial engine with stateful calculation pipelines, interactive Chart.js/Recharts visual components, and clean RESTful backend persistence.")
                            .technologies("React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Recharts, Financial APIs")
                            .frontendTechStack("React.js, Recharts, Tailwind CSS, Lucide Icons")
                            .backendTechStack("Node.js, Express.js, REST APIs, JSON Web Tokens")
                            .databaseTechStack("MongoDB, Mongoose, Timeseries & Transaction Schemas")
                            .tools("VS Code, Git, GitHub, Postman")
                            .responsibilities("Developed portfolio metric calculation utilities (CAGR, total return, daily change); implemented responsive charting with Recharts; built transaction logging forms with currency and date validation; engineered export functionality for CSV tax reports.")
                            .architecture("Client-heavy analytical dashboard architecture. The React layer processes real-time mathematical aggregation for portfolio metrics while communicating with Express backend services for transactional audit records.")
                            .features("Portfolio Overview (Total Value, Net Profit/Loss, Daily Gain); Multi-Asset Transaction Logging (Buy, Sell, Dividend); Interactive Visual Charts (Allocation by Sector & Asset Class); Performance History & Benchmark Comparison; Watchlist for Target Stocks; Responsive Mobile & Desktop Layout; Data Export to CSV.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/stocktrail-main")
                            .githubFrontendUrl("https://github.com/Amolippar/stocktrail-frontend")
                            .githubBackendUrl("https://github.com/Amolippar/stocktrail-backend")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/stocktrail-main#readme")
                            .imageUrl("https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80")
                            .category("Full Stack")
                            .isFeatured(true)
                            .displayOrder(4)
                            .build(),

                    // 5. Instagram Clone
                    Project.builder()
                            .slug("instagram-clone")
                            .title("Instagram Clone – Social Media Platform")
                            .shortDescription("Modern social networking platform replicating core Instagram capabilities, including post publishing with media uploads, interactive likes/comments, follow graphs, and user profiles.")
                            .fullDescription("A full-scale social networking web application engineered to emulate the rich interactivity of modern feed-based social media platforms. Built with React.js on the frontend and Node.js/Express.js on the backend, this platform enables users to create profiles, publish image posts with captions, engage through real-time likes and threaded comments, and follow other creators.")
                            .problemStatement("Developing scalable social media feeds requires mastering complex relational user graphs, secure media upload pipelines, and responsive modal interactions.")
                            .objective("Replicate authentic social media user experience with secure user authentication, responsive feed pagination, real-time engagement triggers, and dynamic profile stats.")
                            .challenges("Implementing optimistic UI updates for likes and comments to achieve zero perceived latency, and managing image upload processing with size optimization.")
                            .solution("Utilized React state with optimistic feedback, built REST APIs with Multer image upload pipeline and Cloudinary integration, and created indexed database schemas for instant feed aggregation.")
                            .technologies("React.js, Node.js, Express.js, MongoDB, Cloudinary, JWT, Tailwind CSS")
                            .frontendTechStack("React.js, Tailwind CSS, Lucide React, Axios")
                            .backendTechStack("Node.js, Express.js, JWT Authentication, Multer, Cloudinary SDK")
                            .databaseTechStack("MongoDB, Mongoose, User & Post Relational Schema")
                            .tools("Git, GitHub, Postman, VS Code")
                            .responsibilities("Created full frontend user interface mimicking modern social feeds; developed authentication system with JWT stored securely in HTTP-only cookies; implemented like/unlike and comment endpoints with instant DOM updates; configured cloud media upload pipeline.")
                            .architecture("Distributed RESTful client-server architecture with decoupled Cloudinary media storage. Client issues authenticated requests carrying JWT tokens; server processes business logic, stores metadata in MongoDB, and serves optimized CDN assets.")
                            .features("User Authentication (Sign up, Log in, Password Hash with Bcrypt); Post Creation with Image Upload & Captions; Interactive Like/Unlike with Heart Animations; Threaded Comments Section; Follow/Unfollow User System; User Profile Page with Post Grid & Follower Counts; Explore Grid for Discovering New Creators; Mobile-Optimized Bottom Navigation.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/instagram-clone")
                            .githubFrontendUrl("https://github.com/Amolippar/instagram-clone-frontend")
                            .githubBackendUrl("https://github.com/Amolippar/instagram-clone-backend")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/instagram-clone#readme")
                            .imageUrl("https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80")
                            .category("Full Stack")
                            .isFeatured(true)
                            .displayOrder(5)
                            .build(),

                    // 6. Manufacturing Work Order
                    Project.builder()
                            .slug("manufacturing-work-orders")
                            .title("Manufacturing Work Order Management System")
                            .shortDescription("Industrial work-order tracking system enabling plant managers, supervisors, and machine operators to coordinate production schedules, monitor stage progress, and log QA inspections.")
                            .fullDescription("Designed to replace paper route sheets and fragmented manufacturing spreadsheets, this enterprise solution tracks assembly work orders throughout their shop-floor lifecycle. Plant managers initiate job cards, supervisors assign machine workstations, and operators update shift progress and report defective part deviations in real-time.")
                            .problemStatement("Shop floor manufacturing operations suffer from lost job sheets, untracked assembly bottlenecks, delayed maintenance escalations, and inconsistent quality compliance logs.")
                            .objective("Deliver an end-to-end digital work order execution platform enforcing workflow state machines, role-specific operational dashboards, and audit-compliant quality control logs.")
                            .challenges("Enforcing strict transition states (Draft → Approved → In Production → QA Inspection → Completed) preventing invalid step skipping, and coordinating relational transactions across multi-machine lines.")
                            .solution("Built a high-reliability Spring Boot backend using Spring Data JPA with transactional rollbacks, Bean Validation, and role-based permissions, paired with an interactive Kanban dashboard in React.")
                            .technologies("Java, Spring Boot, Spring Security, MySQL, Hibernate, React.js, Tailwind CSS, REST APIs")
                            .frontendTechStack("React.js, Tailwind CSS, Lucide Icons, Axios")
                            .backendTechStack("Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate ORM")
                            .databaseTechStack("MySQL 8.0, ACID Transactions, Relational Foreign Keys")
                            .tools("Git, GitHub, Maven, Postman, MySQL Workbench")
                            .responsibilities("Architected the core Spring Boot entity relationships (WorkOrder, LineItem, Machine, QualityLog); implemented state-machine validation guards in the service layer; created role-tailored dashboard views for Admins, Supervisors, and Line Operators; configured comprehensive API unit tests.")
                            .architecture("Enterprise N-Tier Architecture adhering to Separation of Concerns. Controller endpoints delegate to Service orchestration with declarative @Transactional management, persisting through Hibernate JPA to MySQL.")
                            .features("Multi-Role Dashboards (Plant Manager, Line Supervisor, Machine Operator); Work Order Lifecycle State Machine with Audit History; Line Item Bill of Materials (BOM) Tracking; Machine Station Allocation & Downtime Reporting; Quality Assurance (QA) Inspection Sign-Offs; Defect & Deviation Logging; Production Output Analytics; Exportable PDF Inspection Reports.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/manufacturing-workorders")
                            .githubFrontendUrl("https://github.com/Amolippar/manufacturing-workorders-frontend")
                            .githubBackendUrl("https://github.com/Amolippar/manufacturing-workorders")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/manufacturing-workorders#readme")
                            .imageUrl("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80")
                            .category("Spring Boot")
                            .isFeatured(true)
                            .displayOrder(6)
                            .build(),

                    // 7. Student Attendance System
                    Project.builder()
                            .slug("student-attendance-system")
                            .title("Student Attendance & Defaulter Analytics System")
                            .shortDescription("Academic management portal allowing professors to record division-wise lecture attendance with one click, compute cumulative percentages, and flag attendance defaulters for timely intervention.")
                            .fullDescription("A web application tailored for colleges and academic departments to eliminate paperwork and proxy attendance. Faculty members can select academic divisions, load student rosters, and mark attendance status in bulk. The system calculates running attendance percentages, auto-highlights students dropping below the 75% regulatory threshold, and exports compliance reports.")
                            .problemStatement("Paper attendance rosters are prone to proxy marking, manual calculation inaccuracies, delayed parent notifications, and onerous administrative tallying during semester exams.")
                            .objective("Provide faculty with a seamless 10-second roll-call marking experience, instant defaulter identification, and automated monthly attendance distribution analytics.")
                            .challenges("Handling high-volume batch attendance updates during simultaneous 10-minute lecture transition periods without database lockups.")
                            .solution("Designed batch upsert APIs in Express with MongoDB bulkWrite operations, reducing database I/O by 85%, and built an intuitive quick-toggle student roster grid in React.")
                            .technologies("React.js, Node.js, Express.js, MongoDB, Mongoose, Tailwind CSS")
                            .frontendTechStack("React.js, Tailwind CSS, Lucide Icons, Axios")
                            .backendTechStack("Node.js, Express.js, REST APIs, JWT")
                            .databaseTechStack("MongoDB, Mongoose, Compound Indexes on Student & Date")
                            .tools("Git, GitHub, Postman, VS Code")
                            .responsibilities("Implemented batch attendance logging endpoints using MongoDB bulk operations; built interactive student roster cards with quick Absent/Present/Late toggles; developed analytics charts for departmental attendance distributions; configured CSV and PDF export routines for semester compliance.")
                            .architecture("Scalable MERN Architecture featuring bulk database operations, token-based faculty authentication, and a lightweight responsive mobile UI for classroom use.")
                            .features("Division, Subject, and Batch Roster Filtering; Rapid Single-Click & Bulk Attendance Marking; Automatic Defaulter Identification (< 75% Flagging); Student Profile Attendance History & Leave Logging; Teacher & Administrator Role Views; Semester-End Attendance Analytics; CSV & Excel Export for University Audits.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/student-attendance")
                            .githubFrontendUrl("https://github.com/Amolippar/student-attendance-frontend")
                            .githubBackendUrl("https://github.com/Amolippar/student-attendance-backend")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/student-attendance#readme")
                            .imageUrl("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80")
                            .category("Full Stack")
                            .isFeatured(false)
                            .displayOrder(7)
                            .build(),

                    // 8. Predictive Analytics Platform
                    Project.builder()
                            .slug("predictive-analytics")
                            .title("Predictive Analytics & ML Dashboard")
                            .shortDescription("Data analysis and machine learning platform featuring automated regression forecasting, correlation matrix visualization, CSV dataset ingestion, and interactive model parameter tuning.")
                            .fullDescription("A modern analytics dashboard created to bridge raw numerical datasets with predictive machine learning insights. Users can upload structured CSV datasets, preview automated statistical distributions, configure regression and classification model hyper-parameters, and view real-time accuracy metrics and interactive forecast charts.")
                            .problemStatement("Business analysts and researchers often find Python command-line ML scripts inaccessible and lack intuitive visual tools to experiment with model inputs.")
                            .objective("Provide an accessible web-based workbench where users can ingest datasets, clean missing attributes, train predictive models, and inspect visual evaluation curves.")
                            .challenges("Managing asynchronous model training cycles without blocking UI threads, and serializing complex high-dimensional statistical arrays for web visualization.")
                            .solution("Created Python/Flask microservice workers executing scikit-learn training pipelines, coupled with React charting components rendering ROC curves, confusion matrices, and forecast trajectories.")
                            .technologies("Python, Flask, scikit-learn, Pandas, NumPy, React.js, Tailwind CSS, Recharts")
                            .frontendTechStack("React.js, Tailwind CSS, Recharts, Lucide Icons")
                            .backendTechStack("Python 3.10+, Flask, scikit-learn, Pandas, NumPy")
                            .databaseTechStack("SQLite / PostgreSQL for experiment tracking")
                            .tools("VS Code, Git, GitHub, Jupyter Notebooks")
                            .responsibilities("Developed Flask API endpoints for asynchronous ML model training and evaluation; engineered dataset upload and automated statistical summary pipelines; implemented interactive visual charting for residuals and decision boundaries; created model comparison benchmarking tables.")
                            .architecture("Decoupled Service Architecture. The React frontend interacts with a Python/Flask REST service that delegates model fitting routines to scikit-learn and returns serialized JSON analytics.")
                            .features("CSV Dataset Ingestion & Automated Schema Inspection; Statistical Summary (Mean, Median, Standard Deviation, Skew); Predictive Regression & Classification Model Training; Model Hyperparameter Slider Adjustments; Interactive Confusion Matrix & ROC Curve Graphs; Feature Importance Ranking; Exportable Trained Model Artifacts.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/predictive-analytics")
                            .githubFrontendUrl("https://github.com/Amolippar/predictive-analytics-frontend")
                            .githubBackendUrl("https://github.com/Amolippar/predictive-analytics-backend")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/predictive-analytics#readme")
                            .imageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80")
                            .category("Machine Learning")
                            .isFeatured(false)
                            .displayOrder(8)
                            .build(),

                    // 9. Salesforce Validation Switcher
                    Project.builder()
                            .slug("salesforce-validation-switcher")
                            .title("Salesforce Validation & Trigger Bypass Switcher")
                            .shortDescription("Developer and administrator utility enabling granular, user-level or profile-level activation and deactivation of Salesforce validation rules, triggers, and workflow flows during data migrations.")
                            .fullDescription("Enterprise data migrations and batch ETL jobs in Salesforce often trigger hundreds of validation rules and automation flows, resulting in sluggish throughput or fatal bulk load failures. This utility provides Salesforce developers and admins with a unified control switch using Custom Metadata Types and Hierarchical Custom Settings, allowing instant automation bypasses without deploying code.")
                            .problemStatement("Deploying metadata changes to disable validation rules during bulk data operations risks human error, violates SOX audit trails, and requires long deploy times in production orgs.")
                            .objective("Provide a safe, zero-deployment bypass architecture that allows designated integration users to suppress specific triggers and validation logic during migration windows.")
                            .challenges("Maintaining apex governor limit safety, ensuring zero execution overhead during normal production operations, and preventing accidental global bypasses.")
                            .solution("Architected Apex helper handlers reading cached Custom Metadata Types and Hierarchical Settings, backed by an intuitive Lightning Web Component (LWC) administrative toggle console.")
                            .technologies("Salesforce, Apex, Lightning Web Components (LWC), SOQL, Custom Metadata Types")
                            .frontendTechStack("Lightning Web Components (LWC), SLDS (Salesforce Lightning Design System)")
                            .backendTechStack("Apex, Trigger Framework (Trigger Handler Pattern), SOQL, Metadata API")
                            .databaseTechStack("Salesforce Database, Custom Metadata, Custom Settings")
                            .tools("VS Code with Salesforce Extension Pack, Salesforce CLI (sf / sfdx), Git")
                            .responsibilities("Designed the Apex Trigger Handler bypass architecture; implemented SOQL query optimization leveraging cached metadata; built the LWC administrative switchboard UI for one-click profile toggling; wrote 95%+ code coverage unit test classes covering positive and negative bypass scenarios.")
                            .architecture("Native Salesforce MVC Architecture adhering to Enterprise Trigger Framework patterns. Triggers invoke unified TriggerHandler instances that evaluate cached bypass metadata before dispatching execution to service classes.")
                            .features("Granular Trigger & Validation Rule Bypassing; Hierarchical Profile-Level & User-Level Overrides; Zero Deployment Downtime for Bulk Data Loads; Comprehensive Audit Trail & Execution Logging; Integration with Apex Batch and Queueable Jobs; 95%+ Apex Unit Test Coverage; Lightning App Builder Compatible.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/sf-validation-manager")
                            .githubFrontendUrl("https://github.com/Amolippar/sf-validation-manager")
                            .githubBackendUrl("https://github.com/Amolippar/sf-validation-manager")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/sf-validation-manager#readme")
                            .imageUrl("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80")
                            .category("Salesforce")
                            .isFeatured(false)
                            .displayOrder(9)
                            .build(),

                    // 10. Developer Portfolio
                    Project.builder()
                            .slug("developer-portfolio")
                            .title("Amol Ippar – Full-Stack Developer Portfolio")
                            .shortDescription("Modern, production-grade developer portfolio built with React.js, Tailwind CSS, and Java Spring Boot REST backend featuring role-tailored resume downloads, live project explorers, and contact management.")
                            .fullDescription("A high-performance personal portfolio website crafted to showcase Amol Ippar's software engineering capabilities. Designed with modern aesthetics, fluid micro-interactions, and accessible typography, the website features a complete Spring Boot REST backend with MySQL persistence, dedicated project deep-dives with slug-based routing, role-specific career resume previews, and interactive inquiry forms.")
                            .problemStatement("Developer portfolios often rely on static, generic templates lacking real full-stack architecture, backend database integration, or deep technical project breakdown sections.")
                            .objective("Build a robust, responsive personal website that exemplifies professional full-stack development, seamless client-server API communication, and exceptional UI/UX standards.")
                            .challenges("Achieving zero-flicker client-side routing with fallback data resilience, maintaining clean separation between Spring Boot API services and Vite React client, and structuring clean SEO-friendly slug routes.")
                            .solution("Built a layered Spring Boot backend with JPA repositories and Bean Validation, integrated with a React Vite application utilizing Tailwind CSS, Lucide icons, Framer Motion animations, and Axios interceptors.")
                            .technologies("Java, Spring Boot, MySQL, React.js, Tailwind CSS, Vite, Framer Motion, Axios, REST APIs")
                            .frontendTechStack("React.js 18, Vite, Tailwind CSS, Lucide React, React Router DOM, Framer Motion")
                            .backendTechStack("Java, Spring Boot 3, Spring Data JPA, Hibernate, Bean Validation")
                            .databaseTechStack("MySQL 8.0, Normalized Schema, JPA Entity Mappings")
                            .tools("VS Code, Git, GitHub, Maven, Postman")
                            .responsibilities("Designed the modern dark-themed responsive UI; developed Spring Boot REST endpoints with comprehensive CRUD capabilities; implemented dedicated project detail views and resume preview modals; configured CORS security and error boundary handlers.")
                            .architecture("Modern Decoupled Full-Stack Architecture. Frontend React SPA handles routing and state, communicating with Spring Boot REST API endpoints, supported by resilient client-side fallback data structures.")
                            .features("Dedicated Slug-Based Project Detail Pages; Role-Specific Career Resume Previews & Downloads (Full Stack, Java Backend, QA, ML, Salesforce); Contact Message Submission with Backend Persistence; Filterable Project Showcase by Technology Domain; Education & Academic Achievements Section; Comprehensive Interactive Skills Directory; Modern Dark Mode Aesthetic with Fluid Transitions.")
                            .status("Completed")
                            .githubUrl("https://github.com/Amolippar/Portfolio")
                            .githubFrontendUrl("https://github.com/Amolippar/portfolio-frontend")
                            .githubBackendUrl("https://github.com/Amolippar/portfolio-backend")
                            .liveDemoUrl(null)
                            .documentationUrl("https://github.com/Amolippar/Portfolio#readme")
                            .imageUrl("https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80")
                            .category("Full Stack")
                            .isFeatured(true)
                            .displayOrder(10)
                            .build()
            );

            projectRepository.saveAll(projects);
            log.info("Projects seed data populated with 10 exact verified projects and slugs!");
        }
    }
}
