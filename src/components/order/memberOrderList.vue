 <template>
  <div class id="app">
    <div v-for="order in totalData" :key="order.P1">
      <!-- 订单列表数据 -->
      <div>
        <!-- {{objlength}} -->
        <div class="order-list-item" v-if="order.status==cf.value || cf.value==0">
          <!-- 订单头部店铺名称，交易情况 -->
          <div class="order-list-item__header" type="list-item-header">店铺：米柚生活 :</div>
          <!-- 订单列表 -->
          <div class="order-list-item__order-list" type="order-list">
            <div class="order-cap-order-item">
              <!-- 订单列表中的头部订单编号 -->
              <div class="order-cap-order-item__head">订单编号:{{order._id}}</div>
              <!-- 订单列表中的内容 -->
              <div
                class="order-cap-order-item__body"
                v-for="commodity in order.commodityList"
                :key="commodity.id"
              >
                <div class="order-card">
                  <div class="order-card__header">
                    <a class="order-card__thumb">
                      <img id="order.id" :src="commodity.freight" class="order-card__img">
                    </a>

                    <div class="order-card__content">
                      <div class="order-card__title">{{commodity.name}}</div>
                      <div
                        class="order-card__description"
                      >商品详情</div>

                      <div class="order-card__bottom">
                        <div class="order-card__price" style="color:red">￥{{commodity.price}}</div>
                        <div class="order-card__num">X{{commodity.byCount}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 订单列表中的页脚 -->
            </div>
          </div>

          <!-- 查看全部商品数量 -->
          <!-- <div
          class="order-cap-order-item__more"
          v-if="shop.commodityList.length>=1? true:false"
          >查看全部{{shop.commodityList.length}}件商品</div>-->

          <!-- 订单页脚 -->
          <div class="order-list-item__footer order-hairline--top" type="list-item-footer">
            <div class="order-button__text">
              <div class="order-cap-order-item__total-price">
                合计 ：
                <span style="color:red">{{getTotalMoney(order.commodityList)}}</span>
              </div>

              <div class="order-cap-order-item__total-price">
                运费 ：
                <span style="color:red">{{order.freight}}</span>
              </div>
            </div>
            <!-- 订单按钮 -->
            <div class="order-button__footer">
              <router-link
                class="order-buttonstyle"
                :to="'/memberOrderDetail?P1='+order.P1"
                icon="el-icon-notebook-2"
              >
                <el-button size="mini" plain>查看订单详情</el-button>
              </router-link>

              <!-- 弹框取消 -->
              <el-button
                class="order-buttonstyle"
                @click="cancelOrder(order.P1,5)"
                size="mini"
                plain
                v-if="order.status==1"
              >取消</el-button>

              <!-- 弹框付款 -->
              <router-link
                class="order-buttonstyle-last"
                :to="'/memberOrderDetail?P1='+order.P1"
                icon="el-icon-notebook-2"
              >
                <el-button size="mini" v-if="order.status==1" plain type="danger">付款</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{objlength}} -->
    <!-- 订单列表为空-->
    <div class="order-empty-tip" v-if="totalData.length == 0 ">
      <div class="order-empty-tip__desc">
        <h4>居然还没有订单</h4>
        <p>好东西，手慢无</p>
      </div>
      <router-link to="/home" class="order-empty-span" >去逛逛</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cf"],
  data() {
    return {
      tabPosition: "top",
      allCount: null, //总记录数
      totalData: [], //订单列表
      page: {},
      totalMoney: 0,
      totalCount: 0,
      totalDatadata: [], //指向vuex的对应的字段
      userName: "",
      imgId: [],
      statusnumber: [] //状态元素
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

    //取消订单
    cancelOrder(P1, status) {
      this.$confirm("此操作将取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定取消",
        cancelButtonText: "关闭",
        type: "warning"
      })
        .then(() => {
          axios({
            //请求接口
            method: "post",
            // url: this.objURL.list,
            url: "http://120.76.160.41:3000/crossModify?page=mabang-order",
            data: {
              findJson: {
                P1: P1
              },
              modifyJson: {
                status: status
              }
            } //传递参数
          })
            .then(response => {
              console.log("第一次请求结果", response.data);
              let { code, message } = response.data; //解构赋值
              this.gettotalData();
            })
            .catch(function(error) {
              alert("异常:" + error);
            });

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
    },
    //获取所有商品数据
    getcommoditydata() {},
    //获取所有数据
    gettotalData() {
      axios({
        //请求接口
        method: "post",
        // url: this.objURL.list,
        url: "http://120.76.160.41:3000/crossList?page=mabang-order",
        data: {
          findJson: {
            userName: this.userName,
            status:this.cf.value
          }
        } //传递参数
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值
          this.totalData = list;
          this.page = page;
          this.allCount = page.allCount; //更改总数据量
          this.totalDatadata = response.data;

          list.forEach(listEach => {
            listEach.commodityList.forEach(commodityListEach => {
              this.imgId.push(commodityListEach.P1);
            });
          });
          this.queryimg();
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    //获取图片
    queryimg() {
      axios({
        //请求接口
        method: "post",
        // url: this.objURL.list,
        url: "http://120.76.160.41:3000/crossList?page=mabang-commodity",
        data: {
          findJson: {
            P1: this.imgId
          }
        } //传递参数
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值

          var i = 0;
          this.totalData.forEach(totalDataEach => {
            totalDataEach.commodityList.forEach(commodityListEach => {
              for (let a = 0; a < list.length; a++) {
                if (commodityListEach.P1 == list[i].P1) {
                  commodityListEach.freight = list[i].album[0].url;
                }
                i++;
              }
              i = 0;
            });
          });
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },
  beforeCreate() {},
  mounted() {
    this.userName = localStorage.loginUserName;
    this.gettotalData();
  }
};
</script>
