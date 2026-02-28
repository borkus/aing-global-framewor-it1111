import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/layout/PageShell';
import { CheckCircle, Users, Star, Award, Globe, ArrowRight } from 'lucide-react';
const tiers = [
  {
    name: "Student",
    price: "Free",
    description: "For individuals currently enrolled in an academic institution.",
    features: ["Access to core resources", "Community forum access", "Monthly newsletter"],
    icon: Star,
    cta: "Join as a Student",
    href: "/membership/tiers#student",
  },
  {
    name: "Professional",
    price: "$150",
    pricePeriod: "/ year",
    description: "For practicing professionals in the field of AI and management.",
    features: ["All Student benefits", "Full resource library access", "Discounts on certifications", "Voting rights in AGA"],
    icon: Award,
    cta: "Become a Professional Member",
    href: "/membership/tiers#professional",
    featured: true,
  },
  {
    name: "Fellow",
    price: "By Invitation",
    description: "For distinguished leaders who have made significant contributions.",
    features: ["All Professional benefits", "Invitation to exclusive events", "Opportunity to shape the framework", "Recognition as a thought leader"],
    icon: Users,
    cta: "Learn More",
    href: "/membership/tiers#fellow",
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
export default function MembershipPage() {
  return (
    <PageShell title="Join the AING Global Alliance">
      <div className="text-center mb-16">
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Become part of a global movement shaping the future of work. As a member of the AING Global Alliance (AGA), you'll gain access to exclusive resources, connect with a network of pioneers, and contribute to the evolution of the AI-orchestrated enterprise.
        </p>
        <Button asChild size="lg" className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link to="/membership/tiers">Explore Membership Tiers</Link>
        </Button>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
      >
        {tiers.map((tier) => (
          <motion.div key={tier.name} variants={fadeIn} className="flex">
            <Card className={`flex flex-col w-full ${tier.featured ? 'border-indigo-500 border-2 shadow-lg' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <tier.icon className="h-8 w-8 text-indigo-500" />
                </div>
                <div className="text-3xl font-bold">
                  {tier.price}
                  {tier.pricePeriod && <span className="text-base font-normal text-muted-foreground">{tier.pricePeriod}</span>}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${tier.featured ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}`} variant={tier.featured ? 'default' : 'outline'}>
                  <Link to={tier.href}>{tier.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-24 bg-gray-50 dark:bg-gray-900 rounded-lg p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Globe className="h-12 w-12 text-indigo-600 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight">Connect with a Regional Chapter</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join local events, workshops, and networking sessions by connecting with an AING™ chapter in your area. Share knowledge, collaborate on projects, and grow with your local community of AI and business pioneers.
            </p>
          </div>
          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/membership/chapters">Find a Chapter Near You</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}