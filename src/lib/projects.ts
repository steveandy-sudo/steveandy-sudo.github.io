import { getCollection, type CollectionEntry } from 'astro:content';
export type Language = 'en';
export const projectUrl = (data: CollectionEntry<'projects'>['data']) => `/projects/${data.slug}/`;
export const statusLabel = { en: { completed: 'Completed', ended: 'Project ended', ongoing: 'Ongoing', design: 'Design phase' } };
export async function allProjects() {
  const entries = await getCollection('projects');
  const slugs = entries.map(({ data }) => data.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error('Duplicate project slug.');
  return entries.sort((a, b) => a.data.order - b.data.order);
}
