<template>
  <div class="header-wrapper">
    <div class="icon"></div>
    <div class="text">Music Player</div>
    <span class="center" @click="toCenter">中</span>
  </div>
</template>

<script>
export default {
  name: "m-header",
  methods: {
    toCenter() {
      // this.$router.push("/user");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/common/less/variable.less");
.header-wrapper {
  background-color: #db6159;
  padding: 5px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  .icon {
    width: 33px;
    height: 33px;
    background: url("~@/common/img/topbar.png") no-repeat 0 10.44%;
    margin-right: 10px;
  }
  .text {
    font-size: @font-size-large;
  }
  .center {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 12px;
    font-size: 20px;
    color: @color-theme;
  }
}
</style>