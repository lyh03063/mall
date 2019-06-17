<template>
  <div class="main">
    <el-form
      :model="modifyForm"
      :rules="rules"
      ref="ruleForm"
      label-width="50px"
      class="demo-ruleForm"
      size="small"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="modifyForm.name" placeholder="收货人姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="modifyForm.phone" placeholder="收货人手机号"></el-input>
      </el-form-item>


      <el-form-item label="地区" prop="area">
        <el-cascader :options="options" v-model="cityArray"></el-cascader>
      </el-form-item>

      <el-form-item label="详细地址" prop="extend">
        <el-input type="textarea" v-model="modifyForm.extend" placeholder="街道门牌、楼层房间号等信息"></el-input>
      </el-form-item>

      <button class="modifyAdd" @click="modifyAddress()">保存并使用</button>

      <button class="deleteButton" @click="deleteForm()">删除收货地址</button>
    </el-form>
  </div>
</template>


<script>
import { provinceAndCityData,CodeToText,TextToCode } from 'element-china-area-data'
export default {
  components: {},

  data() {
    return {
      cityArray: [],
     options:option,
      objURL: {
        add: "http://120.76.160.41:3000/crossAdd?page=mabang-address",
        modify: "http://120.76.160.41:3000/crossModify?page=mabang-address",
        list: "http://120.76.160.41:3000/crossList?page=mabang-address",
        delete: "http://120.76.160.41:3000/crossDelete?page=mabang-address"
      },
      // modifyForm: {
      //   // name: "",
      //   // phone: "",
      //   // area: "",
      //   // extend: "",
      //   // userName: ""
      // },

      //验证表单
      rules: {
        name: [
          { required: true, message: "请填写收货人姓名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入收货人电话", trigger: "blur" }
          // { min: 11, message: "请输入正确11位电话号码", trigger: "blur" }
        ],
        extend: [{ required: true, message: "请填写详细地址", trigger: "blur" }]
      }
    };
  },

  methods: {
    deleteForm() {
      this.$confirm("是否继续删除收货信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios({
          //请求删除接口
          method: "post",
          // url: this.objURL.list,
          url: this.objURL.delete,
          data: {
            findJson: {
              P1: this.modifyForm.P1
            }
          } //传递参数
        }).then(response => {
          this.$message({
            message: "删除成功",
            duration: 1000,
            type: "success"
          });
        
          if (this.$route.query.Address) {
                // 如果有路由id，就会跳转到memberAddress的同时，并传递路由id
            this.$router.push({
              path: "/memberAddress?Address=" + this.$route.query.Address + ""
            }); 
          } else {
            this.$router.push({ path: "/memberAddress" }); //跳转到memberAddress
          }
        });
      });
    },
    modifyAddress() {
      
      this.modifyForm.area = this.cityArray.join(" ");
      console.log("this.modifyForm.area", this.modifyForm.area);
        console.log("this.modifyForm.P1",this.modifyForm.P1);
          console.log(" this.modifyForm", this.modifyForm);
      axios({
        //请求修改接口
        method: "post",
        // url: this.objURL.list,
        url: this.objURL.modify,
        data: {
          findJson: {
            P1: this.modifyForm.P1
          },
          modifyJson: this.modifyForm
        } //传递参数
      })
        .then(response => {
             
          this.$message({
            message: "修改成功",
            duration: 1000,
            type: "success"
          });
          // 如果有路由id，就会跳转到memberAddress的同时，并传递路由id
          if (this.$route.query.Address) {
           
            this.$router.push({
              path: "/memberAddress?Address=" + this.$route.query.Address + ""
            }); //跳转到memberAddress
          } else {
            // 如果没有，就直接跳转到memberAddress，不带id
              
            this.$router.push({ path: "/memberAddress" }); //跳转到memberAddress
        
          }
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  }, 
  computed: {
    modifyForm() {
      //  alert(JSON.stringify(this.AddressModify_item))
      return this.$store.state.AddressModify_item;
      
    }
  }
};
</script>

<style lang="scss" >
.modifyAdd {
  display: block;
  margin: 0 auto;
  width: 98%;
  height: 44px;
  background-color: #f44;
  color: #fff;
  border: 0px;
}
.deleteButton {
  display: block;
  margin: 0 auto;
  width: 98%;
  height: 44px;
  margin-top: 20px;
  background-color: #fff;
  border: 0px;
}
</style>