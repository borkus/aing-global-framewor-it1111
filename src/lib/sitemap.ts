import {
  Book,
  BrainCircuit,
  Building,
  Contact,
  FileText,
  GraduationCap,
  Home,
  Newspaper,
  Puzzle,
  Users,
  Award,
  Library,
  MessageSquare,
  LifeBuoy,
  LayoutGrid,
} from "lucide-react";
export type NavItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  children?: NavItem[];
  isPillar?: boolean; // To identify pillar headers
};
export const sitemap: NavItem[] = [
  {
    title: "About",
    href: "/about",
    icon: Building,
    children: [
      { title: "About AING™", href: "/about/about-aing", description: "Vision, Mission, Values" },
      { title: "Founder’s Message", href: "/about/founders-message", description: "The story and philosophy behind AING™" },
      { title: "AING™ Manifesto", href: "/about/manifesto", description: "12 guiding principles of AI-driven collaboration" },
      { title: "The Need for AING™", href: "/about/need-for-aing", description: "Why existing frameworks are obsolete" },
      { title: "Our History & Evolution", href: "/about/history", description: "Timeline of framework development" },
      { title: "AING Global Alliance (AGA)", href: "/about/global-alliance", description: "Governance body overview" },
      { title: "Board of Directors", href: "/about/board", description: "Leadership team and advisors" },
      { title: "Ethics & AI Governance", href: "/about/ethics", description: "Our commitment to responsible AI" },
      { title: "Partners & Alliances", href: "/about/partners", description: "Collaborating for a better future" },
    ],
  },
  {
    title: "Framework",
    href: "/framework",
    icon: BrainCircuit,
    children: [
      { title: "What is AING™?", href: "/framework/what-is-aing", description: "An introduction to the framework" },
      { title: "Principles", href: "/framework/principles", description: "Co-Intelligence, Orchestration, Transparency, Learning, Rhythm" },
      { title: "Lifecycle", href: "/framework/lifecycle", description: "Initialize → Orchestrate → Co-Create → Validate → Evolve" },
      { title: "Roles in AING™", href: "/framework/roles", description: "The new human + AI collaboration model" },
      { title: "Operating Layers", href: "/framework/layers", description: "Strategy, Execution, Governance, Evolution" },
      { title: "Architecture", href: "/framework/architecture", description: "Visual diagrams and process flows" },
      { title: "AI Agents", href: "/framework/ai-agents", description: "The role of Co-pilots and Orchestrators" },
      { title: "Tools & Templates", href: "/framework/tools", description: "AING Canvas, Flowboard, Insight Loop" },
      { title: "Compare Frameworks", href: "/framework/comparison", description: "AING vs. Agile, SAFe, PRINCE2, ITIL" },
      { title: "Case Studies", href: "/framework/case-studies", description: "Practical examples of AING™ in action" },
      { title: "Glossary", href: "/framework/glossary", description: "A comprehensive list of AING™ terms" },
    ],
  },
  {
    title: "Capability Modules",
    href: "/capability-modules",
    icon: Puzzle,
    children: [
      // Pillar 1
      { title: "Intelligence Layer (IL)", href: "#", isPillar: true, description: "Core AI and machine learning technologies." },
      { title: "Machine Learning", href: "/capability-modules/intelligence-layer/machine-learning", description: "Foundational predictive and analytical models." },
      { title: "Deep Learning", href: "/capability-modules/intelligence-layer/deep-learning", description: "Advanced neural networks for complex patterns." },
      { title: "Natural Language Processing", href: "/capability-modules/intelligence-layer/natural-language-processing", description: "Enabling machines to understand human language." },
      { title: "Generative AI", href: "/capability-modules/intelligence-layer/generative-ai", description: "Creating novel content, from text to images." },
      // Pillar 2
      { title: "Autonomy Layer (AL)", href: "#", isPillar: true, description: "Systems that act and decide independently." },
      { title: "Robotic Process Automation", href: "/capability-modules/autonomy-layer/robotic-process-automation", description: "Automating repetitive, rule-based tasks." },
      { title: "Autonomous Systems", href: "/capability-modules/autonomy-layer/autonomous-systems", description: "Self-governing systems like drones and vehicles." },
      { title: "Digital Twins", href: "/capability-modules/autonomy-layer/digital-twins", description: "Virtual models of physical objects or systems." },
      { title: "AI Orchestration", href: "/capability-modules/autonomy-layer/ai-orchestration", description: "Coordinating complex, multi-agent workflows." },
      // Pillar 3
      { title: "Data & Infrastructure Layer (DIL)", href: "#", isPillar: true, description: "The foundational technologies for AI." },
      { title: "Cloud Computing", href: "/capability-modules/data-infrastructure-layer/cloud-computing", description: "Scalable, on-demand computing resources." },
      { title: "Edge Computing", href: "/capability-modules/data-infrastructure-layer/edge-computing", description: "Processing data closer to its source." },
      { title: "Blockchain", href: "/capability-modules/data-infrastructure-layer/blockchain", description: "Decentralized, secure data and transaction ledgers." },
      { title: "Quantum Computing", href: "/capability-modules/data-infrastructure-layer/quantum-computing", description: "Solving problems intractable for classical computers." },
      // Pillar 4
      { title: "Governance & Ethics Layer (GEL)", href: "#", isPillar: true, description: "Ensuring responsible and secure AI." },
      { title: "AI Ethics & Governance", href: "/capability-modules/governance-ethics-layer/ai-ethics-governance", description: "Frameworks for responsible AI development." },
      { title: "Cybersecurity Mesh", href: "/capability-modules/governance-ethics-layer/cybersecurity-mesh", description: "A flexible, composable security architecture." },
      { title: "Data Fabric", href: "/capability-modules/governance-ethics-layer/data-fabric", description: "Integrating data across disparate systems." },
      { title: "Privacy-Enhancing Computation", href: "/capability-modules/governance-ethics-layer/privacy-enhancing-computation", description: "Protecting data while it is being used." },
      // Pillar 5
      { title: "Interaction & Immersion Layer (IIL)", href: "#", isPillar: true, description: "How humans and AI interact with the world." },
      { title: "Augmented Reality (AR)", href: "/capability-modules/interaction-immersion-layer/augmented-reality", description: "Overlaying digital information on the real world." },
      { title: "Virtual Reality (VR)", href: "/capability-modules/interaction-immersion-layer/virtual-reality", description: "Creating fully immersive digital environments." },
      { title: "Metaverse", href: "/capability-modules/interaction-immersion-layer/metaverse", description: "Persistent, shared virtual spaces." },
      { title: "Conversational AI", href: "/capability-modules/interaction-immersion-layer/conversational-ai", description: "Advanced chatbots and voice assistants." },
    ],
  },
  {
    title: "Certifications",
    href: "/certifications",
    icon: Award,
    children: [
      { title: "Certification Overview", href: "/certifications", description: "Our philosophy and ecosystem" },
      { title: "Certification Levels", href: "/certifications/levels", description: "From Foundation to Enterprise Champion" },
      { title: "Foundation (AFC)", href: "/certifications/foundation", description: "Start your AING™ journey" },
      { title: "Practitioner (APC)", href: "/certifications/practitioner", description: "Apply AING™ in practice" },
      { title: "Architect (AAC)", href: "/certifications/architect", description: "Design intelligent systems" },
      { title: "Leader (ALC)", href: "/certifications/leader", description: "Lead AI-driven transformations" },
      { title: "Exam Guide", href: "/certifications/exam-guide", description: "Syllabus and preparation materials" },
      { title: "Verify a Certification", href: "/certifications/verify", description: "Check certification status" },
    ],
  },
  {
    title: "Academy",
    href: "/academy",
    icon: GraduationCap,
    children: [
      { title: "AING Academy Home", href: "/academy", description: "Your hub for learning and growth" },
      { title: "Course Catalogue", href: "/academy/courses", description: "Explore all available courses" },
      { title: "Learning Paths", href: "/academy/learning-paths", description: "Guided tracks to certification" },
      { title: "Corporate Training", href: "/academy/corporate", description: "Solutions for your organization" },
      { title: "Become a Trainer", href: "/academy/become-trainer", description: "Join our network of instructors" },
    ],
  },
  {
    title: "Membership",
    href: "/membership",
    icon: Users,
    children: [
      { title: "Join the AGA", href: "/membership", description: "Become part of the AING Global Alliance" },
      { title: "Membership Benefits", href: "/membership/benefits", description: "Unlock exclusive resources" },
      { title: "Membership Tiers", href: "/membership/tiers", description: "Find the right level for you" },
      { title: "Regional Chapters", href: "/membership/chapters", description: "Connect with local professionals" },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    icon: Library,
    children: [
      { title: "Resource Library", href: "/resources", description: "All downloads in one place" },
      { title: "Whitepapers", href: "/resources/whitepapers", description: "In-depth research and analysis" },
      { title: "Case Studies", href: "/resources/case-studies", description: "Real-world success stories" },
      { title: "Templates & Tools", href: "/resources/tools", description: "Practical assets for implementation" },
    ],
  },
  {
    title: "Community",
    href: "/community",
    icon: MessageSquare,
    children: [
      { title: "Community Hub", href: "/community", description: "Connect with peers and experts" },
      { title: "Events Calendar", href: "/community/events", description: "Upcoming webinars and meetups" },
      { title: "Global Summit", href: "/community/summit", description: "Our premier annual conference" },
      { title: "Forums", href: "/community/forums", description: "Discuss and share knowledge" },
    ],
  },
  {
    title: "News & Insights",
    href: "/news",
    icon: Newspaper,
    children: [
      { title: "AING Insights Blog", href: "/news", description: "Latest articles and announcements" },
      { title: "Newsroom", href: "/news/newsroom", description: "Official press releases" },
      { title: "AI Trends", href: "/news/trends", description: "Analysis of the AI landscape" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Contact,
    children: [
      { title: "Contact Us", href: "/contact", description: "Get in touch with our team" },
      { title: "Support Center", href: "/contact/support", description: "Find answers to your questions" },
      { title: "Media Inquiries", href: "/contact/media", description: "Information for the press" },
    ],
  },
];