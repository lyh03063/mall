<template>
  <div id="app">
    <div class="login-big-box">
      <el-row>
        <el-col :span="24">
          <div class="login-box">
            <h1>帐号密码登录</h1>
            <h2>为了你的帐号安全，请用手机号登录</h2>
          </div>
        </el-col>
      </el-row>
      <el-row class="login-public">
        <el-col :span="4">
          <span>中国+86</span>
        </el-col>
        <el-col :span="1">
          <div class="cut-off-rule"></div>
        </el-col>
        <el-col :span="19">
          <input type="text" placeholder="请输入帐号" v-model="user" clearable>
        </el-col>
      </el-row>
      <el-row class="login-public">
        <el-col>
          <el-input type="text" placeholder="请输入密码" v-model="password" clearable></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>滑动框</el-col>
      </el-row>
      <el-row>
        <el-col>
          <div style="height:30px;line-height:30px;">
            <a href="JavaScript" style="float:left">验证码登录</a>
            <a href="JavaScript" style="float:right">忘记密码 免费注册</a>
          </div>
        </el-col>
      </el-row>
    </div>
    <footer class="login-foot">
      登录既代表同意
      <a href="JavaScript">《用户使用协议》</a>
    </footer>
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
<style lang="scss">
$loginUserHeight: 40px;
$loginUserWidth: 100%;
.login-foot {
  display:block;
  text-align: center;
  color: #bbbbc2;
  margin: auto;
  a{
    color: #bbbbc2
  }
}
.login-big-box {
  padding: 0px 20px;
}
.login-big-box {
  min-height: 420px;
  max-height: 850px;
}
.login-public {
  //这里的公共指的是用户名和密码的
  text-align: center;
  height: $loginUserHeight;
  border-bottom: 1px #f2f2f2 solid;
  line-height: $loginUserHeight;
  margin: 10px 0;
  font-size: 14px;
  padding: 0px;
  input {
    border: none;
    outline: none;
    width: $loginUserWidth;
    height: 35px;
  }
}
.cut-off-rule {
  width: 1px;
  height: 20px;
  background: #f2f2f2;
  margin: 10px 10px;
}

.login-box {
  width: 100%;

  h1 {
    padding: 10px 20px;
    font-size: 28px;
    font-weight: 400;
  }
  h2 {
    color: #999999;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 400;
  }
}
.login-form {
  width: 330px;
  margin: 0 auto;
}
@import "../assets/css/util.scss"; //导入公共样式文件
</style>