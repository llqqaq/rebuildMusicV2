import { playMode } from '@/common/js/config';
import { saveHistoryCache, deleteHistory, clearHistory } from '@/common/js/cache'
function _findIndex(list, name) {
    return list.findIndex(item => {
        return item.name === name
    })
}
function findSongIndex(list, song) {
    return list.findIndex(item => {
        return item.id === song.id
    })
}
const actions = {
    // 在一个动作中需要多次使用mutations，建议用action
    selectPlay({ commit, state }, { list, index }) {
        commit('setSequenceList', list)
        if(state.mode === playMode.random) {
            const randomList = [...list].sort(() => Math.random() - 0.5)
            commit('setPlayList',  randomList)
            index = _findIndex(randomList, list[index].name)
        }else {
            commit('setPlayList', list)
        }
        commit('setCurrentIndex', index)
        commit('setFullScreen', true)
        commit('setPlaying', true)
    },
    randomPlay({ commit }, { list }) {
        commit('setMode', playMode.random)
        commit('setSequenceList', list)
        commit('setPlayList', [...list].sort(() => Math.random() - 0.5))
        commit('setCurrentIndex', 0)
        commit('setFullScreen', true)
        commit('setPlaying', true)
    },
    insertSong({commit, state}, song) {
        let playList = [...state.playList]
        let sequenceList = [...state.sequenceList]
        let currentIndex = state.currentIndex
        let currentSong = playList[currentIndex]
        let pI =  findSongIndex(playList, song)
        currentIndex++
        // 插入
        playList.splice(currentIndex, 0, song)
        if(pI > -1) {
            if(pI < currentIndex) {
                playList.splice(pI, 1)
                currentIndex--
            } else {
                playList.splice(pI + 1, 1)
            }
        }

        // sequenceList应该插入的位置
        let currentSeIndex = findSongIndex(sequenceList, currentSong) + 1
        sequenceList.splice(currentSeIndex, 0, song)
        let sI = findSongIndex(sequenceList, song) 
        if(sI > -1) {
            if(sI < currentIndex) {
                sequenceList.splice(sI, 1)
            } else {
                sequenceList.splice(sI + 1, 1)
            }
        }
        commit('setPlayList', playList)
        commit('setSequenceList', sequenceList)
        commit('setCurrentIndex', currentIndex)
        commit('setFullScreen', true)
        commit('setPlaying', true)
    },
    saveKeyword({ commit },song) {
        commit('setKeywordHistory', saveHistoryCache(song.name))
    },
    deleteKeyword({ commit }, key) {
        commit('setKeywordHistory', deleteHistory(key))
    },
    clearKeyword({ commit } ) {
        commit('setKeywordHistory', clearHistory('keyword'))
    }
}

export default actions