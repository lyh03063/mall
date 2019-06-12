<template>
  <div>
    <div class="item" @click="start()">{{count}}</div>
    <div class="defense" v-if="isOpen"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
      isOpen: false
    };
  },
  methods: {
    reciprocal(count) {
      this.count--;
      if (this.count == 0) {
        clearInterval(this.time);
        this.isOpen = false;
         this.count=5
      }
    },
    start() {
      this.time = setInterval(this.reciprocal, 1000);
      this.isOpen = true;
    }
  }
};
</script>

<style>
.item {
  width: 40px;
  height: 25px;
  border: 1px solid black;
  text-align: center;
  line-height: 25px;
  position: relative;
}
.defense {
  width: 40px;
  height: 25px;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
 
}
</style>
