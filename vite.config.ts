import { defineConfig, UserConfig, ConfigEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { loadEnv } from 'vite';
import { createProxy } from './build/proxy';
import { wrapperEnv } from './build/utils';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_APP_BASE_API, VITE_PROXY, VITE_APP_HOST } = viteEnv;
  return {
    plugins: [
      vue(),
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/styles/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
          // 配置别名
          '@': path.resolve(__dirname, './src'),
          '@assets': path.resolve(__dirname,'./src/assets'),
          '@components': path.resolve(__dirname,'./src/components'),
          '@views': path.resolve(__dirname,'./src/views'),
          '@store': path.resolve(__dirname,'./src/store'),
        }
    },
    
    server: {
      port: VITE_PORT,
      host: VITE_APP_HOST,
      https: false,
      proxy: {
        '/api': {
          // 接口域名
          target: VITE_APP_BASE_API,
          // 是否跨域
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        }
      }
    },
  }
};
