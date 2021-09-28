<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <div class="pulldown-wrapper" v-if="openPullDown">
        <div v-show="beforePullDown">
          <span>Pull Down and refresh</span>
        </div>
        <div v-show="!beforePullDown">
          <div v-show="isPullingDown">
            <span>Loading...</span>
          </div>
          <div v-show="!isPullingDown">
            <span>Refresh success</span>
          </div>
        </div>
      </div>
      <slot></slot>
    </ul>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
BScroll.use(PullDown);
const TIME_BOUNCE = 800;
// const REQUEST_TIME = 1000;
const THRESHOLD = 70;
const STOP = 56;
export default {
  name: "scroll",
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false,
      pullDownRefresh: {
        threshold: THRESHOLD,
        stop: STOP,
      },
    };
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
    openPullDown: {
      type: Boolean,
      default: false,
    },
    // 慢移动
    probeType: {
      type: Number,
      default: 1,
    },
    // 监听滚动
    listenScroll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    initScroll() {
      this.$nextTick(() => {
        if (!this.Scroll) {
          this.Scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            click: true, // 配置允许点击事件
            scrollY: true, // 开启纵向滚动
            bounceTime: TIME_BOUNCE,
            useTransition: false,
            pullDownRefresh: this.openPullDown
              ? { threshold: THRESHOLD, stop: STOP }
              : "",
          });
          this.openPullDown &&
            this.Scroll.on("pullingDown", this.pullingDownHandler);
          this.listenScroll && this.Scroll.on('scroll', pos => {
            this.$emit('scroll', pos)
          })
        } else {
          this.Scroll.refresh(); // 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
        }
      });
    },
    scrollHandler(pos) {
      console.log(pos);
    },
    pullingDownHandler() {
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$emit("request", {
        cBack: this.finishPullDown,
      });
    },
    finishPullDown() {
      this.isPullingDown = false;
      this.Scroll.finishPullDown();
      setTimeout(() => {
        this.beforePullDown = true;
        this.Scroll.refresh();
      }, TIME_BOUNCE);
    },
    // refresh
    refresh() {
      this.Scroll && this.Scroll.refresh();
      console.log('refresh-----------');
    },
    // 滚动到对应的元素
    scrollToElement() {
      this.Scroll && this.Scroll.scrollToElement.apply(this.Scroll, arguments);
    },
  },
  mounted() {
    this.initScroll();
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.initScroll();
      });
    },
  },
};
</script>

<style lang='less' scoped>
// 这里的高度一定要继承外部父盒子
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .content {
    position: relative;
    //   overflow: hidden;
  }
  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
    text-align: center;
    color: #999;
  }
}
</style>