<template>
  <div class="login-father-box" v-show="ak47">
    <div class="login-box">
      <h1>用户登录</h1>
      <h2>为了你的帐号安全，请用手机号登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <div class>
            <el-input v-model.number="ruleForm.userName" placeholder="用户手机">
              <template slot="prepend">中国+86</template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="WP100" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <div style="margin-top:15px;">
              <div style="float:left">
                <!-- <a href="JavaScript:;">验证码登录</a> -->
              </div>
              <div style="float:right">
                <router-link to="/register">免费注册</router-link>|
                <a href="JavaScript">忘记密码</a>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <footer>
      登录即代表同意
      <a href="JavaScript:;">《用户使用协议》</a>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    let regnumber = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    // let regpasswordword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;

    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户手机"));
      } else if (!regnumber.test(value)) {
        callback(new Error("请输入正确手机格式"));
      } else {
        callback(); //通过校验
      }
    };

    var validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      // else if (!regpasswordword.test(value)) {
      //   callback(new Error("密码格式不合规,请设置8-20位，英文字母+数字的组合"));
      // }
      else {
        callback(); //通过校验
      }
    };

    return {
       ak47:true,
      tableData: [],
      objURL: {
        list: "http://120.76.160.41:3000/crossList?page=mabang-member"
      },
      ruleForm: {
        //表单数据.
        userName: "",
        password: ""
      },
      rules: {
        //校验规则，需要定在el-form的rules属性上
        // validateuserName校验器是一个回调函数
        // trigger: "blur" 规则的触发方式，失焦事件
        userName: [{ validator: validateuserName, trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }]
      },
      userLog: {}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果校验结果为真
          axios({
            method: "post",
            url: this.objURL.list, //数据地址，数据来源于objURL.List中的地址
            data: { findJson: this.ruleForm } //传递参数
          })
            .then(response => {
              let { list } = response.data;
              this.userLog = list;
              // var userList = JSON.stringify(list);
              console.log("list", list);
              // 要从数据List里面拿出一个对象数据的话,需要用到EACH循环出来给予赋值 左边是碗,右边是水桶里的水
              list.forEach(item => {
                this.userLog = item.userName;
                this.nickName = item.nickName;
              });
              console.log("response.data", response.data);

              if (list.length > 0) {
                //接口测试工具中,只要传数据过去其中一个为错的,数组就为空,这里用数组长度判断最佳
                // 登录成功
                this.$message({ message: "登录成功", type: "success" });
                // this.getForm();
                localStorage.isLogin = 1;
                localStorage.loginUserName = this.userLog;
                localStorage.loginnickName = this.nickName;

                console.log("userName", this.userLog);
                // activeMenuIndex = this.list; //每个ID的登录状态
                this.$router.push({ path: "/home" });
              } else {
                //登录失败
                alert("用户名或密码错误");
              }

              //alert(userList);
              //alert( this.ruleForm.userName);

              // var userStatus = 0;
              // var userIndex = 0;
              // for (let i = 0; i < list.length; i++) {
              //   if (this.ruleForm.userName == list[userIndex].userName) {
              //     userStatus = 1;
              //     if (this.ruleForm.password == list[userIndex].password) {
              //       alert("登录成功");
              //       localStorage.isLogin = 1
              //        this.$router.push({ path: "/home" });
              //       console.log("localStorage.isLogin ",localStorage.isLogin )
              //       userStatus = 2;

              //     } else {
              //       alert("密码错误");
              //     }
              //   }
              //   userIndex++;
              // }
              // if (userStatus == 0) {
              //   alert("账户不存在,请注册");
              // }
            })
            .catch(error => {
              console.log(error);
              alert("错误产生" + error);
            });
        }
      });
    }
    // getForm() {
    //   this.$store.commit("getForm", this.userLog);
    // }
  },

  // computed: {
  //   activeMenuIndex() {
  //     return this.$store.state.user;
  //   },

  // },
  beforeCreate() {
    //------------如果已经登录------------
    if (localStorage.isLogin == 1) {
      ak47=false;
      this.$message({
        message: "您已登录,请勿重新登录",
        type: "warning",
        duration: 1200
      });
      setTimeout(() => {
        this.$router.push({ path: "/home" });
      }, 1500);
      //跳转到后台首页
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
