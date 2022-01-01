import { FormRulesMap} from 'element-plus/es/components/form/src/form.type';
import { BaseOptions } from '@/constant/Type';
import { useI18n } from '@/hooks/useI18n';
import { RoleString } from '@/constant/enums/role';

const { t } = useI18n();
export const editFormRule: FormRulesMap = {
  id: [{
    required: true,
    message: '',
    trigger: 'blur',
  }],
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  }],
  sex: [{
    required: true,
    message: '性别不能为空',
    trigger: 'change'
  }],
  email: [{
    required: false,
    message: '请输入邮箱',
    trigger: 'blur'
  }],
  phone: [{
    required: true,
    message: '请输入手机号',
    trigger: 'blur'
  }],
};
export const sexOptions: Array<BaseOptions<any>> =[
  {
    label: 1,
    value: t('sex.male')
  }, {
    label: 0,
    value: t('sex.female')
  }
];
interface RolesOptions extends BaseOptions<String>{
  label: string,
  value: string,
  disabled?: boolean,
}
export const roleOptions: Array<RolesOptions> = [
  {
    label: RoleString.VISITOR,
    value: t('role.' + RoleString.VISITOR),
    disabled: false,
  },
  {
    label: RoleString.CONTENT_MANAGER,
    value: t('role.' + RoleString.CONTENT_MANAGER),
    disabled: false,
  },
  {
    label: RoleString.SYSTEM_ADMIN,
    value: t('role.' + RoleString.SYSTEM_ADMIN),
    disabled: false,
  },
];
