function insertKey(list, val, compare, maxLength = 15) {
    let index = list.findIndex(compare)
    if (index === 0) return
    if (index > 0) {
        list.splice(index, 1)
    }
    list.unshift(val)
    if (maxLength && list.length > maxLength) {
        list.pop()
    }
}


export function saveHistoryCache(key) {
    let keyList = JSON.parse(sessionStorage.getItem('keyword')) || []
    insertKey(keyList, key, item => {
        return item === key
    }, 6)
    sessionStorage.setItem('keyword', JSON.stringify(keyList))
    return keyList
}

export function getHistory() {
    return JSON.parse(sessionStorage.getItem('keyword')) || []
}

export function deleteHistory(key) {
    let list = getHistory()
    let index = getHistory().splice(item => item === key)
    list.splice(index, 1)
    sessionStorage.setItem('keyword', JSON.stringify(list))
    return list
}
export function clearHistory(key) {
    sessionStorage.removeItem(key)
    return []
}