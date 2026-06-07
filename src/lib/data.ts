import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Code2,
  Database,
  Cloud,
  Cpu,
  LineChart,
  Boxes,
  Globe,
  GraduationCap,
  Briefcase,
  Trophy,
  Award,
  Server,
} from "lucide-react";

export const personal = {
  name: "Sohan D Souza",
  firstName: "Sohan",
  title: "Software Engineer | AI/ML Engineer | Data Enginer",
  roles: [
    "AI/ML Engineer",
    "Data Scientist",
    "Salesforce Developer",
    "Full Stack Developer",
    "Problem Solver",
  ],
  intro:
    "BE graduate in Computer Science & Business Systems from St Joseph Engineering College, Mangaluru. I design and ship production-ready systems that bridge intelligent technology with real-world business impact and I'm actively seeking roles in AI/ML and software development.",
  location: "Mangaluru, Karnataka, India",
  email: "sohandsouza15@gmail.com",
  phone: "+91 6362055398",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/Sohan-dsz",
    linkedin: "https://www.linkedin.com/in/sohan1919",
    email: "mailto:sohandsouza15@gmail.com",
  },
};

export const about = {
  summary:
    "Results-driven Software Engineer with proven experience designing and deploying AI-powered, full-stack systems using LLMs, RAG pipelines, and multimodal AI. Proficient in Python, React, Django, PyTorch, and TensorFlow, with hands-on exposure to agentic AI workflows, OCR-based document intelligence, and speech-to-text pipelines using Whisper. Experienced with containerized deployments via Docker and cloud platforms including Oracle Cloud Infrastructure (OCI). Certified in OCI Generative AI and Salesforce Agentforce, with a strong grasp of prompt engineering and AI application integration. Demonstrated leader — captained a 30+ member team to AIR 3 nationally at BAJA SAEINDIA 2026. Passionate about building intelligent, production-ready solutions at the intersection of AI and software engineering.",
  objective:
   "Computer Science engineer with hands-on experience in LLM-integrated applications, RAG pipelines, and multimodal AI systems — backed by full-stack proficiency in Python, React, Django, and Docker. Certified in OCI Generative AI and Salesforce Agentforce, with applied exposure to prompt engineering, agentic workflows, and cloud-native deployments. Seeking a role to engineer scalable, production-ready AI solutions that drive measurable business impact.",  interests: [
  "LLM Integration & Prompt Engineering",
  "Generative AI & Multimodal Systems",
  "RAG Pipelines & Document Intelligence",
  "Agentic AI & Workflow Automation",
  "Computer Vision & OCR",
  "Full-Stack Engineering",
  "MLOps & Cloud-Native Deployments",
  "Salesforce & CRM Automation",
],
};

export type Skill = { name: string; level: number };
export type SkillCategory = {
  category: string;
  icon: LucideIcon;
  accent: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon: Code2,
    accent: "from-neon-blue to-neon-cyan",
    skills: [
      { name: "Java", level: 88 },
      { name: "Python", level: 85 },
      { name: "SQL", level: 85 },
      { name: "JavaScript / TypeScript", level: 80 },
      
      { name: "C++", level: 75 },
    ],
  },
  {
    category: "AI / ML Engineering",
    icon: Brain,
    accent: "from-neon-purple to-neon-pink",
    skills: [
      { name: "PyTorch", level: 86 },
      { name: "TensorFlow / Keras", level: 84 },
      { name: "Scikit-Learn", level: 88 },
      { name: "Hugging Face Transformers", level: 82 },
      { name: "LLMs, RAG & LangChain", level: 84 },
      { name: "NLP & Computer Vision", level: 83 },
    ],
  },
  {
    category: "Data Science & Analytics",
    icon: LineChart,
    accent: "from-neon-cyan to-neon-blue",
    skills: [
      { name: "Pandas & NumPy", level: 90 },
      { name: "Matplotlib / Seaborn", level: 84 },
      { name: "Statistics & EDA", level: 82 },
      { name: "Power BI", level: 80 },
      { name: "Jupyter / Colab", level: 88 },
    ],
  },
  {
    category: "MLOps & Cloud",
    icon: Server,
    accent: "from-neon-cyan to-neon-purple",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Git & GitHub", level: 88 },
      { name: "FastAPI & REST APIs", level: 84 },
      { name: "AWS / Oracle Cloud (OCI)", level: 78 },
      { name: "CI/CD & Linux", level: 78 },
    ],
  },
  {
    category: "Full-Stack Web",
    icon: Globe,
    accent: "from-neon-blue to-neon-violet",
    skills: [
      { name: "React & Next.js", level: 86 },
      { name: "Node.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "TypeScript", level: 82 },
    ],
  },
  {
    category: "Salesforce",
    icon: Cloud,
    accent: "from-neon-violet to-neon-cyan",
    skills: [
      { name: "Apex", level: 80 },
      { name: "Lightning Web Components", level: 82 },
      { name: "Flow Builder", level: 86 },
      { name: "SOQL / SOSL", level: 82 },
      { name: "Sales & Service Cloud", level: 78 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    accent: "from-neon-pink to-neon-purple",
    skills: [
      { name: "MySQL / PostgreSQL", level: 84 },
      { name: "MongoDB", level: 80 },
      { name: "Vector DBs", level: 76 },
    ],
  },
];

export type ProjectCategory =
  | "AI/ML"|"IoT / Embedded"
  | "Data Science"
  | "Salesforce"
   |"Full-Stack / Cloud"|"App Development"|"DBMS"
  | "Web Development";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  achievements: string[];
  tech: string[];
  github?: string;
  demo?: string;
  gradient: string;
  emoji: string;
  // Icon shown on the project card button. If provided, it replaces `emoji` text.
  emojiImage?: string;
  // Screenshot gallery shown in the project viewer (swipeable carousel).
  // Drop replacement images in public/projects/ using the same file names.
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "form-data-extraction",
    title: "Automated Form Data Extraction System",
    category: "AI/ML",
    description:
      "End-to-end document intelligence pipeline that converts handwritten and printed forms into structured data using TrOCR and deep learning.",
    achievements: [
      "TrOCR + PyTorch model for handwritten & printed form parsing",
      "Region-based segmentation for improved OCR accuracy",
      "Scalable Python pipeline for end-to-end document processing",
    ],
    tech: ["Python", "PyTorch", "TrOCR", "OCR", "NumPy"],
    github: "https://github.com/Sohan-dsz",
    gradient: "from-amber-500/30 via-orange-500/20 to-yellow-500/30",
    emoji: "form-extraction-1.png",
    emojiImage: "/projects/form-extraction-1.png",
    images: [
      "/projects/form-extraction-1.png",
      "/projects/form-extraction-2.png",
      "/projects/form-extraction-3.png",
    ],
  },{
    slug: "naac-data-management",
    title: "Cloud-Based NAAC Data Management System",
    category: "Full-Stack / Cloud",
    description:
      "Centralized cloud platform for managing NAAC accreditation data with secure storage, containerized deployment, and streamlined report generation.",
    achievements: [
      "Containerized deployment using Docker with PostgreSQL & MinIO",
      "OCR-based document indexing with MeiliSearch for fast retrieval",
      "Keycloak authentication & role-based access control",
    ],
    tech: ["Django", "React", "PostgreSQL", "Docker", "MinIO", "MeiliSearch", "Keycloak"],
    github: "https://github.com/Sohan-dsz",
    gradient: "from-violet-500/30 via-purple-500/20 to-indigo-500/30",
    emoji: "🏛️",
    emojiImage: "/projects/naac-1.png",
    images: [
      "/projects/naac-1.png",
      "/projects/naac-2.png",
      "/projects/naac-3.png",
    ],
  },
  {
    slug: "healthmate",
    title: "HealthMate",
    category: "AI/ML",
    description:
      "AI-powered health companion platform with multimodal interaction — speech, text, and documents — for accessible personal health guidance.",
    achievements: [
      "Multimodal pipeline with Whisper speech-to-text + LLaMA 3 Vision",
      "Symptom analysis with nearby doctor recommendation feature",
      "ElevenLabs voice response for realistic audio interaction",
    ],
    tech: ["Python", "LLaMA 3", "Whisper", "ElevenLabs", "Gradio", "OCR"],
    github: "https://github.com/Sohan-dsz",
    gradient: "from-cyan-500/30 via-sky-500/20 to-emerald-500/30",
    emoji: "🩺",
    emojiImage: "/projects/healthmate-3.png",
    images: [
      "/projects/healthmate-3.png",
      "/projects/healthmate-2.png",
      "/projects/healthmate-1.png",
    ],
  },
  
  
  {
    slug: "wallet-expense-tracker",
    title: "Wallet – Expense Tracker",
    category: "App Development",
    description:
      "Personal finance management app for tracking income, expenses, and budgets with detailed transaction history and reporting.",
    achievements: [
      "Income & expense tracking with budget monitoring",
      "Transaction history with category-based reporting",
      "Clean dashboard for financial overview",
    ],
    tech: ["Database Management", "Application Development", "SQL"],
    github: "https://github.com/Sohan-dsz",
    gradient: "from-emerald-500/30 via-green-500/20 to-teal-500/30",
    emoji: "💰",
    emojiImage: "/projects/wallet-2.png",
    images: [
      "/projects/wallet-1.png",
      "/projects/wallet-2.png",
      "/projects/wallet-3.png",
    ],
  },
  {
    slug: "hospital-data-management",
    title: "Hospital Data Management System",
    category: "DBMS",
    description:
      "Relational database-driven system for managing patient records, doctor schedules, and hospital operations using SQL.",
    achievements: [
      "Patient record & appointment management",
      "Doctor and department relational schema design",
      "SQL-driven reporting and hospital operations automation",
    ],
    tech: ["SQL", "DBMS", "Relational Database"],
    github: "https://github.com/Sohan-dsz/dbms-project-hospital-management-system.git",
    gradient: "from-rose-500/30 via-pink-500/20 to-red-500/30",
    emoji: "🏥",
    emojiImage: "/projects/hospital-1.png",
    images: [
      "/projects/hospital-1.png",
      "/projects/hospital-2.png",
      "/projects/hospital-3.png",
    ],
  },
  {
    slug: "salesforce-whatnext-crm",
    title: "WhatNext Vision Motors – Salesforce CRM",
    category: "Salesforce",
    description:
      "Full CRM implementation on Salesforce for an automotive business, covering customer management, sales workflows, and business process automation.",
    achievements: [
      "End-to-end CRM setup with customer & sales process management",
      "Business workflow automation using Salesforce Flow",
      "Capstone project with live business scenario simulation",
    ],
    tech: ["Salesforce", "CRM", "Salesforce Flow", "Lightning App Builder"],
    github: "https://www.salesforce.com/trailblazer/it2y8335dasx9laqpr",
    gradient: "from-blue-500/30 via-sky-500/20 to-cyan-500/30",
    emoji: "🚗",
    emojiImage: "/projects/crm-1.png",
    images: [
      "/projects/crm-1.png",
      "/projects/crm-2.png",
      "/projects/crm-3.png",
    ],
  },
  {
    slug: "vehicle-order-inventory",
    title: "Vehicle Order & Inventory Management",
    category: "Salesforce",
    description:
      "Custom Salesforce application with Apex triggers, batch processing, and scheduled jobs for automated vehicle order and stock management.",
    achievements: [
      "Custom Vehicle_Order__c object with automated stock tracking",
      "Batch Apex & Scheduler for background processing",
      "Trigger-based business logic for order lifecycle management",
    ],
    tech: ["Salesforce", "Apex", "Triggers", "Batch Apex", "Scheduler"],
    github: "https://www.salesforce.com/trailblazer/it2y8335dasx9laqpr",
    gradient: "from-indigo-500/30 via-blue-500/20 to-violet-500/30",
    emoji: "🚘",
    emojiImage: "/projects/vehicle-1.png",
    images: [
      "/projects/vehicle-1.png",
      "/projects/vehicle-2.png",
      "/projects/vehicle-3.png",
    ],
  },
  {
    slug: "obstacle-detection-bot",
    title: "Obstacle Detection Bot",
    category: "IoT / Embedded",
    description:
      "Smart navigation bot with real-time obstacle detection, mobile app monitoring, and voice command support for assisted navigation.",
    achievements: [
      "Real-time obstacle detection using IoT sensors",
      "Mobile app for remote monitoring and control",
      "Voice command integration for hands-free operation",
    ],
    tech: ["IoT", "Embedded Systems", "Mobile App", "Voice Control"],
    github: "https://github.com/Sohan-dsz",
    gradient: "from-green-500/30 via-teal-500/20 to-lime-500/30",
    emoji: "🤖",
    emojiImage: "/projects/bot-1.png",
    images: [
      "/projects/bot-1.png",
      "/projects/bot-2.png",
      "/projects/bot-3.png",
    ],
  },
];

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  location?: string;
  points: string[];
  icon: LucideIcon;
  tag: string;
};

export const experience: TimelineItem[] = [
  {
    title: "AIML & Full Stack Intern",
    org: "Geojit Technologies",
    period: "Jan 2026 – Apr 2026",
    location: "Kochi, Kerala, India",
    tag: "Internship",
    icon: Briefcase,
    points: [
      "Developed AI-powered applications by integrating LLMs and ML models into full-stack systems using Python and React.",
      "Built OCR-based document processing pipelines for structured data extraction from handwritten and printed forms.",
      "Created multimodal AI pipelines using Whisper and LLMs for speech-to-text and response generation.",
    ],
  },
  {
    title: "Salesforce Intern",
    org: "Salesforce",
    period: "May 2025 – Jul 2025",
    location: "Virtual",
    tag: "Internship",
    icon: Cloud,
    points: [
      "Developed CRM automation workflows using Salesforce Flow to enhance operational efficiency.",
      "Built applications with Lightning App Builder, creating user-friendly interfaces.",
      "Implemented dashboards for reporting and analytics, enabling data-driven decisions.",
    ],
  },
  {
    title: "Team Captain",
    org: "Team SJEC Racing",
    period: "Mar 2025 – Apr 2026",
    location: "Mangaluru, Karnataka, India",
    tag: "Leadership",
    icon: Trophy,
    points: [
      "Led the racing team through design, build, and competition cycles.",
      "Coordinated cross-functional sub-teams for the BAJA SAEINDIA project.",
    ],
  },
  {
    title: "Technical Team Member",
    org: "Team SJEC Racing",
    period: "Mar 2023 – May 2025",
    location: "Mangaluru, Karnataka, India",
    tag: "Engineering",
    icon: Cpu,
    points: [
      "Contributed to design, simulation, and validation of off-road vehicle subsystems.",
      "Hands-on engineering across mechanical and analytics tasks.",
    ],
  },
];

export type EducationItem = {
  degree: string;
  institution: string;
  duration: string;
  score?: string;
  coursework?: string[];
};

export const education: EducationItem[] = [
  {
    degree: "B.E. — Computer Science & Business Systems",
    institution: "St Joseph Engineering College, Mangaluru",
    duration: "2022 – 2026",
    score: "CGPA:8.94",
    coursework: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Engineering",
      "Cloud Computing",
      "Data Structures & Algorithms",
      "Business Systems",
      "Supply Chain Managemanet"
    ],
  },
  {
    degree: "Class XII (Pre-University)",
    institution: "St. Aloysius (Deemed to be University)",
    duration: "2022",
    score: "85.33%",
    coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
  {
    degree: "Class X (SSLC)",
    institution: "Holy Redeemer High School, Hosanagar",
    duration: "2020",
    score: "88.88%",
    coursework: [],
  },
  
];

export type Certification = {
  title: string;
  issuer: string;
  category: "Oracle" |"Cyber Security"| "Salesforce" | "AI/ML" | "Data Science" | "Other";
  year: string;
  gradient: string;
  // Drop a certificate image (PNG/JPG) in public/certificates/ and set its path here.
  // If the file is missing the card gracefully falls back to a badge icon.
  image?: string;
  // Optional link to verify the credential online.
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    category: "AI/ML",
    year: "2025",
    gradient: "from-purple-500/40 to-fuchsia-500/30",
    image: "/certificates/oci-generative-ai-professional.png",
  },
  {
    title: "OCI 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    category: "AI/ML",
    year: "2025",
    gradient: "from-blue-500/40 to-cyan-500/30",
    image: "/certificates/oci-ai-foundations-associate.png",
  },
  {
    title: "OCI 2025 Certified Foundations Associate",
    issuer: "Oracle",
    category: "Oracle",
    year: "2025",
    gradient: "from-rose-500/40 to-orange-500/30",
    image: "/certificates/oci-foundations-associate.png",
  },
  {
    title: "Privacy and Security in Online Social Media",
    issuer: "NPTEL",
    category: "Cyber Security",
    year: "2024",
    gradient: "from-emerald-500/40 to-teal-500/30",
    image: "/certificates/nptel-privacy-security.png",
  },
  {
    title: "Applied Positive Psychology",
    issuer: "Coursera",
    category: "Other",
    year: "2024",
    gradient: "from-cyan-500/40 to-sky-500/30",
    image: "/certificates/coursera-positive-psychology.png",
  },
 
];

export type Course = {
  title: string;
  provider: string;
  category: "AI/ML" | "Data Science" | "Salesforce" | "Cloud Computing" | "Software Development"| "IoT"| "Cyber Security";
  icon: LucideIcon;
};

export const courses: Course[] = [
  { title: "Generative AI Professional", provider: "Oracle", category: "AI/ML", icon: Brain },
  { title: "AI Foundations Associate", provider: "Oracle", category: "AI/ML", icon: GraduationCap },
  { title: "OCI Foundations Associate", provider: "Oracle", category: "Cloud Computing", icon: Cloud },

  { title: "Agentblazer Champion (Developer)", provider: "Salesforce", category: "Salesforce", icon: Cloud },
  { title: "Agentforce AI Foundations", provider: "Salesforce", category: "Salesforce", icon: Cloud },
  { title: "Developer Catalyst V3.0", provider: "Salesforce", category: "Salesforce", icon: Code2 },
  { title: "Cloud IoT", provider: "NPTEL (SWAYAM)", category: "IoT", icon: Cpu },
  
  { title: "Edge Machine Learning", provider: "NPTEL (SWAYAM)", category: "AI/ML", icon: Brain },
  { title: "Large Applications Practicum", provider: "NPTEL (SWAYAM)", category: "Software Development", icon: Code2 },

  { title: "Introduction to Cyber Security", provider: "Cisco Networking Academy", category: "Cyber Security", icon: Cloud },

  { title: "Data Science 101", provider: "IBM Skills Network", category: "Data Science", icon: LineChart },

  { title: "Deep Learning & Neural Networks", provider: "Self / Coursework", category: "AI/ML", icon: Cpu },
  { title: "Data Analysis with Python", provider: "Self / Coursework", category: "Data Science", icon: LineChart },
  { title: "Power BI for Analytics", provider: "Self", category: "Data Science", icon: Boxes },
  { title: "Full-Stack Web Development", provider: "Self", category: "Software Development", icon: Code2 }
];

export type Stat = { label: string; value: number; suffix: string; icon: LucideIcon };

export const stats: Stat[] = [
  { label: "Projects Completed", value: 12, suffix: "+", icon: Boxes },
  { label: "Certifications Earned", value: 3, suffix: "+", icon: Award },
  { label: "Technologies Learned", value: 30, suffix: "+", icon: Cpu },
  { label: "Competitions Participated", value: 8, suffix: "+", icon: Trophy },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
