<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view />
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import MHeader from "@/components/Header";
import Tab from "@/components/Tab";
import Player from '@/components/Player'
export default {
  name: "App",
  components: {
    MHeader,
    Tab,
    Player
  },
};
</script>
<style lang="less">
  #app {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
   * { touch-action: pan-y; } 
</style>
