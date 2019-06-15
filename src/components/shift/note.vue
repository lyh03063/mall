<template>
  <div>
    <div class="item" @click="start()">获取验证码</div>
    <div class="defense" v-if="isOpen">{{count}}秒后重新获取</div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: ["cf", "isnote"],
  data() {
    return {
      count: 60,
      isOpen: false
    };
  },
  methods: {
    reciprocal(count) {
      this.count--;
      if (this.count == 0) {
        clearInterval(this.time);
        this.isOpen = false;
        this.count = 60;
      }
    },
    start() {
      console.log("this.isnote", this.isnote);
      if (this.isnote) {
        this.time = setInterval(this.reciprocal, 1000);
        this.isOpen = true;
        this.sms();
      }

      // this.$store.commit("changeActiveCellphone", mobileVCode);
    },
    sms() {
      axios({
        method: "post",
        url: "http://120.76.160.41:3000/mabangMall/sendMobileMessage",
        data: {
          mobile: this.cf
        }
      })
        .then(response => {
          let { code, message, data } = response.data; //解构赋值
          if(code == 0){
             this.$message({ message: "验证码发送成功", type: "success" });
          }else if(code == 2){
             this.$message.error('手机已注册');
             this.isOpen = false; 
                  setTimeout(() => {
                      this.$router.push({ path: "/login" });
                  },3000)
          }
            ;
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },
  computed: {
    mobile() {
      //总的数据列表
      return this.$store.state.activeCellphoneVerify;
    }
  }
};
</script>

<style>
.item {
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 25px;
  position: relative;
  /* border:1px solid black; */
}
.defense {
  width: 100%;
  height: 38px;
  text-align: center;
  line-height: 38px;
  color: #ffffff;
  background-color: #409eff;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
