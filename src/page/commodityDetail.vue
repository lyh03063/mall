<template>
  <div class="main" style="margin:0px;padding:0px; background-color:rgb(242,242,242)">
    
  
        <el-row>
          <el-col :xs="0" :sm="6" :md="8" :lg="8" :xl="8">
            <div class="H100"></div>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="8"
            :xl="8"
            v-if="product!=''"
            style="background-color:rgb(255,255,255)"
          >
            <div class >
              <div style="">
                <div class>
                  <div style="padding-left:10px;border-width: 0 0 15px 0;border-style: solid; border-color: rgb(248, 248, 248);">
                  <div style="height:350px; position: relative;">
                      <img :src="product.album[0].url" width="100%" height="100%" >
                      <div class="img-logo">
                          <img src="../img/img-logo.png" width="100%" height="100%">      
                          </div>
                  </div>
                      <div
                        class="FWB"
                        style=" padding-bottom:10px;line-height:26px;"
                      >
                        <div style="font-size:16px;float:left">{{product.description}}
                        </div>
                        <div style="float:right">
                          <el-popover placement="top" width="350" v-model="isShowCollect" trigger="click" >
                          <div class="W350">
                            <div style="float:left ;border-width: 0 2px 0 0;border-style: solid; border-color: rgb(248, 248, 248);padding-top:20px; height:100% ;margin-right:10px;">
                              <div class="W100 FWB" style="text-align:center;">收藏到微信or发给朋友</div>
                              <div style="float:left; margin-top:20px;">
                                <img
                                  src="https://h5.youzan.com/v2/common/url/create?type=homepage&kdt_id=859457"
                                  width="100px"
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
                          <div class="el-icon-share"
                            style="float:left; margin-top:10px;margin-left:20px;width:100px;background-color:rgb(248,248,248);
                        height:20px;line-height:20px;padding-left:20px;color:gray;cursor:pointer"
                            slot="reference"
                          >收藏/分享</div>
                        </el-popover>
                        </div>
                      </div>
                      <div
                        style="font-size:20px; color:red;margin-bottom:5px;clear: both;margin-top:-30px;"
                      >${{product.price}}</div>
                     
                        <div style="padding-bottom:5px;">
                          <div style="float:left;color:gray;font-size:13px;width:70px;">运费:</div>
                          <div style="float:left;">免运费</div>
                        </div>
                        <div style=" clear: both;padding-bottom:5px">
                          <div style="float:left;color:gray;font-size:13px;width:70px;">净含量:</div>
                          <div style="float:left;">6个装</div>
                        </div>
                        <div style=" clear: both;padding-bottom:5px;">
                          <div style="float:left;color:gray;font-size:13px;width:70px;">系列:</div>
                          <div style="float:left;">新西兰佳沛黄金奇异果</div>
                        </div>
                        <div style="clear: both;color:gray;">支付:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="../img/微信.png" width="18px" style="margin-right:5px;">
                        <img src="../img/支付宝.png" width="18px" style="margin-right:5px;">
                        <img src="../img/银行卡.png" width="18px">
                      </div>
                        <!-- <div class="WP100 H20"></div> -->
                  </div>
                </div>
              </div>
              <div> 
                <router-link to="/home">
                <div style="border-width: 0 0 2px 0;border-style: solid;border-color: rgb(248, 248, 248);">
                  <div style="float:left;height:60px;overflow: hidden;">
                  <img src="../img/logo.jpg" width="60px;" height="70px;"/>
                  </div>
                  <div style="float:left;line-height:60px;">码帮商城</div>
                  <div style="float:right;line-height:60px;padding-right:10px;color:gray">></div>
                  <div style="clear:both"></div>
                </div>
                </router-link>
                <div style="margin-top:20px;margin-bottom:20px">
                    <div style="float:left;padding-left:10px;" class="el-icon-circle-check">个人认证</div>
                    <div style="float:left;padding-left:10px;" class="el-icon-circle-check">担保交易</div>
                    <div style="float:left;padding-left:10px;" class="el-icon-circle-check">线下门店</div>
                    <div style="clear:both"></div>
                </div>
              </div>
              <div
                class="H40"
                style="background-color:rgb(242,242,242);padding-left:3%;padding-top:10px;clear:both"
              >
                <h3>商品详情</h3>
              </div>
              <div style="padding:10px;">
              <div
                style=" margin-bottom:20px;font-size:17px;color:gray;line-height: 25px;"
              >
                凤梨味甘、性平，果实含有丰富的营养，果肉甜中带酸，吃起来口爽刺激芳香的气味，可以增进食欲
                ，含有一种叫“凤梨朊酶”的物质，它能分解蛋白质。 凤梨中所含糖、盐类和酶有利尿作用，适当食用对肾炎，
                高血压病患者有益，具有健胃消食、补脾止泻、清胃解渴等功用。
              </div>
              <div v-for="img in product.album" :key="img.url" style="width:100%">
                <img :src="img.url" v-if="img.url!=product.album[0].url" width="100%">
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
            </div>
          </el-col>
          <el-col :xs="0" :sm="6" :md="8" :lg="8" :xl="8">
            <div class="" style=""></div>
          </el-col>
        </el-row>
        <div class="buyProduct ">
               
              <div style="float:left;width:13%;height:60px;border-width: 0 2px 0px 0;border-style: solid;border-color: rgb(248, 248, 248);">
                <div class="el-icon-chat-dot-round" style="height:30px;line-height:30px;color:red;font-size:23px;cursor:pointer;padding-left:43%;"></div>
                <div style="height:30px;line-height:20px;text-align:center">客服</div>
              </div>
              <div style="float:left;width:13%;height:60px;">
                <router-link to="/cart">
                <div class="WP100 HP100" style="">
                  <div class="el-icon-shopping-cart-1" style="height:30px;line-height:30px;color:gray;font-size:23px;cursor:pointer;padding-left:40%;"></div>
                  <div style="height:30px;line-height:20px;color:gray;text-align:center">购物车</div>
                </div>
                </router-link>
              </div>
              <div @click="purchase(product)" style="float:left;width:37%;height:60px;background-color: rgb(255, 136, 85);color:white;text-align:center;line-height:60px;font-size:20px;">
                加入购物车
              </div>
              <div @click="purchase(product)" style="float:left;width:37%;height:60px;background-color: rgb(255, 68, 68);color:white;text-align:center;line-height:60px;font-size:20px;">
                立即购买
              </div>
              </div>

    
    <cartComponent v-if="isCartCom"></cartComponent>
  </div>
</template>

<script>
import cartComponent from "../components/cart/cartComponent.vue";
export default {
   components: {cartComponent},
  data() {
    return {
      product:[],
      // isCartCom: false,
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
            findJson: {
                 P1: this.$route.query.id,
           }
        },
      })
        .then(response => {
          //这有函数，不知道this指向谁
          console.log("第一次请求结果", response.data);
          
          let { list } = response.data; //解构赋值

          this.product = list[0];
          // console.log("第四次请求结果", this.product);
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    purchase(buyEach) {
this.$store.commit("isCartComOpen");

this.$store.commit("changeActiveProduce", buyEach);
},
  },
  mounted() {
    this.getProList();
    // this.getProLists()
  },
  computed: {
    activeProduceId() {
      //此处返回vuex的值到外部
      return this.$store.state.activeProduceId;
    },isCartCom() {
      //此处返回vuex的值到外部
      return this.$store.state.isCartCom;
    }
    ,
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
.buyProduct{
  background-color: rgb(255, 255, 255);
  position: fixed;
  bottom:0px;
  height: 60px;
  width: 100%;
}
.img-logo{
width:15%;
height:15%;
position:absolute;
top:4%;
left:7%;
}
</style>