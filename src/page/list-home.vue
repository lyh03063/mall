<template>
  <div class="main">
    <div class="TAC">
      <space height="80"></space>
      <h1 class="FS24">欢迎使用管理后台</h1>
      <div class="time">上次登录时间：2019-5-18</div>
    </div>

    <div class="box1">
      <h1 class>标题栏文字</h1>
    </div>

    <div class="box2">
      <h1 >标题栏文字</h1>
    </div>
    <div class="box3">
      <h1 >标题栏文字</h1>
    </div>
  </div>
</template>



<style lang="scss" >
@import "../assets/css/util.scss";//导入公共样式文件


.title-bar{
   color: #000;
    font-weight: 700;
    border: 1px solid #000
}

.box1 {
  width: $boxWidth;
  height: 100px;
  background-color: aqua;
  h1 {
    @extend .title-bar;
  }
  &:hover {
    background-color: red;
  }
  // &:before {
  //   content: "I ate #{5 + $boxHeight} pies!";
  // }
  @media screen and (max-width: 900px) {
    /*屏幕宽度小于900px*/
    background-color: yellow;
  }
}

.box2 {
  width: $boxWidth;
  height: $boxHeight;
  background-color: red;
   h1 {
    @extend .title-bar;
  }
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -$boxWidth/2;
  margin-top: -$boxHeight/2;
}

.box3 {
  width: $boxWidth;
  height: 100px;
  background-color: green;
   h1 {
    @extend .title-bar;
  }
}
</style>