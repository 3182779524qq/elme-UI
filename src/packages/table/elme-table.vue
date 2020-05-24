<template>
  <div class="cfj_table">
    <el-table
      :border="border"
      :data="tData"
      :header-cell-style="headercellstyle"
      :row-style="rowstyle"
      :cell-style="cellstyle"
    >
      <!--是否展示多选框-->
      <el-table-column v-if="tableData.isMultiple" type="selection" width="55"></el-table-column>
      <!--是否展示列序号-->
      <el-table-column
        v-if="tableData.isRank"
        type="index"
        align="center"
        width="80"
        label="序号"
        :index="numerical"
      ></el-table-column>
      <template v-for="(tit,index) in tableData.tHead">
        <template>
          <!--function数据兼容处理-->
          <el-table-column
            v-if="tit.type === 'function'"
            :key="tit.index"
            :prop="tit.field"
            :label="tit.name"
            v-show="tit.isHide?false:true"
            :width="tit.width?tit.width:''"
            :align="tit.align?tit.align:'center'"
            :sortable="tit.sortable?'custom':false"
          >
            <div slot-scope="scope">
              <span v-html="tit.callback(scope.row[tit.field],scope.row)"></span>
            </div>
          </el-table-column>
          <!--image处理-->
          <el-table-column
            v-else-if="tit.type === 'image'"
            :key="tit.index"
            :label="tit.name"
            v-show="tit.isHide?false:true"
            :width="tit.width?tit.width:''"
            :align="tit.align?tit.align:'center'"
          >
            <div slot-scope="scope" class="img_box">
              <el-image 
                style="width: 200px"
                :src="scope.row[tit.field]" 
                :preview-src-list="[scope.row[tit.field]]">
              </el-image>
            </div>
          </el-table-column>
          <!--btnList横向展示操作选项-->
          <el-table-column
            v-else-if="tit.type === 'btnList'"
            :label="tit.name"
            :width="tit.width?tit.width:''"
            :align="tit.align?tit.align:'center'"
            :key="tit.index"
          >
            <template slot-scope="scope">
              <template v-for="btn of tit.callback(scope.row[tit.field],scope.row)">
                <el-button
                  :key="btn.index"
                  type="text"
                  :disabled="btn.disabled"
                  @click="btnClick(btn.type, scope.row,scope)"
                >
                  <span v-html="btn.label"></span>
                </el-button>
              </template>
            </template>
          </el-table-column>
          <!--selectBtns下拉展示操作选项-->
          <el-table-column
            v-else-if="tit.type === 'selectBtns'"
            :label="tit.name"
            :key="tit.index"
            :width="tit.width?tit.width:''"
          >
            <template slot-scope="scope">
              <el-dropdown placement="bottom" @command="handleClick($event,scope.row,scope)">
                <el-button type="primary">
                  {{tit.name}}
                  <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <template v-for="btn of tit.callback(scope.row[tit.field],scope.row)">
                    <el-dropdown-item :key="btn.index" :command="btn.type" :disabled="btn.disabled">
                      <span v-html="btn.label"></span>
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <!--默认数据展示没有type时走这个分支-->
          <el-table-column
            v-else
            :key="index"
            :prop="tit.field"
            :label="tit.name"
            v-show="tit.isHide?false:true"
            :width="tit.width?tit.width:''"
            :fixed="tit.fixed?tit.fixed:false"
            :sortable="tit.sortable?true:false"
            :align="tit.align?tit.align:'center'"
          >
            <template slot-scope="scope">
              <span v-html="scope.row[tit.field]?scope.row[tit.field]:tit.noData"></span>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <!--分页配置-->
    <div
      v-if="paginationJson.ispagination"
      class="cfj_pagination"
      :style="{textAlign:paginationJson.pageAlign}"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="paginationJson.ispagination && tableAjax.data ? tableAjax.data.pageNum:''"
        :page-sizes="paginationJson.pageSize"
        :page-size="paginationJson.ispagination && tableAjax.data ? tableAjax.data.pageSize:''"
        :layout="paginationJson.layout"
        :total="total||0"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ElmeTable",
  data() {
    return {
      tData: [],
      // 分页总条数--ajax请求渲染
      total: 0,
      headercellstyle: {
        background: "#eaebed",
        fontSize: "14px",
        color: "#000000",
        height: "50px"
      },
      cellstyle: {
        height: "50px",
        color: "#000000",
        padding: "10px 0",
        fontSize: "12px"
      },
      rowstyle: {
        // height: '72px'
      }
    };
  },
  props: {
    refresh: "", // 刷新表格数据数据
    border: {
      //边框线
      type: Boolean,
      default: function() {
        return true;
      }
    },
    // 分页配置
    paginationJson: {
      type: Object,
      default: function() {
        return {
          pageSize: [10, 20, 50, 100],//每页多少条
          pageAlign: "right",//对齐方式
          ispagination: true,//是否展示分页
          layout: "total, sizes,jumper, prev, pager, next"//分页布局
        };
      }
    },
    // 表格的搜索条件
    tableSerach: {},
    // AJAX请求配置
    tableAjax: {
      type: Object,
      default: function() {
        return {
          url: "",
          method: "post",
          data: {
            pageNum: 1,
            pageSize: 15
          }
        };
      }
    },
    // table表参数配置
    tableData: {
      type: Object,
      default: function() {
        return {
          // 表头配置
          tHead: [],
          // type为selectBtns为下拉按钮，btnList为平铺按钮=====写在表头配置里，
          // btnList: [
          //   {
          //     type: "info",
          //     label:
          //       "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>详情</span>"
          //   }
          // ],
          // 表格数据--ajax请求渲染
          tData: [],
          // 分页总条数--ajax请求渲染
          total: 0,
          // 配置是否显示多选框
          isMultiple: false,
          // 配置是否显示排序
          isRank: true
        };
      }
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    numerical(i) {
      if (this.tableAjax.data && this.tableAjax.data.pageNum) {
        return (this.tableAjax.data.pageNum - 1) * this.tableAjax.data.pageSize + i + 1;
      } else {
        return ++i;
      }
    },
    readCookie(name) {
      let arr = null;
      let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (document.cookie && (arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    getList() {
      let posdata = Object.assign({}, this.tableAjax.data, this.tableSerach);
      let obj = {};
      if (this.tableAjax.method == "get") {
        obj = {
          url: this.tableAjax.url,
          method: this.tableAjax.method,
          params: posdata,
          headers: this.readCookie("adminheaders")?JSON.parse(this.readCookie("adminheaders")):{}
        };
      } else {
        obj = {
          url: this.tableAjax.url,
          method: this.tableAjax.method,
          data: posdata,
          headers: this.readCookie("adminheaders")?JSON.parse(this.readCookie("adminheaders")):{}
        };
      }
      axios(obj)
        .then(res => {
          let data = res.data;
          if (data.total > 9 && data.pageNum > 1 && data.list.length === 0) {
            --this.tableAjax.data.pageNum;
            this.getList();
            return;
          }
          if (this.tableAjax.callback) {
            let obj = this.tableAjax.callback(data)
            this.tData = obj.tData;
            this.total = obj.total;
          } else {
            this.tData = data.list;
            this.total = data.total;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      this.tableAjax.data.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.tableAjax.data.pageNum = val;
      this.getList();
    },
    // 操作点击--横向点击
    btnClick(type, row, scope) {
      const outData = {
        type: type,
        rowData: row,
        rowindex: scope.$index
      };
      this.$emit("tableClick", outData);
    },
    // 操作点击--下拉点击
    handleClick(type, row, s) {
      this.btnClick(type, row, s.$index);
    }
  },
  watch: {
    refresh: {
      handler(newData, oldData) {
        this.getList();
      }
    }
  }
};
</script>
<style scoped>
.cfj_table {
  width: 100%;
  height: 100%;
}
.cfj_pagination {
  padding-top: 15px;
}

.img_box{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<style>
.cfj_table .el-table .cell {
  line-height: 16px;
}
.cfj_table .el-table .el-button {
  padding: 0 5px;
}
.cfj_table .el-table--border td,
.cfj_table .el-table--border th,
.cfj_table .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #dcdcdc;
}
</style>