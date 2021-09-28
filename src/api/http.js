import request from '@/utils/request';



// 推荐页轮播图
export const getIndexBanner = () => {
    return request({
        url: '/banner',
        type: 'get'
    })
}

// 推荐页歌单
export const getGdan = () => {
    return request({
        url: '/top/playlist/highquality',
        type: 'get',
        params: {
            limit: 30
        }
    })
}


// 获取热门歌手
export const getHotSinger = () => {
    return request({
        url: '/top/artists',
        type: 'get',
        params: {
            offset: 0,
            limit: 20
        }
    })
}

// 获取歌手列表
export const getSinger = () => {
    return request({
        url: '/artist/list',
        type: 'get',
        params: {
            cat: 500,
            limit: 99
        }
    })
}

// 获取歌手详情
export const getSingerInfo = (id) => {
    return request({
        url: `/artists?id=${id}`,
        type: 'get'
    })
}

// 获取音乐url
export const getMusicUrl = id => {
    return request({
        url: `/song/url?id=${id}`,
        type: 'get'
    })
}


// 获取歌单详情
export const getGedanDes = id => {
    return request({
        url: `/playlist/detail?id=${id}`,
        type: 'get'
    })
}

// 获取歌词
export const getLyrics = id => {
    return request({
        url: `/lyric?id=${id}`,
        type: 'get'
    })
}

// 获取排行榜
export const getRankList = () => {
    return request({
        url: '/toplist/detail',
        type: 'get'
    })
}