<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <search-box @query="query" ref="searchBox"></search-box>
    </div>
    <!-- 热搜 -->
    <div class="shortcut-wrapper" v-show="!value">
      <h1>热门搜索</h1>
      <div class="hot-key">
        <ul>
          <li v-for="key in hotKey" :key="key.first" @click="chooseKey(key.first)">
            {{ key.first }}
          </li>
        </ul>
      </div>
    </div>
     <!-- 搜索列表 -->
    <div class="suggest-wrapper" v-show="value">
      <suggest :query="value"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import Suggest from '@/components/Suggest'
import { getHotKey } from "@/api/http";
export default {
  components: {
    SearchBox,
    Suggest
  },
  props: {},
  data() {
    return {
      hotKey: [],
      value: ''
    };
  },
  watch: {},
  computed: {},
  methods: {
    query(val) {
      this.value = val
    },
    chooseKey(val) {
      this.$refs.searchBox.setQuery(val) 
    },
    getHotKey() {
      getHotKey().then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.hotKey = res.result.hots;
        }
      });
    },
  },
  created() {
    this.getHotKey()
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("~@/common/less/variable");
.search {
  padding: 20px 20px 0 20px;
  .shortcut-wrapper {
    margin-top: 20px;
    h1 {
      text-align: center;
      margin-bottom: 10px;
      font-size: @font-size-medium;
      color: @color-text-l;
    }
    .hot-key {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          text-align: center;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: @color-highlight-background;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }
    }
    .history-wrapper {
      width: 100%;
      margin-top: 20px;
      .title-wrapper {
        display: flex;
        align-items: center;
        height: 40px;
        .text {
          font-size: @font-size-small;
          color: @color-text-l;
          flex: 1;
        }
        .iconfont {
          font-size: @font-size-small;
          color: @color-text-d;
        }
      }
    }
  }
  .suggest-wrapper {
    position: fixed;
    top: 136px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 20px 10px 20px;
    box-sizing: border-box;
  }
}
</style>