<template>
  <div class="cartComponent">
    <!-- 这是购物车插件 -->
    <div class="Shopping-box cartComponent">
      <el-dialog
        :visible.sync="isCartCom"
        width="100%"
        style="padding: 0;"
        class="dialog-fade-in"
        :before-close="closeDialogFun"
      >
        <!------------------商品信息-------------------->
        <header class="header-box">
          <span class="header-img">
            <img :src="doc.album[0].url" v-if="doc.album">
          </span>
          <div class="header-main">
            <div class="header-name">{{doc.name}}</div>
            <div class="header-price">￥{{doc.price}}</div>
          </div>
        </header>
        <!------------------规格-------------------->
        <main class="main">
          <div v-for="item in  doc.prop" :key="item.value">
            <span>{{item.title}}:</span>
            <span class="main-btn">
              <el-button type="danger" size="mini">{{item.value}}</el-button>
            </span>
          </div>
        </main>
        <!------------------购买数量：-------------------->
        <footer>
          <span class="footer-name">购买数量：</span>
          <span class="footer-input">
            <el-input-number :min="1" :max="doc.store" size="mini" v-model="doc.byCount"></el-input-number>
          </span>
          <div class="footer-bt-box">
            <div class="footer-bt" @click="addCartFun">加入购物车</div>
            <div class="footer-bt" @click="goCartFun" style="background-color:red;">立即购买</div>
          </div>
        </footer>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    //------------------关闭购物车弹窗函数----------------
    closeDialogFun() {
      this.$store.commit("isCartComClose");
    },
    //------------------加入购物车函数----------------
    addCartFun() {
      this.closeDialogFun();

      this.cartTotal = (this.doc.price * this.doc.byCount).toFixed(2); //计算商品的总价格
      this.doc.byCount = 1; //购买数量为1

      //把数据拼接在购物车数据列表
      let cartData = [];
      if (window.localStorage.cartData) {
        cartData = JSON.parse(localStorage.cartData);
      }
      cartData.unshift(this.doc);
      // 购物车列表进行本地储存
      let strArr = JSON.stringify(cartData); //数组转字符串
      localStorage.cartData = strArr;

      this.$message({
        message: "加入购物车成功",
        type: "success"
      });
    },
    //-----------------立即购买函数----------------
    goCartFun() {
      this.closeDialogFun(); //关闭弹窗
      this.$router.push({ path: "/confirmOrder" }); //跳转到确认订单

      // 把确认订单数据存在本地
      let confirmOrder = [];
      let strArr = JSON.stringify(this.confirmOrder.push(this.doc)); //数组转字符串
      localStorage.confirmOrder = strArr;
    }
  },
  data() {
    return {
      cartTotal: 1
    };
  },
  computed: {
    //计算属性

    //从vuex拿到的数据
    doc() {
      //当前页面渲染的数据列表
      return this.$store.state.doc;
    },

    isCartCom() {
      //控制购物车插件弹窗是否显示
      return this.$store.state.isCartCom;
    }
  },

  beforeCreate() {
    //------------如果未登录------------
    // console.log("用戶手機", localStorage.loginUserName)
    if (localStorage.isLogin == 0) {
      this.$router.push({ path: "/login" }); //跳转到后台首页
    }
  }
};
</script>



<style lang="scss" scoped>
// @import "../assets/css/util.scss"; //导入公共样式文件
el-dialog .el-dialog__header {
  padding: 0;
}
header {
  margin: 0;
  padding: 0;
}
.header-box {
  width: 100%;
  border-bottom: 0.5px #ebedf0 solid;
  position: absolute;
  top: 0;
  left: 0;
  height: 80px;
  z-index: 10;

  .header-main {
    float: left;
    margin: 10px;

    .header-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 10px;
    }
    .header-price {
      color: #f44;
    }
  }

  .header-img {
    width: 80px;
    height: 80px;
    float: left;
    position: relative;
    margin-right: 20px;

    // margin-top: -10px;
    // border-radius: 2px;
    img {
      position: absolute;
      top: -20px;
      left: 15px;
      width: 100%;
      height: 100%;
    }
  }
}

.main {
  margin: 0 18px;
  margin-top: 60px;
  border-bottom: 0.5px #ebedf0 solid;
  background-color: #fff;
  .main-btn {
    display: block;
    margin: 15px 0;
  }
}
// -----编辑状态计数器样式-----
.el-input-number--mini {
  width: 90px;
  line-height: 26px;
  color: #000;
}

.footer-name {
  display: inline-block;
  padding: 18px 18px;
}
.footer-input {
  float: right;
  padding: 10px 18px;
}

.footer-bt {
  width: 50%;
  height: 50px;
  background-color: #f85;

  text-align: center;
  line-height: 50px;
  color: #fff;
  float: left;
  border-top: #ebedf0 8px solid;
}
</style>