<template>
  <div class="order-main">
    <el-row>
      <!------------------------ 订单列表头部开始 ---------------------------->
      <el-col :span="24">
        <div class="order-grid-content order-bg-purple-wihte">
          <!-- 列表头部切换开始 -->
          <div class="order-tab">
            <el-tabs :tab-position="tabPosition" v-model="activeName">
              <!-- 订单列表 -->
              <el-tab-pane
                :label="item.name"
                :name="item.newactive"
                v-for="item in Arrshoptab"
                :key="item.value"
              >
                <memberOrderList :cf="item"></memberOrderList>
              </el-tab-pane>
            </el-tabs>
          </div>
          <!-- 列表头部切换结束 -->

          <memberfooter></memberfooter>
        </div>
      </el-col>
      <!------------------------ 订单列表头部结束 ---------------------------->
    </el-row>
  </div>
</template>


<script>
import memberOrderList from "../components/order/memberOrderList";

export default {
  components: {
    //注册订单列表组件
    memberOrderList
  },
  data() {
    return {
      activeName: this.$route.query.orderactiveName,
      Arrshoptab: [
        { name: "全部订单", value: 0, newactive: "0" },
        { name: "已下单", value: 1, newactive: "1" },
        { name: "已付款", value: 2, newactive: "2" },
        { name: "已发货", value: 3, newactive: "3" },
        { name: "已完成", value: 4, newactive: "4" },
        { name: "已取消", value: 5, newactive: "5" }
      ],
      totalData: {}, //订单列表
      tabPosition: "top",
      visible2: false //取消订单弹窗
    };
  }
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
@import "../assets/css/memberOrder.scss"; //导入memberOrder订单列表样式文件
</style>