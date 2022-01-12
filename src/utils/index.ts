export function randomNum(Min: number, Max: number) {
    const Range = Max - Min;
    const Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

export function strIsEmpty(str: string): boolean{
    return str.length === 0 || str === undefined || str === null;
}

export function strNonEmpty(str: string): boolean{
    return !strIsEmpty(str);
}

export function arryIsEmpty(arr: []): boolean{
    return arr.length === 0 || arr === undefined || arr === null;
}