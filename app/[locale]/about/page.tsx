'use client';

import { Button } from '@/components/ui/button';
import { Github, Mail, MessageSquare, Users, BookOpen, Target, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const locale = useLocale();
  const isChina = locale === 'zh';

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-700/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              {isChina ? '关于 RWAI' : 'About RWAI'}
            </h1>
            <p className="text-2xl font-semibold text-blue-400 mb-8">
              {isChina ? '构建现实世界AI实施的未来' : 'Building the future of real-world AI implementation'}
            </p>
            <p className="text-lg leading-relaxed text-slate-400">
              {isChina
                ? 'RWAI（Real-World AI，现实世界AI）是由清华大学和牛津大学研究人员发起，与财富500强企业合作的学术开源项目。我们的使命是弥合AI研究与实际应用之间的差距，确保AI技术在商业运营中交付实际价值。'
                : 'RWAI (Real-World AI) is an academic open-source project initiated by researchers from Tsinghua University and Oxford University, in collaboration with Fortune 500 companies. Our mission is to bridge the gap between AI research and real-world applications, ensuring that AI technologies deliver tangible value in business operations.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {isChina ? '我们的使命' : 'Our Mission'}
            </h2>
            <p className="text-xl text-slate-600">
              {isChina
                ? '通过验证、记录和开源真实部署中的最佳实践，普及生产级AI解决方案的获取'
                : 'Democratize access to production-ready AI solutions by verifying, documenting, and open-sourcing best practices from real-world deployments'}
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: isChina ? '开放' : 'Openness',
                desc: isChina
                  ? '所有实践都是开源和透明的'
                  : 'All practices are open source and transparent',
              },
              {
                icon: Zap,
                title: isChina ? '严谨' : 'Rigor',
                desc: isChina
                  ? '仅推荐在真实场景中验证的解决方案'
                  : 'Only solutions verified in real scenarios',
              },
              {
                icon: BookOpen,
                title: isChina ? '协作' : 'Collaboration',
                desc: isChina
                  ? '研究人员和从业者的全球社区'
                  : 'Global community of researchers and practitioners',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white mb-4">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {isChina ? '团队' : 'Team'}
            </h2>
            <p className="text-xl text-slate-600">
              {isChina
                ? '来自清华大学、牛津大学等顶级院校的AI专家'
                : 'AI experts from Tsinghua, Oxford, and other top institutions'}
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    category: isChina ? '学术团队' : 'Academic Team',
                    members: isChina
                      ? '清华大学、牛津大学等院校教授'
                      : 'Professors from Tsinghua, Oxford, etc.',
                  },
                  {
                    category: isChina ? '行业合作伙伴' : 'Industry Partners',
                    members: isChina
                      ? '世界500强企业AI架构师、资深工程师'
                      : 'AI architects and senior engineers from Fortune 500',
                  },
                  {
                    category: isChina ? '开源社区' : 'Open Source Community',
                    members: isChina
                      ? '来自全球的开源社区开发者'
                      : 'Developers from open source communities worldwide',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.category}</h3>
                    <p className="text-slate-600">{item.members}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {isChina ? '成就' : 'Achievements'}
            </h2>
          </div>

          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { value: '50+', label: isChina ? '验证过的AI实践' : 'Verified AI Practices' },
              { value: '6', label: isChina ? '覆盖行业' : 'Industries Covered' },
              { value: '14+', label: isChina ? '列出的最佳实践' : 'Best Practices Listed' },
              { value: '5000+', label: 'GitHub Stars' },
              { value: '100+', label: isChina ? '贡献者' : 'Contributors' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{item.value}</div>
                <div className="text-sm text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {isChina ? '联系方式' : 'Contact'}
            </h2>
            <p className="text-xl text-slate-600">
              {isChina ? '有兴趣合作或了解更多？我们很乐意收到您的来信。' : 'Interested in collaborating or learning more? We\'d love to hear from you.'}
            </p>
          </div>

          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Github,
                title: 'GitHub',
                href: 'https://github.com/THU-ZJAI/Real-World-AI',
                desc: isChina ? '查看源代码' : 'View source code',
              },
              {
                icon: Mail,
                title: 'Email',
                href: 'mailto:contact@rwai-arena.org',
                desc: isChina ? '发送邮件' : 'Send email',
              },
              {
                icon: MessageSquare,
                title: 'Discord',
                href: 'https://discord.gg/rwai',
                desc: isChina ? '加入讨论' : 'Join discussion',
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-600 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white border border-slate-300 text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all mb-4">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-slate-950 rounded-2xl p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {isChina ? '加入我们' : 'Join Us'}
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              {isChina
                ? '加入我们的团队，共同塑造现实世界AI的未来！'
                : 'Join our team and help shape the future of real-world AI!'}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                {isChina ? '开放职位' : 'Open Positions'}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  isChina ? 'AI研究员' : 'AI Researchers',
                  isChina ? '全栈开发工程师' : 'Full-stack Developers',
                  isChina ? '产品经理' : 'Product Managers',
                  isChina ? '社区经理' : 'Community Managers',
                ].map((position, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {position}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="mailto:careers@rwai-arena.org"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-medium transition-all duration-fast bg-blue-600 hover:bg-blue-700 text-white rounded-button"
              >
                <Mail className="h-5 w-5" />
                {isChina ? '申请职位' : 'Apply Now'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {isChina ? '准备开始了吗？' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            {isChina
              ? '浏览AI最佳实践，或提交您自己的方案参与竞技'
              : 'Explore AI best practices or submit your own solution'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/arena`}
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-medium transition-all duration-fast bg-blue-600 hover:bg-blue-700 text-white rounded-button w-full sm:w-auto font-semibold"
            >
              {isChina ? '浏览竞技场' : 'Browse Arena'}
            </Link>
            <a
              href="https://github.com/THU-ZJAI/Real-World-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-medium transition-all duration-fast border-2 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-900 hover:text-white rounded-button w-full sm:w-auto"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
