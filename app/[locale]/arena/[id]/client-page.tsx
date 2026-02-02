'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Arena } from '@/lib/types';
import {
  BarChart3,
  ArrowLeft,
  Mail,
  Star,
  Zap,
  DollarSign,
  Shield,
  CheckCircle2,
  Settings,
  Users,
  FileText,
  Github,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { motion } from 'framer-motion';

type TabType = 'overview' | 'implementation' | 'requirements' | 'validation-report' | 'project-report';

// Metric value to star rating
const metricToStars: Record<string, number> = {
  '很慢': 1,
  '较低': 1,
  '慢': 1,
  '差': 1,
  '中等': 2,
  '较快': 3,
  '较高': 3,
  '很较': 3,
  '很快': 3,
  '很高': 3,
  '较优': 3,
  '优': 3,
};

// Convert metric value to stars
function getStarRating(value: string): number {
  return metricToStars[value] || 2;
}

// Speed to time mapping
const speedToTimeMapping: Record<string, string> = {
  '很快': '1-2天',
  '较快': '一周',
  '中等': '两周',
  '较慢': '一月',
};

// Extract time from description
function extractTimeFromDescription(description: string): string {
  const timePatterns: [RegExp, string][] = [
    [/(\d+[-~]\d+[天小时分钟]+)/, '$1'],
    [/两天半/, '2-3天'],
    [/三天半/, '3-4天'],
    [/四天半/, '4-5天'],
    [/五天半/, '5-6天'],
    [/半天/, '半天'],
    [/(一周|七天)/, '一周'],
    [/(两周|十四天)/, '两周'],
    [/(十天)/, '10天'],
    [/(九天)/, '9天'],
    [/(八天)/, '8天'],
    [/(七天的)/, '7天'],
    [/(六天)/, '6天'],
    [/(五天)/, '5天'],
    [/(四天)/, '4天'],
    [/(三天)/, '3天'],
    [/(两天)(?!半)/, '2天'],
    [/(一天)/, '1天'],
    [/(半小时|30分钟)/, '半小时'],
    [/(一小时|60分钟)/, '1小时'],
    [/(两小时|2小时)/, '2小时'],
    [/(三小时|3小时)/, '3小时'],
    [/(四小时|4小时)/, '4小时'],
    [/(五小时|5小时)/, '5小时'],
    [/(六小时|6小时)/, '6小时'],
  ];

  for (const [pattern, replacement] of timePatterns) {
    const match = description.match(pattern);
    if (match) {
      return replacement;
    }
  }

  return '';
}

interface ArenaDetailClientProps {
  arena: Arena;
  locale: string;
  arenaId: string;
  initialContent: { [key: string]: string };
  hasContent: boolean;
}

export function ArenaDetailClient({ arena, locale, arenaId, initialContent, hasContent }: ArenaDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const content = initialContent;

  // Handle URL hash for direct tab linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as TabType;
      if (['overview', 'implementation', 'requirements', 'validation-report', 'project-report'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const tabs: { key: TabType; label: string; icon: any; color?: string }[] = [
    { key: 'overview', label: locale === 'zh' ? '概览' : 'Overview', icon: BarChart3 },
    { key: 'implementation', label: locale === 'zh' ? '实施指南' : 'Implementation', icon: Settings, color: 'purple' },
    { key: 'requirements', label: locale === 'zh' ? '需求文档' : 'Requirements', icon: FileText, color: 'green' },
    { key: 'validation-report', label: locale === 'zh' ? '验证报告' : 'Validation Report', icon: CheckCircle2, color: 'amber' },
    { key: 'project-report', label: locale === 'zh' ? '项目报告' : 'Project Report', icon: Users, color: 'red' },
  ];

  // Extract metrics from arena
  const metrics = {
    quality: arena.metrics?.quality || '较高',
    speed: arena.metrics?.speed || '较快',
    cost: arena.metrics?.cost || '较优',
    security: arena.metrics?.security || '较高',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-primary-50/30 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href={`/${locale}/arena`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {locale === 'zh' ? '返回Arena列表' : 'Back to Arena List'}
            </Link>
          </nav>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                  {arena.title[locale as keyof typeof arena.title] || arena.title.zh}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                  {arena.highlights}
                </p>
              </div>

              {/* Status Badge */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    {locale === 'zh' ? '已验证' : 'Verified'}
                  </span>
                  {/* GitHub Stars */}
                  {arena.githubStars !== undefined && (
                    <div className="flex items-center gap-1">
                      <Github className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500">
                        {arena.githubStars.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4-Pillar Metrics - Clean horizontal layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              {/* Left: Metrics icons - horizontal, left-aligned, no background */}
              <div className="flex items-center gap-6">
                {/* Speed - Show time instead of stars */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-violet-500">
                    <Zap className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-violet-600 leading-tight">
                      {extractTimeFromDescription(arena.highlights) || speedToTimeMapping[metrics.speed] || metrics.speed}
                    </div>
                    <div className="text-xs text-gray-500">{locale === 'zh' ? '速度' : 'Speed'}</div>
                  </div>
                </div>
                {/* Quality, Security, Cost - Star ratings */}
                {[
                  { label: locale === 'zh' ? '质量' : 'Quality', value: metrics.quality, stars: getStarRating(metrics.quality), icon: Star, color: 'text-amber-500' },
                  { label: locale === 'zh' ? '安全' : 'Security', value: metrics.security, stars: getStarRating(metrics.security), icon: Shield, color: 'text-emerald-500' },
                  { label: locale === 'zh' ? '成本' : 'Cost', value: metrics.cost, stars: getStarRating(metrics.cost), icon: DollarSign, color: 'text-blue-500' },
                ].map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="flex items-center gap-2">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${metric.color}`}>
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-center gap-0.5">
                          {[1, 2, 3].map((star) => (
                            <svg
                              key={star}
                              className={`h-3.5 w-3.5 ${
                                star <= metric.stars
                                  ? `${metric.color} fill-current`
                                  : 'text-gray-200 fill-current'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: CTA Button */}
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
              >
                <Mail className="h-4 w-4" />
                {locale === 'zh' ? '联系我们' : 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-0" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const colorClasses = tab.color ? {
                purple: 'text-purple-600',
                green: 'text-green-600',
                amber: 'text-amber-600',
                red: 'text-red-600',
              }[tab.color] : '';

              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    window.location.hash = tab.key;
                  }}
                  role="tab"
                  className={`group relative flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? `border-primary text-gray-900 bg-gradient-to-r from-primary-50 to-transparent`
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${activeTab === tab.key ? colorClasses : ''}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-lg max-w-none">
              {activeTab === 'overview' && content.overview && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={markdownComponents}
                >
                  {content.overview}
                </ReactMarkdown>
              )}

              {activeTab === 'implementation' && content.implementation && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={markdownComponents}
                >
                  {content.implementation}
                </ReactMarkdown>
              )}

              {activeTab === 'requirements' && content.requirements && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={markdownComponents}
                >
                  {content.requirements}
                </ReactMarkdown>
              )}

              {activeTab === 'validation-report' && content['validation-report'] && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={markdownComponents}
                >
                  {content['validation-report']}
                </ReactMarkdown>
              )}

              {activeTab === 'project-report' && content['project-report'] && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={markdownComponents}
                >
                  {content['project-report']}
                </ReactMarkdown>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom markdown components to match reference styling
const markdownComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4 mt-12 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3 mt-12" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-bold text-gray-900 mb-2 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="mb-4 text-gray-700 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  a: ({ href, children, ...props }: any) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-700 underline font-medium"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="space-y-2 mb-6 list-disc list-inside text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="space-y-2 mb-6 list-decimal list-inside text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: any) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap" {...props}>
      {children}
    </td>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-4 italic text-gray-600 bg-gray-50 rounded-r" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ inline, className, children, ...props }: any) => {
    if (inline) {
      return (
        <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm font-mono border border-gray-300" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6" {...props}>
      {children}
    </pre>
  ),
  hr: ({ ...props }: any) => <hr className="my-8 border-t border-gray-300" {...props} />,
};
