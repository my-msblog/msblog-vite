import { ElMessage } from 'element-plus';
export function randomNum(Min: number, Max: number) {
    const Range = Max - Min;
    const Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

export function strIsEmpty(str: string | null): boolean {
    return str === undefined || str === null || str.length === 0;
}

export function strNonEmpty(str: string): boolean {
    return !strIsEmpty(str);
}

export function arryIsEmpty(arr: any[]): boolean {
    return arr === undefined || arr === null || arr.length === 0;
}

export function arryRemove<T>(arr: T[], el: T): void {
    const index: number = arr.indexOf(el);
    if (index > -1) {
        arr.splice(index, 1);
        return;
    }
    throw new Error('no find element in Arry');
}

export function getImageUrl(name: string) {
    return new URL(`../assets/${name}`, import.meta.url).href;
}

export function copyToClip(content: string) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(content).then(
            function () {
                ElMessage.success('复制成功');
            },
            function () {
                ElMessage.error('复制失败，请手动复制');
            },
        );
    }
}

