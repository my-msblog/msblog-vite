import { PropType } from 'vue';
import { FunctionType, NullData } from '@/constant/Type';


export interface Styles{
  top?: string | number,
  left?: string | number,
  width?: string | number,
}

export const affixProps = {
  offset: {
    type: Number as PropType<number>,
    default: NullData<number>(0),
  },
  onAffix: {
    type: Function as PropType<FunctionType>,
    default() {}
  },
  boundary: {
    type: String as PropType<string>,
    default: NullData<string>(''),
  }
};

