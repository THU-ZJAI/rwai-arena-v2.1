import { Button, Badge } from '@/components/ui';
import { arenas, industries, categories } from '@/lib/data';
import { Arena } from '@/lib/types';
import { CheckCircle2, Target, Trophy, Users, Star, ArrowRight, Building2, ShoppingCart, GraduationCap, HeartPulse, Zap, Factory } from 'lucide-react';
import Link from 'next/link';
import { getHomepageContent } from '@/lib/content';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="w-full">
      <HeroSection locale={locale} />
      <FeaturedArenasSection locale={locale} />
      <IndustriesSection locale={locale} />
      <ApproachSection locale={locale} />
      <PracticeIncludesSection locale={locale} />
      <CaseStudiesSection locale={locale} />
      <TrustSection locale={locale} />
      <FinalCtaSection locale={locale} />
    </div>
  );
}

/**
 * Parse hero content from markdown file
 * Extracts badges, title, subtitle, description, and CTA buttons
 * Works with clean .en.md and .zh.md files
 */
function parseHeroContent(markdown: string) {
  // Support both English and Chinese section headers
  const badgesMatch = markdown.match(/## (Top Badge Bar|顶部徽章栏)\n([\s\S]*?)\n##/);
  const badges = badgesMatch
    ? badgesMatch[2].split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace(/-\s*/, '').trim()).join(' • ')
    : 'Open Source • Verified • Replicable';

  const mainContentMatch = markdown.match(/## (Main Content|主要内容)\n([\s\S]*?)(?=##|$)/);
  let title = 'Which AI Actually Works?';
  let subtitle = 'We test them. Recommend only the Best Practice.';
  let description = 'Test AI practice in real-world scenarios. Verify what works.';

  if (mainContentMatch) {
    const lines = mainContentMatch[2].split('\n').filter(line => line.trim());
    for (const line of lines) {
      if (line.includes('**Title**') || line.includes('**标题**')) {
        title = line.replace(/.*?\*\*[^*]+\*\*[:：]\s*/, '').trim();
      } else if (line.includes('**Subtitle**') || line.includes('**副标题**')) {
        subtitle = line.replace(/.*?\*\*[^*]+\*\*[:：]\s*/, '').trim();
      } else if (line.includes('**Description**') || line.includes('**描述**')) {
        description = line.replace(/.*?\*\*[^*]+\*\*[:：]\s*/, '').trim();
      }
    }
  }

  const ctaMatch = markdown.match(/## (CTA Buttons|行动按钮)\n([\s\S]*?)(?=$)/);
  let primaryCta = 'Find AI Solutions';
  let secondaryCta = 'Join as Developer';

  if (ctaMatch) {
    const lines = ctaMatch[2].split('\n').filter(line => line.trim().startsWith('-'));
    for (const line of lines) {
      if (line.includes('Primary:') || line.includes('主要:')) {
        primaryCta = line.replace(/.*?(?:Primary:|主要:)\s*/, '').trim();
      } else if (line.includes('Secondary:') || line.includes('次要:')) {
        secondaryCta = line.replace(/.*?(?:Secondary:|次要:)\s*/, '').trim();
      }
    }
  }

  return { badges, title, subtitle, description, primaryCta, secondaryCta };
}

async function HeroSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageContent('hero', locale);
  const content = contentFile ? parseHeroContent(contentFile.content) : {
    badges: locale === 'zh' ? '开源 • 已验证 • 可复制' : 'Open Source • Verified • Replicable',
    title: locale === 'zh' ? '哪个 AI 真的有效？' : 'Which AI Actually Works?',
    subtitle: locale === 'zh' ? '我们测试它们。只推荐最佳实践。' : 'We test them. Recommend only the Best Practice.',
    description: locale === 'zh'
      ? '在真实场景中测试AI实践。验证什么有效。定位只有最佳验证的实践并开源所有内容。'
      : 'Test AI practice in real-world scenarios. Verify what works. Locate only the best-proven practice and open-source everything.',
    primaryCta: locale === 'zh' ? '查找AI解决方案' : 'Find AI Solutions',
    secondaryCta: locale === 'zh' ? '加入开发者' : 'Join as Developer',
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
            <Button size="large" variant="secondary">
              {content.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedArenasSection({ locale }: { locale: string }) {
  const featuredArenas = arenas.slice(0, 3);
  const title = locale === 'zh' ? '精选 AI 最佳实践' : 'Featured AI Best Practices';
  const subtitle = locale === 'zh' ? '发现真实场景的验证AI解决方案' : 'Discover verified AI solutions for real-world scenarios';

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

function IndustriesSection({ locale }: { locale: string }) {
  const title = locale === 'zh' ? '按行业探索' : 'Explore by Industry';
  const subtitle = locale === 'zh' ? '覆盖6个行业，14+个验证AI解决方案' : 'Covering 6 industries, 14+ verified AI solutions';

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
 * Parse approach content from markdown file
 */
function parseApproachContent(markdown: string) {
  const lines = markdown.split('\n');

  // The format is:
  // # 我们的方法 (or # Our Approach)
  //
  // ## Title here
  //
  // Description here

  let title = '';
  let description = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip the first heading (# ...)
    if (line.match(/^#\s+/)) {
      continue;
    }

    // Get the title (## ...)
    if (line.startsWith('## ') && !title) {
      title = line.replace(/^##\s*/, '').trim();
      continue;
    }

    // Get the description (first non-empty line after title)
    if (title && !description && line.trim()) {
      description = line.trim();
      break;
    }
  }

  return { title, description };
}

async function ApproachSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageContent('approach', locale);
  const content = contentFile ? parseApproachContent(contentFile.content) : {
    title: locale === 'zh' ? '真实场景 • 公平竞争 • 唯一最佳' : 'Real Scenarios • Fair Competition • Single Best',
    description: locale === 'zh'
      ? '通过"Arena"机制，我们在真实业务场景中公平测试AI实践，只推荐验证的最佳实践。'
      : 'Through the "Arena" mechanism, we fairly test AI practices in real business scenarios and recommend only verified best practices.',
  };

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
          {[
            {
              number: '01',
              icon: <Target className="w-8 h-8" />,
              title: locale === 'zh' ? '定义真实场景' : 'Define Real-world Scenarios',
              description: locale === 'zh'
                ? '选择具体的现实问题并建立明确的成功标准和评估框架。'
                : 'Select specific real-world problems and establish clear success criteria and evaluation frameworks.',
            },
            {
              number: '02',
              icon: <Trophy className="w-8 h-8" />,
              title: locale === 'zh' ? '最佳实践竞争' : 'Best Practices Compete',
              description: locale === 'zh'
                ? '多种解决方案在相同条件下使用真实数据和统一标准进行测试。'
                : 'Multiple solutions tested under identical conditions using real data and unified standards.',
            },
            {
              number: '03',
              icon: <CheckCircle2 className="w-8 h-8" />,
              title: locale === 'zh' ? '验证并推荐最佳' : 'Verify and Recommend Best',
              description: locale === 'zh'
                ? '根据测试结果选择最优解决方案，提供完整代码和部署指南。'
                : 'Select the optimal solution based on test results, provide complete code and deployment guides.',
            },
          ].map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-6xl font-bold text-primary-light mb-4">{step.number}</div>
              <div className="flex justify-center mb-4 text-primary">{step.icon}</div>
              <h3 className="text-h3 text-text-primary mb-3">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticeIncludesSection({ locale }: { locale: string }) {
  const title = locale === 'zh' ? '每个实践包含' : 'Every Practice Includes';
  const subtitle = locale === 'zh' ? '完整的生产就绪解决方案，可立即部署' : 'Complete production-ready solutions, ready for immediate deployment';

  const features = locale === 'zh' ? [
    { icon: <Target className="w-10 h-10" />, title: '在线演示', description: '在线体验实际效果' },
    { icon: <Star className="w-10 h-10" />, title: '完整源代码', description: '开源、可审计、可定制' },
    { icon: <Users className="w-10 h-10" />, title: '部署指南', description: '1-3天内完成部署' },
    { icon: <CheckCircle2 className="w-10 h-10" />, title: '性能报告', description: '真实测试数据' },
  ] : [
    { icon: <Target className="w-10 h-10" />, title: 'Live Demo', description: 'Experience actual results online' },
    { icon: <Star className="w-10 h-10" />, title: 'Complete Source Code', description: 'Open source, auditable, customizable' },
    { icon: <Users className="w-10 h-10" />, title: 'Deployment Guide', description: 'Deploy in 1-3 days' },
    { icon: <CheckCircle2 className="w-10 h-10" />, title: 'Performance Report', description: 'Real test data' },
  ];

  return (
    <section className="py-section bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{title}</h2>
          <p className="text-body-lg text-text-secondary">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-h3 text-text-primary mb-2">{feature.title}</h3>
              <p className="text-body-sm text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection({ locale }: { locale: string }) {
  const title = locale === 'zh' ? '案例研究' : 'Case Studies';
  const subtitle = locale === 'zh' ? '真实公司，真实成果' : 'Real Companies, Real Results';

  return (
    <section className="py-section bg-bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{title}</h2>
          <p className="text-body-lg text-text-secondary">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-bg-secondary border border-gray-200 rounded-card p-8">
            <h3 className="text-h3 text-text-primary mb-1">
              {locale === 'zh' ? 'NL2SQL财务报告' : 'NL2SQL Financial Reports'}
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              {locale === 'zh' ? '大型银行' : 'Major Bank'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-bg-primary border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {locale === 'zh' ? '之前' : 'Before'}
                </p>
                <p className="text-body-lg font-semibold text-text-primary">
                  {locale === 'zh' ? '手动：2小时' : 'Manual: 2 hours'}
                </p>
              </div>
              <div className="bg-success/10 border border-success rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-success mb-1">
                  {locale === 'zh' ? '之后' : 'After'}
                </p>
                <p className="text-body-lg font-semibold text-success">
                  AI: 5 {locale === 'zh' ? '分钟' : 'minutes'}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <p className="text-3xl font-bold text-success">24x</p>
                <p className="text-sm text-text-secondary">
                  {locale === 'zh' ? '效率' : 'Efficiency'}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-success">95%</p>
                <p className="text-sm text-text-secondary">
                  {locale === 'zh' ? '准确率' : 'Accuracy'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection({ locale }: { locale: string }) {
  const title = locale === 'zh' ? '为什么信任RWAI' : 'Why Trust RWAI';

  const points = locale === 'zh' ? [
    {
      icon: <CheckCircle2 className="w-14 h-14" />,
      title: '已验证',
      description: '所有解决方案在真实场景中测试，数据可追溯',
    },
    {
      icon: <Users className="w-14 h-14" />,
      title: '专家团队',
      description: '来自清华、牛津和财富500强公司的AI专家',
    },
    {
      icon: <Star className="w-14 h-14" />,
      title: '可复制',
      description: '所有解决方案在真实场景中测试，实践可追溯',
    },
  ] : [
    {
      icon: <CheckCircle2 className="w-14 h-14" />,
      title: 'Verified',
      description: 'All solutions tested in real scenarios with traceable data',
    },
    {
      icon: <Users className="w-14 h-14" />,
      title: 'Expert Team',
      description: 'AI experts from Tsinghua, Oxford and Fortune 500 Companies',
    },
    {
      icon: <Star className="w-14 h-14" />,
      title: 'Replicable',
      description: 'All solutions tested in real scenarios with traceable practice',
    },
  ];

  return (
    <section className="py-section bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-text-primary mb-4">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4 text-primary">{point.icon}</div>
              <h3 className="text-h3 text-text-primary mb-3 font-bold">{point.title}</h3>
              <p className="text-text-secondary">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection({ locale }: { locale: string }) {
  const title = locale === 'zh' ? '准备找到您的AI解决方案？' : 'Ready to Find Your AI Solution?';
  const description = locale === 'zh'
    ? '浏览验证的AI蓝图，或加入开发者社区做出贡献'
    : 'Browse verified AI blueprints, or join the developer community to contribute';
  const primaryButton = locale === 'zh' ? '浏览蓝图' : 'Browse Blueprints';
  const betaNote = locale === 'zh'
    ? '目前正在beta测试中，欢迎您的反馈和建议'
    : 'Currently in beta testing, we welcome your feedback and suggestions';

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
