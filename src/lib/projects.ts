import { getCollection, type CollectionEntry } from 'astro:content';
export type Language = 'en' | 'ko';
export const projectUrl = (data: CollectionEntry<'projects'>['data']) => `${data.lang === 'ko' ? '/ko' : ''}/projects/${data.slug}/`;
export const statusLabel = { en: { completed: 'Completed', ended: 'Project ended', ongoing: 'Ongoing', design: 'Design phase' }, ko: { completed: '완료', ended: '프로젝트 종료', ongoing: '진행 중', design: '설계 단계' } };
export async function allProjects() {
  const entries = await getCollection('projects');
  const keys = entries.map(({ data }) => `${data.lang}/${data.slug}`);
  if (new Set(keys).size !== keys.length) throw new Error('Duplicate project slug / language pair.');
  for (const { data } of entries) {
    const counterpart = entries.find(entry => entry.data.slug === data.slug && entry.data.lang !== data.lang)?.data;
    if (!counterpart) throw new Error(`Missing translation for project: ${data.slug}`);
    for (const field of ['order', 'status', 'github', 'githubVisibility', 'githubPrivateReason', 'demo', 'technologies', 'featured'] as const) {
      if (JSON.stringify(data[field]) !== JSON.stringify(counterpart[field])) throw new Error(`Project translations differ: ${data.slug}.${field}`);
    }
  }
  return entries.sort((a, b) => a.data.order - b.data.order);
}
