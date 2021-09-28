<template>
  <div class="container" ref="container">
    <b-scroll
      ref="scroll"
      class="list_view"
      :data="data"
      :listenScroll="listenScroll"
      @scroll="scroll"
      :probeType="3"
    >
      <div
        class="singer-item"
        v-for="firItem in data"
        :key="firItem.title"
        ref="listView"
        
      >
        <h2>{{ firItem.title }}</h2>
        <div 
          class="item"
          v-for="secItem in firItem.items" 
          :key="secItem.id"
          @click="selectItem(secItem)"
          >
          <img v-lazy="secItem.avatar" alt width="80px" height="80px" />
          <span>{{ secItem.name }}</span>
        </div>
      </div>
    </b-scroll>
    <!-- 右侧 -->
    <ul class="right">
      <li
        v-for="(title, index) in getKey"
        :key="index"
        :data-index="index"
        @touchstart="touchStart"
        @touchmove="touchMove"
        :class="{ choose: currentIndex === index }"
      >
        {{ title }}
      </li>
    </ul>
    <!-- 固定 -->
    <div class="fixed" v-show="scrollY.y < 0" ref="fixed">
      <h2>{{ fix }}</h2>
    </div>
  </div>
</template>

<script>
import BScroll from "@/components/Scroll";

let FIXHEIGHT = 30
export default {
  name: "list-view",
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: 0
    };
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
  },
  components: {
    BScroll,
  },
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
  },

  methods: {
    refresh() {
      this.$refs.scroll.refresh()
    },
    touchStart(e) {
      let currentIndex = e.target.getAttribute("data-index");
      this.currentIndex = parseInt(currentIndex);
      // console.log("currentIndex", currentIndex);
      let touchObj = e.targetTouches[0];
      this.touch.startY = touchObj.pageY;
      this.touch.startIndex = parseInt(currentIndex);
      this._scrollToElement(currentIndex);
    },
    touchMove(e) {
      let touchObj = e.targetTouches[0];
      this.touch.moveY = touchObj.pageY;
      let diff = ((this.touch.moveY - this.touch.startY) / 20) | 0;
      let num = this.touch.startIndex + diff;
      this._scrollToElement(num);
    },
    scroll(pos) {
      this.scrollY = pos;
    },
    // 滚动到元素
    _scrollToElement(index) {
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.getKey.length - 2;
      }
      // 第二个参数是动画时间
      this.$refs.scroll.scrollToElement(this.$refs.listView[index], 0);
    },
    selectItem(item) {
      this.$emit('select', item)
    },
    // 获取每个节点的高度
    _calculate() {
      this.listHeight = [];
      let height = 0;
      let list = this.$refs.listView;
      this.listHeight.push(height);
      list.forEach((item) => {
        height += item.clientHeight;
        this.listHeight.push(height);
      });
    },
  },
  computed: {
    getKey() {
      return this.data.map((item) => {
        return item.title.substr(0, 1);
      });
    },
    fix() {
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    },
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._calculate();
      });
    },
    scrollY(pos) {
      let listHeight = this.listHeight;
      // 在顶部
      if (pos.y > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间
      for (let index = 0; index < listHeight.length - 1; index++) {
        const height1 = listHeight[index];
        const height2 = listHeight[index + 1];
        this.diff = height2 + pos.y
        if (-pos.y >= height1 && -pos.y < height2) {
          this.currentIndex = index;
          return;
        }
      }
      // 在底部
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      // console.log(newVal);
      let fixTop = (newVal > 0 && newVal < FIXHEIGHT) ? newVal-FIXHEIGHT : 0
      if(fixTop === this.fixTop) return
      this.fixTop = fixTop
      this.$refs.fixed.style.transform = `translate3d(0px, ${fixTop}px, 0px)`
    }
  },
};
</script>

<style lang='less' scoped>
@import url("~@/common/less/variable.less");
.container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .list_view {
    width: 100%;
    height: 100%;
    position: relative;
    .singer-item {
      h2 {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: @font-size-small;
        color: @color-text-l;
        background: @color-highlight-background;
      }
      .item {
        padding: 20px 0 0 30px;
        span {
          margin-left: 20px;
          color: @color-text-l;
          font-size: @font-size-medium;
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
  }
  .right {
    position: fixed;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: @color-background-d;
    font-family: Helvetica;
    li {
      padding: 3px;
      &.choose {
        color: yellow;
      }
    }
  }
  .fixed {
    width: 100%;
    position: absolute;
    top: 0;
    h2 {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
  }
}
</style>