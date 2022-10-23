export default {
  setCodeKey(state: any, code: string) {
    state.code_key = code;
  },
  setPath(state: any, path: string) {
    state.current_path = path;
    localStorage.setItem('redirct', path);
  }
};
