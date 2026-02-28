import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/layout/PageShell';
import { FileText, BarChart, Wrench, Download } from 'lucide-react';
const resources = [
  {
    title: "AING™ Framework v1.0 Whitepaper",
    description: "The complete, official guide to the AING™ framework, principles, and lifecycle.",
    icon: FileText,
    category: "Whitepapers",
    href: "/resources/framework-guide.pdf",
  },
  {
    title: "Case Study: AING in FinTech",
    description: "A detailed analysis of how AING™ reduced time-to-market by 30% for a digital bank.",
    icon: BarChart,
    category: "Case Studies",
    href: "/resources/case-study-fintech.pdf",
  },
  {
    title: "AING™ Canvas Template",
    description: "A printable and digital template to kickstart your projects with the AING™ Canvas.",
    icon: Wrench,
    category: "Templates",
    href: "/resources/aing-canvas-template.pdf",
  },
  {
    title: "Framework Comparison Report",
    description: "An in-depth report comparing AING™ with Agile, SAFe, and PRINCE2.",
    icon: FileText,
    category: "Reports",
    href: "/resources/framework-comparison-report.pdf",
  },
  {
    title: "Case Study: AING in Pharma R&D",
    description: "Discover how AING™ accelerated drug discovery timelines at a major pharmaceutical firm.",
    icon: BarChart,
    category: "Case Studies",
    href: "/resources/case-study-pharma.pdf",
  },
  {
    title: "AING-GM Governance Toolkit",
    description: "A set of templates and guides for implementing AI-driven governance.",
    icon: Wrench,
    category: "Templates",
    href: "/resources/governance-toolkit.zip",
  },
];
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
export default function ResourcesPage() {
  // In a real app, you'd have state for filtering
  // const [filter, setFilter] = useState('All');
  return (
    <PageShell title="AING™ Resource Library">
      <div className="text-center mb-12">
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Access our comprehensive library of whitepapers, case studies, templates, and tools to support your AING™ implementation journey.
        </p>
      </div>
      {/* Add filter buttons here in a future phase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <motion.div key={resource.title} variants={fadeIn}>
            <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex-shrink-0">
                    <resource.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-indigo-600">{resource.category}</span>
                    <CardTitle className="text-lg mt-1">{resource.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <CardDescription className="mb-4">{resource.description}</CardDescription>
                <Button asChild>
                  <a href={resource.href} download>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}