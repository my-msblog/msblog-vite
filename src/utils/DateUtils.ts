/**
 * 对日期进行格式化 默认yyyy-MM-dd HH:mm:ss
 * 可不带参数 一个日期参数 或一个格式化参数
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     H:小时(0-23),
 *     h:小时(0-11),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     f:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @param strDate
 * @param strFormat
 */
export function dateFormat(strDate: any, strFormat?: any) {
  if (!strDate){
    return;
  }
  if (!strFormat){
    strFormat = 'yyyy-MM-dd';
  }
  switch (typeof strDate) {
    case 'string':
      strDate = new Date(strDate.replace(/-/, '/'));
      break;
    case 'number':
      strDate = new Date(strDate);
      break;
  }
  if (strDate instanceof Date){
    const dict: any = {
      yyyy: strDate.getFullYear(),
      M: strDate.getMonth() + 1,
      d: strDate.getDate(),
      H: strDate.getHours(),
      m: strDate.getMinutes(),
      s: strDate.getSeconds(),
      MM: ('' + (strDate.getMonth() + 101)).substring(1),
      dd: ('' + (strDate.getDate() + 100)).substring(1),
      HH: ('' + (strDate.getHours() + 101)).substring(1),
      mm: ('' + (strDate.getMinutes() + 101)).substring(1),
      ss: ('' + (strDate.getSeconds() + 101)).substring(1),
    };
    return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function () {
      // eslint-disable-next-line prefer-rest-params
      return dict[arguments[0]];
    });
  }
}
