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
    css: {
      postcss: {
        plugins: [
          pxToVw({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: +envConf?.VITE_VIEWPORT, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*', '!min-width', '!min-height'], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            // 下面配置表示类名中含有'keep-px'都不会被转换
            selectorBlackList: ['keep-px'],
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1338, // 横屏时使用的视口宽度
          }),
        ],
      },
    },
  });
};
