

export interface Column{
  soltName?: 'action' | string;
  label: string;
  prop: string;
  width?: string;
  columnType?: boolean;
  headerAlign?: 'left' | 'center' | 'right';
  align?: 'left' | 'center' | 'right';
}

export interface Page{
  page: number;
  size: number;
}

export const useColumn = (columns: Column[]) => {
  return columns;
};