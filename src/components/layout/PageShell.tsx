import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { sitemap } from '@/lib/sitemap';
interface PageShellProps {
  title: string;
  children: React.ReactNode;
}
const generateBreadcrumbs = (pathname: string) => {
  const pathParts = pathname.split('/').filter(part => part);
  const breadcrumbs = [{ href: '/', title: 'Home', icon: Home }];
  let currentPath = '';
  pathParts.forEach(part => {
    currentPath += `/${part}`;
    const navItem = sitemap
      .flatMap(section => section.children || [])
      .find(child => child.href === currentPath);
    if (navItem) {
      breadcrumbs.push({ href: navItem.href, title: navItem.title, icon: null });
    }
  });
  return breadcrumbs;
};
export function PageShell({ title, children }: PageShellProps) {
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
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}