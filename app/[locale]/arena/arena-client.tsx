'use client';

import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { arenas, categories, industries } from '@/lib/data';
import type { Arena } from '@/lib/types';
import { Shield, Trophy, ArrowRight, Filter, ArrowUpDown, ArrowUp, ArrowDown, Code2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

type SortField = 'name' | 'status' | 'category' | 'industry' | 'speed' | 'quality' | 'security' | 'cost';
type SortOrder = 'asc' | 'desc';

// Metric value translations (Chinese to English)
const metricValueTranslations: Record<string, string> = {
  '很快': 'Very Fast',
  '较快': 'Relatively Fast',
  '中等': 'Medium',
  '较慢': 'Relatively Slow',
  '很高': 'Very High',
  '较高': 'Relatively High',
  '较低': 'Relatively Low',
  '较优': 'Optimal',
};

// Translate metric value to English
function translateMetricValue(value: string, isChina: boolean): string {
  if (isChina) return value;
  return metricValueTranslations[value] || value;
}

interface ArenaClientProps {
  params: Promise<{ locale: string }>;
  pageTitle: string;
  pageSubtitle: string;
}

export default function ArenaClient({ params, pageTitle, pageSubtitle }: ArenaClientProps) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const t = useTranslations('arena');
  const isChina = locale === 'zh';

  // Initialize state from URL query parameters
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortField>('status'); // Default sort by verification status
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc'); // Ascending (in-verification first, verified last)

  // Read URL query parameters and update filters
  React.useEffect(() => {
    const industryParam = searchParams.get('industry');
    const categoryParam = searchParams.get('category');

    if (industryParam) {
      setSelectedIndustry(industryParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredArenas = useMemo(() => {
    let filtered = arenas;

    // Filter by industry (check if industry string contains the selected industry OR is "通用")
    if (selectedIndustry !== 'all') {
      const industryKey = Object.keys(industries).find(key =>
        industries[key as keyof typeof industries].zh === selectedIndustry ||
        industries[key as keyof typeof industries].en === selectedIndustry
      );
      if (industryKey) {
        const targetIndustry = industries[industryKey as keyof typeof industries].zh;
        filtered = filtered.filter(a => a.industry.includes(targetIndustry) || a.industry.includes('通用'));
      }
    }

    // Filter by category (check if category string contains the selected category OR is "通用")
    if (selectedCategory !== 'all') {
      const categoryKey = Object.keys(categories).find(key =>
        categories[key as keyof typeof categories].zh === selectedCategory ||
        categories[key as keyof typeof categories].en === selectedCategory
      );
      if (categoryKey) {
        const targetCategory = categories[categoryKey as keyof typeof categories].zh;
        filtered = filtered.filter(a => a.category.includes(targetCategory) || a.category.includes('通用'));
      }
    }

    // Metric sort order (higher is better)
    const metricOrder: Record<string, number> = {
      '很慢': 0, '较低': 0,
      '中等': 1,
      '较快': 2, '较高': 2,
      '很快': 3, '很高': 3,
      '较优': 3,
    };

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          const titleA = a.title[locale as keyof typeof a.title] || a.title.zh;
          const titleB = b.title[locale as keyof typeof b.title] || b.title.zh;
          comparison = titleA.localeCompare(titleB);
          break;
        case 'status':
          comparison = (a.verificationStatus === '已验证' ? 1 : 0) - (b.verificationStatus === '已验证' ? 1 : 0);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'industry':
          comparison = a.industry.localeCompare(b.industry);
          break;
        case 'speed':
          comparison = (metricOrder[a.metrics.speed] || 1) - (metricOrder[b.metrics.speed] || 1);
          break;
        case 'quality':
          comparison = (metricOrder[a.metrics.quality] || 1) - (metricOrder[b.metrics.quality] || 1);
          break;
        case 'security':
          comparison = (metricOrder[a.metrics.security] || 1) - (metricOrder[b.metrics.security] || 1);
          break;
        case 'cost':
          comparison = (metricOrder[a.metrics.cost] || 1) - (metricOrder[b.metrics.cost] || 1);
          break;
      }

      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  }, [selectedIndustry, selectedCategory, sortBy, sortOrder, locale]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-3 w-3" />;
    }
    return sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  // Calculate stats
  const stats = {
    total: arenas.length,
    verified: arenas.filter(a => a.verificationStatus === '已验证').length,
    inVerification: arenas.filter(a => a.verificationStatus === '验证中').length,
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-white py-16 sm:py-24 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="flex-1">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
                  {pageTitle}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 font-normal max-w-2xl">
                  {pageSubtitle}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 lg:w-auto lg:min-w-[400px]">
                {[
                  { icon: Code2, label: isChina ? '总方案' : 'Total', value: stats.total },
                  { icon: Trophy, label: isChina ? '已验证' : 'Verified', value: stats.verified },
                  { icon: Shield, label: isChina ? '验证中' : 'In Verification', value: stats.inVerification },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                      <stat.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Sidebar - Filters */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="sticky top-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {isChina ? '按行业筛选' : 'Filter by Industry'}
                </h3>
                <div className="space-y-1 mb-6">
                  <button
                    onClick={() => setSelectedIndustry('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedIndustry === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isChina ? '全部行业' : 'All Industries'}
                  </button>
                  {Object.entries(industries).map(([key, industry]) => {
                    const Icon = industry.icon;
                    const count = arenas.filter(a => a.industry.includes(industry.zh) || a.industry.includes('通用')).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedIndustry(industry.zh)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          selectedIndustry === industry.zh
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1">{isChina ? industry.zh : industry.en}</span>
                        <span className="text-xs opacity-50">({count})</span>
                      </button>
                    );
                  })}
                </div>

                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {isChina ? '按类别筛选' : 'Filter by Category'}
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isChina ? '全部类别' : 'All Categories'}
                  </button>
                  {Object.entries(categories).map(([key, category]) => {
                    const count = arenas.filter(a => a.category.includes(category.zh) || a.category.includes('通用')).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(category.zh)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === category.zh
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {isChina ? category.zh : category.en}
                        <span className="ml-2 text-xs opacity-50">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Sort Controls */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">
                    {isChina ? '排序方式：' : 'Sort by:'}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { field: 'name' as SortField, label: isChina ? '名称' : 'Name' },
                      { field: 'status' as SortField, label: isChina ? '验证状态' : 'Status' },
                      { field: 'speed' as SortField, label: isChina ? '速度' : 'Speed' },
                      { field: 'quality' as SortField, label: isChina ? '质量' : 'Quality' },
                      { field: 'security' as SortField, label: isChina ? '安全' : 'Security' },
                      { field: 'cost' as SortField, label: isChina ? '成本' : 'Cost' },
                    ].map((sortOption) => (
                      <button
                        key={sortOption.field}
                        onClick={() => handleSort(sortOption.field)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          sortBy === sortOption.field
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {sortOption.label}
                        {getSortIcon(sortOption.field)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arena Cards */}
              <div className="grid grid-cols-1 gap-6">
                {filteredArenas.length === 0 ? (
                  <div className="text-center py-16">
                    <Code2 className="h-16 w-16 mx-auto mb-6 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {isChina ? '暂无此组合的方案' : 'No Solutions Found'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {isChina ? '该行业与类别的组合正在开发中' : 'This combination is coming soon'}
                    </p>
                    <Button
                      onClick={() => { setSelectedIndustry('all'); setSelectedCategory('all'); }}
                      variant="secondary"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      {isChina ? '清除筛选' : 'Clear Filters'}
                    </Button>
                  </div>
                ) : (
                  filteredArenas.map((arena) => (
                    <div
                      key={arena.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {arena.title[locale as keyof typeof arena.title] || arena.title.zh}
                            </h3>
                            {arena.verificationStatus === '已验证' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                <Trophy className="h-3 w-3" />
                                {isChina ? '已验证' : 'Verified'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                <Shield className="h-3 w-3" />
                                {isChina ? '验证中' : 'In Verification'}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{isChina ? arena.highlights : arena.highlightsEn}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                              {isChina ? arena.industry : arena.industryEn}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                              {isChina ? arena.category : arena.categoryEn}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Champion */}
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {isChina ? '擂主' : 'Champion'}
                        </div>
                        <div className="text-sm text-gray-900">{isChina ? arena.champion : arena.championEn}</div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        {[
                          { label: isChina ? '速度' : 'Speed', value: translateMetricValue(arena.metrics.speed, isChina) },
                          { label: isChina ? '质量' : 'Quality', value: translateMetricValue(arena.metrics.quality, isChina) },
                          { label: isChina ? '安全' : 'Security', value: translateMetricValue(arena.metrics.security, isChina) },
                          { label: isChina ? '成本' : 'Cost', value: translateMetricValue(arena.metrics.cost, isChina) },
                        ].map((metric) => (
                          <div key={metric.label} className="text-center">
                            <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                            <div className="text-sm font-semibold text-gray-900">{metric.value || '-'}</div>
                          </div>
                        ))}
                      </div>

                      {/* View Details Button */}
                      <div className="flex justify-end">
                        <Button
                          asChild
                          size="small"
                          className="bg-gray-900 text-white hover:bg-gray-800"
                        >
                          <Link href={`/${locale}/arena/${arena.folderId}`}>
                            {isChina ? '查看详情' : 'View Details'}
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
