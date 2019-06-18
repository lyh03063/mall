<template>
  <div class="commodity-main">
    <el-tabs tab-position="left" @tab-click="switchClick">
      <!-- 商品分类列表 -->
      <el-tab-pane
        :label="commoditySort.name"
        v-for="commoditySort in commoditySortList"
        :key="commoditySort.P1"
      >
        <!-- 商品列表 -->
        <ul class="commodity-list">
          <div class="commodity-title">{{commoditySort.name}}</div>
          <li
            class="commodity-group"
            v-for="commodity in commodityList"
            :key="commodity.index"
            :v-model="objCommodity.prop"
          >
            <router-link :to="'/commodityDetail?id=' + commodity.P1">
              <img
                class="commodity-img"
                v-if="commodity.album&&commodity.album.length"
                :src="commodity.album[0].url"
                @click="$store.commit('changeActiveProduce',commodity)"
              >
            </router-link>
            <div class="commodity-intro">
              <p class="commodity-name">{{commodity.name}}</p>
              <p class="commodity-description">{{commodity.description}}</p>
              <div class="FL">
                <div class="commodity-price">
                  ￥{{commodity.price}}
                  <div
                    class="el-icon-circle-plus-outline commodity-icon"
                    @click="purchase(commodity)"
                  ></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <el-button type="text" @click="getList">查看更多商品</el-button>
      </el-tab-pane>
    </el-tabs>
    <portal></portal>
    <cartComponent v-if="isCartCom"></cartComponent>
  </div>
</template>

<script>
import cartComponent from "../components/cart/cartComponent.vue";
import portal from "../components/shift/portal";
import { stringify } from "querystring";
export default {
  name: "",
  components: { portal, cartComponent },
  props: {},
  data() {
    return {
      // -------------------------请求接口的地址-------------------------
      objURL: {
        Prolist: "http://120.76.160.41:3000/crossList?page=mabang-category",
        list: "http://120.76.160.41:3000/crossList?page=mabang-commodity"
      },

      commoditySortList: [], //商品分类列表数据
      commodityList: {}, //商品列表数据
      objCommodity: {
        category: 1 //显示首次加载的页面
      },
      pageIndex: 1,
      pageSize: 10
    };
  },
  methods: {
    switchClick(tab, event) {
      this.objCommodity.category = tab.index * 1 + 1;
      this.pageSize = 10;
      this.getCommodityList();
    },
    //------跳转加入购物车--------
    purchase(commodity) {
      this.$store.commit("isCartComOpen");
      this.$store.commit("changeActiveProduce", commodity);
      console.log("commodity",commodity)
    },
    //--------------获取商品分类列表接口函数--------------
    getCommoditySortList() {
      axios({
        //请求接口
        method: "post",
        url: this.objURL.Prolist,
        data: this.findJson //传递参数
      })
        .then(response => {
          let { list } = response.data; //解构赋值
          this.commoditySortList = list.reverse(); //数组翻转
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    //--------------获取商品列表接口函数--------------
    getCommodityList() {
      axios({
        //请求接口
        method: "post",
        url: this.objURL.list,
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          findJson: { category: this.objCommodity.category }
        } //传递参数
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值
          this.commodityList = list;
          this.page = page;
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    getList() {
      this.pageSize += 10;
      this.getCommodityList();
    }
  },
  mounted() {
    //-------------------------等待模板加载后-------------------------
    this.getCommoditySortList(); //第一次加载此函数，页面不为空
    this.getCommodityList(); //第一次加载此函数，页面不为空
  },
  computed: {
    isCartCom() {
      return this.$store.state.isCartCom;
    }
  }
  // created() {}
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件

.commodity-main {
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
}

.commodity-list {
  width: 100%;
  padding: 10px 10px 0 10px;
  background-color: #fff;
}
.commodity-title {
  font-size: 14px;
  font-weight: bold;
  color: #666;
  padding-bottom: 10px;
}
.commodity-group {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 10px;
}
.commodity-img {
  width: 30%;
  float: left;
}
.commodity-intro {
  float: left;
  width: 60%;
}
.commodity-name {
  width: 100%;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.commodity-description {
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
.commodity-price {
  width: 150px;
  max-height: 40px;
  font-size: 16px;
  color: #f00;
  padding: 0 0 0 10px;
}
.commodity-icon {
  font-size: 24px;
  float: right;
}
//-------el-组件修改样式------
.commodity-main {
  .el-tabs--left {
    .el-tabs__header.is-left {
      margin-right: 0;
    }
    .el-tabs__active-bar.is-left {
      right: 0;
      left: 0;
      background-color: #f00;
    }
    .el-tabs__item.is-left {
      text-align: left;
      color: #999;
      font-weight: bold;
    }
    .el-tabs__item.is-left.is-active {
      background-color: #fff;
      color: #000;
      font-weight: bold;
    }
  }
  .el-tabs__item {
    height: 80px;
    line-height: 80px;
  }
  .el-button {
    display: block;
    margin: 0 auto;
  }
}
</style>