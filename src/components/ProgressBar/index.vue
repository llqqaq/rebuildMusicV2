<template>
  <div class="progress-bar" ref="progressBar" @click="clickBar">
    <div class="bar-inner" ref="barInner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn"
        ref="progressBtn"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
      ></div>
    </div>
  </div>
</template>

<script>
const ballWidth = 13;
import { prefixStyle } from "@/common/js/dom";
const transform = prefixStyle("transform");
export default {
  name: "progress-bar",
  props: {
    percent: {
      typeof: Number,
      default: 0,
    },
  },
  created() {
    this.touch = {};
  },
  mounted() {
    this.barWidth = this.$refs.progressBar.clientWidth - ballWidth;
  },
  watch: {
    percent(newVal) {
      if (newVal > 0 && !this.touch.touchSatus) {
        const offsetX = newVal * this.barWidth;
        this._setOffsetX(offsetX);
      }
    },
  },
  methods: {
    touchstart(e) {
      this.touch.touchSatus = true;
      this.touch.offsetX = e.touches[0].pageX;
      this.touch.startX = this.$refs.progress.clientWidth;
    },
    touchmove(e) {
      console.log(this.touch);
      if (!this.touch.touchSatus) return;
      let diff = e.touches[0].pageX - this.touch.offsetX;
      diff = Math.max(0, Math.min(this.barWidth, diff + this.touch.startX));
      this._setOffsetX(diff);
    },
    touchend() {
      this.touch.touchSatus = false;
      this._sentPercent()
    },
    clickBar(e) {
        const x = e.pageX - this.$refs.progressBar.getBoundingClientRect().left
    //   const X = e.offsetX;
      this._setOffsetX(x);
      this._sentPercent()
    },
    _sentPercent() {
      const percent = this.$refs.progress.clientWidth / this.barWidth;
      this.$emit("setPercent", percent);
    },
    _setOffsetX(X) {
      this.$refs.progress.style.width = `${X}px`;
      this.$refs.progressBtn.style[transform] = `translate3d(${X}px, 0 , 0)`;
    },
  },
};
</script>

<style lang='less' scoped>
@import url("~@/common/less/variable.less");
.progress-bar {
  flex: 1;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  .bar-inner {
    position: relative;
    width: 100%;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      width: 0px;
      height: 100%;
      background: @color-theme;
    }
    .progress-btn {
      position: absolute;
      top: -5px;
      left: 0;
      width: 9px;
      height: 9px;
      border: 2px solid @color-text;
      border-radius: 50%;
      background: @color-theme;
    }
  }
}
</style>