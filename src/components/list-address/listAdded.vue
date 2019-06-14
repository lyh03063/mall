<template>
  <div class="main">
    <el-form
      :model="addForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
      size="small"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addForm.name" placeholder="收货人姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="addForm.phone" placeholder="收货人手机号"></el-input>
      </el-form-item>

      <el-form-item label="地区" prop="area">
        <el-cascader :options="options" v-model="cityArray"></el-cascader>
      </el-form-item>

      <el-form-item label="详细地址" prop="extend">
        <el-input type="textarea" v-model="addForm.extend" placeholder="街道门牌、楼层房间号等信息"></el-input>
      </el-form-item>
      <button class="preserve" @click="addedAddress()">保存并使用</button>
      
    </el-form>
     <portal></portal>
  </div>
</template>

<script>
import portal from "../shift/portal";
export default {
  components: {portal},
  data() {
    return {
       cityArray:[],
      region: "",
      options: option,
      objURL: {
        add: "http://120.76.160.41:3000/crossAdd?page=mabang-address",
        modify: "000",
        list: "http://120.76.160.41:3000/crossList?page=mabang-address",
        delete: "http://120.76.160.41:3000/crossDelete?page=mabang-address"
      },
      addForm: {
        name: "",
        phone: "",
        area: [],
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
    //---------- 新增函数
    addedAddress() {
      this.addForm.area = this.cityArray.join(" ");
      console.log("this.addForm.area", this.addForm.area);

      axios({
        //请求新增接口
        method: "post",
        // url: this.objURL.list,
        url: this.objURL.add,
        data: { data: this.addForm } //传递参数
      })
        .then(response => {
          this.$message({
            message: "新增成功",
            duration: 1500,
            type: "success"
          });
          this.$router.push({ path: "/memberAddress" }); //跳转到memberAddress
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },
  created() {
    // this.addedForm();
  }
};
</script>

<style lang="scss" >
.preserve {
  display: block;
  margin: 0 auto;
  width: 98%;
  height: 44px;
  margin-top: 20px;
  background-color:#f44;
  color: #fff;
  border: 0px;
  
}
</style>