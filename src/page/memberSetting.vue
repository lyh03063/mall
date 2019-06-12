<template>
  <div class="H500" style="background-color: rgb(248, 248, 248)" v-if="memberMessage!=''">
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
        >{{memberMessage[activeMenuIndex].nickName}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">手机号</div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">{{memberMessage[activeMenuIndex].phone}}</div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowGender = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">性别</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage[activeMenuIndex].gender=setGender(memberMessage[activeMenuIndex].sex)}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowBirthday= true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">生日</div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">{{memberMessage[activeMenuIndex].birthday}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowCity = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">地区</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage[activeMenuIndex].city}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowWechat=true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">微信号</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage[activeMenuIndex].wechat}}&nbsp;></div>
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
        <el-button type="primary" @click="memberMessage[activeMenuIndex].nickName=closeName(isShowName,name)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 性别弹框 -->
    <el-dialog title="请选择您的性别" :visible.sync="isShowGender" width="100%" top="150px" @close="modifyMessage">
      <el-radio v-model="memberMessage[activeMenuIndex].sex" label="1">男</el-radio>
      <el-radio v-model="memberMessage[activeMenuIndex].sex" label="0">女</el-radio>
      <el-radio v-model="memberMessage[activeMenuIndex].sex" label="2">保密</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="memberMessage[activeMenuIndex].gender=closeGender(isShowGender,memberMessage[activeMenuIndex].sex)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生日弹框 -->
    <el-dialog title="请选择您的生日" :visible.sync="isShowBirthday" width="100%" top="0px" @close="modifyMessage">
      <el-select v-model="birthday[0]" placeholder="请选择">
    <el-option
      v-for="month in months"
      :key="month"
      :label="month"
      :value="month">
    </el-option>
  </el-select>
      <el-select v-model="birthday[1]"  placeholder="请选择">
    <el-option
      v-for="day in days"
      :key="day "
      :label="day"
      :value="day ">
    </el-option>
  </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowBirthday=false">取 消</el-button>
        <el-button type="primary" @click="memberMessage[activeMenuIndex].birthday=closeBirthday(isShowBirthday,birthday)">确 定</el-button>
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
          @click="memberMessage[activeMenuIndex].city=closeCity(isShowCity,cityArray)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 微信号弹框 -->
    <el-dialog title="请输入您的微信号" :visible.sync="isShowWechat" width="100%" top="150px" @close="modifyMessage">
      <el-input  placeholder="请输入您的微信号" v-model="myWeChat"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowWechat=false">取 消</el-button>
        <el-button type="primary" @click="memberMessage[activeMenuIndex].wechat=closeWechat(isShowWechat,myWeChat)">确 定</el-button>
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
      options:option,
      name:"",
      myWeChat:"",
      birthday:["",""],
      cityArray: [],
      isShowName: false,
      isShowHeadPortrait: false,
      isShowGender: false,
      isShowBirthday: false,
      isShowCity: false,
      isShowTooltip: false,
      isShowWechat: false,
      months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",],
      days:["一号","二号","三号","四号","五号","六号","七号","八号","九号","十号",
      "十一号","十二号","十三号","十四号","十五号","十六号","十七号","十八号","十九号","二十号",
      "二十一号","二十二号","二十三号","二十四号","二十五号","二十六号","二十七号","二十八号","二十九号","三十号","三十一号"],
      memberMessage: [],
     
    };
  },
  methods: {
    getProList() {
      //获取产品列表函数
      axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=mabang-member",
        // data: this.Objparma //传递参数
      })
        .then(response => {
          //这有函数，不知道this指向谁
          console.log("第一次请求结果", response.data);
          let { list } = response.data; //解构赋值
          this.memberMessage = list;
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
          P1: this.memberMessage[this.activeMenuIndex].P1
        },
        
        modifyJson: this.memberMessage[this.activeMenuIndex]
      } //传递参数
    })
      .then(response => {
        console.log("第一次请求结果", this.memberMessage),
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
      let string = birthday.join(" ");
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
  computed:{
    activeMenuIndex(){
      return this.$store.state.activeMenuIndex;
    }
  },
   mounted() {
    this.getProList(); 
    
  },
  beforeCreate() {
    if(localStorage.isLogin == "1"){
      this.$router.push({ path:"/login"})
    }
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