<template>
  <div class>
    <!--查看详情弹窗-->
    <el-dialog
      title="查看详情"
      :visible.sync="isShowDialogDetail"
      width="60%"
      :before-close="closeDialogDetailFun"
    >
      <table class="table-normal WP100">
        <tr v-for="item in cf.detailItems" :key="item.prop">
          <td class="W100">{{item.label}}</td>
          <td>
            <div v-if="item.type=='html'" v-html="row[item.prop]"></div>
            <template v-else>{{row[item.prop]}}</template>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogDetailFun">关 闭</el-button>
      </span>
    </el-dialog>

    <!--新增数据表单弹窗-->
    <el-dialog
      title="新增产品"
      :visible.sync="isShowDialogAdd"
      width="50%"
      :before-close="closeDialogAddFun"
    >
      <dynamicForm
        :formData="formAdd"
        :cf="cfFormAdd"
        @submit="addProduct"
        @cancel="closeDialogAddFun"
      ></dynamicForm>
    </el-dialog>

    <!--修改数据表单弹窗-->
    <el-dialog title="修改产品" :visible.sync="isShowDialogModify" width="60%">
      <dynamicForm
        :formData="formModify"
        :cf="cfFormModify"
        @submit="modifyProduct"
        @cancel="isShowDialogModify = false"
      ></dynamicForm>
    </el-dialog>
  </div>
</template>

<script>
import dynamicForm from "./dynamic-form";
export default {
  components: {
    //注册组件
    dynamicForm
  },
  props: ["cf"],
  data: function() {
    return {
       //------------------新增表单组件配置--------------
      cfFormAdd: {
        formItems: this.cf.formItems,
        btns: [
          { text: "新增", event: "submit", type: "primary" },
          { text: "取消", event: "cancel" }
        ]
      },
      //------------------修改表单组件配置--------------
      cfFormModify: {
        formItems: this.cf.formItems,
        btns: [
          { text: "修改", event: "submit", type: "primary" },
          { text: "取消", event: "cancel" }
        ]
      },
      formAdd: {}, //新增产品的表单数据
      formModify: {}, //修改产品的表单数据
      isShowDialogModify: false, //是否显示修改弹窗
      editorOption: {
        //编辑器的配置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],

            ["link", "image", "video"]
          ]
        }
      }
    };
  },
  computed: {
    row() {
      //来自vuex的当前行数据
      return this.$store.state.listState[this.cf.listIndex].row;
    },
    isShowDialogAdd() {
      //是否显示添加弹窗
      return this.$store.state.listState[this.cf.listIndex].isShowDialogAdd; //从vuex的store里面读取值
    },
    isShowDialogDetail() {
      //是否显示详情弹窗
      return this.$store.state.listState[this.cf.listIndex].isShowDialogDetail; //从vuex的store里面读取值
    }
  },
  methods: {
    closeDialogDetailFun(done) {
      //关闭详情弹窗的配置事件函数
      this.$store.commit("closeDialogDetail", this.cf.listIndex); //执行store的closeDialogAdd事件
    },
    closeDialogAddFun(done) {
      //关闭新增弹窗的配置事件函数
      this.$store.commit("closeDialogAdd", this.cf.listIndex); //执行store的closeDialogAdd事件
    },

    //-------------修改产品的函数--------------
    modifyProduct() {
      axios({
        //请求接口
        method: "post",
        url: this.cf.url.modify,
        data: {
          findJson: {
            //用于定位要修改的数据
            P1: this.formModify.P1
          },
          modifyJson: this.formModify
        } //传递参数
      })
        .then(response => {
          this.$message({
            message: "修改产品成功",
            duration: 1500,
            type: "success"
          });
          this.isShowDialogModify = false; //关闭弹窗
          this.$parent.getProList(); //更新产品列表
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    //-------------新增产品的函数--------------
    addProduct() {
      axios({
        //请求接口
        method: "post",
        url: this.cf.url.add,
        data: { data: this.formAdd } //传递参数
      })
        .then(response => {
          this.$message({
            message: "新增产品成功",
            duration: 1500,
            type: "success"
          });
          this.closeDialogAddFun(); //关闭弹窗
          this.$parent.getProList(); //更新产品列表
          this.formAdd = {};
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    //-------------显示修改弹窗的函数--------------
    showModify(row) {
      let str = JSON.stringify(row); //转换成字符串
      let rowNew = JSON.parse(str); //转换成对象

      this.isShowDialogModify = true; //打开弹窗
      this.formModify = rowNew; //表单赋值
    }
  }
};
</script>

