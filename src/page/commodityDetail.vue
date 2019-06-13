<template>
  <div class="main">
    <el-container>
      <el-header class="detail-head">
        <div
          style="float:left; margin-left:8%;width:170px;border-width: 0 1px 0 0; border-style: solid;border-color: gray;"
        >
          <div style="float:left;color:white;font-size:18px;">
            <el-popover placement="top" width="700" v-model="isShowShop" trigger="hover">
              <div class="WP100" style>
                <div style="float:left">
                  <img
                    src="https://h5.youzan.com/v2/common/url/create?type=homepage&kdt_id=859457"
                    width="100%"
                  >
                </div>
                <div>
                  <div style="font-size:20px;padding-top:50px;" class="FWB">米柚生活(微信认证)</div>
                  <div style="font-size:20px;margin-top:30px;" class="FWB">微信扫描二维码,访问我们的微信店铺</div>
                  <div style="margin-top:30px;">你可以使用 微信联系我们，随时随地的购物、客服咨询、查询订单和物流</div>
                </div>
              </div>
              <div slot="reference">米柚生活</div>
            </el-popover>
          </div>
          <div style="float:left;color:white;margin-left:10px;">
            <router-link to="/home" style="color:white;">微店铺首页</router-link>
          </div>
        </div>
        <div style="float:left;margin-left:10px;">
          <router-link to="/commodityList" style="color:white;">最新商品</router-link>
        </div>
      </el-header>
      <el-main style="margin:0px;padding:0px; background-color:rgb(242,242,242)">
        <el-row>
          <el-col :xs="0" :sm="1" :md="1" :lg="2" :xl="2">
            <div class="H100"></div>
          </el-col>
          <el-col
            :xs="24"
            :sm="17"
            :md="17"
            :lg="16"
            :xl="16"
            v-if="activeProduceId!=''"
            style="background-color:rgb(255,255,255)"
          >
            <div class style="; padding:5%">
              <div>
                <div class>
                  <el-row :gutter="10">
                    <el-col :xs="0" :sm="10" :md="12" :lg="12" :xl="12" class>
                      <img :src="activeProduceId.album[0].url" width="100%" height="100%">
                    </el-col>
                    <el-col :xs="24" :sm="14" :md="12" :lg="12" :xl="12" class>
                      <div
                        class="FWB"
                        style="font-size:16px;margin-top:30px;margin-bottom:30px; "
                      >{{activeProduceId.description}}</div>
                      <div
                        style="font-size:35px; color:rgb(255,103,2);margin-bottom:20px;"
                      >${{activeProduceId.price}}</div>
                      <div style="background-color:rgb(248,248,248);padding:5%">
                        <div style="padding-bottom:25px">
                          <div style="float:left;color:gray;font-size:13px;width:70px;">运费:</div>
                          <div style="float:left;">$30.00</div>
                        </div>
                        <div style=" clear: both;padding-bottom:25px">
                          <div style="float:left;color:gray;font-size:13px;width:70px;">净含量:</div>
                          <div style="float:left;">6个装</div>
                        </div>
                        <div style=" clear: both;padding-bottom:25px">
                          <div style="float:left;color:gray;font-size:13px;width:70px;">系列:</div>
                          <div style="float:left;">新西兰佳沛黄金奇异果</div>
                        </div>
                      </div>
                      <div style="margin-top:30px;">
                        <div style="float:left">
                          <!-- <router-link to="/confirmOrder"> -->
                            <el-button type="primary" round size="medium"  @click="purchase(activeProduceId)">
                              <!-- <div style="font-size:25px;">立即购买</div> -->立即购买
                            </el-button>
                          <!-- </router-link> -->
                        </div>
                        <el-popover
                          placement="top"
                          width="480"
                          v-model="isShowCollect"
                          trigger="click"
                        >
                          <div class="WP100">
                            <div style="float:left">
                              <div class="WP100 FWB" style="text-align:center;">收藏到微信or发给朋友</div>
                              <div style="float:left">
                                <img
                                  src="https://h5.youzan.com/v2/common/url/create?type=homepage&kdt_id=859457"
                                  width="100%"
                                >
                              </div>
                            </div>
                            <div style="float:left;padding-top:20px;">
                              1.打开微信，扫一扫左侧二维码
                              <br>2.点击右上角图表
                              <br>
                              <img src="https://b.yzcdn.cn/v2/shop/images/share_1.png">
                              <br>3.发送给朋友、分享朋友圈、收藏
                              <br>
                              <img src="https://b.yzcdn.cn/v2/shop/images/share_2.png">
                            </div>
                          </div>
                          <div
                            style="float:left; margin-top:10px;margin-left:20px;width:100px;background-color:rgb(248,248,248);
                        height:40px;line-height:40px;padding-left:20px;color:gray;cursor:pointer"
                            slot="reference"
                          >收藏/分享</div>
                        </el-popover>
                      </div>
                      <div
                        style="padding-top:10px;clear: both; height:30px; line-height:30px;paddiing-bottom:10px;"
                      >
                        <div style="float:left ">支付:</div>
                        <img src="../img/微信.png" width="30px">
                        <img src="../img/支付宝.png" width="30px">
                        <img src="../img/银行卡.png" width="30px">
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div></div>
              </div>
              <div
                class="H40"
                style="background-color:rgb(242,242,242);padding-left:3%;padding-top:10px;"
              >
                <h3>商品详情</h3>
              </div>
              <div
                style="margin-top:20px; margin-bottom:20px;font-size:17px;color:gray;line-height: 25px;"
              >
                凤梨味甘、性平，果实含有丰富的营养，果肉甜中带酸，吃起来口爽刺激芳香的气味，可以增进食欲
                ，含有一种叫“凤梨朊酶”的物质，它能分解蛋白质。 凤梨中所含糖、盐类和酶有利尿作用，适当食用对肾炎，
                高血压病患者有益，具有健胃消食、补脾止泻、清胃解渴等功用。
              </div>
              <div v-for="img in activeProduceId.album" :key="img.url" style="width:100%">
                <img :src="img.url" v-if="img.url!=activeProduceId.album[0].url" width="100%">
              </div>
              <div>
                <h3 style="color:red">【写字楼配送服务】</h3>
                <br>
                <div style="line-height: 35px;color:gray;">
                  <div style="color:red">配送时间：工作日9:00-11:30，13:30-17:00时段内配送!</div>
                  <b>配送范围:</b> &nbsp;&nbsp;深圳市南山区/蛇口写字楼片区满100元免运费
                  <br>售后服务:
                  <br>我们承诺，坏果包赔。
                  <br>关于售后，生鲜类在运输过程中，难免存在磕碰，如坏果、烂果、重量不足我们一律按照损耗数量赔偿
                  ，请在签收24小时内将“坏果+快递底单，单号必须清晰可见，二者缺一不予理赔”并反馈给客服为您处理。
                  超过24小时来找我们的，不赔偿哦!
                </div>
              </div>
              <hr>
              <div></div>
            </div>
          </el-col>
          <el-col :xs="0" :sm="5" :md="5" :lg="4" :xl="4" v-if="products!=''">
            <div class="WP100" style="padding:15%">
              <div>
                <div>
                  <el-row>
                    <el-col :xs="0" :sm="4" :md="8" :lg="8" :xl="8">
                      <img
                        src="https://img.yzcdn.cn/upload_files/2015/01/27/Fo3CxW5S_IEZic2v6vt7qPXIM5Op.jpg"
                        width="100%"
                        alt
                      >
                    </el-col>
                    <el-col :xs="24" :sm="20" :md="16" :lg="16" :xl="16">
                      <div
                        style="font-size:13px;color:gray;margin-top:6px;margin-bottom:6px;padding-left:10px;"
                      >米柚生活</div>
                      <div style="padding-left:10px;">
                        <el-popover
                          placement="top"
                          width="250"
                          v-model="isShowWechar"
                          trigger="hover"
                        >
                          <div class="WP100">
                            <div class="WP100 FWB" style="text-align:center;">扫一扫,加微信好友</div>
                            <div style="float:left">
                              <img
                                src="https://h5.youzan.com/v2/common/url/create?type=homepage&kdt_id=859457"
                                width="100%"
                              >
                            </div>
                          </div>
                          <el-button type="success" size="mini" slot="reference">加微信好友</el-button>
                        </el-popover>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div style=" clear: both ;margin-top:25px">
                  <div style="width:100%;text-align:center;color:gray ;margin-bottom:20px">热门商品</div>
                  <div v-for="product in products" :key="product.P1" style="margin-bottom:15px; ">
                    <!-- <router-link to="/commodityDetail"> -->
                    <img
                      v-if="product.album&&product.album.length"
                      :src="product.album[0].url"
                      width="100%"
                      style=" cursor:pointer"
                      @click="$store.commit('changeActiveProduce',product)"
                    >
                    <!-- </router-link> -->
                    <div style="font-size:12px;color:gary">{{product.description}}</div>
                    <div style="color:red;font-size:12px">${{product.price}}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="0" :sm="1" :md="1" :lg="2" :xl="2">
            <div class="H100"></div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <cartComponent v-if="isCartCom"></cartComponent>
  </div>
</template>

<script>
import cartComponent from "../components/cart/cartComponent.vue";
export default {
   components: {cartComponent},
  data() {
   
    return {
      products: [],
      isCartCom: false,
      isShowShop: false,
      isShowWechar: false,
      isShowCollect: false
    };
  },
  methods: {
    getProList() {
      //获取产品列表函数
      axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=mabang-commodity",
        data: {
          pageSize: 4,
          sortJson: { P1: -1 }
        }
      })
        .then(response => {
          //这有函数，不知道this指向谁
          console.log("第一次请求结果", response.data);
          let { list } = response.data; //解构赋值
          this.products = list;
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    purchase(buyEach) {

this.isCartCom = !this.isCartCom;
this.$store.commit("changeActiveProduce", buyEach);
},
  },
  mounted() {

    this.getProList();
  },
  computed: {
    activeProduceId() {
      //此处返回vuex的值到外部
      return this.$store.state.activeProduceId;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/util.scss"; //导入公共样式文件
.detail-head {
  padding-top: 20px;
  background-color: rgb(31, 41, 44);
  width: 100%;
  line-height: 20px;
}
</style>