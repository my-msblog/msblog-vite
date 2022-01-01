

export enum Status{
  true = 0,
  false = 1,
}
export const getStatusEnum = {
  0: true,
  1: false,
};
export function getStatus(status: number | string | boolean ): boolean{
  switch (typeof status){
    case 'number':
      return status == 0;
    case 'string':
      return status == 'true';
    case 'boolean':
      return status;
    default:
      return false;
  }
}
