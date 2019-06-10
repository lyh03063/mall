<template>
  <div class="main">
    <el-row>
      <el-col :xs="0" :sm="4" :md="4" :lg="6" :xl="6">
        <div style="width:100%;height:1000px"></div>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="12">
        <div class="member-center">林丰浩</div>
      </el-col>
      <el-col :xs="0" :sm="4" :md="4" :lg="6" :xl="6">
        <div class=""></div>
      </el-col>
    </el-row>
  </div>
</template>



<style lang="scss" >
@import "../assets/css/util.scss";//导入公共样式文件
.member-center{
    height: 1000px;
    width: 100%;

  }

</style>