<template>
  <div class="music-list">
    <!-- 上 -->
    <div class="header-wrapper">
      <div class="bg" :style="bgSty" ref="hWrapper"></div>
      <div class="header">
        <span class="iconfont icon-fanhui" @click="back"></span>
        <h1>{{ title }}</h1>
      </div>
      <!-- 播放 -->
      <div class="play" ref="play" v-if="songs.length > 0" @click="rdPlay">
        <span class="iconfont icon-bofang"></span>
        <span class="text">随机播放全部</span>
      </div>
    </div>
    <div class="bg_layer" ref="bg_layer"></div>
    <b-scroll
      class="scroll"
      :data="songs"
      ref="scroll"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
    >
      <song-list @selectItem="selectItem" :rank='rank' :songs="songs"></song-list>
    </b-scroll>
    <loading v-show="!songs.length"></loading>
  </div>
</template>

<script>
import SongList from "@/components/SongList";
import BScroll from "@/components/Scroll";
import { prefixStyle } from "@/common/js/dom";
import Loading from "@/components/Loading";
import { mapActions } from "vuex";
import { playListMixin } from "@/common/js/mixins";
const MIN_HEIGHT = 40;
const transfrom = prefixStyle("transform");
const filter = prefixStyle("filter");
export default {
  name: "music-list",
  mixins: [playListMixin],
  data() {
    return {
      scrollY: 0,
    };
  },
  props: {
    bgImage: {
      type: String,
      default: "",
    },
    songs: {
      type: Array,
      default: function () {
        return [];
      },
    },
    title: {
      type: String,
      default: "",
    },
    rank: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  computed: {
    bgSty() {
      return `background-image: url(${this.bgImage})`;
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(_song, index) {
      this.selectPlay({
        list: this.songs,
        index: index,
      });
    },
    rdPlay() {
      this.randomPlay({
        list: this.songs,
      });
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? "60px" : 0;
      this.$refs.scroll.$el.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    ...mapActions(["selectPlay", "randomPlay"]),
  },
  components: {
    SongList,
    BScroll,
    Loading,
  },
  mounted() {
    this.imgHeight = this.$refs.hWrapper.clientHeight;
    this.minHeight = this.imgHeight - MIN_HEIGHT;
    this.$refs.scroll.$el.style.top = `${this.imgHeight}px`;
  },
  watch: {
    scrollY(newVal) {
      let zIndex = 0;
      let translateY = Math.max(-this.minHeight, newVal);
      let scale = 1;
      let blur = 0;
      this.$refs.bg_layer.style[
        transfrom
      ] = `scale(${scale}) translate3d(0, ${translateY}px, 0)`;
      let percent = Math.abs(newVal / this.imgHeight);
      if (newVal >= 0) {
        scale = 1 + percent;
        //   zIndex = 10
      } else {
        blur += percent;
        if (blur >= 2) blur = 2;
      }
      if (newVal < translateY) {
        zIndex = 10;
        this.$refs.hWrapper.style.paddingTop = 0;
        this.$refs.hWrapper.style.height = `${MIN_HEIGHT}px`;
      } else {
        this.$refs.hWrapper.style.paddingTop = "70%";
        this.$refs.hWrapper.style.height = 0;
      }
      this.$refs.hWrapper.style.zIndex = zIndex;
      this.$refs.hWrapper.style[transfrom] = `scale(${scale})`;
      this.$refs.hWrapper.style[filter] = `blur(${blur}px)`;
    },
  },
};
</script>

<style lang='less' scoped>
@import url("~@/common/less/variable.less");
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: @color-background;
  .header-wrapper {
    // width: 100%;
    // height: 250px;
    // background-size: cover;
    // 设置盒子根据宽度改变高度
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;

    // z-index:50;
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-origin: top;
      // 背景图铺满
      background-size: cover;
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 20;
      .iconfont {
        color: @color-theme;
        font-size: @font-size-large-x;
        font-weight: 900;
        position: absolute;
        top: 0px;
        left: 6px;
        padding: 10px;
      }
      h1 {
        font-weight: 900;
        text-align: center;
        line-height: 40px;
        font-size: @font-size-large;
        color: @color-text;
      }
    }
    .play {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid @color-theme;
      color: @color-theme;
      width: 135px;
      text-align: center;
      padding: 7px 0;
      border-radius: 30px;
      .iconfont {
        margin-right: 6px;
        font-size: @font-size-medium-x;
        vertical-align: middle;
      }
      .text {
        vertical-align: middle;
        font-size: @font-size-small;
      }
    }
  }
  // 屏幕大小
  .bg_layer {
    position: relative;
    height: 100%;
    background: @color-background;
  }
  .scroll {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    overflow: inherit;
    .s-wrapper {
      padding: 20px 30px;
    }
    .loading {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>