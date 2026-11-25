export interface SkillGroup {
  category: string;
  accent: "cyan" | "blue" | "purple" | "magenta" | "emerald";
  description: string;
  items: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  status: "Live" | "Completed" | "Featured";
  description: string;
  highlights: string[];
  tech: string[];
  accent: "cyan" | "purple" | "blue";
  liveUrl?: string;
  repoUrl?: string;
}

export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  type: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  details: string;
  badge: string;
}

export const PROFILE = {
  name: "Mohit Chauhan",
  initials: "MC",
  tagline: "AI / ML • Python • Data Science • Software Development",
  oneLiner:
    "B.Tech student in Artificial Intelligence & Machine Learning building practical AI products and leading student tech communities.",
  summary:
    "Motivated B.Tech Artificial Intelligence & Machine Learning student with hands-on experience in Python, Generative AI, Prompt Engineering, Data Science, and full-stack web development. Passionate about transforming AI concepts into usable, real-world web products while leading student tech communities and collaborative engineering teams.",
  location: "Uttar Pradesh, India",
  phone: "7011603169",
  email: "mchauhan172005@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohit-chauhan-467391321/",
  github: "https://github.com/Codewithmohit17",
  portraitPath: "/images/mohit-portrait.jpg",
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programming",
    accent: "cyan",
    description: "Core languages for algorithmic problem-solving, backend logic, and interactive UIs.",
    items: ["Python", "JavaScript", "HTML", "CSS", "C/C++"],
  },
  {
    category: "AI / ML",
    accent: "purple",
    description: "Designing intelligent workflows, LLM integrations, and structured prompt pipelines.",
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "Prompt Engineering",
    ],
  },
  {
    category: "Data",
    accent: "blue",
    description: "Cleaning, structuring, analyzing, and querying datasets for actionable insights.",
    items: [
      "Data Science",
      "Data Analysis",
      "Data Preprocessing",
      "Databases",
    ],
  },
  {
    category: "Web",
    accent: "magenta",
    description: "Building modern, responsive, API-connected web applications with polished UX.",
    items: [
      "Frontend Development",
      "Responsive Web Applications",
      "API Integration",
    ],
  },
  {
    category: "Tools",
    accent: "emerald",
    description: "Modern engineering workflow, version control, and AI-accelerated development.",
    items: ["Git", "GitHub", "VS Code", "AI-assisted Development"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "SnapCut AI",
    subtitle: "AI-Powered Web Project",
    status: "Live",
    description:
      "An AI-powered web application built for fast, intelligent media processing and streamlined user workflows with a clean, responsive interface.",
    highlights: [
      "AI-driven workflow integration with real-time feedback",
      "Responsive frontend engineered for desktop and mobile",
      "API integration and modular web architecture",
    ],
    tech: ["Python", "JavaScript", "AI / ML", "API Integration", "Responsive UI"],
    accent: "cyan",
    liveUrl: "#contact",
  },
  {
    title: "Kritrim Dhi",
    subtitle: "Official Website (Society Web Project)",
    status: "Live",
    description:
      "The official digital home for Kritrim Dhi — the AI & ML student society at ADGIPS, showcasing events, community initiatives, and member projects.",
    highlights: [
      "Designed and shipped the official society web presence",
      "Built for community engagement, event discovery, and recruitment",
      "Modern dark-tech aesthetic with responsive layouts",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Frontend Development", "UI/UX"],
    accent: "purple",
    liveUrl: "#contact",
  },
  {
    title: "School Management System",
    subtitle: "Software Development Project",
    status: "Completed",
    description:
      "A structured software application to streamline student records, academic administration, and institutional data management.",
    highlights: [
      "Structured database design and data preprocessing workflows",
      "Clean CRUD operations for students, classes, and records",
      "Reliable, maintainable codebase with modular logic",
    ],
    tech: ["Python", "C/C++", "Databases", "Software Development"],
    accent: "blue",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    organization: "InAmigos Foundation",
    role: "AI Prompt Engineering Intern",
    period: "Sep 2026",
    type: "Internship",
    description:
      "Engineered structured prompts and Generative AI workflows to improve output quality, consistency, and task automation across foundation initiatives.",
    tags: ["Generative AI", "Prompt Engineering", "AI Workflows"],
  },
  {
    organization: "Kritrim Dhi — ADGIPS",
    role: "President",
    period: "Apr 2026 – Present",
    type: "Leadership",
    description:
      "Leading the official AI & Machine Learning society at ADGIPS — driving technical workshops, project mentorship, hackathons, and community growth.",
    tags: ["AI/ML Community", "Leadership", "Technical Mentorship"],
  },
  {
    organization: "CracKed",
    role: "Co-Founder",
    period: "Nov 2025 – Present",
    type: "Venture",
    description:
      "Co-founded a student-driven tech initiative focused on building practical software solutions, collaborative engineering, and peer learning.",
    tags: ["Co-Founder", "Product Building", "Strategy"],
  },
  {
    organization: "The Invincibles",
    role: "Social Media Head",
    period: "Community Role",
    type: "Leadership",
    description:
      "Directed digital outreach, content strategy, and audience engagement to amplify community campaigns and events.",
    tags: ["Content Strategy", "Growth", "Branding"],
  },
  {
    organization: "Word Wizards ADGIPS",
    role: "Social Media Head",
    period: "Community Role",
    type: "Leadership",
    description:
      "Managed social media presence and creative communications for the literary and speaking society at ADGIPS.",
    tags: ["Communications", "Social Media", "Teamwork"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Dr. Akhilesh Das Gupta Institute of Technology & Management",
    degree: "B.Tech — Artificial Intelligence and Machine Learning",
    period: "Aug 2024 – Jun 2028",
    details:
      "Pursuing undergraduate engineering in AI & ML with active leadership in technical societies and hands-on AI/web development.",
    badge: "Undergraduate",
  },
  {
    institution: "CBSE Class XII",
    degree: "Senior Secondary — Physics, Chemistry, Mathematics (PCM)",
    period: "Completed",
    details:
      "Strong analytical and mathematical foundation in Physics, Chemistry, and Mathematics.",
    badge: "Academic",
  },
  {
    institution: "Tata",
    degree: "GenAI Powered Data Analytics Job Simulation",
    period: "Certification",
    details:
      "Completed practical industry simulation covering Generative AI-assisted data analytics, preprocessing, and insight generation.",
    badge: "Certification",
  },
];
