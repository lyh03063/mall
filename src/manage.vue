<template>
  <div id="app" style>
    <el-container>
      <el-header class="MB10">
        <el-row>
          <div class="FL MT13 FS24 C_fff">网站管理后台</div>

          <div class="FR MT30 C_fff">
            <span class="MR10">当前登录用户 admin</span>
            <a href="javascript:;" class="MR10" @click="logout">退出登录</a>
            <a target="_blank" href="javascript:;">官网首页</a>
          </div>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="202px" class="ML10">
          <el-menu
            :default-active="activeMenuIndex"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <el-menu-item index="listHome" route="/listHome">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>产品中心</span>
              </template>
              <el-menu-item index="listProduct" route="/listProduct">产品列表</el-menu-item>
              <el-menu-item index="listCategory" route="/listCategory">产品分类</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  components: { }, //注册组件
  methods: {
    logout() {
      //退出登录函数
      localStorage.isLogin = "0";
      this.$router.push({ path: "/login" }); //跳转到manage
    }
  },
  computed: {
    //计算属性

    activeMenuIndex() {
      //
      //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    }
  },
  data() {
    return {
   
    };
  },
  mounted() {}
};
</script>



