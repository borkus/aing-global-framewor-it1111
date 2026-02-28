import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageShell } from '@/components/layout/PageShell';
import { sitemap, NavItem } from '@/lib/sitemap';
import { ArrowRight, Cpu, Bot, Database, ShieldCheck, Hand } from 'lucide-react';
const pillarIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  "Intelligence Layer (IL)": Cpu,
  "Autonomy Layer (AL)": Bot,
  "Data & Infrastructure Layer (DIL)": Database,
  "Governance & Ethics Layer (GEL)": ShieldCheck,
  "Interaction & Immersion Layer (IIL)": Hand,
};
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
export default function CapabilityModulesHubPage() {
  const capabilityModules = sitemap.find(item => item.title === "Capability Modules");
  const pillars: { pillar: NavItem; modules: NavItem[] }[] = [];
  if (capabilityModules?.children) {
    let currentPillar: { pillar: NavItem; modules: NavItem[] } | null = null;
    for (const item of capabilityModules.children) {
      if (item.isPillar) {
        if (currentPillar) {
          pillars.push(currentPillar);
        }
        currentPillar = { pillar: item, modules: [] };
      } else if (currentPillar) {
        currentPillar.modules.push(item);
      }
    }
    if (currentPillar) {
      pillars.push(currentPillar);
    }
  }
  return (
    <PageShell title="AING™ Capability Modules">
      <div className="text-center mb-16">
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the AING™ Capability Modules, a collection of specialized frameworks for emerging technologies. These modules are organized into five core pillars, providing a comprehensive guide to building and governing intelligent systems.
        </p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {pillars.map(({ pillar, modules }) => {
          const PillarIcon = pillarIcons[pillar.title] || Cpu;
          return (
            <motion.div key={pillar.title} variants={fadeIn}>
              <Card className="bg-gray-50 dark:bg-gray-900/50 border">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <PillarIcon className="h-8 w-8 text-indigo-600" />
                    <div>
                      <CardTitle className="text-2xl">{pillar.title}</CardTitle>
                      <CardDescription>{pillar.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {modules.map(module => (
                      <Link
                        key={module.href}
                        to={module.href}
                        className="block p-4 rounded-lg hover:bg-accent transition-colors"
                      >
                        <h4 className="font-semibold">{module.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </PageShell>
  );
}