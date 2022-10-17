import { useI18n } from '@/hooks/useI18n';
import type { FormRules } from 'element-plus';
import { isPhone, isEmail } from '@/utils/validate';
import { strIsEmpty } from '@/utils';

const { t } = useI18n();

export const formRule: FormRules = {
  username: [{
    required: true,
    message: t('message.enter_username'),
    trigger: 'blur'
  }],
  password: [{
    required: true,
    trigger: 'blur',
    validator: (_rule: any, value: any, callback: any) => {
      if (value.length < 6 || value.length > 12){
        callback(new Error(t('message.pwd_error')));
      } else {
        callback();
      }
    }
  }],
  email: [{
    required: false,
    trigger: 'change',
    validator: (_rule: any, value: any, callback: any) => {
      if (strIsEmpty(value)){
        callback();
      } else if (!isEmail(value)) {
        callback(new Error(t('email_error')));
      } else {
        callback();
      }
    }
  }],
  phone: [{
    trigger: 'blur',
    required: true,
    validator: (_rule: any, value: any, callback: any) => {
      if (!isPhone(value)){
        callback(new Error(t('message.phone_error')));
      } else {
        callback();
      }
    }
  }],
};