<template>
  <div class>
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
        listIndex: "listProduct", //vuex对应的字段
        title: "商品列表",
        url: {
          list: "http://120.76.160.41:3000/crossGetList", //列表接口
          add: "http://120.76.160.41:3000/crossAdd", //新增接口
          modify: "http://120.76.160.41:3000/crossModify", //修改接口
          delete: "http://120.76.160.41:3000/crossDelete" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "商品编号",
            prop: "P1",
            width: 100
          },
          {
            label: "商品名称",
            prop: "P2",
            width: 200,
            formatter(row, column) {//格式器
              return `产品：${row.P2}`;
            }
          },
          {
            label: "品牌",
            prop: "P3",
            width: 100
          },
          {
            label: "系统类型",
            prop: "system",
            width: 100
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "商品编号",
            prop: "proId",
            type: "input"
          },
           {
            label: "商品编号2",
            prop: "proId2",
            type: "input"
          },
          {
            label: "系统类型",
            prop: "system",
            type: "select",
            options: [
              { label: "安卓/Android", value: "安卓" },
              { label: "苹果/IOS", value: "苹果" }
            ]
          },
          {
            label: "品牌",
            prop: "brandMuti",
            type: "checkbox",
            options: [
              { label: "小米", value: "小米" },
              { label: "华为", value: "华为" },
              { label: "苹果", value: "苹果" }
            ]
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "商品编号",
            prop: "P1"
          },
          {
            label: "商品名称",
            prop: "P2"
          },
          {
            label: "系统类型",
            prop: "system"
          },
          {
            label: "品牌",
            prop: "P3"
          },
          {
            label: "详情",
            prop: "P4",
            type: "html"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "产品名称",
            prop: "P2",
            type: "input"
            // forbidAdd: true
          },
          {
            label: "品牌",
            prop: "P3",
            type: "radio",
            options: [
              { label: "小米", value: "小米" },
              { label: "华为", value: "华为" },
              { label: "苹果", value: "苹果" }
            ]
            // forbidModify: true
          },
          {
            label: "系统类型",
            prop: "system",
            type: "select",
            options: [
              { label: "安卓/Android", value: "安卓" },
              { label: "苹果/IOS", value: "苹果" }
            ]
          },
          {
            label: "详情",
            prop: "P4",
            type: "editor"
          }
        ]
      }
    };
  },
  beforeCreate() {
    this.$store.commit("changeActiveMenu", "listProduct"); //菜单聚焦
  }
};
</script>


<style>
</style>
