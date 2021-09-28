import { mapGetters } from 'vuex'

export const playListMixin = {
    computed: {
        ...mapGetters(['getPlayList'])
    },
    mounted() {
        this.handlePlayList(this.getPlayList)
    },
    activated() {
        this.handlePlayList(this.getPlayList)
    },
    watch: {
        getPlayList(newVal) {
            this.handlePlayList(newVal)
        }
    },
    methods: {
        handlePlayList() {
            // 如果组件未覆盖这个事件，则会抛出错误
            throw new Error('component must implement handlePlayList')
        }
    }
}