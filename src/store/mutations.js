const mutations = {
    setSinger(state, singer) {
        state.singer = singer
    },
    setPlaying(state, playing) {
        state.playing = playing
    },
    setFullScreen(state, fullScreen) {
        state.fullScreen = fullScreen
    },
    setPlayList(state, playList) {
        state.playList = [...playList]
    },
    setSequenceList(state, sequenceList) {
        state.sequenceList = [...sequenceList]
    },
    setMode(state, mode) {
        state.mode = mode
    },
    setCurrentIndex(state, currentIndex) {
        state.currentIndex = currentIndex
    },
    setDesc(state, disc) {
        state.disc = disc
    },
    setTopDetail(state, topDetail) {
        state.topDetail = topDetail
    }
}
export default mutations