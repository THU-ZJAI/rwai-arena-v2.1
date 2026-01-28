'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo, use } from 'react';
import { Badge, RadarChart } from '@/components/ui';
import { arenas, categories, industries } from '@/lib/data';
import { Arena, Category, Industry } from '@/lib/types';
import { Star, GitFork } from 'lucide-react';
import Link from 'next/link';

export default function ArenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('arena');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [sortBy, setSortBy] = useState<'quality' | 'efficiency' | 'cost' | 'trust' | 'stars'>('quality');

  // Filter and sort arenas
  const filteredArenas = useMemo(() => {
    let filtered = arenas;

    // Filter by category
    if (selectedCategory !== 'all' && selectedCategory !== 'general') {
      filtered = filtered.filter(
        (arena) => arena.category === selectedCategory || arena.category === 'general'
      );
    }

    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter((arena) => arena.industry === selectedIndustry);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'stars') {
        return b.github.stars - a.github.stars;
      }
      return b.metrics[sortBy] - a.metrics[sortBy];
    });

    return filtered;
  }, [selectedCategory, selectedIndustry, sortBy]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-bg-secondary py-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-h1 font-bold text-text-primary mb-4">{t('title')}</h1>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-bg-primary border-b border-gray-200 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t('filterByCategory')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                className="w-full px-4 py-2 border border-gray-200 rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {Object.entries(categories).map(([key, { en }]) => (
                  <option key={key} value={key}>
                    {en}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t('filterByIndustry')}
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value as Industry | 'all')}
                className="w-full px-4 py-2 border border-gray-200 rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Industries</option>
                {Object.entries(industries).map(([key, { en }]) => (
                  <option key={key} value={key}>
                    {en}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t('sortBy')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-4 py-2 border border-gray-200 rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="quality">{t('sortOptions.quality')}</option>
                <option value="efficiency">{t('sortOptions.efficiency')}</option>
                <option value="cost">{t('sortOptions.cost')}</option>
                <option value="trust">{t('sortOptions.trust')}</option>
                <option value="stars">{t('sortOptions.stars')}</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-text-secondary">
            Showing {filteredArenas.length} of {arenas.length} blueprints
          </div>
        </div>
      </section>

      {/* Arena Grid */}
      <section className="py-section bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredArenas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">No arenas found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card">
              {filteredArenas.map((arena) => (
                <ArenaCard key={arena.id} arena={arena} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ArenaCard({ arena, locale }: { arena: Arena; locale: string }) {
  const t = useTranslations('arena');
  const categoryLabel = categories[arena.category][locale as keyof typeof categories[typeof arena.category]];
  const industryLabel = industries[arena.industry][locale as keyof typeof industries[typeof arena.industry]];

  return (
    <Link href={`/${locale}/arena/${arena.id}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-card p-card hover:shadow-card-hover transition-all duration-default hover:-translate-y-1 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <Badge variant={arena.status === 'verified' ? 'verified' : 'in-arena'}>
            {arena.status === 'verified' ? t('verified') : t('inArena')}
          </Badge>
          <RadarChart metrics={arena.metrics} size={80} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-grow">
          {arena.title[locale as keyof typeof arena.title]}
        </h3>

        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <Badge variant="industry">{industryLabel}</Badge>
          <Badge variant="category">{categoryLabel}</Badge>
        </div>

        {/* Description */}
        <p className="text-body-sm text-text-secondary mb-4 line-clamp-3">
          {arena.description[locale as keyof typeof arena.description]}
        </p>

        {/* Highlights */}
        {arena.highlights.length > 0 && (
          <ul className="mb-4 space-y-1">
            {arena.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-xs text-text-secondary flex items-start gap-1">
                <span className="text-primary mt-0.5">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Metrics */}
        <div className="flex items-center gap-3 mb-4 text-sm text-text-secondary">
          <MetricItem icon={<Star className="w-3.5 h-3.5" />} value={arena.metrics.quality.toString() + '%'} />
          <MetricItem icon={<Star className="w-3.5 h-3.5" />} value={arena.metrics.efficiency.toString() + '%'} />
          <MetricItem icon={<Star className="w-3.5 h-3.5" />} value={arena.metrics.cost.toString() + '%'} />
        </div>

        {/* GitHub Stats */}
        <div className="flex items-center gap-4 text-xs text-text-secondary pt-4 border-t border-gray-200">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>{arena.github.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" />
            <span>{arena.github.forks}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MetricItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span>{value}</span>
    </div>
  );
}
