<template>
  <div class>
    <router-view></router-view>
    <div class="foot">碼幫提供技术支持</div>
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
.cartComponent.el-dialog {
  position: fixed;
  bottom: 0;
  margin-bottom: -0px;
}
.cartComponent .el-dialog__body {
  padding: 0;
}
.cartComponent .el-dialog__headerbtn {
  border: 1px solid #909399;
  border-radius: 50%;
}
.cartComponent .el-dialog__header span {
  border-bottom: 0;
}
.cart .el-dialog__header span {
  border-bottom: 0;
}
</style>