import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/layout/PageShell';
import { Award, Star, Shield, Gem, Rocket, ArrowRight } from 'lucide-react';
const certificationLevels = [
  {
    level: "L1",
    title: "Foundation (AFC)",
    description: "Begin your journey with the core concepts, principles, and vocabulary of the AING™ framework.",
    icon: Star,
    href: "/certifications/foundation",
    color: "text-sky-500",
    bgColor: "bg-sky-50",
    darkBgColor: "dark:bg-sky-900/50",
  },
  {
    level: "L2",
    title: "Practitioner (APC)",
    description: "Learn to apply AING™ in real-world scenarios, facilitating collaboration and managing the framework's lifecycle.",
    icon: Shield,
    href: "/certifications/practitioner",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    darkBgColor: "dark:bg-emerald-900/50",
  },
  {
    level: "L3",
    title: "Architect (AAC)",
    description: "Master the design of complex, AI-orchestrated systems and integrated delivery pipelines using AING™.",
    icon: Gem,
    href: "/certifications/architect",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    darkBgColor: "dark:bg-indigo-900/50",
  },
  {
    level: "L4",
    title: "Leader (ALC)",
    description: "Develop the strategic skills to lead AI-driven organizational transformation and governance.",
    icon: Rocket,
    href: "/certifications/leader",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    darkBgColor: "dark:bg-rose-900/50",
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
      staggerChildren: 0.15,
    },
  },
};
export default function CertificationHubPage() {
  return (
    <PageShell title="AING™ Certification Ecosystem">
      <div className="text-center mb-16">
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Validate your expertise and advance your career with a globally recognized AING™ certification. Our multi-level program is designed to build and certify your skills in leading the future of work with AI-orchestrated systems.
        </p>
      </div>
      <div className="relative">
        {/* The connecting line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-0.5 bg-border hidden md:block" aria-hidden="true"></div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {certificationLevels.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={fadeIn}
              className="relative flex items-center justify-center"
            >
              <div className="md:w-1/2 flex md:justify-end md:pr-8">
                <Card className="w-full max-w-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${cert.bgColor} ${cert.darkBgColor}`}>
                      <cert.icon className={`h-6 w-6 ${cert.color}`} />
                    </div>
                    <div>
                      <CardTitle>{cert.title}</CardTitle>
                      <CardDescription>{cert.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link to={cert.href} className="font-semibold text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors">
                      Explore Certification <ArrowRight className="inline-block ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 h-8 w-8 bg-background border-2 border-border rounded-full flex items-center justify-center font-bold text-indigo-600 hidden md:flex">
                {cert.level.substring(1)}
              </div>
              <div className="hidden md:block w-1/2"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you're new to AI frameworks or an experienced transformation leader, there's a path for you.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Link to="/certifications/exam-guide">View Exam Guide</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/academy">Visit the Academy</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}