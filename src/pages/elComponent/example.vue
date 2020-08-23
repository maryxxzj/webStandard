<template>
  <el-container>
    <div>vue+elementUI自定义组件</div>
    <el-form>
      <el-form-item>
        <mary-province></mary-province>
      </el-form-item>
      <el-form-item>
        <mary-half-year></mary-half-year>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
  import MaryProvince from './MaryProvince'
  import MaryHalfYear from './MaryHalfYear'

  export default {
    name: 'example',
    components: {MaryProvince, MaryHalfYear}
  }
</script>

<style scoped>

</style>
