
<template>
  <div>
    <ul class="box">
      <li v-for="linkk in linkk" :key="linkk.id">
        <router-link class="link" :to="linkk.router">
          <div :class="linkk.icon" style="font-size: 30px;">
            <div style="font-size: 15px;">{{linkk.title}}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkk: [
        {
          id: "1",
          router: "/home",
          icon: "el-icon-house",
          title: "首页",
          color: "red"
        },
        {
          id: "2",
          router: "/commodityList",
          icon: "el-icon-goods",
          title: "所有商品"
        },
        {
          id: "3",
          router: "/cart",
          icon: "el-icon-shopping-cart-full",
          title: "购物车"
        },
        {
          id: "4",
          router: "/memberCenter",
          icon: "el-icon-user",
          title: "个人中心"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}
.box li {
  display: block;
  width: 25%;
  height: 50px;
  float: left;
  background: rgb(255, 255, 255);
}
.link {
  display: block;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  opacity: 0.75;
}

.router-link-exact-active div{
  color:orangered;
}
</style>
