<template>
  <div class="main">
    <!-- 这是购物车插件 -->

    <button @click="dialogVisible=true">购物车</button>
    <div class="Shopping-box">
      <el-dialog :visible.sync="dialogVisible" width="100%">
        <header class="header-box">
          <span>
            <img :src="album[0].url">
          </span>
          <span>{{doc.name}}</span>
          <span>{{doc.price}}</span>
        </header>

        <main v-for="item in  prop" :key="item.value">
          <span>{{item.title}}</span>
          <span>
            <el-button type="danger">{{item.value}}</el-button>
          </span>
        </main>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: true,
      doc: {
        _id: "5cfefc577352e31858b62470",
        P1: 1,
        name: "牛皮西瓜",
        description: "牛皮西瓜注释",
        detail:
          '<p>牛皮西瓜<span style="color: rgb(51, 51, 51);">详情</span></p>',
        price: 100,
        store: 5,
        prop: [
          {
            value: "6个装",
            title: "净含量"
          },
          {
            value: "2斤",
            title: "重量"
          }
        ],
        album: [
          {
            url:
              "https://img.yzcdn.cn/upload_files/2016/03/16/FvXCq8Ye4m5XIoCyOI4w7SvwLqqe.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%"
          },
          {
            aaa: "图片2地址"
          }
        ],
        freight: 5
      }
    };
  }
};
</script>



<style lang="scss" scoped>
// @import "../assets/css/util.scss"; //导入公共样式文件
.main {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>