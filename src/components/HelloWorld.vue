<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul>
      <li style="margin-bottom: 10px;" v-for="(item,index) in dateList" :key="index">
        <span style="padding-right: 20px;">{{item.author_name}}</span>
        <span style="padding-right: 20px;">{{item.title}}</span>
        <span style="padding-right: 20px;">{{item.date}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {article} from '../request/api/ariticle'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome mock',
        dateList: []
      }
    },
    mounted: function () {
      this.getTest1()
    },
    methods: {
      getTest () {
        // 使用api地址
        this.$http.get('/api/list').then(res => {
          this.dateList = res.data
        })
      },
      getTest1 () {
        console.log(article)
        article().then(res => {
          this.dateList = res
        })
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: normal;
    text-align: center;
  }

  ul {
    list-style: none;
    text-align: left;
  }
</style>
