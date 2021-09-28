<template>
  <transition name="fade">
    <music-list
      v-if="show"
      :title="getDesc.name"
      :bgImage="getDesc.coverImgUrl"
      :songs='songList'
    ></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/MusicList";
import { mapGetters } from "vuex";
import { createSong } from "@/common/js/singer";
import { getGedanDes } from "@/api/http";
export default {
  name: "disc",
  data() {
    return {
      show: false,
      songList: [],
    };
  },
  computed: {
    ...mapGetters(["getDesc"]),
  },
  mounted() {
    this.show = true;
    this.getPlayList();
  },
  methods: {
    async getPlayList() {
      if (!this.getDesc.id) {
        this.$router.push("/recommend");
        return;
      }
      let result = await getGedanDes(this.getDesc.id);

      this.songList = this._normaliseSongs(result.playlist.tracks);
      console.log("歌单详情", this.songList);
    },
    _normaliseSongs(data) {
      let ret = [];
      data.forEach((item) => {
        ret.push(createSong(item));
      });
      return ret;
    },
  },
  components: {
    MusicList,
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