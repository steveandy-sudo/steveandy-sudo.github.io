import { getCollection, type CollectionEntry } from 'astro:content';
export type Language = 'en' | 'ko';
export const projectUrl = (data: CollectionEntry<'projects'>['data']) => `${data.lang === 'ko' ? '/ko' : ''}/projects/${data.slug}/`;
export const statusLabel = { en: { completed: 'Completed', ongoing: 'Ongoing', design: 'Design phase' }, ko: { completed: '완료', ongoing: '진행 중', design: '설계 단계' } };
export async function allProjects() {
  const entries = await getCollection('projects');
  const keys = entries.map(({ data }) => `${data.lang}/${data.slug}`);
  if (new Set(keys).size !== keys.length) throw new Error('Duplicate project slug / language pair.');
  return entries.sort((a, b) => a.data.order - b.data.order);
}
