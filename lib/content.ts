import fs from 'fs';
import path from 'path';

export interface ContentFile {
  content: string;
  frontmatter?: Record<string, any>;
}

/**
 * Read content file based on locale and path
 * @param contentType - Content type (e.g., 'Homepage', 'Arena', 'Framework')
 * @param fileName - File name without extension
 * @param locale - Locale ('en' or 'zh')
 * @returns Content file with frontmatter parsed
 */
export async function getContentFile(
  contentType: string,
  fileName: string,
  locale: string
): Promise<ContentFile | null> {
  try {
    const contentDir = path.join(process.cwd(), 'Content', contentType);
    const filePath = path.join(contentDir, `${fileName}.${locale}.md`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Try fallback to English if locale-specific file doesn't exist
      const enFilePath = path.join(contentDir, `${fileName}.en.md`);
      if (fs.existsSync(enFilePath)) {
        const content = fs.readFileSync(enFilePath, 'utf-8');
        return { content };
      }
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter if exists (between first --- and second ---)
    let frontmatter: Record<string, any> | undefined;
    let bodyContent = content;

    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (frontmatterMatch) {
      try {
        // Simple frontmatter parsing (you may want to use a proper parser like gray-matter)
        frontmatterMatch[1].split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            frontmatter = frontmatter || {};
            frontmatter[key.trim()] = value;
          }
        });
        bodyContent = frontmatterMatch[2];
      } catch (e) {
        // If parsing fails, use original content
        bodyContent = content;
      }
    }

    return { content: bodyContent, frontmatter };
  } catch (error) {
    console.error(`Error reading content file: ${contentType}/${fileName}.${locale}.md`, error);
    return null;
  }
}

/**
 * Get arena content files list
 * @returns List of arena IDs
 */
export function getArenaIds(): string[] {
  try {
    const arenasDir = path.join(process.cwd(), 'Content', 'Arena');
    if (!fs.existsSync(arenasDir)) {
      return [];
    }

    const entries = fs.readdirSync(arenasDir, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    console.error('Error reading arena directories', error);
    return [];
  }
}

/**
 * Get arena detail content
 * @param arenaId - Arena ID (folder name)
 * @param pageType - Page type (overview, implementation, requirements, validation-report, project-report)
 * @param locale - Locale
 */
export async function getArenaContent(
  arenaId: string,
  pageType: string,
  locale: string
): Promise<ContentFile | null> {
  return getContentFile(`Arena/${arenaId}`, pageType, locale);
}

/**
 * Get homepage section content
 * @param section - Section name (hero, approach, practice-includes, etc.)
 * @param locale - Locale
 * @deprecated Use getHomepageSectionContent instead
 */
export async function getHomepageContent(
  section: string,
  locale: string
): Promise<ContentFile | null> {
  return getContentFile('Homepage', section, locale);
}

/**
 * Section header names per locale. Used so .zh.md can use Chinese headers (content quality).
 * Callers pass the logical section key (e.g. 'Hero Section'); we look up the header for the locale.
 */
const HOMEPAGE_SECTION_HEADERS: Record<string, Record<string, string>> = {
  'Hero Section': { en: 'Hero Section', zh: '英雄区' },
  'Featured Arenas Section': { en: 'Featured Arenas Section', zh: '精选实践区' },
  'Industries Section': { en: 'Industries Section', zh: '行业区' },
  'Approach Section': { en: 'Approach Section', zh: '方法区' },
  'Practice Includes Section': { en: 'Practice Includes Section', zh: '实践包含区' },
  'Case Studies Section': { en: 'Case Studies Section', zh: '案例研究区' },
  'Trust Section': { en: 'Trust Section', zh: '信任区' },
  'Final CTA Section': { en: 'Final CTA Section', zh: '最终行动区' },
};

/**
 * Get homepage section content from consolidated homepage file.
 * Uses locale-appropriate section headers so .zh.md can have Chinese-only content (quality checklist).
 * @param section - Logical section key (Hero Section, Featured Arenas Section, etc.)
 * @param locale - Locale
 */
export async function getHomepageSectionContent(
  section: string,
  locale: string
): Promise<ContentFile | null> {
  const contentFile = await getContentFile('Homepage', 'homepage', locale);
  if (!contentFile) return null;

  const sectionHeader =
    HOMEPAGE_SECTION_HEADERS[section]?.[locale] ?? section;
  const escaped = sectionHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sectionRegex = new RegExp(
    `## ${escaped}[\\s\\S]*?(?=##\\s|$)`,
    'i'
  );
  const sectionMatch = contentFile.content.match(sectionRegex);

  if (sectionMatch) {
    return { content: sectionMatch[0] };
  }

  return null;
}

/**
 * Parse homepage section content and return key-value pairs
 */
export function parseHomepageSectionContent(
  content: string
): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.trim().startsWith('- **')) {
      const match = line.match(/-\s*\*\*([^*]+)\*\*\s*[:：]\s*(.+)/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        result[key] = value;
      }
    }
  }

  return result;
}

/**
 * Get page content (Framework, FAQ, About)
 * @param pageType - Page type
 * @param section - Section name
 * @param locale - Locale
 */
export async function getPageContent(
  pageType: string,
  section: string,
  locale: string
): Promise<ContentFile | null> {
  return getContentFile(pageType, section, locale);
}
