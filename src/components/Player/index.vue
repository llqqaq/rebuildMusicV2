<template>
  <div class="player" v-if="getPlayList.length > 0">
    <transition name="normal">
      <div class="normal-playing" v-show="getFullScreen">
        <!-- 背景图片 -->
        <div class="background">
          <img :src="getCurrentSong.image" alt width="100%" height="100%" />
        </div>
        <!-- 头 -->
        <div class="top">
          <span class="iconfont icon-xiangxia" @click="back"></span>
          <h1 class="title">{{ getCurrentSong.name }}</h1>
          <div class="artist">{{ getCurrentSong.singer }}</div>
        </div>
        <!-- 中 -->
        <div class="middle-wrapper">
          <!-- 图片 -->
          <div class="middle" ref="middleImg">
            <div class="middle-zw">
              <div class="middle-w" :class="getPlaying ? 'play' : 'play pause'">
                <img :src="getCurrentSong.image" alt />
              </div>
            </div>
          </div>
        </div>
        <!-- 尾 -->
        <div class="bottom">
          <!-- 进度条 -->
          <div class="link">
            <span class="current">{{ _format(currentTime) }}</span>
            <progress-bar
              :percent="percent"
              @setPercent="setPercent"
            ></progress-bar>
            <span class="duration">{{ _format(duration) }}</span>
          </div>
          <div class="operate">
            <div class="sequence" @click="toggleMode">
              <span class="iconfont" :class="getIcon"></span>
            </div>
            <div class="prev" @click="prev" :class="disable">
              <span class="iconfont icon-shangyishou"></span>
            </div>
            <div class="zting-play" @click="togglePlaying">
              <span
                class="iconfont"
                :class="getPlaying ? 'icon-zanting' : 'icon-bofang'"
              ></span>
            </div>
            <div class="next" @click="next">
              <span class="iconfont icon-xiayishou" :class="disable"></span>
            </div>
            <div class="aixin">
              <!-- <span class="iconfont icon-like"></span> -->
              <span class="iconfont icon-like"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-playing" v-show="!getFullScreen" @click="open">
        <div class="mini-img" :class="getPlaying ? 'play' : 'play pause'">
          <img :src="getCurrentSong.image" width="40px" height="40px" alt />
        </div>
        <div class="text">
          <span class="name">{{ getCurrentSong.name }}</span>
          <span class="artist">{{ getCurrentSong.singer }}</span>
        </div>
        <div class="icon">
          <div class="play">
            <span
              class="iconfont"
              :class="getPlaying ? 'icon-zanting' : 'icon-bofang'"
              @click.stop="togglePlaying"
            ></span>
          </div>
          <div class="choose">
            <span
              class="iconfont icon-shunxubofang"
              @click.stop="showPlaylist"
            ></span>
          </div>
        </div>
      </div>
    </transition>
    <!-- canplay是audio加载好触发的事件-->
    <audio
      ref="audio"
      :src="url"
      @canplay="ready"
      @error="error"
      @timeupdate="timeupdate"
      @ended='end'
    ></audio>
    <playlist ref="playlist"></playlist>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { playMode } from "@/common/js/config";
import ProgressBar from "@/components/ProgressBar";
import { getLyrics } from '@/api/http'
import Playlist from '@/components/PlayList'
export default {
  name: "player",
  data() {
    return {
      url: "",
      isReady: false,
      currentTime: "00:00",
      duration: "00:00",
      randomIndex: 0,
      percent: 0,
    };
  },
  computed: {
    ...mapGetters([
      "getFullScreen",
      "getPlayList",
      "getMode",
      "getPlaying",
      "getCurrentSong",
      "getCurrentIndex",
      "getSequenceList",
      "getPlayList",
    ]),
    getIcon() {
      return this.getMode === playMode.sequence
        ? " icon-shunxubofang"
        : this.getMode === playMode.loop
        ? "icon-danquxunhuan"
        : "icon-moshisuijixunhuan";
    },
    disable() {
      return this.isReady ? "" : "disable";
    },
  },
  created() {
    this.musicUrl = [
      "https://music.163.com/song/media/outer/url?id=33894311.mp3",
      "https://music.163.com/song/media/outer/url?id=33894312.mp3",
      "https://music.163.com/song/media/outer/url?id=33894313.mp3",
      "https://music.163.com/song/media/outer/url?id=33894314.mp3",
      "https://music.163.com/song/media/outer/url?id=33894315.mp3",
      "https://music.163.com/song/media/outer/url?id=33894316.mp3",
      "https://music.163.com/song/media/outer/url?id=33894317.mp3",
      "https://music.163.com/song/media/outer/url?id=33894318.mp3",
      "https://music.163.com/song/media/outer/url?id=33894319.mp3",
      "https://music.163.com/song/media/outer/url?id=33894320.mp3",
    ];
  },
  methods: {
    // 获取icon的样式
    getFavoIcon(_song) {
      console.log("_song", _song);
      return "";
    },
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      this.setPlaying(!this.getPlaying);
    },
    next() {
      if (!this.isReady) return;
      let index = this.getCurrentIndex + 1;
      if (index === this.getPlayList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.getPlaying) {
        this.togglePlaying();
      }
      this.isReady = false;
    },
    prev() {
      if (!this.isReady) return;
      let index = this.getCurrentIndex - 1;
      if (index === -1) {
        index = this.getPlayList.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.getPlaying) {
        this.togglePlaying();
      }
      this.isReady = false;
    },
    ready() {
      this.isReady = true;
    },
    error() {
      this.isReady = true;
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      this.duration = e.target.duration;
      this.percent = this.currentTime / this.duration;
    },
    setPercent(percent) {
      this.$refs.audio.currentTime = percent * this.duration;
    },
    toggleMode() {
      const mode = (this.getMode + 1) % 3;
      this.setMode(mode);
      let list = [];
      if (this.getMode === playMode.random) {
        list = [...this.getSequenceList].sort(() => Math.random() - 0.5);
      } else {
        list = this.getSequenceList;
      }
      const index = this._findIndex(list);
        this.setCurrentIndex(index)
         this.setPlayList(list)
    },
    end() {
       if(this.getMode === playMode.loop) {
           this.loop()
       } else {
           this.next()
       }
    },
    loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
    },
    getLyrics(id) {
      getLyrics(id).then(res => {
        console.log('歌词', res);
      })
    },  
    showPlaylist() {
      this.$refs.playlist.showModel()
    },
    _findIndex(list) {
      let index = list.findIndex((item) => {
        return item.name === this.getCurrentSong.name;
      });
      return index;
    },
    _format(time) {
      time = time | 0; //向下取整
      const min = this._pad((time / 60) | 0);
      const sec = this._pad(time % 60);
      return `${min}:${sec}`;
    },
    _pad(num, n = 2) {
      let length = num.toString().length;
      while (length < n) {
        length++;
        num = "0" + num;
      }
      return num;
    },
    ...mapMutations([
      "setFullScreen",
      "setPlaying",
      "setCurrentIndex",
      "setMode",
      "setSequenceList",
      "setPlayList",
    ]),
  },
  components: {
    ProgressBar,
    Playlist
  },
  watch: {
    getCurrentSong(newVal, oldVal) {
      if (oldVal && newVal.name === oldVal.name) return;
      let index = Math.floor(Math.random() * 10);
      while (index === this.randomIndex) {
        index = Math.floor(Math.random() * 10);
      }
      this.randomIndex = index;
      this.url = this.musicUrl[index];
      // 获取歌词
      this.getLyrics(121012393)
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    getPlaying(newVal) {
      this.$nextTick(() => {
        const audio = this.$refs.audio;
        newVal ? audio.play() : audio.pause();
      });
    },
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
@import url("~@/common/less/variable.less");
.player {
  .normal-playing {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: @color-background;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      width: 100%;
      position: relative;
      margin-bottom: 25px;
      .iconfont {
        position: absolute;
        left: 13px;
        top: 10px;
        font-size: 18px;
        color: @color-theme;
      }
      .title {
        text-align: center;
        line-height: 40px;
        font-size: @font-size-large;
        color: @color-text;
      }
      .artist {
        text-align: center;
        line-height: 20px;
        font-size: @font-size-medium;
        color: @color-text;
      }
    }
    .middle-wrapper {
      // width: 100%;
      // position: absolute;
      // top: 80px;
      // bottom: 155px;
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      // 左
      .middle {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        box-sizing: border-box;
        .middle-zw {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 100%;
          .middle-w {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 5px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            // 旋转效果
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              // 停止旋转
              animation-play-state: paused;
            }
            img {
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
        .lyric {
          margin-top: 30px;
          width: 100%;
          text-align: center;
          height: 20px;
          line-height: 20px;
          font-size: @font-size-medium;
          color: @color-text-l;
        }
      }
      // 右边
      .lyric-wrapper {
        display: inline-block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        div {
          p {
            text-align: center;
            line-height: 32px;
            color: @color-text-l;
            font-size: @font-size-medium;
            &.current {
              color: @color-text;
            }
          }
        }
      }
    }
    .bottom {
      touch-action: none;
      position: absolute;
      bottom: 50px;
      width: 100%;
      // font-size: 0;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: @color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: @color-text-ll;
          }
        }
      }
      .link {
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .current {
          color: @color-text;
          font-size: @font-size-small;
          line-height: 30px;
          width: 40px;
          text-align: center;
        }

        .duration {
          color: @color-text;
          font-size: @font-size-small;
          line-height: 30px;
          width: 40px;
          text-align: center;
        }
      }
      .operate {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // justify-content: space-around;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 50px;
        span {
          font-size: 30px;
          color: @color-theme-d;
        }
        .next {
          .iconfont {
            font-size: 27px;
          }
        }
        .sequence {
          width: 26px;
          box-sizing: border-box;
          span {
            font-size: 26px;
            &.icon-danquxunhuan,
            &.icon-shunxubofang {
              font-size: 23px;
            }
          }
        }
        .zting-play {
          span {
            font-size: 37px;
          }
        }
        .disable {
          span {
            color: @color-theme-d;
          }
        }
        .aixin {
          font-size: 26px;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.5s;
      .top,
      .bottom {
        transition: all 0.5s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
      .middle {
        transition: all 2s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
      .middle {
        opacity: 0;
      }
    }
  }
  .mini-playing {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 150;
    height: 60px;
    background-color: @color-highlight-background;
    box-sizing: border-box;
    padding: 10px 5px 10px 15px;
    display: flex;
    font-display: row;
    font-size: 0;
    .mini-img {
      img {
        border-radius: 50%;
      }
      // 旋转效果
      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        // 停止旋转
        animation-play-state: paused;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      padding-left: 10px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      .name {
        font-size: @font-size-medium;
        color: @color-text;
        margin-bottom: 2px;
      }
      .artist {
        font-size: @font-size-small;
        color: @color-text-d;
      }
    }
    .icon {
      display: flex;
      flex-direction: row;
      font-size: 0;
      height: 100%;
      .iconfont {
        font-size: 32px;
        color: @color-theme-d;
      }
      .play,
      .choose {
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-bofang-yuanshijituantubiao {
          font-size: 45px;
        }
        .icon-danquxunhuan,
        .icon-shunxubofang {
          font-size: 28px;
        }
      }
    }
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.5s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
      transform: translate3d(0, 100px, 0);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>