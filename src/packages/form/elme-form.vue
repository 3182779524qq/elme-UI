<template>
  <el-form
    :model="outData"
    :ref="reform"
    :label-width="labelWidth"
    class="my_el_form"
    :rules="formRule"
    :label-position="labelPosition"
  >
    <div
      class="form_item"
      v-for="(item,index) in formData"
      :key="index"
      :style="{ width:item.divwidth?item.divwidth:'50%',display:item.hide?'none':'block'}"
    >
      <el-form-item
        :label="item.name"
        :prop="item.field"
        :required="item.required"
        v-show="!item.isshow"
      >
        <!-- 普通输入框 -->
        <template v-if="item.type=='input'">
          <el-input
            :style="{ width:item.width?item.width+'px':'205px'}"
            :disabled="item.disabled?item.disabled:false"
            :maxlength="item.maxlength?item.maxlength:30"
            :placeholder="item.placeholder?item.placeholder:'请输入内容'"
            v-model="value[item.field]"
          ></el-input>
        </template>
        <!-- 密码输入框 -->
        <template v-if="item.type=='password'">
          <el-input
            :style="{ width:item.width?item.width+'px':'205px'}"
            :disabled="item.disabled?item.disabled:false"
            :maxlength="item.maxlength?item.maxlength:30"
            :placeholder="item.placeholder?item.placeholder:'请输入内容'"
            v-model="value[item.field]"
            autocomplete="on"
            show-password
          ></el-input>
        </template>
        <!-- 下拉选择框 -->
        <template v-else-if="item.type=='select'">
          <el-select
            v-model="value[item.field]"
            :multiple="item.multiple?item.multiple:false"
            :filterable="item.filterable?item.filterable:false"
            :disabled="item.disabled?item.disabled:false"
            :style="{ width:item.width?item.width+'px':'205px'}"
            :placeholder="item.placeholder?item.placeholder:'请选择内容'"
          >
            <el-option
              v-for="(item,index) in item.options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
        <!-- 文本域 -->
        <template v-else-if="item.type=='textarea'">
          <el-input
            :style="{ width:item.width?item.width+'px':'205px'}"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :disabled="item.disabled?item.disabled:false"
            :maxlength="item.maxlength?item.maxlength:30"
            :placeholder="item.placeholder?item.placeholder:'请输入内容'"
            v-model="value[item.field]"
          ></el-input>
        </template>
        <!-- 多选框 -->
        <template v-else-if="item.type=='checkbox'">
          <el-checkbox-group
            v-model="value[item.field]"
            :disabled="item.disabled?item.disabled:false"
            :style="{ width:item.width?item.width+'px':'205px'}"
          >
            <el-checkbox
              v-for="(checkedItem,index) in item.options"
              :label="checkedItem.value"
              :key="index"
            >{{checkedItem.label}}</el-checkbox>
          </el-checkbox-group>
        </template>
        <!-- 单选框 -->
        <template v-else-if="item.type=='radio'">
          <el-radio-group
            v-model="value[item.field]"
            :disabled="item.disabled?item.disabled:false"
            :style="{ width:item.width?item.width+'px':'205px'}"
          >
            <el-radio
              v-for="(checkedItem,index) in item.options"
              :label="checkedItem.value"
              :key="index"
            >{{checkedItem.label}}</el-radio>
          </el-radio-group>
        </template>
        <!-- 时间范围选择器 -->
        <template v-else-if="item.type=='time'">
          <el-date-picker
            :disabled="item.disabled?item.disabled:false"
            :style="{ width:item.width?item.width+'px':'205px'}"
            value-format="yyyy-MM-dd"
            type="daterange"
            unlink-panels
            v-model="value[item.field]"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-date-picker>
        </template>
        <!-- 地区三级联动 -->
        <template v-else-if="item.type=='citypicker'">
          <el-cascader
            :disabled="item.disabled?item.disabled:false"
            :style="{ width:item.width?item.width+'px':'205px'}"
            :options="cityoptions"
            :props="cityprops"
            :placeholder="item.placeholder?item.placeholder:'请选择内容'"
            v-model="value[item.field]"
          ></el-cascader>
        </template>
        <!-- 图片上传 -->
        <template v-if="item.type=='image'">
          <el-upload
            :action="item.upLoadUrl"
            :headers="item.headers"
            :show-file-list="false"
            :on-success="item.callback"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="value[item.field]" :src="value[item.field]" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "ElmeForm",
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
    //表单的值
    value: {
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
  },
  data() {
    return {
      outData: {},
      formRule: {},
      cityoptions: [],
      // cityoptions: citycode,
      cityprops: {
        value: "name",
        label: "name"
      },
      emptyData: {},
      pickerOptions: {
        // 限制选择一年的时间
        disabledDate(time) {
          let curDate = new Date().getTime();
          let year = 365 * 24 * 3600 * 1000;
          let years = curDate - year;
          return time.getTime() > Date.now() || time.getTime() < years; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      }
    };
  },
  created() {
    this.formRule = this.reformRule;
  },
  mounted() {
    let outData = {};
    for (let i in this.formData) {
      let _data = this.formData[i];
      if (
        (_data.type === "select" || _data.type === "checkbox") &&
        !!_data.ajax
      ) {
        this.$axios
          .ajax({
            method: _data.ajax.method ? _data.ajax.method : "get",
            url: _data.ajax.url,
            data: _data.ajax.data
          })
          .then(res => {
            let lab = _data.ajax.label;
            let val = _data.ajax.value;
            let list = res.data;
            if (
              _data.ajax.callback &&
              typeof _data.ajax.callback === "function"
            ) {
              list = _data.ajax.callback(list);
            }
            if (!!list) {
              let options = [
                {
                  label: "全部",
                  value: ""
                }
              ];
              list.forEach(item => {
                options.push({
                  label: item[lab],
                  value: item[val]
                });
              });
              this.formData[i].options = options;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      outData[_data.field] = _data.value;
    }
    this.emptyData = Object.assign({}, outData);
    this.outData = outData;
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isLt2M;
    },
    checkForm(){
      this.$emit("checkForm",this.submitForm())
    },
    submitForm() {
      let flag = false;
      this.$refs[this.reform].validate(valid => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      if (flag) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.my_el_form {
  display: flex;
  flex-wrap: wrap;
  padding-right: 25px;
}
.form_item {
  display: flex;
}
</style>
