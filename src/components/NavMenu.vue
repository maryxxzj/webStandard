<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               unique-opened
               router
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id" v-if="item.sub">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.id">
            <el-menu-item :index="sub.id" v-text="sub.name"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="item.id" :key="item.id">
          <i class="el-icon-setting"></i>
          <span slot="title" v-text="item.name"></span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  import menu from '@/config/menuConfig'

  export default {
    name: 'NavMenu',
    data () {
      return {menu: menu}
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
