export interface ForumPost {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    title: string;
  };
  content: string;
  timestamp: string;
  replies?: ForumPost[];
}
export interface ForumThread {
  id: string;
  title:string;
  category: string;
  authorName: string;
  repliesCount: number;
  lastReply: string;
  posts: ForumPost[];
}
export const mockForumData = {
  categories: [
    { id: 'general', name: 'General Discussion', description: 'Talk about anything related to AING™ and AI in business.' },
    { id: 'framework', name: 'Framework & Modules', description: 'Deep dive into the AING™ framework, principles, and modules.' },
    { id: 'certifications', name: 'Certifications', description: 'Discuss exam preparation, study groups, and career paths.' },
    { id: 'implementation', name: 'Implementation & Case Studies', description: 'Share your experiences and learn from others.' },
  ],
  threads: [
    {
      id: 'thread-1',
      title: 'How are you transitioning from Scrum to AING-AM?',
      category: 'framework',
      authorName: 'Alex Johnson',
      repliesCount: 2,
      lastReply: '2 hours ago',
      posts: [
        {
          id: 'post-1-1',
          author: { name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=alex', title: 'AING™ Practitioner' },
          content: "Hey everyone, my team is starting our transition from a well-established Scrum process to using the AING-AM module. I'm curious to hear about others' experiences. What were the biggest challenges? Any tips for making the shift smoother, especially with the concept of 'Predictive Sprinting'?",
          timestamp: '1 day ago',
          replies: [
            {
              id: 'post-1-2',
              author: { name: 'Samantha Lee', avatarUrl: 'https://i.pravatar.cc/150?u=samantha', title: 'AING™ Architect' },
              content: "Great question, Alex! The biggest hurdle for us was shifting the team's mindset from 'delivering story points' to 'impacting outcomes.' We found that focusing on the AING™ Canvas during our Collaboration Moments really helped keep everyone aligned on the 'why.' For Predictive Sprinting, start small. Let the AI Orchestrator handle just one or two variables at first (like task allocation) before you let it manage the full scope.",
              timestamp: '22 hours ago',
            },
            {
              id: 'post-1-3',
              author: { name: 'David Chen', avatarUrl: 'https://i.pravatar.cc/150?u=david', title: 'Agile Coach' },
              content: "Adding to Samantha's point, don't abandon all your Scrum ceremonies at once. We phased them out. For example, our daily stand-up became a 'daily check-in with the Orchestrator's summary.' It made the transition feel more like an evolution than a revolution.",
              timestamp: '2 hours ago',
            },
          ]
        }
      ]
    },
    {
      id: 'thread-2',
      title: 'Best resources for the AING™ Foundation (AFC) exam?',
      category: 'certifications',
      authorName: 'Maria Garcia',
      repliesCount: 1,
      lastReply: '5 hours ago',
      posts: [
        {
          id: 'post-2-1',
          author: { name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=maria', title: 'Aspiring Professional' },
          content: "Hi all, I'm preparing for my AFC exam next month. Besides the official framework guide, are there any other resources (practice exams, videos, etc.) that you found particularly helpful? Thanks in advance!",
          timestamp: '8 hours ago',
          replies: [
            {
              id: 'post-2-2',
              author: { name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=alex', title: 'AING™ Practitioner' },
              content: "Definitely check out the official practice exam on the Academy portal. It's very close to the real thing. I also found that creating flashcards for the Glossary terms was a huge help. Good luck!",
              timestamp: '5 hours ago',
            },
          ]
        }
      ]
    },
    {
      id: 'thread-3',
      title: 'AING-GM vs Traditional PMO - What are the key differences?',
      category: 'implementation',
      authorName: 'Samantha Lee',
      repliesCount: 0,
      lastReply: 'Just now',
      posts: [
        {
          id: 'post-3-1',
          author: { name: 'Samantha Lee', avatarUrl: 'https://i.pravatar.cc/150?u=samantha', title: 'AING™ Architect' },
          content: "I'm putting together a presentation for leadership on the benefits of adopting AING-GM to replace our traditional PMO. I've read the framework docs, but I'd love to hear some real-world perspectives from others who have made this shift. What were the most compelling arguments for you? How did you handle the transition of people's roles?",
          timestamp: 'Just now',
          replies: []
        }
      ]
    },
  ]
};
export const certifiedProfessionals = [
  {
    id: 'AING-APC-12345',
    name: 'Alex Johnson',
    certification: 'AING™ Practitioner (APC)',
    issuedOn: '2023-08-01',
    expiresOn: '2025-08-01',
  },
  {
    id: 'AING-AAC-67890',
    name: 'Samantha Lee',
    certification: 'AING™ Architect (AAC)',
    issuedOn: '2023-11-15',
    expiresOn: '2025-11-15',
  },
  {
    id: 'AING-AFC-24680',
    name: 'David Chen',
    certification: 'AING™ Foundation (AFC)',
    issuedOn: '2024-02-20',
    expiresOn: '2026-02-20',
  },
];
export const mockExams: Record<string, { name: string; questions: any[] }> = {
  afc: {
    name: 'AING™ Foundation (AFC)',
    questions: [
      { id: 1, question: "Which of the following is a core principle of the AING™ framework?", options: ["Rigid Planning", "Co-Intelligence", "Process-Centricity", "Individual Work"], answer: "Co-Intelligence" },
      { id: 2, question: "What is the name of the master AI agent that manages the workflow in AING™?", options: ["The Co-pilot", "The Analyst", "The Orchestrator", "The Guardian"], answer: "The Orchestrator" },
      { id: 3, question: "Which phase of the AING™ lifecycle focuses on defining the desired outcome?", options: ["Co-Create", "Validate", "Orchestrate", "Initialize"], answer: "Initialize" },
    ]
  },
  apc: {
    name: 'AING™ Practitioner (APC)',
    questions: [
      { id: 1, question: "In a 'Collaboration Moment', what is the primary role of the human team?", options: ["To report daily status", "To make strategic decisions based on AI insights", "To estimate story points", "To write code"], answer: "To make strategic decisions based on AI insights" },
      { id: 2, question: "Which AING™ tool is a dynamic, real-time visualization of the workflow?", options: ["AING™ Canvas", "AING™ Flowboard", "Insight Loop", "Governance Dashboard"], answer: "AING™ Flowboard" },
      { id: 3, question: "A developer using an AI assistant to write and debug code is an example of which AING™ role?", options: ["AI Orchestrator", "AI Co-pilot", "AI Analyst", "AI Guardian"], answer: "AI Co-pilot" },
    ]
  },
  aac: {
    name: 'AING™ Architect (AAC)',
    questions: [
      { id: 1, question: "Which architectural pattern is central to the Cybersecurity Mesh capability?", options: ["Castle-and-moat", "Identity-centric security", "Centralized enforcement", "Perimeter-based security"], answer: "Identity-centric security" },
      { id: 2, question: "A Digital Twin is most effective when it is:", options: ["A static 3D model", "Updated weekly", "Synchronized in real-time with its physical counterpart", "Used only for historical analysis"], answer: "Synchronized in real-time with its physical counterpart" },
      { id: 3, question: "What is the primary purpose of a Data Fabric?", options: ["To centralize all data into a single data lake", "To create a virtual, integrated data layer over distributed sources", "To replace all existing databases", "To enforce data silos"], answer: "To create a virtual, integrated data layer over distributed sources" },
    ]
  }
};