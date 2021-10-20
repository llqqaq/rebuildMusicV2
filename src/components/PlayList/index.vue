<template>
  <div class="playlist" v-if="show" @click="hideModel">
    <!-- 这里要阻止事件的冒泡 -->
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
        <span class="mode iconfont"></span>
        <!-- <span class="mode iconfont" :class="getIcon"></span> -->
        <span class="text">文本</span>
        <span
          class="del iconfont icon-trash"
          @click.stop="deleteAllSongs"
        ></span>
      </div>
      <!-- 这里直接将div改为scroll -->
      <div class="list-content">
        <b-scroll ref="scroll" :data="getSequenceList" class="content-ul">
          <li
            ref="li"
            class="content-li"
            v-for="(item, index) in getSequenceList"
            :key="index"
          >
            <span class="current iconfont"></span>
            <span class="name">{{ item.name }}</span>
            <span class="like iconfont icon-like"></span>
            <span class="del iconfont icon-chushaixuanxiang"></span>
          </li>
        </b-scroll>
      </div>
      <div class="list-operate">
        <div class="operate-wrapper">
          <span class="add">＋</span>
          <span class="text">添加歌曲到队列</span>
        </div>
      </div>
      <div class="close" @click="hideModel">关闭</div>
    </div>
  </div>
</template>
<script>
import BScroll from "@/components/Scroll";
import { mapGetters } from "vuex";
export default {
  name: "playlist",
  data() {
    return {
      show: false,
      list: [],
    };
  },
  computed: {
    ...mapGetters(["getSequenceList"]),
  },
  components: {
    BScroll,
  },
  methods: {
    showModel() {
      this.show = true;
    },
    hideModel() {
      this.show = false;
    },
  }
};
</script>
<style lang="less" scoped>
@import url("~@/common/less/variable.less");
@import url("~@/common/less/mixin.less");
.playlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: @color-background-d;
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: @color-highlight-background;
    .list-header {
      display: flex;
      padding: 20px 30px 10px 20px;
      .mode {
        margin-right: 10px;
        font-size: 30px;
        color: @color-theme-d;
      }
      .text {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: @font-size-medium;
        color: @color-text-l;
      }
      .del {
        display: flex;
        align-items: center;
        font-size: @font-size-medium;
        color: @color-text-d;
      }
    }
  }
  .list-content {
    max-height: 240px;
    overflow: hidden;
    // height: 240px;
    width: 100%;
    .content-ul {
      .content-li {
        //   直接用transition只能包裹简单元素，这个要用transition-groud，看一下样式应该放在哪里
        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.3s linear;
        }
        &.list-enter,
        &.list-leave-to {
          height: 0;
        }
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          // 这是什么操作
          flex: 0 0 20px;
          width: 20px;
          //   font-size: @font-size-small;
          font-size: @font-size-small;
          color: @color-theme-d;
        }
        .name {
          flex: 1;
          .no-wrap();
          font-size: @font-size-medium;
          color: @color-text-d;
        }
        .like {
          margin-right: 8px;
          font-size: 19px;
          color: @color-theme;
          //   喜欢的颜色
          // color: $color-sub-theme
        }
        .del {
          font-size: 27px;
          color: @color-theme;
        }
      }
    }
  }
  .list-operate {
    width: 140px;
    margin: 20px auto 30px auto;
    .operate-wrapper {
      // 个人觉得没必要flex
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border: 1px solid @color-text-l;
      border-radius: 100px;
      color: @color-text-l;
      .add {
        margin-right: 5px;
        font-size: @font-size-small-s;
      }
      .text {
        font-size: @font-size-small;
      }
    }
  }
  .close {
    text-align: center;
    line-height: 50px;
    background: @color-background;
    font-size: @font-size-medium-x;
    color: @color-text-l;
  }
}
</style>
