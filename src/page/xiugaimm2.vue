<template>
 <div class="slider-item">
    <div
      class="content"
      @touchstart='touchStart'
      @touchmove='touchMove'
      @touchend='touchEnd'
      :style="deleteSlider"
    >
      <div class="remove">删除</div>
    </div>
  </div>

</template>
<script>
// 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
const DELBTNWIDTH = 60;
export default {
  data() {
    return {
      startX: 0, // 开始pos
      endX: 0, // 结束pos
      moveX: 0, // 滑动时的pos
      disX: 0, // 滑动距离
      deleteSlider: 'transform:translateX(0px)',
    };
  },
  methods: {
    touchStart(timestamp, ev) {
      ev = ev || event;
      this.currSliderTimestamp = timestamp;
      this.startX = 0;
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
        console.log(this.startX, this.disX);
      }
    },
    touchMove(timestamp, ev) {
      ev = ev || event;
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX;
        //实时滑动距离，和上一次滑动做个衔接。防止第二次触发的时候，位置不对的问题
        this.disX = this.startX - this.moveX + this.disX;
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX > 0) {
          if (this.disX < 100) {
            this.deleteSlider = 'transform:translateX(-' + this.disX + 'px)';
          } else {
            this.deleteSlider = 'transform:translateX(-100px)';
          }
        } else {
          if (this.disX < -60) {
            this.deleteSlider = 'transform:translateX(60px)';
          } else {
            this.deleteSlider = 'transform:translateX(' + Math.abs(this.disX) + 'px)';
          }
        }
      }
    },
    touchEnd() {
      //滑动完成后，滑块应该在的位置
      if (this.disX < 100) {
        this.deleteSlider = 'transform:translateX(0px)';
        this.disX = 0;
      } else {
        this.deleteSlider = 'transform:translateX(-' + DELBTNWIDTH + 'px)';
        this.disX = 60;
      }
    },
  },
};

</script>

<style lang="scss">
.slider-item {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
  display: flex;
  position: relative;
 
  .content {
    min-width: 100%;
    height: 100%;
    background: yellow;
    box-sizing: normal-box;
    padding-right: 60px;
    position: relative;
    transition-property: all;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0, 0.85, 0.72, 0.86);
    transition-delay: 0s;
 
    .remove {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 60px;
      background: #fe5ba8;
      text-align: center;
      line-height: 60px;
      font-size: 15px;
      color: #ffffff;
    }
  }
}

@import "../assets/css/util.scss"; //导入公共样式文件
</style>