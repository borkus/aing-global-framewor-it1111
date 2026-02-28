import React, { useEffect, useState, ComponentPropsWithoutRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PageShell } from '@/components/layout/PageShell';
import { ModuleDetailPageShell } from '@/components/layout/ModuleDetailPageShell';
import { sitemap } from '@/lib/sitemap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// A simple cache to avoid re-fetching markdown content
const contentCache = new Map<string, string>();
export default function DynamicContentPage() {
  const params = useParams();
  const location = useLocation();
  const [content, setContent] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const slug = params['*'] || '';
  const isCapabilityModulePage = slug.startsWith('capability-modules/');
  useEffect(() => {
    const path = `/${slug}`;
    const navItem = sitemap
      .flatMap(section => section.children || [section])
      .find(child => child.href === path);
    if (!navItem) {
      setPageTitle('404: Page Not Found');
      setContent('The page you are looking for does not exist. Please check the URL or navigate back home.');
      setIsLoading(false);
      setError('Page not found');
      return;
    }
    let titleToSet = navItem.title;
    if (isCapabilityModulePage && !navItem.isPillar) {
      titleToSet = `${navItem.title} Certification`;
    }
    setPageTitle(titleToSet);
    const fetchContent = async () => {
      if (contentCache.has(path)) {
        setContent(contentCache.get(path)!);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/content/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Could not load content for ${slug}. Status: ${response.status}`);
        }
        const text = await response.text();
        contentCache.set(path, text);
        setContent(text);
      } catch (err) {
        console.error(err);
        setError('Failed to load page content. This page may not have been created yet.');
        setContent('');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [slug, isCapabilityModulePage]);
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} - AING™`;
    }
  }, [pageTitle]);
  const PageLayout = isCapabilityModulePage ? ModuleDetailPageShell : PageShell;
  return (
    <PageLayout title={pageTitle}>
      {isLoading && <p>Loading content...</p>}
      {error && <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>}
      {!isLoading && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-3xl font-semibold mt-6 mb-3 border-b pb-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 pl-4 space-y-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 pl-4 space-y-2" {...props} />,
            li: ({node, ...props}) => <li className="mb-2" {...props} />,
            a: ({node, ...props}) => <a className="text-indigo-600 hover:underline" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-muted-foreground" {...props} />,
            code: ({ node, inline, className, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean; node?: any }) => {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <pre className="bg-gray-900 text-white p-4 rounded-md my-4 overflow-x-auto"><code className={className} {...props}>{children}</code></pre>
              ) : (
                <code className="bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 px-1 py-0.5 rounded-sm" {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </PageLayout>
  );
}