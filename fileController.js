import fs from 'fs';
import { resolve } from 'path';

const basePath = resolve(); // 기본 베이스 절대경로

export const readJSON = (path) =>
  JSON.parse(fs.readFileSync(resolve(basePath, path), 'utf-8'));
