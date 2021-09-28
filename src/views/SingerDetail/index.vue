<template>
  <transition name="fade">
    <music-list v-if="show" :title="getSinger.name" :bgImage='getSinger.avatar' :songs='songList'></music-list>
  </transition>
</template>

<script>
import { getSingerInfo } from "@/api/http";
import { mapGetters } from "vuex";
import { createSong } from "@/common/js/singer";
import MusicList from '@/components/MusicList'
export default {
  name: "singer-detail",
  data() {
    return {
      show: false,
      songList: []
    };
  },
  computed: {
    ...mapGetters(["getSinger"]),
  },
  mounted() {
    this.show = true;
    this.getSingerInfo();
  },
  methods: {
    async getSingerInfo() {
      if (!this.getSinger.id) {
        this.$router.push("/singer");
        return;
      }
      let result = await getSingerInfo(this.getSinger.id);
      this.songList = this._normaliseSongs(result)
      console.log(this.songList);
    },
    _normaliseSongs(data) {
      let ret = [];
      data.hotSongs.forEach((item) => {
        ret.push(createSong(item));
      });
      return ret
    },
  },
  components: {
      MusicList
  }
};
</script>

<style lang='less' scoped>
@import url("~@/common/less/variable.less");
.singer_detail {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  background-color: red;
  z-index: 100;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(100%, 0, 0);
}
</style>