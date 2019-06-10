<template>
  <div class="login-box">
    <div class="FS18 FWB LH50 PL20" id="id1">用户登录</div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="0"
      class="demo-ruleForm login-form"
    >
      <el-form-item prop="user">
        <el-input v-model.trim="ruleForm.user" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" placeholder="密码" v-model.trim="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="WP100" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback(); //校验通过
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback(); //校验通过
      }
    };

    return {
      msg: "这是一条消息",
      ruleForm: {
        //表单数据
        user: "",
        pass: ""
      },
      rules: {
        //校验规则，需绑定在el-form的rules属性上
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果校验结果为真
          if (this.ruleForm.user == "admin" && this.ruleForm.pass == "123456") {
            //如果用户名和密码正确
            localStorage.isLogin = "1";
            this.$router.push({ path: "/manage" }); //跳转到manage
          } else {
            this.$alert("用户名或密码错误");
          }
        } else {
          //否则
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  beforeCreate() {
    // if (localStorage.isLogin == "1") {
    //   //如果未登录
    //   this.$router.push({ path: "/listHome" }); //跳转到后台首页
    // }
    // console.log("beforeCreate-this.msg", this.msg);
  },
  created() {
    console.log("created-this.msg", this.msg);
  },
  beforeMount() {
    let dom = document.getElementById("id1");
    console.log("beforeMount-dom", dom);
  },
  mounted() {
    let dom = document.getElementById("id1");
    console.log("mounted-dom", dom);

    
  }
};
</script>
<style type="text/css" scoped>
.login-box {
  width: 384px;
  height: 278px;
  border: 1px solid #ccc;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -192px;
  margin-top: -139px;
}
.login-form {
  width: 330px;
  margin: 0 auto;
}
</style>