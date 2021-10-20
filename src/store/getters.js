const getters = {
    getSinger: state => state.singer,
    getPlaying: state => state.playing,
    getFullScreen: state => state.fullScreen,
    getPlayList: state => state.playList,
    getSequenceList: state => state.sequenceList,
    getMode: state => state.mode,
    getCurrentIndex: state => state.currentIndex,
    getCurrentSong: state => state.playList[state.currentIndex],
    getDesc: state => state.disc,
    getTopDetail: state => state.topDetail,
    getKeywordHistory: state => state.keywordHistory
}
export default getters