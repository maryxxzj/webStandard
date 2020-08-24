<template>
  <el-cascader v-model="provinceCode"
               :props="provinceProps"
               :disabled="disabled"
               :size="size"
               :placeholder="placeholder"
               change-on-select
               popper-class="cascader-hidded"
               filterable clearable
               @change="cascaderChange"
               @focus="cascaderFocus">
  </el-cascader>
</template>

<script>
import {getType} from '../config'
import {queryUserRegion, queryList} from '@/request/api/province';

const noList = ['710000', '810000', '820000'];
const oneList = ['110000', '120000', '310000', '500000', '419000', '412000', '460300', '460400', '620200'];

export default {
  name: 'maryProvince',
  props: {
    provinceCode: {
      type: Object
    },
    disabled: { //是否可用
      type: Boolean,
      default: false
    },
    size: { // medium,mini
      type: String,
      default: 'medium'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    isUserRegion: { //是否用户区域下的省份
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      provinceProps: {
        isUserRegion: this.isUserRegion,
        value: 'dataCode',
        label: 'dataValue',
        children: 'list',
        lazy: true,
        lazyLoad(node, resolve) {
          let params = {
            groupNo: getType[`${node.level}`] ? getType[`${node.level}`].id : '001',
            parentCode: node.value
          };
          const {level} = node;
          if (level == 0) {
            if (this.isUserRegion) {
              queryUserRegion(params).then(data => {
                if (!data) return;
                let nodes = data.map(item => {
                  let isLeaf = oneList.indexOf(item.provinceCode) != -1;
                  return {
                    dataCode: item.provinceCode,
                    dataValue: item.provinceName,
                    parentCode: item.provinceCode,
                    leaf: isLeaf ? true : false,
                    list: null
                  }
                });
                setTimeout(() => {
                  resolve(nodes)
                }, 300);
              });
            } else {
              queryList(params).then(data => {
                if (!data) return;
                let nodes = data.map(item => {
                  let isLeaf = oneList.indexOf(item.dataCode) != -1;
                  return {
                    dataCode: item.dataCode,
                    dataValue: item.dataValue,
                    parentCode: item.parentCode,
                    leaf: isLeaf ? true : false,
                    list: null
                  }
                });
                setTimeout(() => {
                  resolve(nodes)
                }, 300);
              });
            }
          } else if (node.hasChildren) {
            queryList(params).then(data => {
              if (!data) return;
              let nodes = data.map(item => {
                let hasChild = oneList.indexOf(item.dataCode) != -1 || oneList.indexOf(node.value) !== -1;
                return {
                  dataCode: item.dataCode,
                  dataValue: item.dataValue,
                  parentCode: item.parentCode,
                  leaf: hasChild ? true : false,
                  list: null
                }
              });
              setTimeout(() => {
                resolve(nodes)
              }, 300);
            });
          } else {
            resolve();
          }
        }
      }
    }
  },
  methods: {
    cascaderFocus() {
      document.querySelectorAll('.el-scrollbar.el-cascader-menu:first-child .el-radio').forEach(el => {
        let isLeaf = noList.indexOf(el.childNodes[0].children[1].defaultValue) !== -1;
        if (isLeaf) {
          el.style.visibility = 'hidden'
        }
      })
    },
    cascaderChange(el) {
      //  let isQuery = noList.indexOf(el[0]) !==-1 || oneList.indexOf(el[0]) !==-1;
      //  if(!isQuery && el.length ==2){
      //    document.querySelectorAll('.el-cascader-node_label').forEach(el=>{
      //     el.onclick=function(){
      //       if(this.previousElementSibling) this.previousElementSibling.click();
      //     }
      //   })
      //  }
      this.$emit('province', el);
    }
  }
}
</script>

<style scoped>
</style>
