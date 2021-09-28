<template>
  <div>
    <b-scroll
      class="rank-wrapper"
      :data="rankList"
      ref="scroll"
    >
      <!-- 这里记得要一个div -->
      <div>
        <div class="rank-item" 
          v-for="list in rankList" 
          :key="list.id"
          @click="toTopList(list)"
          >
          <div class="item-img">
            <img v-lazy="list.coverImgUrl" width="100" height="100" />
          </div>
          <div class="item-song">
            <span v-for="(song, index) in list.tracks" :key="song.first"
              >{{ ++index }}、{{ song.first }}</span
            >
          </div>
        </div>
      </div>
    </b-scroll>
    <loading v-if="rankList.length < 0"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import BScroll from "@/components/Scroll";
import { getRankList } from "@/api/http";
import Loading from "@/components/Loading";
import { playListMixin } from "@/common/js/mixins";
import { mapMutations } from 'vuex'
export default {
  name: "rank",
  mixins: [playListMixin],
  data() {
    return {
      rankList: [],
    };
  },
  mounted() {
    this.getRankList();
  },
  methods: {
    getRankList() {
      getRankList().then((res) => {
        this.rankList = res.list;
      });
    },
    toTopList(list) {
      this.setTopDetail(list)
      this.$router.push(`/rank/${list.id}`)
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? "60px" : 0;
      this.$refs.scroll.$el.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    ...mapMutations(['setTopDetail'])
  },
  components: {
    BScroll,
    Loading,
  },
};
</script>


<style lang="less" scoped>
@import url("~@/common/less/variable.less");
.rank-wrapper {
  position: absolute;
  top: 76px;
  left: 0;
  right: 0;
  bottom: 0;
  // overflow: hidden;
  height: auto;
  padding: 0px 20px;
  overflow: hidden;
  box-sizing: border-box;
  .rank-item {
    display: flex;
    flex-direction: row;
    padding-top: 20px;
    .item-song {
      flex: 1;
      background: @color-highlight-background;
      display: flex;
      flex-direction: column;
      //   padding: 20px 0 20px 20px;
      padding: 0 20px;
      justify-content: center;
      color: @color-text-d;
      font-size: @font-size-small;
      line-height: 26px;
    }
    &:last-child {
      padding-bottom: 20px;
    }
  }
}
</style>