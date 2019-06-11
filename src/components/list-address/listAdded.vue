<template>
  <div class="main">
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名" prop="name" >
    <el-input v-model="ruleForm.name" placeholder="收货人姓名" ></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model="ruleForm.phone" placeholder="收货人手机号"></el-input>
  </el-form-item>
    <el-form-item label="地区" prop="region" >
    <el-input v-model="ruleForm.region" placeholder="选择省/市/区"></el-input>
  </el-form-item>
  <el-form-item label="详细地址" prop="detailed">
    <el-input type="textarea" v-model="ruleForm.detailed" placeholder="街道门牌、楼层房间号等信息"></el-input>
  </el-form-item>
 
    <div class="preserve" @click="addedForm('ruleForm')">保存并使用</div>
</el-form>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
      return {
        ruleForm: {
          name: '',
          phone: '',
          region: '',
          detailed: '',
        },
        rules: {
          name: [
            { required: true, message: '请填写收货人姓名', trigger: 'blur',placeholder:'收货人姓名' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入收货人电话', trigger: 'change' },
            { min:11, message: '电话格式填写错误', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请填写收货人地区', trigger: 'change' }
          ],
          detailed: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      addedForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('收货地址填写成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
    }
  }
  

</script>

<style lang="scss" >

.preserve{
   color:#fff;
   background-color: #f44;
   width:100%;
   height:44px;
   text-align: center;
   line-height:50px;

}

</style>