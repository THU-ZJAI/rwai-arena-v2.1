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
 * 5. Translate missing content (this is a placeholder - actual translation would need AI/translator)
 * 6. Clean up markdown formatting
 */

import fs from 'fs';
import path from 'path';

interface ParsedContent {
  english: Record<string, string>;
  chinese: Record<string, string>;
}

/**
 * Extract Chinese text from parentheses like （中文）
 */
function extractChineseFromParens(text: string): { english: string; chinese: string | null } {
  const chineseMatch = text.match(/（([^）]+)）/);
  if (chineseMatch) {
    const chinese = chineseMatch[1];
    const english = text.replace(/（[^）]+）/, '').trim();
    return { english, chinese };
  }
  return { english: text, chinese: null };
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
 * Parse hero.raw.md content
 */
function parseHeroContent(content: string): ParsedContent {
  const lines = content.split('\n');
  const result: ParsedContent = {
    english: {},
    chinese: {}
  };

  let currentSection = '';

  for (let line of lines) {
    // Section headers
    if (line.startsWith('### ')) {
      currentSection = line.replace('### ', '').toLowerCase().replace(/ /g, '-');
      continue;
    }

    // Key-value pairs with both English and Chinese
    if (line.includes('**') && (line.includes('主标题') || line.includes('副标题') || line.includes('正文'))) {
      const keyMatch = line.match(/\*\*([^*]+)\*\*[:：]\s*(.+)/);
      if (keyMatch) {
        const key = keyMatch[1];
        const value = keyMatch[2];

        // Extract English and Chinese
        const { english, chinese } = extractChineseFromParens(value);

        if (key.includes('主标题') || key.includes('Title')) {
          result.english['title'] = english;
          result.chinese['title'] = chinese || english; // Fallback if no Chinese
        } else if (key.includes('副标题') || key.includes('Subtitle')) {
          result.english['subtitle'] = english;
          result.chinese['subtitle'] = chinese || english;
        } else if (key.includes('正文') || key.includes('Content')) {
          // Handle multi-line content
          const contentLines = [english];
          result.english['description'] = english;

          if (chinese) {
            result.chinese['description'] = chinese;
          }
        }
      }
    }

    // CTA buttons
    if (line.includes('Primary:') || line.includes('Secondary:')) {
      if (line.includes('Primary:')) {
        const value = line.replace(/.*Primary:\s*/, '').trim();
        const { english, chinese } = extractChineseFromParens(value);
        result.english['primary-cta'] = english;
        result.chinese['primary-cta'] = chinese || english;
      }
      if (line.includes('Secondary:')) {
        const value = line.replace(/.*Secondary:\s*/, '').trim();
        const { english, chinese } = extractChineseFromParens(value);
        result.english['secondary-cta'] = english;
        result.chinese['secondary-cta'] = chinese || english;
      }
    }

    // Badge items
    if (line.trim().startsWith('-') && !line.includes('**')) {
      const value = line.replace(/-\s*/, '').trim();
      if (value && currentSection === 'top-badge-bar') {
        // These are simple badges
        const badges = (result.english as any)['badges'] || [];
        badges.push(value);
        (result.english as any)['badges'] = badges;
        (result.chinese as any)['badges'] = badges; // Same for both
      }
    }
  }

  return result;
}

/**
 * Generate clean hero.en.md content
 */
function generateHeroEnglish(content: ParsedContent): string {
  const badges = (content.english['badges'] as unknown as string[]) || [];
  return `# Homepage Hero Section

## Top Badge Bar
${badges.map(b => `- ${b}`).join('\n')}

## Main Content
- **Title**: ${content.english['title'] || 'Which AI Actually Works?'}
- **Subtitle**: ${content.english['subtitle'] || 'We test them. Recommend only the Best Practice.'}
- **Description**: ${content.english['description'] || 'Test AI practice in real-world scenarios. Verify what works.'}

## CTA Buttons
- Primary: ${content.english['primary-cta'] || 'Find AI Solutions'}
- Secondary: ${content.english['secondary-cta'] || 'Join as Developer'}
`;
}

/**
 * Generate clean hero.zh.md content
 */
function generateHeroChinese(content: ParsedContent): string {
  const badges = (content.chinese['badges'] as unknown as string[]) || [];
  return `# 首页英雄区

## 顶部徽章栏
${badges.map(b => `- ${b}`).join('\n')}

## 主要内容
- **标题**: ${content.chinese['title'] || 'AI实战，谁是最佳？'}
- **副标题**: ${content.chinese['subtitle'] || '跑通AI落地的最佳实践'}
- **描述**: ${content.chinese['description'] || '在真实场景下寻找并验证AI落地的最佳实践，不仅开源代码，也开源可复刻的实践路径'}

## 行动按钮
- 主要: ${content.chinese['primary-cta'] || '寻找AI解决方案'}
- 次要: ${content.chinese['secondary-cta'] || '以开发者身份加入'}
`;
}

/**
 * Parse approach.raw.md content
 */
function parseApproachContent(content: string): ParsedContent {
  const lines = content.split('\n');
  const result: ParsedContent = {
    english: {},
    chinese: {}
  };

  // Stop at "## Notes for Content Team"
  const contentEndIndex = lines.findIndex(line => line.includes('## Notes'));
  const relevantLines = contentEndIndex >= 0 ? lines.slice(0, contentEndIndex) : lines;

  // Extract title and subtitle from Section Header
  let inSectionHeader = false;
  for (let line of relevantLines) {
    if (line.includes('### Section Header')) {
      inSectionHeader = true;
      continue;
    }
    if (inSectionHeader) {
      if (line.includes('###') && !line.includes('Section Header')) {
        break;
      }
      if (line.includes('**Title (EN)**')) {
        const value = line.replace(/.*?\*\*[^*]+\*\*[:：]\s*/, '').trim();
        result.english['title'] = value;
      }
      if (line.includes('**Title (ZH)**')) {
        const value = line.replace(/.*?\*\*[^*]+\*\*[:：]\s*/, '').trim();
        result.chinese['title'] = value;
      }
      if (line.includes('**Subtitle (EN)**')) {
        const value = line.replace(/.*?\*\*[^*]+\*\*[:：]\s*/, '').trim();
        result.english['subtitle'] = value;
      }
      if (line.includes('**Subtitle (ZH)**')) {
        const value = line.replace(/.*?\*\*[^*]+\*\*[:：]\s*/, '').trim();
        result.chinese['subtitle'] = value;
      }
    }
  }

  // Extract steps - new format with separate English/Chinese sections
  const steps: { en: string[]; zh: string[] } = { en: [], zh: [] };
  let currentStep: { num: string; enTitle: string; zhTitle: string; enContent: string[]; zhContent: string[] } | null = null;
  let inStep = false;
  let currentSection = 'none'; // 'none', 'en', 'zh', 'en-example', 'zh-example'

  for (let i = 0; i < relevantLines.length; i++) {
    const line = relevantLines[i];

    // New step
    if (line.startsWith('#### Step') || line.match(/^####\s*\d+/)) {
      // Save previous step
      if (currentStep) {
        steps.en.push(`#### ${currentStep.num} ${currentStep.enTitle}\n\n${currentStep.enContent.join('\n')}`);
        steps.zh.push(`#### ${currentStep.num} ${currentStep.zhTitle}\n\n${currentStep.zhContent.join('\n')}`);
      }

      const stepMatch = line.match(/(\d+)/);
      const stepNum = stepMatch ? stepMatch[1] : '';
      currentStep = {
        num: stepNum,
        enTitle: '',
        zhTitle: '',
        enContent: [],
        zhContent: []
      };
      inStep = true;
      currentSection = 'none';
    } else if (inStep && currentStep) {
      // Check if we hit the next step or end
      if (line.startsWith('####') || line.startsWith('###')) {
        inStep = false;
        continue;
      }

      // English title
      if (line.includes('**English Title**')) {
        currentStep.enTitle = line.replace('**English Title**', '').replace(/[:：]\s*/, '').trim();
        continue;
      }
      // Chinese title
      if (line.includes('**Chinese Title**')) {
        currentStep.zhTitle = line.replace('**Chinese Title**', '').replace(/[:：]\s*/, '').trim();
        continue;
      }
      // Section markers
      if (line.includes('**English Details**:')) {
        currentSection = 'en';
        currentStep.enContent.push('**Details:**');
        continue;
      }
      if (line.includes('**Chinese Details**:')) {
        currentSection = 'zh';
        currentStep.zhContent.push('**详细：**');
        continue;
      }
      if (line.includes('**English Example**:')) {
        currentSection = 'en-example';
        continue;
      }
      if (line.includes('**Chinese Example**:')) {
        currentSection = 'zh-example';
        continue;
      }

      // Content lines
      if (line.trim().startsWith('-')) {
        const bulletText = line.trim();
        if (currentSection === 'en' || currentSection === 'en-example') {
          currentStep.enContent.push(bulletText);
        } else if (currentSection === 'zh' || currentSection === 'zh-example') {
          currentStep.zhContent.push(bulletText);
        }
      }
      // Separator
      if (line.trim() === '---') {
        continue;
      }
    }
  }

  // Don't forget the last step
  if (currentStep) {
    steps.en.push(`#### ${currentStep.num} ${currentStep.enTitle}\n\n${currentStep.enContent.join('\n')}`);
    steps.zh.push(`#### ${currentStep.num} ${currentStep.zhTitle}\n\n${currentStep.zhContent.join('\n')}`);
  }

  result.english['steps'] = steps.en.join('\n\n---\n\n');
  result.chinese['steps'] = steps.zh.join('\n\n---\n\n');

  return result;
}

/**
 * Generate clean approach.en.md content
 */
function generateApproachEnglish(content: ParsedContent): string {
  return `# Our Approach

## ${content.english['title'] || 'Real Scenarios • Fair Competition • Single Best'}

${content.english['subtitle'] || 'Through the "Arena" mechanism, we fairly test AI practices in real business scenarios and recommend only verified best practices.'}

${content.english['steps'] || ''}
`;
}

/**
 * Generate clean approach.zh.md content
 */
function generateApproachChinese(content: ParsedContent): string {
  return `# 我们的方法

## ${content.chinese['title'] || '真实场景 • 公平竞争 • 唯一最佳'}

${content.chinese['subtitle'] || '通过"Arena"机制，我们在真实业务场景中公平测试AI实践，只推荐验证的最佳实践。'}

${content.chinese['steps'] || ''}
`;
}

/**
 * Parse simple page content (About, FAQ, Framework, Arena page)
 */
function parseSimplePage(content: string, locale: 'en' | 'zh'): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let currentLangSection: 'en' | 'zh' | 'both' = 'both'; // Track which language section we're in

  for (let line of lines) {
    // Skip team notes
    if (line.includes('## Team') || line.includes('## Notes') || line.includes('## Notes for Content Team')) {
      break;
    }

    // Check for language section markers
    if (line.trim() === '#### English') {
      currentLangSection = 'en';
      continue; // Skip the marker line
    }
    if (line.trim() === '#### 中文') {
      currentLangSection = 'zh';
      continue; // Skip the marker line
    }

    // Handle section headers (reset language section to 'both')
    if (line.match(/^##\s+/)) {
      currentLangSection = 'both';
    }

    // Extract English or Chinese based on locale
    if (locale === 'en') {
      // Skip headers from 'zh' section
      if (line.match(/^#+\s/) && currentLangSection === 'zh') {
        // Skip Chinese-only headers when in 'zh' section
        continue;
      }
      // Handle headers based on content and language section
      else if (line.match(/^#+\s/)) {
        // Skip Chinese-only headers in English version
        if (locale === 'en' && isChinese(line) && !isEnglish(line) && !line.match(/[a-zA-Z]/)) {
          if (line.match(/^###\s/)) {
            currentLangSection = 'zh';
          }
          continue;
        }
        // Extract appropriate language from bilingual headers
        const headerMatch = line.match(/^(#+)\s+(.+)/);
        if (headerMatch) {
          const level = headerMatch[1];
          const text = headerMatch[2];

          if (locale === 'en') {
            // Extract English part from bilingual header
            // Pattern: "English Text 中文文本" or "English Text (中文文本)"
            const englishMatch = text.match(/^([a-zA-Z\s\(\)\-\,\.\'\"\:]+)/);
            if (englishMatch) {
              result.push(`${level} ${englishMatch[1].trim()}`);
            } else {
              result.push(line); // Keep as-is if can't parse
            }
          } else {
            // Extract Chinese part from bilingual header
            const chineseMatch = text.match(/[\u4e00-\u9fa5]+/g);
            if (chineseMatch && chineseMatch.length > 0) {
              result.push(`${level} ${chineseMatch.join(' ')}`);
            } else {
              result.push(line); // Keep as-is if can't parse
            }
          }
        }
      }
      // Keep English content
      // Include content if we're in 'en' or 'both' section
      else if ((currentLangSection === 'en' || currentLangSection === 'both') &&
               (isEnglish(line) || line.trim() === '' || line.includes('**English**'))) {
        let cleaned = line.replace(/（[^）]+）/g, '').trim();
        cleaned = cleaned.replace(/^\*\*English\*\*[:：]\s*/, '').trim();
        result.push(cleaned);
      }
      // Skip content from 'zh' section
      else if (currentLangSection === 'zh') {
        // Skip
      }
      // Skip pure Chinese lines (except headers)
      else if (isChinese(line) && !line.match(/^#+\s/)) {
        // Skip
      }
    } else {
      // Extract Chinese translations
      // Skip headers from 'en' section
      if (line.match(/^#+\s/) && currentLangSection === 'en') {
        // Skip English-only headers when in 'en' section
        continue;
      }
      // Handle headers
      else if (line.match(/^#+\s/)) {
        // Extract Chinese part from bilingual headers
        const headerMatch = line.match(/^(#+)\s+(.+)/);
        if (headerMatch) {
          const level = headerMatch[1];
          const text = headerMatch[2];
          // Extract Chinese part from bilingual header
          const chineseMatch = text.match(/[\u4e00-\u9fa5]+/g);
          if (chineseMatch && chineseMatch.length > 0) {
            result.push(`${level} ${chineseMatch.join(' ')}`);
          } else if (isChinese(text)) {
            result.push(line);
          } else {
            // Skip English-only headers in Chinese version
            continue;
          }
        }
      }
      // Include content if we're in 'zh' or 'both' section
      else if ((currentLangSection === 'zh' || currentLangSection === 'both') &&
          (isChinese(line) || line.trim() === '')) {
        result.push(line);
      }
      // Skip content from 'en' section
      else if (currentLangSection === 'en') {
        // Skip
      }
      // Handle special markers in 'both' section
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

  // Clean up empty lines
  return result.filter((line, index, arr) => {
    // Remove consecutive empty lines
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

  // Parse based on file type
  let enContent: string;
  let zhContent: string;

  if (fileName === 'hero') {
    const parsedContent = parseHeroContent(rawContent);
    enContent = generateHeroEnglish(parsedContent);
    zhContent = generateHeroChinese(parsedContent);
  } else if (fileName === 'approach') {
    const parsedContent = parseApproachContent(rawContent);
    enContent = generateApproachEnglish(parsedContent);
    zhContent = generateApproachChinese(parsedContent);
  } else if (['page', 'overview', 'implementation', 'requirements', 'validation-report', 'project-report'].includes(fileName)) {
    // Parse simple pages
    enContent = parseSimplePage(rawContent, 'en');
    zhContent = parseSimplePage(rawContent, 'zh');
  } else {
    // For unknown files, just copy raw to both for now
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
