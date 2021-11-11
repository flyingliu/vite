<template>
  <router-view></router-view>
</template>

<script setup></script>

<style lang="scss">
@import '/@/assets/css/main.scss';
$c: #395260;
:root {
  --el-color-primary: #395260 !important;
  --el-button-background-color: #395260 !important;
}

.el-button--primary {
  --el-button-font-color: #ffffff;
  --el-button-background-color:#395260!important;
  --el-button-border-color: #2a5785!important;
  --el-button-hover-color: #2c639e!important;
  --el-button-active-font-color: #e6e6e6;
  --el-button-active-background-color: #395260!important;
  --el-button-active-border-color: #395260!important;
}
</style>
