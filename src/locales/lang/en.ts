import { module } from './module';
export default {
  message: {
    language: 'English',
    successful_logout: 'Successful logout',
    login_success: 'Login success',
    enter_email: 'Please enter your email',
    enter_username: 'Please enter your username',
    input_phone: 'Please enter the correct cell phone number ',
    sms_send_success: 'Captcha sent successfully',
    modified_successfully: 'Modified successfully',
    whether_to_modify_information: 'Whether to modify information?',
    tips: 'Tips',
    confirm: 'Confirm',
    cancel: 'Cancel',
    get_captcha: 'Get Captcha',
    captcha: 'Captcha',
    introduce_yourself_briefly: 'Introduce yourself briefly',
    no_data_selected: 'No data selected',
    operation_success: 'Operation success',
    confirm_submit:'Confirm Submit',
    must_login: 'Please login first',
    add_to_label: 'Failed to add to collection, please use Ctrl+D to add',
    ...module.message.en,
  },
  pages: {
    ...module.pages.en,
  },
  bar: {
    title: 'MS BLOG',
    categories: 'Categories',
    homepage: 'Homepage',
    tags: 'Tags',
    archives: 'Archives',
    about: 'About',
    links: 'Links',
    login: 'Sign In',
    archive: 'Archive',
    change_password: 'Change password',
    personal_center: 'Personal center',
    sign_out: 'Sign Out',
    to_admin: 'Backstage control panel',
  },
  router: {
    ...module.route.en,
  },
  sex: {
    male: 'Male',
    female: 'Female'
  },
  role: {
    ...module.role.en,
  },
  button: {
    ...module.button.en,
  },
  constants: module.constants.en,
};
