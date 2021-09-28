<template>
  <div class="loading-wrapper">
    <div class="content">
      <img src="./loading.gif" width="24" height="24" alt />
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入...",
    },
  },
};
</script>

<style lang='less' scoped>
@import url("~@/common/less/variable");
.loading-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: center;
      line-height: 20px;
      font-size: @font-size-small;
      color: yellow;
    }
  }
}
</style>