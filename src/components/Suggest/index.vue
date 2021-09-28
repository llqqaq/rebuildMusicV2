<template>
  <b-scroll
    class="suggest"
    :data="list"
    :pullUpLoad="pullUpLoad"
    @pullingUpHandler="pullingUpHandler"
    ref="bscroll"
  >
    <ul class="suggest-ul" v-show="list.length > 0">
      <li
        class="suggest-li"
        v-for="(item, index) in list"
        :key="index"
        @click="select(item)"
      >
        <div class="icon">
          <span class="iconfont icon-yinyue"></span>
        </div>
        <div class="text">
          <span class="name">{{ item.name }}</span>
          <span>{{ getSinger(item.artists) }}</span>
        </div>
      </li>

      <div class="pullup-tips">
        <div v-if="!pullUpBottom" class="before-trigger">
          <span class="pullup-txt">Pull up and load more</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </ul>
    <div class="no-result" v-show="!list.length">
      <div class="img"></div>
      <span class="text">抱歉，暂无搜索结果</span>
    </div>
  </b-scroll>
</template>
<script>
import { getSuggestList } from "@/api/http";
import BScroll from "@/components/Scroll";
import { mapMutations } from 'vuex'
export default {
  name: "suggest",
  data() {
    return {
      pullUpLoad: true,
      list: [],
      offset: 1,
      hasMore: true,
      pullUpBottom: false,
    };
  },
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  components: {
    BScroll,
  },
  methods: {
    getSuggestList() {
      getSuggestList(this.query, this.offset).then((res) => {
        console.log("歌曲详情结果", res);
        if (res.code === 200) {
          this.hasMore = res.result.hasMore;
          if (this.pullUpBottom) {
            setTimeout(() => {
              this.list.push(...res.result.songs);
              this.pullUpBottom = false;
              this.$refs.bscroll.finishPUp();
            }, 1000);
            return;
          }
          this.list = res.result.songs;
          this.$refs.bscroll.scrollTo(0, 0, 0);
        }
      });
    },
    // 底部触发
    pullingUpHandler() {
      console.log("触发底部");
      if (this.hasMore) {
        this.offset++;
        this.pullUpBottom = true;
        this.getSuggestList();
      }
    },
    select(item) {
     console.log(item);
    },
    ...mapMutations(["setSinger"]),
    // 拼接歌手
    getSinger(artists) {
      let str = "";
      artists.forEach((item) => {
        str += item.name;
        str += "/";
      });
      str = str.slice(0, str.length - 1);
      return str;
    },
  },
  watch: {
    query(newVal) {
      if (!newVal) {
        this.list = [];
        this.offset = 1;
        return;
      }
      this.getSuggestList();
    },
  },
};
</script>
<style lang='less' scoped>
@import url("~@/common/less/variable");
@import url("~@/common/less/mixin");
.bg-image(@url) {
  background-image: url("@{url}@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url("@{url}@3x.png");
  }
}
.suggest {
  height: 100%;
  width: 100%;
  background-color: #222;
  padding-top: 20px;
  overflow: hidden;
  .suggest-ul {
    //   margin-top: 20px;
    .suggest-li {
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding-bottom: 10px;
      .icon {
        width: 30px;
        text-align: center;
        font-size: 14px;
        color: @color-text-d;
      }
      .text {
        height: 18px;
        font-size: @font-size-medium;
        color: @color-text-d;
        overflow: hidden;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          .no-wrap();
        }
        .name {
          margin-right: 10px;
        }
      }
    }
  }
  .no-result {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img {
      width: 86px;
      height: 90px;
      background-size: 86px 90px;
      .bg-image("no-result");
    }
    .text {
      margin-top: 30px;
      font-size: @font-size-medium;
      color: @color-text-d;
    }
  }
  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}
</style>