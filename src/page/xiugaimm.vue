<template>
  <div class="register-f-box">
    <div class="login-box">
      <h1>修改密码</h1>
      <el-form
        :model="modifyPassworForm"
        status-icon
        :rules="rules"
        ref="modifyPassworForm"
        label-width="0"
        class="demo-modifyPassworForm"
      >
        <el-form-item prop="mobile" style="margin-bottom: 0;">
          <el-input v-model.number="modifyPassworForm.mobile">
            <template slot="prepend">原密码</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="WP100"
            @click="modifyPasswordSubmitForm('modifyPassworForm')"
          >确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <footer>
      注册即代表同意
      《用户使用协议》
    </footer>
  </div>
</template>
<script>
import accredit from "../components/shift/note.vue";
export default {
  components: { accredit },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.modifyPassworForm.checkPass !== "") {
          this.$refs.modifyPassworForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.modifyPassworForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isnote: false,
      tableData: [],
      objURL: {
        referList: "http://120.76.160.41:3000/crossList?page=mabang-member",
        modify: "http://120.76.160.41:3000/crossModify?page=mabang-member"
      },
      modifyPassworForm: {
        password: "",
        checkPass: "",
        phone: ""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      modifypassword: "",
      aa:null,
    };
  },
  methods: {
    mobileFun() {},
    registerSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果校验结果为真
          this.localStorage.loginUserName = activeUser;
          console.log("activeUser", this.localStorage.loginUserNam);
          // alert(this.modifyPassworForm.phone);
          axios({
            method: "post",
            url: this.objURL.referList, //数据地址，数据来源于objURL.List中的地址
            data: {
              mobile: activeUser,
              password: this.modifyPassworForm.password,
              mobileVCode: this.modifyPassworForm.mobileVCode,
              phone: this.modifyPassworForm.phone
            } //传递参数
          })
            .then(response => {
              let { code, message } = response.data; //返回数据里,如果没有赋值的对象的话,则返回为未定义code和message在里面有则可以调用
              console.log("data", code);
              console.log("response.data", message);
              if (code == 0) {
                this.$message({ message: "", type: "warning" });
              } else if (code == 1 || code == 2) {
                this.$message({
                  message: "验证码错误,请重填",
                  type: "warning"
                });
              } else {
                alert("注册成功");
              }
              this.modifyPassworForm = {};
            })
            .catch(error => {
              console.log(error);
              alert("错误产生" + error);
            });
        }
      });
    }
  },
  created() {
    console.log("dfdf", );
    this.aa=localStorage.loginUserName
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
    padding: 20px 20px 30px 5px;
    font-size: 28px;
    font-weight: 400;
  }
}
.login-form {
  width: 330px;
  margin: 0 auto;
}
.register-f-box {
  footer {
    font-weight: 700;
    font-size: 12px;
    color: #c4d4e5;
    text-align: center;
  }
}
@import "../assets/css/util.scss"; //导入公共样式文件
</style>