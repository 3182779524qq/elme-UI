import ElmeForm from './packages/form/index.js';
import ElmeTable from './packages/table/index.js';
import ElmeMenu from './packages/menu/index.js';


const components = [
  ElmeForm,
  ElmeMenu,
  ElmeTable
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ElmeForm,
  ElmeMenu,
  ElmeTable
}