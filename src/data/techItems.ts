export interface Tech {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'database';
  level: number; // percentage
  description: string;
  projectsUsed: string[];
}

export const TECH_ITEMS: Tech[] = [
  // --- LANGUAGES & ENTERPRISE BACKEND ---
  {
    name: "Java & Spring Boot",
    category: "backend",
    level: 90,
    description: "Enterprise Java web application development, Spring MVC, REST APIs, Dependency Injection, and JPA/Hibernate ORM.",
    projectsUsed: ["academic-projects", "portfolio-ide"]
  },
  {
    name: "Spring Security & JWT",
    category: "backend",
    level: 88,
    description: "Stateless security architectures, JSON Web Tokens (JWT), role-based access control (RBAC), and authentication filters.",
    projectsUsed: ["academic-projects"]
  },
  {
    name: "TypeScript & JavaScript",
    category: "frontend",
    level: 95,
    description: "Strict typing, OOP/Functional patterns, ESNext syntax, full-stack web and mobile application development.",
    projectsUsed: ["isitcheatingif.com", "portfolio-ide", "burgerschat"]
  },
  {
    name: "React & Next.js",
    category: "frontend",
    level: 92,
    description: "Component lifecycle, SSR/SSG rendering, hydration optimization, custom hooks, and dynamic routing.",
    projectsUsed: ["isitcheatingif.com", "portfolio-ide"]
  },
  {
    name: "React Native & Mobile",
    category: "frontend",
    level: 85,
    description: "Cross-platform mobile application development for Android and iOS using React Native and Kotlin modules.",
    projectsUsed: ["academic-projects"]
  },
  {
    name: "Python & FastAPI",
    category: "backend",
    level: 88,
    description: "Backend microservices, AI prompt integrations, async endpoints, and programmatic data automation pipelines.",
    projectsUsed: ["burgerschat", "portfolio-ide"]
  },
  {
    name: "PHP & Kotlin",
    category: "backend",
    level: 82,
    description: "Server-side scripting, object-oriented PHP web tools, and native Android application logic in Kotlin.",
    projectsUsed: ["academic-projects"]
  },

  // --- CLOUD & INFRASTRUCTURE ---
  {
    name: "Google Cloud Platform (GCP)",
    category: "backend",
    level: 92,
    description: "Expert-level cloud platform navigation, project configuration, serverless deployments, storage buckets, and IAM.",
    projectsUsed: ["isitcheatingif.com", "portfolio-ide"]
  },
  {
    name: "Oracle Cloud (OCI) & Networking",
    category: "backend",
    level: 88,
    description: "VM instance provisioning, security list ingress/egress rules, custom port mapping, VCN virtual network routing.",
    projectsUsed: ["academic-projects", "portfolio-ide"]
  },
  {
    name: "Domain Management & DNS Config",
    category: "backend",
    level: 90,
    description: "DNS record management (A, CNAME, TXT, MX), nameserver delegation, SSL certificate provisioning, and domain routing.",
    projectsUsed: ["isitcheatingif.com", "isitstudios.com", "portfolio-ide"]
  },
  {
    name: "Docker & Linux Administration",
    category: "backend",
    level: 86,
    description: "Containerizing microservices with Dockerfiles, compose multi-container orchestration, and Unix server admin.",
    projectsUsed: ["academic-projects", "portfolio-ide"]
  },

  // --- DATABASES & STORAGE ---
  {
    name: "Relational SQL (MySQL & SQLite)",
    category: "database",
    level: 90,
    description: "Relational database modeling, query tuning, transaction isolation, ERD normalization, and SQLite embed structures.",
    projectsUsed: ["academic-projects", "isitcheatingif.com"]
  },
  {
    name: "MongoDB & Firebase",
    category: "database",
    level: 86,
    description: "NoSQL document collections, real-time database syncing, authentication rules, and backend-as-a-service hooks.",
    projectsUsed: ["academic-projects", "burgerschat"]
  },
  {
    name: "Git, CI/CD & Postman",
    category: "backend",
    level: 92,
    description: "Git branching workflows, GitHub Actions CI/CD pipelines, automated testing, Postman API collections, and JUnit testing.",
    projectsUsed: ["isitcheatingif.com", "portfolio-ide"]
  },
  {
    name: "Google Gemini API & AI Tools",
    category: "ai",
    level: 85,
    description: "Prompt engineering, structured output validation, LLM orchestration, and AI-driven feature integration.",
    projectsUsed: ["isitcheatingif.com", "burgerschat"]
  }
];
