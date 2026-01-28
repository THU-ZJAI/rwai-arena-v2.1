'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Arena } from '@/lib/types';
import {
  Construction,
  Settings,
  CheckCircle2,
  BarChart3,
  Users,
  ArrowLeft,
  Github,
  Mail,
  Star,
  Zap,
  DollarSign,
  Shield,
  TrendingUp,
  Cpu,
  Users as UsersIcon,
  FileText,
  ExternalLink
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { motion } from 'framer-motion';

type TabType = 'overview' | 'implementation' | 'requirements' | 'validation-report' | 'project-report';

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
    { key: 'requirements', label: locale === 'zh' ? '需求文档' : 'Requirements', icon: CheckCircle2, color: 'green' },
    { key: 'validation-report', label: locale === 'zh' ? '验证报告' : 'Validation Report', icon: BarChart3, color: 'amber' },
    { key: 'project-report', label: locale === 'zh' ? '项目报告' : 'Project Report', icon: Users, color: 'red' },
  ];

  // Extract metrics from arena
  const metrics = {
    quality: arena.metrics?.quality || 95,
    efficiency: arena.metrics?.efficiency || 88,
    cost: arena.metrics?.cost || 92,
    trust: arena.metrics?.trust || 90,
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
                  {arena.title[locale as keyof typeof arena.title]}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                  {arena.description[locale as keyof typeof arena.description]}
                </p>
              </div>

              {/* Status Badge */}
              <div className="hidden sm:block">
                <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  {locale === 'zh' ? '已验证' : 'Verified'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 4-Pillar Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12"
          >
            {[
              { name: locale === 'zh' ? '质量' : 'Quality', value: metrics.quality, icon: Star },
              { name: locale === 'zh' ? '效率' : 'Efficiency', value: metrics.efficiency, icon: Zap },
              { name: locale === 'zh' ? '成本' : 'Cost', value: metrics.cost, icon: DollarSign },
              { name: locale === 'zh' ? '信任' : 'Trust', value: metrics.trust, icon: Shield },
            ].map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-4 sm:p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <metric.icon className="h-5 w-5 text-primary mb-2" />
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {metric.value}%
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <div className="text-sm font-medium text-gray-600 mt-2">
                  {metric.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={arena.github?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-gray-800 transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              {locale === 'zh' ? '查看代码' : 'View on GitHub'}
            </a>
            <a
              href={`mailto:contact@rwai.ai?subject=Arena: ${arena.title[locale as keyof typeof arena.title]}`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white px-6 py-3 text-base font-semibold text-primary hover:bg-primary-50 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              {locale === 'zh' ? '联系专家' : 'Contact Expert'}
            </a>
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
            {/* Gap Analysis Card */}
            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {locale === 'zh' ? '差距分析' : 'Gap Analysis'}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {locale === 'zh'
                  ? '对比标准版与专家版的功能差异'
                  : 'Compare features between standard and expert versions'
                }
              </p>

              <div className="space-y-3 mb-4">
                {[
                  { name: locale === 'zh' ? '完整源代码' : 'Complete Source Code', standard: true, expert: true },
                  { name: locale === 'zh' ? '部署指南' : 'Deployment Guide', standard: true, expert: true },
                  { name: locale === 'zh' ? '专家支持' : 'Expert Support', standard: false, expert: true },
                  { name: locale === 'zh' ? '定制开发' : 'Custom Development', standard: false, expert: true },
                ].map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        feature.standard
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {locale === 'zh' ? '标准' : 'Standard'}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {locale === 'zh' ? '专家' : 'Expert'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="mailto:contact@rwai.ai?subject=Expert Version Inquiry"
                className="block w-full text-center rounded-lg border-2 border-primary bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-50 transition-colors"
              >
                {locale === 'zh' ? '联系获取专家版' : 'Contact for Expert Version'}
              </a>
            </div>

            {/* Technical Details Card */}
            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {locale === 'zh' ? '技术详情' : 'Technical Details'}
                </h3>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {locale === 'zh' ? '技术栈' : 'Tech Stack'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'TypeScript', 'Tailwind CSS', 'Claude API'].map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-gray-900">
                    {locale === 'zh' ? '团队规模' : 'Team Size'}
                  </span>
                  <span className="text-gray-600">3-5 {locale === 'zh' ? '开发者' : 'developers'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  {locale === 'zh' ? '文档链接' : 'Documentation'}
                </h4>
                <div className="space-y-2">
                  {[
                    { title: locale === 'zh' ? 'API 文档' : 'API Docs', href: '#' },
                    { title: locale === 'zh' ? '架构图' : 'Architecture', href: '#' },
                  ].map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.href}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary-700"
                    >
                      <FileText className="h-4 w-4" />
                      {doc.title}
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
