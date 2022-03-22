import { ElLoading } from 'element-plus';
import { functionTypeBase } from '@/constant/Type';

const TIME = 1000;
const BACKGROUND = 'rgba(0, 0, 0, 0.4)';
const ICON = 'el-icon-loading';

/*---------------Service---------------*/
/**
 * 默认样式加载框
 *
 * @param {string} text
 * @param {function} domain
 */
export function openFullScreen (text: string, domain: functionTypeBase<void>) {
  const loading = ElLoading.service({
    lock: true,
    text: text,
    // spinner: ICON,
  });
  setTimeout(() => {
    loading.close();
    domain();
  }, TIME);
}
/**
 * loading加载框，可设置时间
 *
 * @param {string} text
 * @param {function} domain
 * @param {number} time
 */
export function openFullScreenTime(text: string, domain: functionTypeBase<void>, time: number) {
  openFullScreenBase(text, ICON, BACKGROUND, domain, time);
}

/**
 * loading加载框，可设置加载图标
 *
 * @param {string} text
 * @param {string} icon
 * @param {function} domain
 */
export function openFullScreenIcon(text: string, icon: string, domain: functionTypeBase<void>) {
  openFullScreenBase(text, icon, BACKGROUND, domain, TIME);
}

/**
 * 自定义加载框
 *
 * @param {string} text 加载文字
 * @param {string} icon 加载显示图标
 * @param {string} bg 背景颜色
 * @param {function} domain 加载完成后调用的方法
 * @param {number} time 时间
 */
export function openFullScreenBase(text: string, icon: string, bg: string, domain: functionTypeBase<void>, time: number) {
  const loading = ElLoading.service({
    lock: true,
    text: text,
    spinner: icon,
    background: bg,
  });
  setTimeout(() => {
    loading.close();
    domain();
  }, time);
}
/*---------------Directive---------------*/
