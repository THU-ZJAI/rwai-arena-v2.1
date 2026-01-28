import { Arena, Category, Industry } from './types';
import { Building2, ShoppingCart, GraduationCap, HeartPulse, Zap, Factory } from 'lucide-react';

// 类别配置
export const categories: Record<Category, { en: string; zh: string }> = {
  service: { en: 'Service', zh: '服务' },
  management: { en: 'Management', zh: '管理' },
  marketing: { en: 'Marketing', zh: '营销' },
  'risk-control': { en: 'Risk Control', zh: '风控' },
  operations: { en: 'Operations', zh: '运营' },
  general: { en: 'General', zh: '通用' },
};

// 行业配置
export const industries: Record<Industry, { en: string; zh: string; icon: any }> = {
  finance: { en: 'Finance', zh: '金融', icon: Building2 },
  retail: { en: 'Retail', zh: '零售', icon: ShoppingCart },
  education: { en: 'Education', zh: '教育', icon: GraduationCap },
  healthcare: { en: 'Healthcare', zh: '医疗', icon: HeartPulse },
  energy: { en: 'Energy', zh: '能源', icon: Zap },
  manufacturing: { en: 'Manufacturing', zh: '制造', icon: Factory },
};

// Arena data - only arenas with content files in Content/Arena/{id}/
export const arenas: Arena[] = [
  {
    id: 'intelligent-research-system-v1',
    title: {
      en: 'Intelligent Research & Report Generation System',
      zh: '智能研究与报告生成系统',
    },
    description: {
      en: 'Achieved #2 global ranking in DeepResearch benchmarks with 51.86 score. 95% labor reduction and ≤15 minute report generation.',
      zh: '在DeepResearch基准测试中获得全球第2名，分数51.86。95%工作减少，报告生成≤15分钟。',
    },
    category: 'service',
    industry: 'finance',
    status: 'verified',
    metrics: {
      quality: 95,
      efficiency: 94,
      cost: 88,
      trust: 93,
    },
    github: {
      stars: 1284,
      forks: 234,
      url: 'https://github.com/rwai-arena/intelligent-research-system-v1',
    },
    highlights: [
      'DeepResearch score: 51.86 (#2 globally)',
      '95% labor reduction',
      '≤15 minute generation time',
    ],
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-11-22'),
  },
];

// 根据ID获取Arena
export function getArenaById(id: string): Arena | undefined {
  return arenas.find((arena) => arena.id === id);
}

// 获取热门Arena（按浏览量或其他指标）
export function getFeaturedArenas(limit: number = 6): Arena[] {
  return arenas.slice(0, Math.min(limit, arenas.length));
}

// 根据类别和行业筛选Arena
export function filterArenas(
  category?: Category,
  industry?: Industry
): Arena[] {
  let filtered = arenas;

  if (category && category !== 'general') {
    filtered = filtered.filter(
      (arena) => arena.category === category || arena.category === 'general'
    );
  }

  if (industry) {
    filtered = filtered.filter(
      (arena) => arena.industry === industry
    );
  }

  return filtered;
}

// 获取统计数据
export function getStats() {
  return {
    totalBlueprints: arenas.length,
    industries: Object.keys(industries).length,
    avgAccuracy: Math.round(
      arenas.reduce((sum, arena) => sum + arena.metrics.quality, 0) / arenas.length
    ),
    verifiedCount: arenas.filter((a) => a.status === 'verified').length,
  };
}
