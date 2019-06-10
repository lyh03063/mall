<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/listHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{cf.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <space height="8"></space>
    <el-row>
      <el-button type="primary" size="small" @click="$store.commit('openDialogAdd',cf.listIndex)">新增</el-button>
    </el-row>
    <space height="10"></space>

    <dynamicForm @submit1="searchList" :cf="cfSearchForm" :formData="Objparma"></dynamicForm>

    <!--主列表-->
    <el-table
      :data="tableData"
      border
      :stripe="true"
      :cell-style="{padding:'3px'}"
      :header-cell-style="{padding:'6px'}"
      style="width: 100%"
     >
      <el-table-column label="id" prop="P1" :width="60" type="selection">
        
      </el-table-column>
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        v-for="column in cf.columns"
        :key="column.prop"
        :formatter="column.formatter"
      ></el-table-column>

      <el-table-column label="操作" width>
        <template slot-scope="scope">
          <el-button
            title="详情"
            @click="showDetail(scope.row)"
            icon="el-icon-notebook-2"
            circle
            size="mini"
          ></el-button>
          <el-button
            title="编辑"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="$refs.listDialogs.showModify(scope.row)"
          ></el-button>
          <el-button
            title="删除"
            icon="el-icon-close"
            size="mini"
            circle
            @click="confirmDelete(scope.row.P1)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next"
      @current-change="handleCurrentChange"
      :total="allCount"
      style="float:right;margin:10px 0 0 0"
    ></el-pagination>
    <listDialogs ref="listDialogs" :cf="cf">
      <!--列表用到的各种弹窗-->
    </listDialogs>
  </div>
</template>
<script>
import Vue from "vue";
import listDialogs from "./list-dialogs";
import dynamicForm from "./dynamic-form";
export default {
  components: { listDialogs, dynamicForm }, //注册组件
  props: {
    cf: {
      //列表的配置
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    showDetail(row) {
      this.$store.commit("openDialogDetail", {
        listIndex: this.cf.listIndex,
        row: row
      });
    },
    //-------------确认删除产品的函数--------------
    confirmDelete(proId) {
      this.$confirm("确认删除该产品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            //请求接口
            method: "post",
            url: this.cf.url.delete,
            data: {
              findJson: {
                //用于定位要修改的数据
                P1: proId
              }
            } //传递参数
          })
            .then(response => {
              this.$message({
                message: "删除产品成功",
                duration: 1500,
                type: "success"
              });
              this.getProList(); //更新产品列表
            })
            .catch(function(error) {
              alert("异常:" + error);
            });
        })
        .catch(() => {});
    },
    //-------------查询列表的函数--------------
    searchList() {
      // alert("searchList");
      this.getProList(); //第一次加载此函数，页面才不会空
    },

    //-------------处理分页变动函数--------------
    handleCurrentChange(pageIndex) {
      this.Objparma.pageIndex = pageIndex; //改变ajax传参的第几页
      this.getProList(); //第一次加载此函数，页面才不会空
    },
    //-------------ajax获取产品列表函数--------------
    getProList() {
      axios({
        //请求接口
        method: "post",
        url: this.cf.url.list,
        data: this.Objparma //传递参数
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值
          this.tableData = list;
          this.page = page;
          this.allCount = page.allCount; //更改总数据量
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },

  data() {
    return {
      //------------------筛选表单组件配置--------------
      cfSearchForm: {
        inline: true,
        formItems: this.cf.searchFormItems,
        btns: [{ text: "查询", event: "submit1", type: "primary" }]
      },

      //------------------列表的数据总量--------------
      allCount: 20,
      //------------------ajax请求数据列表的传参对象--------------
      Objparma: {
        brandMuti: [],
        pageIndex: 1, //第1页
        pageSize: 10 //每页10条
      },

      tableData: [] //列表数据
    };
  },
  created() {
    let objState = {
      //列表的vuex初始状态对象
      isShowDialogAdd: false, //是否显示新增弹窗
      isShowDialogDetail: false, //是否显示详情弹窗
      row: {} //当前查看详情的行数据
    };

    this.$store.commit("initListState", {
      //改变列表的初始状态值
      listIndex: this.cf.listIndex,
      objState: objState
    });

    this.$store.commit("changeActiveMenu", this.cf.listIndex); //菜单聚焦

    if (localStorage.isLogin != "1") {
      //如果未登录
      this.$router.push({ path: "/login" }); //跳转到登录页
    }
  },

  mounted() {
    //等待模板加载后，
    this.getProList(); //第一次加载此函数，页面才不会空
  }
};
</script>


<style>
</style>
