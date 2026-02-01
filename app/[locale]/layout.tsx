import type { Metadata } from 'next';
import { Manrope, Noto_Sans_SC, IBM_Plex_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FloatingCTA } from '@/components/floating-cta';
import '../globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RWAI Arena - Real-World AI Best Practices',
  description: 'Find the best AI solutions for your real-world business scenarios. Verified, open-source, production-ready.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} ${notoSansSC.variable} ${ibmPlexMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingCTA locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
