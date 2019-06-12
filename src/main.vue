<template>
  <div class>
    <router-view></router-view>
    <div class="foot">有赞提供技术支持</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.el-header {
  background-color: #409eff;
}
.el-main {
  padding: 0 15px;
}
.foot {
  background-image: url("https://img.yzcdn.cn/public_files/2018/02/01/01a9df5ffcbf29f1416832070b5a909b.png!middle.png");
  color: #bfbfc3;
  padding: 50px 0 20px;
  background-position: center 17px;
  background-repeat: no-repeat;
  background-size: 110px 30px;
  text-align: center;
  font-size: 12px;
  background-color: #f8f8f8;
  padding-bottom: 100px;
}

/* 购物车小插件样式 */
.Shopping-box .el-dialog {
  position: fixed;
  bottom: 0;
  margin-bottom: -0px;
}
</style>