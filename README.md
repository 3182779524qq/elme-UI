# elme-ui

> 一个基于vue＋element的二次开发组件

## Build Setup

``` bash
# install dependencies
安装
 cnpm install elme-ui -S
elme-form 

props: {
    //elform的ref属性
    reform: {
      type: String,
      default: function() {
        return "alform";
      }
    },
    // label宽度
    labelWidth: {
      type: String,
      default: function() {
        return "110px";
      }
    },
    // label的位置
    labelPosition: {
      type: String,
      default: function() {
        return "right";
      }
    },
    //校验规则
    reformRule: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 表单数据
    formData: {
      type: Array,
      default: function() {
        return [
          {
            name: "输入框", // 文字label
            type: "input", // input,select,textarea,checkbox,radio,time,citypicker,image,password
            maxlength:30, // 输入长度限制
            hide:false,// 是否显示
            field: "id", // 字段名称
            isshow: false, // 是否展示
            width: false, // 文本宽度
            disabled: false, // 是否禁用
            placeholder: "请输入", // placeholder提示
            multiple: false, // 是否多选，基于select，checkbox
            filterable: false, // 是否多选，基于select
            ajax: {
              //动态获取接口数据，基于select，checkbox
              method: "get", //请求方式
              url: "www.xx.cn", //接口地址
              data: {}, //请求参数
              label: "label", //下拉选择框的选择文字
              value: "value", //下拉选择的值
              callback: function(data) {
                //接口返回数据层级处理
                return data;
              }
            }
          }
        ];
      }
    }
  }


使用：
    在main.js中引用import ElmeUi from 'elme-ui'
        全局注册   Vue.use(ElmeUi)

    页面引用
      <elme-form ref="myform" :reformRule="reformRule" :formData="formData" reform="reform"></elme-form>

```

