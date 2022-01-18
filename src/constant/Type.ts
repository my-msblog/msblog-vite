export function NullArray<T> (): Array<T>{
  return [];
}
export function NullFunctionArry<T> (): () => T[]{
  return () => [] as T[];
}
export function DataArray<T> (data: Array<T>): Array<T>{
  return data;
}
interface obj{
  [key: string]: any;
}
export function NullData<T> (t: T ): T{
  return t;
}
export function NullObject<T> (): T{
  return {} as T;
}
export function NullFunction (){
  return () => {};
}
export interface FunctionType {
  (): void;
}
export interface FunctionTypeOfString {
  (): string;
}
export interface FunctionTypeOfNumber {
  (): number;
}
export interface FunctionTypeOfArray<T>{
  (): Array<T>;
}
export interface functionTypeBase<T>{
  (): T;
}

export interface BaseOptions<T>{
  value?: string | number | T;
  label?: string | number | T;
  [key: string]: any;
}
