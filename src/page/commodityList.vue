<template>
  <div class="main">
    <el-tabs tab-position="left">
      <el-tab-pane label="应季尝鲜区">
        <ul class="product-list">
          <div class="product-title">应季尝鲜区</div>
          <li class="product-group" v-for="(seasonal,index) in seasonalList" :key="index">
            <img class="product-img" :src="seasonal.imgUrl">
            <div class="product-text">
              <p class="product-intro">{{seasonal.intro}}</p>
              <p class="product-groupTitle">{{seasonal.groupTitle}}</p>
              <div class="FL">
                <div class="product-info">
                  {{seasonal.info}}
                  <div class="el-icon-circle-plus-outline product-icon"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="进口区">
        <ul class="product-list">
          <div class="product-title">进口区</div>
          <li class="product-group" v-for="(entrance,index) in entranceList" :key="index">
            <img class="product-img" :src="entrance.imgUrl">
            <div class="product-text">
              <p class="product-intro">{{entrance.intro}}</p>
              <p class="product-groupTitle">{{entrance.groupTitle}}</p>
              <div class="FL">
                <div class="product-info">
                  {{entrance.info}}
                  <div class="el-icon-circle-plus-outline product-icon"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="国产区">
        <ul class="product-list">
          <div class="product-title">国产区</div>
          <li class="product-group" v-for="(domestic,index) in domesticList" :key="index">
            <img class="product-img" :src="domestic.imgUrl">
            <div class="product-text">
              <p class="product-intro">{{domestic.intro}}</p>
              <p class="product-groupTitle">{{domestic.groupTitle}}</p>
              <div class="FL">
                <div class="product-info">
                  {{domestic.info}}
                  <div class="el-icon-circle-plus-outline product-icon"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="果盘鲜切">
        <ul class="product-list">
          <div class="product-title" name="freshCut">果盘鲜切</div>
          <li class="product-group" v-for="(freshCut,index) in freshCutList" :key="index">
            <img class="product-img" :src="freshCut.imgUrl">
            <div class="product-text">
              <p class="product-intro">{{freshCut.intro}}</p>
              <p class="product-groupTitle">{{freshCut.groupTitle}}</p>
              <div class="FL">
                <div class="product-info">
                  {{freshCut.info}}
                  <div class="el-icon-circle-plus-outline product-icon"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="零食">
        <ul class="product-list">
          <div class="product-title" name="snacks">零食</div>
          <li class="product-group" v-for="(snacks,index) in snacksList" :key="index">
            <img class="product-img" :src="snacks.imgUrl">
            <div class="product-text">
              <p class="product-intro">{{snacks.intro}}</p>
              <p class="product-groupTitle">{{snacks.groupTitle}}</p>
              <div class="FL">
                <div class="product-info">
                  {{snacks.info}}
                  <div class="el-icon-circle-plus-outline product-icon"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data: function() {
    return {
      seasonalList: [
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2018/12/11/FuQ3CP8mS1mIPfZ4dAJa1AbMOzWB.jpg",
          intro: "广西贡品皇帝柑2斤装、皮薄肉脆、无渣少核，清甜爽滑！",
          groupTitle: "皇帝柑2斤装 14.9元",
          info: "￥14.90"
        }
      ],
      entranceList: [
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/09/29/ForFFyDV_trRjCVprENBUvCuKYef.jpg!middle.jpg",
          intro: "佳沛金奇异果，6个装，水润香甜，唤醒全身活力！",
          groupTitle: "佳沛金奇异果",
          info: "￥79.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2015/05/13/Fu8fpVSe1KPgwLKH4LrvXLAw2fGC.jpg!middle.jpg",
          intro: "菲律宾进口香蕉，5根装，软糯香甜，美容水果！",
          groupTitle: "菲律宾香蕉，5根",
          info: "￥12.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2015/09/11/Fs5jfPlG8iN5vxtmCCjGv_34qB4A.jpg!middle.jpg",
          intro: "泰国龙眼，1斤装，黄金肉核比，天然滋补品。",
          groupTitle: "皮薄过大、汁多味甜的泰国进口龙眼，1斤仅售10.9啦！",
          info: "￥12.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/10/20/Fm3ROD48mjecPyXbug1NmKLbtUk9.jpg!middle.jpg",
          intro: "菲律宾进口凤梨，1个仅售29.9，果肉金黄，鲜甜可口，清香怡人。",
          groupTitle: "菲律宾进口凤梨，果肉金黄，鲜甜可口，清香怡人。",
          info: "￥29.90"
        }
      ],
      domesticList: [
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/11/10/FrYthPowTlxjCexMdWcc2YvZ0EHx.jpg!middle.jpg",
          intro: "赣南脐橙，皮薄多汁，香甜可口！",
          groupTitle: "不是所有脐橙，都叫“赣南脐橙”~",
          info: "￥12.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2015/05/13/Fi9mk4S1ve59315BRMx0wXpPgCsA.jpg!middle.jpg",
          intro: "库尔勒香梨3个装",
          groupTitle: "新疆库尔勒香梨，3个仅售9.9元！",
          info: "￥9.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2017/10/31/FjN4bZkxkoD_jxDYJDP2LEP6cy9R.jpg!middle.jpg",
          intro: "砂糖桔2斤装，甘甜可口，汁多化渣",
          groupTitle: "",
          info: "￥19.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2018/12/11/FuQ3CP8mS1mIPfZ4dAJa1AbMOzWB.jpg!middle.jpg",
          intro: "广西贡品皇帝柑2斤装、皮薄肉脆、无渣少核，清甜爽滑！",
          groupTitle: "皇帝柑2斤装 14.9元",
          info: "￥14.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2015/08/10/FsN3Cy-Ecbb-3x4XWQ_YhrSS97c7.jpg!middle.jpg",
          intro: "千禧圣女果，1斤12.9元，亦蔬亦果，清甜多汁惹人爱！",
          groupTitle: "【千禧驾到】千禧圣女果，亦蔬亦果，清甜多汁惹人爱！",
          info: "￥12.90"
        }
      ],
      freshCutList: [
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/09/23/FiivtNG3CoZrNNrsQyKkLw6h6iop.jpg!middle.jpg",
          intro: "海南西州蜜哈密瓜，1个装，口感清爽、细腻、柔滑！",
          groupTitle: "海南西州蜜",
          info: "￥39.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg!middle.jpg",
          intro:
            "【商务大切盘，6-8人份！】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享精彩！！",
          groupTitle: "鲜切水果",
          info: "￥69"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg!middle.jpg",
          intro:
            "【商务中号切盘，4-6人份！】6种时令水果，企业下午茶、会议茶歇、亲朋聚会，分享快乐，分享机会！",
          groupTitle: "商务中号切盘",
          info: "￥49"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/10/18/Ft20zyoZTtp2l00osuLKdmR1sbHd.jpg!middle.jpg",
          intro:
            "凤梨切果，1斤，果肉脆嫩，丰富蛋白质和维生素，有减肥等多种健康功效。",
          groupTitle: "新鲜凤梨切果，酸甜多汁，开胃解馋。",
          info: "￥22.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/09/23/FiivtNG3CoZrNNrsQyKkLw6h6iop.jpg!middle.jpg",
          intro: "哈密瓜切，1斤装，脆甜多汁，爽口。",
          groupTitle: "",
          info: "￥22.90"
        }
      ],
      snacksList: [
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/01/08/FrBpTMLaEYZcpIbIMiMV41UQrW3y.png!middle.png",
          intro:
            "【全店零食类冠军】 鸭子飞了龙岩泡鸭翅，5包仅售15.9，肉质紧实，块大肉香，越啃越带劲。",
          groupTitle: "鸭子飞了龙岩泡鸭翅",
          info: "￥15.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2016/01/08/FhidI7Soi8R9c7Z-EPWApKuwDpQD.png!middle.png",
          intro:
            "【港荣蒸蛋糕10个装仅售15.9元】精选北方阳光小麦，浓醇牛奶和鲜鸡蛋，健康蒸工艺，奶香浓郁，软绵不干，吃一口忘不掉！",
          groupTitle: "港荣蒸蛋糕奶油味",
          info: "￥15.90"
        },
        {
          imgUrl:
            "https://img.yzcdn.cn/upload_files/2015/07/19/For3y1B-2YR_W6NaIVaSAK81NUTv.jpg!middle.jpg",
          intro:
            "【卡士鲜酪乳3盒装】原生态奶源发酵，口口醇香，5种益生菌完美匹配，喝出贵族健康身材！",
          groupTitle: "卡士酸奶",
          info: "￥11.90"
        }
      ]
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/css/util.scss"; //导入公共样式文件
body {
  background-color: #f8f8f8;
}

.main {
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
}

.product-list {
  width: 100%;
  padding: 10px 10px 0 10px;
  background-color: #fff;
}
.product-title {
  font-size: 12px;
  font-weight: normal;
  color: #666;
  padding-bottom: 10px;
}
.product-group {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 10px;
}
.product-img {
  width: 30%;
  float: left;
}
.product-text {
  float: left;
  width: 60%;
}
.product-intro {
  width: 100%;

  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-groupTitle {
  width: 100%;
  max-height: 40px;
  font-size: 12px;
  color: #999;
  padding: 5px 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-info {
  width: 150px;
  max-height: 40px;
  font-size: 16px;
  color: #f00;
  padding: 0 0 0 10px;
}
.product-icon {
  font-size: 24px;
  float: right;
}
</style>