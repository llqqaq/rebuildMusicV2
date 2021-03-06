let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformName = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformName) {
        if (elementStyle[transformName[key]] !== 'undefined') {
           return key
        }
     }
     return false
})()

export function prefixStyle(style) {
    if(!vendor) return false
    
    if(vendor === 'standard') return style


    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}