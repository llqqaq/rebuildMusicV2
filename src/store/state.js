import { playMode } from "@/common/js/config"
const state = {
    disc: {},
    topDetail: {
        title: '1'
    },
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
}

export default state