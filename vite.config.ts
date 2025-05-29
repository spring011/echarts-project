import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import pxToVw from 'postcss-px-to-viewport-8-plugin';
import Unocss from 'unocss/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const isBuild = command === 'build';
  const isProd = mode === 'production';
  const cwd = process.cwd();

  const envConf = loadEnv(mode, cwd);

  const isDrop = envConf?.VITE_DROP === 'true';

  console.log({ isBuild, isProd, isDrop });

  return defineConfig({
    base: envConf.VITE_CONF_BASE,
    plugins: [vue(), Components({ resolvers: [NaiveUiResolver()] }), Unocss(), vueDevTools()],
    resolve: { alias: { '@': resolve('src') } },
    esbuild: { drop: isDrop ? ['console'] : [] },
    build: {
      outDir: 'dist/' + mode,
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            core: [
              'vue',
            ],
            mapboxgl: [
              '@turf/turf',
            ],
            echarts: ['echarts'],
          },
        },
      },
    },
    server: {
      open: true,
      cors: true,
      host: true,
      port: +envConf.VITE_PORT,
      proxy: {
        [`${envConf.VITE_API_PREFIX_1}`]: {
          target: envConf.VITE_API_PROXY_HOST_1,
          changeOrigin: true,
        },
        [`${envConf.VITE_API_PREFIX_2}`]: {
          target: envConf.VITE_API_PROXY_HOST_2,
          changeOrigin: true,
        },
        [`${envConf.VITE_API_PREFIX_3}`]: {
          target: envConf.VITE_API_PROXY_HOST_3,
          changeOrigin: true,
        },
        [`${envConf.VITE_API_PREFIX_4}`]: {
          target: envConf.VITE_API_PROXY_HOST_4,
          changeOrigin: true,
        },
        [`${envConf.VITE_API_PREFIX_5}`]: {
          target: envConf.VITE_API_PROXY_HOST_5,
          changeOrigin: true,
        },
        [`${envConf.VITE_API_PREFIX_6}`]: {
          changeOrigin: true,
          target: envConf.VITE_API_PROXY_HOST_6,
          rewrite: (path) => path.replace(envConf.VITE_API_PREFIX_6, '/service/api'),
        },
        [`${envConf.VITE_API_PREFIX_7}`]: {
          changeOrigin: true,
          target: envConf.VITE_API_PROXY_HOST_7,
          rewrite: (path) => path.replace(envConf.VITE_API_PREFIX_7, '/stationNet'),
        },
        [`${envConf.VITE_API_PREFIX_8}`]: {
          changeOrigin: true,
          target: envConf.VITE_API_PROXY_HOST_8,
          rewrite: (path) => path.replace(envConf.VITE_API_PREFIX_8, '/dataset'),
        },
        [`${envConf.VITE_API_PREFIX_GRAFANA}`]: {
          changeOrigin: true,
          target: envConf.VITE_API_PROXY_HOST_GRAFANA,
        },
        [`${envConf.VITE_WS_PREFIX_1}`]: {
          target: envConf.VITE_WS_HOST_1,
          changeOrigin: true,
          ws: true,
        },
        [`${envConf.VITE_WS_PREFIX}`]: {
          target: envConf.VITE_WS_HOST,
          changeOrigin: true,
          ws: true,
        },
        [`${envConf.VITE_WS_PREFIX_2}`]: {
          target: envConf.VITE_WS_HOST_2,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(envConf.VITE_WS_PREFIX_2, '/ws'),
        },
        '^/lixianditu/.*': {
          changeOrigin: true,
          target: envConf.VITE_BASE_baseMAPURL,
          rewrite: (path) => path.replace(/^\/lixianditu/, '/lixianditu'),
        },
        '^/map/fonts/.*': {
          changeOrigin: true,
          target: envConf.VITE_BASE_baseMAPURL,
          rewrite: (path) => path.replace(/^\/map\/fonts/, '/map/fonts'),
        },
        '^/map/data/.*': {
          changeOrigin: true,
          target: envConf.VITE_BASE_baseMAPURL,
          rewrite: (path) => path.replace(/^\/map\/data/, '/map/data'),
        },
      },
    },
  });
};
