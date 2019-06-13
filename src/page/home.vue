<template>
  <div class="bigg">
    <div class="box-topbox">码帮商城</div>
    <div class="box-top">
      <img
        class="box-top-img"
        src="https://img.yzcdn.cn/upload_files/2015/01/27/Fo3CxW5S_IEZic2v6vt7qPXIM5Op.jpg"
      >
    </div>
    <div class="block">
      <router-link to="/commodityDetail">
        <el-carousel trigger="click" height="135px">
          <el-carousel-item v-for="item in 3" :key="item"></el-carousel-item>
        </el-carousel>
      </router-link>
      <!-- <div class="box-span">
        <div v-for="imgg in imgg" :key="imgg.id">
          <img class="box-img" :src="imgg.immg">
        </div>
      </div>-->
    </div>
    <div class="block">
      <div style="background: #F2F2F2;">
        <template v-for="(buyEach,index) in buy">
          <div class="box-1" :key="index" v-if="index<6">
            <div class="img-box" @click="$store.commit('changeActiveProduce',buyEach)">
              <router-link to="/commodityDetail">
                <img
                  class="box-commodity"
                  v-if="buyEach.album&&buyEach.album.length"
                  :src="buyEach.album[0].url"
                >
              </router-link>
            </div>
            <div class="box-title">{{buyEach.description}}</div>
            <div class="box-3" style="width:135px">￥{{buyEach.price}}</div>
            <div class="el-icon-shopping-cart-2 box-4" @click="purchase(buyEach)"></div>
          </div>
        </template>
        <router-link class="look" to="/commodityList">点击查看全部商品</router-link>
      </div>
    </div>

    <portal></portal>
    <cartComponent v-if="isCartCom"></cartComponent>
  </div>
</template>

<script>
import portal from "../components/shift/portal";
import cartComponent from "../components/cart/cartComponent.vue";
export default {
  components: { portal, cartComponent },
  data() {
    return {
      buy: [],
      imgg: [
        {
          id: 1,
          immg:
            "https://img.yzcdn.cn/upload_files/2018/12/11/Fo51aFZ4pSeEGVkZ6uoXMXewFP2d.png!large.png"
        },
        {
          id: 2,
          immg:
            "https://img.yzcdn.cn/upload_files/2018/12/11/Fqe-IT3cEUzlU2SLEHk8hrD2xeZh.jpg!large.jpg"
        },
        {
          id: 3,
          immg:
            "https://img.yzcdn.cn/upload_files/2018/12/11/FnYUeM-rivgd5ez0-8MztbWa1Fkd.png!large.png"
        },
        {
          id: 4,
          immg:
            "https://img.yzcdn.cn/upload_files/2018/12/11/FgShrYWHlidwyskLFY3XFpDnlCA-.png!large.png"
        }
      ]
    };
  },
  methods: {
    purchase(buyEach) {
      this.$store.commit("isCartComOpen");
      this.$store.commit("changeActiveProduce", buyEach);
    },
    getProList() {
      axios({
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=mabang-commodity",
        data: {
          pageSize: 6,
          sortJson: { P1: -1 } //按id降序排序
        } //传递参数
      })
        .then(response => {
          let { list } = response.data; //解构赋值
          this.buy = list;
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },
  computed: {
    activeMenuIndex() {
      return this.$store.state.user;
    },
 
  },
  mounted() {
    //mounted：等待模板加载后，
    this.getProList(); //第一次加载此函数，页面才不会空
  },
  computed: {
    // activeProduceId() {
    //   //此处返回vuex的值到外部
    //   return this.$store.state.activeProduceId;
    // }
    isCartCom() {
      return this.$store.state.isCartCom;
    }
  }
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
.bigg {
  background: #f8f8f8;
  height: 1175px;
  width: 100%;
  padding: 0 auto;
}
//商品列表+
.box-topbox {
  margin: 0 auto;
  width: 380px;
  height: 90px;
  text-align: center;
  line-height: 90px;
  font-weight: bold;
  font-size: 40px;
  background-color: #ffffff;
  color: #64d9f6;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1560425120&di=627560e18211e7caad5d3bde52b51781&src=http://img.nongji360.com/n/image/2015/08/11/151247223025.jpg");
  background-size: 380px 200px;
  background-repeat: no-repeat;
  background-position-y: -10px;
}
.box-top {
  margin: 0 auto;
  width: 380px;
  height: 50px;
  background-image: url("https://img.yzcdn.cn/upload_files/2019/03/12/Fr_dJSTVvjVpQTRGt-pA-6ZsK1p7.jpg!large.jpg");
  background-size: 380px 200px;
  background-repeat: no-repeat;
  background-position-y: -10px;
  position: relative;
}
.box-top-img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
}
.box-1 {
  height: 265px;
  width: 175px;
  background: #ffffff;
  margin: 5px 7px;
  float: left;
}
.img-box {
  width: 167.5px;
  height: 175.5px;
}
.box-commodity {
  width: 167.5px;
  height: 167.5px;
  background-size: 167.5px 167.5px;
  background-repeat: no-repeat;
  margin: 0 4px;
}
.box-title {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box-3 {
  color: #ff5e5c;
  font-size: 20px;
  float: left;
  margin: 20px 0;
}
.box-4 {
  color: #ff5e5c;
  font-size: 25px;
  float: left;
  margin: 20px 0;
  width: 40px;
  height: 40px;
}
.block {
  width: 380px;
  margin: 0 auto;
  background: #f8f8f8;
}
.box-span {
  width: 380px;
  height: 105px;
  background-color: #ffffff;
}
.box-img {
  width: 25%;
  height: 105px;
  float: left;
}
//商品列表-
//轮播图+
.el-carousel__item {
  background-repeat: no-repeat;
  background-size: 380px 135px;
}
.el-carousel__item:nth-child(3) {
  background-image: url("https://img.yzcdn.cn/upload_files/2018/12/11/Ft8u0o9RPHyxDwahv19iH8ixFWXM.jpg!large.jpg");
}
.el-carousel__item:nth-child(5) {
  background-image: url("https://img.yzcdn.cn/upload_files/2018/12/11/FvAWQmPIRX4Qr6baCOfvf1rTOHBj.jpg!large.jpg");
}
.el-carousel__item:nth-child(4) {
  background-image: url("https://img.yzcdn.cn/upload_files/2018/12/11/FsfFgmOHGm6WZsnloJo22RImEJ6p.jpg!large.jpg");
}
//轮播图-
//底部查看+
.look {
  display: block;
  width: 380px;
  height: 50px;
  background-color: #ffffff;
  clear: both;
  text-align: center;
  line-height: 50px;
  text-decoration: underline;
}
//底部查看-
</style>