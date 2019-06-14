<template>
  <div class="cartComponent">
    <!-- 这是购物车插件 -->
    <div class="Shopping-box cartComponent">
      <el-dialog :visible.sync="isCartCom" width="100%" style="padding: 0;" class="dialog-fade-in">
        <header class="header-box">
          <span class="header-img">
            <img :src="doc.album[0].url">
          </span>
          <div class="header-main">
            <div class="header-name">{{doc.name}}</div>
            <div class="header-price">￥{{doc.price}}</div>
          </div>
        </header>

        <main class="main">
          <div v-for="item in  doc.prop" :key="item.value">
            <span>{{item.title}}:</span>
            <span class="main-btn">
              <el-button type="danger" size="mini">{{item.value}}</el-button>
            </span>
          </div>
        </main>
        <footer>
          <span class="footer-name">购买数量：</span>
          <span class="footer-input">
            <el-input-number :min="1" :max="doc.store" size="mini" v-model="doc.cartProductNumber"></el-input-number>
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
  data: function(){
return{
  isCartCom:true
}
  },
  methods: {
    addCartFun() {
      this.$store.commit("isCartComClose");
      this.cartTotal = this.doc.price * this.doc.cartProductNumber;
      // 深度拷贝
      let str = JSON.stringify(this.doc); //转化为字符串
      let rowNew = JSON.parse(str); //转化为对象
      this.cartData.unshift(rowNew); //
      let strArr2 = JSON.stringify(this.cartData); //数组转字符串
      localStorage.cartData = strArr2;
    },

    goCartFun() {
      this.$store.commit("isCartComClose");
      this.$router.push({ path: "/confirmOrder" });
      this.$store.commit("goCartFun", this.doc);
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
      //总的数据列表
      return this.$store.state.doc;
    },
    cartData() {
      return this.$store.state.cartData;
    },
    isCartCom() {
      return this.$store.state.isCartCom;
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