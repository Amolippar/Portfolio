# Amol Ippar — Full Stack Developer Portfolio & Management System

> **A modern, responsive, production-ready developer portfolio website with a React.js frontend, Spring Boot backend, MySQL database, and secure JWT-authenticated admin console.**

![Portfolio Banner](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Overview

This portfolio website was designed specifically for **Amol Ippar**, Full Stack Developer specializing in **React.js, Java, Spring Boot, MySQL, and modern RESTful web applications**. 

Unlike a static template, this is a **true full-stack web application**:
1. **Frontend**: Built with **React 18, Vite, Tailwind CSS, Framer Motion, and Lucide React**. Includes Dark/Light theme switching, vertical interactive timeline, live search and tech-stack filtering, project detail modals, and an interactive contact form.
2. **Backend**: Built with **Java 17+, Spring Boot 3, Spring Data JPA, Spring Security 6, and JWT**. Provides a robust layered architecture (Controller → Service → Repository → Entity) with full DTO mapping, Bean Validation, and a `@RestControllerAdvice` global exception handler.
3. **Database**: **MySQL 8.0** with automatic schema updates, database seeding on initial boot (Admin user, Profile, 3 Education milestones, 32 categorized Skills, 10 detailed Projects), and persistence for contact messages.
4. **Admin Console**: Protected admin dashboard at `/admin/dashboard` allowing full **CRUD** management (Projects, Skills, Education, Profile, Contact Message Inbox with unread counts).

---

## 🚀 Key Features

### 👤 Public Portfolio
- **Modern Hero Section**: Name, professional title, recruiter-tailored introduction, glowing circular profile avatar, floating tech pills, quick social links (GitHub, LinkedIn, Email), and direct CTAs.
- **About Me Section**: Comprehensive, recruiter-friendly summary highlighting engineering background (BE in Information Technology from SPPU, Dec 2024), core competencies, and problem-solving mindset.
- **Quick Statistics Cards**: Experience ("Fresher"), Projects ("10+"), Technologies ("15+"), and Education ("BE - Information Technology").
- **Interactive Education Timeline**: Dedicated `/education` vertical timeline with milestones (BE IT 2024, HSC Science 2020, SSC 2018), degree institution badges, and animated nodes.
- **Categorized Skills Matrix**: Dedicated `/skills` page with 6 categories (*Frontend, Backend, Database, Tools, Testing, Other*), realistic proficiency badges (*Beginner, Intermediate, Good, Strong* — no unrealistic inflated percentages!), and instant search.
- **10 Detailed Projects with Modal Drill-down**: Dedicated `/projects` page featuring:
  1. **AnnaRestro** (React.js, Node.js, Express.js, MongoDB, Redux, React Query, JWT, Razorpay)
  2. **FleetPulse** (React.js, Spring Boot, MySQL, Spring Security, JWT)
  3. **Manufacturing Work Order Management System** (React.js, Spring Boot, SQL, REST API)
  4. **Student Attendance System** (React.js, Node.js, Express.js, MongoDB)
  5. **E-Commerce Website** (HTML, CSS, JavaScript, React.js)
  6. **Task Management Application** (React.js, Node.js, Express.js, MongoDB)
  7. **Employee Management System** (React.js, Spring Boot, MySQL)
  8. **Expense Tracker** (HTML, CSS, JavaScript, React.js)
  9. **Weather Application** (HTML, CSS, JavaScript, React.js, REST API)
  10. **UI/UX Developer Dashboard** (HTML, CSS, JavaScript, React.js, Tailwind CSS)
  - Technology filter tags (*All, HTML/CSS, JavaScript, React, Node.js, Spring Boot, SQL, UI/UX*).
  - Search by project keyword.
  - "View Details" modal containing Problem Statement, Objectives, Key Features checklist, Technical Challenges & Implemented Solutions, Code repo, and Live Demo links.
- **Interactive Contact Form**: Direct REST submission to Spring Boot (`POST /api/contact`) saved into MySQL table `contact_messages` with field validation and toast notifications.
- **Resume Preview & Download**: In-browser printable resume modal and direct `/resume.pdf` download trigger.
- **Dark / Light Theme Toggle**: Persistent mode stored in `localStorage`.
- **Fully Responsive**: Mobile hamburger drawer, fluid flex/grid layouts with zero horizontal scrolling tested across desktop, tablet, and smartphone screens.

### 🔐 Admin Management Console
- **Secure Authentication**: Spring Security + BCrypt password hashing + stateless JWT token authorization.
- **Dashboard Statistics Bar**: Real-time counts of Total Projects, Skills, Education records, and unread contact messages.
- **Projects CRUD**: Create, edit, and delete projects with detailed objectives, challenges, solutions, and featured toggles.
- **Skills CRUD**: Add, edit, and remove skills with proficiency level and display order.
- **Education CRUD**: Add, edit, and delete academic milestones.
- **Profile Management**: Live updating of bio, title, contact information, social links, and statistic indicators.
- **Message Center**: Review contact submissions, mark as read, launch email replies, and delete resolved inquiries.

---

## 🛠 Technology Stack

### Frontend (`portfolio-frontend`)
| Technology | Description |
|---|---|
| **React 18** | Functional components with Hooks |
| **Vite** | Next-generation frontend tooling and bundler |
| **Tailwind CSS** | Utility-first responsive styling and dark mode |
| **React Router DOM 6** | Declarative client-side routing & route guards |
| **Axios** | Centralized REST client with JWT request interceptors |
| **Framer Motion** | Fluid animations and page transitions |
| **Lucide React** | Modern iconography |

### Backend (`portfolio-backend`)
| Technology | Description |
|---|---|
| **Java 17 / 21 / 25** | Robust enterprise programming language |
| **Spring Boot 3.3.4** | Standalone production-grade Spring application |
| **Spring Web** | RESTful endpoints and JSON serialization |
| **Spring Data JPA & Hibernate** | Relational data persistence and ORM queries |
| **Spring Security 6** | Role-based authorization and stateless security filter chain |
| **JJWT 0.12.6** | JSON Web Token creation, claims extraction & verification |
| **Bean Validation** | Declarative `@Valid`, `@NotBlank`, `@Email` validation |
| **MySQL 8.0** | Relational ACID database |
| **Maven 3.9+** | Build automation and dependency management |

---

## 📂 Project Structure

```
Porttfolio/
├── README.md                           # Main project documentation
│
├── portfolio-backend/                  # Spring Boot REST API
│   ├── pom.xml                         # Maven dependencies & build plugins
│   ├── .env.example                    # Backend environment template
│   └── src/
│       ├── main/
│       │   ├── java/com/portfolio/
│       │   │   ├── PortfolioBackendApplication.java
│       │   │   ├── config/             # CorsConfig, DatabaseSeeder
│       │   │   ├── controller/         # Auth, Profile, Education, Skill, Project, Contact
│       │   │   ├── dto/                # Request & Response DTOs
│       │   │   ├── entity/             # User, Profile, Education, Skill, Project, ContactMessage
│       │   │   ├── exception/          # GlobalExceptionHandler, Custom exceptions
│       │   │   ├── repository/         # Spring Data JPA Repositories
│       │   │   ├── security/           # JwtTokenProvider, Filter, SecurityConfig
│       │   │   └── service/            # Business logic implementations
│       │   └── resources/
│       │       └── application.properties
│
└── portfolio-frontend/                 # React.js Vite Single Page Application
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env                            # Active frontend environment
    ├── .env.example
    ├── public/
    │   └── resume.pdf                  # Downloadable resume placeholder
    └── src/
        ├── App.jsx                     # Route definitions & layout wrapper
        ├── main.jsx                    # Application entry point
        ├── index.css                   # Tailwind directives & glassmorphism styles
        ├── components/                 # Navbar, Footer, ProjectModal, ResumeModal, Toast, Icons
        ├── context/                    # ThemeContext (Dark/Light), AuthContext (JWT state)
        ├── pages/                      # Home, Education, Skills, Projects, Contact, AdminLogin, AdminDashboard
        ├── services/                   # api.js centralized Axios client
        └── utils/                      # initialData.js fallback seeds
```

---

## ⚙️ Prerequisites

Before running the application locally, ensure you have:
1. **Java JDK 17+** (JDK 17, JDK 21, or JDK 25)
2. **Node.js 18+** & **npm 9+**
3. **Apache Maven 3.8+**
4. **MySQL Server 8.0+** running locally on port `3306`

---

## 🗄 Database Configuration

1. Log into your MySQL console:
   ```bash
   mysql -u root -p
   ```
2. Create the portfolio database (if not created):
   ```sql
   CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. The Spring Boot backend automatically runs schema migrations (`ddl-auto=update`) and initializes all seed data on its very first launch.

---

## 🔑 Environment Configuration

### Backend (`portfolio-backend/.env` or system environment variables)
```env
# Server Port
PORT=8080

# Database Configuration
DB_URL=jdbc:mysql://localhost:3306/portfolio_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=1234

# JWT Security
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
JWT_EXPIRATION_MS=86400000

# CORS Allowed Origins
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (`portfolio-frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🏃 How to Run the Application

### 1. Start the Spring Boot Backend
Open a terminal in `portfolio-backend/`:
```bash
# If JAVA_HOME is needed on Windows:
# $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot"

# Run with Maven:
mvn clean spring-boot:run

# Or run the pre-built standalone JAR:
java -jar target/portfolio-backend-1.0.0.jar
```
The backend starts at: **`http://localhost:8080`**  
On initial boot, the `DatabaseSeeder` automatically registers the default admin and all 10 portfolio projects.

### 2. Start the React Frontend
Open another terminal in `portfolio-frontend/`:
```bash
npm install
npm run dev
```
The frontend starts at: **`http://localhost:5173`**

---

## 🛡 Admin Login Credentials

To access the Admin Management Console:
- Navigate to: **`http://localhost:5173/admin/login`**
- **Username**: `admin`
- **Password**: `admin123`

Once logged in, the application stores the JWT token securely in `localStorage` and redirects to `/admin/dashboard`.

---

## 📡 REST API Documentation

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profile` | Retrieve profile information, bio & stats |
| `GET` | `/api/education` | Retrieve all education milestones |
| `GET` | `/api/skills` | Retrieve all technical skills |
| `GET` | `/api/projects` | Retrieve all 10 portfolio projects |
| `GET` | `/api/projects/featured` | Retrieve featured projects |
| `GET` | `/api/projects/{id}` | Retrieve individual project details |
| `POST` | `/api/contact` | Submit contact form message into MySQL |
| `POST` | `/api/auth/login` | Authenticate admin & receive JWT token |

### Protected Endpoints (`Authorization: Bearer <token>` required)
| Method | Endpoint | Description |
|---|---|---|
| `PUT` | `/api/profile` | Update profile bio, title, links, stats |
| `POST` | `/api/education` | Create education record |
| `PUT` | `/api/education/{id}` | Update education record |
| `DELETE` | `/api/education/{id}` | Delete education record |
| `POST` | `/api/skills` | Create skill |
| `PUT` | `/api/skills/{id}` | Update skill |
| `DELETE` | `/api/skills/{id}` | Delete skill |
| `POST` | `/api/projects` | Create portfolio project |
| `PUT` | `/api/projects/{id}` | Update portfolio project |
| `DELETE` | `/api/projects/{id}` | Delete portfolio project |
| `GET` | `/api/contact` | View all contact messages |
| `DELETE` | `/api/contact/{id}` | Delete contact message |
| `PATCH` | `/api/contact/{id}/read` | Mark message as read |
| `GET` | `/api/contact/stats` | Retrieve admin dashboard metrics |

---

## 🌐 Production Deployment Guide

The portfolio is architected for zero-downtime, independent deployment of the React frontend, Spring Boot backend, and cloud MySQL database.

---

### Option 1: Vercel (Frontend) + Render / Railway (Backend & MySQL) [Recommended & Free]

#### Step 1: Deploy React Frontend to Vercel
1. Log in to **[Vercel](https://vercel.com/)** using your GitHub account.
2. Click **"Add New"** → **"Project"**.
3. Import your repository: **`Amolippar/Portfolio`**.
4. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `portfolio-frontend` (Click Edit and select `portfolio-frontend`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://your-backend-app.onrender.com/api` *(You can update this after deploying the backend; during initial build, fallback mode will seamlessly display all portfolio data).*
6. Click **Deploy**. Your portfolio will be live at `https://portfolio-<username>.vercel.app`!

#### Step 2: Set Up Free Cloud MySQL
Choose either of these 100% free cloud MySQL providers:
- **[Aiven for MySQL](https://aiven.io/)** (Free tier: 5GB, 1 CPU, 1GB RAM, always free)
- **[TiDB Cloud Serverless](https://tidbcloud.com/)** (Free tier: 25GB, MySQL compatible)
- **[Railway](https://railway.app/)** (One-click MySQL provision)

Copy your MySQL connection details: Host, Port, Database (`portfolio_db`), Username, and Password.

#### Step 3: Deploy Spring Boot Backend to Render
1. Log in to **[Render](https://render.com/)** using GitHub.
2. Click **"New +"** → **"Web Service"**.
3. Connect your repository **`Amolippar/Portfolio`**.
4. Configure Web Service:
   - **Name**: `amol-portfolio-backend`
   - **Language**: `Docker`
   - **Root Directory**: `portfolio-backend`
   - **Dockerfile Path**: `Dockerfile`
   - **Instance Type**: `Free`
5. Under **Environment Variables**, set:
   - `PORT`: `8080`
   - `DB_URL`: `jdbc:mysql://<your-db-host>:<port>/portfolio_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true`
   - `DB_USERNAME`: `<your-db-user>`
   - `DB_PASSWORD`: `<your-db-password>`
   - `JWT_SECRET`: `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970`
   - `CORS_ALLOWED_ORIGINS`: `https://*.vercel.app,http://localhost:5173`
6. Click **Create Web Service**. Spring Boot will build, initialize MySQL tables, seed all 10 projects, skills, education milestones, and expose the REST endpoints at your Render URL!

---

### Option 2: Full-Stack Deployment with Docker Compose
For running locally or on any cloud VPS (DigitalOcean, AWS EC2, Linode, Hetzner):
```bash
git clone https://github.com/Amolippar/Portfolio.git
cd Portfolio
docker compose up -d --build
```
This automatically boots:
- MySQL 8.0 on port `3306` with persistent volume `mysql_data`
- Spring Boot 3 on port `8080` with automatic DB migrations & seeding
- React SPA served via optimized Nginx on port `80` (with SPA routing and caching)

---

### Option 3: Manual Production Builds

#### Frontend Build
```bash
cd portfolio-frontend
npm install
npm run build
# Production artifacts in dist/
```

#### Backend Build
```bash
cd portfolio-backend
mvn clean package -DskipTests
# Executable standalone JAR in target/portfolio-backend-1.0.0.jar
java -jar target/portfolio-backend-1.0.0.jar
```

---

### 🔑 Environment Variables Reference

| Variable | Target | Description | Example / Default |
|---|---|---|---|
| `VITE_API_BASE_URL` | Frontend | Spring Boot REST API base URL | `https://api.yourdomain.com/api` |
| `PORT` | Backend | HTTP port for Spring Boot server | `8080` |
| `DB_URL` | Backend | JDBC URL for MySQL database | `jdbc:mysql://host:3306/portfolio_db` |
| `DB_USERNAME` | Backend | MySQL database username | `root` |
| `DB_PASSWORD` | Backend | MySQL database password | `password` |
| `JWT_SECRET` | Backend | 256-bit secret key for signing JWTs | Base64 / Hex 32-byte key |
| `CORS_ALLOWED_ORIGINS` | Backend | Comma-separated allowed frontend domains | `https://*.vercel.app,http://localhost:5173` |

---

## ❓ Troubleshooting

1. **MySQL Access Denied (Error 1045)**:
   - Verify `DB_USERNAME` and `DB_PASSWORD` in `portfolio-backend/src/main/resources/application.properties`.
2. **CORS Errors**:
   - Verify that your frontend origin (`http://localhost:5173`) is listed in `CORS_ALLOWED_ORIGINS` in `application.properties`.
3. **Offline / Fallback Mode**:
   - The React frontend includes built-in fallback initial data in `src/utils/initialData.js`. If the backend is temporarily offline, the frontend gracefully displays the content rather than crashing.

---

## 📄 License & Credits

- Designed and Developed for **Amol Ippar** — Full Stack Developer.
- Copyright © 2026 Amol Ippar. All Rights Reserved.
