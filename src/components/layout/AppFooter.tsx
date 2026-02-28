import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BrainCircuit, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sitemap } from "@/lib/sitemap";
import { toast } from "sonner";
export function AppFooter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Subscription failed. Please try again.');
      }
      toast.success("You're subscribed!", {
        description: "Thank you for joining our newsletter.",
      });
      setEmail('');
    } catch (error) {
      toast.error("Subscription failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BrainCircuit className="h-8 w-8 text-indigo-500" />
              <span className="font-bold text-2xl text-white">AING™</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              The universal framework to harmonize human expertise, AI intelligence, and adaptive workflows.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="mt-4 flex sm:max-w-xs">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <Button type="submit" className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white flex-shrink-0" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
          {sitemap.slice(0, 4).map((section) => (
            <div key={section.title} className="mt-4 md:mt-0">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.children?.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-base text-gray-300 hover:text-white">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">GitHub</span><Github className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></a>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} AING Global Alliance. All rights reserved.
            </p>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Built with ❤️ at Cloudflare. AI capabilities are subject to usage limits across all users.</p>
            <div className="mt-2 space-x-4">
              <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-gray-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}