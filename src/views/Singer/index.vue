<template>
  <div class="singer_wrap" ref="singerWrap">
    <list-view @select='select' :data="singerList" ref="listViews"></list-view>
    <loading v-show="singerList.length < 1"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { getHotSinger, getSinger } from "@/api/http";
import { ConvertPinyin } from "@/utils/transform";
import ListView from "@/components/Listview";
import Loading from '@/components/Loading'
import { mapMutations } from 'vuex'
import { playListMixin } from '@/common/js/mixins'
const HOT_NAME = "热门";
export default {
  name: "singer",
  mixins: [playListMixin],
  data() {
    return {
      hotSingerList: [],
      keyList: [],
    };
  },
  mounted() {
    this.getHotSinger();
    this.getSinger();
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0? '60px' : 0
      this.$refs.singerWrap.style.bottom = bottom
      this.$refs.listViews.refresh()
    },
    async getHotSinger() {
      let result = await getHotSinger();
      let temp = {
        title: HOT_NAME,
        items: [],
      };
      result.artists.forEach((item) => {
        temp.items.push({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url,
        });
      });
      this.hotSingerList.push(temp);
    },
    async getSinger() {
      let result = await getSinger();
      this.keyList = this._intiSingerData(result.artists);
    },
    select(item) {
      this.$router.push(`/singer/${item.id}`)
      this.setSinger(item)
    },
    ...mapMutations([
      'setSinger'
    ]),
    // 处理歌手数据
    _intiSingerData(data) {
      let map = {};
      for (let item in data) {
        let key = ConvertPinyin(data[item].name);
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [],
          };
        }
        map[key].items.push({
          id: data[item].id,
          name: data[item].name,
          avatar: data[item].img1v1Url,
        });
      }
      let key = [];
      for (let item in map) {
        if (map[item].title.match(/[a-zA-Z]/)) {
          key.push(map[item]);
        }
      }
      key.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return key;
    },
  },
  computed: {
    singerList() {
      return this.hotSingerList.concat(this.keyList);
    },
  },
  components: {
    ListView,
    Loading
  },
};
</script>

<style lang='less'>
.singer_wrap {
  position: fixed;
  top: 87px;
  bottom: 0;
  max-width: 640px;
  width: 100%;
}
</style>