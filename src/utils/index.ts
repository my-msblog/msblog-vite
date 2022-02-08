export function randomNum(Min: number, Max: number) {
    const Range = Max - Min;
    const Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

export function strIsEmpty(str: string): boolean{
    return  str === undefined || str === null || str.length === 0;
}

export function strNonEmpty(str: string): boolean{
    return !strIsEmpty(str);
}

export function arryIsEmpty(arr: []): boolean{
    return arr === undefined || arr === null || arr.length === 0;
}

export function arryRemove<T>(arr: T[], el: T): void{
    const index: number = arr.indexOf(el);
    if (index > -1) {
        arr.splice(index, 1);
        return;
    }
    throw new Error('no find element in Arry');
}