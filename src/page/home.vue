
<template>

  <div class="main" style="background:#f8f8f8;height:1175px;">
    <div>顶部窗口</div>
    <div class="block">
      <el-carousel trigger="click" height="135px">
        <el-carousel-item v-for="item in 3" :key="item"></el-carousel-item>
      </el-carousel>
      <div class="box-span">
      <div  v-for="imgg in imgg" :key="imgg.id">
        <img class="box-img" :src="imgg.immg">
      </div>
      </div>
    </div>
    <div class="block">
      <div style="background: #F2F2F2;">
        <div class="box-1" v-for="buy in buy" :key="buy.id">
          <img class="box-commodity" :src="buy.picture">
          <div class="box-title">{{buy.title}}</div>
          <div class="box-3" style="width:135px">￥{{buy.price}}</div>
          <div class="el-icon-shopping-cart-2 box-4"></div>
        </div>
        <router-link class="look"  to="/commodityList"   >点击查看全部商品</router-link>
      </div>
    </div>
    <portal></portal>
  </div>
</template>

<script>
import portal from "../components/space/portal";
export default {
  components: { portal },
  data() {
    return {
      buy: [
        {
          id: 1,
          title: "佳沛金奇异果，6个装，水润香甜，唤醒全身活力！",
          price: "79.9",
          picture:
            "https://img.yzcdn.cn/upload_files/2016/09/29/ForFFyDV_trRjCVprENBUvCuKYef.jpg!middle.jpg"
        },
        {
          id: 2,
          title: "菲律宾进口凤梨，1个仅售29.9，果肉金黄，鲜甜可口，清香怡人。",
          price: "29.9",
          picture:
            "https://img.yzcdn.cn/upload_files/2016/10/20/Fm3ROD48mjecPyXbug1NmKLbtUk9.jpg!middle.jpg"
        },
        {
          id: 3,
          title:
            "【商务大切盘，6-8人份！】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享精彩！",
          price: "69",
          picture:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg!middle.jpg"
        },
        {
          id: 4,
          title:
            "【商务中号切盘，4-6人份！】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享机会！",
          price: "49",
          picture:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg!middle.jpg"
        },
        {
          id: 5,
          title: "坚果大礼包！亲民价格享尊贵礼盒！",
          price: "99",
          picture:
            "https://img.yzcdn.cn/upload_files/2019/01/26/FnHwBjF0slV3CgTrwygqXUvAYe-e.jpg!middle.jpg"
        },
        {
          id: 6,
          title: "【自养自产土鸡蛋】30枚装44.9！纯正土鸡蛋，产地直发！",
          price: "49.9",
          picture:
            "https://img.yzcdn.cn/upload_files/2018/12/11/FuNLdcS8lECbjl-8P8TmZxLXuyGQ.jpg!middle.jpg"
        }
      ],
      imgg:[
        {id:1,immg:"https://img.yzcdn.cn/upload_files/2018/12/11/Fo51aFZ4pSeEGVkZ6uoXMXewFP2d.png!large.png"},
        {id:2,immg:"https://img.yzcdn.cn/upload_files/2018/12/11/Fqe-IT3cEUzlU2SLEHk8hrD2xeZh.jpg!large.jpg"},
        {id:3,immg:"https://img.yzcdn.cn/upload_files/2018/12/11/FnYUeM-rivgd5ez0-8MztbWa1Fkd.png!large.png"},
        {id:4,immg:"https://img.yzcdn.cn/upload_files/2018/12/11/FgShrYWHlidwyskLFY3XFpDnlCA-.png!large.png"},
      ]
    };
  },
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
//商品列表+
.box-1 {
  height: 265px;
  width: 175px;
  background: #ffffff;
  margin: 5px 7px;
  float: left;
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
}
.block {
  width: 380px;
  margin: 0 auto;
  background: #f8f8f8;
}
.box-span{
  width:375px;
  height: 105px;
background-color: #ffffff;
}
.box-img{
  width:25%;
  height: 105px;
  float:left;
}
//商品列表-
//轮播图+
.el-carousel__item {
  background-repeat: no-repeat;
  background-size: 375px 135px;
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