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
        >{{memberMessage.name}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">手机号</div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">{{memberMessage.phone}}</div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowGender = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">性别</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage.gender}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowBirthday= true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">生日</div>
        <div style="float: right; color: rgb(138, 138, 138);font-size:15px;">{{memberMessage.birthday}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowCity = true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">地区</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage.city}}&nbsp;></div>
      </div>
    </div>
    <div class="memberSetting-message" style="cursor:pointer" @click="isShowWechat=true">
      <div class="message-box">
        <div style="float: left; margin-left:0px;">微信号</div>
        <div
          style="float: right; color: rgb(138, 138, 138);font-size:15px;"
        >{{memberMessage.wechat}}&nbsp;></div>
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
    <el-dialog :visible.sync="isShowHeadPortrait" width="100%" top="150px">
      <div @click="isShowHeadPortrait=false" class="headPortrait-box">是否使用微信头像</div>
      <div @click="isShowHeadPortrait=false" class="headPortrait-box">取消</div>
    </el-dialog>
    <!-- 姓名弹框 -->
    <el-dialog title="请输入您的姓名" :visible.sync="isShowName" width="100%" top="150px">
      <el-input placeholder="请输入您的姓名" v-model="memberMessage.name" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="memberMessage.name=closeName(isShowName,memberMessage.name)">取 消</el-button>
        <el-button type="primary" @click="isShowName=false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 性别弹框 -->
    <el-dialog title="请选择您的性别" :visible.sync="isShowGender" width="100%" top="150px">
      <el-radio v-model="memberMessage.gender" label="男">男</el-radio>
      <el-radio v-model="memberMessage.gender" label="女">女</el-radio>
      <el-radio v-model="memberMessage.gender" label="保密">保密</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowGender=false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生日弹框 -->
    <el-dialog title="请选择您的生日" :visible.sync="isShowBirthday" width="100%" top="0px">
      <div style="margin-bottom:10px;"><el-input placeholder="年" v-model="birthday[0]" ></el-input>
      </div>
      <div style="margin-bottom:10px;"><el-input placeholder="月" v-model="birthday[1]"></el-input>
      </div>
      <div><el-input placeholder="日" v-model="birthday[2]"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowBirthday=false">取 消</el-button>
        <el-button type="primary" @click="memberMessage.birthday=closeBirthday(isShowBirthday,birthday)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 城市弹框 -->
    <el-dialog title="请选择您的城市" :visible.sync="isShowCity" width="100%" top="50px">
      <div class="block">
        <el-cascader v-model="cityArray" :options="options"></el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCity=false">取 消</el-button>
        <el-button
          type="primary"
          @click="memberMessage.city=closeCity(isShowCity,cityArray)"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 微信号弹框 -->
    <el-dialog title="请输入您的微信号" :visible.sync="isShowWechat" width="100%" top="150px">
      <el-input :value="memberMessage.wechat" v-model="memberMessage.wechat"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="memberMessage.wechat=closeWechat(isShowWechat,memberMessage.wechat)">取 消</el-button>
        <el-button type="primary" @click="isShowWechat=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      memberMessage: {
        name: "",
        phone: "",
        gender: "",
        birthday: "",
        city: "",
        wechat: ""
      },
      options: [
        {
          value: "广东省",
          label: "广东省",
          children: [
            {
              value: "广州市",
              label: "广州市",
              children: [
                {
                  value: "白云区",
                  label: "白云区"
                }
              ]
            },
            {
              value: "深圳市",
              label: "深圳市",
              children: [
                {
                  value: "龙岗区",
                  label: "龙岗区"
                }
              ]
            },
            {
              value: "汕头市",
              label: "汕头市",
              children: [
                {
                  value: "朝南区",
                  label: "朝南区"
                }
              ]
            },
            {
              value: "佛山市",
              label: "佛山市",
              children: [
                {
                  value: "南海区",
                  label: "南海区"
                }
              ]
            }
          ]
        },
        {
          value: "江西省",
          label: "江西省",
          children: [
            {
              value: "南昌区",
              label: "南昌区",
              children: [
                {
                  value: "东湖区",
                  label: "东湖区"
                }
              ]
            }
          ]
        },
        {
          value: "北京市",
          label: "北京市",
          children: [
            {
              value: "东城区",
              label: "东城区"
            }
          ]
        },
        {
          value: "上海市",
          label: "上海市",
          children: [
            {
              value: "黄埔区",
              label: "黄埔区"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getProList() {
      //获取产品列表函数
      axios({
        //请求接口
        method: "post",
        url: "http://120.76.160.41:3000/crossList?page=mabang-member",
        data: this.memberMessage //传递参数
      })
        .then(response => {
          //这有函数，不知道this指向谁
          console.log("第一次请求结果", response.data);
          let { list, page } = response.data; //解构赋值
          this.tableData = list;
          this.page = page;
          this.allCount = page.allCount;
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
    closeName(isShowName,memberName){
      this.isShowName=false
      if(memberName != ""){
        name=memberName
      }else{name =""}
      return name;
    },
    closeWechat(isShowWechat,weChat){
      this.isShowWechat=false
      if(weChat != ""){
        name=weChat
      }else{name =""}
      return name;
    }
    
  },
  created() {
    this.memberMessage.phone = "123456789";
  },
   mounted() {
    this.getProList(); 
  }
};
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