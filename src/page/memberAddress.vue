<template>
  <div class>
    <div
      class="P30"
      v-for="item in tableData"
      :key="item.tableData"
      style="border-bottom: 1px solid #ebedf0"
    >
      <!-- 打钩按钮 -->
      <div
        :class="{'shop-checkbox-box':true, isChecked:isCart==item.P1}"
        @click="shopCheckbox(item)"
        v-if="$route.query.Address"
      >
        <div class="shop-checkbox">
          <i class="el-icon-check"></i>
        </div>
      </div>
      <div class="receipt-name">{{item.name}},{{item.phone}}</div>
      <div class="receipt-region FL OFH">{{item.area}}</div>
      <div class="receipt-region FL OFH">{{item.extend}}</div>
      <div class="receipt-modify FR" @click="form(item)">
        <i class="iconfont icon-xiugai"></i>
      </div>
    </div>

    <div class="added" @click="submitForm()">新增地址</div>
    <portal></portal>
  </div>
</template>

<script>
import listAdded from "../components/list-address/listAdded";
import listAddModify from "../components/list-address/listAddModify";
import portal from "../components/shift/portal";
export default {
  components: { listAdded, listAddModify, portal },
  data() {
    return {
      isCart: 1,
      objURL: {
        add: "http://120.76.160.41:3000/crossAdd?page=mabang-address",
        modify: "000",
        list: "http://120.76.160.41:3000/crossList?page=mabang-address",
        delete: "000"
      },
      tableData: [],
      userAddress: []
    };
  },
  methods: {
    //----------点击选中函数-------
    shopCheckbox(item) {
      this.isCart = item.P1; //对当前节点的状态取反
      console.log("shopCheckbox", item.isCart);

      // 把地址存在本地
      localStorage.postAddress = JSON.stringify(item);
      if (this.$route.query.Address) {
        this.$router.push({ path: "/" + this.$route.query.Address + "" }); //跳转到
      }

      // this.$store.commit("confirmOrderAddressFun", item);
    },
    form(item) {
      this.$store.commit("memberAddressModify", item);
      // 如果有路由id，就会跳转到listAddModify的同时，并传递路由id
      if (this.$route.query.Address) {
        this.$router.push({
          path: "/listAddModify?Address=" + this.$route.query.Address + ""
        });
      } else {
        this.$router.push({ path: "/listAddModify" }); //跳转到listAddModify
      }
    },
    submitForm() {
      // 如果有路由id，就会跳转到listAdded的同时，并传递路由id
      if (this.$route.query.Address) {
        //如果有配置路由id
        this.$router.push({
          path: "/listAdded?Address=" + this.$route.query.Address + ""
        });
      } else {
        this.$router.push({ path: "/listAdded" }); //跳转到listAdded
      }
    },
    getProList() {
      axios({
        //请求接口
        method: "post",
        // url: this.objURL.list,
        url: this.objURL.list,
        //data: this.Objparma //传递参数
        data: {
          findJson: {
            userName:  localStorage.loginUserName
          }
        }
      })
        .then(response => {
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值
          this.tableData = list;
          console.log("this.tableData", this.tableData);
          this.page = page;
          this.allCount = page.allCount; //更改总数据量
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },
  mounted() {
    // this.userAddress = localStorage.loginnickName;
    // alert(this.userAddress);
    this.getProList();
  },
  created() {
    if (localStorage.postAddress) {
      this.isCart = JSON.parse(localStorage.postAddress).P1;
    } else {
      this.isCart = 1;
    }
  },
  created() {
if (localStorage.postAddress) {
this.isCart = JSON.parse(localStorage.postAddress).P1;
}
},
  beforeCreate() {
    console.log(" memberAddress主页面>>", this.$route.query.Address);

   
  }
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
.added {
  position: fixed;
  bottom: 50px;
  left: 0%;
  color: #fff;
  background-color: #f44;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.shop-checkbox-box {
  float: left;
  height: 52px;
  line-height: 52px;
  margin-top: 20px;
}
.shop-checkbox {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;
  // margin-top: 16px;
  // margin-right: 8px;
  position: relative;
  top: -20%;
  left: 0;
  border: #ddd 1px solid;
}
// ------选中状态的样式------
.isChecked .shop-checkbox {
  background-color: red;
  border: 0;
}
.isChecked .el-icon-check {
  display: block;
}
.el-icon-check {
  display: none;
  font-weight: bold;
  color: #fff;
}
</style>