<template>
  <div class="order-main">
    <div>
      <!------------------------ 订单完成情况开始 ---------------------------->
      <div class="order-status-main">
        <!-- 订单交易失败开始 -->
        <div>
          <img
            src="https://img.yzcdn.cn/public_files/2018/08/31/85f176382a5babc1eeed69ab34eac3ab.png"
          >
          <h3>v-if="row.status==1"等待买家付款</h3>
          <p>亲，您的订单超时未付款，订单自动关闭</p>
        </div>
      </div>
      <!------------------------ 订单完成情况结束 ---------------------------->

      <!------------------------ 交易流程开始 ---------------------------->

      <!-- 订单交易失败开始 -->
      <div class="order-flow order-color">
        <el-steps :active="1" align-center>
          <el-step title="买家未付款v-if=row.status==1"></el-step>
          <el-step title="交易失败"></el-step>
        </el-steps>
      </div>

      <!------------------------ 交易流程结束 ---------------------------->
      <!------------------------ 收货人信息开始 ---------------------------->
      <div class="order-shipping-address">
        <div class="order-cap-logistics">
          <div class="order-address-content">
            <div>
              <p class="order-address-name">收货人：{{row.postAddress.name}}</p>
              <p class="order-address-tel">{{row.postAddress.phone}}</p>
            </div>
            <p class="order-address-detail">收货地址：{{row.postAddress.address}}</p>
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
              v-for="order in row.commodityList"
              :key="order.id"
            >
              <!-- 订单列表中的头部订单编号 -->
              <div class="order-cap-order-item__head">{{row._id}}</div>
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
                    <div class="order-card__desc order-ellipsis">{{row.leaveMsg}}</div>
                    <div></div>

                    <div class="order-card__bottom">
                      <div class="order-card__price" style="color:red">￥{{order.price}}</div>
                      <div class="order-card__num">X{{order.byCount}}</div>
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
            <p class="order-cap-express-way__fee">{{row.freigh}}</p>
            <p class="order-cap-express-way__type">快递发货</p>
          </div>
        </div>
      </div>

      <div class="order-buyer-message order-cell">
        <div class="order-cell__title">
          <span>买家留言</span>
        </div>
        <div class="order-cell__value">
          <span>{{row.leaveMsg}}</span>
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
              <p class="order-goods-pay__cell-value">{{newtotalfreight}}</p>
            </div>
          </div>
        </div>
        <!-- 合计-->
        <div class="order-goods-pay__real-price order-cell">
          <div class="order-cell__value order-cell__value--alone">
            <div class="order-goods-pay__real-price__paid">
              合计
              <span>¥ {{newtotalMoney}}</span>
            </div>
          </div>
        </div>

        <!---->
      </div>
      <!------------------------ 金额及联系方式结束 ---------------------------->

      <!------------------------ 订单列表有赞版权页脚开始 ---------------------------->
      <el-col :span="24">
        <div class="order-grid-content">
          <div class="order-footer">
            <div class="order-footer__links">
              <a href="javascript:;" class="order-hairline">店铺主页</a>
              <a href="javascript:;" class="order-hairline">个人中心</a>
              <a href="javascript:;" class="order-hairline">关注我们</a>
              <a href="javascript:;" class="order-hairline">线下门店</a>
              <a href="javascript:;" class="order-hairline">店铺信息</a>
              <!---->
            </div>
            <div class="order-footer__copyright">
              <a href="javascript:;" class>有赞提供技术支持</a>
            </div>
          </div>
        </div>
      </el-col>
      <!------------------------ 订单列表有赞版权页脚结束 ---------------------------->

      <!------------------------  底部固定栏开始 ---------------------------->
      <div class="order-submit-bar">
        <div class="order-submit-bar__bar">
          <div class="order-submit-bar__content">
            <router-link to="/memberOrderpay" icon="el-icon-notebook-2">
              <el-button
                type="danger"
                plain
                @click="getlist(shop)"
                size="medium"
                style="float:right"
              >去支付</el-button>
              <div class="order-goods-pay__real-price__paid">
                合计
                <span>¥ {{newtotalMoney}}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!------------------------  底部固定栏结束 ---------------------------->
    </div>
  </div>
</template>
  
  
  <script>
export default {
  data() {
    return {
      allCount: null, //总记录数
      shops: {},
      page: {},
      totalMoney: 0, //总价格
      totalCount: 0, //总共条数
      newtotalfreight: 0, //运费
      newtotalMoney: 0, //运费加总金额
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
    row() {
      console.log("列表信息", this.$store.state.newdetail);
      // let aaa = JSON.stringify(this.$store.state.newdetail);
      // alert(aaa);
      return this.$store.state.newdetail;
    }
  },
  mounted() {
    this.shopid = this.row._id;
    for (let index = 0; index < this.row.commodityList.length; index++) {
      this.totalMoney +=
        this.row.commodityList[index].price *
        this.row.commodityList[index].byCount;
      this.newtotalfreight += parseInt(this.row.commodityList[index].freight);
    }
    this.newtotalMoney = this.totalMoney + this.newtotalfreight;

    this.totalCount += this.row.commodityList.length;
  },

  methods: {
    // 复制订单编号
    copy() {
      // data 获取的数据
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