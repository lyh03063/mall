<template>
  <div class="main">
    <div class="P20 " v-for="item in box"  :key="item.box">
      <div class="receipt-name " >{{item.recipt_name}},{{item.recipt_phone}} </div>
      <div class="receipt-region FL OFH" >{{item.recipt_region}}</div>
      <div class="receipt-modify FR "> 修改</div>
    </div>
    
     <div class="added"  @click="submitForm('ruleForm')"> 新增地址 </div>
      
  </div>
</template>

<script>

export default {
  components: {},
 data() {
   return{
     objURL: {
        add: "000",
        modify: "000",
        list: "http://120.76.160.41:3000/crossList?page=mabang-address",
        delete: "000"
      },
   box:[
     {
       recipt_name:"name",recipt_phone:"phone",
       recipt_region:"aaa"
     }
   ]
}

 }, methods:{
   submitForm(formName) {
      this.$router.push({path:'/listAdded'})//跳转到listAdded
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
          this.page = page;
          this.allCount = page.allCount; //更改总数据量
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },


 }

}
</script>

<style lang="scss" >
@import "../assets/css/util.scss";//导入公共样式文件

 .added{
    position:fixed;
    top:93.5%;
    left:0%;
   color:#fff;
   background-color: #f44;
   width:100%;
   height:50px;
   text-align: center;
   line-height:50px;

 }

</style>