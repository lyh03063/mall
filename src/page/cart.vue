<template>

  <div class="main">

  <div class="cart">
   

    <div class="shop">
      <!-- 全选打钩按钮 -->
      <div :class="{'shop-checkbox-box':true, isChecked:allIsCart}" @click="AllshopCheckbox">
        <div class="shop-checkbox">
          <i class="el-icon-check"></i>
        </div>
      </div>

      <!-- 商城图标 -->
      <div class="icon-shop"></div>
      <div class="shop-name">米柚生活</div>

      <div class="shop-edit" @click="editfun">
        <div v-if="!isedit">编辑</div>
        <div v-else>完成</div>
      </div>
    </div>

    <!------------- 购物车的主要内容 ---------------->

    <div v-for="(item,index)  in  cartData" :key="index" class="cart-product-box">

    <div
      v-for="item  in  cartData"
      :key="item.P1"
      class="cart-product-box"
      @click="shopCheckbox(item)"
    >

      <!-- 打钩按钮 -->
      <div :class="{'shop-checkbox-box':true, isChecked:item.isCart}" @click="shopCheckbox(item)">
        <div class="shop-checkbox">
          <i class="el-icon-check"></i>
        </div>
      </div>

      <!-- 商品图片 -->
      <div class="cart-img">
        <img :src="item.imgUrl">
      </div>

      <!-- 商品名与计数器 -->
      <div class="cart-main">
        <div class="cart-name">
          <template v-if="!isedit">{{item.name}}</template>
          <el-input-number v-else v-model="item.cartProductNumber" :min="1" size="mini"></el-input-number>
        </div>
        <!-- 商品介绍、价格、数量 -->
        <div class="cart-intro">{{item.description}}</div>
        <div class="cart-price">{{item.price}}</div>
        <div class="cart-number">X{{item.cartProductNumber}}</div>
      </div>
    </div>

    <!----------- 页尾 ------------->
    <footer>
      <!-- 全选打钩按钮 -->
      <div :class="{'shop-checkbox-box':true, isChecked:allIsCart}" @click="AllshopCheckbox">
        <div class="shop-checkbox">
          <i class="el-icon-check"></i>
        </div>
      </div>

      <div class="footer-all">全选</div>

      <!-- 结算与删除 -->
      <div class="footer-right-box">
        <template v-if="!isedit">
          <span class="footer-total">
            <span>合计：￥{{cartTotal}}</span>
            <p>运费</p>
          </span>
          <el-button type="danger">结算（{{cartBalance}}）</el-button>
        </template>
        <el-button type="danger" v-else :disabled="cartBalance==0" @click="dialogVisible=true">删除</el-button>
      </div>
    </footer>

    <!---------------- 删除弹窗----------------- -->
    <el-dialog :visible.sync="dialogVisible" width="70%" class="deleteDialog" style="padding:0">
      <div style="justify-content: center; display: flex; ">确定删除所选店铺的{{cartBalance}}个商品？</div>
      <div class="dialog-footer">
        <span @click="dialogVisible = false">取 消</span>
        <span type="primary" @click="cartdeleteFun">确 定</span>
      </div>
    </el-dialog>

    
  </div>
  </div>
  </div>
</template>


<script>
import cartComponent from "../components/cart/cartComponent"
export default {
  components:{cartComponent},
  data() {
    return {
      dialogVisible: false, //控制删除弹窗是否显示
      allIsCart: false, //控制全选的按钮
      cartBalance: 0, //选中之后总的商品数量
      isedit: false, //是否为编辑状态

      isCartList: [], //选中之后的列表

      //---------- 加入购物车以后的产品数组
      cartData: [
        {
          isCart: false, //控制是否选中状态
          P1: 1,
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%",
          name:


            "1【商务中号切盘，4-6人份】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享精彩！",
          description: "1-6种时令水果大切盘，鲜切水果",
          price: 20,

          cartProductNumber: 2 //产品选中的数量
        },
        {
          isCart: false,
          P1: 2,
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%",
          name:


            "2【商务中号切盘，4-6人份】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享精彩！",
          description: "2-6种时令水果大切盘，鲜切水果",
          price: 30,

          cartProductNumber: 2
        },
        {
          isCart: false,
          P1: 3,
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%",
          name:

            "3【商务中号切盘，4-6人份】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享精彩！",
          description: "3-6种时令水果大切盘，鲜切水果",
          price: 40,
          cartProductNumber: 10
        },

        {
          isCart: false,
          P1: 4,
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%",
          name:
            "4【商务中号切盘，4-6人份】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享精彩！",
          description: "4-6种时令水果大切盘，鲜切水果",
          price: 50,
          cartProductNumber: 2
        },
        {
          isCart: false,
          P1: 5,
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%",
          name:
            "5【商务中号切盘，4-6人份】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享精彩！",
          description: "5-6种时令水果大切盘，鲜切水果",

          cartProductNumber: 10
        }
      ]
    };
  },
  methods: {
    onSwipeLeft(e) {
      console.group("aa-------", e);
    },
    //----------点击选中函数-------
    shopCheckbox(item) {
      item.isCart = !item.isCart; //对当前节点的状态取反
      // 当循环到的含有选中状态，那么不全选
      this.cartData.filter(doc => {
        if (doc.isCart == true) {
          this.allIsCart = false;
          return true;
        }
      });
    },

    // --------全选按钮函数---------
    AllshopCheckbox() {
      this.allIsCart = !this.allIsCart; //当期选中状态取反

      // 把列表的所有状态都变为选中状态或者不选中状态
      for (var i = 0; i < this.cartData.length; i++) {
        this.cartData[i].isCart = this.allIsCart;
      }
    },

    // --------编辑函数---------
    editfun() {
      this.allIsCart = false; //全选取消
      this.isedit = !this.isedit; //是否进入编辑状态

      // 先把列表的所有状态进行未选中状态
      for (var i = 0; i < this.cartData.length; i++) {
        this.cartData[i].isCart = false;
      }
    },
    // --------删除函数---------
    cartdeleteFun() {
      this.dialogVisible = false;



      console.log("删除--this.isCartList", this.isCartList);
      // -------删除之后待做-------

      console.group("删除-------");
      console.log("this.isCartList", this.isCartList);

      // -------删除之后待做-------
      console.log("后--this.cartData", this.cartData);

      let arrCartData = this.cartData.filter(item => !item.isCart);
      this.cartData = arrCartData;

      if (this.allIsCart) {
        this.cartData = [];
        this.allIsCart = false;
      }
    },
    // --------结算函数---------
    cartBalanceFun() {
      if (this.isCartList.lenght != 0) {
        let objCartBalance = {
          isCartList: this.isCartList,
          cartTotal: this.cartTotal
        };
        this.$store.commit("cartBalanceFun", objCartBalance);
        this.$router.push({ path: "/confirmOrder" });
      }

    }
  },
  watch: {
    cartData: {
      handler: function() {
        // 当选中时，返回this.isCartList数组
        this.isCartList = this.cartData.filter(item => {
          return item.isCart;
        });
        //  商品总数量等于选中的数组长度
        this.cartBalance = this.isCartList.length;

        console.log("选中状态的列表--this.isCartList", this.isCartList);
        if (this.isCartList.length == this.cartData.length) {
          this.allIsCart = true;

        // 如果总的数组存在
        if (this.cartData.length) {
          // 如果选中的数组等于选中的数组，那么就全选
          if (this.isCartList.length == this.cartData.length) {
            this.allIsCart = true;
          }

        }

        }
        }
        },
      deep: true //深度监听
    },
  
  computed: {
    //计算属性
    cartTotal() {
      //计算合计价钱总数
      let stock = 0; //初始值设置为0
      this.isCartList.forEach(item => {
        stock += item.price * item.cartProductNumber; //
      });
      return stock;
    }
  }
};
</script >
<style lang="scss" scoped>
@import "../assets/css/util.scss"; //导入公共样式文件

//---------当前页面------
.main {
  width: 100%;
}

//------- 商城模块-------
.shop {
  width: 100%;
  height: 52px;
  padding: 0 0 0 10px;
  line-height: 52px;
  float: left;
  border-bottom: 1px solid #ebedf0;
}

.shop-checkbox-box {
  float: left;
  height: 52px;
  line-height: 52px;
  margin-top: 20px;
}
.shop-checkbox {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;
  // margin-top: 16px;
  // margin-right: 8px;
  position: relative;
  border: #ddd 1px solid;
}
.el-icon-check {
  display: none;
  font-weight: bold;
  color: #fff;
}
// ------选中状态的样式------
.isChecked .shop-checkbox {
  background-color: red;
  border: 0;
}
.isChecked .el-icon-check {
  display: block;
}
.icon-shop {
  background-image: url(../assets/images/icon_Shop.png);
  width: 18px;
  height: 50px;
  margin-right: 5px;
  background-size: 18px;
  background-position: 50%;
  background-repeat: no-repeat;
  float: left;
}

.shop-name {
  float: left;
  font-size: 18px;
  color: #333;
}
.shop-edit {
  float: right;
  margin-right: 20px;
  line-height: 50px;
  color: #38f;
}

//---------购物车内容模块----start-----
.cart-product-box {
  width: 100%;
  clear: both;
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 5px 10px 5px 0;
}
.cart-product-box .shop-checkbox-box {
  margin-top: 40px;
}
.cart-product-box .cart-img {
  float: left;
}
.cart-img img {
  width: 90px;
  height: 90px;
  float: left;
  margin-left: auto;
  margin-right: auto;
  background: #f8f8f8;
  background-size: cover;
}
.cart-name {
  color: #333;
  font-size: 14px;
  line-height: 20px;
  height: 40px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.cart-intro {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
  overflow: hidden;
}
.cart-price {
  font-size: 14px;
  color: #f44;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
.cart-number {
  font-size: 12px;
  float: right;
  color: #666;
  line-height: 20px;
  margin-right: 25px;
}
.cart-main {
  margin-left: 10px;
  width: 100%;
}
//---------购物车内容模块----end-----

//------------页脚----------
footer {
  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  height: 50px;
  line-height: 50px;
  padding: 0 0 0 10px;

  .el-button--danger {
    background-color: #f44;
    border-radius: 0;
    margin: 0;
    height: 50px;
    min-width: 75px;
    padding: 5px;
  }
  .el-button--danger.is-disabled {
    background-color: #ffa2a2;
  }

  .shop-checkbox-box {
    float: left;
    line-height: 20px;
    margin-top: 17px;
  }
}

// -----右下角结算与删除盒子
.footer-right-box {
  float: right;
}

// ------全选文字样式
.footer-all {
  float: left;
}
// -----右下角合计与运费
.footer-total {
  float: left;
  height: 50px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 16px;

  color: #999;
  padding: 8px 10px;
  color: #f60;
  p {
    color: #999;
  }
}

// -----编辑状态计数器样式-----
.el-input-number--mini {
  width: 90px;
  line-height: 26px;
  color: #000;
}

//----- 删除弹窗----start
.dialog-footer {
  margin-bottom: -13px;
  margin: -30px -20px;
  margin-top: 50px;
}
.dialog-footer span {
  width: 50%;
  height: 50px;
  display: inline-block;
  text-align: center;
  border: 1px solid #ebedf0;
  line-height: 50px;
}
.dialog-footer span:last-child {
  color: #1989fa;
}
//———— 删除弹窗————end
</style>