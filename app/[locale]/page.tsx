import { Button, Badge } from '@/components/ui';
import { arenas, industries, categories } from '@/lib/data';
import { Arena } from '@/lib/types';
import { CheckCircle2, Target, Trophy, Users, Star, ArrowRight, Building2, ShoppingCart, GraduationCap, HeartPulse, Zap, Factory, Building } from 'lucide-react';
import Link from 'next/link';
import { getHomepageSectionContent, parseHomepageSectionContent } from '@/lib/content';
import { Suspense } from 'react';
import Image from 'next/image';
import { ParticlesBackground } from '@/components/effects/particles-background';
import { ParticleNebulaBackground } from '@/components/effects/particle-nebula-background';

// Helper function to get localized labels (fallback to content files for consistency)
function getLabel(locale: string, key: string): string {
  const labels: Record<string, Record<string, string>> = {
    'arena.status.verified': { en: 'Verified', zh: '已验证' },
    'arena.status.inArena': { en: 'In Arena', zh: '竞技中' },
    'arena.quality': { en: 'Quality', zh: '质量' },
    'arena.efficiency': { en: 'Efficiency', zh: '效率' },
  };
  return labels[key]?.[locale] || labels[key]?.['en'] || key;
}

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
      <Suspense fallback={<PartnersSectionSkeleton />}>
        <PartnersCarouselSection locale={locale} />
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

function PartnersSectionSkeleton() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
        <div className="flex gap-16 justify-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-40 h-20 bg-gray-200 rounded-lg"></div>
          ))}
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
  let badges = '';
  if (badgesSection) {
    const badgeItems = badgesSection[2].split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/-\s*\*\*[^\*]+\*\*\s*[:：]\s*/, '').trim()); // Remove "**Badge**: " prefix (support both : and ：)
    badges = badgeItems.filter(item => item.length > 0).join(' • ');
  }

  return {
    badges,
    title: parsed['Title'] || parsed['标题'],
    subtitle: parsed['Subtitle'] || parsed['副标题'],
    description: parsed['Description'] || parsed['描述'],
    primaryCta: parsed['Primary'] || parsed['主要按钮'],
    secondaryCta: parsed['Secondary'] || parsed['次要按钮'],
  };
}

async function HeroSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Hero Section', locale);
  if (!contentFile) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0f0f2a] py-section">
        <ParticlesBackground />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">Error: Hero Section content not found for locale "{locale}". Please run sync-content or check Content/Homepage/homepage.{locale}.md</p>
        </div>
      </section>
    );
  }
  const content = parseHeroContent(contentFile.content);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0f0f2a] py-section">
      <ParticlesBackground />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-300 mb-6 hero-animate hero-animate-delay-100">
            {content.badges}
          </p>
          <h1 className="text-hero text-white mb-6 max-w-4xl mx-auto leading-tight hero-animate hero-animate-delay-200 hero-glow">
            {content.title}
          </h1>
          <p className="text-h2 text-gray-100 mb-6 font-semibold hero-animate hero-animate-delay-300">
            {content.subtitle}
          </p>
          <p className="text-body-lg text-gray-300 max-w-2xl mx-auto mb-10 hero-animate hero-animate-delay-400">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center hero-animate hero-animate-delay-500">
            <Link href={`/${locale}/arena`}>
              <Button size="large" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
                {content.primaryCta}
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button size="large" variant="secondary" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                {content.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5),
                       0 0 40px rgba(59, 130, 246, 0.3),
                       0 0 60px rgba(168, 85, 247, 0.2);
        }

        .hero-animate {
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }

        .hero-animate-delay-100 { animation-delay: 0.1s; }
        .hero-animate-delay-200 { animation-delay: 0.2s; }
        .hero-animate-delay-300 { animation-delay: 0.3s; }
        .hero-animate-delay-400 { animation-delay: 0.4s; }
        .hero-animate-delay-500 { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
}

/**
 * Partners Logo Carousel Section
 */
async function PartnersCarouselSection({ locale }: { locale: string }) {
  const partners = [
    { id: '1', name: 'Partner 1', logo: '/partners/logo1.png' },
    { id: '2', name: 'Partner 2', logo: '/partners/logo2.png' },
    { id: '3', name: 'Partner 3', logo: '/partners/logo3.png' },
    { id: '4', name: 'Partner 4', logo: '/partners/logo4.png' },
    { id: '5', name: 'Partner 5', logo: '/partners/logo5.png' },
    { id: '6', name: 'Partner 6', logo: '/partners/logo6.png' },
  ];

  const title = locale === 'zh' ? '合作伙伴' : 'Partners';

  return (
    <>
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-8">
            <p className="text-xl font-semibold text-gray-400">{title}</p>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Scrolling Track */}
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex-shrink-0 w-32 h-16 sm:w-40 sm:h-20 mx-8 flex items-center justify-center opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={80}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              ))}

              {/* Duplicate set for seamless infinite scroll */}
              {partners.map((partner) => (
                <div
                  key={`${partner.id}-duplicate`}
                  className="flex-shrink-0 w-32 h-16 sm:w-40 sm:h-20 mx-8 flex items-center justify-center opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={80}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Styles for Animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 30s;
          }
        }
      `}</style>
    </>
  );
}

async function FeaturedArenasSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Featured Arenas Section', locale);
  if (!contentFile) {
    return null; // Skip section if content not found
  }
  const parsed = parseHomepageSectionContent(contentFile.content);

  const featuredArenas = arenas.slice(0, 3);
  const title = parsed['Title'];
  const subtitle = parsed['Subtitle'];

  return (
    <section className="relative py-section overflow-hidden">
      <ParticleNebulaBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
  const statusLabel = arena.status === 'verified' ? getLabel(locale, 'arena.status.verified') : getLabel(locale, 'arena.status.inArena');
  const qualityLabel = getLabel(locale, 'arena.quality');
  const efficiencyLabel = getLabel(locale, 'arena.efficiency');

  return (
    <Link href={`/${locale}/arena`} className="group block">
      <div className="bg-bg-primary border border-gray-200 rounded-card p-card hover:shadow-card-hover transition-all duration-default hover:-translate-y-1 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Badge variant={arena.status === 'verified' ? 'verified' : 'in-arena'}>
            {statusLabel}
          </Badge>
          <div className="text-xs text-text-secondary">
            {arena.metrics.quality}% {qualityLabel}
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
            <span>{qualityLabel}: {arena.metrics.quality}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>{efficiencyLabel}: {arena.metrics.efficiency}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

async function IndustriesSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Industries Section', locale);
  if (!contentFile) {
    return null; // Skip section if content not found
  }
  const parsed = parseHomepageSectionContent(contentFile.content);

  const title = parsed['Title'];
  const subtitle = parsed['Subtitle'];

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
  // First, extract the Header subsection for title and description
  // Support both English "Header" and Chinese "标题区"
  const headerMatch = markdown.match(/### (Header|标题区)\n([\s\S]*?)(?=### |$)/);
  const headerParsed = headerMatch
    ? parseHomepageSectionContent(headerMatch[0])
    : {};

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
    title: headerParsed['Title'] || headerParsed['标题'],
    description: headerParsed['Description'] || headerParsed['描述'],
    steps: result,
  };
}

async function ApproachSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Approach Section', locale);
  if (!contentFile) {
    return null; // Skip section if content not found
  }
  const content = parseApproachContent(contentFile.content);

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

  // Extract header subsection for title and subtitle
  // Support both English "Content" and Chinese "内容"
  const headerMatch = markdown.match(/### (Content|内容)\n([\s\S]*?)(?=### |$)/);
  const headerParsed = headerMatch
    ? parseHomepageSectionContent(headerMatch[0])
    : {};

  return {
    title: headerParsed['Title'] || headerParsed['标题'],
    subtitle: headerParsed['Subtitle'] || headerParsed['副标题'],
    features: result,
  };
}

async function PracticeIncludesSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Practice Includes Section', locale);
  if (!contentFile) {
    return null; // Skip section if content not found
  }
  const content = parsePracticeIncludesContent(contentFile.content);

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
    title: parsed['Title'] || parsed['标题'],
    subtitle: parsed['Subtitle'] || parsed['副标题'],
    caseTitle: parsed['Title'] || parsed['Title (EN)'] || parsed['Title (ZH)'],
    company: parsed['Company'] || parsed['Company (EN)'] || parsed['Company (ZH)'],
    beforeLabel: parsed['Before Label'] || parsed['Before Label (EN)'],
    beforeValue: parsed['Before Value'] || parsed['Before Value (EN)'],
    afterLabel: parsed['After Label'] || parsed['After Label (EN)'],
    afterValue: parsed['After Value'] || parsed['After Value (EN)'],
    metric1Label: parsed['Metric 1 Label'],
    metric1Value: parsed['Metric 1 Value'],
    metric2Label: parsed['Metric 2 Label'],
    metric2Value: parsed['Metric 2 Value'],
  };
}

async function CaseStudiesSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Case Studies Section', locale);
  if (!contentFile) {
    return null; // Skip section if content not found
  }
  const content = parseCaseStudiesContent(contentFile.content);

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

  // Extract header subsection for title
  // Support both English "Header" and Chinese "标题区"
  const headerMatch = markdown.match(/### (Header|标题区)\n([\s\S]*?)(?=### |$)/);
  const headerParsed = headerMatch
    ? parseHomepageSectionContent(headerMatch[0])
    : {};

  return {
    title: headerParsed['Title'] || headerParsed['标题'],
    points: result,
  };
}

async function TrustSection({ locale }: { locale: string }) {
  const contentFile = await getHomepageSectionContent('Trust Section', locale);
  if (!contentFile) {
    return null; // Skip section if content not found
  }
  const content = parseTrustContent(contentFile.content);

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
  if (!contentFile) {
    return null; // Skip section if content not found
  }
  const parsed = parseFinalCtaContent(contentFile.content);

  const title = parsed['Title'];
  const description = parsed['Description'];
  const primaryButton = parsed['Primary Button'];
  const secondaryButton = parsed['Secondary Button'];
  const betaNote = parsed['Beta Note'];

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
            {secondaryButton}
          </Button>
        </div>

        <p className="text-sm opacity-75">{betaNote}</p>
      </div>
    </section>
  );
}
