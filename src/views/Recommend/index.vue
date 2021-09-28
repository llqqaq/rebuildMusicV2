<template>
  <div class="recommend_wrap">
    <div style="">
      <div class="swiper-container" v-if="bannerList.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in bannerList"
            :key="index"
          >
            <img
              :data-id="item.targetId"
              @load="loadImage"
              :src="item.imageUrl"
              alt
            />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <h1 class="list-title">歌单推荐</h1>
    <div class="scroll_box" ref="scroll_box">
      <b-scroll
        ref="scroll"
        :data="playlists"
        :openPullDown="true"
        @request="requestData"
      >
        <!-- 歌单 -->
        <div class="recommond-list">
          <div class="list-content">
            <div
              class="content-item"
              v-for="item in playlists"
              :key="item.id"
              @click="toDetail(item)"
            >
              <img v-lazy="item.coverImgUrl" width="60" height="60" />
              <div class="item-right">
                <span class="name">{{ item.name }}</span>
                <div class="count-num">
                  <span class="text">{{ item.creator.nickname }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-scroll>
    </div>
    <loading v-show="!playlists.length"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { getIndexBanner, getGdan } from "@/api/http";
import BScroll from "@/components/Scroll";
import Loading from "@/components/Loading";
import Swiper from "swiper"; // ES引入方式
import "swiper/css/swiper.min.css"; // 根据实际路径和文件修改
import { mapMutations } from 'vuex'
import { playListMixin } from '@/common/js/mixins'
export default {
  name: "recommend",
  mixins: [playListMixin],
  data() {
    return {
      bannerList: [],
      playlists: [],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    // 获取轮播图
    this.getIndexBanner()
    // 获取歌单
    this.requestData();
  },
  components: {
    BScroll,
    Loading,
  },
  methods: {
    getIndexBanner() {
      getIndexBanner().then((res) => {
        this.bannerList = res.banners;
        this.$nextTick(() => {
          this.initSwiper();
        });
      });
    },
    initSwiper() {
      new Swiper(".swiper-container", {
        resizeObserver: true,
        autoplay: {
          delay: 5000, //1秒切换一次
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 如果直接在dom上绑定@click，loop状态下的首尾两个没有绑定点击事件
        on: {
          click: (e) => {
            console.log(e.target.dataset.id);
          },
        },
      });
    },
    async requestData(data) {
      console.log(data);
      console.log(typeof cBack);
      const result = await getGdan();
      console.log("触发请求result", result);
      for (var i = 0; i < result.playlists.length + 10; i++) {
        var rdm = Math.floor(Math.random() * result.playlists.length);
        result.playlists.push(result.playlists[rdm]);
        result.playlists.splice(rdm, 1);
      }
      this.playlists = result.playlists;
      data && data.cBack();
    },
    loadImage() {
      // 当轮播图片加载好了 scroll刷新
      if (!this.checkLoaded) {
        this.checkLoaded = true;
        this.loading = false;
        this.$refs.scroll.refresh();
      }
    },
    toDetail(item) {
      this.setDesc(item)
      this.$router.push(`/recommend/${item.id}`)
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0? '60px' : 0
      this.$refs.scroll_box.style.paddingBottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapMutations([
      'setDesc'
    ])
  },
};
</script>

<style lang='less'>
@import url("~@/common/less/variable.less");
.recommend_wrap {
  width: 100%;
  position: fixed;
  top: 87px;
  bottom: 0;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  .swiper-pagination-bullet-active {
    width: 13px;
  }
  .swiper-wrapper {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .list-title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: @color-theme;
    font-size: @font-size-medium;
  }
  .scroll_box {
    flex: 1;
    overflow: hidden;
    .recommond-list {
      .list-content {
        width: 100%;
        .content-item {
          padding: 0 20px 20px 20px;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          img {
            margin-right: 20px;
          }
          .item-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .name {
              font-size: @font-size-medium;
              // color: yellow;
              line-height: 20px;
              margin-bottom: 5px;
            }
            .count-num {
              font-size: 12px;
              color: @color-text-d;
            }
          }
        }
      }
    }
  }
}
</style>