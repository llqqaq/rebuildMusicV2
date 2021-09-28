<template>
  <div class="song-list">
    <ul>
      <li
        v-for="(song, index) in songs"
        @click="selectItem(song, index)"
        :key="index"
        class="song-item"
      >
        <div v-show="rank" :class="getBgImg(index)" class="bg-img">
          {{ getIndex(index) }}
        </div>
        <div class="content">
          <h2>{{ song.name }}</h2>
          <span class="des">{{ getDesc(song) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "song-list",
  props: {
    songs: {
      type: Array,
      default: function () {
        return [];
      }
    },
     rank: {
        type: Boolean,
        default: false,
      },
  },
  methods: {
    getDesc(song) {
      return `${song.singer}。${song.title}`;
    },
    selectItem(song, index) {
      this.$emit("selectItem", song, index);
    },
    // 获取相对于的背景
    getBgImg(index) {
      if (index <= 2) {
        return `icon${index}`;
      } else {
        return "text";
      }
    },
    getIndex(index) {
      if (index > 2) {
        return index++;
      }
    },
  },
  watch: {
    rank(newVal) {
      alert(newVal)
    }
  }
};
</script>

<style lang="less" scoped>
@import url("~@/common/less/variable.less");
@import url("~@/common/less/mixin.less");
.bg-image(@url) {
  background-image: url("@{url}@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url("@{url}@3x.png");
  }
}
.song-list {
  ul {
    padding: 20px 0 10px 15px;
  }
  .song-item {
    padding-top: 10px;
    margin-bottom: 10px;
    display: flex;
    .bg-img {
      width: 25px;
      height: 24px;
      background-size: 25px 24px;
      text-align: center;
      margin-right: 25px;
      &.icon0 {
        .bg-image("first");
      }
      &.icon1 {
        .bg-image("second");
      }
      &.icon2 {
        .bg-image("third");
      }
      &.text {
        color: @color-theme;
        font-size: @font-size-large;
        line-height: 24px;
      }
    }
    .content {
      flex: 1;
      overflow: hidden;
      h2 {
        color: @color-text;
      }
      .des {
        display: block;
        margin-top: 10px;
        color: @color-text-d;
        .no-wrap();
      }
    }
  }
}
</style>