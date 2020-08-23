<template>
  <div>
    <h1>禁用eslint</h1>
    <div>
      项目创建时，如果安装了eslint，使用中eslint对代码要求太过于严格所以需要关闭或者移除：

      build ---->webpack.base.conf.js 会创建eslint规则，如下图
      <img src="@/imgs/vue/eslint-disabled.png" />
      在module下注释掉useEslint规则，运行npm run dev，即可禁用eslint
    </div>
  </div>
</template>

<script>
  export default {
    name: 'eslintDisabled'
  }
</script>

<style scoped>

</style>
