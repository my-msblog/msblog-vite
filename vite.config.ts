import { UserConfig, ConfigEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { loadEnv } from 'vite';
// auto import
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// element plus auto import loader
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
      // 自动导入
      // ElementPlus({
      //   useSource: true
      // }),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      //   //imports: ['vue'],
      //   dts: 'types/auto-import.d.ts'
      // }),
      Components({
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dirs: ['src/components'],
        //组件名称包含目录，防止同名组件冲突
        // directoryAsNamespace: true,
        //指定类型声明文件，为true时在项目根目录创建
        dts: 'types/components.d.ts',
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
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
          additionalData: '@use "@/styles/constant.scss" as *;',
        }
      }
    },
    optimizeDeps: {
      include: ['@kangc/v-md-editor/lib/theme/github.js'],
    },
  };
};
