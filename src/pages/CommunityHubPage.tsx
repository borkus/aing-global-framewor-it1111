import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/layout/PageShell';
import { Calendar, MessageSquare, Users, Award, ArrowRight } from 'lucide-react';
const communitySections = [
  {
    title: "Upcoming Events",
    description: "Join our webinars, workshops, and the annual AING Global Summit.",
    icon: Calendar,
    href: "/community/events",
    cta: "View Events Calendar",
  },
  {
    title: "Community Forums",
    description: "Ask questions, share your expertise, and collaborate with peers.",
    icon: MessageSquare,
    href: "/community/forums",
    cta: "Join the Discussion",
  },
  {
    title: "AING Innovation Awards",
    description: "Get recognized for your outstanding application of the AING framework.",
    icon: Award,
    href: "/community/awards",
    cta: "Learn About the Awards",
  },
];
const recentPosts = [
    { title: "Case Study: AING in Financial Services", author: "Jane Doe", date: "July 15, 2024", href: "/news/case-study-finance", imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "The Role of the Human Guardian in AI Governance", author: "John Smith", date: "July 10, 2024", href: "/news/human-guardian-role", imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Transitioning from Scrum to AING-AM", author: "Emily White", date: "July 5, 2024", href: "/news/scrum-to-aing-am", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
export default function CommunityHubPage() {
  return (
    <PageShell title="AING™ Community Hub">
      <div className="text-center mb-16">
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Welcome to the heart of the AING™ ecosystem. Connect with a global network of professionals, share your knowledge, and collaborate on shaping the future of AI-orchestrated work.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {communitySections.map((section) => (
          <motion.div key={section.title} variants={fadeIn}>
            <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-4">
                  <section.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0 text-indigo-600">
                  <Link to={section.href}>{section.cta} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-24">
        <h2 className="text-3xl font-bold tracking-tight text-center">From the Community</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Card key={post.title} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="aspect-video bg-gray-200">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>By {post.author} on {post.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <div className="p-6 pt-0">
                  <Button asChild variant="outline">
                    <Link to={post.href}>Read More</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}