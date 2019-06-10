<template>
<div class="" >
     <listData :cf="cfList"></listData>
</div>

</template>
<script>
import listData from "../components/list-data/list-data.vue";

export default {
  components: { listData },
  data() {
    return {
      cfList: {
        listIndex:"listCategory",//vuex对应的字段
        title: "分类列表",
        url: {
          list: "http://120.76.160.41:3000/crossGetList?page=category",//列表接口
          add: "http://120.76.160.41:3000/crossAdd?page=category",//新增接口
          modify: "http://120.76.160.41:3000/crossModify?page=category",//修改接口
          delete: "http://120.76.160.41:3000/crossDelete?page=category"//删除接口
        },
       //-------列配置数组-------
        columns: [
          {
            label: "分类编号",
            prop: "P1",
            width: 100
          },
          {
            label: "分类名称",
            prop: "name",
            width: 200
          }
        ],
         //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "分类编号",
            prop: "proId",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "分类编号",
            prop: "P1",
          },
          {
            label: "分类名称",
            prop: "name",
          },
          {
            label: "注释",
            prop: "remark",
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "分类名称",
            prop: "name",
            type: "input",
          },
          {
            label: "注释",
            prop: "remark",
            type: "textarea"
          },
        ],
       
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listCategory"); //菜单聚焦
  }
};

</script>


<style>
</style>
