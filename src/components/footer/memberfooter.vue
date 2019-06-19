 <template>
  <div>
    <!------------------------ 版权页脚开始 ---------------------------->
    <el-col :span="24">
      <div class="all-footer">
        <div class="all-footer__links">
          <router-link to="/home" class="all-hairline">店铺首页</router-link>
          <router-link to="/commodityList" class="all-hairline">所有商品</router-link>
          <router-link to="/cart" class="all-hairline">去购物车</router-link>
          <router-link to="/memberall" class="all-hairline">购物订单</router-link>
          <router-link to="/memberCenter" class="all-hairline">个人中心</router-link>
        </div>
      </div>
    </el-col>
    <!------------------------ 版权页脚结束 ---------------------------->
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
/*----------------- 版权页脚开始 ---------------- */
.all-footer {
  margin-top: 20px;
  text-align: center;
  background-color: #f8f8f8;
  color: #999;
  font-size: 12px;
  line-height: 16px;
}

.all-footer__links a {
  color: #666;
  padding-left: 10px;
  padding-right: 10px;
  border-right: 1px solid #e5e5e5;
}
.all-footer__links a:last-child {
  padding-left: 10px;
  padding-right: 10px;
  border: 0;
}

.all-hairline {
}
/*----------------- 版权页脚结束 ---------------- */
</style>