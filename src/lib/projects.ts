import { getCollection, type CollectionEntry } from 'astro:content';
export type Language = 'en' | 'ko';
export const homeUrl = (lang: Language) => lang === 'ko' ? '/ko/' : '/';
export const projectUrl = (data: CollectionEntry<'projects'>['data']) => `${homeUrl(data.lang)}projects/${data.slug}/`;
export const statusLabel = {
  en: { completed: 'Completed', ended: 'Project ended', ongoing: 'Ongoing', design: 'Design phase' },
  ko: { completed: '완료', ended: '프로젝트 종료', ongoing: '진행 중', design: '설계 단계' },
};
export async function allProjects() {
  const entries = await getCollection('projects');
  const slugs = entries.map(({ data }) => `${data.lang}/${data.slug}`);
  if (new Set(slugs).size !== slugs.length) throw new Error('Duplicate project translation.');
  for (const entry of entries) {
    const other = entries.find(item => item.data.slug === entry.data.slug && item.data.lang !== entry.data.lang);
    if (!other) throw new Error(`Missing project translation: ${entry.id}`);
    for (const key of ['order', 'titleEn', 'period', 'team', 'status', 'technologies', 'github', 'githubVisibility', 'demo', 'featured'] as const) {
      if (JSON.stringify(entry.data[key]) !== JSON.stringify(other.data[key])) throw new Error(`Translation fact mismatch: ${entry.id} ${key}`);
    }
  }
  return entries.sort((a, b) => a.data.order - b.data.order);
}
