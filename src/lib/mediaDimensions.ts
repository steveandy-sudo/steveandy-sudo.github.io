import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { imageMetadata } from 'astro/assets/utils';

const dimensions = new Map<string, Promise<{ width: number; height: number }>>();

// Reserve each asset's space before lazy loading so section links stay aligned.
export function mediaDimensions(src: string) {
  if (!src.startsWith('/media/')) throw new Error(`Expected a local media asset: ${src}`);
  let pending = dimensions.get(src);
  if (!pending) {
    pending = readFile(resolve('public', src.slice(1))).then(data => imageMetadata(data, src));
    dimensions.set(src, pending);
  }
  return pending;
}
