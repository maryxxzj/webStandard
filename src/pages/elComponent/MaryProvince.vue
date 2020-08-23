<template>
  <el-cascader
    placeholder="请选择"
    :props="provinceProps"
    filterable></el-cascader>
</template>

<script>
  export default {
    name: 'maryProvince',
    props: {},
    data () {
      return {
        provinceProps: {
          lazy: true,
          lazyLoad (node, resolve) {
            const {level} = node
            setTimeout(() => {
              const nodes = Array.from({length: level + 1})
                .map(item => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2
                }))
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes)
            }, 1000)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
