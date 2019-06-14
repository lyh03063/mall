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
        v-if="selection"
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
  components: { listAdded, listAddModify,portal },
  data() {
    return {
      isCart: null,
      objURL: {
        add: "http://120.76.160.41:3000/crossAdd?page=mabang-address",
        modify: "000",
        list: "http://120.76.160.41:3000/crossList?page=mabang-address",
        delete: "000"
      },
      tableData: []
    };
  },
  methods: {
    //----------点击选中函数-------
    shopCheckbox(item) {
      this.isCart = item.P1; //对当前节点的状态取反
      console.log("shopCheckbox", item.isCart);
      this.$router.push({ path: "/confirmOrder" }); //跳转到listAddModify
      this.$store.commit("confirmOrderAddressFun", item);
    },
    form(item) {

      // let str = item.area.join("");
      // let arrArea = str.split("");
      // item.area = arrArea;
      //alert(JSON.stringify(item))
      this.$store.commit("memberAddressModify", item);

      this.$router.push({ path: "/listAddModify" }); //跳转到listAddModify
    },
    submitForm() {
      this.$router.push({ path: "/listAdded" }); //跳转到listAdded
    },
    getProList() {
      axios({
        //请求接口
        method: "post",
        // url: this.objURL.list,
        url: this.objURL.list,
        data: this.Objparma //传递参数
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
    this.getProList();
  },
  computed: {
    //计算属性
    //从vuex拿到数据
    selection() {
      return this.$store.state.selection;
    }
  },
  //  beforeCreate() {
  // //------------如果未登录------------
  // if (localStorage.isLogin == 0) {
  // this.$router.push({ path: "/login" }); //跳转到后台首页
  // } else {
  // this.$router.push({ path: "/home" });
  // }
  // console.log("beforeCreate-this.msg", this.msg);
  // }
};
</script>

<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
.added {
  position: fixed;
  bottom:50px;
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