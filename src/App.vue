/* eslint-disable */
<template>
  <div id="app">
    <div v-if="network">
      <h3>没网了</h3>
      <div @click="onRefresh">刷新</div>
    </div>
    <el-container>
      <el-header class="header">
        <vheader></vheader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>
        <el-main>
          <breadcrumb class="breadcrumb"></breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Header from '@/components/Header'
  import BreadCrumb from '@/components/BreadCrumb'
  import NavMenu from '@/components/NavMenu'

  export default {
    name: 'App',
    components: {
      'navmenu': NavMenu,
      'vheader': Header,
      'breadcrumb': BreadCrumb
    },
    computed: {
      ...mapState(['network'])
    },
    methods: {
      // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
      onRefresh () {
        this.$router.replace('/refresh')
      }
    }
  }
</script>

<style>
  .header {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
  }

  .breadcrumb {
    margin-bottom: 20px;
  }
</style>
