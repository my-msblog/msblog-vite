import { createApp } from 'vue';
import App from '@/App.vue';
// element plus style introduction
import 'element-plus/theme-chalk/display.css';
import 'element-plus/dist/index.css';
import { loadAllPlugins } from '@/plugins/index';

(async()=>{
   const app =  createApp(App);
   await loadAllPlugins(app);
    
   app.mount('#app');
})();

