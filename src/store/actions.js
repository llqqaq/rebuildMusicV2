import { playMode } from '@/common/js/config';
function _findIndex(list, name) {
    return list.findIndex(item => {
        return item.name === name
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
    }
}

export default actions