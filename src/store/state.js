import { playMode } from "@/common/js/config"
import { getHistory } from '@/common/js/cache'
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
    keywordHistory: getHistory()
}

export default state