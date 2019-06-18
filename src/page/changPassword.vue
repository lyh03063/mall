
<template>
  <div class="login-father-box">
    <div class="login-box">
      <h1>修改密码</h1>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="password">
          <div class>
            <el-input show-password v-model.number="ruleForm.password" placeholder="原密码">
              <template slot="prepend">原密码</template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            show-password
            v-model="ruleForm.newPassword"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            show-password
            v-model="ruleForm.checkPass"
            placeholder="请再输入一次密码"
            autocomplete="off"
            @keydown.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="WP100" @click="submitForm('ruleForm')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>

    <footer>修改密码</footer>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码填写是否正确"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      objURL: {
        list: "http://120.76.160.41:3000/crossList?page=mabang-member",
        modifyPassword:
          "http://120.76.160.41:3000/crossModify?page=mabang-member"
      },
      ruleForm: {
        //表单数据.
        userName: "",
        password: "",
        newPassword: ""
        // checkPass:""
      },
      rules: {
        //校验规则，需要定在el-form的rules属性上
        // validateuserName校验器是一个回调函数
        // trigger: "blur" 规则的触发方式，失焦事件
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      userLog: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log("userName", this.ruleForm.userName);
        console.log("password", this.ruleForm.password);
        //表单组件执行validate校验方法
        if (valid) {
          //如果校验结果为真
          axios({
            method: "post",
            url: this.objURL.list, //数据地址，数据来源于objURL.List中的地址
            data: {
              findJson: {
                userName: this.ruleForm.userName,
                password: this.ruleForm.password
              }
            } //传递参数
          })
            .then(response => {
              let { list } = response.data;
              // var userList = JSON.stringify(list);
              // console.log("list", result);
              // 要从数据List里面拿出一个对象数据的话,需要用到EACH循环出来给予赋值 左边是碗,右边是水桶里的水
              if (list.length > 0) {
                console.log("16");
                this.modifyPassword();
              } else {
                this.$message({
                  message: "原密码错误,请重新输入",
                  type: "warning"
                });
                this.ruleForm = {
                  userName: this.ruleForm.userName,
                  password: "",
                  newPassword: ""
                };
              }
            })
            .catch(error => {
              console.log(error);
              alert("错误产生" + error);
            });
        }
      });
    },
    modifyPassword() {
      //如果校验结果为真
      axios({
        method: "post",
        url: this.objURL.modifyPassword, //数据地址，数据来源于objURL.List中的地址
        data: {
          findJson: {
            userName: this.ruleForm.userName,
            password: this.ruleForm.password
          },
          modifyJson: {
            password: this.ruleForm.newPassword
          }
        } //传递参数
      })
        .then(response => {
          let { result, nModified } = response.data;
          // var userList = JSON.stringify(list);
          // console.log("list", result);
          // 要从数据List里面拿出一个对象数据的话,需要用到EACH循环出来给予赋值 左边是碗,右边是水桶里的水
          if (result.nModified == 1) {
            this.$message({
              message: "修改成功,请重新登录",
              type: "success",
              duration: 1600
            });
            setTimeout(() => {
              localStorage.isLogin = "0";
            localStorage.loginUserName = null;
              this.$router.push({ path: "/login" });
            }, 2000);
            
          } else {
            this.$message({
              message: "修改失败,请重新修改",
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log(error);
          alert("错误产生" + error);
        });
    }

    // getForm() {
    //   this.$store.commit("getForm", this.userLog);
    // }
  },

  created() {
    //ruleForm列表里的用户名等于储存当前登录的用户名
    this.ruleForm.userName = localStorage.loginUserName;
    // console.log("dfdf", this.ruleForm.userName);
  },
  // computed: {
  //   activeMenuIndex() {
  //     return this.$store.state.user;
  //   },

  // },
  beforeCreate() {
    //------------如果未登录------------
    if (localStorage.isLogin != 1) {
      this.$router.push({ path: "/login" }); //跳转到后台首页
    }
    // } else {
    //   this.$router.push({ path: "/home" });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.login-box {
  width: 100%;
  padding: 40px;

  h1 {
    padding: 20px 20px 20px 5px;
    font-size: 28px;
    font-weight: 400;
  }
  h2 {
    margin: 20px 20px 20px 5px;
    padding-left: 5px;
    color: #999999;
    font-size: 16px;
    font-weight: 400;
  }
}
.login-father-box {
  footer {
    font-weight: 700;
    font-size: 12px;
    color: #c4d4e5;
    text-align: center;
  }
}

.login-form {
  width: 100%;
  margin: 20px;
}
</style>
