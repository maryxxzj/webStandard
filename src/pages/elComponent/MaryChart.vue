<!--echarts二次封装
*

-->
<template>
  <div :id="id" :ref="id" class="chart" :style="{height:chartHeight,width:chartWidth}"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: "MaryChart",
  data() {
    return {
      chartHeight: '300px',
      chartWidth: '100%',
      eChart: null
    }
  },
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    legendData: {
      type: Array,
      default() {
        return []  // 图例数据
      }
    },
    dataset: {
      type: Object,
      default() {
        return {}  // 图表数据
      }
    },
    yAxis: {
      type: Object
    },
    hasDataZoom: {
      type: Object,
      default() {
        return false
      }
    }
  },
  methods: {
    generatorWidthHeight() {
      //图表的宽度和高度
      // this.chartWidth =`${this.width?this.width:document.body.offsetWidth *0.8}px`;
      this.chartHeight = `${this.height ? this.height : 300}px`;
    },
    generatorBarOpt() {
      return {
        title: {
          text: this.title
        },
        tooltip:{
          trigger:'axis',
          axisPointer:{
            type:'shadow'
          }
        },
        grid:{
          left:'4%',
          right:'5%',
          top:30,
          bottom:80
        },
        legend:{
          bottom:0,
          inactiveColor:"#ccc",
          itemGap:30
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            // 1. 换行处理
            axisLabel: {
              formatter: function (params) {
                let newLabel = "";// 最终返回拼接成的字符串
                let originNum = params.length;// 实际标签的个数
                let provideNum = 10;// 每行能显示的字的个数
                let rowNum = Math.ceil(originNum / provideNum);// 向上取整，需要显示几行
                // 判断标签的个数是否大于规定的个数， 如果大于provideNum，进行换行处理，否则返回原标签
                if (originNum > provideNum) {
                  /** 循环每一行,r表示行 */
                  for (let r = 0; r < rowNum; r++) {
                    let tempStr = "";// 表示每一次截取的字符串
                    let start = r * provideNum;// 开始截取的位置
                    let end = start + provideNum;// 结束截取的位置
                    if (p == rowNum - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, originNum);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newLabel += tempStr;// 最终拼成的字符串
                  }
                } else {
                  newLabel = params;
                }
                return newLabel
              }
            },
            // 2.对文本进行倾斜
            /*
               axisLabel : {//坐标轴刻度标签的相关设置。
               interval:0,
               rotate:"45"
             }
            */
            // 3.文字竖直显示
            /*
            axisLabel: {
              interval: 0,
              formatter:function(value)
              {
                return value.split("").join("\n");
              }
            }
            */
            // 4.隔一个换行
            /*
            axisLabel : {//坐标轴刻度标签的相关设置。
              clickable:true,//并给图表添加单击事件  根据返回值判断点击的是哪里
              interval : 0,
              formatter : function(params,index){
                if (index % 2 != 0) {
                  return '\n\n' + params;
                }
                else {
                  return params;
                }
              }
            }
            */
          }
        ],
        yAxis:this.yAxis,
        series:[]
      }
    }
  }
}
</script>

<style scoped>

</style>
