'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { arenas, categories, industries, type Arena, type Category, type Industry } from '@/lib/data';
import Link from 'next/link';
import { Star, GitFork, Shield, Trophy, ArrowRight, Filter, CheckCircle2, ArrowUpDown, ArrowUp, ArrowDown, BarChart3, Code2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

type SortField = 'name' | 'status' | 'category' | 'industry' | 'quality' | 'efficiency' | 'cost' | 'trust' | 'stars' | 'forks';
type SortOrder = 'asc' | 'desc';

export default function ArenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const t = useTranslations('arena');
  const isChina = locale === 'zh';

  // Initialize state from URL query parameters
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortField>('stars');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Read URL query parameters and update filters
  useEffect(() => {
    const industryParam = searchParams.get('industry');
    const categoryParam = searchParams.get('category');

    if (industryParam && industryParam in industries) {
      setSelectedIndustry(industryParam as Industry);
    }
    if (categoryParam && categoryParam in categories) {
      setSelectedCategory(categoryParam as Category);
    }
  }, [searchParams]);

  const filteredArenas = useMemo(() => {
    let filtered = arenas;

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(a => a.industry === selectedIndustry);
    }

    if (selectedCategory !== 'all' && selectedCategory !== 'general') {
      filtered = filtered.filter(a => a.category === selectedCategory || a.category === 'general');
    }

    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.title[locale as 'en' | 'zh'].localeCompare(b.title[locale as 'en' | 'zh']);
          break;
        case 'status':
          comparison = (a.status === 'verified' ? 1 : 0) - (b.status === 'verified' ? 1 : 0);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'industry':
          comparison = a.industry.localeCompare(b.industry);
          break;
        case 'stars':
          comparison = (b.github?.stars || 0) - (a.github?.stars || 0);
          break;
        case 'forks':
          comparison = (b.github?.forks || 0) - (a.github?.forks || 0);
          break;
        default:
          comparison = b.metrics[sortBy] - a.metrics[sortBy];
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

  const getCategoryIcon = (id: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      service: Code2,
      management: Trophy,
      marketing: BarChart3,
      'risk-control': Shield,
      operations: CheckCircle2,
    };
    return icons[id] || Code2;
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
                  {isChina ? '真实AI竞技场' : 'Real AI Arena'}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 font-normal max-w-2xl">
                  {isChina ? '为你的业务任务，定义唯一最优实践' : 'Define the Best Practice for Your Business Tasks'}
                </p>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:w-auto lg:min-w-[600px]">
                {[
                  { icon: Code2, title: isChina ? '开源透明' : 'Open Source', desc: isChina ? '完全开源' : 'Fully Open Source' },
                  { icon: CheckCircle2, title: isChina ? '专家验证' : 'Expert Verified', desc: isChina ? '专家团队验证' : 'Verified by Experts' },
                  { icon: Trophy, title: '1:1可复现', desc: isChina ? '可完全复现' : 'Reproducible' },
                ].map((prop, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 h-full"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                      <prop.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="text-base font-semibold text-gray-900 mb-2">{prop.title}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{prop.desc}</div>
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
            {/* Left Sidebar - Industry Filter */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="sticky top-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {t('filterByIndustry')}
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedIndustry('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedIndustry === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isChina ? '全部行业' : 'All Industries'}
                    <span className="ml-2 text-xs opacity-50">({arenas.length})</span>
                  </button>
                  {(Object.entries(industries) as [Industry, typeof industries[Industry]][]).map(([key, industry]) => {
                    const Icon = industry.icon;
                    const count = arenas.filter(a => a.industry === key).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedIndustry(key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          selectedIndustry === key
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="flex-1">{industry[locale as 'en' | 'zh']}</span>
                        <span className="text-xs opacity-50">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Category Tabs */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {t('filterByCategory')}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {isChina ? '全部类别' : 'All'}
                  </button>
                  {(Object.entries(categories) as [Category, typeof categories[Category]][]).map(([key, category]) => {
                    const Icon = getCategoryIcon(key);
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                          selectedCategory === key
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {category[locale as 'en' | 'zh']}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Arena Ranking Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {[
                          { field: 'name' as SortField, label: isChina ? 'Arena名称' : 'Arena Name' },
                          { field: 'action' as SortField, label: isChina ? '操作' : 'Action', sortable: false },
                          { field: 'status' as SortField, label: isChina ? '验证状态' : 'Status' },
                          { field: 'category' as SortField, label: isChina ? '类别' : 'Category' },
                          { field: 'industry' as SortField, label: isChina ? '行业' : 'Industry' },
                          { field: 'quality' as SortField, label: t('sortOptions.quality') },
                          { field: 'efficiency' as SortField, label: t('sortOptions.efficiency') },
                          { field: 'cost' as SortField, label: t('sortOptions.cost') },
                          { field: 'trust' as SortField, label: t('sortOptions.trust') },
                          { field: 'stars' as SortField, label: 'Stars' },
                          { field: 'forks' as SortField, label: 'Forks' },
                        ].map((col) => (
                          <th
                            key={col.field}
                            className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap ${
                              col.sortable !== false ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
                            }`}
                            onClick={() => col.sortable !== false && handleSort(col.field)}
                          >
                            <div className="flex items-center gap-1">
                              {col.label}
                              {col.sortable !== false && (
                                <span className="text-gray-400">
                                  {getSortIcon(col.field)}
                                </span>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredArenas.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="px-4 py-16 text-center">
                            <div className="flex flex-col items-center">
                              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                <Code2 className="h-10 w-10 text-gray-400" />
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {isChina ? '暂无此组合的方案' : 'No Solutions Found'}
                              </h3>
                              <p className="text-gray-600 mb-4 max-w-md">
                                {isChina
                                  ? '该行业与类别的组合正在开发中。您可以查看其他方案，或联系我们提交您的竞技场方案。'
                                  : 'This industry and category combination is coming soon.'}
                              </p>
                              <Button
                                onClick={() => { setSelectedIndustry('all'); setSelectedCategory('all'); }}
                                variant="outline"
                                size="sm"
                              >
                                <Filter className="mr-2 h-4 w-4" />
                                {isChina ? '清除筛选' : 'Clear Filters'}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredArenas.map((arena) => (
                          <tr
                            key={arena.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            {/* Arena Name */}
                            <td className="px-4 py-4">
                              <div className="max-w-xs">
                                <div className="text-sm font-semibold text-gray-900 truncate">
                                  {arena.title[locale as 'en' | 'zh']}
                                </div>
                              </div>
                            </td>

                            {/* Action */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Button asChild size="sm" className="text-xs bg-gray-900 text-white hover:bg-gray-800">
                                <Link href={`/${locale}/arena/${arena.id}`}>
                                  {isChina ? '查看详情' : 'View Details'}
                                  <ArrowRight className="ml-1 h-3 w-3" />
                                </Link>
                              </Button>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              {arena.status === 'verified' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  <Trophy className="h-3 w-3" />
                                  {t('verified')}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                  <Shield className="h-3 w-3" />
                                  {t('inArena')}
                                </span>
                              )}
                            </td>

                            {/* Category */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                {React.createElement(getCategoryIcon(arena.category), { className: "h-4 w-4 text-gray-500" })}
                                <span className="text-sm text-gray-700">
                                  {categories[arena.category][locale as 'en' | 'zh']}
                                </span>
                              </div>
                            </td>

                            {/* Industry */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                {React.createElement(industries[arena.industry].icon, { className: "h-4 w-4 text-gray-500" })}
                                <span className="text-sm text-gray-700">
                                  {industries[arena.industry][locale as 'en' | 'zh']}
                                </span>
                              </div>
                            </td>

                            {/* Quality */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {arena.metrics.quality}
                              </div>
                            </td>

                            {/* Efficiency */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {arena.metrics.efficiency}
                              </div>
                            </td>

                            {/* Cost */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {arena.metrics.cost}
                              </div>
                            </td>

                            {/* Trust */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {arena.metrics.trust}
                              </div>
                            </td>

                            {/* Stars */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              {arena.github ? (
                                <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                                  <Star className="h-3.5 w-3.5 fill-gray-700 text-gray-700" />
                                  {arena.github.stars.toLocaleString()}
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>

                            {/* Forks */}
                            <td className="px-4 py-4 whitespace-nowrap">
                              {arena.github ? (
                                <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                                  <GitFork className="h-3.5 w-3.5 text-gray-500" />
                                  {arena.github.forks}
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats - Moved to bottom */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { label: isChina ? '总方案' : 'Total', value: arenas.length, icon: Code2 },
              { label: isChina ? '已验证' : 'Verified', value: arenas.filter(a => a.status === 'verified').length, icon: CheckCircle2 },
              { label: 'GitHub', value: `${Math.round(arenas.reduce((acc, a) => acc + (a.github?.stars || 0), 0) / 1000)}K`, icon: Star },
              { label: isChina ? '平均分' : 'Avg Score', value: Math.round(arenas.reduce((acc, a) => acc + a.metrics.quality, 0) / arenas.length), icon: BarChart3 },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center"
              >
                <stat.icon className="h-6 w-6 mx-auto mb-3 text-gray-400" />
                <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
