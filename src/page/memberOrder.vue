<template>
  <div class="order-main">
    <el-row>
      <!------------------------ 订单列表头部开始 ---------------------------->
      <el-col :span="24">
        <div class="order-grid-content order-bg-purple-wihte">
          <!-- 列表头部切换开始 -->
          <div class="order-tab">
            <el-tabs :tab-position="tabPosition">
              <!-- 已下单 -->
              <el-tab-pane label="已下单">
                <div class="order-list-item" v-for="shop in shopStatus1" :key="shop.P1">
                  <!-- 订单头部店铺名称，交易情况 -->
                  <div class="order-list-item__header" type="list-item-header">
                    店铺：米柚生活
                    <!-- <span class="order-list-item__header__state">交易关闭</span> -->
                  </div>
                  <!-- 订单列表 -->
                  <div class="order-list-item__order-list" type="order-list">
                    <div class="order-cap-order-item">
                      <!-- 订单列表中的头部订单编号 -->
                      <div class="order-cap-order-item__head">{{shop._id}}</div>
                      <!-- 订单列表中的内容 -->
                      <div
                        class="order-cap-order-item__body"
                        v-for="order in shop.commodityList"
                        :key="order.id"
                      >
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

                              <!-- v-if="list.status==1? true:false" -->
                              <div class="order-card__bottom">
                                <div class="order-card__price" style="color:red">￥{{order.price}}</div>
                                <div class="order-card__num">X{{order.byCount}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 订单列表中的页脚 -->
                    </div>
                  </div>


                   <div
                  class="order-cap-order-item__more"
                  v-if="shop.commodityList.length>=1? true:false"
                >查看全部{{shop.commodityList.length}}件商品</div>


                  <!-- 订单页脚 -->
                  <div class="order-list-item__footer order-hairline--top" type="list-item-footer">
                    <div class="order-cap-order-item__footer">
                      <div class="order-cap-order-item__total-price">
                        合计 ：
                        <span style="color:red">{{getTotalMoney(shop.commodityList)}}</span>
                      </div>
                    </div>
                    <router-link to="/memberOrderDetail" icon="el-icon-notebook-2">
                      <el-button type="primary" @click="getlist(shop)">查看订单详情</el-button>
                    </router-link>
                  </div>
                </div>
                <!-------------------查看全部商品数量----------------------------->
               
              </el-tab-pane>

              <!-- 已付款 -->
              <el-tab-pane label="已付款">
                <div class="order-list-item" v-for="shop in shopStatus2" :key="shop.P1">
                  <!-- 订单头部店铺名称，交易情况 -->
                  <div class="order-list-item__header" type="list-item-header">
                    店铺：米柚生活
                    <!-- <span class="order-list-item__header__state">交易关闭</span> -->
                  </div>
                  <!-- 订单列表 -->
                  <div class="order-list-item__order-list" type="order-list">
                    <div class="order-cap-order-item">
                      <!-- 订单列表中的头部订单编号 -->
                      <div class="order-cap-order-item__head">{{shop._id}}</div>
                      <!-- 订单列表中的内容 -->
                      <div
                        class="order-cap-order-item__body"
                        v-for="order in shop.commodityList"
                        :key="order.id"
                      >
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
                              <div class="order-card__bottom">
                                <div class="order-card__price" style="color:red">￥{{order.price}}</div>
                                <div class="order-card__num">X{{order.byCount}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- 订单列表中的页脚 -->
                    </div>
                  </div>
                  <!-- 订单页脚 -->
                  <div class="order-list-item__footer order-hairline--top" type="list-item-footer">
                    <div class="order-cap-order-item__footer">
                      <div class="order-cap-order-item__total-price">
                        合计 ：
                        <span style="color:red">{{totalMoney}}</span>
                      </div>
                    </div>
                    <el-button type="primary">再来一单</el-button>
                  </div>
                </div>
                <!-------------------查看全部商品数量----------------------------->
                <div class="order-cap-order-item__more">查看全部{{allCount}}件商品</div>
              </el-tab-pane>

              <!-- 已发货 -->
              <el-tab-pane label="已发货">
                已发货
                <div class="order-no-more-tip">( ⊙ o ⊙ ) 啊哦，没有更多订单啦</div>
              </el-tab-pane>

              <!-- 已完成 -->
              <el-tab-pane label="已完成">
                已完成
                <div class="order-no-more-tip">( ⊙ o ⊙ ) 啊哦，没有更多订单啦</div>
              </el-tab-pane>

              <!-- 已取消 -->
              <el-tab-pane label="已取消">
                已取消
                <div class="order-no-more-tip">( ⊙ o ⊙ ) 啊哦，没有更多订单啦</div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <!-- 列表头部切换结束 -->
        </div>
      </el-col>
      <!------------------------ 订单列表头部结束 ---------------------------->

      <space height="10"></space>

      <!------------------------ 订单列表页脚开始 ---------------------------->
      <el-col :span="24">
        <div class="order-grid-content order-bg-purple-wihte">
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
      <!------------------------ 订单列表页脚结束 ---------------------------->
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tabPosition: "top",
      allCount: null, //总记录数
      shops: {},
      page: {},
      totalMoney: 0,
      totalCount: 0,
      orderlistdata: [], //指向vuex的对应的字段
      shopStatus1: [],
      shopStatus2: [],
      shopStatus3: [],
      shopStatus4: []
    };
  },
  methods: {
    getTotalMoney(commodityList) {
      let money = 0;
      commodityList.forEach(commodityEach => {
        //循环：{商品数组}
        money += commodityEach.byCount * commodityEach.price;
      });
      return money;
    },
    getlist(data) {
      //将列表信息传递到列表详情页面
      this.$store.commit("orderlistdetail", data);
      // let aaa = JSON.stringify(data);
      // alert(aaa);
    }
  },
  beforeCreate() {},
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
        this.orderlistdata = response.data;

        this.shopStatus1 = this.shops.filter(shopEach => shopEach.status == 1);
        this.shopStatus2 = this.shops.filter(shopEach => shopEach.status == 2);

        // var shopIndex = 0;
        // // 计算总价格
        // for (let i = 0; i < this.shops.length; i++) {
        //   for (let j = 0; j < this.shops[shopIndex].commodityList.length; j++) {
        //     this.totalMoney +=
        //       this.shops[shopIndex].commodityList[j].price *
        //       this.shops[shopIndex].commodityList[j].byCount;
        //   }
        //   // if (this.shops[shopIndex].status == 1) {
        //   //   this.shopStatus1.push(this.shops[shopIndex]);
        //   //   console.log("订单状态为1已下单未付款");
        //   // }

        //   this.totalCount += this.shops[shopIndex].commodityList.length;
        //   shopIndex++;
        // }
      })
      .catch(function(error) {
        alert("异常:" + error);
      });
  }
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
@import "../assets/css/memberOrder.scss"; //导入memberOrder订单列表样式文件
</style>