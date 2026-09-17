import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
const versions = [
  { name: 'V2 EN', language: 'English', gpa: false, file: 'Junghun_Hwang_CV_V2_EN.pdf' },
  { name: 'V2 KO', language: '한국어', gpa: false, file: 'Junghun_Hwang_CV_V2_KO.pdf' },
  { name: 'V1 EN', language: 'English', gpa: true, file: 'Junghun_Hwang_CV_V1_EN.pdf' },
  { name: 'V1 KO', language: '한국어', gpa: true, file: 'Junghun_Hwang_CV_V1_KO.pdf' },
];
export const cvs = versions.map(cv => ({ ...cv, href: existsSync(resolve('public/cv', cv.file)) ? `/cv/${cv.file}` : undefined }));
