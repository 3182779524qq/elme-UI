<template>
  <div class="filter">
    <div class="row" v-for="(item,index) in chooseArr" :key="index">
      <div class="label">{{item.title}}</div>
      <div class="value">
        <div :class="value[index]==choose.code?'item act':'item'" v-for="(choose,indexx) in item.list" :key="indexx" @click="changeList(choose.code,index)">{{choose.label}}</div>
      </div>
    </div>
  </div>
</template>
<script>
// 这是一个类似视频上方的一个搜索选项组件
export default {
  name: "ElmeFilter",
  props: {
    //所有的选项列表
    chooseArr: {
      type: Array,
      default: function() {
        return [
          {
            title: "排序",
            list:[
              {
                label:'全部',
                code:''
              },
              {
                label:'最新',
                code:'1'
              },
              {
                label:'最热',
                code:'2'
              },
              {
                label:'好评',
                code:'3'
              }
            ]
          },
          {
            title: "排序",
            list:[
              {
                label:'全部',
                code:''
              },
              {
                label:'最新',
                code:'1'
              },
              {
                label:'最热',
                code:'2'
              },
              {
                label:'好评',
                code:'3'
              }
            ]
          },{
            title: "排序",
            list:[
              {
                label:'全部',
                code:''
              },
              {
                label:'最新',
                code:'1'
              },
              {
                label:'最热',
                code:'2'
              },
              {
                label:'好评',
                code:'3'
              }
            ]
          }
        ];
      }
    },
    value:{
      // 选项的value
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      // chooseList: this.value
    };
  },
  created() {},
  methods: {
    changeList(val,index){
      this.value.splice(index,1,val)
      this.$emit('input', this.value)
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.filter {
  .row {
    display: flex;
    line-height: 50px;
    .label{
      margin-right: 40px;
    }
    .value{
      display: flex;
      .item{
        margin-right: 20px;
        cursor: pointer;
      }
      .act{
        color: rgb(19, 206, 102);
      }
    }
  }
}
</style>