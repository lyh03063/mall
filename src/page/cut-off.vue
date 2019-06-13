<template>
  <div class="cut-off-rule" :style="{height:height+'px','background-color':color}"></div>
</template>

<script>
export default {
  props: ["height", "color"]
};
</script>

<style lang="scss">
.cut-off-rule {
  width: 1px;
  height: 20px;
  background: #f2f2f2;
  margin: 10px 10px;
}
@import "../assets/css/util.scss"; //导入公共样式文件
</style>