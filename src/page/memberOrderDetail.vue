<template>
  <div class="order-main">
    <div v-for="shop in shops" :key="shop.P1">
      <!------------------------ 订单完成情况开始 ---------------------------->
      <div class="order-status-main">
        <!-- 订单交易成功开始 -->
        <div v-if="shop.status==0? true:false">
          <img
            src="https://img.yzcdn.cn/public_files/2018/08/30/345a61fbbf62d65a3a8c528272426666.png"
          >
          <h3>交易成功</h3>
          <p>订单完成</p>
        </div>
        <!-- 订单交易失败开始 -->
        <div v-else>
          <img
            src="https://img.yzcdn.cn/public_files/2018/08/31/85f176382a5babc1eeed69ab34eac3ab.png"
          >
          <h3>交易关闭</h3>
          <p>超时未付款，订单自动关闭</p>
        </div>
      </div>
      <!------------------------ 订单完成情况结束 ---------------------------->

      <!------------------------ 交易流程开始 ---------------------------->
      <!-- 订单交易成功开始 -->
      <div class="order-flow order-color" v-if="shop.status==0? true:false">
        <el-steps :active="2" align-center>
          <el-step title="买家已付款"></el-step>
          <el-step title="已成团"></el-step>
          <el-step title="商家已发货"></el-step>
          <el-step title="交易完成"></el-step>
        </el-steps>
      </div>

      <!-- 订单交易失败开始 -->
      <div class="order-flow order-color" v-else>
        <el-steps :active="1" align-center>
          <el-step title="买家未付款"></el-step>
          <el-step title="交易失败"></el-step>
        </el-steps>
      </div>

      <!------------------------ 交易流程结束 ---------------------------->
      <!------------------------ 收货人信息开始 ---------------------------->
      <div class="order-shipping-address">
        <div class="order-cap-logistics">
          <div class="order-address-content">
            <div>
              <p class="order-address-name">收货人：{{shop.postAddress.name}}</p>
              <p class="order-address-tel">{{shop.postAddress.phone}}</p>
            </div>
            <p class="order-address-detail">收货地址：{{shop.postAddress.address}}</p>
          </div>
        </div>
      </div>
      <!------------------------ 收货人信息结束 ---------------------------->

      <!------------------------ 商品列表开始 ---------------------------->

      <div class="order-list-item" v-for="shop in shops" :key="shop.P1">
        <!-- 订单头部店铺名称，交易情况 -->
        <div class="order-list-item__header" type="list-item-header">店铺：码帮科技</div>
        <!-- 订单列表 -->
        <div class="order-list-item__order-list" type="order-list">
          <div class="order-cap-order-item">
            <!-- 订单列表中的内容 -->
            <div
              class="order-cap-order-item__body"
              v-for="order in shop.commodityList"
              :key="order.id"
            >
              <!-- 订单列表中的头部订单编号 -->
              <div class="order-cap-order-item__head">{{shop._id}}</div>

              <div class="order-card">
                <div class="order-card__header">
                  <a class="order-card__thumb">
                    <img
                      src="https://img.yzcdn.cn/upload_files/2016/09/29/ForFFyDV_trRjCVprENBUvCuKYef.jpg!small.jpg"
                      class="order-card__img"
                    >
                  </a>
                  <div class="order-card__content">
                    <div class="order-card__title">{{order.name}}</div>
                    <div class="order-card__desc order-ellipsis">{{shop.leaveMsg}}</div>
                    <div></div>
                    <div class="order-card__bottom">
                      <div class="order-card__price">商品价格X{{order.price*order.byCount}}</div>
                      <div class="order-card__num">x 1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 订单列表中的页脚 -->
            <div class="order-cap-order-item__footer">
              <div class="order-cap-order-item__total-price">
                商品小计 ：
                <span>{{totalMoney}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!------------------------ 商品列表结束 ---------------------------->

      <!------------------------ 配送方式及留言开始 ---------------------------->
      <space height="10"></space>
      <div class="order-cell-group order-hairline--top-bottom">
        <div class="order-cell">
          <div class="order-cell__title">
            <p class="cap-express-way__title">配送方式</p>
            <!---->
          </div>
          <div class="order-cell__value">
            <p class="order-cap-express-way__fee">¥30.00</p>
            <p class="order-cap-express-way__type">快递发货</p>
          </div>
        </div>
      </div>

      <div class="order-buyer-message order-cell">
        <div class="order-cell__title">
          <span>买家留言</span>
        </div>
        <div class="order-cell__value">
          <span>{{shop.leaveMsg}}</span>
        </div>
      </div>

      <!------------------------ 配送方式及留言结束 ---------------------------->

      <!------------------------ 金额及联系方式开始 ---------------------------->
      <space height="10"></space>
      <div class="order-goods-pay">
        <div class="order-cell">
          <div class="order-cell__value order-cell__value--alone">
            <div class="order-goods-pay__cell">
              <p class="order-goods-pay__cell-title">商品金额</p>
              <p class="order-goods-pay__cell-value">¥ 239.70</p>
            </div>
            <div class="order-goods-pay__cell">
              <!-- <p class="order-goods-pay__cell-title">{{shop.}}</p> -->
              <p class="order-goods-pay__cell-value">+ ¥ 30.00</p>
            </div>
          </div>
        </div>
        <!-- 实付款-->
        <div class="order-goods-pay__real-price order-cell">
          <div class="order-cell__value order-cell__value--alone">
            <div class="order-goods-pay__real-price__paid">
              实付款：
              <span>¥ 269.70</span>
            </div>
          </div>
        </div>
        <div class="order-sale-service-action order-cell">
          <div class="order-cell__value order-cell__value--alone order-contact-main">
            <a href="javascript:;" class="order-contact-main-in">
              <span>拨打电话</span>
            </a>
            <a href="javascript:;" class="order-contact-main-in">
              <span>在线客服</span>
            </a>
          </div>
        </div>
        <!---->
      </div>

      <!------------------------ 金额及联系方式结束 ---------------------------->

      <!------------------------ 订单时间开始 ---------------------------->
      <space height="10"></space>
      <div class="order-cell">
        <div class="order-cell__title">
          <p>
            订单编号：
            <span>{{shop._id}}</span>
            <button>
              <input type="button" v-on:click="copy()" value="点击复制订单号">
            </button>
          </p>

          <p>
            创建时间：
            <span>{{shop.CreateTime | formatDate}}</span>
          </p>

          <p>
            付款时间：
            <span>{{shop.UpdateTime | formatDate}}</span>
          </p>

          <p>
            发货时间：
            <span>{{shop.UpdateTime | formatDate}}</span>
          </p>

          <p>
            完成时间：
            <span>{{shop.UpdateTime | formatDate}}</span>
          </p>

          <a href="javascript:;" class="order-base-info__question">对此订单有疑问？</a>
        </div>
      </div>

      <!------------------------ 订单时间结束 ---------------------------->
    </div>
  </div>
</template>


<script>
import { all } from "q";
export default {
  data() {
    return {
      allCount: null, //总记录数
      shops: {},
      page: {},
      totalMoney: 0,
      totalCount: 0,
      shopStatus: [],
      totalCount: 0,
      shopid: 0
    };
  },

  filters: {
    //过滤器
    //时间戳转日期
    formatDate(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    }
  },
  computed: {
    //获取列表数据
    orderlistdata() {
      console.log("列表信息", this.$store.state.obj);
      return this.$store.state.obj;
    }
  },
  mounted() {
    axios({
      //请求接口
      method: "post",
      // url: this.objURL.list,
      url: "http://120.76.160.41:3000/crossList?page=mabang-order"
      // data: this.Objparma //传递参数
    })
      .then(response => {
        console.log("第一次请求结果", response.data);
        let { list, page } = response.data; //解构赋值
        this.shops = list;
        this.page = page;
        this.allCount = page.allCount; //更改总数据量

        var shopIndex = 0;
        for (let i = 0; i < this.shops.length; i++) {
          this.shopid = this.shops[shopIndex]._id;
          for (let j = 0; j < this.shops[shopIndex].commodityList.length; j++) {
            this.totalMoney +=
              this.shops[shopIndex].commodityList[j].price *
              this.shops[shopIndex].commodityList[j].byCount;
          }
          if (this.shops[shopIndex].status == 1) {
            this.shopStatus.push(this.shops[shopIndex]);
          }
          this.totalCount += this.shops[shopIndex].commodityList.length;
          shopIndex++;
        }
      })
      .catch(function(error) {
        alert("异常:" + error);
      });
  },
  methods: {
    // 复制订单编号
    copy() {
      //data 获取的数据
      var data = this.shopid;
      var oInput = document.createElement("input");
      oInput.value = data;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      alert("您已经复制成功");
    }
  }
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
@import "../assets/css/memberorderDetail.scss"; //导入memberorderDetail订单详情样式文件
body {
  background-color: #f8f8f8;
}
</style>