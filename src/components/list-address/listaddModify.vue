<template>
  <div class="main">
    <el-form  :rules="rules" ref="ruleForm"  label-width="50px" class="demo-ruleForm"  size="small">

     
        <el-form-item label="姓名" prop="name" >
          <el-input v-model="modifyForm.name" placeholder="收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" >
          <el-input v-model="modifyForm.phone" placeholder="收货人手机号"></el-input>
        </el-form-item>

        <el-form-item label="地区" prop="area"  >
          <el-cascader :options="options"  v-model="modifyForm.area" ></el-cascader>
        
        </el-form-item>

        <el-form-item label="详细地址" prop="extend" >
          <el-input type="textarea" v-model="modifyForm.extend" placeholder="街道门牌、楼层房间号等信息"></el-input>
        </el-form-item>
     
      <div class="modifyAdd" @click="modifyAddress()">保存并使用</div>
      
        <template>
  <el-button type="text" @click="deleteForm()">删除收货地址</el-button>
</template>
    </el-form>
  </div>
</template>

<script>
export default {

  components: {},
  data() {
    return {
      options: option,
      objURL: {
        add: "http://120.76.160.41:3000/crossAdd?page=mabang-address",
        modify: "000",
        list: "http://120.76.160.41:3000/crossList?page=mabang-address",
        delete: "http://120.76.160.41:3000/crossDelete?page=mabang-address"
      },
      modifyForm: {
        name: "",
        phone: "",
        area:"",
        extend: "",
        userName: ""
        
      },
  
      //验证表单
      rules: {
        name: [
          {
            required: true,
            message: "请填写收货人姓名",
            trigger: "blur",
            placeholder: "收货人姓名"
          }
        ],
        phone: [
          { required: true, message: "请输入收货人电话", trigger: "change" }
          // { min: 11, message: "电话格式填写错误", trigger: "blur" }
        ],
        extend: [{ required: true, message: "请填写详细地址", trigger: "blur" }]
      }
    };
  },

  methods: {
    modifyAddress() {
      axios({
        //请求新增接口
        method: "post",
        // url: this.objURL.list,
        url: this.objURL. modify,
        data: { data: this.modifyForm } //传递参数
      })
        .then(response => {
          alert("修改信息成功");
          this.$router.push({ path: "/memberAddress" }); //跳转到memberAddress
          // this.getProList();
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
        }
    },
  deleteForm(proId) {
      this.$confirm("确认删除该产品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            //请求接口
            method: "post",
            url: this.objURL.delete,
            data: {
              page: "category",
              findJson: {
                //用于定位要修改的数据
                P1: proId
              }
            } //传递参数
          })
            .then(response => {
              this.$message({ message: "删除产品成功",duration: 1500, type: "success" });
              this.getProList(); //更新产品列表
            })
            .catch(function(error) {
              alert("异常:" + error);
            });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    }
  
};
</script>

<style lang="scss" >
.modifyAdd {
  color: #fff;
  background-color: #f44;
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 50px;
}
.deleteAdd {
  border: 1px black solid;
  background-color: rgb(253, 250, 250);
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 50px;
  margin-top: 10px;
}
</style>