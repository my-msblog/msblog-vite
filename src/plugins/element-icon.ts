import { createVNode } from 'vue';
import  * as Icons from '@element-plus/icons-vue' ;
export default (app: any) => {
  // 创建Icon组件
  const Icon = (props: { icon: string }) => {
    const { icon } = props;
    return createVNode(Icons[icon as keyof typeof Icons]);
  };
  app.component('Icon', Icon);
};
