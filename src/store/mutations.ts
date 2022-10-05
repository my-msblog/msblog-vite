export default {
  setCodeKey(state: any, code: string) {
    state.code_key = code;
  },
  clearUser(state: any) {
    sessionStorage.clear();
    state.user.user_id = 0;
    state.user.username = '';
    state.user.user_token = '';
    state.user.user_email = '';
    state.user.user_phone = '';
    state.user.user_introduction = '';
    state.permission.permission_menu = [];
    state.user.user_role = '';
  },
  setPath(state: any, path: string) {
    state.current_path = path;
    localStorage.setItem('redirct', path);
  }
};
