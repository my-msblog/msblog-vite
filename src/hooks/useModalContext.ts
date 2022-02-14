import { InjectionKey } from 'vue';
import { useContext } from './core/useContext';

export interface ModalContextProps {
    redoModalHeight: () => void;
}
const key: InjectionKey<ModalContextProps> = Symbol();

export function useModalContext() {
    return useContext<ModalContextProps>(key);
  }
  