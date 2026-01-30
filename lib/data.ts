import { Arena } from './types';
import { Building2, ShoppingCart, GraduationCap, HeartPulse, Zap, Factory } from 'lucide-react';
// 类别配置（用于筛选器显示）
export const categories = {
  service: { en: 'Service', zh: '服务' },
  management: { en: 'Management', zh: '管理' },
  marketing: { en: 'Marketing', zh: '营销' },
  'risk-control': { en: 'Risk Control', zh: '风控' },
  operations: { en: 'Operations', zh: '运营' },
  general: { en: 'General', zh: '通用' },
};

// 行业配置（用于筛选器显示）
export const industries = {
  finance: { en: 'Finance', zh: '金融', icon: Building2 },
  retail: { en: 'Retail', zh: '零售', icon: ShoppingCart },
  education: { en: 'Education', zh: '教育', icon: GraduationCap },
  healthcare: { en: 'Healthcare', zh: '医疗', icon: HeartPulse },
  energy: { en: 'Energy', zh: '能源', icon: Zap },
  manufacturing: { en: 'Manufacturing', zh: '制造', icon: Factory },
  general: { en: 'General', zh: '通用', icon: Building2 },
};

// Arena data - auto-generated from List of Arenas.xlsx
// Last updated: 2026-01-30T16:22:51.782Z
export const arenas: Arena[] = [
  {
    id: '一周搭建企业级智能调研报告生成系统demo',
    folderId: '1-intelligent-research-system',
    title: {
      zh: '一周搭建企业级智能调研报告生成系统Demo',
      en: '1-Week Build: Enterprise-Level Intelligent Research Report Generation System Demo',
    },
    category: '服务,运营,管理',
    categoryEn: 'Service, Operations, Management',
    industry: '信息技术,金融贸易,科研教育',
    industryEn: 'Information Technology, Finance & Trade, Science & Education',
    verificationStatus: '已验证',
    champion: '私部署版：Claude Code + GLM 4.7 + Metaso',
    championEn: 'Private Deployment: Claude Code + GLM 4.7 + Metaso',
    highlights: '一周构建1个包含资料搜集、知识整合、报告生成功能的智能调研系统Demo',
    highlightsEn: 'Build an intelligent research system demo with data collection, knowledge integration, and report generation capabilities in one week',
    metrics: {
      speed: '较快',
      quality: '较高',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '两天搭建业务看板及网站demo',
    folderId: '2-business-dashboard-website',
    title: {
      zh: '两天搭建业务看板及网站Demo',
      en: '2-Day Build: Business Dashboard & Website Demo',
    },
    category: '服务,运营,营销',
    categoryEn: 'Service, Operations, Marketing',
    industry: '通用',
    industryEn: 'General',
    verificationStatus: '已验证',
    champion: '云端版：Lovable + GLM 4.7 + Claude Code',
    championEn: 'Cloud Version: Lovable + GLM 4.7 + Claude Code',
    highlights: '0技术门槛1-2日内搭建出1个有基础互动能力的业务看板或网站Demo',
    highlightsEn: 'Build a business dashboard or website demo with basic interactive capabilities in 1-2 days with zero technical threshold',
    metrics: {
      speed: '较快',
      quality: '很高',
      security: '较低',
      cost: '较优',
    },
  },
  {
    id: '一周搭建文档审核与风控demo',
    folderId: '3-document-review-risk-control',
    title: {
      zh: '一周搭建文档审核与风控Demo',
      en: '1-Week Build: Document Review & Risk Control Demo',
    },
    category: '风控,管理,运营',
    categoryEn: 'Risk Control, Management, Operations',
    industry: '信息技术,金融贸易,能源制造,行政管理',
    industryEn: 'Information Technology, Finance & Trade, Energy & Manufacturing, Administration',
    verificationStatus: '已验证',
    champion: '私部署版：LangChain + GLM 4.7 + Pydantic + unstructured + Faiss',
    championEn: 'Private Deployment: LangChain + GLM 4.7 + Pydantic + unstructured + Faiss',
    highlights: '一周构建1个完整性检查与风险评估的文档解析系统Demo',
    highlightsEn: 'Build a document parsing system demo with completeness checks and risk assessment in one week',
    metrics: {
      speed: '很快',
      quality: '较高',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '两天半搭建企业级简要演示视频',
    folderId: '4-demo-video',
    title: {
      zh: '两天半搭建企业级简要演示视频',
      en: '2.5-Day Build: Enterprise-Level Demo Video',
    },
    category: '服务,营销',
    categoryEn: 'Service, Marketing',
    industry: '信息技术,金融贸易,科研教育',
    industryEn: 'Information Technology, Finance & Trade, Science & Education',
    verificationStatus: '已验证',
    champion: '私部署版：Claude Code + GLM 4.7 + FFmpeg + FunASR + PaddleSpeech',
    championEn: 'Private Deployment: Claude Code + GLM 4.7 + FFmpeg + FunASR + PaddleSpeech',
    highlights: '最快2.5日内生成1个企业级产品或功能简要演示视频',
    highlightsEn: 'Generate an enterprise-level product or feature demo video within 2.5 days at fastest',
    metrics: {
      speed: '很快',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '一周搭建儿童教育趣味应用demo',
    folderId: '5-educational-app-children',
    title: {
      zh: '一周搭建儿童教育趣味应用Demo',
      en: '1-Week Build: Educational App for Children Demo',
    },
    category: '服务',
    categoryEn: 'Service',
    industry: '科研教育,文化体育',
    industryEn: 'Science & Education, Culture & Sports',
    verificationStatus: '已验证',
    champion: '私部署版：BISHENG + GLM 4.7',
    championEn: 'Private Deployment: BISHENG + GLM 4.7',
    highlights: '一周搭建一个儿童教育应用Demo',
    highlightsEn: 'Build a children\'s education app demo in one week',
    metrics: {
      speed: '很快',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '一周搭建长时间序列预测系统demo-能源领域',
    folderId: '6-time-series-forecasting-energy',
    title: {
      zh: '一周搭建长时间序列预测系统Demo（能源领域）',
      en: '1-Week Build: Long-Term Time Series Forecasting System Demo (Energy)',
    },
    category: '运营,风控',
    categoryEn: 'Operations, Risk Control',
    industry: '能源制造',
    industryEn: 'Energy & Manufacturing',
    verificationStatus: '已验证',
    champion: '私部署版：Autogluon + Neuralforecast + EMTSF',
    championEn: 'Private Deployment: Autogluon + Neuralforecast + EMTSF',
    highlights: '一周用低代码快速构建并验证一个面向能源领域的长时间序列预测系统Demo',
    highlightsEn: 'Rapidly build and verify a long-term time series forecasting system demo for the energy sector using low-code in one week',
    metrics: {
      speed: '较快',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '一周搭建智能文档翻译系统demo',
    folderId: '7-document-translation',
    title: {
      zh: '一周搭建智能文档翻译系统Demo',
      en: '1-Week Build: Intelligent Document Translation System Demo',
    },
    category: '服务,运营,管理',
    categoryEn: 'Service, Operations, Management',
    industry: '通用',
    industryEn: 'General',
    verificationStatus: '已验证',
    champion: '私部署版：Gemini CLI + Gemini 3 Pro',
    championEn: 'Private Deployment: Gemini CLI + Gemini 3 Pro',
    highlights: '一周快速构建1个智能文档翻译Demo',
    highlightsEn: 'Rapidly build an intelligent document translation demo in one week',
    metrics: {
      speed: '很快',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '一天构建一个多合同交叉校验的智能合同法审系统demo',
    folderId: '8-contract-legal-review',
    title: {
      zh: '一天构建一个多合同交叉校验的智能合同法审系统Demo',
      en: '1-Day Build: Multi-Contract Cross-Validation Intelligent Contract Legal Review System Demo',
    },
    category: '风控',
    categoryEn: 'Risk Control',
    industry: '金融贸易',
    industryEn: 'Finance & Trade',
    verificationStatus: '验证中',
    champion: '私部署版：BISHENG',
    championEn: 'Private Deployment: BISHENG',
    highlights: '一天搭建出基于要素抽取与跨合同规则校验、可配置与溯源的智能合同法审系统Demo',
    highlightsEn: 'Build an intelligent contract legal review system demo with element extraction, cross-contract validation, configurability, and traceability in one day',
    metrics: {
      speed: '很快',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '一周搭建高精度通用目标检测系统demo-能源-农林领域',
    folderId: '9-object-detection',
    title: {
      zh: '一周搭建高精度通用目标检测系统Demo（能源&农林领域）',
      en: '1-Week Build: High-Precision Universal Object Detection System Demo (Energy & Agriculture)',
    },
    category: '运营,管理,风控',
    categoryEn: 'Operations, Management, Risk Control',
    industry: '信息技术,能源制造,农林牧渔',
    industryEn: 'Information Technology, Energy & Manufacturing, Agriculture, Forestry, Animal Husbandry & Fishery',
    verificationStatus: '验证中',
    champion: '私部署版：Ultralytics YOLO （YOLO 11）+ Triton + Perf Analyzer',
    championEn: 'Private Deployment: Ultralytics YOLO (YOLO 11)+ Triton + Perf Analyzer',
    highlights: '一周构建1个高精度、含数据流闭环、具备自进化能力的通用目标检测系统Demo',
    highlightsEn: 'Build a high-precision universal object detection system demo with closed-loop data flow and self-evolving capabilities in one week',
    metrics: {
      speed: '中等',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: 'sql语言智能生成-nl2sql-的通用实践',
    folderId: '10-nl2sql',
    title: {
      zh: 'SQL语言智能生成(NL2SQL)的通用实践',
      en: 'Universal Practice of SQL Language Intelligent Generation (NL2SQL)',
    },
    category: '服务',
    categoryEn: 'Service',
    industry: '信息技术',
    industryEn: 'Information Technology',
    verificationStatus: '验证中',
    champion: '私部署版：XiYan-SQL（QwenCoder-32B-2504）',
    championEn: 'Private Deployment: XiYan-SQL(QwenCoder-32B-2504)',
    highlights: '快速搭建一个大模型，通过对话生成SQL脚本',
    highlightsEn: 'Rapidly build a large model that generates SQL scripts through conversation',
    metrics: {
      speed: '中等',
      quality: '较高',
      security: '较高',
      cost: '中等',
    },
  },
  {
    id: '一周搭建对话式功能推荐助手demo-ai领域',
    folderId: '11-feature-recommendation',
    title: {
      zh: '一周搭建对话式功能推荐助手Demo（AI领域）',
      en: '1-Week Build: Conversational Feature Recommendation Assistant Demo (AI)',
    },
    category: '服务,运营',
    categoryEn: 'Service, Operations',
    industry: '信息技术,科研教育',
    industryEn: 'Information Technology, Science & Education',
    verificationStatus: '验证中',
    champion: '私部署版：Coze + GLM 4.7',
    championEn: 'Private Deployment: Coze + GLM 4.7',
    highlights: '一周基于低代码构建一个具备主动追问与推荐能力的对话式助手Demo',
    highlightsEn: 'Build a conversational assistant demo with active questioning and recommendation capabilities using low-code in one week',
    metrics: {
      speed: '中等',
      quality: '较低',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '一周构建智能信贷报告生成系统demo',
    folderId: '12-credit-report',
    title: {
      zh: '一周构建智能信贷报告生成系统Demo',
      en: '1-Week Build: Intelligent Credit Report Generation System Demo',
    },
    category: '服务,运营',
    categoryEn: 'Service, Operations',
    industry: '金融贸易',
    industryEn: 'Finance & Trade',
    verificationStatus: '验证中',
    champion: '私部署版：LangChain + GLM 4.7',
    championEn: 'Private Deployment: LangChain + GLM 4.7',
    highlights: '一周低代码构建具备多源数据整合、合规校验、信贷报告一键生成能力的银行智能信贷系统Demo',
    highlightsEn: 'Build a banking intelligent credit system demo with multi-source data integration, compliance verification, and one-click credit report generation using low-code in one week',
    metrics: {
      speed: '中等',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  },
  {
    id: '一周构建单条全国产业链图谱',
    folderId: '13-industrial-chain',
    title: {
      zh: '一周构建单条全国产业链图谱',
      en: '1-Week Build: Single National Industrial Chain Graph',
    },
    category: '服务,运营',
    categoryEn: 'Service, Operations',
    industry: '金融贸易,能源制造',
    industryEn: 'Finance & Trade, Energy & Manufacturing',
    verificationStatus: '验证中',
    champion: '私部署版：LangChain + GLM 4.7',
    championEn: 'Private Deployment: LangChain + GLM 4.7',
    highlights: '一周低代码完成单条全国产业链图谱全流程构建',
    highlightsEn: 'Complete the full-process construction of a single national industrial chain graph using low-code in one week',
    metrics: {
      speed: '较慢',
      quality: '中等',
      security: '较高',
      cost: '较优',
    },
  }
];

// 根据ID获取Arena
export function getArenaById(id: string): Arena | undefined {
  return arenas.find((arena) => arena.id === id);
}

// 根据folderId获取Arena（用于详情页路由）
export function getArenaByFolderId(folderId: string): Arena | undefined {
  return arenas.find((arena) => arena.folderId === folderId);
}

// 获取热门Arena（按浏览量或其他指标）
export function getFeaturedArenas(limit: number = 6): Arena[] {
  return arenas.slice(0, Math.min(limit, arenas.length));
}

// 获取统计数据
export function getStats() {
  return {
    totalBlueprints: arenas.length,
    verifiedCount: arenas.filter((a) => a.verificationStatus === '已验证').length,
  };
}
