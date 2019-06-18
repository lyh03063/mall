<template>
  <div class="H500" style="background-color: rgb(248, 248, 248)" v-if="memberMessage!=''">
    <div class="H50" style="color:rgb(153,153,153);line-height: 50px; padding-left:1%">基本信息</div>
    <div class="memberSetting-message" style="cursor:pointer" @click=" message.tooltip.isShowTooltip = true" v-for="(message,index) in messageInput" :key="index">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">{{message.message}}</div>
        <div style="float: right" v-if="!message.arrows">&nbsp;></div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">{{message.value}}</div>
        
      </div>
    </div>
    <router-link to="/memberAddress">
      <div class="memberSetting-message" style="cursor:pointer">
        <div class="message-box">
          <div style="float: left; margin-left:0px;">收货地址</div>
          <div style="float: right; color: rgb(138, 138, 138);font-size:15px;"></div>
        </div>
      </div>
    </router-link>
    
    <!-- 头像弹框 -->
    <el-dialog :visible.sync="messageInput[0].tooltip.isShowTooltip" width="100%" top="150px" @close="modifyMessage">
      <div @click="messageInput[0].tooltip.isShowTooltip=false" class="headPortrait-box">是否使用微信头像</div>
      <div @click="messageInput[0].tooltip.isShowTooltip=false" class="headPortrait-box">取消</div>
    </el-dialog>
    <!-- 姓名弹框 -->
    <el-dialog title="请输入您的姓名" :visible.sync="messageInput[1].tooltip.isShowTooltip" width="100%" top="150px" @close="modifyMessage">
      <el-input placeholder="请输入您的姓名" v-model="name" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageInput[1].tooltip.isShowTooltip=false">取 消</el-button>
        <el-button type="primary" @click="messageInput[1].value=closeName(name)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 性别弹框 -->
    <el-dialog title="请选择您的性别" :visible.sync="messageInput[3].tooltip.isShowTooltip" width="100%" top="150px" @close="modifyMessage">
      <el-radio v-model="memberMessage.sex" label="1">男</el-radio>
      <el-radio v-model="memberMessage.sex" label="0">女</el-radio>
      <el-radio v-model="memberMessage.sex" label="2">保密</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="messageInput[3].value=closeGender(memberMessage.sex)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生日弹框 -->
    <el-dialog title="请选择您的生日" :visible.sync="messageInput[4].tooltip.isShowTooltip" width="100%" top="0px" @close="modifyMessage">
            <el-cascader :options="birthdayOptions" v-model="birthday" placeholder="生日">
            </el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageInput[4].tooltip.isShowTooltip=false">取 消</el-button>
        <el-button type="primary" @click="messageInput[4].value=closeBirthday(birthday)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 城市弹框 -->
    <el-dialog title="请选择您的城市" :visible.sync="messageInput[5].tooltip.isShowTooltip" width="100%" top="50px" @close="modifyMessage">
      <div class="block">
        <el-cascader v-model="cityArray" :options="options"></el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageInput[5].tooltip.isShowTooltip=false">取 消</el-button>
        <el-button
          type="primary"
          @click="messageInput[5].value=closeCity(cityArray)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 微信号弹框 -->
    <el-dialog title="请输入您的微信号" :visible.sync="messageInput[6].tooltip.isShowTooltip" width="100%" top="150px" @close="modifyMessage">
      <el-input  placeholder="请输入您的微信号" v-model="myWeChat"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageInput[6].tooltip.isShowTooltip=false">取 消</el-button>
        <el-button type="primary" @click="messageInput[6].value=closeWechat(myWeChat)">确 定</el-button>
      </span>
    </el-dialog>
    <portal></portal>
  </div>
</template>
<script>
import portal from "../components/shift/portal";
export default {
  components: { portal },
  data() {
    return {
      birthdayOptions:birthdays,
      options:option,
      name:"",
      myWeChat:"",
      birthday:["",""],
      cityArray: [],
      months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",],
      days:["一号","二号","三号","四号","五号","六号","七号","八号","九号","十号",
      "十一号","十二号","十三号","十四号","十五号","十六号","十七号","十八号","十九号","二十号",
      "二十一号","二十二号","二十三号","二十四号","二十五号","二十六号","二十七号","二十八号","二十九号","三十号","三十一号"],
      memberMessage: [],
     messageInput:[
       {message:"头像",tooltip:{isShowTooltip:false},value:""},
       {message:"姓名",tooltip:{isShowTooltip:false},value:""},
       {message:"手机号",tooltip:{},value:"",arrows:true},
       {message:"性别",tooltip:{isShowTooltip:false},value:""},
       {message:"生日 ",tooltip:{isShowTooltip:false},value:""},
       {message:"地区",tooltip:{isShowTooltip:false},value:""},
       {message:"微信号",tooltip:{isShowTooltip:false},value:""},

     ]
    };
  },
  methods: {
    async getMemberMessage() {
      //获取产品列表函数
      let response = await axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossDetail?page=mabang-member",
        data: {
           id: localStorage.loginUserName,
            idKey: "userName"
        }
      }).catch(function(error) {
          alert("异常:" + error);
        });
        
          console.log("第一次请求结果", response.data);
          let  list  = response.data; //解构赋值
          this.memberMessage = list.Doc;
          console.log("第二次请求结果", this.memberMessage);
          this.messageInput[1].value = this.memberMessage.nickName;
          this.messageInput[2].value = this.memberMessage.userName;
          if(this.memberMessage.sex=="男"){
            this.messageInput[3].value = this.memberMessage.sex;
          }else if(this.memberMessage.sex=="女"){
            this.messageInput[3].value = this.memberMessage.sex;
          }else{
            this.memberMessage.sex = "保密";
            this.messageInput[3].value = this.memberMessage.sex;
          }       
          this.messageInput[4].value = this.memberMessage.birthday;
          this.messageInput[5].value = this.memberMessage.area;
          this.messageInput[6].value = this.memberMessage.wechat;
          console.log("第二次请求结果", this.memberMessage,this.memberMessage);
        
    },
    async modifyMessage(){
      let response = await axios({
      //请求接口
      method: "post",
      url: "http://120.76.160.41:3000/crossModify?page=mabang-member",
      data: {
        findJson: {
          P1: this.memberMessage.P1
        },
        
        modifyJson: this.memberMessage
      } //传递参数
    }).catch(function(error) {
        alert("异常:" + error);
      });
     
        this.getMemberMessage();
      
    },
    closeCity(cityArray) {
      this.messageInput[5].tooltip.isShowTooltip = false;
      let string = cityArray.join(" ");
      this.memberMessage.area = string
      return string;
    },
    closeBirthday(birthday){
      this.messageInput[4].tooltip.isShowTooltip = false;
      let string = birthday.join(" / ");
      this.memberMessage.birthday = string;
      return string;
    },
    closeName(name){
      this.messageInput[1].tooltip.isShowTooltip=false
      this.memberMessage.nickName = name;
          return name;
    },
    closeGender(sex){
     this.messageInput[3].tooltip.isShowTooltip =false;
      if(sex == "0"){
        this.memberMessage.sex = "女";
        return "女"
      }else if(sex == "1"){
        this.memberMessage.sex = "男"
        return "男"
      }else{
        this.memberMessage.sex = "保密"
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
    closeWechat(isShowTooltip,weChat){
      this.messageInput[6].tooltip.isShowTooltip=false
      this.memberMessage.wechat = weChat;
      return weChat;
    }
  },
  created() {
    
  },
  computed:{
   
  },
   mounted() {
    this.getMemberMessage(); 
    
  },
  beforeCreate() {
   util.cheackLogin(this)
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