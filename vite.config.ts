import { UserConfig, ConfigEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { loadEnv } from 'vite';
import { createProxy } from './build/proxy';
import { wrapperEnv } from './build/utils';
import { htmlPlugin } from './build/plugins';

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({mode }: ConfigEnv): UserConfig => {
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
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
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
          additionalData: '@import "./src/styles/constant.scss";',
        }
      }
    },
  };
};
