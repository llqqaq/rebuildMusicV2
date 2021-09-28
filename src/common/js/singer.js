class Song {
    constructor({
        id,
        singer,
        name,
        image,
        title
    }) {
        this.id = id
        this.singer = singer
        this.name = name
        this.image = image
        this.title = title
    }
}

export function createSong(item) {
    return new Song({
        id: item.al.id,
        singer: _filterSinger(item),
        name: item.name,
        image: item.al.picUrl,
        title: item.al.name
    })
}

function _filterSinger(item) {
    let ret = []
    let ar = item.ar
    if(!ar.length) return ''
    ar.forEach(item => {
        ret.push(item.name)
    })
    return ret.join('/')
}