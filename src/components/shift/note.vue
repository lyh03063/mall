<template>
  <div>
    <div class="item" @click="start()">获取验证码</div>
    <div class="defense" v-if="isOpen">{{count}}秒后重新获取</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
      isOpen: false
    };
  },
  methods: {
    reciprocal(count) {
      this.count--;
      if (this.count == 0) {
        clearInterval(this.time);
        this.isOpen = false;
        this.count = 5;
      }
    },
    start() {
      this.time = setInterval(this.reciprocal, 1000);
      this.isOpen = true;
      this.sms()
    },
    sms() {
      axios({
        method: "post",
        url: "http://120.76.160.41:3000/mabangMall/sendMobileMessage",
        data: {
          mobile:this.mobile
        }
      })
        .then(response => {
          let { code,message,data } = response.data; //解构赋值
          console.log("code", code);
          console.log("message", message);
          console.log("data", data);
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
  },
};
</script>

<style>
.item {
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 25px;
  position: relative;
  border:1px solid black;
}
.defense {
  width: 100px;
  height: 30px;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;

}
</style>
