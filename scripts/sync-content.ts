/**
 * Content Sync Script
 *
 * This script reads raw content files and generates clean .en.md and .zh.md files.
 *
 * Rules:
 * 1. Raw files may contain mixed English/Chinese, dirty format, incomplete translations
 * 2. Generate .en.md with clean English-only content
 * 3. Generate .zh.md with clean Chinese-only content
 * 4. Preserve exact wording when content exists for that language
 * 5. Clean up markdown formatting
 */

import fs from 'fs';
import path from 'path';

interface ParsedContent {
  english: Record<string, string>;
  chinese: Record<string, string>;
}

/**
 * Detect if text is Chinese (contains Chinese characters)
 */
function isChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

/**
 * Detect if text is English (mostly Latin characters)
 */
function isEnglish(text: string): boolean {
  return !isChinese(text) && /[a-zA-Z]/.test(text);
}

/**
 * Section and subsection header names for zh output (quality checklist: .zh.md Chinese-only)
 * Raw file keeps English; generated .zh.md uses Chinese headers.
 */
const HOMEPAGE_ZH_SECTIONS: Record<string, string> = {
  'Hero Section': '英雄区',
  'Featured Arenas Section': '精选实践区',
  'Industries Section': '行业区',
  'Approach Section': '方法区',
  'Practice Includes Section': '实践包含区',
  'Case Studies Section': '案例研究区',
  'Trust Section': '信任区',
  'Final CTA Section': '最终行动区',
};
const HOMEPAGE_ZH_SUBSECTIONS: Record<string, string> = {
  Badges: '徽章',
  'Main Content': '主要内容',
  'CTA Buttons': '行动按钮',
  Content: '内容',
  Header: '标题区',
  'Step 1': '步骤 1',
  'Step 2': '步骤 2',
  'Step 3': '步骤 3',
  'Feature 1': '特点 1',
  'Feature 2': '特点 2',
  'Feature 3': '特点 3',
  'Feature 4': '特点 4',
  'Case Study 1': '案例 1',
  'Trust Point 1': '信任点 1',
  'Trust Point 2': '信任点 2',
  'Trust Point 3': '信任点 3',
};

/**
 * Parse homepage.raw.md content
 * Format: ## Section Name -> ### Content -> - **Key (EN)**: value / - **Key (ZH)**: value
 * .en.md keeps English headers; .zh.md uses Chinese headers (quality checklist)
 */
function parseHomepageContent(content: string): { en: string; zh: string } {
  const lines = content.split('\n');
  const sectionsEn: string[] = [];
  const sectionsZh: string[] = [];

  let currentSection = '';
  let currentSectionEn: string[] = [];
  let currentSectionZh: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Top level section (##)
    if (line.match(/^##\s+/)) {
      // Save previous section
      if (currentSection && currentSectionEn.length > 0) {
        sectionsEn.push(`## ${currentSection}\n${currentSectionEn.join('\n')}`);
      }
      if (currentSection && currentSectionZh.length > 0) {
        const zhSection = HOMEPAGE_ZH_SECTIONS[currentSection] ?? currentSection;
        sectionsZh.push(`## ${zhSection}\n${currentSectionZh.join('\n')}`);
      }

      currentSection = line.replace(/^##\s+/, '').trim();
      currentSectionEn = [];
      currentSectionZh = [];
      continue;
    }

    // Sub section (###) - English for .en, Chinese for .zh
    if (line.match(/^###\s+/)) {
      const subsection = line.replace(/^###\s+/, '').trim();
      const zhSubsection = HOMEPAGE_ZH_SUBSECTIONS[subsection] ?? subsection;
      currentSectionEn.push(`\n### ${subsection}`);
      currentSectionZh.push(`\n### ${zhSubsection}`);
      continue;
    }

    // Key-value pairs with language markers
    if (line.trim().startsWith('- **')) {
      const match = line.match(/-\s*\*\*([^*]+)\*\*\s*[:：]\s*(.+)/);
      if (match) {
        const key = match[1];
        const value = match[2].trim();

        // Determine which language this is for
        if (key.endsWith('(EN)')) {
          const cleanKey = key.replace(/\s*\(EN\)$/, '');
          currentSectionEn.push(`- **${cleanKey}**: ${value}`);
        } else if (key.endsWith('(ZH)')) {
          const cleanKey = key.replace(/\s*\(ZH\)$/, '');
          currentSectionZh.push(`- **${cleanKey}**: ${value}`);
        } else {
          // No language specified, use for both
          currentSectionEn.push(`- **${key}**: ${value}`);
          currentSectionZh.push(`- **${key}**: ${value}`);
        }
      }
    }
  }

  // Don't forget the last section
  if (currentSection && currentSectionEn.length > 0) {
    sectionsEn.push(`## ${currentSection}\n${currentSectionEn.join('\n')}`);
  }
  if (currentSection && currentSectionZh.length > 0) {
    const zhSection = HOMEPAGE_ZH_SECTIONS[currentSection] ?? currentSection;
    sectionsZh.push(`## ${zhSection}\n${currentSectionZh.join('\n')}`);
  }

  return {
    en: sectionsEn.join('\n\n'),
    zh: sectionsZh.join('\n\n')
  };
}

/**
 * Parse simple page content (About, FAQ, Framework, Arena page)
 */
function parseSimplePage(content: string, locale: 'en' | 'zh'): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let currentLangSection: 'en' | 'zh' | 'both' = 'both';

  for (let line of lines) {
    // Skip team notes
    if (line.includes('## Team') || line.includes('## Notes') || line.includes('## Notes for Content Team')) {
      break;
    }

    // Check for language section markers
    if (line.trim() === '#### English') {
      currentLangSection = 'en';
      continue;
    }
    if (line.trim() === '#### 中文') {
      currentLangSection = 'zh';
      continue;
    }

    // Handle section headers (reset language section to 'both')
    if (line.match(/^##\s+/)) {
      currentLangSection = 'both';
    }

    // Extract English or Chinese based on locale
    if (locale === 'en') {
      if (line.match(/^#+\s/) && currentLangSection === 'zh') {
        continue;
      }
      else if (line.match(/^#+\s/)) {
        const headerMatch = line.match(/^(#+)\s+(.+)/);
        if (headerMatch) {
          const level = headerMatch[1];
          const text = headerMatch[2];
          const englishMatch = text.match(/^([a-zA-Z\s\(\)\-\,\.\'\"\:]+)/);
          if (englishMatch) {
            result.push(`${level} ${englishMatch[1].trim()}`);
          } else {
            result.push(line);
          }
        }
      }
      else if ((currentLangSection === 'en' || currentLangSection === 'both') &&
               (isEnglish(line) || line.trim() === '' || line.includes('**English**'))) {
        let cleaned = line.replace(/（[^）]+）/g, '').trim();
        cleaned = cleaned.replace(/^\*\*English\*\*[:：]\s*/, '').trim();
        result.push(cleaned);
      }
      else if (currentLangSection === 'zh') {
        // Skip
      }
      else if (isChinese(line) && !line.match(/^#+\s/)) {
        // Skip
      }
    } else {
      if (line.match(/^#+\s/) && currentLangSection === 'en') {
        continue;
      }
      else if (line.match(/^#+\s/)) {
        const headerMatch = line.match(/^(#+)\s+(.+)/);
        if (headerMatch) {
          const level = headerMatch[1];
          const text = headerMatch[2];
          const chineseMatch = text.match(/[\u4e00-\u9fa5]+/g);
          if (chineseMatch && chineseMatch.length > 0) {
            result.push(`${level} ${chineseMatch.join(' ')}`);
          } else if (isChinese(text)) {
            result.push(line);
          } else {
            continue;
          }
        }
      }
      else if ((currentLangSection === 'zh' || currentLangSection === 'both') &&
          (isChinese(line) || line.trim() === '')) {
        result.push(line);
      }
      else if (currentLangSection === 'en') {
        // Skip
      }
      else if (currentLangSection === 'both') {
        if (line.includes('**中文**')) {
          const chinese = line.replace('**中文**', '').replace(/[:：]\s*/, '').trim();
          result.push(chinese);
        } else if (line.includes('Chinese:')) {
          const chinese = line.replace(/.*Chinese:\s*/, '').trim();
          result.push(chinese);
        } else if (line.includes('（中文：')) {
          const match = line.match(/（中文：([^）]+)）/);
          if (match) {
            result.push(match[1]);
          }
        } else if (isChinese(line) && !line.includes('（')) {
          result.push(line);
        }
      }
    }
  }

  return result.filter((line, index, arr) => {
    if (line === '' && arr[index - 1] === '') return false;
    return true;
  }).join('\n');
}

/**
 * Process a single raw file and generate .en.md and .zh.md
 */
function processRawFile(rawFilePath: string, contentDir: string) {
  console.log(`Processing: ${rawFilePath}`);

  const rawContent = fs.readFileSync(rawFilePath, 'utf-8');
  const fileName = path.basename(rawFilePath, '.raw.md');
  const dirName = path.dirname(rawFilePath).replace(contentDir + path.sep, '');

  let enContent: string;
  let zhContent: string;

  if (fileName === 'homepage') {
    const parsed = parseHomepageContent(rawContent);
    enContent = `# Homepage Content\n\n${parsed.en}`;
    zhContent = `# 首页内容\n\n${parsed.zh}`;
  } else if (['page', 'overview', 'implementation', 'requirements', 'validation-report', 'project-report'].includes(fileName)) {
    enContent = parseSimplePage(rawContent, 'en');
    zhContent = parseSimplePage(rawContent, 'zh');
  } else {
    console.log(`  Warning: No specific parser for ${fileName}, copying raw content`);
    enContent = rawContent;
    zhContent = rawContent;
  }

  // Write .en.md
  const enPath = path.join(contentDir, dirName, `${fileName}.en.md`);
  fs.writeFileSync(enPath, enContent, 'utf-8');
  console.log(`  Generated: ${enPath}`);

  // Write .zh.md
  const zhPath = path.join(contentDir, dirName, `${fileName}.zh.md`);
  fs.writeFileSync(zhPath, zhContent, 'utf-8');
  console.log(`  Generated: ${zhPath}`);
}

/**
 * Find and process all raw files
 */
function syncAllContent() {
  const contentDir = path.join(process.cwd(), 'Content');

  function findRawFiles(dir: string): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findRawFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith('.raw.md')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  const rawFiles = findRawFiles(contentDir);
  console.log(`Found ${rawFiles.length} raw files\n`);

  for (const rawFile of rawFiles) {
    processRawFile(rawFile, contentDir);
    console.log('');
  }

  console.log('Content sync complete!');
}

// Run the sync
syncAllContent();
