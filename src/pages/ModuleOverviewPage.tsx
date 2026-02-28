import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Puzzle, BrainCircuit, ShieldCheck, Server, Zap, Smile } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
const modules = [
  {
    title: "AING-CF: Core Framework",
    description: "The foundational module establishing the principles, lifecycle, and roles of AING™.",
    icon: BrainCircuit,
    href: "/modules/core-framework",
    tags: ["Foundation", "Core"],
    imageUrl: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "AING-AM: Agile Matrix",
    description: "Transition from traditional Agile ceremonies to AI-driven collaboration and predictive sprinting.",
    icon: Zap,
    href: "/modules/agile-matrix",
    tags: ["Agile", "Transformation"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "AING-GM: Governance & Management",
    description: "Implement AI-powered governance, replacing traditional PMOs with dynamic decision gates.",
    icon: ShieldCheck,
    href: "/modules/governance",
    tags: ["Governance", "Management"],
    imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "AING-OM: Operations Management",
    description: "Integrate AI into ITSM and DevOps for intelligent change management and automation.",
    icon: Server,
    href: "/modules/operations",
    tags: ["ITSM", "DevOps"],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "AING-ID: Intelligent Delivery",
    description: "Orchestrate complex hybrid and multi-cloud delivery pipelines with AI-driven insights.",
    icon: Puzzle,
    href: "/modules/intelligent-delivery",
    tags: ["Delivery", "Cloud"],
    imageUrl: "https://images.unsplash.com/photo-1586953208448-30732635ade7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "AING-CX: Customer Experience",
    description: "Leverage AI to design and manage hyper-personalized, omnichannel customer journeys.",
    icon: Smile,
    href: "/modules/customer-experience",
    tags: ["CX", "UX", "Design"],
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
export default function ModuleOverviewPage() {
  return (
    <PageShell title="AING™ Modules Overview">
      <div className="text-center mb-12">
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          AING™ is a modular framework designed to be adaptable to your organization's specific needs. Each module provides a specialized lens for applying AI-orchestration to a key business domain. Explore the modules below to build your tailored transformation roadmap.
        </p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {modules.map((module) => (
          <motion.div key={module.title} variants={fadeIn} className="flex">
            <Card className="flex flex-col w-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="aspect-video">
                <img src={module.imageUrl} alt={module.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <div className="flex-grow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-4">
                    <module.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="mt-2">{module.description}</CardDescription>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <Link to={module.href} className="font-semibold text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors">
                    Learn More <ArrowRight className="inline-block ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </PageShell>
  );
}