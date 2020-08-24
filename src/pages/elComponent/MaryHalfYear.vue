<template>
  <div>
    <div class="el-date-editor el-date-editor--year"
         @click="showHalfYear"
         style="width: 100%">
      <el-input prefix-icon="el-icon-date"
                v-model="halfYear.timePoint"
                :placeholder="placeholder">
      </el-input>
    </div>
    <div class="el-picker-panel el-date-picker el-popper"
    v-show="showTime" style="position: absolute;z-index: 2002">
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__body">
          <div class="el-picker-panel__header">
            <button type="button" aria-label="前一年" @click="prev"
            class="el-picker-panel__icon-btn el-picker-panel__prev-btn el-icon-d-arrow-left">
            </button>
            <span role="button" class="el-date-picker__header-label">{{year}}年</span>
            <button type="button" aria-label="后一年" @click="next"
                    class="el-picker-panel__icon-btn el-picker-panel__next-btn el-icon-d-arrow-right">
            </button>
          </div>
          <div class="el-picker-panel__content">
            <table class="el-month-table">
              <tbody>
              <tr>
                <td v-for="(item,index) in fullMonth" :key="index">
                  <a class="cell" @click="choseHalfYear(index)">{{item}}</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maryHalfYear',
  data() {
    return {
      showTime: false,
      halfYear: {},
      placeholder: '请选择半年',
      year: new Date().getFullYear(),
      fullMonth: ['上半年', '下半年']
    }
  },
  methods: {
    showHalfYear() {
      this.showTime = true;
    },
    prev() {
      this.year = this.year * 1 - 1;
    },
    next() {
      this.year = this.year * 1 + 1;
    },
    choseHalfYear(index) {
      if (index == 0) {
        this.halfYear = {
          timePoint: this.year + '-上半年',
          startTime: this.year = '-01-01',
          endTime: this.year = '-06-30'
        };
        this.showTime = false;
      } else {
        this.halfYear = {
          timePoint: this.year + '-下半年',
          startTime: this.year = '-07-01',
          endTime: this.year = '-12-31'
        };
        this.showTime = false;
      }
      this.$emit('half-year', this.halfYear);
    }
  }
}
</script>

<style scoped>
</style>
