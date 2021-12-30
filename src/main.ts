import { createApp } from 'vue';
import App from '@/App.vue';
// element plus style introduction
import 'element-plus/theme-chalk/display.css';
import 'element-plus/dist/index.css';
// custom animations
import '@/styles/ann.css';
// svg global config
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/icon/index.vue'
//import svgLoader from './plugins/svgIcon/svg-loader';
import router from './router';
import store from './store';
import { loadAllPlugins } from '@/plugins/index';
import { setupI18n } from '@/locales';
import { registerGlobComp } from '@/components';

(async()=>{
   const app =  createApp(App);
   // svg plugin
   app.component('SvgIcon', SvgIcon);
   // Multilingual configuration
   setupI18n(app);
   // Load plugins
   await loadAllPlugins(app);
    // Register global components
   registerGlobComp(app);
   // router ready https://next.router.vuejs.org/api/#isready
   app.use(router);
   // await router.isReady();
   app.use(store);
   app.mount('#app');
})();

