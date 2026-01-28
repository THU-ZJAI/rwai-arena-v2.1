'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocale } from 'next-intl';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function FAQPage() {
  const locale = useLocale();
  const isChina = locale === 'zh';

  const faqs = [
    {
      category: isChina ? '关于RWAI Arena' : 'About RWAI Arena',
      items: [
        {
          q: isChina ? 'RWAI Arena是什么？' : 'What is RWAI Arena?',
          a: isChina
            ? 'RWAI Arena是一个致力于寻找和验证真实业务场景最佳AI实践的开源平台。我们在实际环境中测试AI解决方案，仅推荐经过验证的最佳实践。'
            : 'RWAI Arena is an open-source platform dedicated to finding and verifying the best AI practices for real-world business scenarios. We test AI solutions in actual environments and recommend only verified best practices.',
        },
        {
          q: isChina ? 'Arena机制如何运作？' : 'How does the Arena mechanism work?',
          a: isChina
            ? 'Arena机制遵循三个步骤：(1) 定义真实场景，(2) 最佳实践在相同条件下竞争，(3) 基于测试结果验证并推荐最佳方案。'
            : 'The Arena mechanism follows three steps: (1) Define real-world scenarios, (2) Best practices compete under identical conditions, (3) Verify and recommend the best solution based on test results.',
        },
        {
          q: isChina ? 'RWAI与其他AI评估平台有何不同？' : 'What makes RWAI different from other AI evaluation platforms?',
          a: isChina
            ? '与学术基准不同，RWAI专注于真实业务场景。我们评估完整的实施方案而非仅模型性能，考虑成本、部署复杂度和运营需求等因素。'
            : 'Unlike academic benchmarks, RWAI focuses on real-world business scenarios. We evaluate complete implementations rather than just model performance, considering factors like cost, deployment complexity, and operational requirements.',
        },
      ],
    },
    {
      category: isChina ? '参与方式' : 'Participation',
      items: [
        {
          q: isChina ? '如何向Arena提交我的AI实践？' : 'How can I submit my AI practice to the Arena?',
          a: isChina
            ? '您可以通过我们的GitHub仓库提交AI实践。准备您的代码、文档和部署指南，然后提交包含完整解决方案信息的拉取请求。'
            : 'You can submit your AI practice through our GitHub repository. Prepare your code, documentation, and deployment guide, then submit a pull request with complete information about your solution.',
        },
        {
          q: isChina ? '如果不是开发者，可以参与吗？' : 'Can I participate if I\'m not a developer?',
          a: isChina
            ? '当然可以！您可以通过对方案投票、提供反馈、分享用例或帮助改进文档来参与。社区贡献在许多方面都很有价值。'
            : 'Absolutely! You can participate by voting on solutions, providing feedback, sharing your use cases, or helping improve documentation. Community contributions are valuable in many ways.',
        },
        {
          q: isChina ? 'Arena的解决方案如何评估？' : 'How are Arena solutions evaluated?',
          a: isChina
            ? '解决方案从四个维度评估：质量（准确性）、效率（速度和资源使用）、成本（部署和运营费用）、信任（安全性和合规性）。'
            : 'Solutions are evaluated across four dimensions: Quality (accuracy), Efficiency (speed and resource usage), Cost (deployment and operation expenses), and Trust (security and compliance).',
        },
      ],
    },
    {
      category: isChina ? '技术问题' : 'Technical Questions',
      items: [
        {
          q: isChina ? 'RWAI Arena使用哪些技术？' : 'What technologies are used in RWAI Arena?',
          a: isChina
            ? 'RWAI Arena使用Next.js 16+、TypeScript、Tailwind CSS和next-intl进行国际化构建。我们使用Framer Motion进行动画，使用Recharts进行数据可视化。'
            : 'RWAI Arena is built with Next.js 16+, TypeScript, Tailwind CSS, and next-intl for internationalization. We use Framer Motion for animations and Recharts for data visualization.',
        },
        {
          q: isChina ? 'RWAI Arena是开源的吗？' : 'Is RWAI Arena open source?',
          a: isChina
            ? '是的，RWAI Arena完全开源。所有代码、实践和文档都在我们的GitHub仓库中以开源许可证提供。'
            : 'Yes, RWAI Arena is completely open source. All code, practices, and documentation are available on our GitHub repository under an open-source license.',
        },
        {
          q: isChina ? '可以为自己的组织部署RWAI Arena吗？' : 'Can I deploy RWAI Arena for my own organization?',
          a: isChina
            ? '可以，RWAI Arena设计为可自托管。您可以根据仓库中提供的部署指南在自己的基础设施上部署。'
            : 'Yes, RWAI Arena is designed to be self-hostable. You can deploy it on your own infrastructure following our deployment guide available in the repository.',
        },
      ],
    },
    {
      category: isChina ? '许可和使用' : 'Licensing and Usage',
      items: [
        {
          q: isChina ? 'RWAI Arena使用什么许可证？' : 'What license does RWAI Arena use?',
          a: isChina
            ? 'RWAI Arena平台代码使用MIT许可证。单个AI实践可能有自己的许可证，在每个实践的仓库中明确标示。'
            : 'RWAI Arena uses the MIT License for the platform code. Individual AI practices may have their own licenses, which are clearly indicated in each practice\'s repository.',
        },
        {
          q: isChina ? '可以将RWAI Arena用于商业目的吗？' : 'Can I use RWAI Arena for commercial purposes?',
          a: isChina
            ? '可以，RWAI Arena平台和验证过的实践都可以用于商业目的。具体条款请查看各个实践的许可证。'
            : 'Yes, both the RWAI Arena platform and the verified practices can be used for commercial purposes. Please check individual practice licenses for specific terms.',
        },
        {
          q: isChina ? '在学术工作中如何引用RWAI Arena？' : 'How do I cite RWAI Arena in academic work?',
          a: isChina
            ? '引用RWAI Arena时，请使用以下格式："RWAI Arena: 现实世界AI最佳实践平台. https://rwai-arena.org"'
            : 'When citing RWAI Arena, please use the following format: "RWAI Arena: Real-World AI Best Practices Platform. https://rwai-arena.org"',
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Badge variant="in-arena" className="mb-6 bg-white border-gray-200">
            <HelpCircle className="mr-2 h-4 w-4" />
            {isChina ? '常见问题' : 'FAQ'}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            {isChina ? '常见问题' : 'Frequently Asked Questions'}
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isChina
              ? '查找关于RWAI Arena的常见问题答案'
              : 'Find answers to common questions about RWAI Arena'}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {faqs.map((category, catIdx) => (
            <div key={catIdx} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.items.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (catIdx * 0.1) + (idx * 0.05) }}
                  >
                    <AccordionItem
                      value={`item-${catIdx}-${idx}`}
                      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 shadow-sm transition-all hover:shadow-md data-[state=open]:border-blue-600 data-[state=open]:bg-blue-50/30"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 py-5 text-lg">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pb-5 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-10 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 mx-auto mb-4">
            <HelpCircle className="h-7 w-7" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {isChina ? '仍有问题？' : 'Still have questions?'}
          </h3>
          <p className="text-gray-700 mb-8 max-w-md mx-auto">
            {isChina
              ? '如果您没有找到想要的答案，请随时联系我们。'
              : 'If you couldn\'t find the answer you\'re looking for, feel free to reach out to us.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`https://github.com/THU-ZJAI/Real-World-AI`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 text-base font-medium transition-all duration-fast bg-blue-600 hover:bg-blue-700 text-white rounded-button"
            >
              GitHub
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:contact@rwai-arena.org"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 text-base font-medium transition-all duration-fast border-2 border-gray-200 bg-transparent text-gray-900 hover:bg-gray-50 hover:border-gray-300 rounded-button"
            >
              {isChina ? '发送邮件' : 'Send Email'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
