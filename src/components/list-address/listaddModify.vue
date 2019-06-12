<template>
  <div class="main">
    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm" >
      <template v-for="item in formItems" >
      <el-form-item label="姓名" prop="name" :key="item.name">
        <el-input v-model="ruleForm.name" placeholder="收货人姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :key="item.phone">
        <el-input v-model="ruleForm.phone" placeholder="收货人手机号"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="area" :key="item.area">

        <el-cascader :options="options">
      <template slot-scope="{ node, data }">
        <div class="block">

</div>
       <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
           </template>
</el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="extend" :key="item.extend">
        <el-input type="textarea" v-model="ruleForm.extend" placeholder="街道门牌、楼层房间号等信息"></el-input>
      </el-form-item>
        </template>
      <div class="preserve" @click="addedForm('ruleForm')">保存并使用</div>
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
        modify: "000",
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
         
       //验证表单
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
      },
      
    };
  },
  
  methods: {
    addedForm() {
      axios({
        //请求新增接口
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
  created() {
    // this.addedForm();
  }
};
</script>

<style lang="scss" >
.preserve {
  color: #fff;
  background-color: #f44;
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 50px;
}
</style>