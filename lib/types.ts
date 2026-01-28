// 应用类别
export type Category = 'service' | 'management' | 'marketing' | 'risk-control' | 'operations' | 'general';

// 行业类别
export type Industry = 'finance' | 'retail' | 'education' | 'healthcare' | 'energy' | 'manufacturing';

// 验证状态
export type VerificationStatus = 'verified' | 'in-arena';

// 四维评估指标
export interface Metrics {
  quality: number;      // 0-100
  efficiency: number;   // 0-100
  cost: number;         // 0-100
  trust: number;        // 0-100
}

// GitHub数据
export interface GitHubData {
  stars: number;
  forks: number;
  url: string;
}

// Arena/Blueprint数据
export interface Arena {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  category: Category;
  industry: Industry;
  status: VerificationStatus;
  metrics: Metrics;
  github: GitHubData;
  highlights: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 翻译类型
export type Locale = 'en' | 'zh';
