export {};
declare global {
    declare type Nullable<T> = T | null;
    declare interface ViteEnv {
        VITE_PORT: number;
        NODE_ENV: string;
        VITE_BUILD_ENV: string;
        VITE_PUBLIC_PATH: string;
        VITE_ADMIN_TITLE: string;
        VITE_PROXY: [string, string][];
        VITE_GLOB_APP_TITLE: string;
        VITE_GLOB_APP_SHORT_NAME: string;
        VITE_APP_HOST: string;
        VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    }
}
