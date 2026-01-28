import { useTranslations } from 'next-intl';
import { Github } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-gray-200 bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-primary mb-4">RWAI Arena</h3>
            <p className="text-sm text-text-secondary">
              Real-World AI Arena - Finding the best AI practices for real-world scenarios.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <a href="/arena" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Arena
                </a>
              </li>
              <li>
                <a href="/framework" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Framework
                </a>
              </li>
              <li>
                <a href="/faq" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/THU-ZJAI/Real-World-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-secondary">{t('copyright')}</p>
          <a
            href="https://github.com/THU-ZJAI/Real-World-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">Follow on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
