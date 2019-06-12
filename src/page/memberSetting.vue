<template>
  <div class="H500" style="background-color: rgb(248, 248, 248)">
    <div class="H50" style="color:rgb(153,153,153);line-height: 50px; padding-left:1%">基本信息</div>
    <div class="memberSetting-message" style="cursor:pointer" @click=" isShowHeadPortrait = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">头像</div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">&nbsp;></div>
      </div>
    </div>

    <div class="memberSetting-message" style="cursor:pointer" @click="isShowName = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">姓名</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage[0].userName}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">手机号</div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">{{memberMessage[0].phone}}</div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowGender = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">性别</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage[0].gender=setGender(memberMessage[0].sex)}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowBirthday= true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">生日</div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">{{memberMessage[0].birthday}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowCity = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">地区</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage[0].city}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowWechat=true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">微信号</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage[0].wechat}}&nbsp;></div>
      </div>
    </div>
    <router-link to="/memberAddress">
      <div class="memberSetting-message" style="cursor:pointer">
        <div class="message-box">
          <div style="float: left; margin-left:0px;">收货地址</div>
          <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">&nbsp;></div>
        </div>
      </div>
    </router-link>
    
    <!-- 头像弹框 -->
    <el-dialog :visible.sync="isShowHeadPortrait" width="100%" top="150px" @close="modifyMessage">
      <div @click="isShowHeadPortrait=false" class="headPortrait-box">是否使用微信头像</div>
      <div @click="isShowHeadPortrait=false" class="headPortrait-box">取消</div>
    </el-dialog>
    <!-- 姓名弹框 -->
    <el-dialog title="请输入您的姓名" :visible.sync="isShowName" width="100%" top="150px" @close="modifyMessage">
      <el-input placeholder="请输入您的姓名" v-model="name" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowName=false">取 消</el-button>
        <el-button type="primary" @click="memberMessage[0].userName=closeName(isShowName,name)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 性别弹框 -->
    <el-dialog title="请选择您的性别" :visible.sync="isShowGender" width="100%" top="150px" @close="modifyMessage">
      <el-radio v-model="memberMessage[0].sex" label="1">男</el-radio>
      <el-radio v-model="memberMessage[0].sex" label="0">女</el-radio>
      <el-radio v-model="memberMessage[0].sex" label="2">保密</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="memberMessage[0].gender=closeGender(isShowGender,memberMessage[0].sex)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生日弹框 -->
    <el-dialog title="请选择您的生日" :visible.sync="isShowBirthday" width="100%" top="0px" @close="modifyMessage">
      <div style="margin-bottom:10px;"><el-input placeholder="年" v-model="birthday[0]" ></el-input>
      </div>
      <div style="margin-bottom:10px;"><el-input placeholder="月" v-model="birthday[1]"></el-input>
      </div>
      <div><el-input placeholder="日" v-model="birthday[2]"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowBirthday=false">取 消</el-button>
        <el-button type="primary" @click="memberMessage[0].birthday=closeBirthday(isShowBirthday,birthday)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 城市弹框 -->
    <el-dialog title="请选择您的城市" :visible.sync="isShowCity" width="100%" top="50px" @close="modifyMessage">
      <div class="block">
        <el-cascader v-model="cityArray" :options="options"></el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCity=false">取 消</el-button>
        <el-button
          type="primary"
          @click="memberMessage[0].city=closeCity(isShowCity,cityArray)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 微信号弹框 -->
    <el-dialog title="请输入您的微信号" :visible.sync="isShowWechat" width="100%" top="150px" @close="modifyMessage">
      <el-input  placeholder="请输入您的微信号" v-model="myWeChat"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowWechat=false">取 消</el-button>
        <el-button type="primary" @click="memberMessage[0].wechat=closeWechat(isShowWechat,myWeChat)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options:option,
      name:"",
      myWeChat:"",
      birthday:["","",""],
      cityArray: [],
      isShowName: false,
      isShowHeadPortrait: false,
      isShowGender: false,
      isShowBirthday: false,
      isShowCity: false,
      isShowTooltip: false,
      isShowWechat: false,
      // message: "请填写",
      memberMessage: [{
        
        phone: "",
        gender: "男",
        birthday: "",
        city: "",
        wechat: ""
      }],
     
    };
  },
  methods: {
    getProList() {
      //获取产品列表函数
      axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=mabang-member",
        data: this.Objparma //传递参数
      })
        .then(response => {
          //这有函数，不知道this指向谁
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值
          this.memberMessage = list;
          this.page = page;
          this.allCount = page.allCount;
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    },
    modifyMessage(){
      axios({
      //请求接口
      method: "post",
      url: "http://120.76.160.41:3000/crossModify?page=mabang-member",
      data: {
        findJson: {
          P1: this.memberMessage[0].P1
        },
        
        modifyJson: this.memberMessage[0]
      } //传递参数
    })
      .then(response => {
        console.log("第一次请求结果", this.memberMessage,this.options),
        // this.$message({
        //   message: "修改产品成功",
        //   duration: 1500,
        // });
        this.getProList();
      })
      .catch(function(error) {
        alert("异常:" + error);
      });
    },
    closeCity(isShowCity, cityArray) {
      this.isShowCity = false;
      let string = cityArray.join(" ");
      return string;
    },
    closeBirthday(isShowBirthday,birthday){
      this.isShowBirthday = false;
      let string = birthday.join("-");
      return string;
    },
    closeName(isShowName,name){
      this.isShowName=false
          return name;
    },
    closeGender(isShowGender,sex){
      this.isShowGender =false;
      if(sex == "0"){
        return "女"
      }else if(sex == "1"){
        return "男"
      }else{
        return "保密"
      }
    },
    setGender(sex){
      if(sex == "0"){
        return "女"
      }else if(sex == "1"){
        return "男"
      }else{
        return "保密"
      }
    },
    closeWechat(isShowWechat,weChat){
      this.isShowWechat=false
      return weChat;
    }
  },
  created() {
    
  },
   mounted() {
    this.getProList(); 
    
  }
}
</script>


<style lang="scss" >
@import "../assets/css/util.scss"; //导入公共样式文件
.memberSetting-message {
  background-color: rgb(255, 255, 255);
  height: 45px;
  line-height: 45px;
  
}

.message-box {
  width: 100%;
  border-width: 0 0 2px 0;
  border-style: solid;
  border-color: rgb(248, 248, 248);
  margin-left: 10px;
  padding-right: 25px;
}

.memberSetting-message:active {
  background-color: rgb(232, 232, 232);
}
.headPortrait-box {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
}
.headPortrait-box:hover {
  background-color: #38f;
  color: white;
}
.data-bigbox {
  height: 150px;
  overflow: hidden;
  transition: 1s;
  background-color: gray;
  width: 100%;
}
.data-leftboox {
  width: 33%;
  height: 100%;
  float: left;
  background-color: blue;
  overflow: hidden;
  transition: 1s;
}
.data-centerboox {
  width: 33%;
  height: 100%;
  float: left;
  background-color: yellow;
  overflow: hidden;
  transition: 1s;
}
.data-rightboox {
  width: 33%;
  height: 100%;
  float: left;
  background-color: red;
  overflow: hidden;
  transition: 1s;
}
</style>