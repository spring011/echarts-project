import minimist from 'minimist';
import { join, resolve } from 'path';
import { loadEnv } from 'vite';
import createV3Json from './createV3Json.mjs';

const rootDir = resolve('.');
const dist = 'dist';
const argv = minimist(process.argv.slice(2));

const mode = argv?.mode || 'development';
console.log('mode:', mode);
const { VITE_BASE_baseMAPURL } = loadEnv(mode, process.cwd());

const outputDir = mode === 'development' ? 'public' : join(dist, mode);
const v3 = createV3Json(VITE_BASE_baseMAPURL, resolve(rootDir, outputDir, 'v3.json'));
if (!v3) {
  console.log('❌ 创建v3.json文件失败');
} else {
  console.log('✅ 创建v3.json文件成功');
}

// const configPreloadJs = require("./createConfigPreloadJs")(
//   {
//     MapBaseUrl: VITE_BASE_baseMAPURL,
//     ApiBaseUrl: VITE_BASE_baseURL,
//     AuthorityLevel: VITE_AUTHORITY_LEVEL,
//   },
//   path.resolve(rootDir, outputDir, "js"),
//   "config-preload.js"
// );

// if (!configPreloadJs) {
//   console.log("❌ config-preload.js文件写入失败  😭");
//   return;
// }
// console.log("✅ config-preload.js文件已生成  😁");
