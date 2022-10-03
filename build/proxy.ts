/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

/**
 * Generate proxy
 * @param list
 */
export function createProxyBuilder(list: ProxyList = []) {
    const ret: ProxyTargetList = {};
    for (const [prefix, target] of list) {
        const isHttps = httpsRE.test(target);
        // https://github.com/http-party/node-http-proxy#options
        ret[prefix] = {
            target: target,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            // https is require secure=false
            ...(isHttps ? {secure: false} : {}),
        };
    }
    return ret;
}

export function createProxy(target: string){
    return {
        target: target,
        // 是否跨域
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
    } as ProxyOptions;
}

