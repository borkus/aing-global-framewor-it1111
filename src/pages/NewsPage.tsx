import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/layout/PageShell';
import { ArrowRight } from 'lucide-react';
const posts = [
  {
    title: "AING™ Framework v1.0 Officially Released",
    category: "Announcement",
    date: "August 1, 2024",
    description: "We are thrilled to announce the official public release of the AING™ Framework v1.0, marking a new era in AI-orchestrated work management.",
    href: "/news/v1-release",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Paradigm Shift: From Project Management to Outcome Orchestration",
    category: "Thought Leadership",
    date: "July 28, 2024",
    description: "Explore why traditional project management is failing in the AI era and how AING's outcome-focused approach is the future.",
    href: "/news/paradigm-shift",
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Case Study Deep Dive: AING in Financial Services",
    category: "Case Study",
    date: "July 22, 2024",
    description: "A detailed look at how a leading FinTech company leveraged AING-AM to accelerate their product development lifecycle.",
    href: "/news/case-study-finance",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Understanding the Human Guardian Role in an AI-First World",
    category: "Framework Insights",
    date: "July 15, 2024",
    description: "The Guardian is one of the most critical human roles in AING™. We explore its responsibilities and importance.",
    href: "/news/human-guardian-role",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c7c35234657?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const featuredPost = posts.find(p => p.featured);
const otherPosts = posts.filter(p => !p.featured);
export default function NewsPage() {
  return (
    <PageShell title="AING™ News & Insights">
      <div className="space-y-16">
        {featuredPost && (
          <Card className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            <div className="p-8 flex flex-col justify-center">
              <span className="text-sm font-semibold text-indigo-600">{featuredPost.category}</span>
              <CardTitle className="text-3xl mt-2">{featuredPost.title}</CardTitle>
              <CardDescription className="mt-4 text-lg">{featuredPost.description}</CardDescription>
              <div className="mt-6">
                <Button asChild>
                  <Link to={featuredPost.href}>Read Full Article <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="min-h-[250px] md:min-h-full">
              <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-full object-cover" />
            </div>
          </Card>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Card key={post.title} className="flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="aspect-video">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-grow">
                <CardHeader>
                  <span className="text-sm font-medium text-indigo-600">{post.category}</span>
                  <CardTitle className="text-xl mt-1">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground pt-2">{post.date}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{post.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="secondary">
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