 <template>
  <div class id="app">
    <template v-for="shop in OrderList">
      <div class="order-list-item" :key="shop.P1" v-if="shop.status==cf">
        <!-- 订单头部店铺名称，交易情况 -->
        <div class="order-list-item__header" type="list-item-header">
          店铺：米柚生活 :
          <span class="order-list-item__header__state">订单用户:{{shop.userName}}</span>
        </div>
        <!-- 订单列表 -->

        <div class="order-list-item__order-list" type="order-list">
          <div class="order-cap-order-item">
            <!-- 订单列表中的头部订单编号 -->
            <div class="order-cap-order-item__head">订单编号:{{shop._id}}</div>
            <!-- 订单列表中的内容 -->
            <div
              class="order-cap-order-item__body"
              v-for="order in shop.commodityList"
              :key="order.id"
            >
              {{order}}
              <div class="order-card">
                <div class="order-card__header">
                  <a class="order-card__thumb">
                    <img
                      src="https://img.yzcdn.cn/upload_files/2016/09/29/ForFFyDV_trRjCVprENBUvCuKYef.jpg!small.jpg"
                      class="order-card__img"
                    >
                  </a>
                  <div class="order-card__content">
                    <div class="order-card__title">{{order.name}}</div>
                    <div>{{order.description}}"description": "新疆库尔勒香梨，3个仅售9.9元！",</div>

                    <div class="order-card__bottom">
                      <div class="order-card__price" style="color:red">￥{{order.price}}</div>
                      <div class="order-card__num">X{{order.byCount}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 订单列表中的页脚 -->
          </div>
        </div>
        <!-- 查看全部商品数量 -->
        <div
          class="order-cap-order-item__more"
          v-if="shop.commodityList.length>=1? true:false"
        >查看全部{{shop.commodityList.length}}件商品</div>

        <!-- 订单页脚 -->
        <div class="order-list-item__footer order-hairline--top" type="list-item-footer">
          <div class="order-button__text">
            <div class="order-cap-order-item__total-price">
              合计 ：
              <span style="color:red">{{getTotalMoney(shop.commodityList)}}</span>
            </div>

            <div class="order-cap-order-item__total-price">
              运费 ：
              <span style="color:red">{{shop.freight}}</span>
            </div>
          </div>
          <!-- 订单按钮 -->
          <div class="order-button__footer">
            <router-link to="/memberOrderDetail" icon="el-icon-notebook-2">
              <el-button type="info" plain @click="getlist(shop)" size="mini">查看订单详情</el-button>
            </router-link>

            <router-link to="/memberOrderpay" icon="el-icon-notebook-2" v-if="shop.status==1">
              <el-button type="primary" plain @click="getlist(shop)" size="mini">去支付</el-button>
            </router-link>

            <!-- 弹框取消 -->
            <el-button type="danger" @click="cancelorder" size="mini" v-if="shop.status==1">取消</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>



<script>
export default {
  props: ["cf"],
  data() {
    return {
      tabPosition: "top",
      allCount: null, //总记录数
      OrderList: {}, //订单列表
      page: {},
      totalMoney: 0,
      totalCount: 0,
      orderlistdata: [] //指向vuex的对应的字段
    };
  },
  methods: {
    getTotalMoney(commodityList) {
      let money = 0;
      commodityList.forEach(commodityEach => {
        //循环：{商品数组}
        money += commodityEach.byCount * commodityEach.price;
      });
      return money;
    },
    getlist(data) {
      //将列表信息传递到列表详情页面
      // let aaa = JSON.stringify(data);
      // alert(aaa);

      this.$store.commit("orderlistdetail", data);
    },
    //取消订单
    cancelorder() {
      this.$confirm("此操作将取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定取消",
        cancelButtonText: "关闭",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已取消订单!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "未取消订单"
          });
        });
    }
  },
  beforeCreate() {},
  mounted() {
    axios({
      //请求接口
      method: "post",
      // url: this.objURL.list,
      url: "http://120.76.160.41:3000/crossList?page=mabang-order"
      // data: this.Objparma //传递参数
    })
      .then(response => {
        console.log("第一次请求结果", response.data);
        let { list, page } = response.data; //解构赋值
        this.OrderList = list;

        this.page = page;
        this.allCount = page.allCount; //更改总数据量
        this.orderlistdata = response.data;
      })
      .catch(function(error) {
        alert("异常:" + error);
      });
  }
};
</script>
