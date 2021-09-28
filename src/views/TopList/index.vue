<template>
  <transition name="fade">
    <music-list
      v-if="show"
      :bgImage="coverImgUrl"
      :title="title"
      :songs="songList"
      :rank='rank'
    ></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/MusicList";
import { mapGetters } from "vuex";
import { getGedanDes } from "@/api/http";
import { createSong } from "@/common/js/singer";
export default {
  name: "top-list",
  data() {
    return {
      show: false,
      songList: [],
      rank: true
    };
  },
  components: {
    MusicList,
  },
  computed: {
    // 获取歌单名字
    title() {
      return this.getTopDetail.name;
    },
    coverImgUrl() {
    //   if (this.songList.length > 0) {
    //     return this.songList[0].al.picUrl;
    //   }
      return this.getTopDetail.coverImgUrl;
    },
    ...mapGetters(["getTopDetail"]),
  },
  mounted() {
    this.getGedanDes();
    this.show = true;
  },
  methods: {
    getGedanDes() {
      let id = this.getTopDetail.id || undefined;
      if (!id) {
        this.$router.push("/rank");
        return;
      }
      getGedanDes(id).then((res) => {
        console.log('songlist', res);
        this.songList = this._normaliseSongs(res.playlist.tracks);
      });
    },
     _normaliseSongs(data) {
      let ret = [];
      data.forEach((item) => {
        ret.push(createSong(item));
      });
      return ret;
    },
  },
};
</script>

<style lang='less' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(100%, 0, 0);
}
</style>