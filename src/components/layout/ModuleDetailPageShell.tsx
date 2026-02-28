import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, Download, Award, Wrench, BookOpen } from 'lucide-react';
import { sitemap } from '@/lib/sitemap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface ModuleDetailPageShellProps {
  title: string;
  children: React.ReactNode;
}
const generateBreadcrumbs = (pathname: string) => {
  const pathParts = pathname.split('/').filter(part => part);
  const breadcrumbs = [{ href: '/', title: 'Home', icon: Home }];
  let currentPath = '';
  if (pathname.startsWith('/capability-modules/')) {
    breadcrumbs.push({ href: '/capability-modules', title: 'Capability Modules', icon: null });
    const navItem = sitemap
      .find(section => section.href === '/capability-modules')
      ?.children?.find(child => child.href === pathname);
    if (navItem) {
      breadcrumbs.push({ href: navItem.href, title: navItem.title, icon: null });
    }
  }
  return breadcrumbs;
};
export function ModuleDetailPageShell({ title, children }: ModuleDetailPageShellProps) {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href}>
                  <div className="flex items-center">
                    {index > 0 && (
                      <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    )}
                    <Link
                      to={crumb.href}
                      className={`ml-2 text-sm font-medium ${index === breadcrumbs.length - 1 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                    >
                      {crumb.icon && <crumb.icon className="flex-shrink-0 h-5 w-5 inline-block -mt-1 mr-1" aria-hidden="true" />}
                      {crumb.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <main className="lg:col-span-8 prose prose-lg dark:prose-invert max-w-none">
            {children}
          </main>
          <aside className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    <span>Module Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">Quickly access key information and assets for this module.</p>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Download className="mr-2 h-4 w-4" /> Download Whitepaper
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-indigo-600" />
                    <span>Certification Path</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">This module is a key component of the following certifications:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="font-medium"><Link to="/certifications/practitioner" className="hover:underline">AING Practitioner (APC)</Link></li>
                    <li className="font-medium"><Link to="/certifications/architect" className="hover:underline">AING Architect (AAC)</Link></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}