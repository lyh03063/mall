<template>
  <div>
    <div class="main-cfo">
      <div style="background-color:white">
        <router-link to="./memberAddress?Address=confirmOrder">
          <!-- :cf="title" -->
          <!-- @click="$store.commit('selection');" -->
          <ul class="address">
            <!--勾选显示 -->
            <i class="el-icon-arrow-right"></i>
            <p>{{postAddress.phone}}</p>
            <i class="iconfont icondizhi1"></i>
            <li>收货人：{{postAddress.name}}</li>
            <li class="FS14">收货地址：{{postAddress.area}}</li>
          </ul>
        </router-link>
      </div>
      <div class="line"></div>
    </div>
    <space height="15"></space>

    <!-----------------商品詳情--------------------->
    <div class="BC_fff">
      <div class="FS15" style="padding:20px 2.5%;height:60px;">
        <i class="iconfont iconshangcheng"></i>
        <router-link to="./home">
          <span class="shoppingmall">码帮商城</span>
        </router-link>
      </div>
      <!-----------------商品詳情--------------------->
      <div class="details" v-for="(item,index) in confirmOrder" :key="index">
        <a>
          <img :src="item.album[0].url" v-if="item.album">
        </a>
        <div class="title-details">
          <p>{{item.name}}</p>
          <p style="color:#999;font-size:12px;margin: 5px 0;">{{item.description}}</p>
          <template v-if="item.extend.prop">
            <span
              :key="eachprop.title"
              class="details-prop"
              v-for="eachprop in  item.extend.prop"
            >{{eachprop.title}}{{eachprop.option}}</span>
          </template>
          <div>
            <span style="color:#f44; margin: 5px 0;">￥{{item.price}}</span>
            <span style="float:right">X{{item.byCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-----------------配送方式--------------------->
    <div>
      <div class="delivery-box" @click="delivery=true">
        <div style="width:50%;float:left;font-size:16px;line-height: 30px">
          <p>配送方式</p>
        </div>
        <div class="delivery-mode">
          <i class="el-icon-arrow-right"></i>
          <span>同城配送 免运费</span>

          <br>
          <span>{{ this.Objparma.extend.distribution.day}}{{ this.Objparma.extend.distribution.time }}</span>
          <!-- <span style="color:#999">請選擇期望送達時間</span> -->
          <!-- <span style="margin-right:10px">{{timeList}}</span>
          <span>{{timeList1}}</span>-->
        </div>
      </div>
      <div class="message">
        <div style="font-size:16px;max-width:90px;display:inline-block">
          <span>买家留言</span>
        </div>
        <div>
          <textarea
            style="width:100%;float:right;border:0;font-size:16px"
            placeholder="建议留言前先于商家沟通确认"
            v-model="Objparma.leaveMsg"
          ></textarea>
        </div>
      </div>
    </div>
    <!------------------商品金额-------------------->
    <div class="total-price">
      <p>
        商品金额
        <span>￥{{cartTotal}}</span>
      </p>
      <p style="border-bottom:1px solid #e3e3e3">
        运费
        <span>+￥0</span>
      </p>
      <span>
        合计:
        <span style="color:#f44">￥{{cartTotal}}</span>
      </span>
    </div>
    <!-------------------提交订单----------------->
    <div class="palce-order">
      <div style="float:right">
        <span>
          合計:
          <span class="C_f00">￥{{cartTotal}}</span>
        </span>

        <el-button style="margin-right:10px" @click="JumpDetail" round>提交订单</el-button>
      </div>
    </div>
    <!--------------配送时间弹窗------------->
    <el-dialog title="选择配送方式" :visible.sync="delivery" width="100%" custom-class="abc">
      <div style="text-align:center">
        <el-button
          type="danger"
          style="background:-webkit-linear-gradient(left, #FF9000 0%, #FF5000 98%);;width:95%"
          round
        >同城配送 免运费</el-button>
      </div>
      <p class="FS15" style="margin:10px 0;border-bottom:1px solid gray;color:black">预约送达时间</p>

      <timePicker @gotiem="gotiem"></timePicker>

      <div class="footer">
        <span type="primary" @click="delivery=false">确 定</span>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import timePicker from "../components/cart/timePicker";
export default {
  components: {
    timePicker
  },

  data: function() {
    return {
      confirmOrder: [], //确认订单的数据列表
      delivery: false, //控制配送方式的弹窗
      postAddress: {},
      Objparma: {
        status: "1", //订单状态
        money: null, //总价钱
        userName: null, //用户名
        leaveMsg: "", //留言
        extend: {
          //配送时间段
          distribution: {},
          prop: []
        },
        commodityList: [
          //商品数组
          {
            byCount: "",
            freight: "",
            price: "",
            name: "",
            P1: ""
          }
        ],
        postAddress: {
          //获取用户填写得地址
          address: "",
          phone: "",
          name: ""
        }
      }
    };
  },
  methods: {
    //------------------配送时间函数----------------
    gotiem(distribution) {
      this.Objparma.extend.distribution = distribution;
      console.log("===================distribution", distribution);
    },

    //------------------跳转订单列表
    JumpDetail() {
      if (
        this.postAddress.phone &&
        this.postAddress.name &&
        this.postAddress.area
      ) {
        this.Objparma.commodityList = this.confirmOrder.map(item => {
          let { byCount, freight, price, name, P1 } = item;
          return { byCount, freight, price, name, P1 };
        });
        this.Objparma.money = this.cartTotal;
        this.Objparma.postAddress.address = this.postAddress.area;
        this.Objparma.postAddress.phone = this.postAddress.phone;
        this.Objparma.postAddress.name = this.postAddress.name;
        this.Objparma.userName = localStorage.loginUserName;
        this.confirmOrder.forEach(item => {
          this.Objparma.extend.prop = item.extend.prop;
        });

        this.getAddorder(); //调用请求接口函数
        this.$router.push({ path: "/memberOrder?orderactiveName=1" });
      } else {
        this.$message.error("请选择收货人，收货地址");
      }
    },

    //------------------新增订单axios请求接口函数
    getAddorder() {
      console.log(" this.Objparma--新增订单axios请求接口函数", this.Objparma);
      axios({
        method: "post",
        url: "http://120.76.160.41:3000/crossAdd?page=mabang-order",
        data: {
          data: this.Objparma
        }
      })
        .then(response => {
          this.$message({
            message: "新增订单成功",
            type: "success"
          });

          // 对购物车的数据进行重新筛选
          let cartData = [];
          if (window.localStorage.cartData) {
            cartData = JSON.parse(localStorage.cartData);
            let add = cartData.filter(
              item => !this.confirmOrder.some(ele => ele.P1 === item.P1)
            );
            localStorage.cartData = JSON.stringify(add);
          }

          localStorage.confirmOrder = ""; //对本地数据进行清空
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },

  computed: {
    //------------------计算总价钱
    cartTotal() {
      //计算合计总数
      let stock = 0; //初始值设置为0
      this.confirmOrder.forEach(item => {
        stock += item.price * item.byCount; //
      });
      return stock.toFixed(2);
    }

    //------------------ 收货地址
    // title() {
    //   return this.$store.state.confirmOrderAddress;
    // }
  },
  created() {
    //------------------ 如果本地有确认订单数据
    if (localStorage.confirmOrder) {
      let arr1 = JSON.parse(localStorage.confirmOrder); //对象转换成字符串
      this.confirmOrder = arr1;
      console.log("beforeCreate===", this.confirmOrder);
    } else {
      // 如果没有确认订单数据
      this.$message({
        message: "( ⊙ o ⊙ ) ！没有要提交的，去逛逛吧",
        type: "warning",
        center: true
      });
      this.$router.push({ path: "/home" }); //跳转到购物车
    }
    if (localStorage.postAddress) {
      this.postAddress = JSON.parse(localStorage.postAddress);
    }
  },

  beforeCreate() {
    util.cheackLogin(this);
  }
};
</script>



<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
.iconfont {
  float: left;
  display: block;
  margin-right: 6px;
}
.shoppingmall {
  background-size: 100%;
  float: left;
  overflow: hidden;

  display: block;
}
.palce-order {
  width: 100%;
  background-color: white;
  position: fixed;
  height: 50px;
  bottom: 0;
  .el-button {
    margin-left: 5px;
    height: 50px;
    background: -webkit-linear-gradient(left, #ff9000 0%, #ff5000 98%);
    color: white;
  }
}
.main {
  background-color: #f8f8f8;
}
.delivery-btn {
  text-align: center;
  .el-button {
    width: 95%;
    background: #f44;
    color: white;
    margin-left: 2.5%;
    border-color: #f44;
  }
}
.address {
  padding: 10px 2.5%;
  font-size: 16px;
  li {
    padding-bottom: 5px;
    padding-left: 20px;
  }
  p {
    float: right;
  }
}
.el-icon-arrow-right {
  float: right;
  margin-top: 15px;
  margin-left: 5px;
  overflow: hidden;
}
.details {
  background-color: #f8f8f8;
  padding: 5px 2.5%;
  margin-bottom: 5px;
  overflow: hidden;
  a {
    // display: inline-block;
    height: 90px;
    width: 90px;
    float: left;
    margin-right: 8px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .title-details {
    font-size: 16px;
  }
}
.delivery-box {
  background-color: white;
  padding: 10px 2.5%;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.delivery-mode {
  text-align: right;
  width: 50%;
  float: right;
}
.message {
  background-color: white;
  padding: 10px 2.5%;
  overflow: hidden;
  margin-top: 2px;
}
.total-price {
  margin-top: 10px;
  padding: 10px 2.5%;
  font-size: 14px;
  background-color: white;
  overflow: hidden;
  span {
    float: right;
  }
  p {
    margin: 10px 0;
  }
}
.line {
  left: 0;
  right: 0;
  content: "";
  height: 2px;
  position: absolute;
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6d6d,
    #ff6d6d 20%,
    transparent 0,
    transparent 25%,
    #3283fa 0,
    #3283fa 45%,
    transparent 0,
    transparent 50%
  );
  background: repeating-linear-gradient(
    -45deg,
    #ff6d6d,
    #ff6d6d 20%,
    transparent 0,
    transparent 25%,
    #3283fa 0,
    #3283fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}
.el-dialog.abc {
  position: fixed;
  bottom: 0;
  margin: 0;
  // text-align:center
}

.footer span {
  width: 100%;
  height: 40px;
  display: inline-block;
  text-align: center;
  border: 1px solid#FFE153;
  line-height: 50px;
  background: -webkit-linear-gradient(left, #ff9000 0%, #ff5000 98%);
  color: white;
}
.el-dialog__header span {
  text-align: center;
  display: block;
  font-size: 15px;
  border-bottom: 1px solid gray;
}
.el-dialog.abc .el-dialog__body {
  padding: 0;
  padding-top: 10px;
}
.details-prop {
  color: #999;
  font-size: 12px;
      margin-right:10px;
}
</style>