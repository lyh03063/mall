<template>
  <div class="main">
    <el-tabs tab-position="left" :data="tableData">
      <el-tab-pane
        :prop="tableData.prop"
        v-for="product in tableData"
        :key="product.prop"
      >{{product.name}}</el-tab-pane>
    </el-tabs>
    <portal></portal>
  </div>
</template>

<script>
import portal from "../components/shift/portal";
export default {
  name: "",
  components: { portal },
  props: {},
  data() {
    return {
      // -------------------------请求接口的地址-------------------------
      objURL: {
        add: "",
        modify: "",
        list: "http://120.76.160.41:3000/crossList?page=mabang-category",
        delete: ""
      },
      Objparma: {
        category: "1"
      },
      tableData: [
        {
          prop: "name"
        }
      ]
      // productList: [
      //   {
      //     prop: "name"
      //   }
      // ] //列表数据
    };
  },
  methods: {
    //-------------------------ajax获取产品列表函数-------------------------
    getProList() {
      axios({
        //请求接口
        method: "post",
        url: this.objURL.list,
        data: this.Objparma //传递参数
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list } = response.data; //解构赋值
          this.tableData = list;
          // for (var i = 0; i < this.tableData.length; i++) {
          //   if (this.tableData[i].P1 == 1) {
          //     this.productList.push(this.tableData[i]);
          //     console.log(" 1111this.productList", this.productList);
          //   }
          // }
          // this.seasonalList = this.tableData.map(doc => {
          //   if (doc.category == seasonalList) {
          //     console.log("doc.category", doc.category);
          //     return true;
          //   }
          // });
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },
  mounted() {
    //-------------------------等待模板加载后-------------------------
    this.getProList(); //第一次加载此函数，页面才不会空
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