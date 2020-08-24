<template>
  <el-container>
    <div>vue+elementUI自定义组件</div>
    <el-form>
      <el-form-item label="省市县">
        <mary-province :provinceCode="province.provinceCode"
                       :disabled="province.disabled"
                       :size="province.size"
                       :placeholder="province.placeholder"
                       :isUserRegion="province.isUserRegion"
                       @province="getProvince">
        </mary-province>
      </el-form-item>
      <el-form-item label="半年区间">
        <mary-half-year size="small" @half-year="getHalfYear"></mary-half-year>
      </el-form-item>
      <el-form-item label="月份区间">
        <el-date-picker class="small"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        value-format="yyyy-MM"
                        v-model="search.monthRange"
                        :picker-options="monthRange.pickerOpt"
                        @click="monthRangeChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间区间">
        <el-date-picker class="small"
                        type="daterange"
                        :clearable="false"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="yyyy-MM-dd"
                        v-model="search.dateRange"
                        :picker-options="dateRange.pickerOpt"
                        @click="dateRangeChange">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div>
      <mary-chart :id="myChart.id"
                  :yAxis="myChart.yAxis"
                  :legendData="myChart.legendData"
                  :dataset="myChart.dataset"
                  :hasDataZoom="myChart.hasDataZoom"
      ></mary-chart>
    </div>
  </el-container>
</template>

<script>
import MaryProvince from './MaryProvince';
import MaryHalfYear from './MaryHalfYear';
import MaryChart from "./MaryChart";
import {queryChart} from "@/request/api/province"

export default {
  name: 'example',
  components: {MaryProvince, MaryHalfYear, MaryChart},
  data() {
    return {
      province: {
        isUserRegion: true,
        disabled: false,
        provinceCode: '',
        size: 'mini',
        placeholder: ''
      },
      search: {
        timePoint: "",
        startTime: "",
        endTime: "",
        dateRange: "",
        monthRange: "",
      },
      dateRange: {
        minDate: "",
        maxDate: "",
        pickerOpt: {
          // 时间跨度：今天及之前任意日期，前后跨度不超过31天，且不超过今天
          onPick: ({maxDate, minDate}) => {
            this.dateRange.minDate = minDate
            this.dateRange.maxDate = maxDate
          },
          disabledDate: (time) => { //查询时间跨度为31天
            if (this.dateRange.minDate) {
              let range = 30 * 24 * 3600 * 1000;
              return time.getTime() > Date.now() || time.getTime() > (this.dateRange.minDate.getTime() + range) || time.getTime() < (this.dateRange.minDate.getTime() - range)
            }
            return time.getTime() > Date.now()
          }
        }
      },
      monthRange: {
        minDate: "",
        maxDate: "",
        pickerOpt: {
          // 月份跨度：当月及之前任意月份，前后跨度不超过12个月，且不超过当前月份
          onPick: ({maxDate, minDate}) => {
            this.monthRange.minDate = minDate
            this.monthRange.maxDate = maxDate
          },
          disabledDate: (time) => {
            let range = 1000 * 60 * 60 * 30 * 24 * 11;
            if (this.monthRange.minDate) {
              let maxDate = (this.monthRange.minDate.getTime() + range) > Date.now() ? Date.now() : (this.monthRange.minDate.getTime() + range);
              return time.getTime() > Date.now() || time.getTime() > maxDate || time.getTime() < (this.monthRange.minDate.getTime() - range)
            }
            return time.getTime() > Date.now() || time.getTime() < (Date.now() - range);
          }
        }
      },
      myChart: {
        id: 'myChart',
        title: '标题',
        legendData: [],
        dataset: {
          dimensions: [],
          source: []
        },
        hasDataZoom: false,
        yAxis: {
          type: 'value',
          min: 0,
          axisLine: {
            show: false // y轴
          },
          axisTick: {
            show: false // y轴刻度线
          },
          nameTextStyle: {
            color: "#666"
          }
        }
      }
    }
  },
  watch: {
    search: {
      handler(newVal, oldVal) {
        this.queryChart();
      },
      deep: true
    }
  },
  methods: {
    getProvince(data) {
      this.province.provinceCode = data;
    },
    getHalfYear(data) {
      this.search.timePoint = data.timePoint;
      this.search.startTime = data.startTime;
      this.search.endTime = data.endTime;
    },
    dateRangeChange(time) {
      this.search.dateRange = time;
    },
    monthRangeChange(time) {
      this.search.monthRange = time;
    },
    queryChart() {
      let params = {};
      queryChart(params).then(res => {
        this.myChart.yAxis.max = res ? (res.max != 0 ? res.max : 1) : 'dataMax';
        this.myChart.dataset.dimensions = ['month', 'enterprise', 'goverment', 'channel', 'activity'];
        this.myChart.dataset.source = res ? res.list : [];
        if (res && res.list.length > 5) {
          this.myChart.hasDataZoom = true;
        } else {
          this.myChart.hasDataZoom = false;
        }
      })
    }
  },
  mounted() {
    this.queryChart();
  }
}
</script>

<style scoped>

</style>
