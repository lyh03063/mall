<template>
  <div class="select-date" style="top:50px;position:">
    <div class="select-day">
      <el-tabs tab-position="left" @tab-click="tabclick">
        <el-tab-pane :label="item.name" v-for="(item,index) in day" :key="index">
          <div>
            <template>
              <template v-for="(time,key) in timeList">
                <div
                  class="Thetime"
                  v-if="index==0"
                  :class="{isOpen:key==isOpen}"
                  :key="key"
                  @click="gotiem(item.value,time.name,key)"
                >{{time.name}}</div>
              </template>

              <template v-for="(time,key) in timeList1">
                <div
                  class="Thetime"
                  v-if="index==1"
                  :class="{isOpen:key==isOpen}"
                  :key="key"
                  @click="gotiem(item.value,time.name,key)"
                >{{time.name}}</div>
              </template>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="select-time"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: [],
      timeList: [],
      timeList1: [],
      isOpen: 0,
      activeName: 0
    };
  },
  methods: {
    gotiem(day, time, key) {
      this.isOpen = key;
      console.log("day", day);
      console.log("time", time);
      this.$emit("gotiem", { day, time });
    },
    tabclick(tab) {
      this.isOpen = 0;
      this.activeName = tab.index;
    }
  },
  mounted() {
    var date = new Date();
    var month = date.getMonth(); //月份
    var strDate = date.getDate();
    let day = [
      {
        name: "今天(" + (month + 1) + "月" + strDate + "号)",
        value: month + 1 + "月" + strDate + "号"
      },
      {
        name: "明天(" + (month + 1) + "月" + (strDate + 1) + "号)",
        value: month + 1 + "月" + (strDate + 1) + "号"
      }
    ];
    var hour = date.getHours();
    let timeList = [];

    for (var i = 0; i <(18-hour); i++) {
      if (hour < 18) {
        timeList.push({
          name: hour + i + ":00--" + (hour + 1 + i) + ":00",
          prop: hour
        });
      }
    }

    let timeList1 = [];
    for (var i = 0; i < 10; i++) {
      timeList1.push({
        name: 9 + i + ":00--" + (9 + 1 + i) + ":00"
      });
    }
    console.log("timeList1", timeList1);
    this.day = day;
    this.timeList = timeList;
    this.timeList1 = timeList1;
  }
};
</script>

<style>
.isOpen {
  color: red;
  /* padding:10px 0 */
}
.Thetime {
  padding: 8px 0;
  /* position: fixed; */
  /* bottom:50px; */
  /* top: 50% */
}

</style>