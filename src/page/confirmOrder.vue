<template>
  <div>
    <div class="main-cfo">
      <div style="background-color:white">
        <div class="delivery-btn">
          <el-button class="iconfont iconkuaidi">商家配送</el-button>
        </div>
        <router-link to="./memberAddress">
          <ul :cf="title" class="address" @click="$store.commit('selection');">
            <!--勾选显示 -->
            <p>{{title.phone}}</p>
            <i class="iconfont icondizhi1"></i>
            <li>收货人：{{title.name}}</li>
            <li class="FS14">收货地址：{{title.area}}</li>
          </ul>
        </router-link>
      </div>

      <div class="line"></div>
    </div>
    <space height="15"></space>

    <div class="BC_fff">
      <div class="FS15" style="padding:20px 2.5%;height:60px;">
        <i class="iconfont iconshangcheng"></i>
        <router-link to="./home">
          <span class="shoppingmall">码帮商城</span>
        </router-link>
      </div>
      <!-----------------商品詳情--------------------->
      <div class="details" v-for="(item,index) in cartData" :key="index">
        <a>
          <img :src="item.album[0].url">
        </a>
        <div class="title-details">
          <p>{{item.name}}</p>
          <p style="color:#999;font-size:12px">{{item.description}}</p>
          <div>
            <span style="color:red">￥{{item.price}}</span>
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
          <span>同城配送 免运费</span>
          <br>
          <!-- <span style="color:#999">請選擇期望送達時間</span> -->
          <span style="margin-right:10px">{{distribution.day}}</span>
          <span>{{distribution.times}}</span>
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
        <span style="color:red">￥{{cartTotal}}</span>
      </span>
    </div>
    <!-------------------提交订单----------------->
    <div class="palce-order">
      <div style="float:right">
        <span>
          合計:
          <span class="C_f00">￥{{cartTotal}}</span>
        </span>

        <el-button @click="JumpDetail" type="danger">提交订单</el-button>
      </div>
    </div>
    <div>
      <el-dialog title="選擇配送方式" :visible.sync="delivery" width="100%" custom-class="abc">
        <div style="text-align:center">
          <el-button type="danger" style="background-color:red;width:95%" round>同城配送 免運費</el-button>
        </div>
        <p class="FS15" style="margin:10px 0;border-bottom:1px solid gray;color:black">預約送達時間</p>

        <el-date-picker
          style="width:50%"
          value-format="MM-dd"
          :picker-options="pickerOptions1"
          v-model="distribution.day"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>

        <el-time-select
          style="width:50%"
          is-range
          v-model="distribution.times"
          :picker-options="time"
          placeholder="选择时间"
        ></el-time-select>

        <div class="footer" style="margin-top:100px">
          <span type="primary" @click="delivery=false">确 定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
export default {
  data: function() {
    return {
      distribution: {
        day: "",
        times: ""
      },

      pickerOptions1: {
        disabledDate(time) {
          const curDate = new Date().getTime();
          const day = 2 * 24 * 3600 * 1000;
          const dateRegion = curDate + day;
          return (
            time.getTime() < Date.now() - 8.64e7 || time.getTime() > dateRegion
          );
        }
      },

      time: {
        start: "08:30",
        step: "01:00",
        end: "17:30"
      },

      delivery: false,
      cartData: [],
      Objparma: {
        status: "1",
        money: null, //已经完成
        userName: null, //已完成
        leaveMsg: "", //已完成
        extend: {
          //配送时间
          distribution: {} //配送地址
        },
        commodityList: [
          //已完成
          {
            byCount: "2",
            freight: "5",
            price: "100",
            name: "西瓜",
            P1: "1"
          },
          {
            byCount: "1",
            freight: "5",
            price: "100",
            name: "菠萝",
            P1: "2"
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
    JumpDetail() {
      if (this.title.phone && this.title.phone && this.title.area) {
        this.Objparma.commodityList = this.cartData.map(item => {
          let { byCount, freight, price, name, P1 } = item;
          return { byCount, freight, price, name, P1 };
        });

        this.Objparma.money = this.cartTotal;

        this.Objparma.postAddress.address = this.title.area;
        this.Objparma.postAddress.phone = this.title.phone;
        this.Objparma.postAddress.name = this.title.name;
        this.Objparma.userName = localStorage.loginnickName;

        this.Objparma.extend.distribution = this.distribution;
        console.log("this.Objparma", this.Objparma);
        this.getAddorder();
        this.$router.push({ path: "/memberOrder" });
      } else {
        this.$message.error("请选择收货人，收货地址");
      }
    },
    Jumpaddress() {
      this.$router.push({ path: "/memberAddress" });
    },
    getAddorder() {
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
          console.log("response.data", response.data);
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },

  computed: {
    cartTotal() {
      //计算合计总数
      let stock = 0; //初始值设置为0
      this.cartData.forEach(item => {
        stock += item.price * item.byCount; //
      });
      return stock.toFixed(2);
    },
    title() {
      return this.$store.state.confirmOrderAddress;
    },
    confirmOrder() {
      return this.$store.state.confirmOrder;
    }
  },
  created() {
    this.cartData = this.confirmOrder;
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



<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
.delivery-mode::before {
  content: ">";
  float: right;
  font-size: 20px;
  margin-top: 8px;
  margin-left: 9px;
}
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
    background-color: red;
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
    background: red;
    color: white;
    margin-left: 2.5%;
    border-color: red;
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
.address:before {
  content: ">";
  float: right;
  margin-top: 13px;
  margin-left: 10px;
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
  border: 1px solid red;
  line-height: 50px;
  background-color: red;
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
</style>