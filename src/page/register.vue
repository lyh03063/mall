<template>
  <div class="login-box">
    <h1>免费注册</h1>
    <el-form
      :model="registerruleForm"
      status-icon
      :rules="rules"
      ref="registerruleForm"
      label-width="0"
      class="demo-registerruleForm"
    >
      <el-form-item prop="mobile">
        <div>
          <div style="float:left;text-align:center;">中国+86</div>
          <div style="float:left;width:90%">
            <el-input v-model.number="registerruleForm.mobile" placeholder="用户手机"></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="mobileVCode">
        <div class>
          <div style="float:left;width:90%">
            <el-input v-model.number="registerruleForm.mobileVCode" placeholder="验证码"></el-input>
          </div>
          <button style="float:right;">验证码</button>
        </div>
      </el-form-item>
      <el-form-item placeholder="请输入密码" prop="password">
        <el-input type="password" v-model="registerruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item placeholder="请再输入一次密码" prop="checkPass">
        <el-input type="password" v-model="registerruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registerSubmitForm('registerruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    let regnumber = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户手机"));
      } else if (!regnumber.test(value)) {
        callback(new Error("请输入正确手机格式"));
      } else {
        callback(); //通过校验
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerruleForm.checkPass !== "") {
          this.$refs.registerruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      objURL: {
        register: "http://120.76.160.41:3000/mabangMall/register"
      },
      registerruleForm: {
        mobile: "",
        password: "",
        mobileVCode: "",
        checkPass: "",
        phone:"",
      },
      rules: {
        mobile: [{ validator: validateuserName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      result:""
    };
  },
  methods: {
    registerSubmitForm(formName) {
    
     
      this.$refs[formName].validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果校验结果为真
           this.registerruleForm.phone=this.registerruleForm.mobile
           alert(this.registerruleForm.phone)
          axios({
            method: "post",
            url: this.objURL.register, //数据地址，数据来源于objURL.List中的地址
            data: {
              mobile: this.registerruleForm.mobile,
              password: this.registerruleForm.password,
              mobileVCode: this.registerruleForm.mobileVCode,
              phone:this.registerruleForm.phone,         
            } //传递参数
          })
            .then(response => {
              let { code,message } = response.data;//返回数据里,如果没有赋值的对象的话,则返回为未定义code和message在里面有则可以调用
              console.log("data", code);
              console.log("response.data",message );
              // if(code == 0 ){
              //   alert("请重新注册")
              // }else if(code == 1 ){
              //   alert("验证码错误,请重填")
              // }else{
              //    alert("注册成功")
              // }  
              this.registerruleForm={};
          
            })
            .catch(error => {
              console.log(error);
              alert("错误产生" + error);
            });
        }
      });
    }
  }
  // beforeCreate() {
  //   //------------如果未登录------------
  //   if (localStorage.isLogin == 1) {
  //     this.$router.push({ path: "/login" }); //跳转到后台首页
  //   } else {
  //     this.$router.push({ path: "/home" });
  //   }
  //   console.log("beforeCreate-this.msg", this.msg);
  // }
};
</script>

<style lang="scss">
.login-box {
  width: 100%;
  padding: 40px;
  h1 {
    padding: 20px 20px 20px 5px;
    font-size: 28px;
    font-weight: 400;
  }
}
.login-form {
  width: 330px;
  margin: 0 auto;
}
@import "../assets/css/util.scss"; //导入公共样式文件
</style>