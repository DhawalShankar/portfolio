export const profile = {
  name: "Dhawal Shukla",
  role: "Backend Developer",
  college: "B.Tech ECE @ JIIT Noida (2023–Present)",
  tagline: "3 production platforms. 900+ users. Real systems.",
  bio: [
    "Backend Developer with hands-on experience in Node.js, Express, and MongoDB. 3 production platforms shipped serving 900+ users with real-time messaging (Socket.io), payment integration (Razorpay), and automated CRON scheduling.",
    "Experienced in REST API design, JWT/OAuth authentication, database optimization, and serverless deployment on Vercel and Render.",
    "Beyond engineering, I'm a published writer with works featured in Amar Ujala and a 1st prize winner in university-level slam poetry.",
  ],
  links: {
    email: "dhawalmannu@gmail.com",
    github: "https://github.com/dhawalshankar",
    linkedin: "https://linkedin.com/in/dhawalshukl",
    leetcode: "https://leetcode.com/u/dhawalshankar/",
    resume:
      "https://drive.google.com/file/d/1zodZ1AqMNmWbzGSzmJerYLQGAHMEUwTa/view?usp=sharing",
  },
};

export const projects = [
  {
    title: "VartaLang – Language Exchange to Career Platform",
    description:
      "Real-time messaging with WebSocket (Socket.io) achieving sub-400ms latency. Hybrid JWT + OAuth 2.0 auth reducing login time by 40%. CRON-based job lifecycle automation cutting admin workload by 100%. Matching algorithm with 22-language bidirectional compatibility via MongoDB compound queries.",
    tech: ["Next.js", "Node.js", "Express", "Socket.io", "MongoDB", "node-cron", "JWT", "OAuth", "Render"],
    link: "https://vartalang.vercel.app",
  },
  {
    title: "Cosmo India Prakashan – Publishing House",
    description:
      "E-commerce platform for family publishing business serving 150+ visitors. Razorpay payment gateway with signature verification, serverless REST API on Vercel with JWT (HTTP-only cookies), bcrypt hashing, and Nodemailer SMTP over TLS for order confirmations.",
    tech: ["Node.js", "React", "MongoDB", "Razorpay", "JWT", "bcrypt", "Nodemailer", "Vercel"],
    link: "https://cosmoindiaprakashan.in",
  },
  {
    title: "ElectiveXChange – Course Matching Platform",
    description:
      "Student matching platform with Firebase Firestore real-time sync and Google OAuth. 209 registered users with 26% conversion rate from 800+ organic visitors. Priority-based matching logic reduced manual coordination by 80%.",
    tech: ["React", "Firebase", "Google OAuth", "TailwindCSS", "Vercel"],
    link: "https://electivexchange.vercel.app",
  },
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["JavaScript (ES6+)", "Java", "Python"] },
  { category: "Backend & APIs", items: ["Node.js", "Express.js", "REST API", "WebSocket (Socket.io)", "CRON Jobs"] },
  { category: "Databases", items: ["MongoDB (Mongoose ODM)", "Firebase Firestore", "MySQL"] },
  { category: "Auth & Security", items: ["JWT", "bcrypt", "OAuth 2.0 (Google)", "Session Management"] },
  { category: "Payments & Integrations", items: ["Razorpay", "Nodemailer SMTP", "Webhooks"] },
  { category: "Tools & Deployment", items: ["Git/GitHub", "Postman", "Vercel", "Render", "Firebase", "VS Code"] },
];

export const experience = [
  {
    role: "Core Team Member",
    org: "Developers Student Club, JIIT Noida",
    period: "Aug 2025 – Jan 2026",
    points: [
      "Co-organized technical workshops and hackathons.",
      "Led development initiatives and mentored peers in full-stack development.",
      "Fostered community engagement in emerging technologies.",
    ],
  },
  {
    role: "Campus Ambassador",
    org: "IIT Delhi Rendezvous & Unstop",
    period: "2025",
    points: [
      "Represented IIT Delhi's flagship cultural fest at JIIT Noida.",
      "Drove campus outreach and student participation for Unstop competitions.",
    ],
  },
];

export const achievements = [
  { label: "900+ Total Users", sub: "Across 3 production platforms" },
  { label: "1k+ LinkedIn Network", sub: "Professional connections" },
  { label: "CGPA: 7.4 / 10", sub: "B.Tech ECE, JIIT Noida" },
  { label: "Published Author", sub: "Amar Ujala (Hindi daily)" },
];