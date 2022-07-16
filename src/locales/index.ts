import { createI18n } from 'vue-i18n';
import type { App } from 'vue';
import zh from './lang/zh';
import en from './lang/en';
import ElementPlus from 'element-plus';
import ZhLocale from 'element-plus/lib/locale/lang/zh-cn'; // 中文
import EhLocale from 'element-plus/lib/locale/lang/en'; // 英文

export const i18nOption = createI18n({
  //fallbackLocale: 'zh',
  locale: localStorage.getItem('lang') || 'zh', //默认显示的语言
  //globalInjection: true,
  //legacy: true, // you must specify 'legacy: false' option
  messages: {
    zh: {
      ...zh,
      //...ZhLocale
    },
    en: {
      ...en,
      //...EhLocale
    }
  }
});

export function setupI18n(app: App) {
  let locale;
  // 控制 element-plus 组件语言
  if(i18nOption.global.fallbackLocale == 'zh') {
    locale = ZhLocale ;
  } else {
    locale = EhLocale;
  }
  app.use(i18nOption);
  app.use(ElementPlus, { locale });
}

