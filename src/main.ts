import { createApp } from 'vue';
import App from '@/App.vue';
// element plus style introduction
import 'element-plus/theme-chalk/display.css';
import 'element-plus/theme-chalk/src/message.scss';
// custom animations
import '@/styles/ann.css';
import '@/styles/index.css';
// svg global config
import 'virtual:svg-icons-register';

import router from './router';
import store from './store';
import { loadAllPlugins } from '@/plugins';
import { setupI18n } from '@/locales';

(async()=>{
   const app =  createApp(App);
   // Multilingual configuration
   setupI18n(app);
   // Load plugins
   await loadAllPlugins(app);
   // router ready https://next.router.vuejs.org/api/#isready
   app.use(router);
   // await router.isReady();
   app.use(store);
   app.mount('#app');
})();

