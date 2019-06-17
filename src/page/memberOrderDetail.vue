<template>
  <div class="order-main">
    <div>
      <!------------------------ 订单完成情况开始 ---------------------------->
      <div class="order-status-main">
        <!-- 订单交易失败开始 -->
        <div v-if="Order.status==1">
          <img
            src="https://img.yzcdn.cn/public_files/2018/08/31/85f176382a5babc1eeed69ab34eac3ab.png"
          >
          <h3>等待买家付款</h3>
          <p>亲，您的订单超时未付款，订单自动关闭</p>
        </div>
        <!-- 等待买家付款 -->
        <div v-else-if="Order.status==2">
          <img
            src="https://img.yzcdn.cn/public_files/2018/08/31/6eb5418154ef15f9454b0500c800cfcb.png"
          >
          <h3>买家已付款</h3>
          <p>亲，您的订单已成功付款</p>
        </div>
        <!-- 订单交易成功开始 -->
        <div v-else-if="Order.status==3">
          <img
            src="https://img.yzcdn.cn/public_files/2018/08/30/345a61fbbf62d65a3a8c528272426666.png"
          >
          <h3>商家已发货</h3>
          <p>亲，商家已发货，请你耐心等待宝贝的到来！</p>
        </div>

        <!-- 订单交易成功开始 -->
        <div v-else-if="Order.status==4">
          <img
            src="https://img.yzcdn.cn/public_files/2018/08/30/345a61fbbf62d65a3a8c528272426666.png"
          >
          <h3>交易成功</h3>
          <p>亲，您的订单已完成</p>
        </div>

        <!-- 订单取消 -->
        <div v-else>
          <img src="https://img.yzcdn.cn/v2/image/wap/trade/result/order_status/icon_topay2@2x.png">
          <h3>订单取消</h3>
          <p>亲，订单已被取消，需要重新下单</p>
        </div>
      </div>
      <!------------------------ 订单完成情况结束 ---------------------------->

      <!------------------------ 交易流程开始 ---------------------------->

      <!-- 订单交易状态开始 -->
      <div class="order-flow order-color">
        <el-steps align-center :active="3">
          <el-step title="订单取消" :status="activesuccess"></el-step>
          <el-step title="订单取消"></el-step>
          <el-step title="订单取消"></el-step>
          <el-step title="订单取消"></el-step>
          <!-- <el-step title="订单取消" :status="activesuccess"></el-step>
          <el-step title="买家未付款" :status="activesuccess"></el-step>
          <el-step title="买家已付款" :status="activesuccess"></el-step>
          <el-step title="商家已发货" :status="activesuccess"></el-step>
          <el-step title="交易完成" :status="activesuccess"></el-step>-->
        </el-steps>
      </div>

      <!------------------------ 交易流程结束 ---------------------------->

      <!------------------------ 收货人信息开始 ---------------------------->
      <div class="order-shipping-address">
        <div class="order-cap-logistics">
          <div class="order-address-content">
            <div>
              <p class="order-address-name">收货人：{{Order.postAddress.name}}</p>
              <p class="order-address-tel">收货人电话:{{Order.postAddress.phone}}</p>
            </div>
            <p class="order-address-detail">收货地址：{{Order.postAddress.address}}</p>
          </div>
        </div>
      </div>
      <!------------------------ 收货人信息结束 ---------------------------->

      <!------------------------ 商品列表开始 ---------------------------->

      <div class="order-list-item">
        <!-- 订单头部店铺名称，交易情况 -->
        <div class="order-list-item__header" type="list-item-header">店铺：码帮科技</div>
        <!-- 订单列表 -->
        <div class="order-list-item__order-list" type="order-list">
          <div class="order-cap-order-item">
            <!-- 订单列表中的内容 -->
            <div
              class="order-cap-order-item__body"
              v-for="commodity in Order.commodityList"
              :key="commodity.id"
            >
              <!-- 订单列表中的头部订单编号 -->
              <div class="order-cap-order-item__head">{{Order._id}}</div>
              <div class="order-card">
                <div class="order-card__header">
                  <a class="order-card__thumb">
                    <img :src="commodity.freight" class="order-card__img">
                  </a>
                  <div class="order-card__content">
                    <div class="order-card__title">{{commodity.name}}</div>
                    <div class="order-card__desc order-ellipsis">{{Order.leaveMsg}}</div>
                    <div></div>

                    <div class="order-card__bottom">
                      <div class="order-card__price" style="color:red">￥{{commodity.price}}</div>
                      <div class="order-card__num">X{{commodity.byCount}}</div>
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
            <p class="order-cap-express-way__fee">{{Order.freigh}}</p>
            <p class="order-cap-express-way__type">快递发货</p>
          </div>
        </div>
      </div>

      <div class="order-buyer-message order-cell">
        <div class="order-cell__title">
          <span>买家留言</span>
        </div>
        <div class="order-cell__value">
          <span>{{Order.leaveMsg}}</span>
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
              <p class="order-goods-pay__cell-value">{{totalMoney}}</p>
            </div>
            <div class="order-goods-pay__cell">
              <p class="order-goods-pay__cell-title">运费</p>
              <p class="order-goods-pay__cell-value">{{totalFreight}}</p>
            </div>
          </div>
        </div>
        <!-- 实付款-->
        <div class="order-goods-pay__real-price order-cell">
          <div class="order-cell__value order-cell__value--alone">
            <div class="order-goods-pay__real-price__paid">
              实付款：
              <span>¥ {{totalAllMoney}}</span>
            </div>
          </div>
        </div>
      </div>

      <!------------------------ 金额及联系方式结束 ---------------------------->

      <!------------------------ 订单时间开始 ---------------------------->
      <space height="10"></space>
      <div class="order-cell">
        <div class="order-cell__title">
          <p>
            订单编号：
            <span>{{Order._id}}</span>
            <el-button plain size="mini">
              <input
                type="button"
                v-on:click="copy()"
                value="点击复制订单号"
                style="border: 0;background-color: transparent;outline: none;"
              >
            </el-button>
          </p>

          <p>
            创建时间：
            <span>{{Order.CreateTime | formatDate}}</span>
          </p>

          <p>
            付款时间：
            <span>{{Order.UpdateTime | formatDate}}</span>
          </p>

          <p>
            发货时间：
            <span>{{Order.UpdateTime | formatDate}}</span>
          </p>

          <p>
            完成时间：
            <span>{{Order.UpdateTime | formatDate}}</span>
          </p>

          <a href="javascript:;" class="order-base-info__question">对此订单有疑问？</a>

          <!-- <div>{{Order.commodityList.freight}}</div> -->
        </div>
      </div>

      <!------------------------ 订单时间结束 ---------------------------->
    </div>
    <!------------------------ 订单列表有赞版权页脚开始 ---------------------------->
    <el-col :span="24">
      <div class="order-footer">
        <div class="order-footer__links">
          <a href="javascript:;" class="order-hairline">店铺主页</a>
          <a href="javascript:;" class="order-hairline">个人中心</a>
          <a href="javascript:;" class="order-hairline">关注我们</a>
          <a href="javascript:;" class="order-hairline">线下门店</a>
          <a href="javascript:;" class="order-hairline">店铺信息</a>
          <!---->
        </div>
      </div>
    </el-col>
    <!------------------------ 订单列表有赞版权页脚结束 ---------------------------->
  </div>
</template>
  
  
<script>
export default {
  data() {
    return {
      activesuccess: "success", //流程成功样式
      activepay: 2, //订单流程状态
      Order: {
        postAddress: {}
      },
      totalCount: 0, //总共条数
      imgId: [],
      totalMoney: 0,
      totalAllMoney: 0,
      totalFreight: 0
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
  methods: {
    //请求订单数据
    requestorder() {
      axios({
        //请求接口
        method: "post",
        // url: this.objURL.list,
        url: "http://120.76.160.41:3000/crossList?page=mabang-order",
        data: {
          findJson: {
            P1: this.$route.query.P1
          }
        } //传递参数
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list } = response.data; //解构赋值
          this.Order = list[0];

          this.Order.commodityList.forEach(commodityListEach => {
            //商品总金额
            this.totalMoney +=
              commodityListEach.price * commodityListEach.byCount;
            //总运费
            this.totalFreight += commodityListEach.freight;
            //需要的商品图片ID
            this.imgId.push(commodityListEach.P1);
          });
          //商品总金额+总运费
          this.totalAllMoney = this.totalMoney + this.totalFreight;
          if (this.totalFreight == 0) {
            this.totalFreight = "免运费";
          }
          //调用商品列表接口查询对应的商品图片
          this.queryimg();
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    queryimg() {
      axios({
        //请求接口
        method: "post",
        // url: this.objURL.list,
        url: "http://120.76.160.41:3000/crossList?page=mabang-commodity",
        data: {
          findJson: {
            P1: this.imgId
          }
        } //传递参数
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值

          var i = 0;

          this.Order.commodityList.forEach(commodityListEach => {
            for (let a = 0; a < list.length; a++) {
              if (commodityListEach.P1 == list[i].P1) {
                commodityListEach.freight = list[i].album[0].url;
              }
              i++;
            }
            i = 0;
          });
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    // 复制订单编号
    copy() {
      // data 获取的数据
      var data = this.Order._id;
      var oInput = document.createElement("input");
      oInput.value = data;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      alert("您已经复制成功");
    }
  },
  created() {
    this.queryName = localStorage.loginUserName;
    this.requestorder();
  },
  mounted() {}
};
</script>
  
  <style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
@import "../assets/css/memberorderDetail.scss"; //导入memberorderDetail订单详情样式文件
body {
  background-color: #f8f8f8;
}
</style>