'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useLocale } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const locale = useLocale();
  const isChina = locale === 'zh';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    // In production, you would send this data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              {isChina ? '联系我们' : 'Contact Us'}
            </h1>
            <p className="text-lg leading-relaxed text-slate-400">
              {isChina
                ? '我们随时准备回答您的问题，听取您的建议，并与您探讨合作机会。请通过以下方式与我们联系。'
                : 'We are ready to answer your questions, hear your suggestions, and explore collaboration opportunities. Please reach out to us through the following methods.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {isChina ? '发送邮件' : 'Send Us an Email'}
                </h2>
                <p className="text-slate-600">
                  {isChina
                    ? '我们通常在 1-2 个工作日内回复邮件'
                    : 'We typically respond to emails within 1-2 business days'}
                </p>
              </div>

              <div className="text-center">
                <a
                  href="mailto:contactmx@163.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <Mail className="h-5 w-5" />
                  contactmx@163.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {isChina ? '发送消息' : 'Send Us a Message'}
              </h2>
              <p className="text-xl text-slate-600">
                {isChina
                  ? '填写下面的表单，我们会尽快回复您'
                  : 'Fill out the form below and we\'ll get back to you as soon as possible'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {isChina ? '消息已发送！' : 'Message Sent!'}
                  </h3>
                  <p className="text-slate-600">
                    {isChina
                      ? '感谢您的留言，我们会尽快回复您。'
                      : 'Thank you for your message. We\'ll get back to you soon.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        {isChina ? '姓名' : 'Name'} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isChina ? '您的姓名' : 'Your name'}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        {isChina ? '邮箱' : 'Email'} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={isChina ? 'your@email.com' : 'your@email.com'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      {isChina ? '主题' : 'Subject'} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={isChina ? '您想咨询什么？' : 'What is this about?'}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      {isChina ? '消息' : 'Message'} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder={isChina ? '请描述您的需求或问题...' : 'Please describe your inquiry or question...'}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl transition-all shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {isChina ? '发送中...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          {isChina ? '发送消息' : 'Send Message'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
