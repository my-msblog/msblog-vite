import { number } from "echarts";

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

/**
 * T value 值
 * R lable 值
 * 
 */
export interface BaseOptions<T = unknown, R = unknown>{
  value?: string | number | T;
  label?: string | number | R;
  [key: string]: any;
}

export interface CustomOptions extends BaseOptions{
  value: string | number;
  label: string | number;
}
