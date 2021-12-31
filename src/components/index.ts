import type { App } from 'vue';
import { customComp } from '@/components/register';

export function registerGlobComp(app: App)　{
  customComp.forEach(component => {
    app.component(component.name, component);
  });
}
