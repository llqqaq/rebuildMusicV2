<template>
  <!-- 导航 -->
  <div class="tab-wrapper">
    <router-link tag="div" to="/recommend" class="item">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" to="/singer" class="item">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" to="/rank" class="item">
      <span>排行</span>
    </router-link>
    <router-link tag="div" to="/search" class="item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tab",
};
</script>

<style lang='less'>
@import url('~@/common/less/variable.less');
 .tab-wrapper {
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: @font-size-medium;
    position: relative;
    // z-index: 1000;
    .item {
      flex: 1;
      text-align: center;
      span {
        padding-bottom: 5px;
        color: @color-text-l;
      }
      &.router-link-active {
        span {
          color: @color-theme;
          border-bottom: 2px solid @color-theme;
        }
      }
    }
  }
</style>