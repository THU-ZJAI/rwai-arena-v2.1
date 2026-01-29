import { Button, Badge } from '@/components/ui';
import { arenas, industries, categories } from '@/lib/data';
import { Arena } from '@/lib/types';
import { CheckCircle2, Target, Trophy, Users, Star, ArrowRight, Building2, ShoppingCart, GraduationCap, HeartPulse, Zap, Factory } from 'lucide-react';
import Link from 'next/link';
import { getHomepageSectionContent, parseHomepageSectionContent } from '@/lib/content';
import { Suspense } from 'react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="w-full">
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection locale={locale} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedArenasSection locale={locale} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <IndustriesSection locale={locale} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ApproachSection locale={locale} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PracticeIncludesSection locale={locale} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CaseStudiesSection locale={locale} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TrustSection locale={locale} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FinalCtaSection locale={locale} />
      </Suspense>
    </div>
  );
}

// Skeleton components
function HeroSectionSkeleton() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-secondary to-bg-primary py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-6"></div>
          <div className="h-16 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-10"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton() {
  return (
    <section className="py-section bg-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </section>
  );
}

/**
 * Parse hero content from markdown file
 */
function parseHeroContent(markdown: string) {
  const parsed = parseHomepageSectionContent(markdown);

  // Parse badges - support both English "Badges" and Chinese "徽章"
  const badgesSection = markdown.match(/### (Badges|徽章)\n([\s\S]*?)(?=###|$)/);
  let badges = 'Open Source • Verified • Replicable';
  if (badgesSection) {
    const badgeItems = badgesSection[2].split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/-\s*\*\*[^\*]+\*\*\s*:\s*/, '').trim()); // Remove "**Badge**: " prefix
    badges = badgeItems.filter(item => item.length > 0).join(' • ');
  }

  return {
    badges,
    title: parsed['Title'] || parsed['标题'] || 'Which AI Actually Works?',
    subtitle: parsed['Subtitle'] || parsed['副标题'] || 'We run them in Real World. Recommend only the Best Practice.',
    description: parsed['Description'] || parsed['描述'] || 'Test AI practice in real-world scenarios. Locate only the best-proven practice and open-source everything.',
    primaryCta: parsed['Primary'] || 'Find AI Best Practice',
    secondaryCta: parsed['Secondary'] || 'About RWAI',
  };
}

async function HeroSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Hero Section', locale);
  const content = contentFile ? parseHeroContent(contentFile.content) : {
    badges: locale === 'zh' ? '开源 • 已验证 • 可复制' : 'Open Source • Verified • Replicable',
    title: locale === 'zh' ? 'AI实战，谁是最佳？' : 'Which AI Actually Works?',
    subtitle: locale === 'zh' ? '跑通AI落地的最佳实践' : 'We run them in Real World. Recommend only the Best Practice.',
    description: locale === 'zh'
      ? '在真实场景下验证AI落地的最佳实践，不仅开源代码，也开源可复刻的实践路径'
      : 'Test AI practice in real-world scenarios. Locate only the best-proven practice and open-source everything.',
    primaryCta: locale === 'zh' ? '寻找AI最佳实践' : 'Find AI Best Practice',
    secondaryCta: locale === 'zh' ? '关于RWAI' : 'About RWAI',
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-secondary to-bg-primary py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-text-secondary mb-6">
            {content.badges}
          </p>
          <h1 className="text-hero text-text-primary mb-6 max-w-4xl mx-auto leading-tight">
            {content.title}
          </h1>
          <p className="text-h2 text-text-primary mb-6 font-semibold">
            {content.subtitle}
          </p>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-10">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/arena`}>
              <Button size="large" variant="primary">
                {content.primaryCta}
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button size="large" variant="secondary">
                {content.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

async function FeaturedArenasSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Featured Arenas Section', locale);
  const parsed = contentFile ? parseHomepageSectionContent(contentFile.content) : {};

  const featuredArenas = arenas.slice(0, 3);
  const title = parsed['Title'] || (locale === 'zh' ? '精选 AI 最佳实践' : 'Featured AI Best Practices');
  const subtitle = parsed['Subtitle'] || (locale === 'zh' ? '发现真实场景的验证AI解决方案' : 'Discover verified AI solutions for real-world scenarios');

  return (
    <section className="py-section bg-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{title}</h2>
          <p className="text-body-lg text-text-secondary">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArenas.map((arena) => (
            <ArenaCard key={arena.id} arena={arena} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArenaCard({ arena, locale }: { arena: Arena; locale: string }) {
  const categoryLabel = categories[arena.category][locale === 'en' ? 'en' : 'zh'];
  const industryLabel = industries[arena.industry][locale === 'en' ? 'en' : 'zh'];

  return (
    <Link href={`/${locale}/arena`} className="group block">
      <div className="bg-bg-primary border border-gray-200 rounded-card p-card hover:shadow-card-hover transition-all duration-default hover:-translate-y-1 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Badge variant={arena.status === 'verified' ? 'verified' : 'in-arena'}>
            {arena.status === 'verified' ? 'Verified' : 'In Arena'}
          </Badge>
          <div className="text-xs text-text-secondary">
            {arena.metrics.quality}% Quality
          </div>
        </div>

        <h3 className="text-h3 text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {arena.title[locale === 'en' ? 'en' : 'zh']}
        </h3>

        <div className="flex gap-2 mb-3">
          <Badge variant="industry">{industryLabel}</Badge>
          <Badge variant="category">{categoryLabel}</Badge>
        </div>

        <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
          {arena.description[locale === 'en' ? 'en' : 'zh']}
        </p>

        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>Quality: {arena.metrics.quality}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>Efficiency: {arena.metrics.efficiency}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

async function IndustriesSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Industries Section', locale);
  const parsed = contentFile ? parseHomepageSectionContent(contentFile.content) : {};

  const title = parsed['Title'] || (locale === 'zh' ? '按行业探索' : 'Explore by Industry');
  const subtitle = parsed['Subtitle'] || (locale === 'zh' ? '覆盖6个行业，14+个验证AI解决方案' : 'Covering 6 industries, 14+ verified AI solutions');

  return (
    <section className="py-section bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{title}</h2>
          <p className="text-body-lg text-text-secondary">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(industries).map(([key, { en, zh, icon: Icon }]) => (
            <Link
              key={key}
              href={`/${locale}/arena?industry=${key}`}
              className="group block"
            >
              <div className="bg-gradient-to-br from-white to-slate-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{locale === 'zh' ? zh : en}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Parse approach content
 */
function parseApproachContent(markdown: string) {
  const parsed = parseHomepageSectionContent(markdown);

  const result: Record<string, { title: string; description: string }> = {};

  // Parse steps - support both English "Step N" and Chinese "步骤 N"
  const stepSections = markdown.match(/### (Step \d+|步骤 \d+)\n([\s\S]*?)(?=### |$)/g);
  if (stepSections) {
    stepSections.forEach((section, index) => {
      const sectionParsed = parseHomepageSectionContent(section);
      result[`step${index + 1}`] = {
        title: sectionParsed['Title'] || sectionParsed['标题'] || '',
        description: sectionParsed['Description'] || sectionParsed['描述'] || '',
      };
    });
  }

  return {
    title: parsed['Title'] || parsed['标题'] || 'Real Scenarios • Fair Competition • Single Best',
    description: parsed['Description'] || parsed['描述'] || 'Through the "Arena" mechanism, we fairly test AI practices in real business scenarios and recommend only verified best practices.',
    steps: result,
  };
}

async function ApproachSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Approach Section', locale);
  const content = contentFile ? parseApproachContent(contentFile.content) : {
    title: locale === 'zh' ? '真实场景 • 公平竞争 • 唯一最佳' : 'Real Scenarios • Fair Competition • Single Best',
    description: locale === 'zh'
      ? '通过"Arena"机制，我们在真实业务场景中公平测试AI实践，只推荐验证的最佳实践。'
      : 'Through the "Arena" mechanism, we fairly test AI practices in real business scenarios and recommend only verified best practices.',
    steps: {
      step1: { title: locale === 'zh' ? '定义真实场景' : 'Define Real-world Scenarios', description: locale === 'zh' ? '选择具体的现实问题并建立明确的成功标准和评估框架。' : 'Select specific real-world problems and establish clear success criteria and evaluation frameworks.' },
      step2: { title: locale === 'zh' ? '最佳实践竞争' : 'Best Practices Compete', description: locale === 'zh' ? '多种解决方案在相同条件下使用真实数据和统一标准进行测试。' : 'Multiple solutions tested under identical conditions using real data and unified standards.' },
      step3: { title: locale === 'zh' ? '验证并推荐最佳' : 'Verify and Recommend Best', description: locale === 'zh' ? '根据测试结果选择最优解决方案，提供完整代码和部署指南。' : 'Select the optimal solution based on test results, provide complete code and deployment guides.' },
    },
  };

  const icons = [<Target className="w-8 h-8" />, <Trophy className="w-8 h-8" />, <CheckCircle2 className="w-8 h-8" />];

  return (
    <section className="py-section bg-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h1 text-text-primary mb-4">{content.title}</h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(content.steps).map(([key, step], index) => (
            <div key={key} className="text-center">
              <div className="text-6xl font-bold text-primary-light mb-4">0{index + 1}</div>
              <div className="flex justify-center mb-4 text-primary">{icons[index]}</div>
              <h3 className="text-h3 text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Parse practice includes content
 */
function parsePracticeIncludesContent(markdown: string) {
  const result: Array<{ title: string; description: string }> = [];

  // Support English "Feature N", Chinese "特性 N" and "特点 N"
  const featureSections = markdown.match(/### (Feature \d+|特性 \d+|特点 \d+)\n([\s\S]*?)(?=###\s|$)/g);
  if (featureSections) {
    featureSections.forEach((section) => {
      const parsed = parseHomepageSectionContent(section);
      result.push({
        title: parsed['Title'] || parsed['标题'] || '',
        description: parsed['Description'] || parsed['描述'] || '',
      });
    });
  }

  return {
    title: parseHomepageSectionContent(markdown)['Title'] || parseHomepageSectionContent(markdown)['标题'] || 'Every Practice Includes',
    subtitle: parseHomepageSectionContent(markdown)['Subtitle'] || parseHomepageSectionContent(markdown)['副标题'] || 'Complete production-ready solutions, ready for immediate deployment',
    features: result,
  };
}

async function PracticeIncludesSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Practice Includes Section', locale);
  const content = contentFile ? parsePracticeIncludesContent(contentFile.content) : {
    title: locale === 'zh' ? '每个实践包含' : 'Every Practice Includes',
    subtitle: locale === 'zh' ? '完整的生产就绪解决方案，可立即部署' : 'Complete production-ready solutions, ready for immediate deployment',
    features: [
      { title: locale === 'zh' ? '在线演示' : 'Live Demo', description: locale === 'zh' ? '在线体验实际效果' : 'Experience actual results online' },
      { title: locale === 'zh' ? '完整源代码' : 'Complete Source Code', description: locale === 'zh' ? '开源、可审计、可定制' : 'Open source, auditable, customizable' },
      { title: locale === 'zh' ? '部署指南' : 'Deployment Guide', description: locale === 'zh' ? '1-3天内完成部署' : 'Deploy in 1-3 days' },
      { title: locale === 'zh' ? '性能报告' : 'Performance Report', description: locale === 'zh' ? '真实测试数据' : 'Real test data' },
    ],
  };

  const icons = [<Target className="w-10 h-10" />, <Star className="w-10 h-10" />, <Users className="w-10 h-10" />, <CheckCircle2 className="w-10 h-10" />];

  return (
    <section className="py-section bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{content.title}</h2>
          <p className="text-body-lg text-text-secondary">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 text-primary">{icons[index]}</div>
              <h3 className="text-h3 text-text-primary mb-2">{feature.title}</h3>
              <p className="text-body-sm text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Parse case studies content
 */
function parseCaseStudiesContent(markdown: string) {
  const parsed = parseHomepageSectionContent(markdown);

  return {
    title: parsed['Title'] || parsed['标题'] || 'Case Studies',
    subtitle: parsed['Subtitle'] || parsed['副标题'] || 'Real Companies, Real Results',
    caseTitle: parsed['Title (EN)'] || parsed['Title (ZH)'] || 'NL2SQL Financial Reports',
    company: parsed['Company'] || parsed['Company (EN)'] || parsed['Company (ZH)'] || 'Major Bank',
    beforeLabel: parsed['Before Label'] || parsed['Before Label (EN)'] || 'Before',
    beforeValue: parsed['Before Value'] || parsed['Before Value (EN)'] || 'Manual: 2 hours',
    afterLabel: parsed['After Label'] || parsed['After Label (EN)'] || 'After',
    afterValue: parsed['After Value'] || parsed['After Value (EN)'] || 'AI: 5 minutes',
    metric1Label: parsed['Metric 1 Label'] || 'Efficiency',
    metric1Value: parsed['Metric 1 Value'] || '24x',
    metric2Label: parsed['Metric 2 Label'] || 'Accuracy',
    metric2Value: parsed['Metric 2 Value'] || '95%',
  };
}

async function CaseStudiesSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Case Studies Section', locale);
  const content = contentFile ? parseCaseStudiesContent(contentFile.content) : {
    title: locale === 'zh' ? '案例研究' : 'Case Studies',
    subtitle: locale === 'zh' ? '真实公司，真实成果' : 'Real Companies, Real Results',
    caseTitle: locale === 'zh' ? 'NL2SQL财务报告' : 'NL2SQL Financial Reports',
    company: locale === 'zh' ? '大型银行' : 'Major Bank',
    beforeLabel: locale === 'zh' ? '之前' : 'Before',
    beforeValue: locale === 'zh' ? '手动：2小时' : 'Manual: 2 hours',
    afterLabel: locale === 'zh' ? '之后' : 'After',
    afterValue: locale === 'zh' ? 'AI: 5 分钟' : 'AI: 5 minutes',
    metric1Label: locale === 'zh' ? '效率' : 'Efficiency',
    metric1Value: '24x',
    metric2Label: locale === 'zh' ? '准确率' : 'Accuracy',
    metric2Value: '95%',
  };

  return (
    <section className="py-section bg-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{content.title}</h2>
          <p className="text-body-lg text-text-secondary">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-bg-secondary border border-gray-200 rounded-card p-8">
            <h3 className="text-h3 text-text-primary mb-1">
              {content.caseTitle}
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              {content.company}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-bg-primary border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {content.beforeLabel}
                </p>
                <p className="text-body-lg font-semibold text-text-primary">
                  {content.beforeValue}
                </p>
              </div>
              <div className="bg-success/10 border border-success rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-success mb-1">
                  {content.afterLabel}
                </p>
                <p className="text-body-lg font-semibold text-success">
                  {content.afterValue}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <p className="text-3xl font-bold text-success">{content.metric1Value}</p>
                <p className="text-sm text-text-secondary">
                  {content.metric1Label}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-success">{content.metric2Value}</p>
                <p className="text-sm text-text-secondary">
                  {content.metric2Label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Parse trust section content
 */
function parseTrustContent(markdown: string) {
  const result: Array<{ title: string; description: string }> = [];

  // Support both English "Trust Point N" and Chinese "信任点 N"
  const pointSections = markdown.match(/### (Trust Point \d+|信任点 \d+)\n([\s\S]*?)(?=### |$)/g);
  if (pointSections) {
    pointSections.forEach((section) => {
      const parsed = parseHomepageSectionContent(section);
      result.push({
        title: parsed['Title'] || parsed['标题'] || '',
        description: parsed['Description'] || parsed['描述'] || '',
      });
    });
  }

  const headerParsed = parseHomepageSectionContent(markdown);

  return {
    title: headerParsed['Title'] || headerParsed['标题'] || 'Why Trust RWAI',
    points: result,
  };
}

async function TrustSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Trust Section', locale);
  const content = contentFile ? parseTrustContent(contentFile.content) : {
    title: locale === 'zh' ? '为什么信任RWAI' : 'Why Trust RWAI',
    points: [
      { title: locale === 'zh' ? '已验证' : 'Verified', description: locale === 'zh' ? '所有解决方案在真实场景中测试，数据可追溯' : 'All solutions tested in real scenarios with traceable data' },
      { title: locale === 'zh' ? '专家团队' : 'Expert Team', description: locale === 'zh' ? '来自清华、牛津和财富500强公司的AI专家' : 'AI experts from Tsinghua, Oxford and Fortune 500 Companies' },
      { title: locale === 'zh' ? '可复制' : 'Replicable', description: locale === 'zh' ? '所有解决方案在真实场景中测试，实践可追溯' : 'All solutions tested in real scenarios with traceable practice' },
    ],
  };

  const icons = [<CheckCircle2 className="w-14 h-14" />, <Users className="w-14 h-14" />, <Star className="w-14 h-14" />];

  return (
    <section className="py-section bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{content.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.points.map((point, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 text-primary">{icons[index]}</div>
              <h3 className="text-h3 text-text-primary mb-3 font-bold">{point.title}</h3>
              <p className="text-text-secondary">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Parse final CTA content
 */
function parseFinalCtaContent(markdown: string) {
  return parseHomepageSectionContent(markdown);
}

async function FinalCtaSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Final CTA Section', locale);
  const parsed = contentFile ? parseFinalCtaContent(contentFile.content) : {};

  const title = parsed['Title'] || (locale === 'zh' ? '准备找到您的AI解决方案？' : 'Ready to Find Your AI Solution?');
  const description = parsed['Description'] || (locale === 'zh'
    ? '浏览验证的AI蓝图，或加入开发者社区做出贡献'
    : 'Browse verified AI blueprints, or join the developer community to contribute');
  const primaryButton = parsed['Primary Button'] || (locale === 'zh' ? '浏览蓝图' : 'Browse Blueprints');
  const betaNote = parsed['Beta Note'] || (locale === 'zh'
    ? '目前正在beta测试中，欢迎您的反馈和建议'
    : 'Currently in beta testing, we welcome your feedback and suggestions');

  return (
    <section className="py-section bg-gradient-to-br from-primary to-accent text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-h1 mb-4">{title}</h2>
        <p className="text-body-lg mb-8 opacity-90">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button size="large" variant="primary" className="bg-white text-primary hover:bg-bg-secondary">
            {primaryButton}
          </Button>
          <Button size="large" variant="secondary" className="border-white text-white hover:bg-white/10">
            GitHub
          </Button>
        </div>

        <p className="text-sm opacity-75">{betaNote}</p>
      </div>
    </section>
  );
}
