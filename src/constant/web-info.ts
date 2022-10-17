/** 
 *  网站信息
*/

// 当前年份
const year = new Date().getFullYear();

// 版权声明
export const copyright = `Copyright ©2020-${year} by MS`;

// 工信部备案
export const icp_code = '闽ICP备2022014749号';

// 工信部网址
export const icp_url = 'https://beian.miit.gov.cn/';

// 公安部备案
export const mps_code = '';

// 公安部备案查询地址
export const mps_url = 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=';

export default {
  copyright,
  icp_code,
  icp_url,
  mps_code,
  mps_url,
};