import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/layout/PageShell';
import { BookOpen, Zap, Shield, Gem, Rocket, ArrowRight, Building, Target } from 'lucide-react';
const courses = [
  {
    title: "AING™ Foundation (AFC Prep)",
    description: "Master the core concepts of the AING™ framework and prepare for the Foundation exam.",
    icon: BookOpen,
    tags: ["Beginner", "Core"],
    href: "/academy/courses/foundation-prep",
  },
  {
    title: "Applied AING™ for Practitioners",
    description: "A hands-on course on implementing AING™ roles, tools, and lifecycle phases in your projects.",
    icon: Zap,
    tags: ["Intermediate", "Practical"],
    href: "/academy/courses/practitioner-applied",
  },
  {
    title: "AI-Orchestrated Governance",
    description: "Learn to design and implement intelligent governance models with AING-GM.",
    icon: Shield,
    tags: ["Advanced", "Governance"],
    href: "/academy/courses/governance-masterclass",
  },
  {
    title: "Designing Intelligent Systems",
    description: "An in-depth course for architects on building scalable, AI-driven systems with AING™.",
    icon: Gem,
    tags: ["Expert", "Architecture"],
    href: "/academy/courses/architect-design",
  },
  {
    title: "Leading AI Transformation",
    description: "Strategic insights and leadership skills for executives driving change with AING™.",
    icon: Rocket,
    tags: ["Leadership", "Strategy"],
    href: "/academy/courses/leadership-transformation",
  },
  {
    title: "AING™ for Agile Experts",
    description: "Transition your Agile and Scrum expertise to the AI-orchestrated paradigm of AING-AM.",
    icon: Zap,
    tags: ["Specialization", "Agile"],
    href: "/academy/courses/agile-transition",
  },
];
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
export default function AcademyPortalPage() {
  return (
    <PageShell title="AING™ Academy">
      <div className="text-center mb-12">
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Welcome to the AING™ Academy, your central hub for learning, development, and certification. Access our comprehensive catalog of courses, follow structured learning paths, and find training solutions for your entire organization.
        </p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {courses.map((course) => (
          <motion.div key={course.title} variants={fadeIn} className="flex">
            <Card className="flex flex-col w-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  <course.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
                <CardTitle className="mt-4 text-xl">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <CardDescription>{course.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <Link to={course.href} className="font-semibold text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors">
                    View Course <ArrowRight className="inline-block ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Card className="bg-gray-50 dark:bg-gray-900 border-0">
          <CardHeader>
            <Target className="h-8 w-8 text-indigo-600 mb-2" />
            <CardTitle className="text-2xl">Learning Paths</CardTitle>
            <CardDescription>
              Follow our curated learning paths designed to guide you from foundational knowledge to expert-level certification. Each path combines courses, practical labs, and assessments to ensure comprehensive skill development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/academy/learning-paths">Explore Paths</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 dark:bg-gray-900 border-0">
          <CardHeader>
            <Building className="h-8 w-8 text-indigo-600 mb-2" />
            <CardTitle className="text-2xl">Corporate Training</CardTitle>
            <CardDescription>
              Empower your entire organization with customized AING™ training solutions. We offer on-site workshops, virtual classrooms, and enterprise licensing for our e-learning platform to accelerate your AI transformation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/academy/corporate">For Organizations</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}