<template>
  <div class="search-box">
    <span class="iconfont icon-jiansuo"></span>
    <input
      type="text"
      v-model.trim="query"
      ref="input"
      class="search-input"
      :placeholder="placeholder"
      @blur="blur"
    />
    <span class="iconfont icon-qingchu" v-show="query" @click="clear"></span>
  </div>
</template>

<script>
// import { debounce } from "@/common/js/util";
export default {
  components: {},
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手",
    },
  },
  data() {
    return {
      query: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    clear() {
      this.query = "";
    },
    setQuery(val) {
      this.query = val;
    },
    blur() {
      console.log('失去焦点');
      this.$refs.input.blur()
    }
  },
  created() {
    // this.$watch("query", debounce(newVal => {
    //   this.$emit("query", newVal);
    // }, 200));
    let timer
    this.$watch("query", function(newVal) {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        this.$emit("query", newVal);
      }, 200)
    });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import url("~@/common/less/variable.less");
.search-box {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 6px;
  box-sizing: border-box;
  background-color: @color-highlight-background;
  border-radius: 6px;
  span {
    font-size: 18px;
    color: #ccc;
  }
  .search-input {
    flex: 1;
    margin: 0 5px;
    line-height: 40px;
    background: @color-highlight-background;
    color: @color-text;
    font-size: @font-size-medium;
    // 设置input里面的placeholde
    &::placeholder {
      color: @color-text-d;
    }
  }
  .icon-qingchu {
    font-size: 15px;
  }
}
</style>