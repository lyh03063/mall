<template>
  <div class="main">
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm" >
      <template v-for="item in formItems"   >
      <el-form-item label="姓名" prop="name" :key="item.name">
        <el-input v-model="ruleForm.name" placeholder="收货人姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :key="item.phone">
        <el-input v-model="ruleForm.phone" placeholder="收货人手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="area" :key="item.area">
        <el-input v-model="ruleForm.area" placeholder="选择省/市/区"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="extend" :key="item.extend">
        <el-input type="textarea" v-model="ruleForm.extend" placeholder="街道门牌、楼层房间号等信息"></el-input>
      </el-form-item>
        </template>
  
          <div class="preserve" @click="modifyForm()"  >保存并使用</div>

         <!-- <div class="delete" style="" @click="confirmDelete(scope.row.P1)"  >删除</div> -->
        
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      objURL: {
        add: "http://120.76.160.41:3000/crossAdd?page=mabang-address",
        modify: "http://120.76.160.41:3000/crossModify?page=mabang-address",
        list: "http://120.76.160.41:3000/crossList?page=mabang-address",
        delete: "http://120.76.160.41:3000/crossDelete?page=mabang-address"
      },
      ruleForm: {
        name: "",
        phone: "",
        area: "",
        extend: "",
        userName:""
      },
       //--------新增、修改表单字段数组------
         formItems:[
           { 
            prop:"name",
            type:"input",   
         }],
         
   
      rules: {
        name: [
          {
            required: true, message: "请填写收货人姓名",trigger: "blur", placeholder: "收货人姓名"
          },
        ],
        phone: [
          { required: true, message: "请输入收货人电话", trigger: "change" },
          // { min: 11, message: "电话格式填写错误", trigger: "blur" }
        ],
        area: [
          { required: true, message: "请填写收货人地区", trigger: "change" }
        ],
        extend: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addedForm() {
     
      axios({
        //请求接口
        method: "post",
        // url: this.objURL.list,
        url: this.objURL.add,
        data: { data: this.ruleForm } //传递参数
      })
        .then(response => {
          alert("新增成功");
          this.$router.push({ path: "/memberAddress" }); //跳转到memberAddress
          // this.getProList();
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  },
  // confirmDelete(proId) {
  //     this.$confirm("确认删除该产品？", "提示", {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning"
  //     })
  //       .then(() => {
  //         axios({
  //           //请求接口
  //           method: "post",
  //           url: this.objURL.delete,
  //           data: {
  //             page: "category",
  //             findJson: {
  //               //用于定位要修改的数据
  //               P1: proId
  //             }
  //           } //传递参数
  //         })
  //           .then(response => {
  //             this.$message({
  //               message: "删除产品成功",
  //               duration: 1500,
  //               type: "success"
  //             });
  //             this.getProList(); //更新产品列表
  //           })
  //           .catch(function(error) {
  //             alert("异常:" + error);
  //           });
  //       })
  //       .catch(() => {
  //         this.$message({ type: "info", message: "已取消删除" });
  //       });
  //   }
};
</script>

<style lang="scss" >


.preserve {
  color: #fff;
  background-color: #f44;
  width: 100%;
  height: 44px;
  text-align: center;
  margin: 0 auto;
  line-height: 50px;
}
.delete {
  border:1px solid black;
  background-color:#fff;
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 50px;
  margin-top: 10px;
  
}

</style>