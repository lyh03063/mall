<template>
  <div class="app">
    <!-- 这是购物车插件 -->

    <div class="Shopping-box cartComponent">
      <el-dialog
        :visible.sync="dialogCartComponent"
        width="100%"
        style="padding: 0;"
        class="dialog-fade-in"
      >
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
  computed: {
    //计算属性

    cartData() {
      return this.$store.state.cartData;
    }
  },
  methods: {
    addCartFun() {
      this.dialogCartComponent = false;
      this.cartTotal = this.doc.price * this.doc.cartProductNumber;

      this.cartData.unshift(this.doc);
      console.log("this.cartData=============", this.cartData);
      // 当前加入购物车状态保存到本地
      let strArr = JSON.stringify({
        objcartData: this.doc,
        cartTotal: this.cartTotal
      }); //数组转字符串

      localStorage.objcartData = strArr;

      let strArr2 = JSON.stringify(this.cartData); //数组转字符串

      localStorage.cartData = strArr2;
    },
    goCartFun() {
      this.cartTotal = this.doc.price * this.doc.cartProductNumber;
      this.$store.commit("goCartFun", {
        objcartData: this.doc,
        cartTotal: this.cartTotal
      });
    }
  },
  data() {
    return {
      dialogCartComponent: true,

      cartTotal: 1,
      doc: {
        cartProductNumber: 1,
        isCart: true,
        _id: "5cfefc577352e31858b62470",
        P1: 1,
        name: "牛皮西瓜",
        description: "牛皮西瓜注释",
        detail:
          '<p>牛皮西瓜<span style="color: rgb(51, 51, 51);">详情</span></p>',
        price: 100,
        store: 5,
        prop: [
          {
            value: "6个装",
            title: "净含量"
          },
          {
            value: "2斤",
            title: "重量"
          }
        ],
        album: [
          {
            url:
              "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%"
          },
          {
            aaa: "图片2地址"
          }
        ],
        freight: 5
      }
    };
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
  z-index: -10;

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