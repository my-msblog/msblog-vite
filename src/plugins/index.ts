/* 加载插件文件 */
import { createApp } from 'vue';
import.meta.globEager('./module/*.js');

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeof createApp>} app 整个应用的实例
 */
export async function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = import.meta.glob('./*.ts') ;
  for(const file in files){
    await files[file]().then((mod)=>{
      if( typeof mod.default === 'function'){
        mod.default(app);
      }
    });
  }
}
