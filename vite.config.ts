import { loadEnv, UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import viteSvgIcons from 'vite-plugin-svg-icons';
// auto import
import Components from 'unplugin-vue-components/vite';
// element plus auto import loader
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';

import { createProxy } from './build/proxy';
import { wrapperEnv } from './build/utils';
import { htmlPlugin } from './build/plugins';

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_APP_BASE_API, VITE_APP_HOST, VITE_GLOB_APP_TITLE } = viteEnv;
  return {
    plugins: [
      vue(),
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/styles/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      htmlPlugin( VITE_GLOB_APP_TITLE),
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dirs: ['src/components'],
        dts: 'types/components.d.ts',
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      })
    ],
    define: {
      'process.env': {}
    },
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: '@',
          replacement: pathResolve('src'),
        },
        {
          find: '#',
          replacement: pathResolve('types'),
        },
      ],
    },
    server: {
      port: VITE_PORT,
      host: VITE_APP_HOST,
      https: false,
      proxy: {
        '/api': createProxy(VITE_APP_BASE_API),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/constant.scss" as *;',
        }
      }
    },
    optimizeDeps: {
      include: [
        '@kangc/v-md-editor/lib/theme/github.js',
        '@kangc/v-md-editor/lib/theme/vuepress.js'
      ],
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        }
      }
    }
  };
};
