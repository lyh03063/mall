<template>
  <div style=" background-color: rgb(248, 248, 248)" v-if="list!='' ">
    <el-row>
      <el-col :xs="0" :sm="4" :md="4" :lg="6" :xl="6">
        <div style="width:100%;height:600px"></div>
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="12">
        <div class="member-center">
          <div class="menberCenter-head WP100">
            <div class="head-portrait"></div>
            <div style="font-size:20px;font-weight: bold">{{list[0].userName}}</div>
          </div>
          <div class="myorder WP90">
            <div class="myorder-title">
              <router-link to="/memberOrder?orderactiveName=1">
                <div style="float:left">
                  <h3>我的订单</h3>
                </div>
                <div
                  style="float:right; font-size:13px;color: rgb(138, 138, 138);padding-right:10px;"
                >查看全部订单&nbsp;&nbsp;></div>
              </router-link>
            </div>
            <div style>
              <router-link to="/memberOrder?orderactiveName=1">
                <div class="order-status">
                  <div class="el-icon-goods" style="font-size:30px;"></div>
                  <div style="font-size:13px;margin-top:8px;">待付款</div>
                </div>
              </router-link>
              <router-link to="/memberOrder?orderactiveName=2">
                <div class="order-status">
                  <div class="el-icon-shopping-cart-1" style="font-size:30px;"></div>
                  <div style="font-size:13px; margin-top:8px;">已付款</div>
                </div>
              </router-link>
              <router-link to="/memberOrder?orderactiveName=3">
                <div class="order-status">
                  <div class="el-icon-truck" style="font-size:30px;"></div>
                  <div style="font-size:13px; margin-top:8px;">已发货</div>
                </div>
              </router-link>
              <router-link to="/memberOrder?orderactiveName=4">
                <div class="order-status">
                  <div class="el-icon-chat-line-round" style="font-size:30px;"></div>
                  <div style="font-size:13px; margin-top:8px;">待评价</div>
                </div>
              </router-link>
            </div>
          </div>
          <div class="member-message WP90 BC_fff">
            <router-link :to="option.url" v-for="option in memberOptions" :key="option.value" >
              <div @click="triggerEvent(option.click)">
                <div
                  :class="option.img"
                  style="float: left; font-size:20px;margin-left:0px;"
                  
                ></div>
                <div style="float: left;">{{option.value}}</div>
                <div style="float:right; color: rgb(138, 138, 138);">></div>
              </div>
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="4" :md="4" :lg="6" :xl="6">
        <div class></div>
      </el-col>
    </el-row>
    <div style="margin:-20px;">
      <portal></portal>
    </div>
  </div>
</template>

<script>
import portal from "../components/shift/portal";
export default {
  components: { portal },
  data() {
    return {
      data: false,
      list: [{P1:""}],
      memberOptions:[
        {img:"el-icon-shopping-cart-full W20",value:"购物车",url:"/cart"},
        {img:"el-icon-tickets W20",value:"任务中心",url:"/memberCenter"},
        {img:"el-icon-money W20",value:"返现",url:"/memberCenter"},
        {img:"el-icon-present W20",value:"赠品",url:"/memberCenter"},
        {img:"el-icon-goods W20",value:"心愿单",url:"/memberCenter"},
        {img:"el-icon-house W20",value:"收货地址",url:"/memberAddress"},
        {img:"el-icon-s-custom W20",value:"修改密码",url:'/xiugaimm'},
        {img:"el-icon-user W20",value:"个人信息",url:"/memberSetting"},
        {img:"el-icon-user W20",value:"退出登录",url:"#",click:true},
        ],
     
      
    };
  },
  computed: {},
  methods: {
    triggerEvent(trigger){
      //  console.log("第11次请求结果", trigger);
      if(trigger){
        this.logout();
      }
    },
    logout() {
      localStorage.isLogin = "0";
      localStorage.loginUserName = null;
      this.$router.push({ path: "/login" });
    },
    async getMember() {
      //获取产品列表函数

      let response = await axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=mabang-member",
        data: {
          findJson: {
            userName: localStorage.loginUserName
          }
        } //传递参数
      }).catch(function(error) {
          alert("异常:" + error);
        });
        console.log("第二次请求结果", response.data); 
          let { list, page } = response.data; //解构赋值
          this.list = list;
         console.log("第二次请求结果", this.list); 
    },
  },
  mounted() {
    if (localStorage.isLogin == "1") {
    this.getMember();
    }
  },
  beforeCreate() {
    // localStorage.isLogin=0;
 util.cheackLogin(this)
  }
};
</script>


<style lang="scss" >
.logout {
  margin-left: 10px;
  padding-right: 10px;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: #f8f8f8;
  height: 40px;
  line-height: 40px;
}
@import "../assets/css/util.scss"; //导入公共样式文件
.member-center {
  height: 600px;
  width: 100%;
}
.menberCenter-head {
  height: 170px;
  background-color: rgb(193, 143, 103);
}
.menberCenter-head div {
  float: left;
  height: 60px;
  line-height: 60px;
  margin-left: 10px;
  margin-top: 40px;
}
.head-portrait {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(221, 223, 226);
}
.member-message {
  margin-left: 5%;
  border-radius: 3%;
  margin-top: 10px;
  background-color: rgb(255, 255, 255);
}
.member-message div {
  margin-left: 10px;
  padding-right: 10px;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: rgb(248, 248, 248);
  height: 40px;
  line-height: 40px;
}
.myorder {
  padding-left: 10px;
  margin-left: 5%;
  border-radius: 3%;
  margin-top: 10px;
  height: 125px;
  background-color: rgb(255, 255, 255);
}
.order-status {
  margin: 0;
  height: 80px;
  float: left;
  width: 24%;
  padding-top: 15px;
  padding-left: 10%;
}

.myorder-title {
  height: 40px;
  line-height: 40px;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: rgb(248, 248, 248);
}
</style>