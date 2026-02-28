import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Award, Users, ArrowRight, Star, Shield, Gem, Rocket } from 'lucide-react';
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
export function HomePage() {
  const features = [
    {
      icon: BrainCircuit,
      title: 'The Framework',
      description: 'Explore the principles, lifecycle, and architecture of AING™.',
      href: '/framework',
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Advance your career with our globally recognized certification programs.',
      href: '/certifications',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Join a global network of professionals shaping the future of work.',
      href: '/community',
    },
  ];
  const testimonials = [
    {
      quote: "AING™ has fundamentally transformed how we approach project delivery. The blend of human intuition and AI orchestration is a game-changer.",
      name: "Jane Doe",
      title: "CTO, Innovate Inc.",
    },
    {
      quote: "The certification process was rigorous but incredibly rewarding. I now have the tools to lead AI transformation in my organization.",
      name: "John Smith",
      title: "AING™ Certified Architect",
    },
    {
      quote: "Finally, a framework that addresses the complexities of the modern, AI-driven enterprise. AING™ is the future.",
      name: "Emily White",
      title: "Head of Digital Strategy, FutureCorp",
    },
  ];
  const certifications = [
    {
      title: "Foundation (AFC)",
      icon: Star,
      href: "/certifications/foundation",
      color: "text-sky-500",
    },
    {
      title: "Practitioner (APC)",
      icon: Shield,
      href: "/certifications/practitioner",
      color: "text-emerald-500",
    },
    {
      title: "Architect (AAC)",
      icon: Gem,
      href: "/certifications/architect",
      color: "text-indigo-500",
    },
    {
      title: "Leader (ALC)",
      icon: Rocket,
      href: "/certifications/leader",
      color: "text-rose-500",
    },
  ];
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="absolute inset-0 bg-gray-900/60 backdrop-brightness-75"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              The AI-Orchestrated Network Framework
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
              AING™ is a universal framework designed to harmonize human expertise, AI intelligence, and adaptive workflows for the next generation of work.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link to="/framework/what-is-aing">Discover the Framework</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
                <Link to="/certifications">Get Certified</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeIn}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                      <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <Button variant="link" asChild className="mt-4 text-indigo-600">
                      <Link to={feature.href}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Framework & Certifications Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold tracking-tight">What is AING™?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The Artificial Intelligence Next Generation (AING™) Framework is a comprehensive, integrated approach to managing work in an AI-defined era. It moves beyond rigid, process-centric methodologies to a fluid, outcome-driven model orchestrated by AI and guided by human expertise.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                It is designed to leverage AI to manage complexity, allowing humans to focus on strategic and creative tasks that drive true innovation.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link to="/framework/what-is-aing">Learn More About the Framework</Link>
              </Button>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Our Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {certifications.map((cert) => (
                      <li key={cert.title}>
                        <Link to={cert.href} className="flex items-center gap-4 p-3 -m-3 rounded-lg hover:bg-accent transition-colors">
                          <cert.icon className={`h-8 w-8 flex-shrink-0 ${cert.color}`} />
                          <span className="font-semibold text-lg">{cert.title}</span>
                          <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Trusted by Professionals Worldwide</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what leaders and practitioners are saying about AING™.
            </p>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full flex flex-col">
                  <CardContent className="pt-6 flex-grow">
                    <p className="italic">"{testimonial.quote}"</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gray-900">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            <span className="block">Ready to embrace the future of work?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Start your journey with the AING™ framework today. Explore our resources, get certified, and join the global community.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-indigo-600 hover:bg-gray-200">
            <Link to="/membership">Become a Member</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}