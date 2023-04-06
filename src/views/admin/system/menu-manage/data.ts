import { useColumn } from '@/components/base-table/data';

export const columns = useColumn([
  { 
    prop: 'name', 
    label: '标题' 
  },
  { 
    label: 'url',
     prop: 'path', 
    },
  {
    label: '组件路径',
    prop: 'component',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
  {
    label: '操作', 
    prop: 'action', 
    columnType: true, 
    soltName: 'action' 
  },
]);
