<template>
  <div class="main">
    <div :class="['tab-box',classSkin]">
      <div class="tab-menu-box">
        <a
          :class="{'tab-box-menu':true,'tab-menu-focus':(focusId==index+1)}"
          href="javascript:;"
          v-for="(product,index) in productList"
          :key="product.P1"
          @click="focusTab(index+1),getorder(product.P1)"
        >{{product.name}}</a>
      </div>
      <div style="position:absolute;top:0;left: 100px;">
        <div
          :class="{'tab-content':true,'content-focus':true}"
          v-for="group in groupList"
          :key="group.index"
        >
          <div class="product-group" :v-model="Objparma.prop">
            <img
              class="product-img"
              v-if="group.album&&group.album.length"
              :src="group.album[0].url"
            >
            <div class="product-intro">
              <p class="product-name">{{group.name}}</p>
              <p class="product-description">{{group.description}}</p>
              <div class="FL">
                <div class="product-price">
                  ￥{{group.price}}
                  <div class="el-icon-circle-plus-outline product-icon" @click="purchase(group)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      classSkin: "skin-red-tab", //皮肤
      // -------------------------请求接口的地址-------------------------
      objURL: {
        Prolist: "http://120.76.160.41:3000/crossList?page=mabang-category",
        list: "http://120.76.160.41:3000/crossList?page=mabang-commodity"
      },

      productList: [], //商品分类列表数据
      groupList: {}, //商品列表数据
      focusId: 1, //选项卡id聚焦
      isCartCom: false,
      Objparma: {
        category: ""
      }
    };
  },
  methods: {
    //------跳转加入购物车--------
    purchase(buyEach) {
      this.isCartCom = !this.isCartCom;
      this.$store.commit("changeActiveProduce", buyEach);
    },

    //------聚焦选型卡函数--------
    focusTab(id) {
      this.focusId = id;
      this.$emit("after-focus", id); //触发自定义事件
    },
    //--------------获取商品分类列表接口函数--------------
    getProList() {
      axios({
        //请求接口
        method: "post",
        url: this.objURL.Prolist,
        data: this.Objparma //传递参数
      })
        .then(response => {
          // console.log("请求商品分类列表结果", response.data);
          let { list } = response.data; //解构赋值
          this.productList = list;
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    //--------------获取商品列表接口函数--------------
    getList() {
      axios({
        //请求接口
        method: "post",
        url: this.objURL.list,
        data: {
          findJson: {
            category: this.Objparma.category
          }
        }
      })
        .then(response => {
          let { list } = response.data; //解构赋值
          // console.log("请求商品列表结果", response.data);
          this.groupList = list;
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },

    getorder(index) {
      this.Objparma.category = index;
      this.getList();
    }
  },
  mounted() {
    //-------------------------等待模板加载后-------------------------
    this.getProList(); //第一次加载此函数，页面才不会空
    this.getList((this.Objparma.category = 5));
    this.classSkin = this.classSkin || "skin-default"; //classSkin默认设成skin-default
  },
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
  position: relative;
}

.skin-default .tab-menu-focus:link,
.skin-default .tab-menu-focus:visited {
  color: red;
  font-weight: bold;
}

.skin-default .tab-box-menu {
  width: 100px;
  height: 80px;
  padding: 10px;
  display: inline-block;
  margin: 0 10px 0 0;
  background-color: #f8f8f8;
  padding: 5px 20px;
}

.tab-menu-box {
  width: 100px;
}
.skin-default .tab-menu-box {
  padding: 10px;
  overflow: hidden;
}

.tab-content {
  float: left;
  display: none;
}

.content-focus {
  display: block;
}

.skin-red-tab .tab-menu-focus:link,
.skin-red-tab .tab-menu-focus:visited {
  border-left: 2px solid #e4393c;
  background: #fff;
  font-weight: bold;
  height: 80px;
}

.skin-red-tab .tab-box-menu {
  width: 100px;
  height: 80px;
  display: inline-block;
  margin: 0 5px 0 0;
  background: #f8f8f8;
  padding: 10px 20px;
}
.product-group {
  max-width: 500px;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}
.product-img {
  width: 30%;
  float: left;
}

.product-intro {
  float: left;
  width: 60%;
}
.product-name {
  width: 100%;
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-description {
  width: 100%;
  max-height: 40px;
  font-size: 12px;
  color: #999;
  margin: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-price {
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