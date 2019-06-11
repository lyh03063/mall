<template>
  <div class="main">
    <div style="background-color:white">
      <div class="delivery-btn">
        <el-button>商家配送</el-button>
      </div>
      <router-link to="./memberAddress">
        <ul :cf="title" class="address">
          <p>{{title.phone}}</p>
          <i class="iconfont icondizhi1"></i>
          <div>
            <li>收货人：{{title.name}}</li>
            <li class="FS14">收货地址：{{title.address}}</li>
          </div>
        </ul>
      </router-link>
      <div class="line"></div>
    </div>
    <space height="15"></space>
    <!--------------商品详情------------>
    <div class="BC_fff">
      <div class="FS15" style="padding:20px 2.5%">
        <i class="iconfont iconshangcheng"></i>
        <router-link to="./home">
          <P class="shoppingmall">米柚生活</P>
        </router-link>
      </div>

      <div class="details" v-for="item in commodity" :key="item.props">
        <a>
          <img :src="item.imgUrl">
        </a>
        <div class="title-details">
          <p>{{item.name}}</p>
          <p style="color:#999;font-size:12px">{{item.prop}}</p>
          <div>
            <span style="color:red">{{item.price}}</span>
            <span style="float:right">X1</span>
          </div>
        </div>
      </div>
    </div>

    <!-----------------配送方式--------------------->
    <div>
      <div class="delivery-box">
        <div style="width:50%;float:left;font-size:16px;line-height: 30px">
          <p>配送方式</p>
        </div>
        <div class="delivery-mode">
          <p>同城配送 免运费</p>
          <p>time</p>
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
          ></textarea>
        </div>
      </div>
    </div>
    <!------------------商品金额-------------------->
    <div class="total-price">
      <p>
        商品金额
        <span>￥199.60</span>
      </p>
      <p style="border-bottom:1px solid #e3e3e3">
        运费
        <span>+￥0</span>
      </p>
      <span>
        合计:
        <span style="color:red">￥199.60</span>
      </span>
    </div>
    <!-------------------提交订单----------------->
    <div class="palce-order">
      <div style="float:right">
        <span>
          合計:
          <span class="C_f00">149</span>
        </span>
        <el-button>提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: {
        phone: "182180456",
        name: "张等等",
        address: "码帮科技"
      },
      commodity: [
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2018/12/11/FuNLdcS8lECbjl-8P8TmZxLXuyGQ.jpg!small.jpg",
          name: "【自养自产土鸡蛋】30枚装44.9！纯正土鸡蛋，产地直发！",
          prop: "30枚",
          price: " ¥79.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2018/12/11/FuNLdcS8lECbjl-8P8TmZxLXuyGQ.jpg!small.jpg",
          name: "【自养自产土鸡蛋】30枚装44.9！纯正土鸡蛋，产地直发！",
          prop: "30枚",
          price: " ¥79.90"
        }
      ]
    };
  },
  methods: {
    getProList() {
      //ajax获取产品列表的函数
      let that = this;
      axios({
        method: "post",
        url: this.cf.url.list,
        data: this.objParam
      })
        .then(response => {
          console.log("response.data", response.data);
          let { list, page } = response.data; //结构赋值
          this.tableData = list;
          this.page = page;
        })
        .catch(function(error) {
          alert("异常" + error);
        });
    }
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
}
.palce-order {
  width: 100%;
  background-color: white;
  position: fixed;
  height: 50px;
  top: 93%;
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
  }
}

.address {
  padding: 10px 2.5%;
  font-size: 16px;
  li {
    padding-bottom: 5px;
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
  margin-top: 10px;
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
</style>