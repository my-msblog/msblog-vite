import { ModuleTree } from 'vuex';

const importModules = import.meta.globEager('./*.ts');

let modules: ModuleTree<any> = {};
for (const module in importModules) {
    modules = {
        ...modules,
        [module.replaceAll('ts','')
            .replaceAll('.','')
            .replaceAll('/','')]: importModules[module].default,
    };
}

export default modules;

