module.exports = [
  {
    name: '基础',
    id: 'basic',
    sub: [
      {
        name: 'Layout 布局',
        id: 'BasicLayout',
        component: 'components/BasicLayout'
      }, {
        name: 'Container 布局容器',
        id: 'BasicContainer',
        component:'components/BasicContainer'
      }
    ]
  },
  {
    name: 'Form',
    id: 'form',
    sub: [
      {
        name: 'Radio 单选框',
        id: 'FormRadio',
        component:'components/FormRadio'
      }, {
        name: 'Checkbox 多选框',
        id: 'FormCheckbox',
        component:'components/FormCheckbox'
      }
    ]
  },
  {
    name: '一级目录',
    id: 'HelloWorld',
    component:'components/HelloWorld'
  },
  {
    name: 'Vue',
    id: 'Vue',
    sub: [
      {
        name: '禁用eslint',
        id: 'eslintDisabled',
        component:'pages/vue/eslintDisabled'
      }
    ]
  },
  {
    name: '自定义组件',
    id: 'VueElementUI',
    sub: [
      {
        name: '自定义组件',
        id: 'customComponent',
        component:'pages/elComponent/example'
      }
    ]
  }
]
